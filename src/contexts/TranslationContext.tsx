'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { translations, Language, TranslationKey } from '../translations';
import { localeFromPathname, localizedPath, LOCALE_COOKIE, writeLocaleCookie } from '@/lib/locale';

type TranslationContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '/'
  const router = useRouter()
  const language = localeFromPathname(pathname)

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage')
    if (saved !== 'ja' && saved !== 'en') return
    if (document.cookie.split(';').some((part) => part.trim().startsWith(`${LOCALE_COOKIE}=`))) return

    writeLocaleCookie(saved)
    const next = localizedPath(pathname, saved)
    if (next !== pathname) router.replace(next)
  }, [pathname, router])

  const handleSetLanguage = (lang: Language) => {
    writeLocaleCookie(lang)
    localStorage.setItem('preferredLanguage', lang)
    const next = localizedPath(pathname, lang)
    if (next !== pathname) router.push(next)
  }

  const t = (key: TranslationKey): string => {
    const translationForLanguage = translations[language] as Record<TranslationKey, string>;
    return translationForLanguage[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}