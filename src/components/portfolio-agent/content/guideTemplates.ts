import { localize, profileFacts, profileHighlights } from '../../../data/profile'
import type { ProfileHighlight } from '../../../data/profile'
import type { Language } from '../../../translations'
import {
  AGENT_SECTION_IDS,
  type AgentGuideTemplate,
  type AgentSectionId,
  type AgentSuggestionDefinition,
  type AgentText,
  type LocalizedAgentText,
  type ProfileHighlightId,
} from './types'

const highlightSuggestionLabels: Record<ProfileHighlightId, LocalizedAgentText> = {
  research: {
    en: 'See the research',
    ja: '研究を見る',
  },
  'creative-work': {
    en: 'See the creative work',
    ja: '制作を見る',
  },
  startup: {
    en: 'See Wakabar',
    ja: 'Wakabarを見る',
  },
  'editorial-practice': {
    en: 'See the editorial practice',
    ja: '編集実践を見る',
  },
}

function findProfileHighlight(id: ProfileHighlightId): ProfileHighlight {
  const highlight = profileHighlights.find((profileHighlight) => profileHighlight.id === id)

  if (!highlight) {
    throw new Error(`Missing profile highlight: ${id}`)
  }

  return highlight
}

function toSectionId(sectionId: string | undefined): AgentSectionId | undefined {
  if (!sectionId) return undefined
  return AGENT_SECTION_IDS.some((knownSectionId) => knownSectionId === sectionId)
    ? sectionId as AgentSectionId
    : undefined
}

function profileHighlightSuggestion(
  highlightId: ProfileHighlightId,
  options: Partial<Pick<AgentSuggestionDefinition, 'id' | 'animation' | 'mood'>> = {}
): AgentSuggestionDefinition {
  const highlight = findProfileHighlight(highlightId)

  return {
    id: options.id ?? `highlight-${highlightId}`,
    label: highlightSuggestionLabels[highlightId],
    description: (language) => localize(highlight.summary, language),
    targetRoute: highlight.route,
    targetHash: toSectionId(highlight.hash),
    animation: options.animation ?? 'walk',
    mood: options.mood ?? 'curious',
  }
}

function responseSuggestion(
  id: string,
  responseGuideId: string,
  label: LocalizedAgentText,
  description?: LocalizedAgentText
): AgentSuggestionDefinition {
  return {
    id,
    label,
    description,
    responseGuideId,
    animation: 'talk',
    mood: 'focused',
  }
}

const profilePitchMessage: AgentText = (language: Language) => {
  const name = localize(profileFacts.name, language)
  const role = localize(profileFacts.role, language)
  const positioning = localize(profileFacts.positioning, language)

  return language === 'ja'
    ? `${name}さんは、${role}です。${positioning}`
    : `${name} is a ${role}. ${positioning}`
}

const crossDomainMessage: AgentText = (language: Language) => {
  const coreTheme = localize(profileFacts.coreTheme, language)

  return language === 'ja'
    ? `${coreTheme} 研究、制作、起業、編集は別々ではなく、「情報や体験をどう組み替えるか」という同じ問いにつながっています。`
    : `${coreTheme} His research, creative work, startup practice, and editorial work all connect through the question of how people can restructure information and experience.`
}

const firstVisitMessage: AgentText = (language: Language) => language === 'ja'
  ? '初めてなら、まず研究プロジェクトで技術の軸を見てから、4ZIGEN と Wakabar に進むと全体像がつかみやすいです。最後に経歴を見ると、編集実践とのつながりが見えてきます。'
  : 'For a first visit, start with the research projects, then move to 4ZIGEN and Wakabar. The experience page makes the editorial background easier to connect afterward.'

