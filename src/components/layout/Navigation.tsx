'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { LanguageSwitch } from '../LanguageSwitch'
import { ThemeSwitch } from '../ThemeSwitch'
import { NAV_ITEMS } from '../../types'
import type { TranslationKey } from '../../translations'

export function Navigation() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
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
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-all duration-300 safe-area-top ${
        isDark
          ? 'bg-black/80 border-[#333336]'
          : 'bg-white/80 border-[#D2D2D7]'
      }`}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center" role="navigation" aria-label="Main navigation">
          <Link
            href="/"
            className={`text-2xl sm:text-3xl font-semibold tracking-tight outline-none rounded-lg px-2 py-1 ${
              isDark
                ? 'text-[#F5F5F7]'
                : 'text-[#1D1D1F]'
            }`}
            aria-label="Go to home page"
          >
            <motion.span
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="inline-block"
            >
              {t('name')}
            </motion.span>
          </Link>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`relative px-3 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base font-medium outline-none ${
                    isActive(item.href)
                      ? isDark ? 'text-[#2997FF]' : 'text-[#0071E3]'
                      : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    {t(item.labelKey as TranslationKey)}
                  </motion.span>
                  {isActive(item.href) && (
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        isDark ? 'bg-[#2997FF]' : 'bg-[#0071E3]'
                      }`}
                      layoutId="activeTab"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Theme Switch */}
            <ThemeSwitch />

            {/* Language Switch */}
            <div className="flex items-center">
              <LanguageSwitch />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`outline-none rounded-lg p-3 transition-colors duration-200 ${
                  isDark
                    ? 'text-[#F5F5F7] hover:bg-[#1D1D1F]'
                    : 'text-[#1D1D1F] hover:bg-[#F5F5F7]'
                }`}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`fixed top-20 left-4 right-4 z-50 backdrop-blur-lg rounded-2xl border shadow-2xl md:hidden safe-area-top ${
                isDark
                  ? 'bg-black/95 border-[#333336]'
                  : 'bg-white/95 border-[#D2D2D7]'
              }`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
            >
              <div className="p-6">
                <h2 id="mobile-menu-title" className="sr-only">Navigation Menu</h2>
                <nav className="space-y-4" role="navigation" aria-label="Mobile navigation">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`block text-xl py-3 px-4 rounded-lg transition-all duration-200 outline-none ${
                          isActive(item.href)
                            ? isDark ? 'text-[#2997FF] bg-[#2997FF]/10' : 'text-[#0071E3] bg-[#0071E3]/10'
                            : isDark ? 'text-[#86868B] hover:text-[#F5F5F7] hover:bg-[#1D1D1F]' : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                      >
                        {t(item.labelKey as TranslationKey)}
                      </Link>
                    </motion.div>
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
