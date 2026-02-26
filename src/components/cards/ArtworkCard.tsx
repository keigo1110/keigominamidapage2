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
      className={`rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-md ${
        isDark ? 'bg-[#1D1D1F]' : 'bg-[#F5F5F7]'
      }`}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden">
        <OptimizedImage
          src={image}
          alt={title}
          width={400}
          height={400}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className={`text-xl font-medium mb-3 ${
          isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
        }`}>{title}</h3>
        <p className="text-[#86868B] mb-6 leading-relaxed">{description}</p>
        <motion.a
          href={link}
          className={`inline-flex items-center px-5 py-3 rounded-full transition-all duration-300 font-medium ${
            isDark
              ? 'bg-[#2997FF] hover:bg-[#2997FF]/90 text-white'
              : 'bg-[#0071E3] hover:bg-[#0071E3]/90 text-white'
          }`}
          whileHover={{ y: -2 }}
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
