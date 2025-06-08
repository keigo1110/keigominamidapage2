// === 基本的な日付インターフェース ===
export interface DatePeriod {
  start: {
    year: number
    month: number
    day?: number
  }
  end: {
    year: number
    month: number
    day?: number
  }
}

// === スキルと技術 ===
export interface Skill {
  name: string
  category: 'technical' | 'design' | 'management' | 'research' | 'communication'
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  primary?: boolean // 主要スキルかどうか
}

// === 成果・実績 ===
export interface Achievement {
  title: string
  description: string
  impact?: string // 影響やインパクトの説明
  metrics?: {
    label: string
    value: string | number
    unit?: string
  }[]
}

// === メディア添付 ===
export interface MediaAttachment {
  type: 'image' | 'video' | 'document' | 'demo'
  url: string
  title: string
  description?: string
  thumbnail?: string
}

// === コラボレーション情報 ===
export interface Collaboration {
  name: string
  role: string
  organization?: string
  avatar?: string
}

// === リンク情報（拡張） ===
export interface ExperienceLink {
  text: string
  url: string
  type: 'website' | 'demo' | 'repository' | 'publication' | 'media' | 'documentation'
  primary?: boolean // 主要リンクかどうか
  icon?: string // アイコン名
}

// === 詳細な進捗情報 ===
export interface ProgressInfo {
  completed: number // 完了割合 (0-100)
  milestones: {
    title: string
    date: Date
    completed: boolean
    description?: string
  }[]
  nextMilestone?: {
    title: string
    expectedDate: Date
    description?: string
  }
}

// === 基本経歴インターフェース ===
export interface Experience {
  // 基本情報
  id: string
  logo: string
  title: string
  position: string
  organization?: string
  location?: string
  
  // 期間
  period: DatePeriod
  
  // ステータス
  status: 'completed' | 'ongoing' | 'planned' | 'paused'
  priority: 'critical' | 'high' | 'medium' | 'low'
  
  // カテゴリとグループ
  category: 'exhibition' | 'startup' | 'research' | 'commercial' | 'academic' | 'education' | 'volunteer'
  projectGroup?: string
  tags?: string[]
  
  // 視覚的表現
  color: string
  highlight?: string
  gradient?: {
    from: string
    to: string
  }
  
  // コンテンツ
  description?: string
  shortDescription?: string
  objectives?: string[]
  
  // 成果と詳細
  achievements?: Achievement[]
  skills?: Skill[]
  technologies?: string[]
  
  // 関係者
  collaborators?: Collaboration[]
  team?: {
    size: number
    roles: string[]
  }
  
  // メディアとリンク
  links: ExperienceLink[]
  media?: MediaAttachment[]
  
  // 進捗（進行中のプロジェクト用）
  progress?: ProgressInfo
  
  // メタデータ
  featured?: boolean
  confidential?: boolean
  draft?: boolean
}

// === 処理済み経歴インターフェース ===
export interface ProcessedExperience extends Experience {
  // 計算されたフィールド
  displayDate: string
  startDate: Date
  endDate: Date
  duration: {
    years: number
    months: number
    totalMonths: number
  }
  
  // 表示用
  displayOrder: number
  isActive: boolean
  progressPercentage: number
  
  // グループ化情報
  groupInfo?: {
    groupId: string
    groupTitle: string
    position: number
    total: number
  }
  
  // 検索とフィルタリング
  searchableText: string
  primarySkills: string[]
  impactLevel: 'transformative' | 'significant' | 'moderate' | 'supporting'
}

export interface TimelineData {
  year: string
  startMonth: number
  endMonth: number
  projectCount: number
}

export interface TimelinePosition {
  startPosition: number
  duration: number
  durationInMonths: number
  isActive?: boolean
  progress?: number
  relativeCurrentPosition?: number
}

export interface ExperienceFilters {
  selectedYear: string | null
}