'use client';

import React, { useState, useEffect } from 'react';
import { X, Ruler, CheckCircle } from 'lucide-react';
import { Product, SizeRecommendation } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface SizeAdvisorModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onApplySize: (size: string) => void;
}

export default function SizeAdvisorModal({
  product,
  isOpen,
  onClose,
  onApplySize,
}: SizeAdvisorModalProps) {
  const [heightCm, setHeightCm] = useState(180);
  const [weightKg, setWeightKg] = useState(76);
  const [fitPreference, setFitPreference] = useState<'boxy' | 'oversized' | 'true'>('boxy');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<SizeRecommendation | null>(null);

  const { language, isRtl, t } = useLanguage();

  // Fetch advice from our Node.js API
  useEffect(() => {
    if (!isOpen) return;

    const fetchSize = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/size-advisor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            heightCm,
            weightKg,
            fitPreference,
            category: product?.category || 'hoodies',
          }),
        });
        const data = await res.json();
        if (data.success) {
          setRecommendation(data.recommendation);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchSize, 250);
    return () => clearTimeout(timeout);
  }, [heightCm, weightKg, fitPreference, isOpen, product]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-full border border-white/10 cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-blue-400 text-xs font-mono-spec mb-2">
          <Ruler size={16} />
          <span>{t('size.title')}</span>
        </div>
        <h3 className="font-mono-spec font-bold text-xl uppercase tracking-wider text-white">
          {language === 'ar' ? 'حدد مقاسك المثالي بدقة' : 'FIND YOUR PERFECT SIZE'}
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          {t('size.desc')}
        </p>

        {/* Metric Controls */}
        <div className="mt-6 space-y-5">
          {/* Height */}
          <div>
            <div className="flex justify-between text-xs font-mono-spec mb-2">
              <span className="text-zinc-400">{t('size.height')}:</span>
              <span className="text-white font-bold">{heightCm} CM ({Math.floor(heightCm / 30.48)}&apos;{Math.round((heightCm % 30.48) / 2.54)}&quot;)</span>
            </div>
            <input
              type="range"
              min="155"
              max="205"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Weight */}
          <div>
            <div className="flex justify-between text-xs font-mono-spec mb-2">
              <span className="text-zinc-400">{t('size.weight')}:</span>
              <span className="text-white font-bold">{weightKg} KG ({Math.round(weightKg * 2.20462)} LBS)</span>
            </div>
            <input
              type="range"
              min="50"
              max="125"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Fit Preference */}
          <div>
            <div className="text-xs font-mono-spec text-zinc-400 mb-2">
              {t('size.preference')}:
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'true', label: language === 'ar' ? 'مضبوط' : 'STRUCTURED' },
                { id: 'boxy', label: language === 'ar' ? 'بوكسي منسدل' : 'SIGNATURE BOXY' },
                { id: 'oversized', label: language === 'ar' ? 'واسع (أوفرسايز)' : 'OVERSIZED' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFitPreference(f.id as any)}
                  className={`py-2 text-[11px] font-mono-spec rounded border transition-all cursor-pointer ${
                    fitPreference === f.id
                      ? 'bg-blue-600 text-white font-semibold border-blue-500'
                      : 'bg-zinc-900/60 text-zinc-400 border-white/10 hover:border-white/30'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Recommendation Box */}
        {recommendation && (
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-b from-blue-950/40 to-zinc-900/60 border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono-spec text-blue-400 uppercase tracking-widest block">
                  {t('size.recommendation')}
                </span>
                <span className="text-3xl font-mono-spec font-black text-white">
                  {language === 'ar' ? `مقاس ${recommendation.recommendedSize}` : `SIZE ${recommendation.recommendedSize}`}
                </span>
              </div>
              <div className="text-right rtl:text-left">
                <span className="text-[10px] font-mono-spec text-zinc-400 uppercase block">{t('size.confidence')}</span>
                <span className="text-sm font-mono-spec font-bold text-emerald-400">
                  {recommendation.confidence}% {language === 'ar' ? 'تطابق' : 'MATCH'}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 mt-3 font-mono-spec leading-relaxed">
              {language === 'ar'
                ? `مقاس ${recommendation.recommendedSize} يوفر القصة المثالية لسويت بانتس Q بحياكة مريحة وانسدال واسع وأبعاد مضبوطة.`
                : recommendation.fitNotes}
            </p>

            <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[10px] font-mono-spec text-zinc-400">
              <div>
                <span className="block text-zinc-500">{language === 'ar' ? 'عرض الصدر' : 'CHEST WIDTH'}</span>
                <span className="text-zinc-200 font-semibold">{recommendation.dimensions.chestCm} CM</span>
              </div>
              <div>
                <span className="block text-zinc-500">{language === 'ar' ? 'طول الظهر' : 'BACK LENGTH'}</span>
                <span className="text-zinc-200 font-semibold">{recommendation.dimensions.lengthCm} CM</span>
              </div>
              <div>
                <span className="block text-zinc-500">{language === 'ar' ? 'عرض الأكتاف' : 'SHOULDER SPAN'}</span>
                <span className="text-zinc-200 font-semibold">{recommendation.dimensions.shoulderCm} CM</span>
              </div>
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => {
              if (recommendation) {
                onApplySize(recommendation.recommendedSize);
              }
              onClose();
            }}
            className="w-full py-3 bg-white hover:bg-zinc-200 text-zinc-950 font-mono-spec text-xs tracking-wider uppercase font-bold rounded-lg transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer"
          >
            <CheckCircle size={16} />
            <span>
              {language === 'ar'
                ? `اختيار مقاس ${recommendation?.recommendedSize || ''}`
                : `APPLY SIZE ${recommendation?.recommendedSize || ''}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
