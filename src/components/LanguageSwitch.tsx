'use client'

import { useTranslation } from '../contexts/TranslationContext';

export function LanguageSwitch() {
  const { language, setLanguage, t } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
      className="inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full px-2.5 text-sm font-medium leading-none text-[#F2EFE9] outline-none transition-colors duration-300 hover:bg-white/[0.06] sm:px-3.5"
    >
      {language === 'ja' ? t('switchToEnglish') : t('switchToJapanese')}
    </button>
  );
}
