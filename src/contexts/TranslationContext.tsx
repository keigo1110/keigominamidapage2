'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, Language, TranslationKey } from '../translations';

type TranslationContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  // Hydration mismatch を避けるため、初期値は常に英語
  const [language, setLanguage] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

    // Hydration後の地域ベース言語自動選択
  useEffect(() => {
    if (isInitialized) return;

    const initializeLanguage = async () => {
      // ローカルストレージから前回の設定を確認
      const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
      if (savedLanguage && (savedLanguage === 'ja' || savedLanguage === 'en')) {
        setLanguage(savedLanguage);
        setIsInitialized(true);
        return;
      }

      // ブラウザの言語設定から判定
      const browserLanguage = navigator.language || navigator.languages?.[0] || 'en';

      // 日本語系のロケールを検出
      if (browserLanguage.startsWith('ja') || browserLanguage === 'ja-JP') {
        setLanguage('ja');
        setIsInitialized(true);
        return;
      }

      // 追加の地域判定（より高度な検出）
      try {
        // Intl.DateTimeFormat で地域を検出
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timeZone.includes('Asia/Tokyo') ||
            timeZone.includes('Asia/Osaka') ||
            timeZone.includes('Asia/Sapporo')) {
          setLanguage('ja');
          setIsInitialized(true);
          return;
        }

        // ブラウザのロケール情報をより詳細に確認
        const locale = new Intl.Locale(browserLanguage);
        if (locale.region === 'JP' || locale.language === 'ja') {
          setLanguage('ja');
          setIsInitialized(true);
          return;
        }
      } catch {
        console.log('Locale detection failed, using browser language fallback');
      }

      // IPアドレスベースの地域判定（フォールバック）
      try {
        const response = await fetch('https://ipapi.co/json/', {
          signal: AbortSignal.timeout(3000)
        });

        if (response.ok) {
          const data = await response.json();

          if (data.country_code === 'JP' || data.country === 'Japan') {
            console.log('IP-based region detection: Japan detected');
            setLanguage('ja');
            setIsInitialized(true);
            return;
          }

          console.log('IP-based region detection:', data.country_code);
        }
      } catch {
        console.log('IP-based region detection failed');
      }

      // デフォルトは英語のまま
      setIsInitialized(true);
    };

    initializeLanguage();
  }, [isInitialized]);

  // 言語変更時にローカルストレージに保存
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang);
    }
  };

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