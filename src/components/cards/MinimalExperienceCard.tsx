'use client'

import { motion } from 'framer-motion'
import { OptimizedImage } from '../common/OptimizedImage'
import { useTheme } from '../../contexts/ThemeContext'
import { ExperienceCardProps } from '../../types'
import { minimalStyles } from '../../utils/minimal-styles'

export function MinimalExperienceCard({ logo, title, position, date, links }: ExperienceCardProps) {
  const { isDark } = useTheme();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`${minimalStyles.card.base(isDark)} p-6 ${minimalStyles.card.hover}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <OptimizedImage
            src={logo}
            alt={title}
            width={48}
            height={48}
            className="rounded-lg"
          />
        </div>
        
        <div className="flex-grow space-y-3">
          <div>
            <h3 className={minimalStyles.heading.h4(isDark)}>{title}</h3>
            <p className={minimalStyles.text.body(isDark)}>{position}</p>
            <p className={minimalStyles.text.muted(isDark)}>{date}</p>
          </div>
          
          {links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className={`${minimalStyles.link.default(isDark)} text-sm`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.text} - ${title}`}
                >
                  {link.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}