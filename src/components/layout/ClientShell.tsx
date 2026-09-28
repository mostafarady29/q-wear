'use client';

import React, { useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { AuthProvider } from '@/context/AuthContext';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import CheckoutModal from '@/components/cart/CheckoutModal';
import SearchModal from '@/components/ui/SearchModal';
import QuickViewModal from '@/components/shop/QuickViewModal';
import SizeAdvisorModal from '@/components/shop/SizeAdvisorModal';
import { Product } from '@/types';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeAdvisorProduct, setSizeAdvisorProduct] = useState<Product | null>(null);

  return (
    <LanguageProvider>
      <AuthProvider>
        <CurrencyProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col bg-zinc-950 text-white selection:bg-blue-600 selection:text-white">
            <AnnouncementBar />
            <Navbar
              onOpenSearch={() => setSearchOpen(true)}
            />

          <main className="flex-1">{children}</main>

          <Footer />

          {/* Global Modals & Drawers */}
          <CartDrawer onOpenCheckout={() => setCheckoutOpen(true)} />

          <CheckoutModal
            isOpen={checkoutOpen}
            onClose={() => setCheckoutOpen(false)}
          />

          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            onSelectProduct={(p) => setQuickViewProduct(p)}
          />

          <QuickViewModal
            product={quickViewProduct}
            isOpen={!!quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onOpenSizeAdvisor={(p) => {
              setQuickViewProduct(null);
              setSizeAdvisorProduct(p);
            }}
          />

          <SizeAdvisorModal
            product={sizeAdvisorProduct}
            isOpen={!!sizeAdvisorProduct}
            onClose={() => setSizeAdvisorProduct(null)}
            onApplySize={(size) => {
              console.log('Applied size:', size);
            }}
          />
          </div>
        </CartProvider>
      </CurrencyProvider>
    </AuthProvider>
    </LanguageProvider>
  );
}
