'use client'

import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { useTranslation } from '../../contexts/TranslationContext'
import { publications, resolveLocalized } from '../../data/research'

export function PublicationsSection() {
  const { isDark } = useTheme()
  const { language } = useTranslation()

  return (
    <section id="publications" className="py-24 md:py-32 lg:py-40 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-semibold mb-6 tracking-tight ${
            isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
          }`}>
            Publications
          </h2>
          <div className={`w-24 h-0.5 mx-auto ${isDark ? 'bg-[#333336]' : 'bg-[#D2D2D7]'}`} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12"
        >
          {publications.map((pub, index) => {
            const title = resolveLocalized(pub.title, language)
            const venue = resolveLocalized(pub.venue, language)
            const location = resolveLocalized(pub.location, language)

            return (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4) }}
                className="group"
              >
                <div className={`flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 pb-8 border-b ${
                  isDark ? 'border-[#333336]' : 'border-[#D2D2D7]'
                }`}>
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="text-sm font-light text-[#86868B]">
                      {pub.date}
                    </span>
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm mb-2 text-[#86868B]">
                      {resolveLocalized(pub.authors, language).map((author, i) => (
                        <span key={`${pub.id}-${author.name}`}>
                          {i > 0 && ', '}
                          <span className={author.highlight ? (isDark ? 'text-[#F5F5F7] font-medium' : 'text-[#1D1D1F] font-medium') : ''}>
                            {author.name}
                          </span>
                        </span>
                      ))}
                    </p>
                    <p className={`text-base leading-relaxed mb-2 ${
                      isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                    }`}>
                      {pub.url ? (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`transition-colors ${
                            isDark ? 'hover:text-[#2997FF]' : 'hover:text-[#0071E3]'
                          }`}
                        >
                          {title}
                        </a>
                      ) : (
                        title
                      )}
                    </p>
                    <p className="text-sm text-[#86868B]">
                      {venue}, {location}
                      {pub.arxivUrl ? (
                        <>
                          {' · '}
                          <a
                            href={pub.arxivUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transition-colors ${
                              isDark ? 'hover:text-[#2997FF]' : 'hover:text-[#0071E3]'
                            }`}
                          >
                            arXiv
                          </a>
                        </>
                      ) : null}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
