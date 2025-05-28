'use client'

import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { useTranslation } from '../../contexts/TranslationContext'
import { Briefcase } from 'lucide-react'

// 新しいコンポーネント
import { TimelineChart } from './experience/TimelineChart'

// 統合データフック
import { useExperienceData } from '../../hooks/useExperienceData'

export function ExperienceSection() {
  const { isDark } = useTheme()
  const { t } = useTranslation()

  // 統合されたデータ管理
  const {
    experiences,
    timelineBounds,
    currentTimePosition,
    hoveredProject,
    setHoveredProject
  } = useExperienceData()

  return (
    <section id="experience" className="py-12 lg:py-20 relative overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-b from-gray-900 via-gray-900/50 to-gray-900'
            : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
        }`} />
      </div>

      {/* フルワイドコンテナ */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        {/* ヘッダー - シンプル版 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Briefcase className={`w-8 h-8 lg:w-10 lg:h-10 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('experience')}
            </h2>
          </div>
        </motion.div>

        {/* タイムラインチャート */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`p-6 lg:p-8 xl:p-10 rounded-3xl border ${
            isDark
              ? 'bg-gray-900/60 border-gray-800/50'
              : 'bg-white/80 border-gray-200/50'
          } backdrop-blur-sm shadow-2xl`}
        >
          <TimelineChart
            experiences={experiences}
            timelineBounds={timelineBounds}
            currentTimePosition={currentTimePosition}
            hoveredProject={hoveredProject}
            onProjectHover={setHoveredProject}
            isDark={isDark}
          />
        </motion.div>
      </div>
    </section>
  )
}

