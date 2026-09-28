import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import fs from 'fs';
import { Product, User, Category } from '@/types';
import { PRODUCTS } from '@/data/products';

const DB_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_PATH = path.join(DB_DIR, 'q_store.db');

// Singleton database instance
let db: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (!db) {
    db = new DatabaseSync(DB_PATH);
    initTables(db);
  }
  return db;
}

function initTables(database: DatabaseSync) {
  // Users table
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      clientId TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      city TEXT,
      country TEXT,
      tier TEXT DEFAULT 'CLIENT',
      createdAt TEXT NOT NULL
    );
  `);

  // Products table
  database.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      sku TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      nameAr TEXT,
      subtitle TEXT,
      subtitleAr TEXT,
      price REAL NOT NULL,
      originalPrice REAL,
      category TEXT NOT NULL,
      categoryAr TEXT,
      gsm INTEGER,
      material TEXT,
      materialAr TEXT,
      origin TEXT,
      originAr TEXT,
      fit TEXT,
      fitAr TEXT,
      releaseDrop TEXT,
      releaseDropAr TEXT,
      tags TEXT,
      tagsAr TEXT,
      isNew INTEGER DEFAULT 0,
      isLimited INTEGER DEFAULT 0,
      images TEXT NOT NULL,
      colors TEXT NOT NULL,
      sizes TEXT NOT NULL,
      stock INTEGER NOT NULL,
      rating REAL DEFAULT 5.0,
      reviewsCount INTEGER DEFAULT 0,
      description TEXT,
      descriptionAr TEXT,
      features TEXT,
      featuresAr TEXT,
      careInstructions TEXT,
      careInstructionsAr TEXT
    );
  `);

  // Sync products if count does not match PRODUCTS.length or product ID differs
  const countRow = database.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
  const firstRow = database.prepare('SELECT id, price FROM products LIMIT 1').get() as { id?: string; price?: number } | undefined;
  if (countRow.count !== PRODUCTS.length || firstRow?.id !== PRODUCTS[0]?.id || firstRow?.price !== PRODUCTS[0]?.price) {
    database.exec('DROP TABLE IF EXISTS products');
    database.exec(`
      CREATE TABLE products (
        id TEXT PRIMARY KEY,
        sku TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        nameAr TEXT,
        subtitle TEXT,
        subtitleAr TEXT,
        price REAL NOT NULL,
        originalPrice REAL,
        category TEXT NOT NULL,
        categoryAr TEXT,
        gsm INTEGER,
        material TEXT,
        materialAr TEXT,
        origin TEXT,
        originAr TEXT,
        fit TEXT,
        fitAr TEXT,
        releaseDrop TEXT,
        releaseDropAr TEXT,
        tags TEXT,
        tagsAr TEXT,
        isNew INTEGER DEFAULT 0,
        isLimited INTEGER DEFAULT 0,
        images TEXT NOT NULL,
        colors TEXT NOT NULL,
        sizes TEXT NOT NULL,
        stock INTEGER NOT NULL,
        rating REAL DEFAULT 5.0,
        reviewsCount INTEGER DEFAULT 0,
        description TEXT,
        descriptionAr TEXT,
        features TEXT,
        featuresAr TEXT,
        careInstructions TEXT,
        careInstructionsAr TEXT
      );
    `);

    const insertStmt = database.prepare(`
      INSERT INTO products (
        id, sku, name, nameAr, subtitle, subtitleAr, price, originalPrice, category, categoryAr,
        gsm, material, materialAr, origin, originAr, fit, fitAr, releaseDrop, releaseDropAr,
        tags, tagsAr, isNew, isLimited, images, colors, sizes, stock, rating, reviewsCount,
        description, descriptionAr, features, featuresAr, careInstructions, careInstructionsAr
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?
      )
    `);

    for (const p of PRODUCTS) {
      insertStmt.run(
        p.id,
        p.sku,
        p.name,
        p.nameAr || null,
        p.subtitle,
        p.subtitleAr || null,
        p.price,
        p.originalPrice || null,
        p.category,
        p.categoryAr || null,
        p.gsm || null,
        p.material,
        p.materialAr || null,
        p.origin,
        p.originAr || null,
        p.fit,
        p.fitAr || null,
        p.releaseDrop,
        p.releaseDropAr || null,
        JSON.stringify(p.tags),
        p.tagsAr ? JSON.stringify(p.tagsAr) : null,
        p.isNew ? 1 : 0,
        p.isLimited ? 1 : 0,
        JSON.stringify(p.images),
        JSON.stringify(p.colors),
        JSON.stringify(p.sizes),
        p.stock,
        p.rating,
        p.reviewsCount,
        p.description,
        p.descriptionAr || null,
        JSON.stringify(p.features),
        p.featuresAr ? JSON.stringify(p.featuresAr) : null,
        JSON.stringify(p.careInstructions),
        p.careInstructionsAr ? JSON.stringify(p.careInstructionsAr) : null
      );
    }
  }
}

