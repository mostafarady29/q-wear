'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, ChevronDown, Sparkles, User as UserIcon, LogOut, Globe } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import QLogo from '@/components/ui/QLogo';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenVip?: () => void;
}

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.featured'), href: '/#drop-01' },
    { name: t('nav.allClothing'), href: '/shop' },
    { name: t('nav.lookbook'), href: '/lookbook' },
    { name: t('nav.about'), href: '/manifesto' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-zinc-950/60 backdrop-blur-md border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Mobile Menu Trigger & Desktop Navigation */}
          <div className="flex items-center space-x-8 rtl:space-x-reverse">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-blue-500 rounded"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <nav className="hidden lg:flex items-center space-x-7 rtl:space-x-reverse">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs font-mono-spec tracking-widest uppercase transition-colors relative py-1 ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-blue-500" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Logo "Q" */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <Link href="/" className="inline-flex flex-col items-center group">
              <QLogo size={38} withSubtitle />
            </Link>
          </div>

          {/* Right: Language Switcher, Currency, Search, VIP, Account, Cart */}
          <div className="flex items-center space-x-3 sm:space-x-4 rtl:space-x-reverse">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-mono-spec text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded transition-all cursor-pointer"
              title="Switch Language / تغيير اللغة"
            >
              <Globe size={13} className="text-blue-400 shrink-0" />
              <span className="font-bold text-[11px]">{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-zinc-400 hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-blue-500 rounded cursor-pointer"
              aria-label="Search Collection"
            >
              <Search size={19} />
            </button>

            {/* Client Account / Sign In */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-1.5 py-1 px-2 text-xs font-mono-spec text-zinc-200 hover:text-white hover:bg-white/5 rounded transition-colors cursor-pointer"
                  aria-label="Client Account Menu"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-[10px] font-bold text-blue-400">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  {user.tier === 'OBSIDIAN VIP' && (
                    <span className="text-[9px] px-1 py-0.2 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded">
                      VIP
                    </span>
                  )}
                  <ChevronDown size={12} className="text-zinc-500" />
                </button>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center space-x-1 p-2 text-zinc-400 hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-blue-500 rounded"
                  title="Client Access / Sign In"
                  aria-label="Client Login"
                >
                  <UserIcon size={19} />
                </Link>
              )}

              {/* User Dropdown Menu */}
              {user && userDropdownOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-56 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-2 border-b border-white/5">
                    <p className="text-xs font-mono-spec font-bold text-white truncate">{user.name}</p>
                    <p className="text-[10px] font-mono-spec text-zinc-400 truncate">{user.email}</p>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5 text-[9px] font-mono-spec">
                      <span className="text-zinc-500">ID: {user.clientId}</span>
                      <span className={`px-1.5 py-0.5 rounded font-bold ${
                        user.tier === 'OBSIDIAN VIP'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {user.tier}
                      </span>
                    </div>
                  </div>

                  <div className="py-1 text-xs font-mono-spec">
                    <Link
                      href="/#vip-pass"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {t('nav.vipDrop')}
                    </Link>
                    <Link
                      href="/shop"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-3.5 py-1.5 text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {t('nav.allClothing')}
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-white/5">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left rtl:text-right px-3.5 py-1.5 text-xs font-mono-spec text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center space-x-2 rtl:space-x-reverse transition-colors cursor-pointer"
                    >
                      <LogOut size={13} />
                      <span>{t('nav.signOut')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>


            {/* Cart Trigger with badge */}
            <button
              onClick={openCart}
              className="relative p-2 text-zinc-200 hover:text-white transition-transform active:scale-95 focus-visible:ring-1 focus-visible:ring-blue-500 rounded cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 bg-blue-600 text-white font-mono-spec text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-zinc-950 animate-in zoom-in-50 duration-200">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10 space-y-3 pb-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-mono-spec tracking-widest uppercase text-zinc-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-2 border-t border-white/5 flex items-center justify-between px-3 py-2">
              <span className="text-xs font-mono-spec text-zinc-400">Language / اللغة</span>
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1.5 px-3 py-1 text-xs font-mono-spec text-white bg-zinc-800 rounded border border-white/10"
              >
                <Globe size={13} className="text-blue-400" />
                <span>{language === 'ar' ? 'English' : 'العربية'}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-white/5 space-y-1">
              {user ? (
                <div className="flex items-center justify-between px-3 py-2 bg-white/5 rounded text-xs font-mono-spec">
                  <div>
                    <p className="font-bold text-white">{user.name}</p>
                    <p className="text-[10px] text-zinc-400">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    {t('nav.signOut')}
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-mono-spec tracking-wider uppercase text-blue-400 px-3 py-2"
                >
                  {t('nav.signIn')} / {t('nav.createAccount')}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
