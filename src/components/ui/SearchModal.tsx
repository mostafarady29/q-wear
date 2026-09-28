'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';
import { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { formatPrice } = useCurrency();
  const { language, isRtl, t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          (p.nameAr && p.nameAr.toLowerCase().includes(query.toLowerCase())) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          (p.subtitleAr && p.subtitleAr.toLowerCase().includes(query.toLowerCase())) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          (p.tagsAr && p.tagsAr.some((t) => t.toLowerCase().includes(query.toLowerCase()))) ||
          p.material.toLowerCase().includes(query.toLowerCase()) ||
          (p.materialAr && p.materialAr.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const suggestedTags = language === 'ar'
    ? ['520 GSM', 'هودي ثقيل', 'قطن ياباني', 'فرينش تيري', 'أسود أوبسيديان']
    : ['520 GSM', 'Heavyweight Hoodie', 'French Terry', 'Japanese Cotton', 'Obsidian Black'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-white/10 px-4 py-3.5 bg-zinc-950/50">
          <Search className="text-zinc-400 mr-3 rtl:mr-0 rtl:ml-3 shrink-0" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'ar' ? 'ابحث في الملابس والخامات (مثل: 520 GSM، هودي، قطن)...' : 'Search clothing, fabrics (e.g. 520 GSM, Hoodie, Cotton)...'}
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-mono-spec"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-zinc-400 hover:text-white p-1 mr-2 rtl:mr-0 rtl:ml-2 cursor-pointer"
              aria-label="Clear Query"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono-spec text-zinc-400 hover:text-white px-2 py-1 bg-white/5 rounded border border-white/10 cursor-pointer shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggested Tags */}
        <div className="px-4 py-3 bg-zinc-950/30 border-b border-white/5 flex items-center space-x-2 rtl:space-x-reverse overflow-x-auto text-[11px] font-mono-spec text-zinc-400">
          <span className="text-zinc-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles size={12} className="text-amber-400" />
            {language === 'ar' ? 'كلمات شائعة:' : 'POPULAR:'}
          </span>
          {suggestedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 hover:text-white rounded text-zinc-300 transition-colors shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-white/5">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-zinc-400 text-xs font-mono-spec">
              {language === 'ar'
                ? 'اكتب للبحث في تشكيلة ملابس Q وخاماتها الفاخرة.'
                : 'Type to search Q clothing and premium fabric specifications.'}
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-zinc-400 text-xs font-mono-spec">
              {language === 'ar'
                ? `لم يتم العثور على قطع تطابق "${query}".`
                : `No clothing items found matching "${query}".`}
            </div>
          ) : (
            results.map((product) => {
              const name = language === 'ar' ? (product.nameAr || product.name) : product.name;
              const subtitle = language === 'ar' ? (product.subtitleAr || product.subtitle) : product.subtitle;
              return (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="py-3 flex items-center justify-between group hover:bg-white/5 px-2 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-12 h-14 bg-zinc-800 rounded overflow-hidden relative shrink-0">
                      <img
                        src={product.images[0]}
                        alt={name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono-spec font-bold text-white group-hover:text-blue-400 transition-colors uppercase">
                        {name}
                      </h4>
                      <p className="text-[11px] text-zinc-400">{subtitle}</p>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                        {product.gsm && (
                          <span className="text-[9px] font-mono-spec px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">
                            {product.gsm} GSM
                          </span>
                        )}
                        <span className="text-[9px] font-mono-spec text-zinc-500 uppercase">
                          {language === 'ar' ? (product.categoryAr || product.category) : product.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="font-mono-spec font-bold text-xs text-white">
                    {formatPrice(product.price)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
