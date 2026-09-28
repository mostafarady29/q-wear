'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function DropHighlight() {
  const product = PRODUCTS[0];
  const { language, isRtl, t } = useLanguage();
  const { formatPrice } = useCurrency();

  const displayName = language === 'ar' ? (product.nameAr || product.name) : product.name;
  const displaySubtitle = language === 'ar' ? (product.subtitleAr || product.subtitle) : product.subtitle;
  const displayDesc = language === 'ar' ? (product.descriptionAr || product.description) : product.description;
  const displayFeatures = language === 'ar' ? (product.featuresAr || product.features) : product.features;

  return (
    <section className="py-20 border-t border-white/5 bg-zinc-950" id="drop-01">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Large Editorial Image with overlay stats */}
          <div className="lg:col-span-7 relative group">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 relative shadow-2xl">
              <img
                src={product.images[0]}
                alt={displayName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Overlay Spec Tag */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <span className="text-[10px] font-mono-spec text-blue-400 uppercase tracking-widest block">
                    {language === 'ar' ? 'كود القطعة' : 'SKU'}: {product.sku}
                  </span>
                  <h3 className="font-mono-spec font-bold text-lg uppercase tracking-wider">
                    {product.releaseDrop}
                  </h3>
                </div>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded text-xs font-mono-spec border border-white/20">
                  {product.gsm} GSM // 100% {language === 'ar' ? 'قطن عضوي' : 'COTTON'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Clothing Description */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse text-xs font-mono-spec text-blue-400">
              <Layers size={15} />
              <span>{t('prod.badge')}</span>
            </div>

            <div>
              <h2 className="font-brand text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-tight">
                {displayName}
              </h2>
              <p className="text-xs font-mono-spec text-blue-400/80 mt-1">
                {language === 'ar' ? product.name : product.nameAr}
              </p>
            </div>

            <p className="text-sm text-zinc-300 font-mono-spec leading-relaxed">
              {displayDesc}
            </p>

            {/* Bullet Highlights */}
            {displayFeatures && (
              <div className="space-y-3 text-xs font-mono-spec text-zinc-300">
                {displayFeatures.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 rtl:space-x-reverse">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 flex items-baseline space-x-3 rtl:space-x-reverse">
              <span className="text-2xl font-mono-spec font-bold text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-mono-spec text-zinc-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-xs font-mono-spec text-emerald-400 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded">
                {language === 'ar' ? 'شحن سريع مجاني' : 'FREE EXPRESS SHIPPING'}
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="px-6 py-3.5 bg-white hover:bg-zinc-200 text-zinc-950 font-mono-spec text-xs tracking-wider uppercase font-bold rounded-lg transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer"
              >
                <span>{t('hero.shopNow')}</span>
                <ArrowRight size={14} className="rtl:rotate-180" />
              </Link>
              <Link
                href="/manifesto"
                className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono-spec text-xs tracking-wider uppercase rounded-lg border border-white/10 transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer"
              >
                <span>{language === 'ar' ? 'تفاصيل الأقمشة والقصة' : 'FABRIC & FIT SPECS'}</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
