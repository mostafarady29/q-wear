'use client';

import React, { useState } from 'react';
import HeroBanner from '@/components/home/HeroBanner';
import DropHighlight from '@/components/home/DropHighlight';
import ProductGrid from '@/components/shop/ProductGrid';
import FabricSpecs from '@/components/home/FabricSpecs';
import QuickViewModal from '@/components/shop/QuickViewModal';
import SizeAdvisorModal from '@/components/shop/SizeAdvisorModal';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeAdvisorProduct, setSizeAdvisorProduct] = useState<Product | null>(null);
  const { language, isRtl, t } = useLanguage();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const looks = [
    {
      title: language === 'ar' ? 'إطلالة 01 // أسود فاحم كلاسيكي' : 'LOOK 01 // PITCH BLACK CLASSIC',
      items: language === 'ar' ? 'سويت بانتس Q بالقصة الواسعة + شعار Q الأبيض' : 'Q Wide-Leg Sweatpants + White Q Insignia',
      image: '/products/q-pants-1.png',
      drop: 'DROP 01',
    },
    {
      title: language === 'ar' ? 'إطلالة 02 // ستايل شارعي مريح' : 'LOOK 02 // RELAXED STREET STYLE',
      items: language === 'ar' ? 'سويت بانتس Q + تيشيرت كلاسيكي + سنيكرز' : 'Q Sweatpants + Classic Tee + Chunky Sneakers',
      image: '/products/q-pants-2.png',
      drop: 'DROP 01',
    },
    {
      title: language === 'ar' ? 'إطلالة 03 // الأرشيف الأساسي' : 'LOOK 03 // CORE ARCHIVE DRAPE',
      items: language === 'ar' ? 'سويت بانتس Q + قصة واسعة مستقيمة 420 GSM' : 'Q Sweatpants + Wide-Leg Straight Drape 420 GSM',
      image: '/products/q-pants-3.png',
      drop: 'CORE ARCHIVE',
    },
  ];

  return (
    <div>
      {/* Cinematic Hero */}
      <HeroBanner onExploreClick={scrollToCatalog} />

      {/* DROP 01: CORE ARCHIVE Spotlight */}
      <DropHighlight />

      {/* Catalog & Shop Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
          <div>
            <span className="text-xs font-mono-spec text-blue-400 uppercase tracking-widest block mb-1">
              {language === 'ar' ? 'القطعة الحصرية المتاحة' : 'FEATURED CLOTHING COLLECTION'}
            </span>
            <h2 className="font-brand text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
              {language === 'ar' ? 'تسوق البنطال الآن' : 'SHOP APPAREL'}
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-mono-spec uppercase text-zinc-400 hover:text-white transition-colors pb-1"
          >
            <span>{language === 'ar' ? 'عرض الكتالوج بالكامل' : 'SHOP ALL CLOTHES'}</span>
            <ArrowRight size={13} className="rtl:rotate-180" />
          </Link>
        </div>

        <ProductGrid
          products={PRODUCTS}
          onQuickView={(p) => setQuickViewProduct(p)}
          onOpenSizeAdvisor={(p) => setSizeAdvisorProduct(p)}
        />
      </div>

      {/* Textile Standards Showcase */}
      <FabricSpecs />

      {/* Outfit Lookbook Section */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono-spec text-blue-400 uppercase tracking-widest block mb-1">
                {language === 'ar' ? 'كتالوج الإطلالات // شتاء 2026' : 'SEASONAL LOOKBOOK // AUTUMN 2026'}
              </span>
              <h2 className="font-brand text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                {language === 'ar' ? 'تنسيقات وإطلالات الستريتوير' : 'OUTFIT LOOKBOOK'}
              </h2>
            </div>
            <Link
              href="/lookbook"
              className="inline-flex items-center space-x-2 rtl:space-x-reverse px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-mono-spec text-xs tracking-wider uppercase rounded-lg border border-white/10 transition-colors cursor-pointer"
            >
              <Compass size={14} />
              <span>{language === 'ar' ? 'استعراض جميع الإطلالات' : 'EXPLORE ALL OUTFITS'}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {looks.map((look, i) => (
              <div
                key={i}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10"
              >
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] font-mono-spec text-blue-400 uppercase tracking-widest block">
                    {look.drop}
                  </span>
                  <h3 className="font-mono-spec font-bold text-sm uppercase tracking-wider">
                    {look.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono-spec">{look.items}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View & Size Advisor Modals */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeAdvisor={(p) => {
          setQuickViewProduct(null);
          setSizeAdvisorProduct(p);
        }}
      />

      <SizeAdvisorModal
        product={sizeAdvisorProduct}
        isOpen={!!sizeAdvisorProduct}
        onClose={() => setSizeAdvisorProduct(null)}
        onApplySize={(size) => {
          console.log('Selected size:', size);
        }}
      />
    </div>
  );
}
