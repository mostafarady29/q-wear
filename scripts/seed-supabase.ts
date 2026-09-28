// ============================================================
// Seed Script — Upload products & collections to Supabase
// Usage: npx tsx scripts/seed-supabase.ts
// ============================================================
// Make sure .env.local has NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

import { createClient } from '@supabase/supabase-js';

// Load env from .env.local
import { config } from 'dotenv';
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your_')) {
  console.error('❌ Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- Product Data ---
const PRODUCTS = [
  {
    id: 'q-signature-sweatpants',
    sku: 'Q-PT-001',
    name: 'Q SIGNATURE WIDE-LEG SWEATPANTS',
    name_ar: 'سويت بانتس Q الأيقوني بالقصة الواسعة',
    subtitle: 'Heavyweight Cotton Relaxed Lounge & Street Trousers',
    subtitle_ar: 'بنطال ستريتوير قطن ثقيل بالقصة الفضفاضة المريحة وشعار Q الأيقوني',
    price: 450,
    original_price: 550,
    category: 'pants',
    category_ar: 'بناطيل وسويت بانتس',
    gsm: 420,
    material: '100% Heavyweight Premium Cotton French Terry',
    material_ar: '100% قطن فاخر عالي الكثافة مع ملمس داخلي ناعم مريح',
    origin: 'Handcrafted & precision tailored at Q Atelier',
    origin_ar: 'مجمع ومصنوع بحرفية عالية في ورش Q',
    fit: 'Straight Cut',
    fit_ar: 'قصة واسعة مستقيمة انسيابية (Wide-Leg Straight)',
    release_drop: 'DROP 01: CORE ARCHIVE',
    release_drop_ar: 'الإصدار الأول: الأرشيف الأساسي',
    tags: ['Q Signature Insignia', 'Wide-Leg Silhouette', 'Heavyweight 420 GSM'],
    tags_ar: ['شعار Q الأبيض الأيقوني', 'قصة واسعة مستقيمة', 'فائق الراحة 420 GSM'],
    is_new: true,
    is_limited: true,
    stock: 50,
    rating: 4.98,
    reviews_count: 142,
    images: [
      '/products/q-pants-1.png',
      '/products/q-pants-2.png',
      '/products/q-pants-3.png',
      '/products/q-pants-4.png',
    ],
    colors: [
      { name: 'Pitch Black with White Q Logo', nameAr: 'أسود فاحم مع شعار Q الأبيض', hex: '#09090B' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description:
      'Engineered from ultra-comfortable heavyweight loopback cotton, the Q Signature Wide-Leg Sweatpants feature an easy relaxed straight drape, deep side pockets, and our signature white Q circle insignia precision-placed on the left thigh.',
    description_ar:
      'مصنوع من قطن فائق النعومة والكثافة ليوفر أقصى درجات الراحة والأناقة اليومية. يتميز بقصة واسعة مستقيمة (Wide-Leg Drape)، جيوب جانبية عميقة، وحزام خصر مطاطي مرن، مع شعار حرف Q الأبيض الأيقوني المطبوع بدقة على الفخذ الأيسر.',
    features: [
      'Signature white Q branding on the upper left thigh',
      'Relaxed wide-leg straight cut for effortless drape',
      'Heavyweight premium cotton fleece for all-day comfort',
      'Reinforced deep side pockets and elasticated waistband',
      'Pre-shrunk fabric to retain shape and color after washing',
    ],
    features_ar: [
      'شعار Q الدائري الأبيض الأيقوني مطبوع بدقة على الفخذ الأيسر',
      'قصة واسعة مستقيمة وانسيابية تناسب مختلف التنسيقات اليومية',
      'خامة قطنية ثقيلة وفخمة تمنح الدفء والراحة القصوى',
      'جيوب جانبية عميقة وخياطة متينة ومزدوجة للأطراف',
      'نسيج معالج مسبقاً ضد الانكماش للحفاظ على القصة بعد الغسيل',
    ],
    care_instructions: [
      'Machine wash cold inside out on delicate cycle',
      'Do not tumble dry; lay flat to dry in shade',
      'Iron inside out on low heat if desired',
      'Do not bleach or dry clean',
    ],
    care_instructions_ar: [
      'غسيل آلي بماء بارد ومقلوباً على الدورة الخفيفة',
      'لا يجفف بالمجفف الآلي؛ يجفف مفروداً في الظل',
      'كوي من الداخل على حرارة منخفضة عند الحاجة',
      'تجنب المبيضات أو التنظيف الجاف',
    ],
  },
];

// --- Collections Data ---
const COLLECTIONS = [
  {
    id: 'drop-01-void',
    name: 'DROP 01 // VOID MATRIX',
    season: 'AUTUMN / WINTER 2026',
    code: 'SYS-VOID-01',
    release_date: 'Available Now',
    status: 'live',
    hero_image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1400&auto=format&fit=crop',
    description: 'An architectural exploration of stark obsidian silhouettes, 520 GSM loopback knits, and modular military fastenings engineered for extreme metropolitan environments.',
    item_count: 8,
  },
  {
    id: 'drop-02-monolith',
    name: 'DROP 02 // MONOLITH CHOP',
    season: 'SPRING 2027 ARCHIVE',
    code: 'SYS-MNTH-02',
    release_date: 'VIP Access October 2026',
    status: 'upcoming',
    hero_image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1400&auto=format&fit=crop',
    description: 'Deconstructed sculptural tailoring, distressed raw selvedge weaves, and high-frequency bonded rainproof outer shells.',
    item_count: 12,
  },
  {
    id: 'drop-00-genesis',
    name: 'DROP 00 // GENESIS CORE',
    season: 'PERMANENT ARCHIVE',
    code: 'SYS-GEN-00',
    release_date: 'Archived / Restocked Bi-Monthly',
    status: 'vault',
    hero_image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1400&auto=format&fit=crop',
    description: 'The uncompromising foundation of Q. Brutalist heavy tees, foundational 480GSM crewnecks, and essential minimalist leather accessories.',
    item_count: 6,
  },
];

async function seed() {
  console.log('🚀 Seeding Supabase database...\n');

  // --- Seed Products ---
  console.log('📦 Uploading products...');
  const { data: prodData, error: prodError } = await supabase
    .from('products')
    .upsert(PRODUCTS, { onConflict: 'id' })
    .select();

  if (prodError) {
    console.error('❌ Products error:', prodError.message);
  } else {
    console.log(`✅ ${prodData?.length || 0} product(s) uploaded successfully`);
  }

  // --- Seed Collections ---
  console.log('\n🏷️  Uploading collections...');
  const { data: colData, error: colError } = await supabase
    .from('collections')
    .upsert(COLLECTIONS, { onConflict: 'id' })
    .select();

  if (colError) {
    console.error('❌ Collections error:', colError.message);
  } else {
    console.log(`✅ ${colData?.length || 0} collection(s) uploaded successfully`);
  }

  console.log('\n🎉 Seeding complete!');
}

seed().catch(console.error);
