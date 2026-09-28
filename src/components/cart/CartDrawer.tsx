'use client';

import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export default function CartDrawer({ onOpenCheckout }: CartDrawerProps) {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    itemCount,
    freeShippingThreshold,
    freeShippingRemaining,
  } = useCart();

  const { formatPrice } = useCurrency();
  const { language, isRtl, t } = useLanguage();

  if (!isOpen) return null;

  const freeShippingPercent = Math.min(
    100,
    Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Slide-over panel */}
      <div className={`fixed inset-y-0 ${isRtl ? 'left-0 pr-10' : 'right-0 pl-10'} max-w-full flex`}>
        <div
          className={`w-screen max-w-md bg-zinc-950 ${
            isRtl ? 'border-r animate-in slide-in-from-left' : 'border-l animate-in slide-in-from-right'
          } border-white/10 shadow-2xl flex flex-col duration-300`}
        >
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <ShoppingBag className="text-white" size={20} />
              <h2 className="font-mono-spec font-bold text-sm uppercase tracking-widest text-white">
                {t('cart.title')} ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-zinc-900/60 border-b border-white/5">
            <div className="flex items-center justify-between text-[11px] font-mono-spec mb-1.5">
              <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-zinc-300">
                <Truck size={13} className="text-blue-400" />
                <span>
                  {freeShippingRemaining === 0 ? (
                    <span className="text-emerald-400 font-semibold">{t('cart.freeProgress')}</span>
                  ) : (
                    <span>
                      {language === 'ar'
                        ? `أضف ${formatPrice(freeShippingRemaining)} للحصول على شحن مجاني`
                        : `ADD ${formatPrice(freeShippingRemaining)} FOR FREE SHIPPING`}
                    </span>
                  )}
                </span>
              </div>
              <span className="text-zinc-500 font-semibold">{freeShippingPercent}%</span>
            </div>
            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-white/5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10 text-zinc-500">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="font-mono-spec text-sm font-semibold uppercase text-zinc-300">
                  {t('cart.empty')}
                </h3>
                <p className="text-xs text-zinc-400 max-w-xs">
                  {t('cart.emptyDesc')}
                </p>
                <button
                  onClick={closeCart}
                  className="mt-4 px-6 py-2.5 bg-white text-zinc-950 text-xs font-mono-spec font-bold uppercase rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  {t('cart.startShopping')}
                </button>
              </div>
            ) : (
              items.map((item) => {
                const name = language === 'ar' ? (item.product.nameAr || item.product.name) : item.product.name;
                const colorName = language === 'ar' ? (item.selectedColor.nameAr || item.selectedColor.name) : item.selectedColor.name;
                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                    className="pt-4 first:pt-0 flex space-x-4 rtl:space-x-reverse"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-white/5">
                      <img
                        src={item.product.images[0]}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-mono-spec font-semibold text-xs text-white uppercase tracking-wider line-clamp-1">
                            {name}
                          </h4>
                          <button
                            onClick={() =>
                              removeFromCart(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor.name
                              )
                            }
                            className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-[10px] font-mono-spec text-zinc-400 mt-1">
                          <span>{language === 'ar' ? `المقاس: ${item.selectedSize}` : `SIZE: ${item.selectedSize}`}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2 h-2 rounded-full inline-block"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {colorName}
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-white/10 rounded bg-zinc-900 text-xs">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor.name,
                                -1
                              )
                            }
                            className="px-2.5 py-1 text-zinc-400 hover:text-white cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 font-mono-spec font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor.name,
                                1
                              )
                            }
                            className="px-2.5 py-1 text-zinc-400 hover:text-white cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-mono-spec font-bold text-xs text-white">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer Checkout CTA */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-zinc-950 space-y-4">
              <div className="space-y-1.5 text-xs font-mono-spec">
                <div className="flex justify-between text-zinc-400">
                  <span>{t('cart.subtotal')}</span>
                  <span className="text-white font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>{t('cart.shipping')}</span>
                  <span>{freeShippingRemaining === 0 ? t('cart.free') : formatPrice(25)}</span>
                </div>
                <div className="flex justify-between text-white text-sm font-bold pt-2 border-t border-white/10">
                  <span>{t('cart.total')}</span>
                  <span>{formatPrice(subtotal + (freeShippingRemaining === 0 ? 0 : 25))}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  closeCart();
                  onOpenCheckout();
                }}
                className="w-full py-3.5 bg-white hover:bg-zinc-200 text-zinc-950 font-mono-spec text-xs uppercase tracking-widest font-extrabold rounded-lg shadow-2xl transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer"
              >
                <span>{t('cart.checkout')}</span>
                <ArrowRight size={15} className="rtl:rotate-180" />
              </button>

              <p className="text-center text-[10px] font-mono-spec text-zinc-500 flex items-center justify-center gap-1.5">
                <ShieldCheck size={12} className="text-zinc-400" />
                <span>{language === 'ar' ? 'دفع آمن ومشفر 256-bit بالكامل' : 'SECURE 256-BIT ENCRYPTED CHECKOUT'}</span>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
