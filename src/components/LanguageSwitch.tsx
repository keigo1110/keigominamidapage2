import { useTranslation } from '../contexts/TranslationContext';

export function LanguageSwitch() {
  const { language, setLanguage } = useTranslation();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
      className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 transition-colors"
    >
      {language === 'en' ? '日本語' : 'English'}
    </button>
  );
}