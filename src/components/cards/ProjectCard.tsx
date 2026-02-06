'use client'

import { motion } from 'framer-motion'
import { OptimizedImage } from '../common/OptimizedImage'
import { useTheme } from '../../contexts/ThemeContext'
import { ProjectCardProps } from '../../types'

export function ProjectCard({ title, description, image, links }: ProjectCardProps) {
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
          width={600}
          height={400}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className={`text-xl font-medium mb-3 ${
          isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
        }`}>{title}</h3>
        <p className="text-[#86868B] mb-6 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-3">
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              className={`inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
                isDark
                  ? 'bg-[#2997FF] hover:bg-[#2997FF]/90 text-white'
                  : 'bg-[#0071E3] hover:bg-[#0071E3]/90 text-white'
              }`}
              whileHover={{ y: -2 }}
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
