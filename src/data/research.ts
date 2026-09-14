import type { Language, TranslationKey } from '../translations'

export type Localized<T> = T | Record<Language, T>

export interface ResearchAuthor {
  name: string
  highlight?: boolean
}

export type ResearchLinkType = 'paper' | 'arxiv' | 'demo' | 'slides'

export interface ResearchLink {
  type: ResearchLinkType
  url?: string
}

export interface ResearchProject {
  id: string
  title: string
  descriptionKey: TranslationKey
  image?: string
  imageMuted?: boolean
  venue: Localized<string>
  date: string
  links: ResearchLink[]
}

export interface Publication {
  id: string
  authors: Localized<ResearchAuthor[]>
  title: Localized<string>
  venue: Localized<string>
  location: Localized<string>
  date: string
  url?: string
  arxivUrl?: string
  descriptionKey?: TranslationKey
  jsonLd?: {
    name?: string
    description: string
    datePublished: string
    about: string[]
  }
}

interface ResearchWork {
  id: string
  cardTitle: string
  publicationTitle: Localized<string>
  authors: Localized<ResearchAuthor[]>
  venue: Localized<string>
  cardVenue?: Localized<string>
  location: Localized<string>
  date: string
  image?: string
  imageMuted?: boolean
  descriptionKey: TranslationKey
  url?: string
  arxivUrl?: string
  extraLinks?: ResearchLink[]
  jsonLd?: Publication['jsonLd']
}

export function isLocalizedRecord<T>(value: Localized<T>): value is Record<Language, T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.hasOwnProperty.call(value, 'en') &&
    Object.prototype.hasOwnProperty.call(value, 'ja')
  )
}

export function resolveLocalized<T>(value: Localized<T>, language: Language): T {
  return isLocalizedRecord(value) ? value[language] : value
}

export function isComingSoonLink(link: ResearchLink): boolean {
  return !link.url || link.url === '#'
}

export function researchLinkLabel(
  type: ResearchLinkType,
  t: (key: TranslationKey) => string,
  comingSoon = false
): string {
  const base =
    type === 'arxiv' ? 'arXiv' : type === 'paper' ? t('paper') : type === 'demo' ? t('demo') : t('slide')

  return comingSoon ? `${base} (${t('comingSoon')})` : base
}

export const UIST_ADJUNCT_2026 = "UIST Adjunct '26"

