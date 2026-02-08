import { motion } from 'framer-motion'
import { useMemo } from 'react'
import Image from 'next/image'
import { Activity, Calendar, ExternalLink, MapPin } from 'lucide-react'
import { ProcessedExperience } from '../../../types/experience'
import { TimelineBounds, calculateProjectVerticalPosition, VerticalProjectPosition } from '../../../utils/experienceProcessor'
import { CurrentTimeIndicator } from './CurrentTimeIndicator'
import { useTranslation } from '../../../contexts/TranslationContext'
import { useTheme } from '../../../contexts/ThemeContext'

interface TimelineChartProps {
  experiences: ProcessedExperience[]
  timelineBounds: TimelineBounds
  currentFocusItems: ProcessedExperience[]
  currentLogLines: string[]
  hoveredProject: string | null
  onProjectHover: (id: string | null) => void
}

type PositionedExperience = VerticalProjectPosition & {
  topPx: number
  depthOpacity: number
}

export function TimelineChart({
  experiences,
  timelineBounds,
  currentFocusItems,
  currentLogLines
}: TimelineChartProps) {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const ongoingIds = useMemo(() => new Set(currentFocusItems.map(exp => exp.id)), [currentFocusItems])

  const milestones = useMemo(() => {
    return experiences.filter(exp => !ongoingIds.has(exp.id) && exp.category !== 'origin')
  }, [experiences, ongoingIds])

  const roots = useMemo(() => {
    return experiences.filter(exp => exp.category === 'origin')
  }, [experiences])

  const baseTimelineHeight = useMemo(() => {
    return Math.max(720, timelineBounds.totalMonths * 12)
  }, [timelineBounds.totalMonths])

  const tracks = useMemo(() => ([
    { id: 'personal', label: t('personalTrackLabel') },
    { id: 'social', label: t('socialTrackLabel') },
    { id: 'community', label: t('communityTrackLabel') }
  ]), [t])

  const positionedTracks = useMemo(() => {
    const minGap = 88

    const buildPositions = (items: ProcessedExperience[]) => {
      if (items.length === 0) {
        return { items: [] as PositionedExperience[], height: baseTimelineHeight }
      }

      const basePositions = items.map(exp => ({
        experience: exp,
        ...calculateProjectVerticalPosition(exp, timelineBounds),
        isOngoing: exp.status === 'ongoing'
      }))

      const sorted = [...basePositions].sort((a, b) => a.topPercent - b.topPercent)
      let lastTop = -Infinity

      const positioned = sorted.map(position => {
        let topPx = (position.topPercent / 100) * baseTimelineHeight
        if (topPx - lastTop < minGap) {
          topPx = lastTop + minGap
        }
        lastTop = topPx

        const depthRatio = Math.min(1, Math.max(0, position.topPercent / 100))
        const depthOpacity = 1 - depthRatio * 0.45

        return {
          ...position,
          topPx,
          depthOpacity
        }
      })

      const height = Math.max(baseTimelineHeight, (lastTop === -Infinity ? 0 : lastTop) + minGap)
      return { items: positioned, height }
    }

    const personalItems = milestones.filter(exp => exp.track === 'personal')
    const socialItems = milestones.filter(exp => exp.track === 'social')
    const communityItems = milestones.filter(exp => exp.track === 'community')

    const personal = buildPositions(personalItems)
    const social = buildPositions(socialItems)
    const community = buildPositions(communityItems)

    const height = Math.max(personal.height, social.height, community.height, baseTimelineHeight)

    return {
      height,
      tracks: {
        personal,
        social,
        community
      }
    }
  }, [milestones, timelineBounds, baseTimelineHeight])

  return (
    <div className="relative w-full space-y-16" role="region" aria-label="経歴タイムライン" tabIndex={0}>
      {/* Current */}
      <section className={`space-y-7 pb-10 border-b ${
        isDark ? 'border-[#2C2C2E]/70' : 'border-[#D2D2D7]/70'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-xl sm:text-2xl font-semibold tracking-tight ${
              isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
            }`}>
              {t('currentLabel')}
            </h3>
            <p className="text-sm text-[#86868B] mt-1">{t('currentSubtitle')}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#86868B]">
            <Activity className="w-4 h-4" />
            <span>{t('ongoingLabel')}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`relative overflow-hidden rounded-2xl border p-4 sm:p-6 ${
            isDark
              ? 'border-[#2C2C2E] bg-gradient-to-br from-[#161618] via-[#1A1A1C] to-[#101012]'
              : 'border-[#D2D2D7] bg-gradient-to-br from-white via-[#FAFAFC] to-[#F2F2F7]'
          }`}>
            <div className="text-xs uppercase tracking-[0.2em] text-[#86868B] mb-4">
              {t('currentLogLabel')}
            </div>
            <div className="space-y-3 text-sm text-[#86868B] font-mono">
              {currentLogLines.length > 0 ? (
                currentLogLines.map((line, index) => (
                  <div key={`${line}-${index}`} className="flex items-start gap-3">
                    <span className="text-[10px] leading-6">-</span>
                    <span className="leading-6">{line}</span>
                  </div>
                ))
              ) : (
                <div className="text-sm">{t('currentEmpty')}</div>
              )}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {tracks.map(track => {
              const items = currentFocusItems.filter(exp => exp.track === track.id)
              return (
                <div key={track.id} className="space-y-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-[#86868B]">
                    {track.label}
                  </div>
                  {items.map(exp => (
                    <motion.div
                      key={exp.id}
                      className={`rounded-2xl border p-4 sm:p-5 transition-shadow ${
                        isDark
                          ? 'border-[#333336] bg-[#1D1D1F] hover:shadow-[0_16px_50px_rgba(0,0,0,0.4)]'
                          : 'border-[#D2D2D7] bg-[#F5F5F7] hover:shadow-[0_16px_50px_rgba(0,0,0,0.14)]'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                          <Image src={exp.logo} alt={exp.title} width={48} height={48} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className={`text-lg font-semibold truncate ${
                                isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                              }`}>
                                {exp.title || t('projectsLabel')}
                              </h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                isDark ? 'bg-[#2997FF]/15 text-[#2997FF]' : 'bg-[#0071E3]/10 text-[#0071E3]'
                              }`}>
                                {t('ongoingLabel')}
                              </span>
                            </div>
                            <div className="text-sm text-[#86868B] mt-1">
                              {exp.position || exp.organization}
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-[#86868B] mt-3">
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {exp.displayDate}
                              </span>
                              {exp.location && (
                                <span className="inline-flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {exp.location}
                                </span>
                              )}
                            </div>
                          </div>
                          {exp.links.length > 0 && (
                            <div className="flex flex-wrap gap-2 text-xs">
                              {exp.links.map((link, index) => (
                                <a
                                  key={`${exp.id}-link-${index}`}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 border ${
                                    isDark
                                      ? 'border-[#2C2C2E] text-[#86868B] hover:text-[#F5F5F7]'
                                      : 'border-[#D2D2D7] text-[#86868B] hover:text-[#1D1D1F]'
                                  }`}
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  <span className="truncate max-w-[140px]">{link.text || new URL(link.url).hostname}</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className={`space-y-7 pb-10 border-b ${
        isDark ? 'border-[#2C2C2E]/70' : 'border-[#D2D2D7]/70'
      }`}>
        <div>
          <h3 className={`text-xl sm:text-2xl font-semibold tracking-tight ${
            isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
          }`}>
            {t('milestonesLabel')}
          </h3>
          <p className="text-sm text-[#86868B] mt-1">{t('milestonesSubtitle')}</p>
        </div>

        <div className="relative">
          <CurrentTimeIndicator
            timelineBounds={timelineBounds}
            experiences={experiences.map(exp => ({
              startDate: exp.startDate,
              endDate: exp.endDate,
              status: exp.status
            }))}
          />

          <div className="grid gap-6 lg:grid-cols-3" style={{ minHeight: `${positionedTracks.height}px` }}>
            {tracks.map(track => {
              const trackData = positionedTracks.tracks[track.id as keyof typeof positionedTracks.tracks]
              const trackOffset = 28

              return (
                <div key={track.id} className="relative" style={{ minHeight: `${positionedTracks.height}px` }}>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#86868B] mb-4">
                    {track.label}
                  </div>
                  <div
                    className={`absolute left-6 w-px ${
                      isDark ? 'bg-gradient-to-b from-[#4B5563] via-[#333336] to-[#1F2937]' : 'bg-gradient-to-b from-[#C7CBD1] via-[#D2D2D7] to-[#E5E7EB]'
                    }`}
                    style={{ top: `${trackOffset}px`, bottom: 0 }}
                  />

                  {trackData.items.map(position => {
                    const exp = position.experience
                    const displayTitle = exp.title || t('projectsLabel')
                    const depthStyle = { opacity: position.depthOpacity }
                    const topPx = position.topPx + trackOffset

                    return (
                      <div key={exp.id}>
                        <div
                          className={`absolute left-6 -translate-x-1/2 w-3 h-3 rounded-full border ${
                            isDark ? 'border-[#F5F5F7] bg-[#1D1D1F]' : 'border-[#1D1D1F] bg-[#F5F5F7]'
                          }`}
                          style={{ top: `${topPx}px` }}
                        />
                        <motion.div
                          className="absolute left-12 right-2"
                          style={{ top: `${topPx}px`, transform: 'translateY(-50%)', ...depthStyle }}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className={`rounded-2xl border p-4 sm:p-5 ${
                            isDark ? 'border-[#333336] bg-[#1D1D1F]' : 'border-[#D2D2D7] bg-white'
                          }`}>
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                                <Image src={exp.logo} alt={displayTitle} width={40} height={40} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0 space-y-3">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className={`text-base font-semibold truncate ${
                                      isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                                    }`}>
                                      {displayTitle}
                                    </h4>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                      isDark ? 'bg-[#2C2C2E] text-[#9CA3AF]' : 'bg-[#F2F2F7] text-[#6B7280]'
                                    }`}>
                                      {exp.startDate.getFullYear()}
                                    </span>
                                    {exp.status === 'completed' && (
                                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#86868B]">
                                        {t('completedLabel')}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-sm text-[#86868B] mt-1">
                                    {exp.position || exp.organization}
                                  </div>
                                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#86868B] mt-3">
                                    <span className="inline-flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {exp.displayDate}
                                    </span>
                                    {exp.location && (
                                      <span className="inline-flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {exp.location}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {exp.links.length > 0 && (
                                  <div className="flex flex-wrap gap-2 text-xs">
                                    {exp.links.map((link, index) => (
                                      <a
                                        key={`${exp.id}-link-${index}`}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 border ${
                                          isDark
                                            ? 'border-[#2C2C2E] text-[#86868B] hover:text-[#F5F5F7]'
                                            : 'border-[#D2D2D7] text-[#86868B] hover:text-[#1D1D1F]'
                                        }`}
                                      >
                                        <ExternalLink className="w-3 h-3" />
                                        <span className="truncate max-w-[140px]">{link.text || new URL(link.url).hostname}</span>
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Roots */}
      <section className="space-y-7">
        <div>
          <h3 className={`text-xl sm:text-2xl font-semibold tracking-tight ${
            isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
          }`}>
            {t('rootsLabel')}
          </h3>
          <p className="text-sm text-[#86868B] mt-1">{t('rootsSubtitle')}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tracks.map(track => {
            const items = roots.filter(exp => exp.track === track.id)

            return (
              <div
                key={track.id}
                className={`rounded-2xl border p-5 sm:p-6 ${
                  isDark ? 'border-[#2C2C2E] bg-[#141416]' : 'border-[#D2D2D7] bg-[#F5F5F7]'
                }`}
              >
                <div className="text-xs uppercase tracking-[0.2em] text-[#86868B] mb-4">
                  {track.label}
                </div>
                {items.length > 0 && (
                  <div className="space-y-4">
                    {items.map(exp => (
                      <div key={exp.id} className="flex items-start gap-4 text-[#86868B]">
                        <div className="text-xs uppercase tracking-[0.3em] mt-1">
                          {t('bornLabel')}
                        </div>
                        <div>
                          <div className={`text-base font-medium ${
                            isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                          }`}>
                            {exp.title}
                          </div>
                          <div className="text-sm mt-1">{exp.displayDate}</div>
                          {exp.location && (
                            <div className="text-sm mt-1">{exp.location}</div>
                          )}
                          {exp.shortDescription && (
                            <div className="text-sm mt-2">{exp.shortDescription}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
