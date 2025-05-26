'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { Calendar, ChevronRight } from 'lucide-react'
import { colors } from '../../utils/refined-styles'

interface Experience {
  title: string
  role: string
  period: string
  achievements?: string[]
  current?: boolean
}

export function RefinedExperienceSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const experiences: Experience[] = [
    {
      title: t('experience1'),
      role: t('experience1Description'),
      period: t('experience1Date'),
      achievements: [
        t('experience1Link1'),
        t('experience1Link2')
      ],
      current: false
    },
    {
      title: t('experience2'),
      role: t('experience2Description'),
      period: t('experience2Date'),
      achievements: [
        t('experience2Link1'),
        t('experience2Link2'),
        t('experience2Link3'),
        t('experience2Link4'),
        t('experience2Link5')
      ],
      current: false
    },
    {
      title: t('experience3'),
      role: t('experience3Description'),
      period: t('experience3Date'),
      achievements: [
        t('experience3Link1'),
        t('experience3Link2'),
        t('experience3Link3')
      ],
      current: false
    },
    {
      title: t('experience4'),
      role: t('experience4Description'),
      period: t('experience4Date'),
      achievements: [
        t('experience4Link1'),
        t('experience4Link2'),
        t('experience4Link3')
      ],
      current: false
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="experience" className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} bg-clip-text text-transparent`}>
            {t('experience')}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Professional journey and contributions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${
            isDark ? 'bg-gray-800' : 'bg-gray-300'
          }`} />

          {/* Experience items */}
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative mb-12 last:mb-0"
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="absolute left-8 -translate-x-1/2 w-4 h-4"
              >
                <div className={`w-4 h-4 rounded-full ${
                  exp.current 
                    ? `bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]}`
                    : isDark ? 'bg-gray-700' : 'bg-gray-400'
                }`} />
                {exp.current && (
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} animate-ping`} />
                )}
              </motion.div>

              {/* Content card */}
              <div className={`ml-16 p-6 rounded-xl ${
                isDark ? 'bg-gray-900/50' : 'bg-white/70'
              } backdrop-blur-sm border ${
                isDark ? 'border-gray-800' : 'border-gray-200'
              } group hover:shadow-xl transition-all duration-300`}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className={`text-xl font-semibold mb-1 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {exp.title}
                    </h3>
                    <p className={`text-lg ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {exp.role}
                    </p>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>
                </div>

                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <motion.div
                        key={achievementIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + achievementIndex * 0.1 }}
                        className={`flex items-start gap-2 text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5 text-indigo-500" />
                        <span>{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Hover gradient */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}