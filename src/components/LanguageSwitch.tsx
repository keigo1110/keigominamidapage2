'use client'

import { motion } from 'framer-motion';
import { useTranslation } from '../contexts/TranslationContext';

export function LanguageSwitch() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex justify-end">
      <motion.button
        onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
        className="relative px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 text-white font-medium shadow-lg hover:shadow-xl border border-cyan-400/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="relative z-10">
          {language === 'ja' ? 'English' : '日本語'}
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-lg"
          whileHover={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </div>
  );
}