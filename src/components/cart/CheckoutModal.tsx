'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Shield, CreditCard, Truck, ArrowRight, Sparkles, Copy, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';
import { OrderDetails } from '@/types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, subtotal, clearCart } = useCart();
  const { currency, formatPrice } = useCurrency();
  const { language, isRtl, t } = useLanguage();

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'United States',
    paymentMethod: 'card',
  });

  if (!isOpen) return null;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'QVIP10' || promoCode.trim().toUpperCase() === 'STUDIOQ') {
      setDiscountPercent(10);
      setPromoError('');
    } else {
      setPromoError(
        language === 'ar'
          ? 'كود غير صحيح. جرب "QVIP10" لخصم 10%'
          : 'Invalid code. Try "QVIP10" for 10% discount'
      );
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal >= 900 ? 0 : 50;
  const finalTotal = subtotal - discountAmount + shippingFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: formData,
          currency: currency.code,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOrderDetails(data.order);
        setStep('success');
        clearCart();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyTracking = () => {
    if (orderDetails?.trackingCode) {
      navigator.clipboard.writeText(orderDetails.trackingCode);
      setCopiedTracking(true);
      setTimeout(() => setCopiedTracking(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-full border border-white/10 cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {step === 'details' ? (
          <div>
            {/* Header */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-blue-400 text-xs font-mono-spec mb-1">
              <Shield size={16} />
              <span>{t('checkout.title')}</span>
            </div>
            <h3 className="font-mono-spec font-bold text-xl uppercase tracking-wider text-white">
              {t('checkout.customerInfo')}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {language === 'ar'
                ? 'شحن سريع ومؤمن مباشرة إلى عنوانك مع تتبع مباشر عبر الرسائل.'
                : 'Fast insured express courier delivery direct to your door.'}
            </p>

            <form onSubmit={handleSubmitOrder} className="mt-6 space-y-5">
              
              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono-spec text-zinc-400 uppercase mb-1">
                    {t('checkout.fullName')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'ar' ? 'مثال: أحمد مصطفى' : 'e.g. Alex Mercer'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-spec text-zinc-400 uppercase mb-1">
                    {t('checkout.email')}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono-spec text-zinc-400 uppercase mb-1">
                    {t('checkout.address')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'ar' ? 'الحي، اسم الشارع، رقم البناية' : 'Street address, building, suite'}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono-spec text-zinc-400 uppercase mb-1">
                      {t('checkout.city')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'ar' ? 'الرياض / القاهرة / دبي' : 'Riyadh / Cairo / New York'}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-spec text-zinc-400 uppercase mb-1">
                      {t('checkout.country')}
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white font-mono-spec focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option>Saudi Arabia</option>
                      <option>Egypt</option>
                      <option>United Arab Emirates</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>France</option>
                      <option>Japan</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Selector */}
              <div>
                <label className="block text-[11px] font-mono-spec text-zinc-400 uppercase mb-2">
                  {t('checkout.payment')}
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono-spec">
                  {[
                    { id: 'card', label: language === 'ar' ? 'بطاقة بنكية / مدى' : 'CREDIT / DEBIT' },
                    { id: 'apple', label: 'APPLE PAY' },
                    { id: 'cod', label: language === 'ar' ? 'الدفع عند الاستلام' : 'CASH ON DELIVERY' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: p.id })}
                      className={`py-2 px-3 rounded border text-center transition-all cursor-pointer ${
                        formData.paymentMethod === p.id
                          ? 'bg-blue-600 text-white font-semibold border-blue-500'
                          : 'bg-zinc-900 text-zinc-400 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Promo code input */}
              <div className="pt-2">
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={language === 'ar' ? 'كود الخصم (جرب: QVIP10)' : 'DISCOUNT CODE (USE: QVIP10)'}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded px-3 py-1.5 text-xs text-white placeholder-zinc-500 font-mono-spec uppercase focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono-spec rounded border border-white/10 cursor-pointer"
                  >
                    {t('checkout.apply')}
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-amber-400 font-mono-spec mt-1">{promoError}</p>
                )}
                {discountPercent > 0 && (
                  <p className="text-[11px] text-emerald-400 font-mono-spec mt-1 flex items-center gap-1">
                    <Sparkles size={12} />
                    <span>{language === 'ar' ? 'تم تطبيق خصم 10% بنجاح' : '10% DISCOUNT APPLIED'}</span>
                  </p>
                )}
              </div>

              {/* Order Calculation breakdown */}
              <div className="p-4 bg-zinc-900/60 rounded-xl border border-white/5 space-y-1.5 text-xs font-mono-spec">
                <div className="flex justify-between text-zinc-400">
                  <span>{t('cart.subtotal')} ({items.length})</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>{language === 'ar' ? 'خصم الأعضاء (10%)' : 'MEMBER DISCOUNT (10%)'}</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>{t('cart.shipping')}</span>
                  <span>{shippingFee === 0 ? t('cart.free') : formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-white text-sm font-bold pt-2 border-t border-white/10">
                  <span>{t('cart.total')}</span>
                  <span className="text-blue-400">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-white hover:bg-zinc-200 text-zinc-950 font-mono-spec text-xs uppercase tracking-widest font-extrabold rounded-lg shadow-xl transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>{language === 'ar' ? 'جاري معالجة الطلب...' : 'PROCESSING YOUR ORDER...'}</span>
                ) : (
                  <>
                    <span>{t('checkout.placeOrder')} • {formatPrice(finalTotal)}</span>
                    <ArrowRight size={15} className="rtl:rotate-180" />
                  </>
                )}
              </button>

            </form>
          </div>
        ) : (
          /* Order Confirmation / Success View */
          <div className="py-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto animate-in zoom-in-50 duration-300">
              <CheckCircle size={32} />
            </div>

            <div>
              <span className="text-xs font-mono-spec text-emerald-400 uppercase tracking-widest block">
                {t('checkout.successTitle')}
              </span>
              <h3 className="text-2xl font-mono-spec font-black text-white mt-1">
                {language === 'ar' ? `طلب رقم #${orderDetails?.orderId}` : `ORDER #${orderDetails?.orderId}`}
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-2">
                {language === 'ar'
                  ? `شكراً لطلبك من Q WEAR! تم إرسال إشعار التأكيد ورابط التتبع إلى ${formData.email}.`
                  : `Thank you for your purchase! A confirmation receipt has been sent to ${formData.email}.`}
              </p>
            </div>

            {/* Tracking Code Box */}
            <div className="p-4 bg-zinc-900/80 rounded-xl border border-white/10 max-w-md mx-auto text-left rtl:text-right">
              <span className="text-[10px] font-mono-spec text-zinc-500 uppercase block mb-1">
                {language === 'ar' ? 'رقم التتبع السريع' : 'EXPRESS TRACKING NUMBER'}
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono-spec font-bold text-sm text-blue-400">
                  {orderDetails?.trackingCode}
                </span>
                <button
                  onClick={copyTracking}
                  className="flex items-center space-x-1 rtl:space-x-reverse text-xs font-mono-spec text-zinc-300 hover:text-white px-2.5 py-1 bg-white/5 rounded border border-white/10 transition-colors cursor-pointer"
                >
                  {copiedTracking ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400">{language === 'ar' ? 'تم النسخ' : 'COPIED'}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>{language === 'ar' ? 'نسخ' : 'COPY'}</span>
                    </>
                  )}
                </button>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 text-[11px] font-mono-spec text-zinc-400 flex items-center justify-between">
                <span>{language === 'ar' ? 'مدة التوصيل المتوقعة: 3-5 أيام عمل' : 'ESTIMATED DELIVERY: 3-5 DAYS'}</span>
                <span className="text-emerald-400">{language === 'ar' ? 'شحن مؤمّن' : 'INSURED'}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-white hover:bg-zinc-200 text-zinc-950 font-mono-spec text-xs uppercase tracking-wider font-bold rounded-lg transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'متابعة التسوق' : 'CONTINUE SHOPPING'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
