import { useMemo, useState } from 'react'
import { getExperiences } from '../data/experiences'
import { useTranslation } from '../contexts/TranslationContext'
import {
  calculateTimelineBounds,
  calculateTimelineStats
} from '../utils/experienceProcessor'

export function useExperienceData() {
  const { t } = useTranslation()
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  // 基本データ取得
  const experiences = useMemo(() => getExperiences(t), [t])

  // タイムライン境界計算
  const timelineBounds = useMemo(() =>
    calculateTimelineBounds(experiences), [experiences]
  )

  // 統計計算
  const timelineStats = useMemo(() =>
    calculateTimelineStats(experiences), [experiences]
  )

  // 年フィルター適用
  const filteredExperiences = useMemo(() => {
    if (!selectedYear) return experiences

    return experiences.filter(exp => {
      const startYear = exp.startDate.getFullYear().toString()
      const endYear = exp.endDate.getFullYear().toString()
      return startYear <= selectedYear && endYear >= selectedYear
    })
  }, [experiences, selectedYear])



  // 年リスト
  const availableYears = useMemo(() => {
    const years = new Set<string>()
    experiences.forEach(exp => {
      const startYear = exp.startDate.getFullYear()
      const endYear = exp.endDate.getFullYear()
      for (let year = startYear; year <= endYear; year++) {
        years.add(year.toString())
      }
    })
    return Array.from(years).sort()
  }, [experiences])

  return {
    // データ
    experiences,
    filteredExperiences,
    timelineBounds,
    timelineStats,
    availableYears,

    // 状態
    selectedYear,
    hoveredProject,

    // アクション
    setSelectedYear,
    setHoveredProject
  }
}