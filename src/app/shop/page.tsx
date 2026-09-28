'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';
import QuickViewModal from '@/components/shop/QuickViewModal';
import SizeAdvisorModal from '@/components/shop/SizeAdvisorModal';
import { Category, Product } from '@/types';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [minGsm, setMinGsm] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeAdvisorProduct, setSizeAdvisorProduct] = useState<Product | null>(null);

  const { language, isRtl, t } = useLanguage();

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.nameAr && p.nameAr.toLowerCase().includes(q)) ||
          p.subtitle.toLowerCase().includes(q) ||
          (p.subtitleAr && p.subtitleAr.toLowerCase().includes(q)) ||
          p.material.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          (p.tagsAr && p.tagsAr.some((t) => t.toLowerCase().includes(q)))
      );
    }

    if (minGsm > 0) {
      list = list.filter((p) => (p.gsm || 0) >= minGsm);
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'gsm') {
      list.sort((a, b) => (b.gsm || 0) - (a.gsm || 0));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy, minGsm]);

  return (
    <div className="py-12 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 mb-8">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs font-mono-spec text-blue-400 mb-2">
            <span>Q WEAR</span>
            <span>//</span>
            <span>{language === 'ar' ? 'جميع الملابس والأطقم' : 'ALL CLOTHING & APPAREL'}</span>
          </div>
          <h1 className="font-brand text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            {language === 'ar' ? 'تشكيلة الملابس' : 'ALL CLOTHING'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono-spec mt-2 max-w-2xl">
            {language === 'ar'
              ? 'تصفح هودي فويد الثقيل 520 GSM المصنوع من أفخر خامات القطن الياباني بحياكة حلقية وتفاصيل معمارية مريحة.'
              : 'Shop our signature heavyweight 520 GSM loopback cotton hoodie, crafted with Japanese precision and architectural drape.'}
          </p>
        </div>

        {/* Filter and Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar Filter Controls */}
          <div className="space-y-6 lg:sticky lg:top-24 h-fit">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'ابحث بالاسم، اللون، أو الخامة...' : 'Search clothing by name, color, or fabric...'}
                className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2.5 text-xs text-white placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-white/5 space-y-3">
              <h3 className="text-xs font-mono-spec uppercase tracking-wider text-zinc-200 font-semibold flex items-center justify-between">
                <span>{language === 'ar' ? 'التصنيفات' : 'CATEGORIES'}</span>
                <Filter size={13} className="text-zinc-500" />
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const catName = language === 'ar' ? (cat.nameAr || cat.name) : cat.name;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id as Category)}
                      className={`w-full text-left rtl:text-right px-2.5 py-1.5 rounded text-xs font-mono-spec flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-white text-zinc-950 font-bold'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{catName}</span>
                      <span className="text-[10px] opacity-60">({cat.count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fabric Density (GSM) Slider */}
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono-spec">
                <span className="text-zinc-200 font-semibold uppercase">
                  {language === 'ar' ? 'الحد الأدنى لوزن النسيج (GSM)' : 'MIN FABRIC GSM'}
                </span>
                <span className="text-blue-400 font-bold">{minGsm > 0 ? `${minGsm}+ GSM` : (language === 'ar' ? 'الكل' : 'ALL')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="520"
                step="20"
                value={minGsm}
                onChange={(e) => setMinGsm(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] font-mono-spec text-zinc-500">
                <span>{language === 'ar' ? 'عادي' : 'Standard'}</span>
                <span>300 GSM</span>
                <span>520 GSM</span>
              </div>
            </div>

            {/* Reset Filters */}
            {(selectedCategory !== 'all' || searchQuery || minGsm > 0) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setMinGsm(0);
                }}
                className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono-spec uppercase rounded border border-white/10 flex items-center justify-center space-x-1.5 rtl:space-x-reverse transition-colors cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>{language === 'ar' ? 'إعادة ضبط الفلاتر' : 'RESET ALL FILTERS'}</span>
              </button>
            )}

          </div>

          {/* Right Main Catalog Grid */}
          <div className="lg:col-span-3">
            
            {/* Top Bar with count */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6 text-xs font-mono-spec">
              <span className="text-zinc-400">
                {language === 'ar'
                  ? `عرض ${filteredProducts.length} من أصل ${PRODUCTS.length} قطعة`
                  : `SHOWING ${filteredProducts.length} OF ${PRODUCTS.length} CLOTHING ITEMS`}
              </span>
            </div>

            {/* Product Cards */}
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-white/10 rounded-2xl">
                <p className="text-sm font-mono-spec text-zinc-400 uppercase">
                  {language === 'ar' ? 'لا توجد قطع ملابس مطابقة للبحث.' : 'No clothing items match your active filters.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setMinGsm(0);
                  }}
                  className="mt-4 px-4 py-2 bg-white text-zinc-950 text-xs font-mono-spec uppercase font-bold rounded cursor-pointer"
                >
                  {language === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8 max-w-2xl">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onQuickView={(prod) => setQuickViewProduct(prod)}
                    onOpenSizeAdvisor={(prod) => setSizeAdvisorProduct(prod)}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Modals */}
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
          console.log('Applied size:', size);
        }}
      />
    </div>
  );
}
