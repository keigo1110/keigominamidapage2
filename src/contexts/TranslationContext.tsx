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
  // 地域ベース言語自動選択の初期化
  const getInitialLanguage = (): Language => {
    // サーバーサイドレンダリング時のデフォルト
    if (typeof window === 'undefined') {
      return 'en';
    }

    // ローカルストレージから前回の設定を確認
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (savedLanguage && (savedLanguage === 'ja' || savedLanguage === 'en')) {
      return savedLanguage;
    }

    // ブラウザの言語設定から判定
    const browserLanguage = navigator.language || navigator.languages?.[0] || 'en';

    // 日本語系のロケールを検出
    if (browserLanguage.startsWith('ja') || browserLanguage === 'ja-JP') {
      return 'ja';
    }

    // 追加の地域判定（より高度な検出）
    try {
      // Intl.DateTimeFormat で地域を検出
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timeZone.includes('Asia/Tokyo') ||
          timeZone.includes('Asia/Osaka') ||
          timeZone.includes('Asia/Sapporo')) {
        return 'ja';
      }

      // ブラウザのロケール情報をより詳細に確認
      const locale = new Intl.Locale(browserLanguage);
      if (locale.region === 'JP' || locale.language === 'ja') {
        return 'ja';
      }
    } catch (error) {
      console.log('Locale detection failed, using browser language fallback');
    }

    // デフォルトは英語
    return 'en';
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  // 地域ベースの詳細判定（非同期）
  useEffect(() => {
    // すでにユーザーが言語を手動設定している場合はスキップ
    if (typeof window !== 'undefined' && localStorage.getItem('preferredLanguage')) {
      return;
    }

    // IPアドレスベースの地域判定（フォールバック）
    const detectRegionByIP = async () => {
      try {
        // 無料のGeoIP APIを使用（レート制限に注意）
        const response = await fetch('https://ipapi.co/json/', {
          signal: AbortSignal.timeout(3000) // 3秒でタイムアウト
        });

        if (response.ok) {
          const data = await response.json();

          // 日本からのアクセスの場合
          if (data.country_code === 'JP' || data.country === 'Japan') {
            console.log('IP-based region detection: Japan detected');
            setLanguage('ja');
            return;
          }

          console.log('IP-based region detection:', data.country_code);
        }
      } catch (error) {
        // ネットワークエラーやタイムアウトは無視（ブラウザベースの判定を優先）
        console.log('IP-based region detection failed, using browser-based detection');
      }
    };

    // 初期のブラウザベース判定が英語の場合のみ、IP判定を実行
    if (getInitialLanguage() === 'en') {
      detectRegionByIP();
    }
  }, []);

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