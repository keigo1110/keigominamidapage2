'use client'

import { useTranslation } from '../contexts/TranslationContext';

export function LanguageSwitch() {
  const { language, setLanguage, t } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
      className="rounded-full px-3.5 py-1.5 text-sm font-medium text-[#F2EFE9] outline-none transition-colors duration-300 hover:bg-white/[0.06]"
    >
      {language === 'ja' ? t('switchToEnglish') : t('switchToJapanese')}
    </button>
  );
}
