'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { Heart, Code, Coffee } from 'lucide-react'
import { colors } from '../../utils/refined-styles'

export function RefinedFooter() {
  const isDark = true // ダークモード固定
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`relative py-12 px-4 ${
        isDark ? 'bg-gray-950' : 'bg-gray-50'
      } border-t ${
        isDark ? 'border-gray-800' : 'border-gray-200'
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative Line */}
        <div className={`w-24 h-0.5 mx-auto mb-8 bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]}`} />
        
        {/* Main Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © {currentYear} {t('name')}. {t('allRightsReserved')}
          </p>
          
          <div className={`flex items-center justify-center gap-2 text-sm ${
            isDark ? 'text-gray-500' : 'text-gray-500'
          }`}>
            <span>{t('builtWith')}</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="w-4 h-4 text-red-500" />
            </motion.div>
            <span>&</span>
            <Code className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <span>&</span>
            <Coffee className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          </div>

          {/* Tech Stack */}
          <div className={`flex flex-wrap items-center justify-center gap-4 mt-6 text-xs ${
            isDark ? 'text-gray-600' : 'text-gray-400'
          }`}>
            <span>Next.js</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Framer Motion</span>
            <span>•</span>
            <span>Three.js</span>
          </div>
        </motion.div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-5 ${
            isDark ? 'bg-indigo-500' : 'bg-indigo-400'
          }`} />
        </div>
      </div>
    </motion.footer>
  )
}