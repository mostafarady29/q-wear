import { getSupabase } from './supabase';
import { Product, User, Category } from '@/types';
import { PRODUCTS } from '@/data/products';

// ============================================================
// Supabase-backed data store (Vercel + Supabase)
// ============================================================

// Helper: convert DB row (snake_case) → Product type (camelCase)
function formatProductRow(row: any): Product {
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    nameAr: row.name_ar || undefined,
    subtitle: row.subtitle || '',
    subtitleAr: row.subtitle_ar || undefined,
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    category: row.category as Category,
    categoryAr: row.category_ar || undefined,
    gsm: row.gsm ? Number(row.gsm) : undefined,
    material: row.material,
    materialAr: row.material_ar || undefined,
    origin: row.origin,
    originAr: row.origin_ar || undefined,
    fit: row.fit,
    fitAr: row.fit_ar || undefined,
    releaseDrop: row.release_drop,
    releaseDropAr: row.release_drop_ar || undefined,
    tags: row.tags || [],
    tagsAr: row.tags_ar || undefined,
    isNew: Boolean(row.is_new),
    isLimited: Boolean(row.is_limited),
    isSoldOut: Number(row.stock) <= 0,
    images: row.images || [],
    colors: row.colors || [],
    sizes: row.sizes || [],
    stock: Number(row.stock),
    rating: Number(row.rating),
    reviewsCount: Number(row.reviews_count),
    description: row.description,
    descriptionAr: row.description_ar || undefined,
    features: row.features || [],
    featuresAr: row.features_ar || undefined,
    careInstructions: row.care_instructions || [],
    careInstructionsAr: row.care_instructions_ar || undefined,
  };
}

// --- USER OPERATIONS ---

