import { Product, User, Category } from '@/types';
import { PRODUCTS } from '@/data/products';

// ============================================================
// In-memory data store (Vercel-compatible)
// ============================================================
// Vercel serverless functions don't support node:sqlite or
// persistent filesystem writes. This module uses in-memory Maps
// for users, orders, and VIP passes. Product data is served
// directly from the static PRODUCTS array.
//
// Note: In-memory data resets on each cold start, which is
// acceptable for a demo / portfolio store. For production,
// replace with a hosted database (e.g. Vercel Postgres, PlanetScale).
// ============================================================

// --- In-memory stores ---
const usersStore = new Map<string, User & { password: string }>();
const ordersStore: Array<{
  orderId: string;
  trackingCode: string;
  customerEmail: string;
  customerName: string;
  customerData: any;
  items: any[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  status: string;
  createdAt: string;
}> = [];
const vipPassesStore = new Map<string, {
  id: string;
  token: string;
  email: string;
  city: string;
  tier: string;
  createdAt: string;
}>();

// --- Mutable product stock tracker ---
const stockOverrides = new Map<string, number>();

function getStock(productId: string, originalStock: number): number {
  return stockOverrides.has(productId) ? stockOverrides.get(productId)! : originalStock;
}

// Convert a PRODUCTS entry to a full Product with live stock
function hydrateProduct(p: Product): Product {
  const stock = getStock(p.id, p.stock);
  return { ...p, stock, isSoldOut: stock <= 0 };
}

// --- USER OPERATIONS ---

export function getUserByEmail(email: string): (User & { password: string }) | null {
  const normalized = email.toLowerCase().trim();
  for (const user of usersStore.values()) {
    if (user.email === normalized) {
      // Count orders
      const ordersCount = ordersStore.filter(
        (o) => o.customerEmail === normalized
      ).length;
      return { ...user, ordersCount };
    }
  }
  return null;
}

export function createUser(data: {
  name: string;
  email: string;
  password: string;
  city?: string;
  country?: string;
  tier?: 'CLIENT' | 'OBSIDIAN VIP';
}): User {
  const normalizedEmail = data.email.toLowerCase().trim();

  // Check if exists
  for (const user of usersStore.values()) {
    if (user.email === normalizedEmail) {
      throw new Error('An account with this email address already exists.');
    }
  }

  const id = 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
  const clientId = 'Q-' + (data.tier === 'OBSIDIAN VIP' ? 'VIP-' : 'CLIENT-') + Math.floor(1000 + Math.random() * 9000);
  const createdAt = new Date().toISOString();

  const newUser: User & { password: string } = {
    id,
    clientId,
    name: data.name.trim(),
    email: normalizedEmail,
    password: data.password,
    city: data.city?.trim() || 'Global',
    country: data.country?.trim() || 'United States',
    tier: data.tier || 'CLIENT',
    joinedDate: createdAt.split('T')[0],
    ordersCount: 0,
  };

  usersStore.set(id, newUser);

  const { password: _, ...cleanUser } = newUser;
  return cleanUser as User;
}

// --- PRODUCT OPERATIONS ---

export function getDbProducts(params?: {
  category?: string | null;
  search?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  minGsm?: number;
}): Product[] {
  let products = PRODUCTS.map(hydrateProduct);

  if (params?.category && params.category !== 'all') {
    products = products.filter((p) => p.category === params.category);
  }

  if (params?.search) {
    const q = params.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        p.sku.toLowerCase().includes(q)
    );
  }

  if (params?.minPrice !== undefined) {
    products = products.filter((p) => p.price >= params.minPrice!);
  }
  if (params?.maxPrice !== undefined) {
    products = products.filter((p) => p.price <= params.maxPrice!);
  }
  if (params?.minGsm && params.minGsm > 0) {
    products = products.filter((p) => (p.gsm || 0) >= params.minGsm!);
  }

  if (params?.sort === 'price-low') {
    products.sort((a, b) => a.price - b.price);
  } else if (params?.sort === 'price-high') {
    products.sort((a, b) => b.price - a.price);
  } else if (params?.sort === 'gsm') {
    products.sort((a, b) => (b.gsm || 0) - (a.gsm || 0));
  } else if (params?.sort === 'rating') {
    products.sort((a, b) => b.rating - a.rating);
  } else if (params?.sort === 'newest') {
    products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  return products;
}

export function getDbProductById(idOrSku: string): { product: Product | null; related: Product[] } {
  const match = PRODUCTS.find(
    (p) => p.id === idOrSku || p.sku.toLowerCase() === idOrSku.toLowerCase()
  );

  if (!match) {
    return { product: null, related: [] };
  }

  const product = hydrateProduct(match);

  const related = PRODUCTS
    .filter((p) => p.id !== product.id && (p.category === product.category || p.releaseDrop === product.releaseDrop))
    .slice(0, 3)
    .map(hydrateProduct);

  return { product, related };
}

// --- ORDER OPERATIONS ---

export function createDbOrder(data: {
  orderId: string;
  trackingCode: string;
  customerEmail: string;
  customerName: string;
  customerData: any;
  items: any[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
}) {
  const createdAt = new Date().toISOString();

  ordersStore.push({
    ...data,
    customerEmail: data.customerEmail.toLowerCase().trim(),
    customerName: data.customerName.trim(),
    status: 'CONFIRMED',
    createdAt,
  });

  // Decrement stock for purchased items
  for (const item of data.items) {
    if (item.product?.id && item.quantity) {
      const original = PRODUCTS.find((p) => p.id === item.product.id);
      if (original) {
        const currentStock = getStock(original.id, original.stock);
        stockOverrides.set(original.id, Math.max(0, currentStock - item.quantity));
      }
    }
  }

  return {
    orderId: data.orderId,
    trackingCode: data.trackingCode,
    items: data.items,
    subtotal: data.subtotal,
    shipping: data.shipping,
    total: data.total,
    currency: data.currency,
    customer: data.customerData,
    date: createdAt,
    status: 'CONFIRMED',
    estimatedDelivery: '3-5 Business Days (Express Insured)',
  };
}

export function getUserDbOrders(email: string) {
  const normalized = email.toLowerCase().trim();
  return ordersStore
    .filter((o) => o.customerEmail === normalized)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((r) => ({
      orderId: r.orderId,
      trackingCode: r.trackingCode,
      subtotal: r.subtotal,
      shipping: r.shipping,
      total: r.total,
      currency: r.currency,
      status: r.status,
      date: r.createdAt,
      customer: r.customerData,
      items: r.items,
    }));
}

// --- VIP PASS OPERATIONS ---

export function createDbVipPass(email: string, city: string = 'Global') {
  const normalizedEmail = email.toLowerCase().trim();

  // Check if exists
  const existing = vipPassesStore.get(normalizedEmail);
  if (existing) {
    return {
      token: existing.token,
      email: existing.email,
      city: existing.city,
      tier: existing.tier,
      accessSlot: 'DROP 02 // ACCESS: 24H PRIOR',
      issuedAt: existing.createdAt,
      alreadyRegistered: true,
    };
  }

  const token = 'Q-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-4);
  const id = 'vip_' + Date.now().toString(36);
  const createdAt = new Date().toISOString();
  const tier = 'OBSIDIAN VIP';

  vipPassesStore.set(normalizedEmail, { id, token, email: normalizedEmail, city, tier, createdAt });

  // If this email is also registered as user, upgrade their tier
  for (const user of usersStore.values()) {
    if (user.email === normalizedEmail) {
      user.tier = 'OBSIDIAN VIP';
    }
  }

  return {
    token,
    email: normalizedEmail,
    city,
    tier,
    accessSlot: 'DROP 02 // ACCESS: 24H PRIOR',
    issuedAt: createdAt,
    alreadyRegistered: false,
  };
}
