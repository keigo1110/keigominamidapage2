'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import Image from 'next/image'
import {
  isComingSoonLink,
  researchLinkLabel,
  researchProjects,
  resolveLocalized,
} from '../../data/research'

/** Native pixel sizes so posters keep their ratio without letterboxing. */
const RESEARCH_IMAGE_SIZE: Record<string, { width: number; height: number }> = {
  '/images/can_uist2026poster.png': { width: 1695, height: 644 },
  '/images/zoomable_uist2026poster.jpg': { width: 1312, height: 504 },
  '/images/augmented-leap.png': { width: 3584, height: 2000 },
  '/images/sigasi.jpg': { width: 4000, height: 2250 },
  '/images/Recertif.png': { width: 1946, height: 1128 },
  '/images/FSTL.png': { width: 1262, height: 526 },
}

const FEATURED_COUNT = 2

export function ProjectsSection() {
  const { t, language } = useTranslation()
  const { isDark } = useTheme()

  const ink = isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
  const muted = isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'
  const linkClass = isDark
    ? 'text-[#F2EFE9] underline decoration-[#2A2724]/80 underline-offset-4 transition-colors duration-300 hover:text-[#D4C07A] hover:decoration-[#D4C07A]'
    : 'text-[#1C1916] underline decoration-[#E4DFD6] underline-offset-4 transition-colors duration-300 hover:text-[#8A7428] hover:decoration-[#8A7428]'

  return (
    <section id="projects" className="relative py-20 md:py-28 lg:py-32">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className={`mb-2 text-xs font-medium tracking-[0.18em] uppercase ${muted}`}>
            Research
          </p>
          <h2 className={`text-2xl font-semibold sm:text-3xl md:text-4xl ${ink}`}>
            {t('researchProjects')}
          </h2>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {researchProjects.map((project, index) => {
            const showImage = Boolean(project.image && !project.imageMuted)
            const featured = index < FEATURED_COUNT && showImage
            const imageSize = project.image ? RESEARCH_IMAGE_SIZE[project.image] : undefined
            const imageLeads = index % 2 === 0

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {showImage && imageSize ? (
                  <div
                    className={`grid items-center gap-8 md:gap-12 ${
                      featured
                        ? 'md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'
                        : 'md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]'
                    }`}
                  >
                    <div
                      className={`min-w-0 ${
                        imageLeads ? 'md:order-1' : 'md:order-2'
                      }`}
                    >
                      <ResearchFigure
                        src={project.image!}
                        alt={project.title}
                        width={imageSize.width}
                        height={imageSize.height}
                        featured={featured}
                        isDark={isDark}
                        sizes={
                          featured
                            ? '(max-width: 768px) 100vw, 34rem'
                            : '(max-width: 768px) 100vw, 26rem'
                        }
                        priority={featured}
                      />
                    </div>

                    <div
                      className={`min-w-0 ${
                        imageLeads ? 'md:order-2' : 'md:order-1'
                      }`}
                    >
                      <ProjectMeta
                        venue={resolveLocalized(project.venue, language)}
                        date={project.date}
                        muted={muted}
                      />
                      <h3
                        className={`mt-2.5 font-medium leading-snug ${ink} ${
                          featured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p className={`mt-3 text-sm leading-relaxed sm:text-base ${muted}`}>
                        {t(project.descriptionKey)}
                      </p>
                      <ProjectLinks
                        projectTitle={project.title}
                        links={project.links}
                        t={t}
                        linkClass={linkClass}
                        muted={muted}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="max-w-2xl">
                    <ProjectMeta
                      venue={resolveLocalized(project.venue, language)}
                      date={project.date}
                      muted={muted}
                    />
                    <h3 className={`mt-2.5 text-lg font-medium leading-snug sm:text-xl ${ink}`}>
                      {project.title}
                    </h3>
                    <p className={`mt-3 text-sm leading-relaxed sm:text-base ${muted}`}>
                      {t(project.descriptionKey)}
                    </p>
                    <ProjectLinks
                      projectTitle={project.title}
                      links={project.links}
                      t={t}
                      linkClass={linkClass}
                      muted={muted}
                    />
                  </div>
                )}
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ResearchFigure({
  src,
  alt,
  width,
  height,
  featured,
  isDark,
  sizes,
  priority,
}: {
  src: string
  alt: string
  width: number
  height: number
  featured: boolean
  isDark: boolean
  sizes: string
  priority?: boolean
}) {
  const restShadow = isDark
    ? '0 18px 40px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.28), 0 0 0 1px rgba(184,160,74,0.08)'
    : '0 22px 48px rgba(28,25,22,0.12), 0 6px 16px rgba(28,25,22,0.06), 0 0 0 1px rgba(138,116,40,0.06)'
  const hoverShadow = isDark
    ? '0 28px 56px rgba(0,0,0,0.55), 0 8px 18px rgba(0,0,0,0.32), 0 0 0 1px rgba(184,160,74,0.16)'
    : '0 30px 60px rgba(28,25,22,0.16), 0 10px 22px rgba(28,25,22,0.08), 0 0 0 1px rgba(138,116,40,0.12)'

  return (
    <motion.div
      className="group relative"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Soft enchantment pool under the plate */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -bottom-4 top-[55%] -z-10 rounded-[50%] opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(184,160,74,0.18), transparent 68%)'
            : 'radial-gradient(ellipse at center, rgba(138,116,40,0.14), transparent 68%)',
        }}
      />

      <motion.div
        className={`relative overflow-hidden ${
          featured ? 'rounded-[1.25rem]' : 'rounded-[1rem]'
        }`}
        style={{ boxShadow: restShadow }}
        whileHover={{ boxShadow: hoverShadow }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="h-auto w-full"
          priority={priority}
        />

        {/* Soft rim light — only reads on hover / edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: isDark
              ? 'inset 0 0 0 1px rgba(212,192,122,0.22)'
              : 'inset 0 0 0 1px rgba(138,116,40,0.18)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

function ProjectMeta({
  venue,
  date,
  muted,
}: {
  venue: string
  date: string
  muted: string
}) {
  return (
    <p className={`text-xs tracking-wide sm:text-sm ${muted}`}>
      <span>{venue}</span>
      <span aria-hidden="true" className="mx-2">
        {' · '}
      </span>
      <time dateTime={date.replace('.', '-')}>{date}</time>
    </p>
  )
}

function ProjectLinks({
  projectTitle,
  links,
  t,
  linkClass,
  muted,
}: {
  projectTitle: string
  links: typeof researchProjects[number]['links']
  t: ReturnType<typeof useTranslation>['t']
  linkClass: string
  muted: string
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      {links.map((link) => {
        const comingSoon = isComingSoonLink(link)
        const label = researchLinkLabel(link.type, t, comingSoon)

        if (comingSoon) {
          return (
            <span key={link.type} aria-disabled="true" className={muted}>
              {label}
            </span>
          )
        }

        return (
          <a
            key={link.type}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label}: ${projectTitle}`}
            className={linkClass}
          >
            {label}
          </a>
        )
      })}
    </div>
  )
}
