'use client'

import { motion } from 'framer-motion'
import { OptimizedImage } from '../common/OptimizedImage'
import { ProjectCardProps } from '../../types'

export function ProjectCard({ title, description, image, links }: ProjectCardProps) {
  const isDark = true; // ダークモード固定

  const getButtonStyle = (text: string, index: number) => {
    // ボタンの種類に応じてスタイルを変更
    if (text.includes('paper') || text.includes('Paper')) {
      return `bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-red-500/25`;
    }
    if (text.includes('Demo') || text.includes('demo')) {
      return `bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-green-500/25`;
    }
    if (text.includes('slide') || text.includes('Slide')) {
      return `bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-orange-500/25`;
    }
    if (text.includes('repository') || text.includes('Repository')) {
      return `${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white shadow-gray-700/25' : 'bg-gray-800 hover:bg-gray-700 text-white shadow-gray-800/25'}`;
    }

    // デフォルトスタイル（index基準でバリエーション）
    const styles = [
      `bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/25`,
      `bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-600/25`,
      `bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-blue-400/25`
    ];
    return styles[index % styles.length];
  };

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
          width={600}
          height={400}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-slate-900/60' : 'from-white/60'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      </div>
      <div className="p-6">
        <h3 className={`text-2xl font-semibold mb-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{title}</h3>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed`}>{description}</p>
        <div className="flex flex-wrap gap-3">
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              className={`inline-flex items-center px-4 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-medium ${getButtonStyle(link.text, index)}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.text} - ${title}`}
            >
              {link.icon}
              <span className="ml-2">{link.text}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}