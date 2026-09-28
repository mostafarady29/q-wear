import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'q-signature-sweatpants',
    sku: 'Q-PT-001',
    name: 'Q SIGNATURE WIDE-LEG SWEATPANTS',
    nameAr: 'سويت بانتس Q الأيقوني بالقصة الواسعة',
    subtitle: 'Heavyweight Cotton Relaxed Lounge & Street Trousers',
    subtitleAr: 'بنطال ستريتوير قطن ثقيل بالقصة الفضفاضة المريحة وشعار Q الأيقوني',
    price: 450,
    originalPrice: 550,
    category: 'pants',
    categoryAr: 'بناطيل وسويت بانتس',
    gsm: 420,
    material: '100% Heavyweight Premium Cotton French Terry',
    materialAr: '100% قطن فاخر عالي الكثافة مع ملمس داخلي ناعم مريح',
    origin: 'Handcrafted & precision tailored at Q Atelier',
    originAr: 'مجمع ومصنوع بحرفية عالية في ورش Q',
    fit: 'Straight Cut',
    fitAr: 'قصة واسعة مستقيمة انسيابية (Wide-Leg Straight)',
    releaseDrop: 'DROP 01: CORE ARCHIVE',
    releaseDropAr: 'الإصدار الأول: الأرشيف الأساسي',
    tags: ['Q Signature Insignia', 'Wide-Leg Silhouette', 'Heavyweight 420 GSM'],
    tagsAr: ['شعار Q الأبيض الأيقوني', 'قصة واسعة مستقيمة', 'فائق الراحة 420 GSM'],
    isNew: true,
    isLimited: true,
    stock: 50,
    rating: 4.98,
    reviewsCount: 142,
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
    descriptionAr:
      'مصنوع من قطن فائق النعومة والكثافة ليوفر أقصى درجات الراحة والأناقة اليومية. يتميز بقصة واسعة مستقيمة (Wide-Leg Drape)، جيوب جانبية عميقة، وحزام خصر مطاطي مرن، مع شعار حرف Q الأبيض الأيقوني المطبوع بدقة على الفخذ الأيسر.',
    features: [
      'Signature white Q branding on the upper left thigh',
      'Relaxed wide-leg straight cut for effortless drape',
      'Heavyweight premium cotton fleece for all-day comfort',
      'Reinforced deep side pockets and elasticated waistband',
      'Pre-shrunk fabric to retain shape and color after washing',
    ],
    featuresAr: [
      'شعار Q الدائري الأبيض الأيقوني مطبوع بدقة على الفخذ الأيسر',
      'قصة واسعة مستقيمة وانسيابية تناسب مختلف التنسيقات اليومية',
      'خامة قطنية ثقيلة وفخمة تمنح الدفء والراحة القصوى',
      'جيوب جانبية عميقة وخياطة متينة ومزدوجة للأطراف',
      'نسيج معالج مسبقاً ضد الانكماش للحفاظ على القصة بعد الغسيل',
    ],
    careInstructions: [
      'Machine wash cold inside out on delicate cycle',
      'Do not tumble dry; lay flat to dry in shade',
      'Iron inside out on low heat if desired',
      'Do not bleach or dry clean',
    ],
    careInstructionsAr: [
      'غسيل آلي بماء بارد ومقلوباً على الدورة الخفيفة',
      'لا يجفف بالمجفف الآلي؛ يجفف مفروداً في الظل',
      'كوي من الداخل على حرارة منخفضة عند الحاجة',
      'تجنب المبيضات أو التنظيف الجاف',
    ],
  },
];

export interface CategoryItem {
  id: string;
  name: string;
  nameAr: string;
  count: number;
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'all', name: 'All Clothing', nameAr: 'جميع الملابس', count: PRODUCTS.length },
  { id: 'pants', name: 'Pants & Sweatpants', nameAr: 'بناطيل وسويت بانتس', count: PRODUCTS.length },
];
