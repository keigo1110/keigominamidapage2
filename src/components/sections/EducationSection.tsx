'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import type { TranslationKey } from '../../translations'

interface Education {
  period: string
  institutionKey: TranslationKey
  departmentKey: TranslationKey
  noteKey?: TranslationKey
  note2Key?: TranslationKey
  note2LinkUrl?: string
}

export function EducationSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const educations: Education[] = [
    {
      period: '2024.04 - 2026.03',
      institutionKey: 'edu1Institution',
      departmentKey: 'edu1Department',
      noteKey: 'edu1Note',
      note2Key: 'edu1WingsCfs',
      note2LinkUrl: 'https://cfs.t.u-tokyo.ac.jp/',
    },
    {
      period: '2020.04 - 2024.03',
      institutionKey: 'edu2Institution',
      departmentKey: 'edu2Department',
      noteKey: 'edu2Note',
    },
  ]

  return (
    <section id="education" className="py-24 md:py-32 lg:py-40 relative">
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
            Education
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
          {educations.map((edu, index) => (
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
                  className="flex-shrink-0"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-sm font-light text-[#86868B]">
                    {edu.period}
                  </span>
                </motion.div>
                <div className="flex-1">
                  <p className={`text-base leading-relaxed ${
                    isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                  }`}>
                    {t(edu.institutionKey)}
                  </p>
                  <p className="text-sm text-[#86868B] mt-1">
                    {t(edu.departmentKey)}
                  </p>
                  {edu.noteKey && (
                    <p className="text-sm mt-1 text-[#86868B]">
                      {t(edu.noteKey)}
                    </p>
                  )}
                  {edu.note2Key && (
                    <p className="text-sm mt-1 text-[#86868B]">
                      {edu.note2LinkUrl ? (
                        <a
                          href={edu.note2LinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#86868B] hover:underline underline-offset-2"
                        >
                          {t(edu.note2Key)}
                        </a>
                      ) : (
                        t(edu.note2Key)
                      )}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
