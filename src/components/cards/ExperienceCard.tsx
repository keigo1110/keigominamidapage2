'use client'

import { motion } from 'framer-motion'
import { OptimizedImage } from '../common/OptimizedImage'
import { useTheme } from '../../contexts/ThemeContext'
import { ExperienceCardProps } from '../../types'

export function ExperienceCard({ logo, title, position, date, links }: ExperienceCardProps) {
  const { isDark } = useTheme();

  const getButtonStyle = (index: number) => {
    const styles = [
      `bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/25`,
      `bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-600/25`,
      `bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-blue-400/25`,
      `bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/25`,
      `bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white shadow-blue-700/25`
    ];
    return styles[index % styles.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`${isDark ? 'bg-slate-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl p-8 border ${isDark ? 'border-blue-500/20 hover:border-blue-400/40' : 'border-blue-200/30 hover:border-blue-400/40'} group transition-all duration-300`}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-6">
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-blue-400 to-blue-600' : 'from-blue-500 to-blue-700'} rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
          <OptimizedImage
            src={logo}
            alt={title}
            width={80}
            height={80}
            className={`rounded-full relative z-10 border-2 ${isDark ? 'border-blue-400/30' : 'border-blue-300/50'}`}
          />
        </div>
        <div className="ml-6">
          <h3 className={`text-2xl font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{title}</h3>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-lg`}>{position}</p>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{date}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {links.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            className={`block px-4 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-center ${getButtonStyle(index)}`}
            whileHover={{ scale: 1.02, y: -2 }}
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