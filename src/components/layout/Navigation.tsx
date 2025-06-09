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

  // Close menu when clicking outside (accessibility improvement)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-blue-500/20 transition-all duration-300 safe-area-top">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center" role="navigation" aria-label="Main navigation">
          <motion.a
            href="#home"
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent focus:outline-none focus:ring-4 focus:ring-blue-400/50 rounded-lg px-2 py-1"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            aria-label="Go to home section"
          >
            {t('name')}
          </motion.a>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {sections.map((section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  className={`relative px-3 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base font-medium focus:outline-none focus:ring-4 focus:ring-blue-400/50 ${
                    activeSection === section
                      ? 'text-blue-400 bg-blue-900/30'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-blue-900/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-current={activeSection === section ? 'page' : undefined}
                >
                  {t(section)}
                  {activeSection === section && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                      layoutId="activeTab"
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Language Switch */}
            <div className="flex items-center">
              <LanguageSwitch />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none focus:ring-4 focus:ring-blue-400/50 rounded-lg p-3 hover:bg-blue-900/20 transition-colors duration-200"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Menu */}
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-20 left-4 right-4 z-50 bg-slate-900/95 backdrop-blur-lg rounded-2xl border border-blue-500/20 shadow-2xl md:hidden safe-area-top"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
            >
              <div className="p-6">
                <h2 id="mobile-menu-title" className="sr-only">Navigation Menu</h2>
                <nav className="space-y-4" role="navigation" aria-label="Mobile navigation">
                  {sections.map((section, index) => (
                    <motion.a
                      key={section}
                      href={`#${section}`}
                      className={`block text-xl py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/50 ${
                        activeSection === section
                          ? 'text-blue-400 bg-blue-900/30'
                          : 'text-gray-300 hover:text-blue-400 hover:bg-blue-900/20'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      aria-current={activeSection === section ? 'page' : undefined}
                    >
                      {t(section)}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}