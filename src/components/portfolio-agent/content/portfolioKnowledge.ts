import { getExperiences } from '../../../data/experiences'
import {
  publications,
  researchProjects,
  resolveLocalized,
} from '../../../data/research'
import { rotaLineStampUrls, rotaProfile } from '../../../data/rota'
import {
  WAKABAR_APP_STORE_URL,
  WAKABAR_APP_URL,
  WAKABAR_CORPORATE_URL,
} from '../../../data/wakabar'
import {
  translations,
  type Language,
  type TranslationKey,
} from '../../../translations'
import { includesKeyword, normalizeQuery } from './retrieval'

type KnowledgeKind =
  | 'research'
  | 'experience'
  | 'artwork'
  | 'startup'
  | 'education'
  | 'award'
  | 'rota'
  | 'overview'

interface KnowledgeEntry {
  id: string
  kind: KnowledgeKind
  route: string
  title: Record<Language, string>
  summary: Record<Language, string>
  keywords: readonly string[]
}

const TOP_K = 5

const ARTWORKS: readonly {
  index: number
  year: string
  teamKey: TranslationKey
}[] = [
  { index: 1, year: '2024', teamKey: 'artworkTeam' },
  { index: 2, year: '2024', teamKey: 'artworkTeam' },
  { index: 3, year: '2024', teamKey: 'artworkTeam' },
  { index: 4, year: '2024', teamKey: 'artworkTeam' },
  { index: 5, year: '2024', teamKey: 'artworkTeam' },
  { index: 6, year: '2024', teamKey: 'artworkTeam' },
  { index: 7, year: '2024', teamKey: 'artworkTeam' },
  { index: 8, year: '2024', teamKey: 'artworkTeam' },
  { index: 9, year: '2026', teamKey: 'artwork9Team' },
]

const KIND_QUERY_BOOST: Record<KnowledgeKind, readonly string[]> = {
  research: ['research', 'paper', 'arxiv', 'hci', '研究', '論文'],
  experience: ['experience', 'career', '経歴', '師範代', '編集学校'],
  artwork: ['artwork', 'art', 'installation', '制作', '作品', 'インタラクティブ'],
  startup: ['startup', 'bicycle', 'app store', 'スタートアップ', '自転車', 'アプリ'],
  education: ['education', 'university', 'lab', 'phd', '学歴', '研究室', '博士', '東大', '近畿'],
  award: ['award', 'prize', '受賞', '大賞'],
  rota: ['rota', 'rotare', 'sticker', 'line', 'stamp', '魔法使い', 'スタンプ'],
  overview: ['recommend', 'start', 'where', 'おすすめ', 'どこから', '案内', '見れば'],
}

function text(language: Language, key: TranslationKey): string {
  return translations[language][key]
}

function both(key: TranslationKey): Record<Language, string> {
  return { en: text('en', key), ja: text('ja', key) }
}

function uniqueKeywords(...groups: Array<readonly string[] | string>): string[] {
  return [...new Set(groups.flatMap((group) => (typeof group === 'string' ? [group] : [...group])).filter(Boolean))]
}

function buildResearchEntries(): KnowledgeEntry[] {
  return researchProjects.map((project) => {
    const publication = publications.find((item) => item.id === project.id)
    const authorsEn = publication
      ? resolveLocalized(publication.authors, 'en').map((author) => author.name).join(', ')
      : ''
    const venueEn = resolveLocalized(project.venue, 'en')
    const venueJa = resolveLocalized(project.venue, 'ja')
    const titleEn = publication ? resolveLocalized(publication.title, 'en') : project.title
    const titleJa = publication ? resolveLocalized(publication.title, 'ja') : project.title
    const summary = both(project.descriptionKey)

    return {
      id: `research-${project.id}`,
      kind: 'research' as const,
      route: '/#projects',
      title: { en: project.title, ja: project.title },
      summary: {
        en: `${summary.en} ${venueEn}, ${project.date}. ${titleEn}${authorsEn ? ` Authors: ${authorsEn}.` : ''}`,
        ja: `${summary.ja} ${venueJa}（${project.date}）。${titleJa}${authorsEn ? ` 著者: ${authorsEn}。` : ''}`,
      },
      keywords: uniqueKeywords(
        project.id,
        project.title,
        titleEn,
        titleJa,
        venueEn,
        venueJa,
        authorsEn,
        project.date,
        summary.en,
        summary.ja,
        'research',
        'paper',
        '研究',
        '論文',
      ),
    }
  })
}

