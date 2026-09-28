'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Check, AlertCircle, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import QLogo from '@/components/ui/QLogo';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { language, toggleLanguage, isRtl, t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const res = await login(email, password);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 700);
    } else {
      setErrorMessage(
        res.message ||
          (language === 'ar'
            ? 'خطأ في البريد أو كلمة المرور. يرجى التحقق وإعادة المحاولة.'
            : 'Invalid email or password. Please try again.')
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Auth Container */}
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-300">
          
          {/* Header & Logo */}
          <div className="text-center space-y-3">
            <Link href="/" className="inline-block hover:scale-105 transition-transform">
              <QLogo size={54} />
            </Link>
            <div>
              <span className="text-[10px] font-mono-spec tracking-[0.3em] text-blue-400 uppercase block">
                {language === 'ar' ? 'حساب العميل // Q WEAR' : 'Q WEAR // ACCOUNT'}
              </span>
              <h1 className="font-mono-spec font-bold text-xl uppercase tracking-wider text-white mt-1">
                {language === 'ar' ? 'تسجيل الدخول' : 'SIGN IN'}
              </h1>
              <p className="text-xs text-zinc-400 font-mono-spec mt-1">
                {language === 'ar'
                  ? 'سجل الدخول لإدارة طلبات ملابسك ومتابعة الشحن ومزايا VIP.'
                  : 'Sign in to manage your clothing orders, tracked deliveries, and member perks.'}
              </p>
            </div>
          </div>

          {/* Error / Success Feedback */}
          {errorMessage && (
            <div className="mt-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono-spec flex items-center space-x-2 rtl:space-x-reverse animate-in fade-in">
              <AlertCircle size={15} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {success && (
            <div className="mt-5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono-spec flex items-center space-x-2 rtl:space-x-reverse animate-in fade-in">
              <Check size={16} className="shrink-0" />
              <span>{language === 'ar' ? 'تم تسجيل الدخول بنجاح! جاري التوجيه...' : 'Signed in successfully! Redirecting...'}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-[11px] font-mono-spec text-zinc-400 uppercase mb-1.5">
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

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono-spec text-zinc-400 uppercase">
                  {language === 'ar' ? 'كلمة المرور' : 'PASSWORD'}
                </label>
                <span className="text-[10px] font-mono-spec text-zinc-500 hover:text-zinc-300 cursor-pointer">
                  {language === 'ar' ? 'نسيت كلمة المرور؟' : 'FORGOT PASSWORD?'}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-zinc-950/80 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 font-mono-spec focus:outline-none focus:border-blue-500 transition-colors pr-10 rtl:pr-3.5 rtl:pl-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono-spec pt-1">
              <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer text-zinc-400 hover:text-zinc-200">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-zinc-950 border-white/10 text-blue-600 focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-[11px]">{language === 'ar' ? 'تذكرني' : 'REMEMBER ME'}</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3.5 bg-white hover:bg-zinc-200 text-zinc-950 font-mono-spec text-xs uppercase tracking-widest font-extrabold rounded-lg shadow-2xl transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse mt-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>{language === 'ar' ? 'جاري التحقق...' : 'SIGNING IN...'}</span>
              ) : (
                <>
                  <span>{language === 'ar' ? 'تسجيل الدخول' : 'SIGN IN'}</span>
                  <ArrowRight size={15} className="rtl:rotate-180" />
                </>
              )}
            </button>
          </form>

          {/* Footer link to Register */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs font-mono-spec text-zinc-400">
            <span>{language === 'ar' ? 'ليس لديك حساب؟ ' : "Don't have an account? "}</span>
            <Link
              href="/register"
              className="text-white hover:text-blue-400 font-bold transition-colors underline underline-offset-4"
            >
              {language === 'ar' ? 'إنشاء حساب جديد' : 'Create an Account'}
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