const researchWorks: ResearchWork[] = [
  {
    id: 'agency-perception',
    cardTitle: 'Can People Distinguish Human and AI Agency in Humanoid Teleoperation?',
    publicationTitle:
      'Can People Distinguish Human and AI Agency in Humanoid Teleoperation? A Preliminary Study of Agency Perception.',
    authors: [
      { name: 'Xiang Li' },
      { name: 'Koya Dendo' },
      { name: 'Keigo Minamida', highlight: true },
      { name: 'Yuto Nakamura' },
      { name: 'Per Ola Kristensson' },
      { name: 'Jun Rekimoto' },
    ],
    venue: UIST_ADJUNCT_2026,
    location: 'Detroit, MI, USA',
    date: '2026.11',
    image: '/images/can_uist2026poster.png',
    descriptionKey: 'agencyPerceptionDescription',
    url: 'https://doi.org/10.1145/3830397.3841874',
    arxivUrl: 'https://arxiv.org/abs/2609.06434',
    jsonLd: {
      description:
        'A preliminary study of whether people can distinguish human and AI agency in humanoid teleoperation',
      datePublished: '2026',
      about: ['Human-Computer Interaction', 'Teleoperation', 'Humanoid Robots', 'Agency Perception'],
    },
  },
  {
    id: 'warping-the-workspace',
    cardTitle: 'Warping the Workspace',
    publicationTitle:
      'Warping the Workspace: Expanding Visual Access with Adjustable Reach Mapping for Humanoid Teleoperation.',
    authors: [
      { name: 'Keigo Minamida', highlight: true },
      { name: 'Koya Dendo' },
      { name: 'Yuto Nakamura' },
      { name: 'Jun Rekimoto' },
    ],
    venue: UIST_ADJUNCT_2026,
    location: 'Detroit, MI, USA',
    date: '2026.11',
    image: '/images/zoomable_uist2026poster.jpg',
    descriptionKey: 'warpingWorkspaceDescription',
    url: 'https://doi.org/10.1145/3830397.3841893',
    jsonLd: {
      description: 'Teleoperation in a warped space with adjustable reach mapping for humanoid robots',
      datePublished: '2026',
      about: ['Human-Computer Interaction', 'Teleoperation', 'Humanoid Robots', 'Spatial Mapping'],
    },
  },
  {
    id: 'scope-gs',
    cardTitle: 'SCOPE-GS',
    publicationTitle: {
      en: 'SCOPE-GS: Spatial Construction and Viewpoint-aware Online Updating system for Dynamic Environments via Gaussian Splatting.',
      ja: 'SCOPE-GS：Gaussian Splattingによる動的環境の視点考慮型オンライン空間構築・更新システム',
    },
    authors: {
      en: [
        { name: 'Taiyo Ozaki' },
        { name: 'Keigo Minamida', highlight: true },
        { name: 'Keiko Nakamoto' },
        { name: 'Tsubasa Ichikawa' },
        { name: 'Jun Rekimoto' },
      ],
      ja: [
        { name: '尾崎大耀' },
        { name: '南田桂吾', highlight: true },
        { name: '中本啓子' },
        { name: '市川翼' },
        { name: '暦本純一' },
      ],
    },
    venue: {
      en: 'Spatial Media Conference 2026',
      ja: '空間メディアコンファレンス2026',
    },
    location: {
      en: 'Tokyo, Japan',
      ja: '東京',
    },
    date: '2026.07',
    image: '/images/rota/portrait-bw.png',
    imageMuted: true,
    descriptionKey: 'scopeGsDescription',
    url: 'https://www.ite.or.jp/ken/paper/20260730vAPu/',
    jsonLd: {
      description: 'Online sequential updates of 3D Gaussian Splatting in dynamic environments',
      datePublished: '2026',
      about: ['Gaussian Splatting', '3D Reconstruction', 'Dynamic Environments'],
    },
  },
  {
    id: 'augmented-leap',
    cardTitle: 'Augmented Leap',
    publicationTitle: 'Augmented Leap: Human Jump Augmentation through Wearable Apparent Reduced Gravity.',
    authors: [
      { name: 'Yuto Nakamura' },
      { name: 'Keigo Minamida', highlight: true },
      { name: 'Masanobu Kanazawa' },
      { name: 'Koya Dendo' },
      { name: 'Jun Rekimoto' },
    ],
    venue: 'Augmented Humans 2026',
    location: 'Okinawa, Japan',
    date: '2026.03',
    image: '/images/augmented-leap.png',
    descriptionKey: 'augmentedLeapDescription',
    url: 'https://doi.org/10.1145/3795011.3795034',
    extraLinks: [{ type: 'demo' }],
    jsonLd: {
      description: 'Human Jump Augmentation through Wearable Apparent Reduced Gravity',
      datePublished: '2026',
      about: ['Augmented Humans', 'Wearable', 'Jump Augmentation'],
    },
  },
  {
    id: 'incremental-gaussian-splatting',
    cardTitle: 'Incremental Gaussian Splatting',
    publicationTitle:
      'Incremental Gaussian Splatting: Gradual 3D Reconstruction from a Monocular Camera Following Physical World Changes.',
    authors: [
      { name: 'Keigo Minamida', highlight: true },
      { name: 'Jun Rekimoto' },
    ],
    venue: 'SIGGRAPH Asia 2024 Posters',
    cardVenue: 'SIGGRAPH Asia 2024',
    location: 'Tokyo, Japan',
    date: '2024.12',
    image: '/images/sigasi.jpg',
    descriptionKey: 'IGSDescription',
    url: 'https://doi.org/10.1145/3681756.3697913',
    jsonLd: {
      name: 'Incremental Gaussian Splatting',
      description: 'Gradual 3D Reconstruction from a Monocular Camera Following Physical World Changes',
      datePublished: '2024',
      about: ['Computer Vision', '3D Reconstruction', 'Gaussian Splatting'],
    },
  },
  {
    id: 'recertif',
    cardTitle: 'Recertif',
    publicationTitle:
      '作業環境を評価するためのヒトとロボットの協調作業空間におけるロボットの個体特定と物体認識の統合システム',
    authors: [
      { name: '南田桂吾', highlight: true },
      { name: '大坪義一' },
    ],
    venue: '第24回計測自動制御学会システムインテグレーション部門講演会',
    cardVenue: 'SI2023',
    location: '新潟',
    date: '2023.12',
    image: '/images/Recertif.png',
    descriptionKey: 'recertifDescription',
    url: 'https://jglobal.jst.go.jp/detail?JGLOBAL_ID=202402256126174476',
    extraLinks: [
      {
        type: 'demo',
        url: 'https://www.youtube.com/watch?v=RC4FkGJv0MU',
      },
    ],
    jsonLd: {
      name: 'Recertif',
      description: "A system that shows the robot's work status simply by directing attention to the robot",
      datePublished: '2023',
      about: ['Human-Robot Interaction', 'Visual Attention', 'Robotics'],
    },
  },
  {
    id: 'fstl',
    cardTitle: 'FSTL - Forest Segmentation & Trimming Learning',
    publicationTitle: '世界モデルにおける未知の環境への転移',
    authors: [
      { name: '藤崎勇哉' },
      { name: '南田桂吾', highlight: true },
      { name: '土方祥平' },
      { name: '澤野千賀 et al.' },
    ],
    venue: '2023年度人工知能学会全国大会（第37回）',
    cardVenue: 'JSAI 2023',
    location: '福岡',
    date: '2023.06',
    image: '/images/FSTL.png',
    descriptionKey: 'fstlDescription',
    url: 'https://www.jstage.jst.go.jp/article/pjsai/JSAI2023/0/JSAI2023_1G5OS21b04/_article/-char/ja/',
    extraLinks: [
      {
        type: 'slides',
        url: 'https://www.docswell.com/s/weblab/56Y6VX-2023-10-23-111938',
      },
    ],
    jsonLd: {
      name: 'FSTL',
      description: 'Transfer to unknown environments in world models',
      datePublished: '2023',
      about: ['World Models', 'Transfer Learning', 'Machine Learning'],
    },
  },
]

