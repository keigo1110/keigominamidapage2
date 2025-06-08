'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useTranslation } from '../../contexts/TranslationContext'
import { LanguageSwitch } from '../LanguageSwitch'
import { SectionType } from '../../types'

interface NavigationProps {
  activeSection: SectionType;
  sections: readonly SectionType[];
}

export function Navigation({ activeSection, sections }: NavigationProps) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-blue-500/20 transition-all duration-300">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.a
            href="#home"
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            aria-label="Go to home"
          >
            {t('name')}
          </motion.a>
          <div className="flex items-center space-x-4">
            <div className="md:hidden">
              <button 
                onClick={toggleMenu} 
                className="text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {sections.map((section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === section
                      ? 'text-blue-400 bg-blue-900/30'
                      : 'hover:text-blue-400 hover:bg-blue-900/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-current={activeSection === section ? 'page' : undefined}
                >
                  {t(section)}
                  {activeSection === section && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600"
                      layoutId="activeTab"
                    />
                  )}
                </motion.a>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <LanguageSwitch />
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full">
              {sections.map((section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  className="text-2xl py-4 hover:text-blue-400 transition-colors"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-current={activeSection === section ? 'page' : undefined}
                >
                  {t(section)}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}