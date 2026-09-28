'use client';

import React, { useState } from 'react';
import { Cpu, ShieldCheck, Feather, Compass, Layers, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FabricSpecs() {
  const [activeSpecIndex, setActiveSpecIndex] = useState(0);
  const { language, isRtl } = useLanguage();

  const specsEn = [
    {
      title: '420 GSM LOOPBACK FRENCH TERRY',
      subtitle: 'Heavyweight Cotton Knit Protocol',
      description: 'Crafted from high-density loopback French Terry woven at 420 GSM. This delivers exceptional softness, structural drape, and thermal balance, ensuring the sweatpants retain their silhouette and drape wash after wash.',
      stats: [
        { label: 'FABRIC DENSITY', value: '420 GSM' },
        { label: 'KNIT STRUCTURE', value: 'French Terry' },
        { label: 'MATERIAL', value: '100% Cotton' },
      ],
      image: '/products/q-pants-1.png',
    },
    {
      title: '15.5 OZ OKAYAMA RAW DENIM',
      subtitle: 'Kojima Shuttle Loom Selvedge',
      description: 'Woven on restored 1960s Toyoda automatic looms utilizing natural Texas long-staple warp threads dyed 18 times in pure synthetic indigo. The pink and silver selvedge tick line is the exclusive proprietary identifier of Q denim.',
      stats: [
        { label: 'DENIM WEIGHT', value: '15.5 OZ' },
        { label: 'DYE BATHS', value: '18 DIPS' },
        { label: 'LOOM TYPE', value: 'Toyoda G3' },
      ],
      image: 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1000&auto=format&fit=crop',
    },
    {
      title: 'BALLISTIC CORDURA® 1000D',
      subtitle: 'Modular Hardware & Waterproof Coating',
      description: 'High-tenacity air-textured nylon yarn with extreme resistance to abrasion, tearing, and puncturing. Equipped with German magnetic Fidlock® V-buckles enabling instantaneous one-handed modular detachment.',
      stats: [
        { label: 'TENSILE RATING', value: '1000 Denier' },
        { label: 'MAGNETIC SYSTEM', value: 'Fidlock®' },
        { label: 'WATER COLUMN', value: '10,000 MM' },
      ],
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
    },
    {
      title: 'VIBRAM® SCULPTED MONOLITH SOLES',
      subtitle: 'Civitanova Marche, Italy Engineering',
      description: 'Engineered in Italy with Vibram MegaGrip and XS Trek compounds. The multi-angle geometric lugs maximize traction across wet urban pavements while dampening joint shock during extended metropolitan transit.',
      stats: [
        { label: 'COMPOUND', value: 'XS Trek / MegaGrip' },
        { label: 'SHORE HARDNESS', value: '62A' },
        { label: 'MANUFACTURE', value: 'Marche, IT' },
      ],
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop',
    },
  ];

  const specsAr = [
    {
      title: 'قطن فرينش تيري فاخر 420 GSM',
      subtitle: 'حياكة قطنية مريحة فائقة النعومة والكثافة',
      description: 'منسوج من قطن فرينش تيري فاخر بوزن 420 جم/م². يوفر توازناً مثالياً بين النعومة الداخلية المريحة وثبات القصة الواسعة الأنيقة، ليدوم طويلاً دون انكماش أو بهتان بعد الغسيل.',
      stats: [
        { label: 'كثافة النسيج', value: '420 جم/م²' },
        { label: 'نوع الحياكة', value: 'فرينش تيري فاخر' },
        { label: 'الخامة الأساسية', value: '100% قطن نقي' },
      ],
      image: '/products/q-pants-1.png',
    },
    {
      title: 'دنيم خام ياباني فاخر 15.5 أونصة',
      subtitle: 'أنوال كوجيما المكوكية التاريخية',
      description: 'منسوج على أنوال تويودا الأوتوماتيكية الكلاسيكية المعاد ترميمها، باستخدام خيوط قطنية طويلة التيلة ومصبوغة 18 مرة بالنيلي الطبيعي المركز، مع حافة سيلفدج وردية وفضية مميزة.',
      stats: [
        { label: 'وزن الدنيم', value: '15.5 أونصة' },
        { label: 'مراحل الصبغ', value: '18 مرحلة غمر' },
        { label: 'نوع النول', value: 'Toyoda G3 الياباني' },
      ],
      image: 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1000&auto=format&fit=crop',
    },
    {
      title: 'كوردورا باليستية 1000D مضادة للماء',
      subtitle: 'أبازيم فيدلوك المغناطيسية الألمانية',
      description: 'نسيج نايلون عالي المتانة مع مقاومة فائقة للتمزق والاحتكاك والماء. مزود بأبازيم Fidlock الألمانية الذكية للإغلاق والفك السريع بحركة يد واحدة.',
      stats: [
        { label: 'مقاومة الشد', value: '1000 Denier' },
        { label: 'نظام الإغلاق', value: 'Fidlock® الألماني' },
        { label: 'عمود مقاومة الماء', value: '10,000 مم' },
      ],
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
    },
    {
      title: 'نعال فيبرام Vibram® الإيطالية المنحوتة',
      subtitle: 'هندسة مدنية في ماركي، إيطاليا',
      description: 'مصممة في إيطاليا بمركبات Vibram MegaGrip لامتصاص الصدمات أثناء المشي وتوفير ثبات هائل على الأرضيات الرطبة والأسطح الحضرية.',
      stats: [
        { label: 'المركب المطاطي', value: 'XS Trek / MegaGrip' },
        { label: 'مقياس الصلابة', value: '62A' },
        { label: 'بلد الصنع', value: 'ماركي، إيطاليا' },
      ],
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop',
    },
  ];

  const specs = language === 'ar' ? specsAr : specsEn;
  const current = specs[activeSpecIndex];

  return (
    <section className="py-24 bg-zinc-950 border-t border-white/5" id="anatomy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono-spec text-blue-400 uppercase tracking-widest block">
            {language === 'ar' ? 'معايير الأقمشة وجودة حياكة الملابس' : 'PREMIUM FABRICS & GARMENT CRAFTSMANSHIP'}
          </span>
          <h2 className="font-brand text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            {language === 'ar' ? 'هندسة وخامات أقمشة Q WEAR' : 'TEXTILE STANDARDS & COMPOSITION'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono-spec max-w-xl mx-auto">
            {language === 'ar'
              ? 'نرفض تماماً أقمشة الفاست فاشون الخفيفة؛ نصنع قطعنا بأثقل أوزان القطن الطبيعي لضمان المظهر الراقي والعمر الطويل.'
              : 'Rejecting fragile fast-fashion textiles in favor of high-density circular loopwheels, shuttle loom denim, and Italian engineered footwear.'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-zinc-900 rounded-xl border border-white/10 max-w-full overflow-x-auto space-x-1 rtl:space-x-reverse">
            {specs.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSpecIndex(idx)}
                className={`px-4 py-2 rounded-lg text-xs font-mono-spec uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeSpecIndex === idx
                    ? 'bg-white text-zinc-950 font-bold shadow-lg'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {s.title.split(' ')[0]} {s.title.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Spotlight Card */}
        <div className="bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
            
            {/* Visual Image */}
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 border border-white/5">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover object-center animate-in fade-in duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Spec Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono-spec text-blue-400 uppercase tracking-widest block">
                  {current.subtitle}
                </span>
                <h3 className="font-brand text-2xl sm:text-3xl font-bold uppercase text-white mt-1">
                  {current.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-mono-spec leading-relaxed">
                {current.description}
              </p>

              {/* Stat Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                {current.stats.map((st, i) => (
                  <div key={i} className="p-3 bg-zinc-950/60 rounded-lg border border-white/5 text-center">
                    <span className="text-[10px] font-mono-spec text-zinc-400 uppercase block">
                      {st.label}
                    </span>
                    <span className="font-mono-spec font-bold text-sm sm:text-base text-white mt-0.5 block">
                      {st.value}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