// Convert database row to typed Product
export function formatProductRow(row: any): Product {
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    nameAr: row.nameAr || undefined,
    subtitle: row.subtitle || '',
    subtitleAr: row.subtitleAr || undefined,
    price: Number(row.price),
    originalPrice: row.originalPrice ? Number(row.originalPrice) : undefined,
    category: row.category as Category,
    categoryAr: row.categoryAr || undefined,
    gsm: row.gsm ? Number(row.gsm) : undefined,
    material: row.material,
    materialAr: row.materialAr || undefined,
    origin: row.origin,
    originAr: row.originAr || undefined,
    fit: row.fit,
    fitAr: row.fitAr || undefined,
    releaseDrop: row.releaseDrop,
    releaseDropAr: row.releaseDropAr || undefined,
    tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags || [],
    tagsAr: row.tagsAr ? (typeof row.tagsAr === 'string' ? JSON.parse(row.tagsAr) : row.tagsAr) : undefined,
    isNew: Boolean(row.isNew),
    isLimited: Boolean(row.isLimited),
    isSoldOut: Number(row.stock) <= 0,
    images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images || [],
    colors: typeof row.colors === 'string' ? JSON.parse(row.colors) : row.colors || [],
    sizes: typeof row.sizes === 'string' ? JSON.parse(row.sizes) : row.sizes || [],
    stock: Number(row.stock),
    rating: Number(row.rating),
    reviewsCount: Number(row.reviewsCount),
    description: row.description,
    descriptionAr: row.descriptionAr || undefined,
    features: typeof row.features === 'string' ? JSON.parse(row.features) : row.features || [],
    featuresAr: row.featuresAr ? (typeof row.featuresAr === 'string' ? JSON.parse(row.featuresAr) : row.featuresAr) : undefined,
    careInstructions: typeof row.careInstructions === 'string' ? JSON.parse(row.careInstructions) : row.careInstructions || [],
    careInstructionsAr: row.careInstructionsAr ? (typeof row.careInstructionsAr === 'string' ? JSON.parse(row.careInstructionsAr) : row.careInstructionsAr) : undefined,
  };
}

// --- USER OPERATIONS ---

export function getUserByEmail(email: string): (User & { password: string }) | null {
  const database = getDb();
  const normalized = email.toLowerCase().trim();
  const row = database.prepare(`
    SELECT id, clientId, name, email, password, city, country, tier, createdAt
    FROM users WHERE lower(email) = ?
  `).get(normalized) as any;

  if (!row) return null;

  const ordersRow = database.prepare(`
    SELECT COUNT(*) as count FROM orders WHERE lower(customerEmail) = ?
  `).get(normalized) as { count: number };

  return {
    id: row.id,
    clientId: row.clientId,
    name: row.name,
    email: row.email,
    password: row.password,
    city: row.city || '',
    country: row.country || '',
    tier: row.tier || 'CLIENT',
    joinedDate: row.createdAt ? row.createdAt.split('T')[0] : '',
    ordersCount: ordersRow?.count || 0,
  };
}