function buildExperienceEntries(): KnowledgeEntry[] {
  const experiencesJa = getExperiences((key) => text('ja', key), 'ja')
  const experiencesEn = getExperiences((key) => text('en', key), 'en')

  return experiencesJa.map((experience) => {
    const english = experiencesEn.find((item) => item.id === experience.id)
    const titleJa = experience.title
    const titleEn = english?.title ?? titleJa
    const roleJa = experience.position
    const roleEn = english?.position ?? roleJa
    const org = experience.organization || ''

    return {
      id: `experience-${experience.id}`,
      kind: 'experience' as const,
      route: '/experience',
      title: { en: titleEn, ja: titleJa },
      summary: {
        en: `${titleEn}. Role: ${roleEn}. ${org}. ${english?.displayDate ?? experience.displayDate}${experience.status === 'ongoing' ? ' (ongoing)' : ''}.`,
        ja: `${titleJa}。役割: ${roleJa}。${org}。${experience.displayDate}${experience.status === 'ongoing' ? '（継続中）' : ''}。`,
      },
      keywords: uniqueKeywords(
        experience.id,
        titleEn,
        titleJa,
        roleJa,
        roleEn,
        org,
        ...(experience.tags ?? []),
        'experience',
        '経歴',
      ),
    }
  })
}

function buildArtworkEntries(): KnowledgeEntry[] {
  return ARTWORKS.map((artwork) => {
    const titleKey = `artwork${artwork.index}Title` as TranslationKey
    const descriptionKey = `artwork${artwork.index}Description` as TranslationKey
    const titles = both(titleKey)
    const descriptions = both(descriptionKey)
    const team = both(artwork.teamKey)

    return {
      id: `artwork-${artwork.index}`,
      kind: 'artwork' as const,
      route: '/artwork',
      title: titles,
      summary: {
        en: `${titles.en} (${artwork.year}, ${team.en}). ${descriptions.en}`,
        ja: `${titles.ja}（${artwork.year}、${team.ja}）。${descriptions.ja}`,
      },
      keywords: uniqueKeywords(
        titles.en,
        titles.ja,
        descriptions.en,
        descriptions.ja,
        team.en,
        team.ja,
        'artwork',
        '制作',
        '4ZIGEN',
      ),
    }
  })
}

function buildStaticEntries(): KnowledgeEntry[] {
  return [
    {
      id: 'overview-first-visit',
      kind: 'overview',
      route: '/',
      title: { en: 'Where to start', ja: 'まず見る場所' },
      summary: {
        en: 'Start with research on the home page, then artwork (4ZIGEN) and Wakabar. Experience shows editorial school, 4ZIGEN, and community work.',
        ja: 'まずはホームの研究、次に制作（4ZIGEN）と Wakabar。経歴を見ると編集学校、4ZIGEN、コミュニティの仕事がつながる。',
      },
      keywords: ['recommend', 'start', 'where', 'first', 'おすすめ', 'どこから', '案内', '見る'],
    },
    {
      id: 'startup-wakabar',
      kind: 'startup',
      route: '/startup',
      title: both('Companyname'),
      summary: {
        en: `${text('en', 'Companyname')} is Keigo’s startup for location-based bicycle accident prevention. ${text('en', 'wakabarDescription')} iOS app: ${WAKABAR_APP_STORE_URL}. App site: ${WAKABAR_APP_URL}. Corporate: ${WAKABAR_CORPORATE_URL}.`,
        ja: `${text('ja', 'Companyname')} は、位置情報で自転車事故を防ぐ桂吾のスタートアップ。${text('ja', 'wakabarDescription')} iOSアプリ: ${WAKABAR_APP_STORE_URL}。アプリサイト: ${WAKABAR_APP_URL}。コーポレート: ${WAKABAR_CORPORATE_URL}。`,
      },
      keywords: ['wakabar', 'startup', 'bicycle', 'iot', 'app store', 'スタートアップ', '自転車', '事故', 'アプリ', 'ワカバ'],
    },
    {
      id: 'education-current',
      kind: 'education',
      route: '/experience',
      title: { en: 'Education', ja: '学歴' },
      summary: {
        en: `PhD year 1 at ${text('en', 'edu0Institution')}, ${text('en', 'edu0Department')}. ${text('en', 'edu0Note')}. Previously Rekimoto Lab / WINGS CFS, and Kindai University mechanical engineering.`,
        ja: `博士1年、${text('ja', 'edu0Institution')} ${text('ja', 'edu0Department')}。${text('ja', 'edu0Note')}。以前は暦本研 / WINGS CFS、学部は近畿大学理工学部機械工学科。`,
      },
      keywords: ['education', 'phd', 'tokyo', 'ishiguro', 'rekimoto', 'kindai', '学歴', '博士', '東大', '石黒', '暦本', '近畿'],
    },
    {
      id: 'award-gugen',
      kind: 'award',
      route: '/experience',
      title: { en: 'GUGEN2024 Grand Prize', ja: 'GUGEN2024 大賞' },
      summary: {
        en: '4ZIGEN won the GUGEN2024 Grand Prize and Hoshiine Award (2024.12).',
        ja: '4ZIGEN が GUGEN2024 大賞・ほしいね賞（2024.12）。',
      },
      keywords: ['gugen', 'award', 'prize', '4zigen', '受賞', '大賞', 'ほしいね'],
    },
    {
      id: 'rota-character',
      kind: 'rota',
      route: '/rota',
      title: { en: rotaProfile.name, ja: rotaProfile.name },
      summary: {
        en: `${rotaProfile.lead.en} ${rotaProfile.story.en} LINE stickers: ${rotaLineStampUrls.en}`,
        ja: `${rotaProfile.lead.ja} ${rotaProfile.story.ja} LINEスタンプ: ${rotaLineStampUrls.ja}`,
      },
      keywords: ['rota', 'rotare', 'wizard', 'sticker', 'line', 'stamp', '魔法使い', 'スタンプ', 'キャラ'],
    },
  ]
}

