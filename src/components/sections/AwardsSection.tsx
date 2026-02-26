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

  const linkClass = `${isDark ? 'text-[#F5F5F7] hover:text-[#2997FF]' : 'text-[#1D1D1F] hover:text-[#0071E3]'} underline-offset-4 hover:underline transition-colors`

  const awards: Award[] = [
    {
      date: '2024.12',
      content: (
        <>
          <a href="https://gugen.jp/result/2024.html" className={linkClass}>
            {t('award4no1')}
          </a>
          <span className="text-[#86868B] mx-1">—</span>
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
    <section id="awards" className="py-24 md:py-32 lg:py-40 relative">
      <div className="container mx-auto px-4 max-w-4xl">
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
            Awards
          </h2>
          <div className={`w-24 h-0.5 mx-auto ${isDark ? 'bg-[#333336]' : 'bg-[#D2D2D7]'}`} />
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
              <div className={`flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 pb-8 border-b ${
                isDark ? 'border-[#333336]' : 'border-[#D2D2D7]'
              }`}>
                <motion.div
                  className="flex-shrink-0 md:w-44"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-sm font-light text-[#86868B]">
                    {award.date}
                  </span>
                </motion.div>
                <div className="flex-1">
                  <p className={`text-base leading-relaxed ${
                    isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                  }`}>
                    {award.content}
                  </p>
                  <p className="text-sm text-[#86868B] mt-1">
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