export function createUser(data: {
  name: string;
  email: string;
  password: string;
  city?: string;
  country?: string;
  tier?: 'CLIENT' | 'OBSIDIAN VIP';
}): User {
  const database = getDb();
  const normalizedEmail = data.email.toLowerCase().trim();

  // Check if exists
  const existing = database.prepare(`
    SELECT id FROM users WHERE lower(email) = ?
  `).get(normalizedEmail);

  if (existing) {
    throw new Error('An account with this email address already exists.');
  }

  const id = 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
  const clientId = 'Q-' + (data.tier === 'OBSIDIAN VIP' ? 'VIP-' : 'CLIENT-') + Math.floor(1000 + Math.random() * 9000);
  const createdAt = new Date().toISOString();

  database.prepare(`
    INSERT INTO users (id, clientId, name, email, password, city, country, tier, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    clientId,
    data.name.trim(),
    normalizedEmail,
    data.password,
    data.city?.trim() || 'Global',
    data.country?.trim() || 'United States',
    data.tier || 'CLIENT',
    createdAt
  );

  return {
    id,
    clientId,
    name: data.name.trim(),
    email: normalizedEmail,
    city: data.city?.trim() || 'Global',
    country: data.country?.trim() || 'United States',
    tier: data.tier || 'CLIENT',
    joinedDate: createdAt.split('T')[0],
    ordersCount: 0,
  };
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
  const database = getDb();
  const rows = database.prepare('SELECT * FROM products').all() as any[];
  let products = rows.map(formatProductRow);

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
  const database = getDb();
  const row = database.prepare(`
    SELECT * FROM products WHERE id = ? OR lower(sku) = lower(?)
  `).get(idOrSku, idOrSku) as any;

  if (!row) {
    return { product: null, related: [] };
  }

  const product = formatProductRow(row);

  const relatedRows = database.prepare(`
    SELECT * FROM products 
    WHERE id != ? AND (category = ? OR releaseDrop = ?)
    LIMIT 3
  `).all(product.id, product.category, product.releaseDrop) as any[];

  const related = relatedRows.map(formatProductRow);

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
  const database = getDb();
  const createdAt = new Date().toISOString();

  database.prepare(`
    INSERT INTO orders (
      orderId, trackingCode, customerEmail, customerName, customerData,
      items, subtotal, shipping, total, currency, status, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    data.orderId,
    data.trackingCode,
    data.customerEmail.toLowerCase().trim(),
    data.customerName.trim(),
    JSON.stringify(data.customerData),
    JSON.stringify(data.items),
    data.subtotal,
    data.shipping,
    data.total,
    data.currency,
    'CONFIRMED',
    createdAt
  );

  // Decrement stock for purchased items
  const updateStock = database.prepare(`
    UPDATE products SET stock = MAX(0, stock - ?) WHERE id = ?
  `);

  for (const item of data.items) {
    if (item.product?.id && item.quantity) {
      updateStock.run(item.quantity, item.product.id);
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
  const database = getDb();
  const rows = database.prepare(`
    SELECT * FROM orders WHERE lower(customerEmail) = ? ORDER BY createdAt DESC
  `).all(email.toLowerCase().trim()) as any[];

  return rows.map((r) => ({
    orderId: r.orderId,
    trackingCode: r.trackingCode,
    subtotal: Number(r.subtotal),
    shipping: Number(r.shipping),
    total: Number(r.total),
    currency: r.currency,
    status: r.status,
    date: r.createdAt,
    customer: JSON.parse(r.customerData),
    items: JSON.parse(r.items),
  }));
}

// --- VIP PASS OPERATIONS ---

export function createDbVipPass(email: string, city: string = 'Global') {
  const database = getDb();
  const normalizedEmail = email.toLowerCase().trim();

  // Check if exists
  const existing = database.prepare(`
    SELECT * FROM vip_passes WHERE lower(email) = ?
  `).get(normalizedEmail) as any;

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

  database.prepare(`
    INSERT INTO vip_passes (id, token, email, city, tier, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, token, normalizedEmail, city, tier, createdAt);

  // If this email is also registered as user, upgrade their tier in users table
  database.prepare(`
    UPDATE users SET tier = 'OBSIDIAN VIP' WHERE lower(email) = ?
  `).run(normalizedEmail);

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
