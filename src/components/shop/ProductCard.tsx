'use client';

import React, { useState } from 'react';
import { Eye, ShoppingBag, Ruler, Star, Check, Sparkles } from 'lucide-react';
import { Product, ProductColor } from '@/types';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onOpenSizeAdvisor: (product: Product) => void;
}

export default function ProductCard({
  product,
  onQuickView,
  onOpenSizeAdvisor,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { language, isRtl, t } = useLanguage();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const displayName = language === 'ar' ? (product.nameAr || product.name) : product.name;
  const displaySubtitle = language === 'ar' ? (product.subtitleAr || product.subtitle) : product.subtitle;
  const displayDrop = language === 'ar' ? (product.releaseDropAr || product.releaseDrop) : product.releaseDrop;

  return (
    <div
      className="group relative flex flex-col bg-zinc-950/40 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container (3:4 ratio) */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={displayName}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex flex-col gap-1.5 z-10">
          <span className="px-2 py-0.5 text-[9px] font-mono-spec font-semibold tracking-widest uppercase bg-white text-zinc-950 rounded">
            {language === 'ar' ? 'جديد' : 'NEW'}
          </span>
          <span className="px-2 py-0.5 text-[9px] font-mono-spec font-semibold tracking-widest uppercase bg-amber-500/90 text-zinc-950 rounded">
            {language === 'ar' ? 'إصدار محدود' : 'LTD DROP'}
          </span>
          {product.gsm && (
            <span className="px-2 py-0.5 text-[9px] font-mono-spec tracking-wider bg-black/70 backdrop-blur-md text-zinc-300 border border-white/10 rounded">
              {product.gsm} GSM
            </span>
          )}
        </div>

        {/* Stock status indicator */}
        <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 z-10">
          {product.stock <= 25 && (
            <span className="px-2 py-0.5 text-[9px] font-mono-spec bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded backdrop-blur-sm">
              {language === 'ar' ? `متبقي ${product.stock} فقط` : `ONLY ${product.stock} LEFT`}
            </span>
          )}
        </div>

        {/* Quick Action Floating Bar on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2.5 px-3 bg-zinc-950/90 hover:bg-black text-white text-[11px] font-mono-spec tracking-wider uppercase backdrop-blur-md rounded border border-white/10 flex items-center justify-center space-x-1.5 rtl:space-x-reverse transition-colors cursor-pointer"
          >
            <Eye size={14} />
            <span>{t('prod.quickView')}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenSizeAdvisor(product);
            }}
            className="p-2.5 bg-zinc-950/90 hover:bg-black text-zinc-300 hover:text-white backdrop-blur-md rounded border border-white/10 transition-colors cursor-pointer"
            title={t('prod.sizeGuide')}
          >
            <Ruler size={14} />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div>
          {/* Release / Category line */}
          <div className="flex items-center justify-between text-[10px] font-mono-spec text-zinc-400 mb-1 uppercase tracking-wider">
            <span>{displayDrop}</span>
            <div className="flex items-center text-amber-400">
              <Star size={10} className="fill-amber-400 mr-1 rtl:mr-0 rtl:ml-1" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Bilingual Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-mono-spec font-bold text-xs uppercase tracking-wider text-white hover:text-blue-400 cursor-pointer transition-colors"
          >
            {displayName}
          </h3>

          {/* Alternate language secondary line for rich bilingual experience */}
          <p className="text-[10px] text-blue-400/80 font-mono-spec">
            {language === 'ar' ? product.name : product.nameAr}
          </p>

          <p className="text-[11px] text-zinc-400 line-clamp-1 mt-1">
            {displaySubtitle}
          </p>
        </div>

        {/* Color swatches & Size selector */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                  selectedColor.name === c.name
                    ? 'ring-2 ring-blue-500 scale-110 border-white'
                    : 'border-white/20 opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
                title={language === 'ar' ? (c.nameAr || c.name) : c.name}
              />
            ))}
          </div>

          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(s);
                }}
                className={`px-1.5 py-0.5 text-[9px] font-mono-spec rounded border transition-colors cursor-pointer ${
                  selectedSize === s
                    ? 'bg-white text-zinc-950 font-bold border-white'
                    : 'text-zinc-400 border-white/10 hover:border-white/30'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & Add Button */}
        <div className="pt-1 flex items-center justify-between">
          <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-mono-spec font-bold text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono-spec text-zinc-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={justAdded}
            className={`px-3 py-1.5 rounded text-xs font-mono-spec uppercase tracking-wider flex items-center space-x-1.5 rtl:space-x-reverse transition-all cursor-pointer ${
              justAdded
                ? 'bg-emerald-500 text-white'
                : 'bg-white/10 hover:bg-white hover:text-zinc-950 text-white border border-white/10'
            }`}
          >
            {justAdded ? (
              <>
                <Check size={13} />
                <span>{language === 'ar' ? 'تمت الإضافة' : 'ADDED'}</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                <span>{language === 'ar' ? 'أضف للحقيبة' : 'ADD TO BAG'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
