'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Shield, RotateCcw, Globe } from 'lucide-react';
import QLogo from '@/components/ui/QLogo';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { language, isRtl, t } = useLanguage();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-white/10 text-zinc-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/5 text-xs font-mono-spec">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Globe className="text-blue-500 shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-zinc-200 uppercase tracking-wider font-semibold">
                {language === 'ar' ? 'شحن سريع ومؤمن دولياً' : 'Worldwide Courier Express'}
              </p>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                {language === 'ar' ? 'توصيل مباشر ومضمون خلال 3-5 أيام عمل عبر DHL و FedEx.' : 'Carbon-neutral insured transit via DHL & FedEx Express.'}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Shield className="text-blue-500 shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-zinc-200 uppercase tracking-wider font-semibold">
                {language === 'ar' ? 'شهادة أصالة وجودة القطع' : 'Archival Certification'}
              </p>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                {language === 'ar' ? 'كل قطعة تحمل كود أصالة محفور بالليزر مع ضمان متانة النسيج.' : 'Every garment bears an authenticated serial-stamped identity chip.'}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <RotateCcw className="text-blue-500 shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-zinc-200 uppercase tracking-wider font-semibold">
                {language === 'ar' ? 'استبدال مجاني خلال 14 يوماً' : '14-Day Global Return'}
              </p>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                {language === 'ar' ? 'إمكانية تبديل المقاسات أو استرجاع القطع غير المغسولة بسهولة.' : 'Complimentary size exchange and return on all unwashed garments.'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <QLogo size={32} />
              <span className="text-xs font-mono-spec tracking-[0.3em] text-zinc-300 font-bold uppercase">
                {language === 'ar' ? 'براند Q WEAR' : 'Q WEAR STUDIO'}
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              {language === 'ar'
                ? 'ملابس ستريتوير فاخرة مستوحاة من العمارة الحديثة وأقمشة القطن الياباني الثقيل 520 GSM.'
                : 'Radical minimalism meets brutalist tailoring. Designed between Tokyo and Milan for the discerning urban vanguard.'}
            </p>
            <div className="pt-2 text-[11px] font-mono-spec text-zinc-400 space-y-1">
              <p>{language === 'ar' ? 'استوديوهاتنا: طوكيو • ميلانو • باريس • القاهرة • الرياض' : 'STUDIOS: TOKYO • MILAN • PARIS • CAIRO • RIYADH'}</p>
            </div>
          </div>

          {/* Navigation Col */}
          <div>
            <h4 className="text-xs font-mono-spec uppercase tracking-widest text-zinc-200 font-semibold mb-4">
              {language === 'ar' ? 'المنتجات' : 'COLLECTIONS'}
            </h4>
            <ul className="space-y-2 text-xs font-mono-spec">
              <li><Link href="/shop" className="hover:text-white transition-colors">{language === 'ar' ? 'هودي 520 GSM' : '520 GSM HOODIE'}</Link></li>
              <li><Link href="/#drop-01" className="hover:text-white transition-colors">{language === 'ar' ? 'الإصدار الأول' : 'DROP 01'}</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">{language === 'ar' ? 'جميع الملابس' : 'ALL CLOTHING'}</Link></li>
            </ul>
          </div>

          {/* Editorial & Care */}
          <div>
            <h4 className="text-xs font-mono-spec uppercase tracking-widest text-zinc-200 font-semibold mb-4">
              {language === 'ar' ? 'عن البراند' : 'STUDIO ARCHIVE'}
            </h4>
            <ul className="space-y-2 text-xs font-mono-spec">
              <li><Link href="/lookbook" className="hover:text-white transition-colors">{language === 'ar' ? 'كتالوج الإطلالات' : 'RUNWAY LOOKBOOK'}</Link></li>
              <li><Link href="/manifesto" className="hover:text-white transition-colors">{language === 'ar' ? 'فلسفة وخامات الأقمشة' : 'BRAND MANIFESTO'}</Link></li>
              <li><a href="#anatomy" className="hover:text-white transition-colors">{language === 'ar' ? 'هندسة النسيج' : 'TEXTILE ANATOMY'}</a></li>
            </ul>
          </div>

          {/* Newsletter / Drop Alert */}
          <div>
            <h4 className="text-xs font-mono-spec uppercase tracking-widest text-zinc-200 font-semibold mb-4">
              {language === 'ar' ? 'النشرة البريدية وإشعارات التوفر' : 'DROP NOTIFICATION'}
            </h4>
            <p className="text-xs text-zinc-400 mb-3">
              {language === 'ar' ? 'اشترك لتصلك إشعارات توفر المقاسات والإصدارات الجديدة أولاً بأول.' : 'Receive notification for limited drop releases and restocks.'}
            </p>
            {subscribed ? (
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-blue-400 text-xs font-mono-spec bg-blue-500/10 p-2.5 rounded border border-blue-500/20">
                <CheckCircle2 size={16} />
                <span>{language === 'ar' ? 'تم تسجيل بريدك بنجاح في القائمة.' : 'Added to confidential priority queue.'}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'ENTER EMAIL ADDRESS'}
                  required
                  className="w-full bg-zinc-900 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 font-mono-spec"
                />
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-mono-spec text-xs tracking-wider uppercase py-2 px-3 rounded font-medium transition-colors flex items-center justify-center space-x-1 rtl:space-x-reverse cursor-pointer"
                >
                  <span>{language === 'ar' ? 'اشتراك' : 'JOIN VAULT'}</span>
                  <ArrowUpRight size={13} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono-spec text-zinc-400">
          <p>© {new Date().getFullYear()} Q WEAR. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'ALL RIGHTS RESERVED.'}</p>
          <div className="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
            <span className="hover:text-zinc-200 cursor-pointer">{language === 'ar' ? 'سياسة الخصوصية' : 'PRIVACY POLICY'}</span>
            <span className="hover:text-zinc-200 cursor-pointer">{language === 'ar' ? 'شروط الشراء' : 'TERMS OF SALE'}</span>
            <span className="hover:text-zinc-200 cursor-pointer">{language === 'ar' ? 'معايير التصنيع' : 'ETHICAL MANUFACTURING'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
