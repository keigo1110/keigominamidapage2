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
      const formatLocalizedPeriod = (periodData: {
        start: { year: number; month: number; day: number }
        end: { year: number; month: number; day: number }
      }, isOngoing: boolean) => {
        const { start, end } = periodData

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

        const formatDateWithDay = (day: number, month: number, year: number) => {
          const lang = isEnglish ? 'en' : 'ja'
          const monthName = monthNames[lang][month - 1]

          if (isEnglish) {
            return `${monthName} ${day}, ${year}`
          }
          return `${year}年${monthName}月${day}日`
        }

        if (isOngoing) {
          const startFormatted = formatMonth(start.month, start.year)
          const dateTo = isEnglish ? ' - ' : '〜'
          return `${startFormatted}${dateTo}`
        }

        if (start.year === end.year && start.month === end.month && start.day === end.day) {
          return formatDateWithDay(start.day, start.month, start.year)
        }

        if (start.year === end.year && start.month === end.month) {
          return formatMonth(start.month, start.year)
        }

        const startFormatted = formatMonth(start.month, start.year)
        const endFormatted = formatMonth(end.month, end.year)
        const dateTo = isEnglish ? ' - ' : '〜'

        return `${startFormatted}${dateTo}${endFormatted}`
      }

      const isOngoing = exp.status === 'ongoing'

      return {
        ...exp,
        displayDate: formatLocalizedPeriod(period, isOngoing)
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

  // 現在フォーカス（進行中）データ
  const currentFocusItems = useMemo(() => {
    return experiences.filter(exp => exp.isActive || exp.status === 'ongoing')
  }, [experiences])

  const currentLogLines = useMemo(() => {
    return currentFocusItems.map(exp => {
      const title = exp.title || exp.organization || t('projectsLabel')
      const detail = exp.shortDescription || exp.position || exp.organization || ''
      const detailText = detail && detail !== title ? ` - ${detail}` : ''
      const trackLabel = exp.track === 'personal'
        ? t('personalTrackLabel')
        : exp.track === 'social'
          ? t('socialTrackLabel')
          : t('communityTrackLabel')
      return `[${trackLabel}] ${t('ongoingLabel')}: ${title}${detailText} (${exp.displayDate})`
    })
  }, [currentFocusItems, t])

  return {
    // データ
    experiences,
    filteredExperiences,
    timelineBounds,
    timelineStats,
    availableYears,
    currentFocusItems,
    currentLogLines,

    // 状態
    selectedYear,
    hoveredProject,

    // アクション
    setSelectedYear,
    setHoveredProject
  }
}