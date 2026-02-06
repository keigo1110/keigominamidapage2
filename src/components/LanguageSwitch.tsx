'use client'

import { motion } from 'framer-motion';
import { useTranslation } from '../contexts/TranslationContext';
import { useTheme } from '../contexts/ThemeContext';

export function LanguageSwitch() {
  const { language, setLanguage, t } = useTranslation();
  const { isDark } = useTheme();

  return (
    <div className="flex justify-end">
      <motion.button
        onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
        className={`relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
          isDark
            ? 'bg-[#333336] hover:bg-[#333336]/80 text-[#F5F5F7]'
            : 'bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F]'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {language === 'ja' ? t('switchToEnglish') : t('switchToJapanese')}
      </motion.button>
    </div>
  );
}
