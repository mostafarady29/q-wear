'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, ChevronDown, Star, Sparkles } from 'lucide-react';
import QLogo from '@/components/ui/QLogo';
import { useLanguage } from '@/context/LanguageContext';

interface HeroBannerProps {
  onExploreClick: () => void;
}

export default function HeroBanner({ onExploreClick }: HeroBannerProps) {
  const { language, t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950">
      
      {/* Background Cinematic Visual with dark luxury vignettes */}
      <div className="absolute inset-0 z-0">
        <img
          src="/products/q-pants-1.png"
          alt="Q Signature Wide-Leg Sweatpants"
          className="w-full h-full object-cover object-center opacity-30 filter brightness-90 contrast-125 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-zinc-950" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        
        {/* Drop Badge */}
        <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 animate-in fade-in duration-500">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-subtle"></span>
          <span className="text-[11px] font-mono-spec tracking-widest text-zinc-300 uppercase">
            {t('hero.badge')}
          </span>
        </div>

        {/* Official Brand Emblem */}
        <div className="flex justify-center mb-6">
          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/15 backdrop-blur-xl shadow-[0_0_50px_rgba(255,255,255,0.08)] hover:border-white/30 transition-all duration-500 hover:scale-105">
            <QLogo size={68} />
          </div>
        </div>

        {/* Monolithic Title */}
        <h1 className="font-brand text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-tight max-w-5xl mx-auto">
          {t('hero.title1')} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
            {t('hero.title2')}
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-300 font-mono-spec max-w-2xl mx-auto tracking-wide leading-relaxed">
          {t('hero.desc')}
        </p>

        {/* Spec Pill Highlights */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] font-mono-spec text-zinc-400">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 bg-zinc-900/60 rounded border border-white/5 backdrop-blur-sm">
            <span className="text-white font-bold">{t('hero.statsGsm')}</span>
            <span>{t('hero.statsGsmLabel')}</span>
          </div>
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 bg-zinc-900/60 rounded border border-white/5 backdrop-blur-sm">
            <span className="text-white font-bold">{t('hero.statsCotton')}</span>
            <span>{t('hero.statsCottonLabel')}</span>
          </div>
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 bg-zinc-900/60 rounded border border-white/5 backdrop-blur-sm">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-white font-bold">{t('hero.statsRating')}</span>
            <span>{t('hero.statsRatingLabel')}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-zinc-200 text-zinc-950 font-mono-spec text-xs tracking-widest uppercase font-extrabold rounded-lg shadow-2xl transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse group cursor-pointer"
          >
            <span>{t('hero.shopNow')}</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>

          <Link
            href="/lookbook"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900/80 hover:bg-zinc-800 text-white font-mono-spec text-xs tracking-widest uppercase rounded-lg border border-white/10 backdrop-blur-md transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer"
          >
            <Compass size={15} />
            <span>{t('nav.lookbook')}</span>
          </Link>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-14 flex flex-col items-center justify-center text-zinc-500 text-[10px] font-mono-spec uppercase tracking-widest space-y-1">
          <span>{language === 'ar' ? 'مرر للأسفل لاستعراض تفاصيل الهودي' : 'SCROLL TO VIEW THE HOODIE'}</span>
          <ChevronDown size={14} className="animate-bounce" />
        </div>

      </div>
    </section>
  );
}
