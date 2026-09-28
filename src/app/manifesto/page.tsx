'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Layers, Globe, Feather, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ManifestoPage() {
  const { language, isRtl } = useLanguage();

  const tenets = [
    {
      num: '01',
      title: language === 'ar' ? 'هندسة الكثافة والراحة 420 GSM' : 'THE ARCHITECTURE OF COMFORT (420 GSM)',
      desc: language === 'ar'
        ? 'الأزياء السريعة تعتمد على أقمشة خفيفة ورقيقة تتلف بعد غسلات معدودة. في Q، نعتمد قطن فرينش تيري بوزن 420 GSM ليمنحك توازناً استثنائياً بين الفخامة والراحة طوال اليوم.'
        : 'Fast-fashion relies on fragile fabrics designed to degrade quickly. At Q, we knit our loopback cotton at 420 GSM, delivering long-lasting comfort, resilience, and a tailored drape.',
    },
    {
      num: '02',
      title: language === 'ar' ? 'نقاء المادة الواحدة 100%' : 'MONOMATERIAL INTEGRITY',
      desc: language === 'ar'
        ? 'نرفض تماماً خلطات البوليستر التي تسبب الحساسية ولا يمكن إعادة تدويرها. قطننا نقي 100% طويل التيلة ناعم ودافئ ومصمم ليدوم طويلاً.'
        : 'We refuse polyester-cotton micro-blends that irritate skin and cannot be mechanically recycled. Our knits are 100% long-staple organic cotton built for decades of wear.',
    },
    {
      num: '03',
      title: language === 'ar' ? 'إصدارات محدودة مرقمة' : 'MICRO-BATCH RUNS',
      desc: language === 'ar'
        ? 'لا نفايات أو تكديس مخزون. ننتج في دفعات صغيرة مرقمة بحصص محددة. بمجرد نفاد الإصدار، يدخل مباشرة إلى الأرشيف الدائم.'
        : 'No surplus inventory landfill burns. We produce in strictly numbered allotments between 50 and 150 pieces per silhouette. Once a seasonal drop is exhausted, it enters the archive.',
    },
    {
      num: '04',
      title: language === 'ar' ? 'خياطة معمارية وحرية حركة' : 'RELAXED WIDE-LEG TAILORING',
      desc: language === 'ar'
        ? 'نتعامل مع السويت بانتس كقطعة ملبوسة متكاملة: قصة واسعة مستقيمة انسيابية تمنحك حرية الحركة، خصر مطاطي مريح، وجيوب جانبية عميقة وخياطة متينة.'
        : 'We engineer our sweatpants with architectural precision: relaxed straight drape, articulated seams, flexible elastic waistband, and deep reinforced pockets.',
    },
  ];

  return (
    <div className="py-16 bg-zinc-950 min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 border-b border-white/10 pb-16">
          <span className="text-xs font-mono-spec text-blue-400 uppercase tracking-widest block">
            {language === 'ar' ? 'عن Q WEAR // الحرفية والأقمشة' : 'ABOUT Q WEAR // CRAFTSMANSHIP & MATERIALS'}
          </span>
          <h1 className="font-brand text-5xl sm:text-7xl font-black uppercase tracking-tight">
            {language === 'ar' ? 'ملابس مريحة. حرفية خالدة.' : 'RELAXED APPAREL. TIMELESS CRAFT.'}
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 font-mono-spec max-w-xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'ملابس مصممة من قطن فرينش تيري عالي الكثافة 420 GSM، بخياطة متينة وقصة واسعة تتفوق على صيحات الموضة السريعة العابرة.'
              : 'Apparel engineered with 420 GSM heavyweight loopback French Terry and precision stitching built to outlast fast fashion trends.'}
          </p>
        </div>

        {/* Large Editorial Quote */}
        <div className="py-16 border-b border-white/10 text-center">
          <blockquote className="font-serif italic text-xl sm:text-2xl text-zinc-200 leading-relaxed max-w-2xl mx-auto">
            {language === 'ar'
              ? '«نحن لا نصمم ليتغير الموديل كل موسم، بل نبني ملابس تتجاوز دورات الموضة السريعة لتبقى سنوات.»'
              : '“We do not design for the season; we construct garments that will outlive the trend cycles of modern civilization.”'}
          </blockquote>
          <span className="text-xs font-mono-spec text-zinc-500 uppercase tracking-widest mt-4 block">
            {language === 'ar' ? '— توجيه التصميم لـ استوديو Q // طوكيو وميلانو' : '— STUDIO Q DESIGN DIRECTIVE // TOKYO & MILAN'}
          </span>
        </div>

        {/* The 4 Tenets */}
        <div className="py-16 border-b border-white/10 space-y-12">
          <h2 className="font-brand text-2xl sm:text-3xl font-bold uppercase text-white tracking-wider">
            {language === 'ar' ? 'المبادئ الأربعة الأساسية' : 'THE FOUR CORE TENETS'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tenets.map((t) => (
              <div
                key={t.num}
                className="p-6 bg-zinc-900/40 rounded-xl border border-white/5 space-y-3"
              >
                <span className="text-xs font-mono-spec text-blue-400 font-bold">
                  {language === 'ar' ? `المبدأ // ${t.num}` : `TENET // ${t.num}`}
                </span>
                <h3 className="font-mono-spec font-bold text-sm uppercase text-white tracking-wider">
                  {t.title}
                </h3>
                <p className="text-xs text-zinc-400 font-mono-spec leading-relaxed">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Production Map & Studios */}
        <div className="py-16 border-b border-white/10 space-y-8">
          <h2 className="font-brand text-2xl sm:text-3xl font-bold uppercase text-white tracking-wider">
            {language === 'ar' ? 'شبكة معامل الإنتاج' : 'ATELIER NETWORK'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono-spec">
            <div className="p-4 bg-zinc-900/60 rounded-lg border border-white/5">
              <span className="text-blue-400 uppercase font-bold block mb-1">
                {language === 'ar' ? 'معمل النسيج // اليابان' : 'KNIT LAB // JAPAN'}
              </span>
              <p className="text-zinc-200 font-semibold">{language === 'ar' ? 'واكاياما وكوجيما' : 'Wakayama & Kojima'}</p>
              <p className="text-zinc-500 text-[11px] mt-1">
                {language === 'ar' ? 'أنوال دائرية يابانية Tsuri-ami لحياكة قطن كثيف ومريح.' : 'Tsuri-ami circular loopwheels for dense, structured heavyweight knits.'}
              </p>
            </div>

            <div className="p-4 bg-zinc-900/60 rounded-lg border border-white/5">
              <span className="text-blue-400 uppercase font-bold block mb-1">
                {language === 'ar' ? 'استوديو التصميم // إيطاليا' : 'DESIGN STUDIO // ITALY'}
              </span>
              <p className="text-zinc-200 font-semibold">{language === 'ar' ? 'ميلانو' : 'Milan'}</p>
              <p className="text-zinc-500 text-[11px] mt-1">
                {language === 'ar' ? 'هندسة القصة البوكسي ودرجات الألوان الحصرية الخالدة.' : 'Boxy oversized silhouette engineering and signature pigments.'}
              </p>
            </div>

            <div className="p-4 bg-zinc-900/60 rounded-lg border border-white/5">
              <span className="text-blue-400 uppercase font-bold block mb-1">
                {language === 'ar' ? 'مركز التوزيع // الخليج والقاهرة' : 'DISPATCH // GCC & CAIRO'}
              </span>
              <p className="text-zinc-200 font-semibold">{language === 'ar' ? 'الرياض ودبي والزمالك' : 'Riyadh, Dubai & Zamalek'}</p>
              <p className="text-zinc-500 text-[11px] mt-1">
                {language === 'ar' ? 'شحن سريع ومباشر في تغليف فاخر مخصص.' : 'Fast express direct delivery in bespoke luxury unboxing packaging.'}
              </p>
            </div>
          </div>
        </div>

        {/* CTA to Shop */}
        <div className="py-16 text-center space-y-6">
          <h3 className="font-mono-spec font-bold text-xl uppercase tracking-wider text-white">
            {language === 'ar' ? 'اختبر جودة سويت بانتس Q WEAR' : 'EXPERIENCE Q WEAR SWEATPANTS'}
          </h3>
          <p className="text-xs text-zinc-400 font-mono-spec max-w-md mx-auto">
            {language === 'ar'
              ? 'اطلب سويت بانتس Q الأيقوني واستمتع بفخامة ملمس القطن 420 GSM مع قصة واسعة انسيابية.'
              : 'Order our iconic wide-leg sweatpants and feel the supreme comfort of 420 GSM loopback cotton.'}
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 rtl:space-x-reverse px-8 py-4 bg-white text-zinc-950 font-mono-spec text-xs uppercase font-extrabold tracking-widest rounded-lg hover:bg-zinc-200 transition-colors shadow-2xl"
          >
            <span>{language === 'ar' ? 'تسوق البنطال الآن' : 'SHOP SWEATPANTS'}</span>
            <ArrowRight size={15} className="rtl:rotate-180" />
          </Link>
        </div>

      </div>
    </div>
  );
}
