import { motion } from 'framer-motion'
import { Filter, X, BarChart3, TrendingUp, Clock } from 'lucide-react'
import { useTranslation } from '../../../contexts/TranslationContext'
import { TimelineStats } from '../../../utils/experienceProcessor'

interface ExperienceFilterProps {
  availableYears: string[]
  selectedYear: string | null
  onYearSelect: (year: string | null) => void
  timelineStats: TimelineStats
  isDark: boolean
}

export function ExperienceFilter({
  availableYears,
  selectedYear,
  onYearSelect,
  timelineStats,
  isDark
}: ExperienceFilterProps) {
  const { t } = useTranslation()
  return (
    <div className={`p-6 lg:p-8 rounded-2xl border ${
      isDark
        ? 'bg-gray-900/50 border-gray-800'
        : 'bg-white/70 border-gray-200'
    } backdrop-blur-md shadow-xl`}>

      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.div
            className={`p-3 rounded-xl ${
              isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'
            }`}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Filter className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </motion.div>
          <div>
            <h3 className={`text-xl lg:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('projectAnalysis')}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('statisticsAndFiltering')}
            </p>
          </div>
        </div>

        {selectedYear && (
          <motion.button
            onClick={() => onYearSelect(null)}
            className={`p-3 rounded-xl transition-all ${
              isDark
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* 統計サマリー - 改良版 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <motion.div
          className={`p-4 lg:p-6 rounded-xl border ${
            isDark ? 'bg-gray-800/40 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('totalProjects')}
            </div>
          </div>
          <div className={`text-3xl lg:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {timelineStats.totalProjects}
          </div>
        </motion.div>

        <motion.div
          className={`p-4 lg:p-6 rounded-xl border ${
            isDark ? 'bg-blue-900/20 border-blue-800/50' : 'bg-blue-50 border-blue-200'
          }`}
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <div className={`text-xs font-medium ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              {t('ongoing')}
            </div>
          </div>
          <div className="text-3xl lg:text-4xl font-bold text-blue-500">
            {timelineStats.activeProjects}
          </div>
          {timelineStats.activeProjects > 0 && (
            <motion.div
              className="w-2 h-2 bg-blue-500 rounded-full mt-2"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>

        <motion.div
          className={`p-4 lg:p-6 rounded-xl border ${
            isDark ? 'bg-green-900/20 border-green-800/50' : 'bg-green-50 border-green-200'
          }`}
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <div className={`text-xs font-medium ${isDark ? 'text-green-300' : 'text-green-700'}`}>
              {t('completed')}
            </div>
          </div>
          <div className="text-3xl lg:text-4xl font-bold text-green-500">
            {timelineStats.completedProjects}
          </div>
          <div className={`text-xs mt-1 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
            {Math.round((timelineStats.completedProjects / timelineStats.totalProjects) * 100)}% {t('completionRate')}
          </div>
        </motion.div>

        <motion.div
          className={`p-4 lg:p-6 rounded-xl border ${
            isDark ? 'bg-gray-800/40 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('planned')}
            </div>
          </div>
          <div className="text-3xl lg:text-4xl font-bold text-gray-500">
            {timelineStats.plannedProjects}
          </div>
        </motion.div>
      </div>

      {/* 年フィルター - 改良版 */}
      <div>
        <div className={`text-base lg:text-lg font-semibold mb-4 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {t('filterByYear')}
        </div>

        <div className="flex flex-wrap gap-3">
          <motion.button
            onClick={() => onYearSelect(null)}
            className={`px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base rounded-xl transition-all font-medium ${
              !selectedYear
                ? isDark
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : isDark
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('allFilter')}
            <span className={`ml-2 text-xs ${
              !selectedYear
                ? 'text-blue-200'
                : isDark ? 'text-gray-500' : 'text-gray-500'
            }`}>
              ({timelineStats.totalProjects})
            </span>
          </motion.button>

          {availableYears.map((year) => {
            const yearData = timelineStats.yearRanges.find(r => r.year.toString() === year)
            const projectCount = yearData?.count || 0
            const isSelected = selectedYear === year
            const isCurrentYear = parseInt(year) === new Date().getFullYear()

            return (
              <motion.button
                key={year}
                onClick={() => onYearSelect(year)}
                className={`relative px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base rounded-xl transition-all font-medium ${
                  isSelected
                    ? isDark
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : isDark
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* 現在年のインジケーター */}
                {isCurrentYear && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {year}
                {projectCount > 0 && (
                  <span className={`ml-2 text-xs ${
                    isSelected
                      ? 'text-blue-200'
                      : isDark ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    ({projectCount})
                  </span>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* 選択中の年の詳細情報 - 拡張版 */}
      {selectedYear && (
        <motion.div
          className={`mt-6 p-4 lg:p-6 rounded-xl border ${
            isDark ? 'bg-blue-900/20 border-blue-800/50' : 'bg-blue-50 border-blue-200'
          }`}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${
              isDark ? 'bg-blue-800/50' : 'bg-blue-100'
            }`}>
              <BarChart3 className={`w-5 h-5 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
            </div>
            <div>
              <div className={`text-lg font-bold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                {selectedYear}{t('yearProjectAnalysis')}
              </div>
              <div className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {timelineStats.yearRanges.find(r => r.year.toString() === selectedYear)?.count || 0}{t('projectsInPeriod')}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`p-3 rounded-lg ${
              isDark ? 'bg-blue-800/30' : 'bg-blue-100/50'
            }`}>
              <div className={`text-xs font-medium mb-1 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                {t('projectsInTimeframe')}
              </div>
              <div className={`text-2xl font-bold ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
                {timelineStats.yearRanges.find(r => r.year.toString() === selectedYear)?.count || 0}
              </div>
            </div>
            <div className={`p-3 rounded-lg ${
              isDark ? 'bg-blue-800/30' : 'bg-blue-100/50'
            }`}>
              <div className={`text-xs font-medium mb-1 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                {t('overallPercentage')}
              </div>
              <div className={`text-2xl font-bold ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
                {Math.round(((timelineStats.yearRanges.find(r => r.year.toString() === selectedYear)?.count || 0) / timelineStats.totalProjects) * 100)}%
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}