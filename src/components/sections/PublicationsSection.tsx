'use client'

import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { useTranslation } from '../../contexts/TranslationContext'
import { publications, resolveLocalized } from '../../data/research'

export function PublicationsSection() {
  const { isDark } = useTheme()
  const { language } = useTranslation()

  return (
    <section id="publications" className="world-library relative py-24 md:py-32 lg:py-40">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-16"
        >
          <p className={`mb-2 text-xs font-medium uppercase tracking-[0.18em] ${
            isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'
          }`}>
            Library
          </p>
          <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl ${
            isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
          }`}>
            Publications
          </h2>
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
                <div className={`flex flex-col gap-4 border-b pb-8 md:flex-row md:items-baseline md:gap-8 ${
                  isDark ? 'border-[#2A2724]' : 'border-[#E4DFD6]'
                }`}>
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className={`text-sm font-light ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                      {pub.date}
                    </span>
                  </motion.div>
                  <div className="flex-1">
                    <p className={`mb-2 text-sm ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                      {resolveLocalized(pub.authors, language).map((author, i) => (
                        <span key={`${pub.id}-${author.name}`}>
                          {i > 0 && ', '}
                          <span className={author.highlight ? (isDark ? 'font-medium text-[#F2EFE9]' : 'font-medium text-[#1C1916]') : ''}>
                            {author.name}
                          </span>
                        </span>
                      ))}
                    </p>
                    <p className={`mb-2 text-base leading-relaxed ${
                      isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
                    }`}>
                      {pub.url ? (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`transition-colors ${
                            isDark ? 'hover:text-[#D4C07A]' : 'hover:text-[#8A7428]'
                          }`}
                        >
                          {title}
                        </a>
                      ) : (
                        title
                      )}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                      {venue}, {location}
                      {pub.arxivUrl ? (
                        <>
                          {' · '}
                          <a
                            href={pub.arxivUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transition-colors ${
                              isDark ? 'hover:text-[#D4C07A]' : 'hover:text-[#8A7428]'
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
