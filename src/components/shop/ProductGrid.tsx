'use client';

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Product, Category } from '@/types';
import { CATEGORIES } from '@/data/products';
import { ArrowUpDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onOpenSizeAdvisor: (product: Product) => void;
}

export default function ProductGrid({
  products,
  onQuickView,
  onOpenSizeAdvisor,
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const { language, isRtl, t } = useLanguage();

  // Filter products
  let filtered = [...products];
  if (selectedCategory !== 'all') {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  // Sort products
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'gsm') {
    filtered.sort((a, b) => (b.gsm || 0) - (a.gsm || 0));
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <section className="py-12" id="catalog">
      {/* Category Pills & Sort Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
        
        {/* Category Tabs */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const categoryName = language === 'ar' ? (cat.nameAr || cat.name) : cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as Category)}
                className={`px-3.5 py-1.5 rounded text-xs font-mono-spec tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-zinc-950 font-bold shadow-lg'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
                }`}
              >
                {categoryName} ({cat.count})
              </button>
            );
          })}
        </div>

        {/* Count Indicator */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse self-end md:self-auto text-xs font-mono-spec text-zinc-400">
          <span>
            {language === 'ar'
              ? `${filtered.length} قطعة معروضة`
              : `SHOWING ${filtered.length} ${filtered.length === 1 ? 'PIECE' : 'PIECES'}`}
          </span>
        </div>
      </div>

      {/* Grid of Cards */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl">
          <p className="text-sm font-mono-spec text-zinc-400 uppercase">
            {language === 'ar' ? 'لا توجد قطع ملابس في هذا التصنيف حالياً.' : 'No clothing items found in this category.'}
          </p>
        </div>
      ) : (
        <div className="max-w-md mx-auto sm:max-w-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onOpenSizeAdvisor={onOpenSizeAdvisor}
            />
          ))}
        </div>
      )}
    </section>
  );
}
