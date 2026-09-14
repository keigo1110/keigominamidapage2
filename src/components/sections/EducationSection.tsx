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
      period: '2026.04 -',
      institutionKey: 'edu0Institution',
      departmentKey: 'edu0Department',
      noteKey: 'edu0Note',
      note2Key: 'edu0SpringGx',
      note2LinkUrl: 'https://www.cis-trans.jp/spring_gx/',
    },
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
    <section id="education" className="world-library relative py-24 md:py-32 lg:py-40">
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
            Path
          </p>
          <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl ${
            isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
          }`}>
            Education
          </h2>
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
              <div className={`flex flex-col gap-4 border-b pb-8 md:flex-row md:items-baseline md:gap-8 ${
                isDark ? 'border-[#2A2724]' : 'border-[#E4DFD6]'
              }`}>
                <motion.div
                  className="flex-shrink-0 md:w-44"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className={`text-sm font-light ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                    {edu.period}
                  </span>
                </motion.div>
                <div className="flex-1">
                  <p className={`text-base leading-relaxed ${
                    isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
                  }`}>
                    {t(edu.institutionKey)}
                  </p>
                  <p className={`mt-1 text-sm ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                    {t(edu.departmentKey)}
                  </p>
                  {edu.noteKey && (
                    <p className={`mt-1 text-sm ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                      {t(edu.noteKey)}
                    </p>
                  )}
                  {edu.note2Key && (
                    <p className={`mt-1 text-sm ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                      {edu.note2LinkUrl ? (
                        <a
                          href={edu.note2LinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`underline-offset-2 hover:underline ${
                            isDark ? 'hover:text-[#D4C07A]' : 'hover:text-[#8A7428]'
                          }`}
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
