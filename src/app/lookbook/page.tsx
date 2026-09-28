'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Sparkles, Layers, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function LookbookPage() {
  const { language, isRtl } = useLanguage();

  const looks = [
    {
      id: '01',
      title: language === 'ar' ? 'الإطلالة 01 // القصة الواسعة الكلاسيكية' : 'LOOK 01 // WIDE-LEG STREET CLASSIC',
      subtitle: language === 'ar' ? 'الإصدار الأول: الأرشيف الأساسي' : 'Drop 01: Core Archive',
      location: language === 'ar' ? 'القاهرة الجديدة، مصر' : 'New Cairo, Egypt',
      photographer: 'Q Creative Studio',
      heroImage: '/products/q-pants-1.png',
      colorway: language === 'ar' ? 'أسود فاحم مع شعار Q الأبيض' : 'Pitch Black with White Q Logo',
      description: language === 'ar'
        ? 'النموذج الأيقوني لقصة Q الحضرية الواسعة. قطن فرينش تيري فاخر بوزن 420 GSM ينسدل بأناقة طبيعية مع خصر مطاطي مرن وشعار Q الأيقوني المطبوع بدقة على الفخذ الأيسر.'
        : 'The archetype of the Q urban relaxed silhouette. 420 GSM premium loopback cotton drapes effortlessly with an elasticated waist and the iconic white Q logo printed on the upper thigh.',
      piece: {
        name: language === 'ar' ? 'سويت بانتس Q الأيقوني بالقصة الواسعة' : 'Q SIGNATURE WIDE-LEG SWEATPANTS',
        sku: 'Q-PT-001',
        price: language === 'ar' ? '450 جنيه' : '450 EGP',
        gsm: '420 GSM',
        material: language === 'ar' ? '100% قطن فرينش تيري فاخر' : '100% Premium Cotton French Terry',
      },
    },
    {
      id: '02',
      title: language === 'ar' ? 'الإطلالة 02 // انسيابية الحركة اليومية' : 'LOOK 02 // EFFORTLESS DRAPE & COMFORT',
      subtitle: language === 'ar' ? 'تصميم مريح للارتداء اليومي' : 'Daily Comfort Edition',
      location: language === 'ar' ? 'المعادي، القاهرة' : 'Maadi, Cairo',
      photographer: 'Q Creative Studio',
      heroImage: '/products/q-pants-2.png',
      colorway: language === 'ar' ? 'أسود فاحم' : 'Pitch Black Monolith',
      description: language === 'ar'
        ? 'تناغم القصة المستقيمة الواسعة مع ملمس القطن الناعم عالي الجودة. جيوب جانبية عميقة وخياطة متينة ومزدوجة تتحمل الاستخدام المكثف والغسيل المتكرر.'
        : 'Harmonious straight wide cut crafted from ultra-soft heavyweight loopback cotton. Reinforced deep side pockets and double-needle stitching built to last.',
      piece: {
        name: language === 'ar' ? 'سويت بانتس Q الأيقوني بالقصة الواسعة' : 'Q SIGNATURE WIDE-LEG SWEATPANTS',
        sku: 'Q-PT-001',
        price: language === 'ar' ? '450 جنيه' : '450 EGP',
        gsm: '420 GSM',
        material: language === 'ar' ? '100% قطن فرينش تيري فاخر' : '100% Premium Cotton French Terry',
      },
    },
    {
      id: '03',
      title: language === 'ar' ? 'الإطلالة 03 // تفاصيل الشعار والأطراف' : 'LOOK 03 // SIGNATURE INSIGNIA & DETAIL',
      subtitle: language === 'ar' ? 'الأرشيف الدائم' : 'Permanent Core Archive',
      location: language === 'ar' ? 'الزمالك، القاهرة' : 'Zamalek, Cairo',
      photographer: 'Q Creative Studio',
      heroImage: '/products/q-pants-3.png',
      colorway: language === 'ar' ? 'أسود ناصع متباين' : 'Contrast Monochrome',
      description: language === 'ar'
        ? 'شعار حرف Q الأبيض البارز المصمم بعناية فائقة على خلفية من القماش الأسود المعالج ضد الانكماش وبهتان الألوان.'
        : 'Our striking white Q insignia contrasted sharply against rich pitch-black pre-shrunk cotton that preserves its fit and deep shade after repeated washes.',
      piece: {
        name: language === 'ar' ? 'سويت بانتس Q الأيقوني بالقصة الواسعة' : 'Q SIGNATURE WIDE-LEG SWEATPANTS',
        sku: 'Q-PT-001',
        price: language === 'ar' ? '450 جنيه' : '450 EGP',
        gsm: '420 GSM',
        material: language === 'ar' ? '100% قطن فرينش تيري فاخر' : '100% Premium Cotton French Terry',
      },
    },
  ];

  return (
    <div className="py-12 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs font-mono-spec text-blue-400 mb-2">
            <span>{language === 'ar' ? 'كتالوج إطلالات سويت بانتس Q' : 'Q SWEATPANTS LOOKBOOK'}</span>
            <span>//</span>
            <span>{language === 'ar' ? 'الإصدار الأول 2026' : 'DROP 01 // 2026'}</span>
          </div>
          <h1 className="font-brand text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            {language === 'ar' ? 'كتالوج الإطلالات // LOOKBOOK' : 'OUTFIT LOOKBOOK'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono-spec mt-2 max-w-2xl">
            {language === 'ar'
              ? 'إلهام تنسيق سويت بانتس Q الأيقوني الواسع بوزن 420 GSM، مع إبراز تفاصيل الشعار والقماش المريح الفاخر.'
              : 'Styling inspirations and outfit perspectives featuring our signature 420 GSM wide-leg French Terry sweatpants.'}
          </p>
        </div>

        {/* Looks List */}
        <div className="space-y-24">
          {looks.map((look) => (
            <div key={look.id} className="space-y-6">
              
              {/* Image Frame */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl">
                <img
                  src={look.heroImage}
                  alt={look.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-6 left-6 rtl:left-auto rtl:right-6 flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded text-xs font-mono-spec text-white font-bold">
                    {look.subtitle}
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded text-xs font-mono-spec text-blue-300 font-bold">
                    {look.colorway}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between text-white gap-2">
                  <div>
                    <h2 className="font-mono-spec font-bold text-xl sm:text-2xl uppercase tracking-wider">
                      {look.title}
                    </h2>
                    <p className="text-xs font-mono-spec text-zinc-400 mt-1">
                      {language === 'ar' ? 'الموقع:' : 'LOCATION:'} {look.location} • {language === 'ar' ? 'المصور:' : 'PHOTO:'} {look.photographer}
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    className="self-start sm:self-auto px-5 py-2.5 bg-white text-zinc-950 font-mono-spec text-xs font-bold uppercase rounded-lg hover:bg-zinc-200 transition-colors flex items-center space-x-1.5 rtl:space-x-reverse"
                  >
                    <span>{language === 'ar' ? 'تسوق هذا الهودي' : 'SHOP THIS HOODIE'}</span>
                    <ArrowRight size={13} className="rtl:rotate-180" />
                  </Link>
                </div>
              </div>

              {/* Look Breakdown & Featured Piece */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                <div className="lg:col-span-6">
                  <p className="text-xs sm:text-sm text-zinc-300 font-mono-spec leading-relaxed">
                    {look.description}
                  </p>
                </div>

                <div className="lg:col-span-6">
                  <div className="p-4 bg-zinc-900/60 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-white/20 transition-colors">
                    <div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                        <span className="text-[10px] font-mono-spec text-blue-400 font-bold uppercase">
                          {look.piece.gsm}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-[10px] font-mono-spec text-zinc-400 uppercase">
                          {look.piece.material}
                        </span>
                      </div>
                      <h4 className="font-mono-spec font-bold text-sm uppercase text-white tracking-wider">
                        {look.piece.name}
                      </h4>
                      <span className="text-[11px] font-mono-spec text-zinc-500">
                        SKU: {look.piece.sku}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse self-end sm:self-auto">
                      <span className="text-white font-mono-spec font-bold text-lg">{look.piece.price}</span>
                      <Link
                        href="/shop"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-mono-spec font-bold uppercase transition-colors"
                      >
                        {language === 'ar' ? 'طلب فوري' : 'ORDER'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
