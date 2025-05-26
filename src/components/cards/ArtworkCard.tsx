'use client'

import { motion } from 'framer-motion'
import { OptimizedImage } from '../common/OptimizedImage'
import { FaInstagram } from 'react-icons/fa'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { ArtworkCardProps } from '../../types'

export function ArtworkCard({ title, description, image, link }: ArtworkCardProps) {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`${isDark ? 'bg-slate-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border ${isDark ? 'border-blue-500/20 hover:border-blue-400/40' : 'border-blue-200/30 hover:border-blue-400/40'} group transition-all duration-300`}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="relative overflow-hidden">
        <OptimizedImage
          src={image}
          alt={title}
          width={400}
          height={400}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-slate-900/60' : 'from-white/60'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      </div>
      <div className="p-6">
        <h3 className={`text-2xl font-semibold mb-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{title}</h3>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed`}>{description}</p>
        <motion.a
          href={link}
          className="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl font-medium group-hover:scale-105"
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${title} on Instagram`}
        >
          <FaInstagram className="mr-2" />
          <span>{t('viewOnInstagram')}</span>
        </motion.a>
      </div>
    </motion.div>
  );
}