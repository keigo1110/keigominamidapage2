'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'

export function AwardsSection() {
  const { t } = useTranslation()
  const isDark = true // ダークモード固定

  const awards = [
    {
      year: '2024',
      content: (
        <>
          <a href="https://gugen.jp/result/2024.html" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline-offset-4 hover:underline transition-colors`}>
            {t('award4no1')}
          </a>
          {t('award4no2')}
          <a href="https://4zigenhp.vercel.app/" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline-offset-4 hover:underline transition-colors`}>
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
          <a href="https://edist.ne.jp/just/80kanmon-15ri-tokubetsusho/" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline-offset-4 hover:underline transition-colors`}>
            {t('award3no1')}
          </a>
          ・
          <a href="https://edist.ne.jp/just/80kanmon-15ri-tokubetsusho/" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline-offset-4 hover:underline transition-colors`}>
            {t('award3no2')}
          </a>
          {t('award3no3')}
        </>
      )
    }
  ]

  return (
    <section id="awards" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-light mb-6 tracking-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('awards')}
          </h2>
          <div className="w-24 h-0.5 bg-gray-300 dark:bg-gray-700 mx-auto" />
        </motion.div>

        {/* Awards List */}
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
                isDark ? 'border-gray-800' : 'border-gray-200'
              }`}>
                {/* Year */}
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className={`text-sm font-light ${
                    isDark ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {award.year}
                  </span>
                </motion.div>

                {/* Content */}
                <div className={`flex-1 text-base leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
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