import { Experience, ProcessedExperience, Skill } from '../types/experience'
import { TranslationKey } from '../translations'

// === 経歴データ設定 ===
interface ExperienceConfig {
  /** プロジェクトの表示順序 (低い値ほど上に表示) */
  displayOrder: number
  /** プロジェクトカテゴリ */
  category: 'exhibition' | 'startup' | 'research' | 'commercial' | 'academic' | 'education' | 'volunteer'
  /** 重要度 (timeline での視認性に影響) */
  importance: 'high' | 'medium' | 'low'
  /** 優先度 */
  priority: 'critical' | 'high' | 'medium' | 'low'
  /** インパクトレベル */
  impactLevel: 'transformative' | 'significant' | 'moderate' | 'supporting'
  /** 注目プロジェクトかどうか */
  featured: boolean
}

// === 設定オブジェクト ===
const EXPERIENCE_CONFIGS: Record<string, ExperienceConfig> = {
  '1000ya-future': {
    displayOrder: 1,
    category: 'research',
    importance: 'high',
    priority: 'critical',
    impactLevel: 'transformative',
    featured: true
  },
  '4ZIGEN': {
    displayOrder: 2,
    category: 'startup',
    importance: 'high',
    priority: 'critical',
    impactLevel: 'significant',
    featured: true
  },
  'iii-exhibition': {
    displayOrder: 3,
    category: 'exhibition',
    importance: 'high',
    priority: 'high',
    impactLevel: 'significant',
    featured: true
  },
  '1000ya-2024': {
    displayOrder: 4,
    category: 'research',
    importance: 'medium',
    priority: 'medium',
    impactLevel: 'moderate',
    featured: false
  },
  'ha-project': {
    displayOrder: 5,
    category: 'education',
    importance: 'medium',
    priority: 'medium',
    impactLevel: 'moderate',
    featured: false
  },
  'shu-project': {
    displayOrder: 6,
    category: 'education',
    importance: 'medium',
    priority: 'low',
    impactLevel: 'supporting',
    featured: false
  }
} as const

// === 共通スキルデータ ===
const COMMON_SKILLS: Record<string, Skill[]> = {
  frontend: [
    { name: 'React', category: 'technical', proficiency: 'advanced', primary: true },
    { name: 'TypeScript', category: 'technical', proficiency: 'advanced', primary: true },
    { name: 'Next.js', category: 'technical', proficiency: 'intermediate', primary: false },
    { name: 'Tailwind CSS', category: 'design', proficiency: 'advanced', primary: false }
  ],
  backend: [
    { name: 'Node.js', category: 'technical', proficiency: 'intermediate', primary: false },
    { name: 'Python', category: 'technical', proficiency: 'advanced', primary: true },
    { name: 'FastAPI', category: 'technical', proficiency: 'intermediate', primary: false }
  ],
  design: [
    { name: 'UI/UX Design', category: 'design', proficiency: 'advanced', primary: true },
    { name: 'Figma', category: 'design', proficiency: 'advanced', primary: false },
    { name: 'Adobe Creative Suite', category: 'design', proficiency: 'intermediate', primary: false }
  ],
  research: [
    { name: 'HCI Research', category: 'research', proficiency: 'advanced', primary: true },
    { name: 'Computer Vision', category: 'research', proficiency: 'intermediate', primary: false },
    { name: 'Data Analysis', category: 'research', proficiency: 'advanced', primary: false }
  ],
  management: [
    { name: 'Project Management', category: 'management', proficiency: 'advanced', primary: true },
    { name: 'Team Leadership', category: 'management', proficiency: 'intermediate', primary: false },
    { name: 'Cross-functional Collaboration', category: 'communication', proficiency: 'advanced', primary: false }
  ],
  hardware: [
    { name: 'IoT Development', category: 'technical', proficiency: 'intermediate', primary: false },
    { name: 'Embedded Systems', category: 'technical', proficiency: 'beginner', primary: false },
    { name: 'Hardware Prototyping', category: 'technical', proficiency: 'intermediate', primary: false }
  ]
} as const

