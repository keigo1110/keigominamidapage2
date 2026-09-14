'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import type { ReactNode } from 'react'

interface Award {
  date: string
  content: ReactNode
  org: string
}

export function AwardsSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const linkClass = `${isDark ? 'text-[#F2EFE9] hover:text-[#D4C07A]' : 'text-[#1C1916] hover:text-[#8A7428]'} underline-offset-4 hover:underline transition-colors`

  const awards: Award[] = [
    {
      date: '2024.12',
      content: (
        <>
          <a href="https://gugen.jp/result/2024.html" className={linkClass}>
            {t('award4no1')}
          </a>
          <span className={`mx-1 ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>—</span>
          <a href="https://4zigenhp.vercel.app/" className={linkClass}>
            {t('award4no3')}
          </a>
        </>
      ),
      org: 'GUGEN2024',
    },
    {
      date: '2024.03',
      content: t('awardBestPresentation'),
      org: t('awardBestPresentationOrg'),
    },
    {
      date: '2024.03',
      content: t('awardAlumni'),
      org: t('awardAlumniOrg'),
    },
    {
      date: '2022.11',
      content: (
        <>
          <a href="https://edist.ne.jp/just/80kanmon-15ri-tokubetsusho/" className={linkClass}>
            {t('award3no1')}
          </a>
          ・
          <a href="https://edist.ne.jp/just/80kanmon-15ri-tokubetsusho/" className={linkClass}>
            {t('award3no2')}
          </a>
        </>
      ),
      org: t('awardIsisOrg'),
    },
  ]

  return (
    <section id="awards" className="world-library relative py-24 md:py-32 lg:py-40">
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
            Recognition
          </p>
          <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl ${
            isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
          }`}>
            Awards
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12"
        >
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className={`flex flex-col gap-4 border-b pb-8 md:flex-row md:items-baseline md:gap-8 ${
                isDark ? 'border-[#2A2724]' : 'border-[#E4DFD6]'
              }`}>
                <motion.div
                  className="flex-shrink-0 md:w-44"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className={`text-sm font-light ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                    {award.date}
                  </span>
                </motion.div>
                <div className="flex-1">
                  <p className={`text-base leading-relaxed ${
                    isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
                  }`}>
                    {award.content}
                  </p>
                  <p className={`mt-1 text-sm ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                    {award.org}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
