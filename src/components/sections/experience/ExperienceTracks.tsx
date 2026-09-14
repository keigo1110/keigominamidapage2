'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ProcessedExperience } from '../../../types/experience'
import { useTranslation } from '../../../contexts/TranslationContext'
import { useTheme } from '../../../contexts/ThemeContext'

interface ExperienceTracksProps {
  experiences: ProcessedExperience[]
}

type TrackId = 'personal' | 'social' | 'community'

const LINK_PREVIEW_COUNT = 3
const LINK_EXPAND_STEP = 5

function sortByRecency(items: ProcessedExperience[]) {
  return [...items].sort((a, b) => {
    if (a.status === 'ongoing' && b.status !== 'ongoing') return -1
    if (a.status !== 'ongoing' && b.status === 'ongoing') return 1
    return b.startDate.getTime() - a.startDate.getTime()
  })
}

function ExpandingLinks({
  experienceId,
  links,
  isDark,
}: {
  experienceId: string
  links: ProcessedExperience['links']
  isDark: boolean
}) {
  const { t } = useTranslation()
  const [visibleCount, setVisibleCount] = useState(
    Math.min(LINK_PREVIEW_COUNT, links.length)
  )
  const visibleLinks = links.slice(0, visibleCount)
  const hasMore = visibleCount < links.length

  return (
    <div className="mt-2">
      <ul className={`space-y-1 text-sm leading-relaxed ${
        isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'
      }`}>
        {visibleLinks.map((link) => (
          <li key={`${experienceId}-${link.url}`}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDark ? 'hover:text-[#D4C07A]' : 'hover:text-[#8A7428]'
              }`}
            >
              {link.text || link.url}
            </a>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          type="button"
          onClick={() => {
            setVisibleCount((count) => Math.min(count + LINK_EXPAND_STEP, links.length))
          }}
          aria-expanded={visibleCount > LINK_PREVIEW_COUNT}
          className={`mt-2 text-sm transition-colors ${
            isDark ? 'text-[#D4C07A] hover:text-[#F2EFE9]' : 'text-[#8A7428] hover:text-[#1C1916]'
          }`}
        >
          {t('experienceShowMore')}
        </button>
      )}
    </div>
  )
}

function dateTimeValue(experience: ProcessedExperience) {
  const year = experience.startDate.getFullYear()
  const month = String(experience.startDate.getMonth() + 1).padStart(2, '0')
  const day = String(experience.startDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function ExperienceEntry({
  experience,
  isDark,
}: {
  experience: ProcessedExperience
  isDark: boolean
}) {
  const { t } = useTranslation()
  const title = experience.title || t('projectsLabel')
  const showLogo = Boolean(experience.logo) && experience.category !== 'origin'
  const isOngoing = experience.status === 'ongoing'

  return (
    <article className="relative pl-6">
      <span
        aria-hidden
        className={`absolute left-0 top-[0.55rem] h-2 w-2 -translate-x-1/2 rounded-full border ${
          isOngoing
            ? isDark
              ? 'border-[#D4C07A] bg-[#D4C07A]'
              : 'border-[#8A7428] bg-[#8A7428]'
            : isDark
              ? 'border-[#D4C07A] bg-[#0C0B0A]'
              : 'border-[#8A7428] bg-[#F7F4EF]'
        }`}
      />
      <p className={`text-xs tracking-wide ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
        <time dateTime={dateTimeValue(experience)}>{experience.displayDate}</time>
        {isOngoing && (
          <>
            <span aria-hidden className="mx-2">·</span>
            <span className={isDark ? 'text-[#D4C07A]' : 'text-[#8A7428]'}>
              {t('ongoingLabel')}
            </span>
          </>
        )}
      </p>
      <div className="mt-2 flex items-start gap-3">
        {showLogo && (
          <div className={`mt-0.5 h-9 w-9 shrink-0 overflow-hidden rounded-sm border ${
            isDark ? 'border-[#2A2724]' : 'border-[#E4DFD6]'
          }`}>
            <Image
              src={experience.logo}
              alt=""
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h4 className={`text-base font-medium leading-snug ${
            isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
          }`}>
            {title}
          </h4>
          {experience.position && (
            <p className={`mt-1 text-sm leading-relaxed ${
              isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'
            }`}>
              {experience.position}
            </p>
          )}
          {experience.links.length > 0 && (
            <ExpandingLinks
              experienceId={experience.id}
              links={experience.links}
              isDark={isDark}
            />
          )}
        </div>
      </div>
    </article>
  )
}

function TrackLaneLabel({
  children,
  isDark,
  emphasize,
}: {
  children: string
  isDark: boolean
  emphasize: boolean
}) {
  return (
    <p className={`pl-6 text-[11px] tracking-[0.16em] ${
      emphasize ? 'uppercase' : ''
    } ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
      {children}
    </p>
  )
}

function TrackColumn({
  label,
  currentItems,
  pastItems,
  isDark,
  latinLabels,
}: {
  label: string
  currentItems: ProcessedExperience[]
  pastItems: ProcessedExperience[]
  isDark: boolean
  latinLabels: boolean
}) {
  const { t } = useTranslation()
  const hasCurrent = currentItems.length > 0
  const hasPast = pastItems.length > 0

  return (
    <section className="relative min-w-0">
      <h3 className={`mb-6 text-xs font-medium tracking-[0.18em] ${
        latinLabels ? 'uppercase' : ''
      } ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
        {label}
      </h3>

      <div className="relative">
        <div
          aria-hidden
          className={`absolute bottom-2 left-0 top-1 w-px ${
            isDark
              ? 'bg-gradient-to-b from-[#B8A04A]/40 via-[#2A2724] to-transparent'
              : 'bg-gradient-to-b from-[#8A7428]/30 via-[#E4DFD6] to-transparent'
          }`}
        />

        <div className="space-y-8">
          {hasCurrent && (
            <div className="space-y-5">
              <TrackLaneLabel isDark={isDark} emphasize={latinLabels}>
                {t('currentLabel')}
              </TrackLaneLabel>
              {currentItems.map((experience) => (
                <ExperienceEntry
                  key={experience.id}
                  experience={experience}
                  isDark={isDark}
                />
              ))}
            </div>
          )}

          {hasPast && (
            <div className="space-y-5">
              <TrackLaneLabel isDark={isDark} emphasize={latinLabels}>
                {t('milestonesLabel')}
              </TrackLaneLabel>
              {pastItems.map((experience) => (
                <ExperienceEntry
                  key={experience.id}
                  experience={experience}
                  isDark={isDark}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function ExperienceTracks({ experiences }: ExperienceTracksProps) {
  const { t, language } = useTranslation()
  const { isDark } = useTheme()
  const latinLabels = language === 'en'

  const tracks = useMemo(() => ([
    { id: 'personal' as TrackId, label: t('personalTrackLabel') },
    { id: 'social' as TrackId, label: t('socialTrackLabel') },
    { id: 'community' as TrackId, label: t('communityTrackLabel') },
  ]), [t])

  const columns = useMemo(() => {
    return tracks.map((track) => {
      const items = experiences.filter((exp) => exp.track === track.id)
      return {
        ...track,
        currentItems: sortByRecency(items.filter((exp) => exp.status === 'ongoing')),
        pastItems: sortByRecency(items.filter((exp) => exp.status !== 'ongoing')),
      }
    })
  }, [tracks, experiences])

  return (
    <div className="space-y-10" role="region" aria-label={t('experienceTracksAria')}>
      <div className="grid gap-12 lg:grid-cols-3 lg:gap-10 xl:gap-14">
        {columns.map((column, index) => (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <TrackColumn
              label={column.label}
              currentItems={column.currentItems}
              pastItems={column.pastItems}
              isDark={isDark}
              latinLabels={latinLabels}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
