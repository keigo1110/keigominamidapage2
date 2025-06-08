'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { colors } from '../../utils/refined-styles'
import { ThemeSwitch } from '../ThemeSwitch'
import { LanguageSwitch } from '../LanguageSwitch'

interface RefinedNavigationProps {
  activeSection: string
  sections: readonly string[]
}

export function RefinedNavigation({ activeSection, sections }: RefinedNavigationProps) {
  const isDark = true // ダークモード固定
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = sections.map(section => ({
    id: section,
    label: t(`${section}Title` as keyof typeof import('../../translations').translations.en)
  }))

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isDark ? 'bg-gray-950/80' : 'bg-white/80'
      } backdrop-blur-md border-b ${
        isDark ? 'border-gray-800' : 'border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`text-2xl font-bold bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} bg-clip-text text-transparent`}
          >
            KM
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? isDark ? 'text-white' : 'text-gray-900'
                    : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]}`}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <ThemeSwitch />
            <LanguageSwitch />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? `${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`
                    : `${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}