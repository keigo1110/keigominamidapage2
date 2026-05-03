import type { Language } from '../translations'

export type LocalizedText = Record<Language, string>

export interface ProfileHighlight {
  id: string
  title: LocalizedText
  summary: LocalizedText
  route: '/' | '/artwork' | '/startup' | '/experience'
  hash?: string
  tags: string[]
}

export const profileFacts = {
  name: {
    en: 'Keigo Minamida',
    ja: '南田桂吾',
  },
  role: {
    en: 'Doctoral student at The University of Tokyo',
    ja: '東京大学大学院の博士1年',
  },
  affiliation: {
    en: 'Graduate School of Interdisciplinary Information Studies, The University of Tokyo / Ishiguro Laboratory',
    ja: '東京大学大学院 学際情報学府 / 石黒研究室',
  },
  positioning: {
    en: 'HCI researcher and creative technologist working across human augmentation, computer vision, physical computing, editorial design, and startup practice.',
    ja: 'HCI、人間拡張、コンピュータビジョン、フィジカルコンピューティング、編集、スタートアップを横断する研究者兼クリエイティブテクノロジスト。',
  },
  coreTheme: {
    en: 'He explores editing as software: tools and interfaces that let people reinterpret and restructure information more freely.',
    ja: 'ライフテーマは「ソフトウェアとしての編集化」。人が情報をより自由に再解釈し、再構成できるツールとインターフェースを探求しています。',
  },
} as const satisfies Record<string, LocalizedText>

export const profileHighlights = [
  {
    id: 'research',
    title: {
      en: 'Research',
      ja: '研究',
    },
    summary: {
      en: 'His research connects HCI, augmented humans, robotics, and 3D reconstruction, including Incremental Gaussian Splatting and Augmented Leap.',
      ja: 'HCI、人間拡張、ロボティクス、3D再構成を接続し、Incremental Gaussian Splatting や Augmented Leap などに取り組んでいます。',
    },
    route: '/',
    hash: 'projects',
    tags: ['HCI', 'Augmented Humans', 'Computer Vision'],
  },
  {
    id: 'creative-work',
    title: {
      en: 'Creative Work',
      ja: '制作',
    },
    summary: {
      en: 'With 4ZIGEN, he builds playful physical computing works and interactive installations that turn technical ideas into tangible experiences.',
      ja: '4ZIGEN では、技術アイデアを触れる体験に変えるフィジカルコンピューティング作品やインタラクティブ作品を制作しています。',
    },
    route: '/artwork',
    tags: ['4ZIGEN', 'Physical Computing', 'Interactive Art'],
  },
  {
    id: 'startup',
    title: {
      en: 'Startup',
      ja: 'スタートアップ',
    },
    summary: {
      en: 'Through Wakabar, he applies IoT and location-based systems to bicycle safety, working toward fewer everyday traffic risks.',
      ja: 'Wakabar では、IoT と位置情報を使って自転車事故を減らすためのプロダクト開発に取り組んでいます。',
    },
    route: '/startup',
    tags: ['Wakabar', 'IoT', 'Bicycle Safety'],
  },
  {
    id: 'editorial-practice',
    title: {
      en: 'Editorial Practice',
      ja: '編集実践',
    },
    summary: {
      en: 'His editorial work, including 1000sen and ISIS Editorial School activities, gives his engineering a strong perspective on meaning, structure, and culture.',
      ja: 'センセン隊やイシス編集学校での編集実践が、意味・構造・文化を扱うエンジニアリングの視点につながっています。',
    },
    route: '/experience',
    tags: ['Editing', 'Information Design', 'Culture'],
  },
] as const satisfies readonly ProfileHighlight[]

export function localize(text: LocalizedText, language: Language): string {
  return text[language] ?? text.en
}
