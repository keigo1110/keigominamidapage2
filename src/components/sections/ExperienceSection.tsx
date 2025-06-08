'use client'

import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { useTranslation } from '../../contexts/TranslationContext'

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
        {/* ヘッダー - 統一デザイン */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('experience')}
            </h2>
          </div>
          <div className={`w-20 h-1 mx-auto rounded-full ${
            isDark
              ? 'bg-gradient-to-r from-blue-400 to-blue-500'
              : 'bg-gradient-to-r from-blue-500 to-blue-600'
          }`} />
        </motion.div>

        {/* タイムラインチャート */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`p-4 sm:p-6 lg:p-8 xl:p-10 rounded-2xl sm:rounded-3xl border ${
            isDark
              ? 'bg-gray-900/80 border-gray-700/50 shadow-2xl shadow-blue-500/10'
              : 'bg-white/90 border-gray-200/50 shadow-2xl shadow-blue-500/10'
          } backdrop-blur-sm relative overflow-hidden`}
        >
          {/* 装飾的な背景グラデーション */}
          <div className={`absolute inset-0 opacity-[0.02] ${
            isDark
              ? 'bg-gradient-to-br from-blue-400 via-transparent to-purple-400'
              : 'bg-gradient-to-br from-blue-300 via-transparent to-purple-300'
          }`} />

          <div className="relative z-10">
            <TimelineChart
              experiences={experiences}
              timelineBounds={timelineBounds}
              hoveredProject={hoveredProject}
              onProjectHover={setHoveredProject}
              isDark={isDark}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

