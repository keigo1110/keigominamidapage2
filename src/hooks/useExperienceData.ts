import { useMemo, useState } from 'react'
import { getExperiences } from '../data/experiences'
import { useTranslation } from '../contexts/TranslationContext'
import { ProcessedExperience } from '../types/experience'
import {
  calculateTimelineBounds,
  calculateTimelineStats
} from '../utils/experienceProcessor'

export function useExperienceData() {
  const { t, language } = useTranslation()
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  // 基本データ取得と翻訳後処理
  const experiences: ProcessedExperience[] = useMemo(() => {
    const rawExperiences = getExperiences(t)

    // 日付フォーマットを翻訳に対応
    return rawExperiences.map(exp => {
      const period = {
        start: {
          year: exp.startDate.getFullYear(),
          month: exp.startDate.getMonth() + 1,
          day: exp.startDate.getDate()
        },
        end: {
          year: exp.endDate.getFullYear(),
          month: exp.endDate.getMonth() + 1,
          day: exp.endDate.getDate()
        }
      }

                  // 翻訳対応の日付フォーマット（シンプルで確実な方式）
      const formatLocalizedPeriod = (period: typeof period) => {
        const { start, end } = period

        // Check if we're in English mode (use language directly)
        const isEnglish = language === 'en'
        console.log(`Debug language detection: language="${language}", isEnglish=${isEnglish}`)

        // 月名の直接マッピング（翻訳キーに頼らない）
        const monthNames = {
          en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          ja: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        }

        const formatMonth = (month: number, year: number) => {
          const lang = isEnglish ? 'en' : 'ja'
          const monthName = monthNames[lang][month - 1] // month is 1-based

          if (isEnglish) {
            // English: "May 2024" format
            return `${monthName} ${year}`
          } else {
            // Japanese: "2024年5月" format
            return `${year}年${monthName}月`
          }
        }

        if (start.year === end.year && start.month === end.month) {
          return formatMonth(start.month, start.year)
        }

        const startFormatted = formatMonth(start.month, start.year)
        const endFormatted = formatMonth(end.month, end.year)
        const dateTo = isEnglish ? ' - ' : '〜'

        return `${startFormatted}${dateTo}${endFormatted}`
      }

      return {
        ...exp,
        displayDate: formatLocalizedPeriod(period)
      }
    })
  }, [t, language])

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