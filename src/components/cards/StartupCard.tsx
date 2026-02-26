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
      className={`rounded-2xl overflow-hidden p-8 group transition-all duration-300 hover:shadow-md ${
        isDark ? 'bg-[#1D1D1F]' : 'bg-[#F5F5F7]'
      }`}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-6">
        <OptimizedImage
          src={logo}
          alt={name}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="ml-6">
          <h3 className={`text-3xl font-medium ${
            isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
          }`}>{name}</h3>
        </div>
      </div>
      <p className="text-[#86868B] mb-6 text-lg leading-relaxed">{description}</p>
      <motion.a
        href={website}
        className={`inline-flex items-center px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
          isDark
            ? 'bg-[#2997FF] hover:bg-[#2997FF]/90 text-white'
            : 'bg-[#0071E3] hover:bg-[#0071E3]/90 text-white'
        }`}
        whileHover={{ y: -2 }}
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
