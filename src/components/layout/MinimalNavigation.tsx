'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { MinimalLanguageSwitch } from '../MinimalLanguageSwitch'
import { MinimalThemeSwitch } from '../MinimalThemeSwitch'
import { minimalStyles } from '../../utils/minimal-styles'
import { TranslationKey } from '../../translations'

interface MinimalNavigationProps {
  activeSection: string;
  sections: readonly string[];
}

export function MinimalNavigation({ activeSection, sections }: MinimalNavigationProps) {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a
          href="#home"
          className={`text-xl font-light tracking-wide ${isDark ? 'text-white' : 'text-gray-900'}`}
          whileHover={{ opacity: 0.8 }}
        >
          {t('name')}
        </motion.a>
        
        <div className="hidden md:flex items-center gap-8">
          {sections.map((section) => (
            <motion.a
              key={section}
              href={`#${section}`}
              className={`${minimalStyles.link.nav(isDark)} text-sm font-medium relative`}
              whileHover={{ y: -1 }}
            >
              {t(section as TranslationKey)}
              {activeSection === section && (
                <motion.div
                  className={`absolute -bottom-1 left-0 right-0 h-px ${isDark ? 'bg-white' : 'bg-gray-900'}`}
                  layoutId="activeNav"
                />
              )}
            </motion.a>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <MinimalThemeSwitch />
          <MinimalLanguageSwitch />
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-white'}`}
          >
            <div className="container mx-auto px-6 py-4 space-y-4">
              {sections.map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`block ${minimalStyles.link.nav(isDark)} text-sm font-medium`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(section as TranslationKey)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}