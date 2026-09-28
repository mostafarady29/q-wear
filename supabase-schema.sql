-- ============================================================
-- Q-Wear Store — Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_ar TEXT,
  subtitle TEXT,
  subtitle_ar TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  category TEXT NOT NULL,
  category_ar TEXT,
  gsm INTEGER,
  material TEXT,
  material_ar TEXT,
  origin TEXT,
  origin_ar TEXT,
  fit TEXT,
  fit_ar TEXT,
  release_drop TEXT,
  release_drop_ar TEXT,
  tags JSONB DEFAULT '[]',
  tags_ar JSONB,
  is_new BOOLEAN DEFAULT FALSE,
  is_limited BOOLEAN DEFAULT FALSE,
  images JSONB NOT NULL DEFAULT '[]',
  colors JSONB NOT NULL DEFAULT '[]',
  sizes JSONB NOT NULL DEFAULT '[]',
  stock INTEGER NOT NULL DEFAULT 0,
  rating NUMERIC DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  description TEXT,
  description_ar TEXT,
  features JSONB DEFAULT '[]',
  features_ar JSONB,
  care_instructions JSONB DEFAULT '[]',
  care_instructions_ar JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  client_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  city TEXT DEFAULT 'Global',
  country TEXT DEFAULT 'United States',
  tier TEXT DEFAULT 'CLIENT',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_id TEXT UNIQUE NOT NULL,
  tracking_code TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_data JSONB,
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  shipping NUMERIC NOT NULL,
  total NUMERIC NOT NULL,
  currency TEXT DEFAULT 'EGP',
  status TEXT DEFAULT 'CONFIRMED',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. VIP PASSES TABLE
CREATE TABLE IF NOT EXISTS vip_passes (
  id TEXT PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  city TEXT DEFAULT 'Global',
  tier TEXT DEFAULT 'OBSIDIAN VIP',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. COLLECTIONS TABLE
CREATE TABLE IF NOT EXISTS collections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  season TEXT,
  code TEXT,
  release_date TEXT,
  status TEXT DEFAULT 'live',
  hero_image TEXT,
  description TEXT,
  item_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE vip_passes ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

-- Products: Public read access
CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT
  USING (true);

-- Products: Service role can insert/update
CREATE POLICY "Service role can manage products"
  ON products FOR ALL
  USING (true)
  WITH CHECK (true);

-- Collections: Public read access
CREATE POLICY "Collections are publicly readable"
  ON collections FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage collections"
  ON collections FOR ALL
  USING (true)
  WITH CHECK (true);

-- Users: Allow insert (registration) and select via service key
CREATE POLICY "Users can be created and read via API"
  ON users FOR ALL
  USING (true)
  WITH CHECK (true);

-- Orders: Allow insert and select via service key
CREATE POLICY "Orders can be managed via API"
  ON orders FOR ALL
  USING (true)
  WITH CHECK (true);

-- VIP Passes: Allow insert and select via service key
CREATE POLICY "VIP passes can be managed via API"
  ON vip_passes FOR ALL
  USING (true)
  WITH CHECK (true);
