'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function AnnouncementBar() {
  const { language, toggleLanguage, isRtl } = useLanguage();

  const itemsAr = [
    'سويت بانتس Q الأيقوني بالقصة الواسعة متوفر الآن',
    'شحن سريع لجميع أنحاء الجمهورية // توصيل مجاني للطلبات فوق 900 جنيه',
    'قطن فرينش تيري فاخر عالي الكثافة 420 جم/م²',
    'إرجاع واستبدال مجاني للمقاسات خلال 14 يوماً',
    'استخدم كود QVIP10 للحصول على خصم 10% فوري',
  ];

  const itemsEn = [
    'Q SIGNATURE WIDE-LEG SWEATPANTS NOW AVAILABLE',
    'EXPRESS DELIVERY ACROSS EGYPT // FREE ON ORDERS OVER 900 EGP',
    'PREMIUM 420 GSM LOOPBACK COTTON FRENCH TERRY',
    '14-DAY EASY RETURNS & COMPLIMENTARY SIZE EXCHANGES',
    'USE CODE "QVIP10" FOR 10% OFF YOUR ORDER',
  ];

  const items = language === 'ar' ? itemsAr : itemsEn;

  return (
    <div className="relative bg-zinc-950 border-b border-white/5 py-2 overflow-hidden text-[11px] uppercase tracking-widest text-zinc-400 font-mono-spec select-none z-30">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        
        {/* Scrolling Ticker */}
        <div className="overflow-hidden flex-1 mr-4">
          <div className="animate-marquee flex items-center space-x-12 whitespace-nowrap">
            {items.concat(items).map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse-subtle"></span>
                <span className="hover:text-white transition-colors">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="shrink-0 flex items-center space-x-1 px-2.5 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-[10px] font-bold transition-colors cursor-pointer"
          title="Switch Language / تغيير اللغة"
        >
          <Globe size={11} className="text-blue-400" />
          <span>{language === 'ar' ? 'English' : 'العربية'}</span>
        </button>

      </div>
    </div>
  );
}
