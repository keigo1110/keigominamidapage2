'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { StartupCard } from '../cards/StartupCard'

export function StartupSection() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  return (
    <section id="startup" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/40 via-emerald-50/60 to-green-100/50 dark:from-purple-900/40 dark:via-green-900/30 dark:to-emerald-950/60"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className={`text-5xl font-bold mb-12 text-center bg-gradient-to-r ${isDark ? 'from-green-400 to-emerald-400' : 'from-green-600 to-emerald-600'} bg-clip-text text-transparent`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t('startup')}
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <StartupCard
            name={t('Companyname')}
            description={t('wakabarDescription')}
            logo="/images/startup-logo.png"
            website="https://wakabar-cycle.com/"
          />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`${isDark ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm rounded-2xl p-8 border ${isDark ? 'border-green-500/20' : 'border-green-200/30'} shadow-lg`}
          >
            <h3 className={`text-3xl font-semibold mb-6 ${isDark ? 'text-green-400' : 'text-green-600'}`}>{t('startupMission')}</h3>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <strong>{t('startupMissionDescription')}</strong>
            </p>
            <h3 className={`text-3xl font-semibold mb-6 ${isDark ? 'text-green-400' : 'text-green-600'}`}>{t('startupAchievements')}</h3>
            <ul className="space-y-4">
              <motion.li
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className={`w-2 h-2 bg-gradient-to-r ${isDark ? 'from-green-400 to-emerald-400' : 'from-green-600 to-emerald-600'} rounded-full mt-2`} />
                <span><strong>{t('achivement1')}</strong></span>
              </motion.li>
              <motion.li
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={`w-2 h-2 bg-gradient-to-r ${isDark ? 'from-green-400 to-emerald-400' : 'from-green-600 to-emerald-600'} rounded-full mt-2`} />
                <span><strong>{t('achivement2')}</strong></span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}