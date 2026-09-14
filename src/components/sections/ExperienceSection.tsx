'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { useTranslation } from '../../contexts/TranslationContext'
import { ExperienceTracks } from './experience/ExperienceTracks'
import { getExperiences } from '../../data/experiences'

export function ExperienceSection() {
  const { isDark } = useTheme()
  const { t, language } = useTranslation()
  const experiences = useMemo(() => getExperiences(t, language), [t, language])

  return (
    <section id="experience" className="world-library relative py-24 md:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className={`mb-2 text-xs font-medium uppercase tracking-[0.18em] ${
            isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'
          }`}>
            Path
          </p>
          <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${
            isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
          }`}>
            Experience
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <ExperienceTracks experiences={experiences} />
        </motion.div>
      </div>
    </section>
  )
}
