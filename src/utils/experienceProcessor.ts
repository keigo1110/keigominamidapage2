import { ProcessedExperience } from '../types/experience'
import { DateUtils } from '../data/experiences'

export interface GroupedExperience {
  group: string
  experiences: ProcessedExperience[]
  color: string
  logo: string
}

export interface TimelineBounds {
  startDate: Date
  endDate: Date
  currentDate: Date
  totalMonths: number
}

export interface TimelineStats {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  plannedProjects: number
  yearRanges: { year: number; count: number }[]
}

export interface ProjectPosition {
  experience: ProcessedExperience
  leftPercent: number
  widthPercent: number
  progress: number
  isActive: boolean
  isOngoing: boolean
}

/**
 * タイムライン境界計算
 */
export function calculateTimelineBounds(experiences: ProcessedExperience[]): TimelineBounds {
  if (experiences.length === 0) {
    const now = new Date()
    // 日数レベルの精度で現在日を設定
    const currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    return {
      startDate: currentDay,
      endDate: currentDay,
      currentDate: currentDay,
      totalMonths: 0
    }
  }

  const dates = experiences.flatMap(exp => [exp.startDate, exp.endDate])
  const startDate = new Date(Math.min(...dates.map(d => d.getTime())))
  const endDate = new Date(Math.max(...dates.map(d => d.getTime())))

  // 現在日も日数レベルの精度で設定（時間を00:00:00に設定、タイムゾーン影響なし）
  const now = new Date()
  const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)

    // 表示用に少し余白を追加（より安全な計算）
  const displayStart = new Date(startDate)
  displayStart.setMonth(displayStart.getMonth() - 1)
  displayStart.setDate(1)

  const displayEnd = new Date(endDate)
  displayEnd.setMonth(displayEnd.getMonth() + 2)
  displayEnd.setDate(0) // 前月の最終日

  const totalMonths = Math.round(
    (displayEnd.getTime() - displayStart.getTime()) / (30.44 * 24 * 60 * 60 * 1000)
  )

  return {
    startDate: displayStart,
    endDate: displayEnd,
    currentDate,
    totalMonths
  }
}

/**
 * タイムライン統計計算
 */
export function calculateTimelineStats(experiences: ProcessedExperience[]): TimelineStats {
  const now = new Date()

  const activeProjects = experiences.filter(exp =>
    DateUtils.isCurrentlyActive(exp.startDate, exp.endDate)
  ).length

  const completedProjects = experiences.filter(exp => exp.endDate < now).length
  const plannedProjects = experiences.filter(exp => exp.startDate > now).length

  // 年ごとのプロジェクト数
  const yearCounts = new Map<number, number>()
  experiences.forEach(exp => {
    const startYear = exp.startDate.getFullYear()
    const endYear = exp.endDate.getFullYear()
    for (let year = startYear; year <= endYear; year++) {
      yearCounts.set(year, (yearCounts.get(year) || 0) + 1)
    }
  })

  const yearRanges = Array.from(yearCounts.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year)

  return {
    totalProjects: experiences.length,
    activeProjects,
    completedProjects,
    plannedProjects,
    yearRanges
  }
}

/**
 * プロジェクトのタイムライン位置計算
 */
export function calculateProjectPosition(
  experience: ProcessedExperience,
  bounds: TimelineBounds
): {
  leftPercent: number
  widthPercent: number
  progress: number
  isActive: boolean
} {
  const totalTime = bounds.endDate.getTime() - bounds.startDate.getTime()
  const projectStart = experience.startDate.getTime() - bounds.startDate.getTime()
  const projectDuration = experience.endDate.getTime() - experience.startDate.getTime()

  const leftPercent = Math.max(0, (projectStart / totalTime) * 100)
  const widthPercent = Math.max(1, (projectDuration / totalTime) * 100)

  const progress = DateUtils.getProgress(experience.startDate, experience.endDate)
  const isActive = DateUtils.isCurrentlyActive(experience.startDate, experience.endDate)



  return {
    leftPercent,
    widthPercent,
    progress,
    isActive
  }
}

/**
 * 現在時刻インジケータの位置計算
 */
export function calculateCurrentTimePosition(bounds: TimelineBounds): number {
  // ローカル時間での現在日付取得（タイムゾーン影響なし）
  const now = new Date()
  const currentDayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)

    const totalTime = bounds.endDate.getTime() - bounds.startDate.getTime()
  const currentTime = currentDayStart.getTime() - bounds.startDate.getTime()

  // 日数レベルでの正確な位置計算
  const position = Math.max(0, Math.min(100, (currentTime / totalTime) * 100))

  // 小数点以下3桁で丸める（日数レベルの高精度）
  return Math.round(position * 1000) / 1000
}

/**
 * プロジェクトのグループ化処理
 */
export function groupExperiences(experiences: ProcessedExperience[]): GroupedExperience[] {
  const groups = new Map<string, ProcessedExperience[]>()
  const individualExperiences: ProcessedExperience[] = []

  // グループ化する
  experiences.forEach(exp => {
    if (exp.projectGroup) {
      if (!groups.has(exp.projectGroup)) {
        groups.set(exp.projectGroup, [])
      }
      groups.get(exp.projectGroup)!.push(exp)
    } else {
      individualExperiences.push(exp)
    }
  })

    // グループ化されたプロジェクト
  const groupedResults: GroupedExperience[] = Array.from(groups.entries()).map(([group, exps]) => {
    // 時系列順でソート
    const sortedExps = [...exps].sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    // グループの代表色とロゴは最初のプロジェクトから取得
    const representative = sortedExps[0]

    if (!representative) {
      throw new Error(`Group ${group} has no experiences`)
    }

    return {
      group,
      experiences: sortedExps,
      color: representative.color,
      logo: representative.logo
    }
  })

  // 個別プロジェクトもGroupedExperience形式に変換
  const individualGroups: GroupedExperience[] = individualExperiences.map(exp => ({
    group: exp.id,
    experiences: [exp],
    color: exp.color,
    logo: exp.logo
  }))

  return [...groupedResults, ...individualGroups]
    .sort((a, b) => {
      // 各グループの最も早い開始日でソート
      const aEarliest = Math.min(...a.experiences.map(e => e.startDate.getTime()))
      const bEarliest = Math.min(...b.experiences.map(e => e.startDate.getTime()))
      return bEarliest - aEarliest // 新しい順
    })
}

/**
 * グループ内プロジェクトの統合位置計算
 */
export function calculateGroupProjectPositions(
  group: GroupedExperience,
  bounds: TimelineBounds
): Array<ProjectPosition> {
  return group.experiences.map(experience => {
    const position = calculateProjectPosition(experience, bounds)
    const isOngoing = DateUtils.isOngoing(experience.endDate)

    return {
      experience,
      ...position,
      isOngoing,
      // ongoing の場合は進捗表示なし
      progress: isOngoing ? 0 : position.progress
    }
  })
}