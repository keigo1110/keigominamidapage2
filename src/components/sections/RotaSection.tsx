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
    <section id="rota" className="world-ambient relative overflow-hidden py-16 sm:py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md px-8 py-10 sm:px-10"
          >
            <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[24rem]">
              <motion.div
                aria-hidden="true"
                className={`absolute inset-[-8%] rounded-full border border-dashed ${
                  isDark ? 'border-[#B8A04A]/30' : 'border-[#8A7428]/25'
                }`}
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={prefersReducedMotion ? undefined : { duration: 48, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                aria-hidden="true"
                className={`absolute inset-[-16%] rounded-full border ${
                  isDark ? 'border-[#2A2724]' : 'border-[#E4DFD6]'
                }`}
                animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                transition={prefersReducedMotion ? undefined : { duration: 64, repeat: Infinity, ease: 'linear' }}
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
                    : 'drop-shadow-[0_18px_28px_rgba(28,25,22,0.14)]'
                }`}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:pr-32 lg:text-left"
          >
            <p className={`mb-3 text-sm font-medium ${
              language === 'en' ? 'tracking-[0.22em] uppercase' : 'tracking-wide'
            } ${isDark ? 'text-[#D4C07A]' : 'text-[#8A7428]'}`}>
              {localizeRotaText(rotaProfile.eyebrow, language)}
            </p>
            <h1 className={`text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl ${
              isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
            }`}>
              {rotaProfile.name}
            </h1>
            <p className={`mt-2 text-sm tracking-wide ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
              {localizeRotaText(rotaProfile.badge, language)}
            </p>
            <p className={`mx-auto mt-8 max-w-2xl text-lg leading-relaxed lg:mx-0 ${
              isDark ? 'text-[#F2EFE9]/90' : 'text-[#1C1916]/90'
            }`}>
              {localizeRotaText(rotaProfile.lead, language)}
            </p>
            <p className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed lg:mx-0 ${
              isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'
            }`}>
              {localizeRotaText(rotaProfile.story, language)}
            </p>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3 sm:gap-6">
          {rotaProfile.traits.map((trait, index) => (
            <motion.article
              key={trait.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.15 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-sm border px-6 py-6 ${
                isDark ? 'border-[#2A2724] bg-[#161412]' : 'border-[#E4DFD6] bg-[#EFE9E0]/70'
              }`}
            >
              <h2 className={`text-lg font-semibold tracking-tight ${
                isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
              }`}>
                {localizeRotaText(trait.title, language)}
              </h2>
              <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                {localizeRotaText(trait.description, language)}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed ${
            isDark ? 'text-[#D4C07A]' : 'text-[#8A7428]'
          }`}
        >
          {localizeRotaText(rotaProfile.askHint, language)}
        </motion.p>

        <motion.a
          href={lineStampUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className={`mb-8 mt-16 flex flex-col gap-5 rounded-sm border p-5 no-underline transition-colors sm:flex-row sm:items-center sm:justify-between sm:p-6 ${
            isDark
              ? 'border-[#2A2724] bg-[#161412] hover:border-[#B8A04A]/35'
              : 'border-[#E4DFD6] bg-[#EFE9E0]/50 hover:border-[#8A7428]/35'
          }`}
          aria-label={`${localizeRotaText(rotaProfile.lineStamp.title, language)} — ${localizeRotaText(rotaProfile.lineStamp.cta, language)}`}
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
              <p className={`text-[11px] font-medium ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'} ${
                language === 'en' ? 'uppercase tracking-[0.18em]' : 'tracking-wide'
              }`}>
                {localizeRotaText(rotaProfile.lineStamp.eyebrow, language)}
              </p>
              <p className={`truncate text-sm font-semibold sm:text-base ${
                isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
              }`}>
                {localizeRotaText(rotaProfile.lineStamp.title, language)}
              </p>
              <p className={`mt-1 hidden text-sm leading-snug sm:block ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                {localizeRotaText(rotaProfile.lineStamp.blurb, language)}
              </p>
            </div>
          </div>
          <span className={`inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold ${
            isDark ? 'text-[#D4C07A]' : 'text-[#8A7428]'
          }`}>
            {localizeRotaText(rotaProfile.lineStamp.cta, language)}
            <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          </span>
        </motion.a>
      </div>
    </section>
  )
}