function toProjectLinks(work: ResearchWork): ResearchLink[] {
  return [
    ...(work.url ? [{ type: 'paper' as const, url: work.url }] : []),
    ...(work.arxivUrl ? [{ type: 'arxiv' as const, url: work.arxivUrl }] : []),
    ...(work.extraLinks ?? []),
  ]
}

export const researchProjects: ResearchProject[] = researchWorks.map((work) => ({
  id: work.id,
  title: work.cardTitle,
  descriptionKey: work.descriptionKey,
  image: work.image,
  imageMuted: work.imageMuted,
  venue: work.cardVenue ?? work.venue,
  date: work.date,
  links: toProjectLinks(work),
}))

export const publications: Publication[] = researchWorks.map((work) => ({
  id: work.id,
  authors: work.authors,
  title: work.publicationTitle,
  venue: work.venue,
  location: work.location,
  date: work.date,
  url: work.url,
  arxivUrl: work.arxivUrl,
  descriptionKey: work.descriptionKey,
  jsonLd: work.jsonLd,
}))

export function toScholarlyArticles(personId: string) {
  return publications.flatMap((publication) => {
    if (!publication.jsonLd) return []

    const englishTitle = resolveLocalized(publication.title, 'en').replace(/\.$/, '')
    const authors = resolveLocalized(publication.authors, 'en').map((author) =>
      author.highlight
        ? { '@id': personId }
        : { '@type': 'Person' as const, name: author.name }
    )

    return [
      {
        '@type': 'ScholarlyArticle' as const,
        name: publication.jsonLd.name ?? englishTitle,
        description: publication.jsonLd.description,
        author: authors.length === 1 ? authors[0] : authors,
        publisher: resolveLocalized(publication.venue, 'en'),
        ...(publication.url ? { url: publication.url } : {}),
        ...(publication.arxivUrl ? { sameAs: publication.arxivUrl } : {}),
        datePublished: publication.jsonLd.datePublished,
        about: publication.jsonLd.about,
      },
    ]
  })
}