const KNOWLEDGE_CORPUS: readonly KnowledgeEntry[] = [
  ...buildStaticEntries(),
  ...buildResearchEntries(),
  ...buildExperienceEntries(),
  ...buildArtworkEntries(),
]

function formatCatalog(language: Language): string {
  const research = researchProjects.map((project) => project.title).join(' / ')
  const artwork = ARTWORKS.map((item) => text(language, `artwork${item.index}Title` as TranslationKey)).join(' / ')
  const experience = getExperiences((key) => text(language, key), language)
    .map((item) => item.title)
    .join(' / ')

  return [
    `Research: ${research}`,
    `Artwork: ${artwork}`,
    `Experience: ${experience}`,
    `Startup: Wakabar`,
    `Character: ROTA (/rota)`,
  ].join('\n')
}

function isUsefulKeyword(keyword: string): boolean {
  if (/[\u3040-\u30ff\u4e00-\u9faf]/.test(keyword)) return keyword.length >= 2
  return keyword.length >= 3
}

function keywordHitsQuery(query: string, keyword: string): boolean {
  if (includesKeyword(query, keyword)) return true
  if (query.length >= 4 && keyword.toLowerCase().includes(query)) return true
  return false
}

function scoreEntry(entry: KnowledgeEntry, query: string): number {
  let score = 0

  for (const keyword of entry.keywords) {
    if (!isUsefulKeyword(keyword)) continue
    if (!keywordHitsQuery(query, keyword)) continue
    score += keyword.length >= 8 ? 10 : 6
  }

  if (includesKeyword(query, entry.title.en) || includesKeyword(query, entry.title.ja)) {
    score += 18
  } else if (
    (query.length >= 4 && entry.title.en.toLowerCase().includes(query))
    || (query.length >= 2 && entry.title.ja.toLowerCase().includes(query))
  ) {
    score += 14
  }

  if (KIND_QUERY_BOOST[entry.kind].some((keyword) => keywordHitsQuery(query, keyword))) {
    score += 4
  }

  return score
}

function selectEntries(query: string): readonly KnowledgeEntry[] {
  const normalizedQuery = normalizeQuery(query)
  if (!normalizedQuery) return []

  return KNOWLEDGE_CORPUS
    .map((entry) => ({ entry, score: scoreEntry(entry, normalizedQuery) }))
    .filter((scored) => scored.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, TOP_K)
    .map((scored) => scored.entry)
}

export function formatPortfolioKnowledgeContext(language: Language, query: string): string {
  const entries = selectEntries(query)
  const formattedEntries = entries.length > 0
    ? entries
      .map((entry) => [
        `- [${entry.kind}] ${entry.title[language]}`,
        `  Fact: ${entry.summary[language]}`,
        `  Route: ${entry.route}`,
      ].join('\n'))
      .join('\n')
    : '- No specific portfolio entry matched this turn. Use the catalog names and local profile data; do not invent details.'

  return [
    'Site catalog (names only):',
    formatCatalog(language),
    '',
    `Retrieved entries: ${entries.length > 0 ? 'matched' : 'none'}`,
    formattedEntries,
  ].join('\n')
}
