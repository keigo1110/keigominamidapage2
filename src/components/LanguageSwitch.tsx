import { useTranslation } from '../contexts/TranslationContext';

export function LanguageSwitch() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex justify-end">
      <button
        onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
        className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 transition-colors text-white"
      >
        {language === 'ja' ? 'En' : 'Ja'}
      </button>
    </div>
  );
}