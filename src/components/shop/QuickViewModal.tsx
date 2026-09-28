'use client';

import React, { useState } from 'react';
import { X, Ruler, ShoppingBag, Check, Star, Globe, Sparkles } from 'lucide-react';
import { Product, ProductColor } from '@/types';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSizeAdvisor: (product: Product) => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onOpenSizeAdvisor,
}: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { language, toggleLanguage, isRtl, t } = useLanguage();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [localLang, setLocalLang] = useState<'ar' | 'en' | 'auto'>('auto');

  // Initialize selected values when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setActiveImageIndex(0);
      setQuantity(1);
    }
  }, [product]);

  if (!isOpen || !product || !selectedColor) return null;

  const currentLang = localLang === 'auto' ? language : localLang;

  const displayName = currentLang === 'ar' ? (product.nameAr || product.name) : product.name;
  const displaySubtitle = currentLang === 'ar' ? (product.subtitleAr || product.subtitle) : product.subtitle;
  const displayDescription = currentLang === 'ar' ? (product.descriptionAr || product.description) : product.description;
  const displayMaterial = currentLang === 'ar' ? (product.materialAr || product.material) : product.material;
  const displayOrigin = currentLang === 'ar' ? (product.originAr || product.origin) : product.origin;
  const displayFit = currentLang === 'ar' ? (product.fitAr || product.fit) : product.fit;
  const displayDrop = currentLang === 'ar' ? (product.releaseDropAr || product.releaseDrop) : product.releaseDrop;
  const displayFeatures = currentLang === 'ar' ? (product.featuresAr || product.features) : product.features;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls: Close & Inline Language Switcher */}
        <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 flex items-center space-x-2 rtl:space-x-reverse">
          <button
            onClick={() => setLocalLang(currentLang === 'ar' ? 'en' : 'ar')}
            className="flex items-center space-x-1 py-1.5 px-3 rounded-full text-xs font-mono-spec bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border border-white/10 transition-colors cursor-pointer"
            title="Toggle Arabic / English"
          >
            <Globe size={13} className="text-blue-400" />
            <span className="font-bold">{currentLang === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 rounded-full border border-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-zinc-900 relative">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={displayName}
                className="w-full h-full object-cover object-center"
              />
              {product.gsm && (
                <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 bg-black/75 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono-spec text-zinc-300">
                  {product.gsm} GSM {currentLang === 'ar' ? 'وزن النسيج' : 'FABRIC WEIGHT'}
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 rtl:space-x-reverse">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-20 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-blue-500 ring-2 ring-blue-500/30'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Key features bullet points */}
            {displayFeatures && (
              <div className="p-3.5 bg-zinc-900/40 rounded-xl border border-white/5 space-y-1.5 text-xs text-zinc-300 font-mono-spec">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block mb-1">
                  {currentLang === 'ar' ? 'أبرز مميزات القطعة' : 'GARMENT HIGHLIGHTS'}
                </span>
                {displayFeatures.slice(0, 3).map((f, i) => (
                  <div key={i} className="flex items-start space-x-2 rtl:space-x-reverse">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Garment Architecture & Controls */}
          <div className="flex flex-col justify-between space-y-5">
            <div>
              {/* Drop / SKU code */}
              <div className="flex items-center justify-between text-[11px] font-mono-spec text-zinc-400 mb-1">
                <span>{displayDrop}</span>
                <span>SKU: {product.sku}</span>
              </div>

              {/* Title & Price */}
              <h2 className="font-mono-spec font-bold text-xl uppercase tracking-wider text-white">
                {displayName}
              </h2>
              
              {/* Secondary Language Title */}
              <p className="text-xs text-blue-400/90 font-mono-spec mt-0.5">
                {currentLang === 'ar' ? product.name : product.nameAr}
              </p>

              <p className="text-xs text-zinc-400 mt-1 font-mono-spec">{displaySubtitle}</p>

              <div className="flex items-baseline space-x-3 rtl:space-x-reverse mt-3">
                <span className="text-2xl font-mono-spec font-bold text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono-spec text-zinc-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <div className="ml-auto rtl:ml-0 rtl:mr-auto flex items-center text-amber-400 text-xs font-mono-spec">
                  <Star size={12} className="fill-amber-400 mr-1 rtl:mr-0 rtl:ml-1" />
                  <span>{product.rating} ({product.reviewsCount} {currentLang === 'ar' ? 'تقييم' : 'reviews'})</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-300 mt-4 leading-relaxed">
                {displayDescription}
              </p>

              {/* Color Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-mono-spec mb-2">
                  <span className="text-zinc-400 uppercase">
                    {currentLang === 'ar' ? 'اللون المختار:' : 'COLOR:'}
                  </span>
                  <span className="text-white font-medium">
                    {currentLang === 'ar' ? (selectedColor.nameAr || selectedColor.name) : selectedColor.name}
                  </span>
                </div>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`h-7 px-3 rounded-full flex items-center space-x-2 rtl:space-x-reverse border text-xs font-mono-spec transition-all cursor-pointer ${
                        selectedColor.name === c.name
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-white/10 text-zinc-400 hover:border-white/30'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.hex }} />
                      <span>{currentLang === 'ar' ? (c.nameAr || c.name) : c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection & Fit Advisor Shortcut */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-mono-spec mb-2">
                  <span className="text-zinc-400 uppercase">
                    {currentLang === 'ar' ? 'اختر المقاس:' : 'SELECT SIZE:'}
                  </span>
                  <button
                    onClick={() => onOpenSizeAdvisor(product)}
                    className="flex items-center space-x-1 rtl:space-x-reverse text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                  >
                    <Ruler size={13} />
                    <span>{t('prod.sizeGuide')}</span>
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 text-xs font-mono-spec rounded border uppercase transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-white text-zinc-950 font-bold border-white shadow-lg'
                          : 'bg-zinc-900/60 text-zinc-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textile Specs Grid */}
              <div className="mt-5 p-3 rounded-lg bg-zinc-900/60 border border-white/5 space-y-1.5 text-[11px] font-mono-spec text-zinc-400">
                <div className="flex justify-between">
                  <span>{currentLang === 'ar' ? 'طبيعة القصة:' : 'FIT SILHOUETTE:'}</span>
                  <span className="text-zinc-200">{displayFit}</span>
                </div>
                <div className="flex justify-between">
                  <span>{currentLang === 'ar' ? 'الخامة والتركيب:' : 'COMPOSITION:'}</span>
                  <span className="text-zinc-200">{displayMaterial}</span>
                </div>
                <div className="flex justify-between">
                  <span>{currentLang === 'ar' ? 'بلد المنشأ والتجميع:' : 'ORIGIN:'}</span>
                  <span className="text-zinc-200">{displayOrigin}</span>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Bag */}
            <div className="pt-4 border-t border-white/10 flex items-center space-x-3 rtl:space-x-reverse">
              <div className="flex items-center border border-white/10 rounded bg-zinc-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-zinc-400 hover:text-white cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-xs font-mono-spec font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-zinc-400 hover:text-white cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addedAnimation}
                className={`flex-1 py-3 px-6 rounded-lg font-mono-spec text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2 rtl:space-x-reverse transition-all cursor-pointer ${
                  addedAnimation
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white hover:bg-zinc-200 text-zinc-950 shadow-xl'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check size={16} />
                    <span>{currentLang === 'ar' ? 'تمت الإضافة إلى الحقيبة' : 'ADDED TO SHOPPING BAG'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>
                      {currentLang === 'ar'
                        ? `إضافة للحقيبة • ${formatPrice(product.price * quantity)}`
                        : `ADD TO BAG • ${formatPrice(product.price * quantity)}`}
                    </span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