export async function getUserByEmail(email: string): Promise<(User & { password: string }) | null> {
  const normalized = email.toLowerCase().trim();

  const { data: row, error } = await getSupabase()
    .from('users')
    .select('*')
    .eq('email', normalized)
    .single();

  if (error || !row) return null;

  // Count orders
  const { count } = await getSupabase()
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('customer_email', normalized);

  return {
    id: row.id,
    clientId: row.client_id,
    name: row.name,
    email: row.email,
    password: row.password,
    city: row.city || '',
    country: row.country || '',
    tier: row.tier || 'CLIENT',
    joinedDate: row.created_at ? row.created_at.split('T')[0] : '',
    ordersCount: count || 0,
  };
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  city?: string;
  country?: string;
  tier?: 'CLIENT' | 'OBSIDIAN VIP';
}): Promise<User> {
  const normalizedEmail = data.email.toLowerCase().trim();

  // Check if exists
  const { data: existing } = await getSupabase()
    .from('users')
    .select('id')
    .eq('email', normalizedEmail)
    .single();

  if (existing) {
    throw new Error('An account with this email address already exists.');
  }

  const id = 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
  const clientId = 'Q-' + (data.tier === 'OBSIDIAN VIP' ? 'VIP-' : 'CLIENT-') + Math.floor(1000 + Math.random() * 9000);

  const { data: newRow, error } = await getSupabase()
    .from('users')
    .insert({
      id,
      client_id: clientId,
      name: data.name.trim(),
      email: normalizedEmail,
      password: data.password,
      city: data.city?.trim() || 'Global',
      country: data.country?.trim() || 'United States',
      tier: data.tier || 'CLIENT',
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    id: newRow.id,
    clientId: newRow.client_id,
    name: newRow.name,
    email: newRow.email,
    city: newRow.city || 'Global',
    country: newRow.country || 'United States',
    tier: newRow.tier || 'CLIENT',
    joinedDate: newRow.created_at ? newRow.created_at.split('T')[0] : '',
    ordersCount: 0,
  };
}

// --- PRODUCT OPERATIONS ---

export async function getDbProducts(params?: {
  category?: string | null;
  search?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  minGsm?: number;
}): Promise<Product[]> {
  let query = getSupabase().from('products').select('*');

  if (params?.category && params.category !== 'all') {
    query = query.eq('category', params.category);
  }

  if (params?.minPrice !== undefined) {
    query = query.gte('price', params.minPrice);
  }
  if (params?.maxPrice !== undefined) {
    query = query.lte('price', params.maxPrice);
  }
  if (params?.minGsm && params.minGsm > 0) {
    query = query.gte('gsm', params.minGsm);
  }

  if (params?.sort === 'price-low') {
    query = query.order('price', { ascending: true });
  } else if (params?.sort === 'price-high') {
    query = query.order('price', { ascending: false });
  } else if (params?.sort === 'gsm') {
    query = query.order('gsm', { ascending: false });
  } else if (params?.sort === 'rating') {
    query = query.order('rating', { ascending: false });
  } else if (params?.sort === 'newest') {
    query = query.order('is_new', { ascending: false });
  }

  const { data: rows, error } = await query;

  if (error) {
    console.error('Supabase products query error:', error);
    return [];
  }

  let products = (rows || []).map(formatProductRow);

  // Client-side text search (Supabase free tier doesn't have full-text search)
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

  return products;
}

export async function getDbProductById(idOrSku: string): Promise<{ product: Product | null; related: Product[] }> {
  // Try by id first
  let { data: row } = await getSupabase()
    .from('products')
    .select('*')
    .eq('id', idOrSku)
    .single();

  // Fallback: try by SKU
  if (!row) {
    const { data: skuRow } = await getSupabase()
      .from('products')
      .select('*')
      .ilike('sku', idOrSku)
      .single();
    row = skuRow;
  }

  if (!row) {
    return { product: null, related: [] };
  }

  const product = formatProductRow(row);

  // Get related products (same category or same drop)
  const { data: relatedRows } = await getSupabase()
    .from('products')
    .select('*')
    .neq('id', product.id)
    .or(`category.eq.${product.category},release_drop.eq.${product.releaseDrop}`)
    .limit(3);

  const related = (relatedRows || []).map(formatProductRow);

  return { product, related };
}

// --- ORDER OPERATIONS ---

export async function createDbOrder(data: {
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
  const { error } = await getSupabase().from('orders').insert({
    order_id: data.orderId,
    tracking_code: data.trackingCode,
    customer_email: data.customerEmail.toLowerCase().trim(),
    customer_name: data.customerName.trim(),
    customer_data: data.customerData,
    items: data.items,
    subtotal: data.subtotal,
    shipping: data.shipping,
    total: data.total,
    currency: data.currency,
    status: 'CONFIRMED',
  });

  if (error) {
    console.error('Order creation error:', error);
    throw new Error('Failed to create order');
  }

  // Decrement stock for purchased items
  for (const item of data.items) {
    if (item.product?.id && item.quantity) {
      // Get current stock
      const { data: prod } = await getSupabase()
        .from('products')
        .select('stock')
        .eq('id', item.product.id)
        .single();

      if (prod) {
        await getSupabase()
          .from('products')
          .update({ stock: Math.max(0, prod.stock - item.quantity) })
          .eq('id', item.product.id);
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
    date: new Date().toISOString(),
    status: 'CONFIRMED',
    estimatedDelivery: '3-5 Business Days (Express Insured)',
  };
}

export async function getUserDbOrders(email: string) {
  const normalized = email.toLowerCase().trim();

  const { data: rows, error } = await getSupabase()
    .from('orders')
    .select('*')
    .eq('customer_email', normalized)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Orders query error:', error);
    return [];
  }

  return (rows || []).map((r) => ({
    orderId: r.order_id,
    trackingCode: r.tracking_code,
    subtotal: Number(r.subtotal),
    shipping: Number(r.shipping),
    total: Number(r.total),
    currency: r.currency,
    status: r.status,
    date: r.created_at,
    customer: r.customer_data,
    items: r.items,
  }));
}

// --- VIP PASS OPERATIONS ---

export async function createDbVipPass(email: string, city: string = 'Global') {
  const normalizedEmail = email.toLowerCase().trim();

  // Check if exists
  const { data: existing } = await getSupabase()
    .from('vip_passes')
    .select('*')
    .eq('email', normalizedEmail)
    .single();

  if (existing) {
    return {
      token: existing.token,
      email: existing.email,
      city: existing.city,
      tier: existing.tier,
      accessSlot: 'DROP 02 // ACCESS: 24H PRIOR',
      issuedAt: existing.created_at,
      alreadyRegistered: true,
    };
  }

  const token = 'Q-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-4);
  const id = 'vip_' + Date.now().toString(36);
  const tier = 'OBSIDIAN VIP';

  const { error } = await getSupabase().from('vip_passes').insert({
    id,
    token,
    email: normalizedEmail,
    city,
    tier,
  });

  if (error) {
    console.error('VIP pass creation error:', error);
    throw new Error('Could not generate VIP pass');
  }

  // If this email is also registered as user, upgrade their tier
  await getSupabase()
    .from('users')
    .update({ tier: 'OBSIDIAN VIP' })
    .eq('email', normalizedEmail);

  return {
    token,
    email: normalizedEmail,
    city,
    tier,
    accessSlot: 'DROP 02 // ACCESS: 24H PRIOR',
    issuedAt: new Date().toISOString(),
    alreadyRegistered: false,
  };
}
