'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'

export function AwardsSection() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const awards = [
    {
      content: (
        <>
          <a href="https://gugen.jp/result/2024.html" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline transition-colors`}>
            {t('award4no1')}
          </a>
          {t('award4no2')}
          <a href="https://4zigenhp.vercel.app/" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline transition-colors`}>
            {t('award4no3')}
          </a>
          {t('award4no4')}
        </>
      )
    },
    { content: t('award1') },
    { content: t('award2') },
    {
      content: (
        <>
          <a href="https://edist.ne.jp/just/80kanmon-15ri-tokubetsusho/" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline transition-colors`}>
            {t('award3no1')}
          </a>
          ・
          <a href="https://edist.ne.jp/just/80kanmon-15ri-tokubetsusho/" className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline transition-colors`}>
            {t('award3no2')}
          </a>
          {t('award3no3')}
        </>
      )
    }
  ];

  return (
    <section id="awards" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100/40 via-blue-50/60 to-slate-100/50 dark:from-slate-950/40 dark:via-blue-900/30 dark:to-slate-950/60"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className={`text-5xl font-bold mb-12 text-center bg-gradient-to-r ${isDark ? 'from-blue-400 to-blue-600' : 'from-blue-600 to-blue-800'} bg-clip-text text-transparent`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t('awards')}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className={`${isDark ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm rounded-2xl p-8 border ${isDark ? 'border-blue-500/20' : 'border-blue-200/30'} shadow-lg`}
        >
          <ul className="space-y-6">
            {awards.map((award, index) => (
              <motion.li
                key={index}
                className="flex items-start space-x-4 text-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-3 h-3 bg-gradient-to-r ${isDark ? 'from-blue-400 to-blue-600' : 'from-blue-600 to-blue-800'} rounded-full mt-2 flex-shrink-0`} />
                <div>{award.content}</div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}