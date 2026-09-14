'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebookF, FaGithub } from 'react-icons/fa'
import { SiQiita } from 'react-icons/si'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { usePrefersReducedMotion } from '../portfolio-agent/usePrefersReducedMotion'
import { SocialDock } from '../SocialDock'
import { SocialLink } from '../../types'

const ease = [0.22, 1, 0.36, 1] as const

function splitGlyphs(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    return Array.from(
      new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text),
      (part) => part.segment,
    )
  }
  return Array.from(text)
}

function splitSpellUnits(text: string): string[] {
  const glyphs = splitGlyphs(text)
  if (glyphs.length <= 22) return glyphs
  return text.split(/(\s+)/).filter(Boolean)
}

function EnchantedPassage({
  text,
  className,
  delay = 0,
  reduced,
  isDark,
}: {
  text: string
  className?: string
  delay?: number
  reduced: boolean
  isDark: boolean
}) {
  const glyphs = useMemo(() => splitGlyphs(text), [text])
  const [count, setCount] = useState(reduced ? glyphs.length : 0)
  const done = count >= glyphs.length
  const visible = glyphs.slice(0, count).join('')

  useEffect(() => {
    if (reduced) {
      setCount(glyphs.length)
      return
    }

    setCount(0)
    let raf = 0
    let start: number | null = null
    const duration = 1700 + Math.min(glyphs.length, 480) * 2.4

    const wait = window.setTimeout(() => {
      const tick = (now: number) => {
        if (start == null) start = now
        const t = Math.min(1, (now - start) / duration)
        const accelerated = t * t * (1.2 - 0.2 * t)
        setCount(Math.min(glyphs.length, Math.floor(accelerated * glyphs.length)))
        if (t < 1) {
          raf = requestAnimationFrame(tick)
        } else {
          setCount(glyphs.length)
        }
      }
      raf = requestAnimationFrame(tick)
    }, delay * 1000)

    return () => {
      window.clearTimeout(wait)
      cancelAnimationFrame(raf)
    }
  }, [delay, glyphs.length, reduced, text])

  if (reduced) {
    return <p className={className}>{text}</p>
  }

  return (
    <p className={`relative ${className ?? ''}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {visible}
        <span
          className="ml-[1px] inline-block h-[0.85em] w-10 align-middle rounded-full blur-[7px] transition-opacity duration-500"
          style={{
            opacity: done || count === 0 ? 0 : isDark ? 0.55 : 0.42,
            background: isDark
              ? 'linear-gradient(90deg, transparent, rgba(212,192,122,0.95), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(184,160,74,0.85), transparent)',
            transform: 'translateY(-0.05em)',
          }}
        />
      </span>
    </p>
  )
}

function EnchantedText({
  text,
  className,
  as: Tag = 'span',
  delay = 0,
  reduced,
  href,
  target,
  rel,
}: {
  text: string
  className?: string
  as?: 'span' | 'p' | 'h1' | 'a'
  delay?: number
  reduced: boolean
  href?: string
  target?: string
  rel?: string
}) {
  const units = splitSpellUnits(text)
  const stagger = units.length > 18 ? 0.018 : units.length > 8 ? 0.038 : 0.055

  if (reduced) {
    const extra =
      Tag === 'a'
        ? { href, target, rel }
        : {}
    return (
      <Tag className={className} {...extra}>
        {text}
      </Tag>
    )
  }

  const extra =
    Tag === 'a'
      ? { href, target, rel }
      : {}

  return (
    <Tag className={className} aria-label={text} {...extra}>
      {units.map((unit, index) => {
        const space = /^\s+$/.test(unit)
        return (
          <motion.span
            key={`${unit}-${index}`}
            aria-hidden="true"
            className={space ? 'inline' : 'inline-block'}
            initial={{ opacity: 0, y: '0.35em', filter: 'blur(7px)' }}
            animate={{ opacity: 1, y: '0em', filter: 'blur(0px)' }}
            transition={{
              duration: 0.72,
              delay: delay + index * stagger,
              ease,
            }}
          >
            {unit}
          </motion.span>
        )
      })}
    </Tag>
  )
}

const TextIcon = ({ letter, className }: { letter: string; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="1em" height="1em">
    <text x="12" y="18" fontSize="20" fontWeight="800" fontFamily="'Helvetica Neue', Arial, sans-serif" textAnchor="middle">{letter}</text>
  </svg>
)
const SoraIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="1em" height="1em">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" />
  </svg>
)
const NoteIcon = ({ className }: { className?: string }) => <TextIcon letter="n" className={className} />
const ProtoPediaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 34 24" fill="currentColor" className={className} width="1em" height="1em">
    <text x="1" y="19" fontSize="18" fontWeight="800" fontFamily="'Helvetica Neue', Arial, sans-serif">P</text>
    <text x="13" y="12" fontSize="8" fontWeight="700" fontFamily="'Helvetica Neue', Arial, sans-serif">roto</text>
    <text x="13" y="21" fontSize="8" fontWeight="700" fontFamily="'Helvetica Neue', Arial, sans-serif">edia</text>
  </svg>
)

const socialLinks: SocialLink[] = [
  { icon: FaTwitter, url: 'https://twitter.com/keigominamida', style: 'default', accentClass: 'text-[#1DA1F2]' },
  { icon: FaInstagram, url: 'https://www.instagram.com/namida1110/', style: 'default', accentClass: 'text-[#E4405F]' },
  { icon: FaLinkedin, url: 'https://www.linkedin.com/in/keigominamida/', style: 'default', accentClass: 'text-[#0A66C2]' },
  { icon: FaFacebookF, url: 'https://www.facebook.com/profile.php?id=100053066043602', style: 'default', accentClass: 'text-[#1877F2]' },
  { icon: FaGithub, url: 'https://github.com/keigo1110', style: 'default', accentClass: 'text-[#8b949e]' },
  { icon: SiQiita, url: 'https://qiita.com/keigo1110', style: 'default', accentClass: 'text-[#55C500]' },
  { icon: NoteIcon, url: 'https://note.com/namida1110', style: 'default', accentClass: 'text-[#2CB696]' },
  { icon: ProtoPediaIcon, url: 'https://protopedia.net/prototyper/namida1110', style: 'default' },
  { icon: SoraIcon, url: 'https://sora.chatgpt.com/profile/namida1110', style: 'default', accentClass: 'text-[#10A37F]' },
]

function DefaultHome() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const reduced = usePrefersReducedMotion()

  const interests = [t('interest1'), t('interest2'), t('interest3'), t('interest4')]
  const statementParagraphs = t('statement').split('\n').filter(Boolean)

  // Light mode: stronger ink for body readability on warm paper
  const ink = isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
  const body = isDark ? 'text-[#D8D2C8]' : 'text-[#2A2620]'
  const muted = isDark ? 'text-[#A39E94]' : 'text-[#4A453C]'
  const softBorder = isDark ? 'border-[#2A2724]' : 'border-[#D0C8BA]'
  const goldHover = isDark ? 'hover:text-[#D4C07A]' : 'hover:text-[#8A7428]'

  const restShadow = isDark
    ? '0 22px 48px rgba(0,0,0,0.5), 0 6px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(184,160,74,0.1)'
    : '0 26px 56px rgba(28,25,22,0.14), 0 8px 18px rgba(28,25,22,0.07), 0 0 0 1px rgba(138,116,40,0.08)'
  const hoverShadow = isDark
    ? '0 32px 64px rgba(0,0,0,0.58), 0 10px 22px rgba(0,0,0,0.34), 0 0 0 1px rgba(184,160,74,0.18)'
    : '0 34px 68px rgba(28,25,22,0.18), 0 12px 24px rgba(28,25,22,0.09), 0 0 0 1px rgba(138,116,40,0.14)'

  const name = t('name')
  const roll = t('roll')
  const school = t('school')
  const lab = t('Lab')

  return (
    <section
      id="home"
      className="world-ambient relative flex min-h-screen items-center justify-center safe-area-bottom"
    >
      <div
        aria-hidden="true"
        className="hero-bloom pointer-events-none absolute left-[8%] top-[18%] h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(184,160,74,0.28), transparent 68%)'
            : 'radial-gradient(circle, rgba(184,160,74,0.22), transparent 68%)',
        }}
      />

      <div className="relative z-10 container mx-auto flex flex-col items-start gap-12 px-4 pb-24 pt-8 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:pb-28 lg:pt-10">
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.94, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={reduced ? { duration: 0 } : { duration: 1.2, ease }}
          className="w-full max-w-sm shrink-0 lg:w-[36%]"
        >
          <motion.div
            className="group relative"
            whileHover={reduced ? undefined : { y: -6 }}
            transition={{ duration: 0.45, ease }}
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-8 -bottom-5 top-[60%] -z-10 rounded-[50%] blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: isDark ? 0.8 : 0.85 }}
              transition={reduced ? { duration: 0 } : { delay: 0.7, duration: 1.1, ease }}
              style={{
                background: isDark
                  ? 'radial-gradient(ellipse at center, rgba(184,160,74,0.2), transparent 68%)'
                  : 'radial-gradient(ellipse at center, rgba(138,116,40,0.16), transparent 68%)',
              }}
            />

            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]"
              style={{ boxShadow: restShadow }}
              whileHover={reduced ? undefined : { boxShadow: hoverShadow }}
              transition={{ duration: 0.45, ease }}
            >
              <Image
                src="/images/myface.jpg"
                alt={t('profileAlt')}
                fill
                sizes="(max-width: 1024px) 24rem, 36vw"
                className="object-cover object-[center_18%]"
                priority
              />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                initial={{ opacity: reduced ? 0 : 0.55 }}
                animate={{ opacity: 0 }}
                transition={reduced ? { duration: 0 } : { duration: 1.35, delay: 0.15, ease }}
                style={{
                  background: isDark
                    ? 'linear-gradient(160deg, rgba(212,192,122,0.35), transparent 55%)'
                    : 'linear-gradient(160deg, rgba(247,244,239,0.7), transparent 55%)',
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  boxShadow: isDark
                    ? 'inset 0 0 0 1px rgba(212,192,122,0.24)'
                    : 'inset 0 0 0 1px rgba(138,116,40,0.2)',
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="min-w-0 flex-1">
          <EnchantedText
            key={`roll-${roll}`}
            as="p"
            text={roll}
            delay={0.22}
            reduced={reduced}
            className={`mb-3 text-xs font-medium tracking-[0.18em] uppercase ${muted}`}
          />

          <EnchantedText
            key={`name-${name}`}
            as="h1"
            text={name}
            delay={0.34}
            reduced={reduced}
            className={`mb-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl ${ink}`}
          />

          <div className={`mb-8 space-y-1.5 text-base sm:text-lg ${body}`}>
            <EnchantedText
              key={`school-${school}`}
              as="a"
              text={school}
              delay={0.52}
              reduced={reduced}
              href="https://www.iii.u-tokyo.ac.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className={`block outline-none transition-colors duration-300 ${goldHover}`}
            />
            <EnchantedText
              key={`lab-${lab}`}
              as="a"
              text={lab}
              delay={0.68}
              reduced={reduced}
              href="https://ishiguro-lab.org/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block outline-none transition-colors duration-300 ${goldHover}`}
            />
          </div>

          <SocialDock links={socialLinks} reduced={reduced} />

          <div className={`mb-9 border-t pt-8 ${softBorder}`}>
            <EnchantedText
              key={`theme-${t('statementTab1')}`}
              as="p"
              text={t('statementTab1')}
              delay={1.12}
              reduced={reduced}
              className={`mb-4 text-xs font-medium tracking-[0.16em] uppercase ${muted}`}
            />
            <div className={`max-w-2xl space-y-4 text-sm leading-relaxed sm:text-[0.975rem] ${body}`}>
              {statementParagraphs.map((paragraph) => (
                <EnchantedPassage
                  key={paragraph.slice(0, 24)}
                  text={paragraph}
                  delay={1.18}
                  reduced={reduced}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>

          <div>
            <EnchantedText
              key={`interests-label-${t('interests')}`}
              as="p"
              text={t('interests')}
              delay={3.35}
              reduced={reduced}
              className={`mb-3 text-xs font-medium tracking-[0.16em] uppercase ${muted}`}
            />
            <p className={`text-sm leading-relaxed sm:text-base ${ink}`}>
              {interests.map((interest, index) => (
                <span key={interest}>
                  {index > 0 && (
                    <span aria-hidden="true" className={`mx-2 ${muted}`}>
                      {' · '}
                    </span>
                  )}
                  <EnchantedText
                    text={interest}
                    delay={3.48 + index * 0.1}
                    reduced={reduced}
                  />
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeSection() {
  return <DefaultHome />
}
