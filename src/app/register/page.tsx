'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import QLogo from '@/components/ui/QLogo';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { language, isRtl } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState(language === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) {
      return {
        level: 0,
        text: language === 'ar' ? 'فارغ' : 'EMPTY',
        color: 'bg-zinc-800',
      };
    }
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;

    if (score <= 1) {
      return {
        level: 1,
        text: language === 'ar' ? 'ضعيفة' : 'WEAK',
        color: 'bg-red-500',
      };
    }
    if (score === 2) {
      return {
        level: 2,
        text: language === 'ar' ? 'متوسطة' : 'MODERATE',
        color: 'bg-amber-500',
      };
    }
    if (score === 3) {
      return {
        level: 3,
        text: language === 'ar' ? 'قوية' : 'STRONG',
        color: 'bg-blue-500',
      };
    }
    return {
      level: 4,
      text: language === 'ar' ? 'قوية جداً' : 'VERY STRONG',
      color: 'bg-emerald-500',
    };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage(
        language === 'ar' ? 'كلمات المرور غير متطابقة.' : 'Passwords do not match.'
      );
      return;
    }

    if (!agreed) {
      setErrorMessage(
        language === 'ar'
          ? 'يرجى الموافقة على شروط الخدمة للمتابعة.'
          : 'Please accept the Terms of Service to proceed.'
      );
      return;
    }

    setLoading(true);

    const res = await register({
      name,
      email,
      pass: password,
      city,
      country,
    });

    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 800);
    } else {
      setErrorMessage(
        res.message ||
          (language === 'ar'
            ? 'تعذر إنشاء الحساب. يرجى التحقق من بياناتك.'
            : 'Registration failed. Please check your information.')
      );
      setLoading(false);
    }
  };

  const countries = language === 'ar'
    ? ['المملكة العربية السعودية', 'الإمارات العربية المتحدة', 'مصر', 'الكويت', 'قطر', 'الولايات المتحدة', 'المملكة المتحدة', 'ألمانيا']
    : ['Saudi Arabia', 'United Arab Emirates', 'Egypt', 'Kuwait', 'Qatar', 'United States', 'United Kingdom', 'Germany'];

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        
        {/* Auth Container */}
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-300">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <Link href="/" className="inline-block hover:scale-105 transition-transform">
              <QLogo size={54} />
            </Link>
            <div>
              <span className="text-[10px] font-mono-spec tracking-[0.3em] text-blue-400 uppercase block">
                {language === 'ar' ? 'عضوية Q WEAR // حساب جديد' : 'Q WEAR // MEMBERSHIP'}
              </span>
              <h1 className="font-mono-spec font-bold text-xl uppercase tracking-wider text-white mt-1">
                {language === 'ar' ? 'إنشاء حساب جديد' : 'CREATE AN ACCOUNT'}
              </h1>
              <p className="text-xs text-zinc-400 font-mono-spec mt-1">
                {language === 'ar'
                  ? 'انضم إلى Q لمتابعة طلبات الهودي، والوصول الحصري للإصدارات المحدودة.'
                  : 'Join Q Wear for tracked clothing orders, exclusive drop access, and member perks.'}
              </p>
            </div>
          </div>

          {/* Feedback */}
          {errorMessage && (
            <div className="mt-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono-spec flex items-center space-x-2 rtl:space-x-reverse animate-in fade-in">
              <AlertCircle size={15} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {success && (
            <div className="mt-5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono-spec flex items-center space-x-2 rtl:space-x-reverse animate-in fade-in">
              <Check size={16} className="shrink-0" />
              <span>
                {language === 'ar' ? 'تم إنشاء الحساب بنجاح! جاري التحويل...' : 'Account created successfully! Redirecting...'}
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-mono-spec text-zinc-400 uppercase mb-1">
                {language === 'ar' ? 'الاسم الكامل' : 'FULL NAME'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={language === 'ar' ? 'مثال: أحمد محمد' : 'e.g. Sterling Hayes'}
                className="w-full bg-zinc-950/80 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-mono-spec text-zinc-400 uppercase mb-1">
                {language === 'ar' ? 'البريد الإلكتروني' : 'EMAIL ADDRESS'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-zinc-950/80 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* City & Country */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono-spec text-zinc-400 uppercase mb-1">
                  {language === 'ar' ? 'المدينة' : 'CITY'}
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={language === 'ar' ? 'الرياض، القاهرة، دبي' : 'e.g. New York, Riyadh, London'}
                  className="w-full bg-zinc-950/80 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-spec text-zinc-400 uppercase mb-1">
                  {language === 'ar' ? 'الدولة' : 'COUNTRY'}
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-zinc-950/80 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white font-mono-spec focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono-spec text-zinc-400 uppercase mb-1">
                  {language === 'ar' ? 'كلمة المرور' : 'PASSWORD'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={language === 'ar' ? '6 أحرف كحد أدنى' : 'Min 6 characters'}
                    className="w-full bg-zinc-950/80 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-blue-500 transition-colors pr-9 rtl:pr-3.5 rtl:pl-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono-spec text-zinc-400 uppercase mb-1">
                  {language === 'ar' ? 'تأكيد كلمة المرور' : 'CONFIRM PASSWORD'}
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={language === 'ar' ? 'أعد كتابة كلمة المرور' : 'Repeat password'}
                  className="w-full bg-zinc-950/80 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Password Strength Meter */}
            {password && (
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] font-mono-spec">
                  <span className="text-zinc-500 uppercase">{language === 'ar' ? 'قوة كلمة المرور:' : 'STRENGTH:'}</span>
                  <span className="text-zinc-300 font-bold">{strength.text}</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden flex gap-1">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-full flex-1 rounded-full transition-all ${
                        step <= strength.level ? strength.color : 'bg-zinc-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Agreement Checkbox */}
            <div className="pt-2">
              <label className="flex items-start space-x-2.5 rtl:space-x-reverse cursor-pointer text-zinc-400 hover:text-zinc-300 text-xs font-mono-spec">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="rounded bg-zinc-950 border-white/10 text-blue-600 focus:ring-0 focus:ring-offset-0 mt-0.5"
                />
                <span className="text-[11px] leading-relaxed">
                  {language === 'ar'
                    ? 'أوافق على شروط خدمة Q Wear وسياسة الخصوصية الخاصة بالطلبات والشحن.'
                    : 'I agree to the Q Wear Terms of Service and Privacy Policy for clothing orders and shipping.'}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3.5 bg-white hover:bg-zinc-200 text-zinc-950 font-mono-spec text-xs uppercase tracking-widest font-extrabold rounded-lg shadow-2xl transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse mt-4 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>{language === 'ar' ? 'جاري إنشاء الحساب...' : 'CREATING ACCOUNT...'}</span>
              ) : (
                <>
                  <span>{language === 'ar' ? 'إنشاء الحساب' : 'CREATE ACCOUNT'}</span>
                  <ArrowRight size={15} className="rtl:rotate-180" />
                </>
              )}
            </button>
          </form>

          {/* Footer link to Login */}
          <div className="mt-6 text-center text-xs font-mono-spec text-zinc-400">
            <span>{language === 'ar' ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}</span>
            <Link
              href="/login"
              className="text-white hover:text-blue-400 font-bold transition-colors underline underline-offset-4"
            >
              {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
