'use client'

import { motion } from 'framer-motion'
import { OptimizedImage } from '../common/OptimizedImage'
import { FaGlobe } from 'react-icons/fa'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { StartupCardProps } from '../../types'

export function StartupCard({ name, description, logo, website }: StartupCardProps) {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`${isDark ? 'bg-slate-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl p-8 border ${isDark ? 'border-green-500/20 hover:border-emerald-400/40' : 'border-green-200/30 hover:border-green-400/40'} group transition-all duration-300`}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-6">
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-green-400 to-emerald-400' : 'from-green-500 to-emerald-500'} rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
          <OptimizedImage
            src={logo}
            alt={name}
            width={100}
            height={100}
            className={`rounded-full relative z-10 border-2 ${isDark ? 'border-green-400/30' : 'border-green-300/50'}`}
          />
        </div>
        <div className="ml-6">
          <h3 className={`text-3xl font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>{name}</h3>
        </div>
      </div>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 text-lg leading-relaxed`}>{description}</p>
      <motion.a
        href={website}
        className="inline-flex items-center bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl font-medium group-hover:scale-105"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${name} website`}
      >
        <FaGlobe className="mr-2" />
        <span>{t('visitWebsite')}</span>
      </motion.a>
    </motion.div>
  );
}