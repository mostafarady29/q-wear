'use client';

import React, { createContext, useContext, useState } from 'react';
import { Currency, CurrencyCode } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  EGP: { code: 'EGP', symbol: 'جنيه', rate: 1.0, name: 'Egyptian Pound' },
};

interface CurrencyContextType {
  currency: Currency;
  setCurrencyCode: (code: CurrencyCode) => void;
  formatPrice: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencyCode, setCurrencyCodeState] = useState<CurrencyCode>('EGP');
  const { language } = useLanguage();

  const setCurrencyCode = (code: CurrencyCode) => {
    if (CURRENCIES[code]) {
      setCurrencyCodeState(code);
    }
  };

  const currentCurrency = CURRENCIES[currencyCode] || CURRENCIES.EGP;

  const formatPrice = (amount: number) => {
    const formatted = Math.round(amount).toLocaleString();
    if (language === 'ar') {
      return `${formatted} جنيه`;
    }
    return `${formatted} EGP`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency: currentCurrency,
        setCurrencyCode,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
