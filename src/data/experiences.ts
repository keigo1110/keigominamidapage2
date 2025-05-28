import { Experience, ProcessedExperience } from '../types/experience'
import { TranslationKey } from '../translations'

// === クリーンな経歴データ ===
const EXPERIENCE_DATA: Experience[] = [
  {
    id: '1000ya-future',
    logo: "/images/1000ya.png",
    title: "",
    position: "",
    period: {
      start: { year: 2025, month: 5, day: 12 },
      end: { year: 2025, month: 12, day: 31 }
    },
    color: '#FF4757',
    highlight: 'Hot Project',
    status: 'ongoing',
    projectGroup: '1000ya',
    links: [
      { text: '1000sen team', url: 'https://1000ya.isis.ne.jp/' }
    ]
  },
  {
    id: '4ZIGEN',
    logo: "/images/4ZIGEN.png",
    title: "",
    position: "",
    period: {
      start: { year: 2024, month: 5, day: 1 },
      end: { year: 2025, month: 12, day: 31 }
    },
    color: '#3B82F6',
    status: 'ongoing',
    links: [
      { text: "", url: 'https://4zigenhp.vercel.app/' }
    ]
  },
  {
    id: 'iii-exhibition',
    logo: "/images/iii.jpg",
    title: "",
    position: "",
    period: {
      start: { year: 2024, month: 4, day: 1 },
      end: { year: 2024, month: 11, day: 30 }
    },
    color: '#3B82F6',
    status: 'completed',
    links: [
      { text: "", url: 'https://www.iiiexhibition.com/' },
      { text: "", url: 'https://iii-exhibition-2024-web.vercel.app/' }
    ]
  },
  {
    id: '1000ya-2024',
    logo: "/images/1000ya.png",
    title: "",
    position: "",
    period: {
      start: { year: 2024, month: 4, day: 11 },
      end: { year: 2024, month: 8, day: 12 }
    },
    color: '#8B5CF6',
    status: 'completed',
    projectGroup: '1000ya',
    links: [
      { text: "", url: 'https://1000ya.isis.ne.jp/1850.html' },
      { text: "", url: 'https://1000ya.isis.ne.jp/1849.html' },
      { text: "", url: 'https://1000ya.isis.ne.jp/1848.html' },
      { text: "", url: 'https://1000ya.isis.ne.jp/1847.html' },
      { text: "", url: 'https://1000ya.isis.ne.jp/1846.html' }
    ]
  },
  {
    id: 'ha-project',
    logo: "/images/ha.png",
    title: "",
    position: "",
    period: {
      start: { year: 2023, month: 10, day: 14 },
      end: { year: 2024, month: 3, day: 31 }
    },
    color: '#EC4899',
    status: 'completed',
    links: [
      { text: "", url: 'https://edist.ne.jp/list/82kanmon_51ha_shusseuo/' },
      { text: "", url: 'https://edist.ne.jp/list/83kanmon_51ha_book/' },
      { text: "", url: 'https://edist.ne.jp/just/kanmon83_hyper_p-1/' }
    ]
  },
  {
    id: 'shu-project',
    logo: "/images/shu.png",
    title: "",
    position: "",
    period: {
      start: { year: 2023, month: 5, day: 7 },
      end: { year: 2023, month: 9, day: 24 }
    },
    color: '#10B981',
    status: 'completed',
    links: [
      { text: "", url: 'https://edist.ne.jp/list/81kanmon_51shu_names/' },
      { text: "", url: 'https://edist.ne.jp/list/82kanmon_51shu_book/' },
      { text: "", url: 'https://edist.ne.jp/post/51syu_ruijisoji/' }
    ]
  }
]

// === シンプルなユーティリティ関数 ===
export const DateUtils = {
  createDate(year: number, month: number, day: number = 1): Date {
    return new Date(year, month - 1, day)
  },

  formatPeriod(period: Experience['period']): string {
    const { start, end } = period
    if (start.year === end.year && start.month === end.month) {
      return `${start.year}年${start.month}月`
    }
    if (start.year === end.year) {
      return `${start.year}年${start.month}月〜${end.month}月`
    }
    return `${start.year}年${start.month}月〜${end.year}年${end.month}月`
  },

  isCurrentlyActive(start: Date, end: Date): boolean {
    const now = new Date()
    return now >= start && now <= end
  },

  getProgress(start: Date, end: Date): number {
    const now = new Date()
    if (now <= start) return 0
    if (now >= end) return 100

    const total = end.getTime() - start.getTime()
    const elapsed = now.getTime() - start.getTime()
    return Math.min(100, Math.max(0, (elapsed / total) * 100))
  },

  isOngoing(end: Date): boolean {
    const now = new Date()
    return end > now
  }
}

// === 翻訳マッピング ===
const TRANSLATION_MAPPING = {
  '1000ya-future': {
    title: 'experience5',
    position: 'experience5Description',
    links: ['experience5Link1']
  },
  '4ZIGEN': {
    title: 'experience6',
    position: 'experience6Description',
    links: ['experience6Link1']
  },
  'iii-exhibition': {
    title: 'experience1',
    position: 'experience1Description',
    links: ['experience1Link1', 'experience1Link2']
  },
  '1000ya-2024': {
    title: 'experience2',
    position: 'experience2Description',
    links: ['experience2Link1', 'experience2Link2', 'experience2Link3', 'experience2Link4', 'experience2Link5']
  },
  'ha-project': {
    title: 'experience3',
    position: 'experience3Description',
    links: ['experience3Link1', 'experience3Link2', 'experience3Link3']
  },
  'shu-project': {
    title: 'experience4',
    position: 'experience4Description',
    links: ['experience4Link1', 'experience4Link2', 'experience4Link3']
  }
} as const

// === メインデータ処理関数 ===
export function getExperiences(t: (key: TranslationKey) => string): ProcessedExperience[] {
  return EXPERIENCE_DATA.map(experience => {
    const mapping = TRANSLATION_MAPPING[experience.id as keyof typeof TRANSLATION_MAPPING]

    const startDate = DateUtils.createDate(
      experience.period.start.year,
      experience.period.start.month,
      experience.period.start.day
    )
    const endDate = DateUtils.createDate(
      experience.period.end.year,
      experience.period.end.month,
      experience.period.end.day
    )

    const processedExperience: ProcessedExperience = {
      ...experience,
      title: mapping ? t(mapping.title as TranslationKey) : experience.title,
      position: mapping ? t(mapping.position as TranslationKey) : experience.position,
      displayDate: DateUtils.formatPeriod(experience.period),
      startDate,
      endDate,
      links: experience.links.map((link, index) => ({
        ...link,
        text: mapping && mapping.links[index]
          ? t(mapping.links[index] as TranslationKey)
          : link.text || link.url
      }))
    }

    return processedExperience
  })
}