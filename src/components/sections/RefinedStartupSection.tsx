'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import Image from 'next/image'
import {
  WAKABAR_APP_STORE_URL,
  WAKABAR_APP_URL,
  WAKABAR_CORPORATE_URL,
  WAKABAR_TOUR_URL,
} from '../../data/wakabar'

const ease = [0.22, 1, 0.36, 1] as const

export function RefinedStartupSection() {
  const { t, language } = useTranslation()
  const { isDark } = useTheme()

  const ink = isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
  const muted = isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'
  const gold = isDark ? 'text-[#D4C07A]' : 'text-[#8A7428]'
  const linkClass = isDark
    ? 'text-[#F2EFE9] underline decoration-[#2A2724]/80 underline-offset-4 transition-colors duration-300 hover:text-[#D4C07A] hover:decoration-[#D4C07A]'
    : 'text-[#1C1916] underline decoration-[#E4DFD6] underline-offset-4 transition-colors duration-300 hover:text-[#8A7428] hover:decoration-[#8A7428]'

  const restShadow = isDark
    ? '0 22px 48px rgba(0,0,0,0.5), 0 6px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(184,160,74,0.1)'
    : '0 26px 56px rgba(28,25,22,0.14), 0 8px 18px rgba(28,25,22,0.07), 0 0 0 1px rgba(138,116,40,0.08)'
  const hoverShadow = isDark
    ? '0 32px 64px rgba(0,0,0,0.58), 0 10px 22px rgba(0,0,0,0.34), 0 0 0 1px rgba(184,160,74,0.18)'
    : '0 34px 68px rgba(28,25,22,0.18), 0 12px 24px rgba(28,25,22,0.09), 0 0 0 1px rgba(138,116,40,0.14)'
  const markShadow = isDark
    ? '0 12px 28px rgba(0,0,0,0.4), 0 0 0 1px rgba(184,160,74,0.1)'
    : '0 14px 32px rgba(28,25,22,0.12), 0 0 0 1px rgba(138,116,40,0.08)'

  const appStoreBadgeSrc = isDark
    ? language === 'ja'
      ? '/images/badges/app-store-ja-white.svg'
      : '/images/badges/app-store-en-white.svg'
    : language === 'ja'
      ? '/images/badges/app-store-ja-black.svg'
      : '/images/badges/app-store-en-black.svg'
  const appStoreBadgeSize = language === 'ja'
    ? { width: 109, height: 40 }
    : { width: 120, height: 40 }
  const appStoreBadgeAlt = t('wakabarAppStoreBadgeAlt')

  const coreFeatures = [
    {
      title: t('audioWarningSystem'),
      description: t('audioWarningDescription'),
    },
    {
      title: t('realtimeTracking'),
      description: t('realtimeTrackingDescription'),
    },
    {
      title: t('dataAnalysis'),
      description: t('dataAnalysisDescription'),
    },
    {
      title: t('safetyEducation'),
      description: t('safetyEducationDescription'),
    },
  ]

  const wakabarSites = [
    {
      name: t('wakabarAppSite'),
      url: WAKABAR_APP_URL,
      description: t('applicationDescription'),
    },
    {
      name: t('wakabarTourSite'),
      url: WAKABAR_TOUR_URL,
      description: t('selfTourDescription'),
    },
    {
      name: t('wakabarMainSite'),
      url: WAKABAR_CORPORATE_URL,
      description: t('corporateSiteDescription'),
    },
  ]

  return (
    <section id="startup" className="world-civic relative overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <motion.header
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="max-w-3xl"
        >
          <p className={`mb-2 text-xs font-medium uppercase tracking-[0.18em] ${muted}`}>
            Startup
          </p>

          <div className="flex items-center gap-4 sm:gap-5">
            <div
              className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[1rem] sm:h-16 sm:w-16"
              style={{ boxShadow: markShadow }}
            >
              <Image
                src="/images/wakabar.png"
                alt=""
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl ${ink}`}>
                {t('Companyname')}
              </h2>
              <p className={`mt-1.5 text-sm font-medium sm:text-base ${gold}`}>
                {t('locationBasedAccidentPrevention')}
              </p>
            </div>
          </div>

          <p className={`mt-8 text-xl font-light leading-snug tracking-tight sm:text-2xl ${ink}`}>
            {t('bicycleAccidentPrevention')}
          </p>
          <p className={`mt-3 text-base font-light leading-relaxed sm:text-lg ${muted}`}>
            {t('wakabarDescription')}
          </p>
        </motion.header>

        <motion.figure
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.75, delay: 0.06, ease }}
          className="mt-12 md:mt-16"
          aria-label={t('serviceDemoVideoTitle')}
        >
          <div className="group relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-8 -bottom-5 top-[55%] -z-10 rounded-[50%] opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: isDark
                  ? 'radial-gradient(ellipse at center, rgba(184,160,74,0.2), transparent 68%)'
                  : 'radial-gradient(ellipse at center, rgba(138,116,40,0.16), transparent 68%)',
              }}
            />

            <motion.div
              className="relative aspect-video overflow-hidden rounded-[1.25rem]"
              style={{ boxShadow: restShadow }}
              whileHover={{ boxShadow: hoverShadow }}
              transition={{ duration: 0.45, ease }}
            >
              <iframe
                src="https://www.youtube.com/embed/C9rNbZwhLqE"
                title={t('serviceDemoVideoTitle')}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
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
          </div>
        </motion.figure>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="mt-8 space-y-8 sm:mt-10"
        >
          <a
            href={WAKABAR_APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit"
            aria-label={appStoreBadgeAlt}
          >
            <Image
              src={appStoreBadgeSrc}
              alt=""
              width={appStoreBadgeSize.width}
              height={appStoreBadgeSize.height}
              style={{ width: 'auto', height: 'auto' }}
              unoptimized
            />
          </a>

          <nav aria-label="Wakabar" className="grid gap-5 sm:grid-cols-3 sm:gap-8">
            {wakabarSites.map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group min-w-0"
              >
                <span className={linkClass}>{site.name}</span>
                <span className={`mt-1 block text-sm leading-relaxed ${muted}`}>
                  {site.description}
                </span>
              </a>
            ))}
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className={`mt-16 border-t pt-10 md:mt-20 ${
            isDark ? 'border-[#2A2724]' : 'border-[#E4DFD6]'
          }`}
        >
          <p className={`text-xs font-medium uppercase tracking-[0.18em] ${muted}`}>
            {t('startupMission')}
          </p>
          <p className={`mt-3 max-w-2xl text-lg font-light leading-relaxed sm:text-xl ${ink}`}>
            {t('startupMissionDescription')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
          className="mt-16 md:mt-20"
        >
          <h3 className={`text-2xl font-semibold tracking-tight sm:text-3xl ${ink}`}>
            {t('coreServices')}
          </h3>
          <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {coreFeatures.map((feature) => (
              <div
                key={feature.title}
                className={`border-t pt-5 ${isDark ? 'border-[#2A2724]' : 'border-[#E4DFD6]'}`}
              >
                <h4 className={`text-base font-semibold sm:text-lg ${ink}`}>
                  {feature.title}
                </h4>
                <p className={`mt-2 text-sm leading-relaxed sm:text-base ${muted}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
