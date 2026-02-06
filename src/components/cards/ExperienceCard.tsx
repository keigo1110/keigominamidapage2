'use client'

import { motion } from 'framer-motion'
import { OptimizedImage } from '../common/OptimizedImage'
import { useTheme } from '../../contexts/ThemeContext'
import { ExperienceCardProps } from '../../types'

export function ExperienceCard({ logo, title, position, date, links }: ExperienceCardProps) {
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
          alt={title}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div className="ml-6">
          <h3 className={`text-2xl font-medium ${
            isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
          }`}>{title}</h3>
          <p className="text-[#86868B] text-lg">{position}</p>
          <p className="text-[#86868B] text-sm">{date}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {links.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium text-center text-sm ${
              isDark
                ? 'bg-[#2997FF] hover:bg-[#2997FF]/90 text-white'
                : 'bg-[#0071E3] hover:bg-[#0071E3]/90 text-white'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.text} - ${title}`}
          >
            {link.text}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