// 編集したい案内文はこの配列を中心に変更してください。
// `message`, `title`, `suggestions[].label` は `ja` と `en` の両方を用意できます。
export const agentGuideTemplates: readonly AgentGuideTemplate[] = [
  {
    id: 'home-overview',
    title: (language) => localize(profileFacts.name, language),
    message: (language) => {
      const name = localize(profileFacts.name, language)
      const theme = localize(profileFacts.coreTheme, language)

      return language === 'ja'
        ? `こんにちは。${name}さんは、HCI・人間拡張・制作・編集を横断して、情報や体験を再編集するための技術を探求しています。${theme}`
        : `Hi. ${name} works across HCI, human augmentation, creative technology, and editorial practice to explore tools for re-editing information and experience. ${theme}`
    },
    route: '/',
    sectionId: 'home',
    targetRoute: '/',
    targetHash: 'projects',
    animation: 'wave',
    mood: 'friendly',
    highlightId: 'research',
    suggestions: [
      profileHighlightSuggestion('research'),
      profileHighlightSuggestion('creative-work'),
      responseSuggestion('why-cross-domain', 'cross-domain-bridge', {
        en: 'What connects these areas?',
        ja: '横断性を知りたい',
      }),
    ],
    tags: ['introduction', 'HCI', 'editing'],
  },
  {
    id: 'home-route',
    title: {
      en: 'Portfolio guide',
      ja: 'ポートフォリオ案内',
    },
    message: profilePitchMessage,
    route: '/',
    targetRoute: '/',
    targetHash: 'projects',
    animation: 'idle',
    mood: 'friendly',
    suggestions: [
      profileHighlightSuggestion('research'),
      profileHighlightSuggestion('startup'),
      responseSuggestion('first-visit-route', 'first-visit-route', {
        en: 'Where should I start?',
        ja: 'どこから見るべき？',
      }),
    ],
    tags: ['introduction'],
  },
  {
    id: 'research-projects',
    title: (language) => localize(findProfileHighlight('research').title, language),
    message: (language) => {
      const summary = localize(findProfileHighlight('research').summary, language)

      return language === 'ja'
        ? `${summary} 技術単体ではなく、人が身体や環境をどう扱えるようになるかまで見ているのが特徴です。`
        : `${summary} The throughline is not only the technique itself, but how people can act with bodies, environments, and digital representations.`
    },
    route: '/',
    sectionId: 'projects',
    targetRoute: '/',
    targetHash: 'projects',
    animation: 'talk',
    mood: 'focused',
    highlightId: 'research',
    suggestions: [
      profileHighlightSuggestion('creative-work'),
      profileHighlightSuggestion('startup'),
      profileHighlightSuggestion('editorial-practice'),
    ],
    tags: ['research', 'HCI', 'augmented humans', 'computer vision'],
  },
  {
    id: 'artwork-route',
    title: (language) => localize(findProfileHighlight('creative-work').title, language),
    message: (language) => localize(findProfileHighlight('creative-work').summary, language),
    route: '/artwork',
    targetRoute: '/artwork',
    targetHash: 'artwork',
    animation: 'walk',
    mood: 'excited',
    highlightId: 'creative-work',
    suggestions: [
      profileHighlightSuggestion('startup'),
      profileHighlightSuggestion('research'),
      responseSuggestion('creative-to-editing', 'cross-domain-bridge', {
        en: 'How does this relate to editing?',
        ja: '編集とどう関係する？',
      }),
    ],
    tags: ['creative work', '4ZIGEN'],
  },
  {
    id: 'artwork-section',
    title: {
      en: '4ZIGEN works',
      ja: '4ZIGENの制作',
    },
    message: {
      en: 'The 4ZIGEN works combine sensors, sound, materials, and embodied interaction, turning technical ideas into tangible experiences. This line of work connects to the GUGEN2024 award.',
      ja: '4ZIGEN の作品は、センサー、音、素材、身体性を組み合わせ、技術アイデアを触って理解できる体験にしています。GUGEN2024 での受賞にもつながった制作群です。',
    },
    route: '/artwork',
    sectionId: 'artwork',
    targetRoute: '/artwork',
    targetHash: 'artwork',
    animation: 'celebrate',
    mood: 'excited',
    highlightId: 'creative-work',
    suggestions: [
      profileHighlightSuggestion('startup'),
      profileHighlightSuggestion('research'),
      profileHighlightSuggestion('editorial-practice'),
    ],
    tags: ['4ZIGEN', 'physical computing', 'interactive art'],
  },
  {
    id: 'personal-works',
    title: {
      en: 'Personal works',
      ja: '個人制作',
    },
    message: {
      en: 'The personal works turn nearby problems into working tools, from room management and LiDAR visualization to timeline generation and research archives. This section shows both implementation skill and editorial structuring.',
      ja: '個人制作では、部室管理、LiDAR可視化、年表生成、研究アーカイブなど、身近な課題を動くツールに落とし込んでいます。実装力と編集的な整理力が同時に見える場所です。',
    },
    route: '/artwork',
    sectionId: 'otherProjects',
    targetRoute: '/artwork',
    targetHash: 'otherProjects',
    animation: 'think',
    mood: 'curious',
    suggestions: [
      profileHighlightSuggestion('research'),
      profileHighlightSuggestion('startup'),
      responseSuggestion('what-is-editorial-engineering', 'cross-domain-bridge', {
        en: 'Explain the throughline',
        ja: '一貫性を説明して',
      }),
    ],
    tags: ['personal work', 'tools', 'archives'],
  },
  {
    id: 'startup-route',
    title: (language) => localize(findProfileHighlight('startup').title, language),
    message: (language) => localize(findProfileHighlight('startup').summary, language),
    route: '/startup',
    targetRoute: '/startup',
    targetHash: 'startup',
    animation: 'walk',
    mood: 'focused',
    highlightId: 'startup',
    suggestions: [
      profileHighlightSuggestion('creative-work'),
      profileHighlightSuggestion('research'),
      responseSuggestion('startup-why-fit', 'startup-bridge', {
        en: 'Why does Wakabar fit him?',
        ja: 'なぜWakabarに向いている？',
      }),
    ],
    tags: ['Wakabar', 'startup', 'IoT'],
  },
  {
    id: 'startup-section',
    title: {
      en: 'Wakabar',
      ja: 'Wakabar',
    },
    message: {
      en: 'Wakabar is a product for preventing bicycle accidents by warning riders about dangerous locations in advance. It brings IoT, location data, ride history, and safety education into a practical everyday service.',
      ja: 'Wakabar は、危険地点を事前に知らせて自転車事故を防ぐプロダクトです。IoT、位置情報、走行データ、安全教育を、日常で使える形にまとめています。',
    },
    route: '/startup',
    sectionId: 'startup',
    targetRoute: '/startup',
    targetHash: 'startup',
    animation: 'talk',
    mood: 'focused',
    highlightId: 'startup',
    suggestions: [
      profileHighlightSuggestion('creative-work'),
      profileHighlightSuggestion('editorial-practice'),
      responseSuggestion('startup-why-fit-section', 'startup-bridge', {
        en: 'Connect this to his strengths',
        ja: '強みとの関係を知る',
      }),
    ],
    tags: ['Wakabar', 'bicycle safety', 'IoT'],
  },
  {
    id: 'experience-route',
    title: {
      en: 'Experience',
      ja: '経歴',
    },
    message: {
      en: 'The experience page gathers publications, awards, education, and project history. It shows the person more fully when read across research, creative work, startup practice, editing, and exhibition production.',
      ja: '経歴ページでは、出版、受賞、学歴、活動歴をまとめています。研究・制作・起業だけでなく、編集や展示運営の実践まで含めて見ると人物像が立体的になります。',
    },
    route: '/experience',
    targetRoute: '/experience',
    targetHash: 'publications',
    animation: 'idle',
    mood: 'curious',
    highlightId: 'editorial-practice',
    suggestions: [
      profileHighlightSuggestion('editorial-practice'),
      profileHighlightSuggestion('research'),
      responseSuggestion('quick-profile-pitch', 'profile-pitch', {
        en: 'Give me the short pitch',
        ja: '短く紹介して',
      }),
    ],
    tags: ['experience', 'career'],
  },
  {
    id: 'publications-section',
    title: {
      en: 'Publications',
      ja: '出版・論文',
    },
    message: {
      en: 'The publication list includes work connected to Augmented Humans 2026, SIGGRAPH Asia 2024 Posters, SI2023, and JSAI 2023. The scope spans human augmentation, 3D reconstruction, and robot work support.',
      ja: '論文では、Augmented Humans 2026、SIGGRAPH Asia 2024 Posters、SI2023、JSAI 2023 などに関連する研究成果が並んでいます。身体拡張、3D再構築、ロボット作業支援まで領域が広いです。',
    },
    route: '/experience',
    sectionId: 'publications',
    targetRoute: '/experience',
    targetHash: 'publications',
    animation: 'talk',
    mood: 'focused',
    highlightId: 'research',
    suggestions: [
      profileHighlightSuggestion('research'),
      profileHighlightSuggestion('creative-work'),
      profileHighlightSuggestion('editorial-practice'),
    ],
    tags: ['publications', 'research'],
  },
  {
    id: 'awards-section',
    title: {
      en: 'Awards',
      ja: '受賞',
    },
    message: {
      en: 'The awards include the GUGEN2024 Grand Prize and Hosii-ne Award, a Kindai University Best Presentation Award, and ISIS Editorial School awards. They show recognition across technology, presentation, and editorial practice.',
      ja: '受賞歴では、GUGEN2024 の大賞・ほしいね賞、近畿大学でのベストプレゼンテーション賞、イシス編集学校での受賞が見られます。技術、発表、編集の複数面で評価されています。',
    },
    route: '/experience',
    sectionId: 'awards',
    targetRoute: '/experience',
    targetHash: 'awards',
    animation: 'celebrate',
    mood: 'excited',
    suggestions: [
      profileHighlightSuggestion('creative-work'),
      profileHighlightSuggestion('editorial-practice'),
      profileHighlightSuggestion('research'),
    ],
    tags: ['awards', 'GUGEN2024'],
  },
  {
    id: 'education-section',
    title: {
      en: 'Education',
      ja: '学歴',
    },
    message: {
      en: 'The education section shows that he entered the doctoral program at The University of Tokyo in April 2026 and belongs to Ishiguro Laboratory, after studying in Rekimoto Laboratory during his master’s program. The path from mechanical engineering to HCI matters here.',
      ja: '学歴では、2026年4月から東京大学大学院の博士課程で石黒研究室に所属していること、修士課程では暦本研究室で学んだことが確認できます。機械工学からHCIへ広がっている流れも重要です。',
    },
    route: '/experience',
    sectionId: 'education',
    targetRoute: '/experience',
    targetHash: 'education',
    animation: 'think',
    mood: 'curious',
    suggestions: [
      profileHighlightSuggestion('research'),
      profileHighlightSuggestion('startup'),
      responseSuggestion('education-throughline', 'cross-domain-bridge', {
        en: 'What is the academic throughline?',
        ja: '学びの軸は？',
      }),
    ],
    tags: ['education', 'University of Tokyo', 'HCI'],
  },
  {
    id: 'experience-timeline-section',
    title: (language) => localize(findProfileHighlight('editorial-practice').title, language),
    message: (language) => {
      const summary = localize(findProfileHighlight('editorial-practice').summary, language)

      return language === 'ja'
        ? `${summary} タイムラインでは、4ZIGEN、東京大学制作展、センセン隊、イシス編集学校などの活動が同時期に重なっていることも見どころです。`
        : `${summary} The timeline also shows how 4ZIGEN, iii Exhibition, 1000sen, and ISIS Editorial School activities overlap across periods.`
    },
    route: '/experience',
    sectionId: 'experience',
    targetRoute: '/experience',
    targetHash: 'experience',
    animation: 'talk',
    mood: 'curious',
    highlightId: 'editorial-practice',
    suggestions: [
      profileHighlightSuggestion('research'),
      profileHighlightSuggestion('creative-work'),
      responseSuggestion('short-profile-pitch-from-timeline', 'profile-pitch', {
        en: 'Summarize him in one line',
        ja: '一言で紹介して',
      }),
    ],
    tags: ['timeline', 'editing', 'exhibition'],
  },
  {
    id: 'profile-pitch',
    title: {
      en: 'Short pitch',
      ja: '短い紹介',
    },
    message: profilePitchMessage,
    route: '/',
    targetRoute: '/',
    targetHash: 'projects',
    animation: 'wave',
    mood: 'friendly',
    suggestions: [
      profileHighlightSuggestion('research'),
      profileHighlightSuggestion('creative-work'),
      profileHighlightSuggestion('startup'),
    ],
    tags: ['pitch'],
  },
  {
    id: 'cross-domain-bridge',
    title: {
      en: 'Throughline',
      ja: '横断する軸',
    },
    message: crossDomainMessage,
    route: '/',
    targetRoute: '/experience',
    targetHash: 'experience',
    animation: 'think',
    mood: 'curious',
    suggestions: [
      profileHighlightSuggestion('research'),
      profileHighlightSuggestion('creative-work'),
      profileHighlightSuggestion('editorial-practice'),
    ],
    tags: ['throughline', 'editing'],
  },
  {
    id: 'startup-bridge',
    title: {
      en: 'Why Wakabar fits',
      ja: 'Wakabarとの相性',
    },
    message: {
      en: 'Wakabar fits because it turns technology into a usable service in everyday settings. It uses implementation skill around sensors and location data, while also relying on an editorial eye for how risks and riding experiences are communicated.',
      ja: 'Wakabar は、技術を社会の現場で使える形にする活動です。センサーや位置情報を扱う実装力に加えて、危険地点や走行体験をどう伝えるかという編集的な視点が活きています。',
    },
    route: '/startup',
    targetRoute: '/startup',
    targetHash: 'startup',
    animation: 'talk',
    mood: 'focused',
    highlightId: 'startup',
    suggestions: [
      profileHighlightSuggestion('startup'),
      profileHighlightSuggestion('creative-work'),
      profileHighlightSuggestion('editorial-practice'),
    ],
    tags: ['Wakabar', 'implementation', 'editing'],
  },
  {
    id: 'first-visit-route',
    title: {
      en: 'Suggested route',
      ja: 'おすすめの見方',
    },
    message: firstVisitMessage,
    route: '/',
    targetRoute: '/',
    targetHash: 'projects',
    animation: 'walk',
    mood: 'curious',
    suggestions: [
      profileHighlightSuggestion('research', { id: 'start-with-research' }),
      profileHighlightSuggestion('creative-work', { id: 'then-creative-work' }),
      profileHighlightSuggestion('startup', { id: 'then-startup' }),
    ],
    tags: ['navigation'],
  },
]
