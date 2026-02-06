'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'

export function AwardsSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const awards = [
    {
      year: '2024',
      content: (
        <>
          <a href="https://gugen.jp/result/2024.html" className={`${isDark ? 'text-[#2997FF] hover:text-[#2997FF]/80' : 'text-[#0071E3] hover:text-[#0071E3]/80'} underline-offset-4 hover:underline transition-colors`}>
            {t('award4no1')}
          </a>
          {t('award4no2')}
          <a href="https://4zigenhp.vercel.app/" className={`${isDark ? 'text-[#2997FF] hover:text-[#2997FF]/80' : 'text-[#0071E3] hover:text-[#0071E3]/80'} underline-offset-4 hover:underline transition-colors`}>
            {t('award4no3')}
          </a>
          {t('award4no4')}
        </>
      )
    },
    {
      year: '2024',
      content: t('award1')
    },
    {
      year: '2024',
      content: t('award2')
    },
    {
      year: '2022',
      content: (
        <>
          <a href="https://edist.ne.jp/just/80kanmon-15ri-tokubetsusho/" className={`${isDark ? 'text-[#2997FF] hover:text-[#2997FF]/80' : 'text-[#0071E3] hover:text-[#0071E3]/80'} underline-offset-4 hover:underline transition-colors`}>
            {t('award3no1')}
          </a>
          ・
          <a href="https://edist.ne.jp/just/80kanmon-15ri-tokubetsusho/" className={`${isDark ? 'text-[#2997FF] hover:text-[#2997FF]/80' : 'text-[#0071E3] hover:text-[#0071E3]/80'} underline-offset-4 hover:underline transition-colors`}>
            {t('award3no2')}
          </a>
          {t('award3no3')}
        </>
      )
    }
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
            {t('awards')}
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
                  className="flex-shrink-0"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-sm font-light text-[#86868B]">
                    {award.year}
                  </span>
                </motion.div>
                <div className={`flex-1 text-base leading-relaxed ${
                  isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                }`}>
                  {award.content}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
