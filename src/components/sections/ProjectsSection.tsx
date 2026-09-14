'use client'

import { motion } from 'framer-motion'
import { Calendar, ExternalLink, FileText, Presentation, Video } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import Image from 'next/image'
import {
  isComingSoonLink,
  researchLinkLabel,
  researchProjects,
  resolveLocalized,
  type ResearchLinkType,
} from '../../data/research'

const LINK_ICONS: Record<ResearchLinkType, typeof FileText> = {
  paper: FileText,
  arxiv: FileText,
  demo: Video,
  slides: Presentation,
}

export function ProjectsSection() {
  const { t, language } = useTranslation()
  const { isDark } = useTheme()

  return (
    <section id="projects" className="py-24 md:py-32 lg:py-40 relative">
      <div className="container mx-auto px-4 max-w-6xl">
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
            {t('researchProjects')}
          </h2>
          <div className={`w-24 h-0.5 mx-auto ${isDark ? 'bg-[#333336]' : 'bg-[#D2D2D7]'}`} />
        </motion.div>

        <div className="space-y-8">
          {researchProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4) }}
              className={`group rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 ${
                isDark ? 'bg-[#1D1D1F]' : 'bg-[#F5F5F7]'
              }`}
            >
              <div className="flex flex-col md:flex-row">
                {project.image && (
                  <div
                    className={`md:w-1/3 overflow-hidden ${
                      isDark ? 'bg-black/30' : 'bg-white/70'
                    }`}
                    aria-hidden={project.imageMuted || undefined}
                  >
                    <div className="relative min-h-[200px] aspect-video md:h-full md:min-h-[280px] md:aspect-auto">
                      <Image
                        src={project.image}
                        alt={project.imageMuted ? '' : project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={
                          project.imageMuted
                            ? 'object-contain p-16 md:p-20 opacity-20 pointer-events-none'
                            : 'object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]'
                        }
                      />
                    </div>
                  </div>
                )}

                <div className={`${project.image ? 'md:w-2/3' : 'w-full'} p-6 md:p-8`}>
                  <h3 className={`text-xl md:text-2xl font-medium mb-2 ${
                    isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                  }`}>
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#86868B] mb-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      isDark ? 'bg-[#2997FF]/10 text-[#7AB7FF]' : 'bg-[#0071E3]/10 text-[#006EDB]'
                    }`}>
                      {resolveLocalized(project.venue, language)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
                      {project.date}
                    </span>
                  </div>

                  <p className="mb-6 leading-relaxed text-[#86868B]">
                    {t(project.descriptionKey)}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link) => {
                      const Icon = LINK_ICONS[link.type]
                      const comingSoon = isComingSoonLink(link)
                      const label = researchLinkLabel(link.type, t, comingSoon)
                      const linkClassName = `inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                        isDark
                          ? 'bg-[#2997FF]/10 text-[#2997FF] hover:bg-[#2997FF]/20'
                          : 'bg-[#0071E3]/10 text-[#0071E3] hover:bg-[#0071E3]/20'
                      }`

                      if (comingSoon) {
                        return (
                          <span
                            key={link.type}
                            aria-disabled="true"
                            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg cursor-default opacity-70 ${
                              isDark
                                ? 'bg-[#2997FF]/10 text-[#2997FF]'
                                : 'bg-[#0071E3]/10 text-[#0071E3]'
                            }`}
                          >
                            <Icon aria-hidden="true" className="w-3.5 h-3.5" />
                            <span>{label}</span>
                          </span>
                        )
                      }

                      return (
                        <motion.a
                          key={link.type}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${label}: ${project.title}`}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={linkClassName}
                        >
                          <Icon aria-hidden="true" className="w-3.5 h-3.5" />
                          <span>{label}</span>
                          <ExternalLink aria-hidden="true" className="w-3 h-3" />
                        </motion.a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
