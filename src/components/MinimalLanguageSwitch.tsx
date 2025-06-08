'use client'

import { motion } from 'framer-motion';
import { useTranslation } from '../contexts/TranslationContext';
// ダークモード固定

export function MinimalLanguageSwitch() {
  const { language, setLanguage } = useTranslation();
  const isDark = true; // ダークモード固定

  return (
    <motion.button
      onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
      className={`px-3 py-1 rounded-lg text-sm font-medium ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${language === 'en' ? 'Japanese' : 'English'}`}
    >
      {language === 'en' ? 'JA' : 'EN'}
    </motion.button>
  );
}