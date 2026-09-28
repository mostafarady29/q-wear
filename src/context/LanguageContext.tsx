'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRtl: boolean;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Top Bar
    'topbar.shipping': 'توصيل مجاني لجميع المحافظات للطلبات فوق 900 جنيه',
    'topbar.fabric': 'سويت بانتس Q الأيقوني 420 GSM متوفر الآن',
    'topbar.returns': 'إرجاع واستبدال مجاني خلال 14 يوماً',
    'topbar.promo': 'استخدم كود QVIP10 للحصول على خصم 10%',

    // Navigation
    'nav.allClothing': 'جميع الملابس',
    'nav.featured': 'المنتج المميز',
    'nav.lookbook': 'كتالوج الإطلالات',
    'nav.about': 'عن Q والخامات',
    'nav.signIn': 'تسجيل الدخول',
    'nav.createAccount': 'إنشاء حساب',
    'nav.myAccount': 'حسابي',
    'nav.signOut': 'تسجيل الخروج',
    'nav.search': 'بحث سريع...',
    'nav.searchPlaceholder': 'ابحث بالاسم، اللون، أو الخامة...',
    'nav.vipDrop': 'بطاقة VIP للأعضاء',

    // Hero Banner
    'hero.badge': 'ستريتوير فاخر // قطن فائق الراحة 420 GSM',
    'hero.title1': 'سويت بانتس Q الأيقوني',
    'hero.title2': 'قصة واسعة بأناقة شارعية',
    'hero.desc': 'مصنوع من قطن فرينش تيري فائق النعومة والكثافة بوزن 420 جم/م². قصة واسعة مستقيمة مع شعار Q الأبيض الأيقوني على الفخذ الأيسر، وجيوب عميقة وخصر مطاطي مريح.',
    'hero.shopNow': 'تسوق البنطال الآن',
    'hero.explore': 'عرض تفاصيل الخامة',
    'hero.statsGsm': '420 جم/م²',
    'hero.statsGsmLabel': 'كثافة قطن فائقة الراحة',
    'hero.statsCotton': '100% قطن',
    'hero.statsCottonLabel': 'فرينش تيري فاخر',
    'hero.statsRating': '4.98 / 5.0',
    'hero.statsRatingLabel': 'تقييم العملاء (142 تقييم)',

    // Product Section
    'prod.badge': 'القطعة الأساسية الحصرية // إصدار محدود',
    'prod.title': 'سويت بانتس Q الأيقوني',
    'prod.tagline': 'أقصى معايير الراحة والأناقة الشارعية اليومية',
    'prod.price': 'السعر',
    'prod.originalPrice': 'السعر الأصلي',
    'prod.save': 'وفر 20%',
    'prod.colors': 'الألوان المتوفرة',
    'prod.sizes': 'المقاس',
    'prod.sizeGuide': 'دليل القياسات الذكي',
    'prod.quantity': 'الكمية',
    'prod.addToBag': 'إضافة إلى حقيبة التسوق',
    'prod.buyNow': 'شراء الآن',
    'prod.inStock': 'متوفر في المخزون (50 قطعة فقط)',
    'prod.freeShippingNotice': 'مؤهل للشحن السريع المجاني',
    'prod.featuresTab': 'مواصفات القطعة',
    'prod.careTab': 'إرشادات الغسيل والعناية',
    'prod.specsTab': 'الخامة والمنشأ',
    'prod.material': 'الخامة الأساسية',
    'prod.origin': 'بلد التصنيع والصبغ',
    'prod.fit': 'طبيعة القصة والارتداء',
    'prod.weight': 'وزن النسيج',
    'prod.quickView': 'نظرة سريعة',

    // Cart & Checkout
    'cart.title': 'حقيبة التسوق',
    'cart.empty': 'حقيبة التسوق فارغة حالياً',
    'cart.emptyDesc': 'أضف هودي فويد 520 GSM لتجربة ملابس ستريتوير استثنائية.',
    'cart.startShopping': 'تصفح المنتج',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.shipping': 'الشحن السريع',
    'cart.free': 'مجاناً',
    'cart.total': 'المجموع الإجمالي',
    'cart.checkout': 'متابعة الدفع الآمن',
    'cart.freeProgress': 'أنت مؤهل للشحن السريع المجاني!',
    'cart.addMoreForFree': 'أضف للمطالبة بالشحن المجاني',

    // Checkout Modal
    'checkout.title': 'إتمام الطلب بأمان',
    'checkout.customerInfo': 'بيانات الشحن والتسليم',
    'checkout.fullName': 'الاسم الكامل',
    'checkout.email': 'البريد الإلكتروني',
    'checkout.address': 'عنوان الشارع والحي',
    'checkout.city': 'المدينة',
    'checkout.country': 'الدولة',
    'checkout.payment': 'طريقة الدفع',
    'checkout.creditCard': 'بطاقة مدى / ائتمان',
    'checkout.applePay': 'Apple Pay',
    'checkout.cod': 'الدفع عند الاستلام',
    'checkout.promoCode': 'كود الخصم (جرب QVIP10)',
    'checkout.apply': 'تطبيق',
    'checkout.placeOrder': 'تأكيد ودفع الطلب',
    'checkout.successTitle': 'تم تأكيد طلبك بنجاح!',
    'checkout.successDesc': 'تم حفظ طلبك في قاعدة البيانات وتوليد رقم التتبع السريع.',
    'checkout.trackingCode': 'رقم التتبع',
    'checkout.orderId': 'رقم الطلب',
    'checkout.backHome': 'العودة للرئيسية',

    // Size Advisor
    'size.title': 'مستشار المقاسات الذكي',
    'size.desc': 'حدد طولك ووزنك وطريقة الارتداء المفضلة للحصول على مقاسك المثالي بدقة 96%.',
    'size.height': 'الطول (سم)',
    'size.weight': 'الوزن (كجم)',
    'size.preference': 'أسلوب الارتداء المفضل',
    'size.fitBoxy': 'بوكسي معتدل (أكتاف منسدلة)',
    'size.fitOversized': 'واسع وفضفاض (Oversized)',
    'size.recommendation': 'المقاس الموصى به لك هو',
    'size.confidence': 'نسبة التطابق',
    'size.applySize': 'اختيار هذا المقاس',

    // Lookbook & Manifesto
    'lookbook.title': 'كتالوج الإطلالات والتنسيقات',
    'lookbook.subtitle': 'أفكار تنسيق هودي فويد الثقيل مع البنطلونات والأحذية الستريتوير',
    'manifesto.title': 'حرفية وجودة أقمشة Q WEAR',
    'manifesto.subtitle': 'ملابس مصنوعة لتدوم سنوات بعيداً عن موضة الفاست فاشون المؤقتة',

    // Common
    'common.lang': 'English',
    'common.switchLang': 'English',
    'common.close': 'إغلاق',
  },
  en: {
    // Top Bar
    'topbar.shipping': 'FREE EXPRESS DELIVERY ACROSS EGYPT ON ORDERS OVER 900 EGP',
    'topbar.fabric': 'Q SIGNATURE 420 GSM SWEATPANTS NOW AVAILABLE',
    'topbar.returns': 'COMPLIMENTARY 14-DAY RETURNS & EXCHANGES',
    'topbar.promo': 'USE CODE QVIP10 FOR 10% OFF YOUR ORDER',

    // Navigation
    'nav.allClothing': 'ALL CLOTHING',
    'nav.featured': 'FEATURED PIECE',
    'nav.lookbook': 'LOOKBOOK',
    'nav.about': 'ABOUT US & CRAFT',
    'nav.signIn': 'SIGN IN',
    'nav.createAccount': 'CREATE ACCOUNT',
    'nav.myAccount': 'MY ACCOUNT',
    'nav.signOut': 'SIGN OUT',
    'nav.search': 'SEARCH...',
    'nav.searchPlaceholder': 'Search by name, color, or fabric...',
    'nav.vipDrop': 'VIP DROP PASS',

    // Hero Banner
    'hero.badge': 'PREMIUM STREETWEAR // 420 GSM HEAVYWEIGHT COTTON',
    'hero.title1': 'Q SIGNATURE SWEATPANTS',
    'hero.title2': 'WIDE-LEG STREET ELEGANCE',
    'hero.desc': 'Engineered from ultra-comfortable 420 GSM heavyweight loopback cotton. Relaxed wide-leg straight drape with signature white Q insignia on the left thigh, deep pockets, and elasticated waistband.',
    'hero.shopNow': 'SHOP THE SWEATPANTS',
    'hero.explore': 'EXPLORE TEXTILE SPECS',
    'hero.statsGsm': '420 GSM',
    'hero.statsGsmLabel': 'Heavyweight comfort density',
    'hero.statsCotton': '100% Cotton',
    'hero.statsCottonLabel': 'Premium French Terry fleece',
    'hero.statsRating': '4.98 / 5.0',
    'hero.statsRatingLabel': 'Customer rating (142 reviews)',

    // Product Section
    'prod.badge': 'SIGNATURE FLAGSHIP PIECE // LIMITED ALLOTMENT',
    'prod.title': 'Q SIGNATURE WIDE-LEG SWEATPANTS',
    'prod.tagline': 'The highest standard of streetwear comfort and everyday elegance',
    'prod.price': 'Price',
    'prod.originalPrice': 'Original Price',
    'prod.save': 'Save 20%',
    'prod.colors': 'Available Colorways',
    'prod.sizes': 'Select Size',
    'prod.sizeGuide': 'Size & Fit Advisor',
    'prod.quantity': 'Quantity',
    'prod.addToBag': 'ADD TO SHOPPING BAG',
    'prod.buyNow': 'BUY NOW',
    'prod.inStock': 'In Stock (Only 50 pieces allocated)',
    'prod.freeShippingNotice': 'Eligible for Free Express Insured Shipping',
    'prod.featuresTab': 'Garment Features',
    'prod.careTab': 'Care & Laundry Guide',
    'prod.specsTab': 'Textile & Origin',
    'prod.material': 'Material',
    'prod.origin': 'Origin & Dye',
    'prod.fit': 'Silhouette Fit',
    'prod.weight': 'Fabric Density',
    'prod.quickView': 'Quick View',

    // Cart & Checkout
    'cart.title': 'SHOPPING BAG',
    'cart.empty': 'Your shopping bag is empty',
    'cart.emptyDesc': 'Add the Void 520 GSM hoodie to experience radical textile luxury.',
    'cart.startShopping': 'VIEW FLAGSHIP PIECE',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Express Shipping',
    'cart.free': 'FREE',
    'cart.total': 'Total',
    'cart.checkout': 'PROCEED TO CHECKOUT',
    'cart.freeProgress': 'You have unlocked Free Express Shipping!',
    'cart.addMoreForFree': 'Add more to unlock Free Express Shipping',

    // Checkout Modal
    'checkout.title': 'SECURE CHECKOUT',
    'checkout.customerInfo': 'Shipping & Contact Details',
    'checkout.fullName': 'Full Name',
    'checkout.email': 'Email Address',
    'checkout.address': 'Street Address',
    'checkout.city': 'City',
    'checkout.country': 'Country',
    'checkout.payment': 'Payment Method',
    'checkout.creditCard': 'Credit / Debit Card',
    'checkout.applePay': 'Apple Pay',
    'checkout.cod': 'Cash on Delivery',
    'checkout.promoCode': 'Promo Code (Try QVIP10)',
    'checkout.apply': 'Apply',
    'checkout.placeOrder': 'PLACE ORDER',
    'checkout.successTitle': 'ORDER CONFIRMED!',
    'checkout.successDesc': 'Your order has been recorded in our database with express courier tracking.',
    'checkout.trackingCode': 'Tracking Code',
    'checkout.orderId': 'Order ID',
    'checkout.backHome': 'Return to Store',

    // Size Advisor
    'size.title': 'Smart Size Advisor',
    'size.desc': 'Input your measurements and preferred drape for a 96% confidence sizing match.',
    'size.height': 'Height (cm)',
    'size.weight': 'Weight (kg)',
    'size.preference': 'Fit Silhouette Preference',
    'size.fitBoxy': 'Signature Boxy (Dropped Shoulder)',
    'size.fitOversized': 'Expansive Oversized',
    'size.recommendation': 'Your recommended size is',
    'size.confidence': 'Confidence Match',
    'size.applySize': 'Apply Recommended Size',

    // Lookbook & Manifesto
    'lookbook.title': 'Outfit Lookbook & Styling',
    'lookbook.subtitle': 'Style pairings featuring the heavyweight hoodie with denim and footwear',
    'manifesto.title': 'Q Wear Craft & Materials',
    'manifesto.subtitle': 'Garments engineered to outlast ephemeral fast fashion trends',

    // Common
    'common.lang': 'العربية',
    'common.switchLang': 'العربية',
    'common.close': 'Close',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to Arabic or user preference
  const [language, setLanguageState] = useState<Language>('ar');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('q_language') as Language;
      if (saved === 'ar' || saved === 'en') {
        setLanguageState(saved);
        applyHtmlAttributes(saved);
      } else {
        // Default to Arabic as requested by user
        applyHtmlAttributes('ar');
      }
    } catch (e) {
      applyHtmlAttributes('ar');
    }
  }, []);

  const applyHtmlAttributes = (lang: Language) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      if (lang === 'ar') {
        document.documentElement.classList.add('font-arabic');
      } else {
        document.documentElement.classList.remove('font-arabic');
      }
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('q_language', lang);
    } catch (e) {
      console.error(e);
    }
    applyHtmlAttributes(lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isRtl: language === 'ar',
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
