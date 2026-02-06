'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { TimelineChart } from './experience/TimelineChart'
import { useExperienceData } from '../../hooks/useExperienceData'

export function ExperienceSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const {
    experiences,
    timelineBounds,
    hoveredProject,
    setHoveredProject
  } = useExperienceData()

  return (
    <section id="experience" className="py-12 lg:py-20 relative overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight ${
              isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
            }`}>
              {t('experience')}
            </h2>
          </div>
          <div className={`w-20 h-0.5 mx-auto rounded-full ${
            isDark ? 'bg-[#2997FF]' : 'bg-[#0071E3]'
          }`} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`p-4 sm:p-6 lg:p-8 xl:p-10 rounded-2xl sm:rounded-3xl border ${
            isDark
              ? 'bg-[#1D1D1F] border-[#333336]'
              : 'bg-[#F5F5F7] border-[#D2D2D7]'
          }`}
        >
          <div className="relative z-10">
            <TimelineChart
              experiences={experiences}
              timelineBounds={timelineBounds}
              hoveredProject={hoveredProject}
              onProjectHover={setHoveredProject}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
