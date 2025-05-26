'use client'

import { motion } from 'framer-motion'
import { OptimizedImage } from '../common/OptimizedImage'
import { useTheme } from '../../contexts/ThemeContext'
import { ProjectCardProps } from '../../types'
import { minimalStyles } from '../../utils/minimal-styles'
import { FaExternalLinkAlt } from 'react-icons/fa'

export function MinimalProjectCard({ title, description, image, links }: ProjectCardProps) {
  const { isDark } = useTheme();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`${minimalStyles.card.base(isDark)} ${minimalStyles.card.hover} group overflow-hidden`}
    >
      <div className="aspect-video overflow-hidden">
        <OptimizedImage
          src={image}
          alt={title}
          width={600}
          height={337}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className={minimalStyles.heading.h3(isDark)}>{title}</h3>
        <p className={`${minimalStyles.text.body(isDark)} line-clamp-3`}>{description}</p>
        
        <div className="flex flex-wrap gap-3 pt-2">
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              className={`${minimalStyles.link.default(isDark)} inline-flex items-center gap-2 text-sm font-medium`}
              whileHover={{ x: 2 }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.text} - ${title}`}
            >
              {link.text}
              <FaExternalLinkAlt className="text-xs" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}