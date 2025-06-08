'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { 
  Briefcase, 
  Filter, 
  Search, 
  Grid3X3, 
  List,
  Calendar,
  Award,
  TrendingUp,
  Users,
  Sparkles
} from 'lucide-react'

import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useExperienceData } from '../../hooks/useExperienceData'
import { ProfessionalExperienceCard } from '../cards/ProfessionalExperienceCard'
import { professionalDesign } from '../../utils/professional-design-system'
import { ProcessedExperience } from '../../types/experience'

const { colors, typography, spacing, borderRadius, shadows, animations } = professionalDesign

type ViewMode = 'grid' | 'list'
type FilterMode = 'all' | 'featured' | 'ongoing' | 'completed' | 'research' | 'startup' | 'exhibition'
type SortMode = 'date' | 'priority' | 'duration' | 'impact'

export function ProfessionalExperienceSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const { experiences } = useExperienceData()
  
  // ステート管理
  const [searchQuery, setSearchQuery] = useState('')
  const [filterMode, setFilterMode] = useState<FilterMode>('all')
  const [sortMode, setSortMode] = useState<SortMode>('date')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [hoveredExperience, setHoveredExperience] = useState<string | null>(null)

  // テーマカラー
  const sectionTheme = {
    background: isDark 
      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.90) 100%)'
      : 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.90) 100%)',
    textPrimary: isDark ? colors.secondary[50] : colors.secondary[900],
    textSecondary: isDark ? colors.secondary[300] : colors.secondary[600],
    textMuted: isDark ? colors.secondary[400] : colors.secondary[500],
    border: isDark ? colors.secondary[700] : colors.secondary[200],
    accent: colors.primary[500]
  }

  // フィルタリングとソート
  const filteredAndSortedExperiences = useMemo(() => {
    let filtered = experiences

    // 検索フィルター
    if (searchQuery) {
      filtered = filtered.filter(exp => 
        exp.searchableText.includes(searchQuery.toLowerCase())
      )
    }

    // カテゴリフィルター
    switch (filterMode) {
      case 'featured':
        filtered = filtered.filter(exp => exp.featured)
        break
      case 'ongoing':
        filtered = filtered.filter(exp => exp.status === 'ongoing')
        break
      case 'completed':
        filtered = filtered.filter(exp => exp.status === 'completed')
        break
      case 'research':
        filtered = filtered.filter(exp => exp.category === 'research')
        break
      case 'startup':
        filtered = filtered.filter(exp => exp.category === 'startup')
        break
      case 'exhibition':
        filtered = filtered.filter(exp => exp.category === 'exhibition')
        break
    }

    // ソート
    filtered.sort((a, b) => {
      switch (sortMode) {
        case 'date':
          return b.startDate.getTime() - a.startDate.getTime()
        case 'priority':
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case 'duration':
          return b.duration.totalMonths - a.duration.totalMonths
        case 'impact':
          const impactOrder = { transformative: 4, significant: 3, moderate: 2, supporting: 1 }
          return impactOrder[b.impactLevel] - impactOrder[a.impactLevel]
        default:
          return 0
      }
    })

    return filtered
  }, [experiences, searchQuery, filterMode, sortMode])

  // 統計情報
  const stats = useMemo(() => {
    const total = experiences.length
    const ongoing = experiences.filter(exp => exp.status === 'ongoing').length
    const completed = experiences.filter(exp => exp.status === 'completed').length
    const featured = experiences.filter(exp => exp.featured).length
    const totalMonths = experiences.reduce((sum, exp) => sum + exp.duration.totalMonths, 0)

    return { total, ongoing, completed, featured, totalMonths }
  }, [experiences])

  // フィルターオプション
  const filterOptions = [
    { key: 'all', label: 'すべて', icon: Grid3X3, count: stats.total },
    { key: 'featured', label: '注目', icon: Sparkles, count: stats.featured },
    { key: 'ongoing', label: '進行中', icon: TrendingUp, count: stats.ongoing },
    { key: 'completed', label: '完了', icon: Award, count: stats.completed },
    { key: 'research', label: '研究', icon: Briefcase, count: experiences.filter(e => e.category === 'research').length },
    { key: 'startup', label: 'スタートアップ', icon: Users, count: experiences.filter(e => e.category === 'startup').length },
    { key: 'exhibition', label: '展示', icon: Calendar, count: experiences.filter(e => e.category === 'exhibition').length }
  ] as const

  // ソートオプション
  const sortOptions = [
    { key: 'date', label: '日付順' },
    { key: 'priority', label: '優先度順' },
    { key: 'duration', label: '期間順' },
    { key: 'impact', label: 'インパクト順' }
  ] as const

  return (
    <section 
      className="relative py-16 lg:py-24 overflow-hidden"
      style={{
        background: sectionTheme.background
      }}
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 opacity-[0.02] ${
          isDark 
            ? 'bg-gradient-to-br from-blue-400 via-transparent to-purple-400' 
            : 'bg-gradient-to-br from-blue-300 via-transparent to-purple-300'
        }`} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div 
              className="p-3 rounded-2xl border"
              style={{
                backgroundColor: isDark ? colors.primary[900] : colors.primary[50],
                borderColor: isDark ? colors.primary[700] : colors.primary[200]
              }}
            >
              <Briefcase 
                className="w-8 h-8 lg:w-10 lg:h-10"
                style={{ color: sectionTheme.accent }}
              />
            </div>
            <div>
              <h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
                style={{ color: sectionTheme.textPrimary }}
              >
                {t('experience')}
              </h2>
              <div 
                className="mt-3 w-24 h-1 mx-auto rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${colors.primary[500]}, ${colors.primary[600]})`
                }}
              />
            </div>
          </div>
          
          <p 
            className="text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: sectionTheme.textSecondary }}
          >
            技術革新とクリエイティブな問題解決を通じて、人間中心のソリューションを構築しています。
          </p>
        </motion.div>

        {/* 統計情報 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: 'プロジェクト', value: stats.total, suffix: '件' },
            { label: '進行中', value: stats.ongoing, suffix: '件' },
            { label: '累計期間', value: Math.round(stats.totalMonths / 12 * 10) / 10, suffix: '年' },
            { label: '注目プロジェクト', value: stats.featured, suffix: '件' }
          ].map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border backdrop-blur-sm text-center"
              style={{
                backgroundColor: isDark ? colors.secondary[900] : colors.secondary[50],
                borderColor: sectionTheme.border
              }}
            >
              <div 
                className="text-2xl font-bold mb-1"
                style={{ color: sectionTheme.accent }}
              >
                {stat.value}{stat.suffix}
              </div>
              <div 
                className="text-sm"
                style={{ color: sectionTheme.textMuted }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* コントロールパネル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div 
            className="p-6 rounded-2xl border backdrop-blur-sm"
            style={{
              backgroundColor: isDark ? colors.secondary[900] : colors.secondary[50],
              borderColor: sectionTheme.border
            }}
          >
            {/* 検索バー */}
            <div className="relative mb-6">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: sectionTheme.textMuted }}
              />
              <input
                type="text"
                placeholder="プロジェクトを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border bg-transparent transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  borderColor: sectionTheme.border,
                  color: sectionTheme.textPrimary,
                  focusRingColor: sectionTheme.accent
                }}
              />
            </div>

            {/* フィルターとソート */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* フィルター */}
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => {
                  const Icon = option.icon
                  const isActive = filterMode === option.key
                  
                  return (
                    <button
                      key={option.key}
                      onClick={() => setFilterMode(option.key as FilterMode)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive ? 'shadow-md' : 'hover:shadow-sm'
                      }`}
                      style={{
                        backgroundColor: isActive 
                          ? sectionTheme.accent 
                          : isDark ? colors.secondary[800] : colors.secondary[100],
                        color: isActive 
                          ? colors.secondary[50] 
                          : sectionTheme.textSecondary
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      {option.label}
                      <span 
                        className="px-1.5 py-0.5 rounded text-xs"
                        style={{
                          backgroundColor: isActive 
                            ? colors.secondary[50] 
                            : isDark ? colors.secondary[700] : colors.secondary[200],
                          color: isActive 
                            ? sectionTheme.accent 
                            : sectionTheme.textMuted
                        }}
                      >
                        {option.count}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* ソートとビュー */}
              <div className="flex items-center gap-3">
                <select
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value as SortMode)}
                  className="px-3 py-2 rounded-lg border bg-transparent text-sm focus:outline-none focus:ring-2"
                  style={{
                    borderColor: sectionTheme.border,
                    color: sectionTheme.textPrimary
                  }}
                >
                  {sortOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="flex rounded-lg border overflow-hidden">
                  {(['grid', 'list'] as const).map((mode) => {
                    const Icon = mode === 'grid' ? Grid3X3 : List
                    const isActive = viewMode === mode
                    
                    return (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className="p-2 transition-all duration-200"
                        style={{
                          backgroundColor: isActive 
                            ? sectionTheme.accent 
                            : 'transparent',
                          color: isActive 
                            ? colors.secondary[50] 
                            : sectionTheme.textMuted
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 経歴カード */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${filterMode}-${sortMode}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={
              viewMode === 'grid'
                ? 'grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
                : 'space-y-6'
            }
          >
            {filteredAndSortedExperiences.map((experience, index) => (
              <ProfessionalExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                isHovered={hoveredExperience === experience.id}
                onHover={setHoveredExperience}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 結果が見つからない場合 */}
        {filteredAndSortedExperiences.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-16"
          >
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: isDark ? colors.secondary[800] : colors.secondary[100]
              }}
            >
              <Search 
                className="w-8 h-8"
                style={{ color: sectionTheme.textMuted }}
              />
            </div>
            <h3 
              className="text-xl font-semibold mb-2"
              style={{ color: sectionTheme.textPrimary }}
            >
              結果が見つかりませんでした
            </h3>
            <p 
              className="text-sm max-w-md mx-auto"
              style={{ color: sectionTheme.textSecondary }}
            >
              検索条件やフィルターを調整して、再度お試しください。
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}