// === クリーンな経歴データ ===
const EXPERIENCE_DATA: Experience[] = [
  {
    id: '1000ya-future',
    logo: "/images/1000ya.png",
    title: "",
    position: "",
    organization: "イシス編集学校",
    location: "東京, 日本",
    period: {
      start: { year: 2025, month: 5, day: 12 },
      end: { year: 2025, month: 12, day: 31 }
    },
    color: '#3B82F6',
    gradient: {
      from: '#3B82F6',
      to: '#1E40AF'
    },
    highlight: 'Hot Project',
    status: 'ongoing',
    priority: 'critical',
    category: 'research',
    projectGroup: '1000ya',
    tags: ['編集', '図版構成', '研究', 'コンテンツ'],

    description: "松岡正剛氏が主宰する知的編集プログラムにおいて、高度な図版構成と編集技術を駆使した情報デザインプロジェクト",
    shortDescription: "情報編集と図版構成によるナレッジデザイン",
    objectives: [
      "複雑な情報を視覚的に整理し、理解しやすい形に編集",
      "多様な知識領域を横断する編集的思考の実践",
      "デジタル時代における新しい読書体験の創造"
    ],

    skills: [
      ...(COMMON_SKILLS.design || []),
      { name: '編集技術', category: 'research', proficiency: 'advanced', primary: true },
      { name: '情報設計', category: 'design', proficiency: 'advanced', primary: true },
      { name: '知識体系化', category: 'research', proficiency: 'intermediate', primary: false }
    ],

    technologies: ['Adobe InDesign', 'Figma', 'Typography', 'Information Architecture'],

    achievements: [
      {
        title: "次世代読書システム設計",
        description: "1000夜の知識を再構造化する革新的なナビゲーションシステム",
        impact: "読者の理解度と探索性を大幅に向上",
        metrics: [
          { label: "設計記事数", value: 50, unit: "記事" },
          { label: "図版作成数", value: 120, unit: "点" }
        ]
      }
    ],

    collaborators: [
      { name: "松岡正剛", role: "スーパーバイザー", organization: "イシス編集学校" },
      { name: "編集チーム", role: "コラボレーター", organization: "1000sen team" }
    ],

    links: [
      {
        text: '1000sen team',
        url: 'https://1000ya.isis.ne.jp/',
        type: 'website',
        primary: true,
        icon: 'globe'
      }
    ],

    featured: true,
    draft: false
  },
  {
    id: '4ZIGEN',
    logo: "/images/4ZIGEN.png",
    title: "",
    position: "",
    organization: "4ZIGEN チーム",
    location: "東京, 日本",
    period: {
      start: { year: 2024, month: 5, day: 1 },
      end: { year: 2025, month: 12, day: 31 }
    },
    color: '#1E40AF',
    gradient: {
      from: '#1E40AF',
      to: '#1E3A8A'
    },
    status: 'ongoing',
    priority: 'critical',
    category: 'startup',
    tags: ['ハードウェア', 'ソフトウェア', 'IoT', 'プロダクト開発'],

    description: "革新的なIoTデバイスの開発プロジェクト。ハードウェアとソフトウェアを統合した包括的なソリューション",
    shortDescription: "次世代IoTデバイスの企画・開発",
    objectives: [
      "ユーザー中心のハードウェア設計",
      "シームレスなソフトウェア統合",
      "市場ニーズに応える革新的プロダクト"
    ],

    skills: [
      ...(COMMON_SKILLS.frontend || []),
      ...(COMMON_SKILLS.hardware || []),
      ...(COMMON_SKILLS.management || []),
      { name: 'プロダクト開発', category: 'technical', proficiency: 'advanced', primary: true },
      { name: 'ハードウェア設計', category: 'technical', proficiency: 'intermediate', primary: true }
    ],

    technologies: [
      'React', 'TypeScript', 'Arduino', 'Raspberry Pi',
      '3D Printing', 'CAD Design', 'IoT Protocols', 'Mobile Development'
    ],

    achievements: [
      {
        title: "GUGEN2024 大賞受賞",
        description: "革新的なハードウェアソリューションが高く評価され、日本最大級のハードウェアコンテストで最高賞を受賞",
        impact: "技術力とイノベーション力の対外的な証明",
        metrics: [
          { label: "参加チーム数", value: 200, unit: "チーム" },
          { label: "開発期間", value: 8, unit: "ヶ月" }
        ]
      },
      {
        title: "プロトタイプ完成",
        description: "機能的なプロトタイプの設計・製作完了",
        impact: "コンセプトの実証と次段階への基盤構築"
      }
    ],

    team: {
      size: 4,
      roles: ['ハードウェアエンジニア', 'ソフトウェア開発者', 'デザイナー', 'プロジェクトマネージャー']
    },

    links: [
      {
        text: "",
        url: 'https://4zigenhp.vercel.app/',
        type: 'website',
        primary: true,
        icon: 'globe'
      }
    ],

    featured: true,
    draft: false
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
    color: '#2563EB', // 中間のブルー
    status: 'completed',
    priority: 'high',
    category: 'exhibition',
    links: [
      { text: "", url: 'https://www.iiiexhibition.com/', type: 'website', primary: true },
      { text: "", url: 'https://iii-exhibition-2024-web.vercel.app/', type: 'demo', primary: false }
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
    color: '#3B82F6', // 標準ブルー
    status: 'completed',
    priority: 'medium',
    category: 'research',
    projectGroup: '1000ya',
    links: [
      { text: "", url: 'https://1000ya.isis.ne.jp/1850.html', type: 'publication', primary: true },
      { text: "", url: 'https://1000ya.isis.ne.jp/1849.html', type: 'publication', primary: false },
      { text: "", url: 'https://1000ya.isis.ne.jp/1848.html', type: 'publication', primary: false },
      { text: "", url: 'https://1000ya.isis.ne.jp/1847.html', type: 'publication', primary: false },
      { text: "", url: 'https://1000ya.isis.ne.jp/1846.html', type: 'publication', primary: false }
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
    color: '#1D4ED8', // 深いブルー
    status: 'completed',
    priority: 'medium',
    category: 'education',
    links: [
      { text: "", url: 'https://edist.ne.jp/list/82kanmon_51ha_shusseuo/', type: 'publication', primary: true },
      { text: "", url: 'https://edist.ne.jp/list/83kanmon_51ha_book/', type: 'publication', primary: false },
      { text: "", url: 'https://edist.ne.jp/just/kanmon83_hyper_p-1/', type: 'demo', primary: false }
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
    color: '#1E3A8A', // 最も深いブルー
    status: 'completed',
    priority: 'low',
    category: 'education',
    links: [
      { text: "", url: 'https://edist.ne.jp/list/81kanmon_51shu_names/', type: 'publication', primary: true },
      { text: "", url: 'https://edist.ne.jp/list/82kanmon_51shu_book/', type: 'publication', primary: false },
      { text: "", url: 'https://edist.ne.jp/post/51syu_ruijisoji/', type: 'demo', primary: false }
    ]
  }
]

// === シンプルなユーティリティ関数 ===
export const DateUtils = {
    createDate(year: number, month: number, day: number = 1): Date {
    // タイムゾーンの影響を受けない、ローカル時間での日付作成
    const date = new Date(year, month - 1, day, 0, 0, 0, 0)
    return date
  },



  calculateDurationInMonths(start: Date, end: Date): number {
    const yearDiff = end.getFullYear() - start.getFullYear()
    const monthDiff = end.getMonth() - start.getMonth()
    return yearDiff * 12 + monthDiff
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
  },



  getRelativeTimePhrase(start: Date, end: Date): string {
    const now = new Date()
    if (now < start) {
      return '予定'
    } else if (now > end) {
      return '完了'
    } else {
      return '進行中'
    }
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
  return EXPERIENCE_DATA
    .map(experience => {
      const mapping = TRANSLATION_MAPPING[experience.id as keyof typeof TRANSLATION_MAPPING]
      const config = EXPERIENCE_CONFIGS[experience.id]

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

      // 期間計算
      const totalMonths = DateUtils.calculateDurationInMonths(startDate, endDate)
      const years = Math.floor(totalMonths / 12)
      const months = totalMonths % 12

      // 現在アクティブかどうか
      const isActive = DateUtils.isCurrentlyActive(startDate, endDate)

      // 進捗計算
      const progressPercentage = DateUtils.getProgress(startDate, endDate)

      // 検索可能テキスト生成
      const searchableText = [
        experience.title,
        experience.position,
        experience.organization,
        experience.description,
        experience.shortDescription,
        ...(experience.tags || []),
        ...(experience.technologies || []),
        ...(experience.skills?.map(s => s.name) || [])
      ].filter(Boolean).join(' ').toLowerCase()

      // プライマリスキル抽出
      const primarySkills = experience.skills?.filter(s => s.primary).map(s => s.name) || []

      const processedExperience: ProcessedExperience = {
        ...experience,

        // 翻訳されたフィールド
        title: mapping ? t(mapping.title as TranslationKey) : experience.title,
        position: mapping ? t(mapping.position as TranslationKey) : experience.position,

        // 計算されたフィールド
        displayDate: '', // useExperienceDataフックで動的に設定
        startDate,
        endDate,
        duration: {
          years,
          months,
          totalMonths
        },

        // 表示用フィールド
        displayOrder: config?.displayOrder || 999,
        isActive,
        progressPercentage,

        // 検索とフィルタリング
        searchableText,
        primarySkills,
        impactLevel: config?.impactLevel || 'supporting',

        // リンク処理
        links: experience.links.map((link, index) => ({
          ...link,
          text: mapping && mapping.links[index]
            ? t(mapping.links[index] as TranslationKey)
            : link.text || link.url
        }))
      }

      return processedExperience
    })
    .sort((a, b) => a.displayOrder - b.displayOrder) // 表示順でソート
}

// === カテゴリ別フィルタリング関数 ===
export function getExperiencesByCategory(
  t: (key: TranslationKey) => string,
  category?: string
): ProcessedExperience[] {
  const allExperiences = getExperiences(t)
  return category
    ? allExperiences.filter(exp => exp.category === category)
    : allExperiences
}

// === 重要度別フィルタリング関数 ===
export function getHighlightedExperiences(
  t: (key: TranslationKey) => string
): ProcessedExperience[] {
  return getExperiences(t).filter(exp => exp.featured === true)
}