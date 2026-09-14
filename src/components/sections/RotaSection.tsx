'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useTranslation } from '../../contexts/TranslationContext'
import {
  ROTA_CHARACTER_IMAGE,
  localizeRotaText,
  rotaLineStampPreviews,
  rotaLineStampUrls,
  rotaProfile,
} from '../../data/rota'
import { usePrefersReducedMotion } from '../portfolio-agent/usePrefersReducedMotion'

export function RotaSection() {
  const { isDark } = useTheme()
  const { language } = useTranslation()
  const prefersReducedMotion = usePrefersReducedMotion()
  const lineStampUrl = rotaLineStampUrls[language]

  return (
    <section id="rota" className="relative overflow-hidden py-16 sm:py-24 md:py-32">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${
          isDark
            ? 'bg-[radial-gradient(circle_at_18%_18%,rgba(41,151,255,0.16),transparent_42%),radial-gradient(circle_at_82%_8%,rgba(212,175,55,0.1),transparent_32%)]'
            : 'bg-[radial-gradient(circle_at_18%_18%,rgba(0,113,227,0.1),transparent_42%),radial-gradient(circle_at_82%_8%,rgba(184,148,52,0.12),transparent_32%)]'
        }`}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-md px-8 py-10 sm:px-10"
          >
            <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[24rem]">
              <motion.div
                aria-hidden="true"
                className={`absolute inset-[-8%] rounded-full border border-dashed ${
                  isDark ? 'border-[#2997FF]/35' : 'border-[#0071E3]/25'
                }`}
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={prefersReducedMotion ? undefined : { duration: 36, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                aria-hidden="true"
                className={`absolute inset-[-16%] rounded-full border ${
                  isDark ? 'border-white/10' : 'border-black/8'
                }`}
                animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                transition={prefersReducedMotion ? undefined : { duration: 52, repeat: Infinity, ease: 'linear' }}
              />
              <Image
                src={ROTA_CHARACTER_IMAGE}
                alt={`${rotaProfile.name}, ${localizeRotaText(rotaProfile.eyebrow, language)}`}
                width={960}
                height={960}
                priority
                quality={95}
                sizes="(max-width: 640px) 20rem, 24rem"
                className={`relative h-full w-full object-contain ${
                  isDark
                    ? 'drop-shadow-[0_22px_40px_rgba(0,0,0,0.45)]'
                    : 'drop-shadow-[0_18px_28px_rgba(15,23,42,0.18)]'
                }`}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
            className="text-center lg:pr-32 lg:text-left"
          >
            <p className={`mb-3 text-sm font-medium ${
              language === 'en' ? 'tracking-[0.22em] uppercase' : 'tracking-wide'
            } ${isDark ? 'text-[#2997FF]' : 'text-[#0071E3]'}`}>
              {localizeRotaText(rotaProfile.eyebrow, language)}
            </p>
            <h1 className={`text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl ${
              isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
            }`}>
              {rotaProfile.name}
            </h1>
            <p className="mt-2 text-sm tracking-wide text-[#86868B]">
              {localizeRotaText(rotaProfile.badge, language)}
            </p>
            <p className={`mx-auto mt-8 max-w-2xl text-lg leading-relaxed lg:mx-0 ${
              isDark ? 'text-[#F5F5F7]/90' : 'text-[#1D1D1F]/90'
            }`}>
              {localizeRotaText(rotaProfile.lead, language)}
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#86868B] lg:mx-0">
              {localizeRotaText(rotaProfile.story, language)}
            </p>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3 sm:gap-6">
          {rotaProfile.traits.map((trait, index) => (
            <motion.article
              key={trait.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08, ease: 'easeOut' }}
              className={`rounded-2xl px-6 py-6 ${
                isDark ? 'bg-[#1D1D1F]' : 'bg-[#F5F5F7]'
              }`}
            >
              <h2 className={`text-lg font-semibold tracking-tight ${
                isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
              }`}>
                {localizeRotaText(trait.title, language)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#86868B]">
                {localizeRotaText(trait.description, language)}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.36, ease: 'easeOut' }}
          className={`mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed ${
            isDark ? 'text-[#2997FF]' : 'text-[#0071E3]'
          }`}
        >
          {localizeRotaText(rotaProfile.askHint, language)}
        </motion.p>

        <motion.a
          href={lineStampUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42, ease: 'easeOut' }}
          className={`mb-8 mt-16 flex flex-col gap-5 rounded-2xl border p-5 no-underline transition-colors sm:flex-row sm:items-center sm:justify-between sm:p-6 ${
            isDark
              ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.05]'
              : 'border-black/10 bg-black/[0.02] hover:bg-black/[0.04]'
          }`}
          aria-label={localizeRotaText(rotaProfile.lineStamp.cta, language)}
        >
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex shrink-0 gap-1.5">
              {rotaLineStampPreviews.map((preview) => (
                <Image
                  key={preview.src}
                  src={preview.src}
                  alt=""
                  width={128}
                  height={128}
                  className="h-11 w-11 object-contain sm:h-12 sm:w-12"
                />
              ))}
            </div>
            <div className="min-w-0">
              <p className={`text-[11px] font-medium text-[#86868B] ${
                language === 'en' ? 'uppercase tracking-[0.18em]' : 'tracking-wide'
              }`}>
                {localizeRotaText(rotaProfile.lineStamp.eyebrow, language)}
              </p>
              <p className={`truncate text-sm font-semibold sm:text-base ${
                isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
              }`}>
                {localizeRotaText(rotaProfile.lineStamp.title, language)}
              </p>
              <p className="mt-1 hidden text-sm leading-snug text-[#86868B] sm:block">
                {localizeRotaText(rotaProfile.lineStamp.blurb, language)}
              </p>
            </div>
          </div>
          <span className={`inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold ${
            isDark ? 'text-[#2997FF]' : 'text-[#0071E3]'
          }`}>
            {localizeRotaText(rotaProfile.lineStamp.cta, language)}
            <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          </span>
        </motion.a>
      </div>
    </section>
  )
}
