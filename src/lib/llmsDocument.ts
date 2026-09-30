import { profileFacts } from '@/data/profile'
import { publications, resolveLocalized } from '@/data/research'
import { rotaLineStampUrls, rotaProfile } from '@/data/rota'
import { SITE_URL } from '@/data/site'
import {
  WAKABAR_APP_STORE_URL,
  WAKABAR_APP_URL,
  WAKABAR_CORPORATE_URL,
} from '@/data/wakabar'
import { en } from '@/translations/en'
import { ja } from '@/translations/ja'

const pages = [
  {
    path: '/',
    en: 'Home and research projects: HCI, augmented humans, computer vision, and the life theme of editing as software.',
    ja: 'ホームと研究プロジェクト。HCI、人間拡張、コンピュータビジョン。「ソフトウェアとしての編集化」。',
  },
  {
    path: '/artwork',
    en: 'Interactive art with 4ZIGEN, including Geocussion and Protophysica, plus personal works such as LexiAtlas and kAIgi. GUGEN2024 Grand Prize.',
    ja: '4ZIGENとのインタラクティブ作品（Geocussion、Protophysica など）と個人制作（LexiAtlas、kAIgi）。GUGEN2024 大賞・ほしいね賞。',
  },
  {
    path: '/startup',
    en: 'Wakabar, a bicycle-safety startup. The iOS app alerts riders before they reach dangerous locations.',
    ja: '自転車事故を防ぐスタートアップ Wakabar。危険地点を事前に知らせる iOS アプリ。',
  },
  {
    path: '/experience',
    en: 'Publications, awards, education, and professional experience.',
    ja: '論文、受賞、学歴、経歴。',
  },
  {
    path: '/rota',
    en: 'ROTA, an original computational wizard. The name comes from the Latin rotare.',
    ja: 'オリジナルキャラクター、計算機魔法使い ROTA。名前はラテン語 rotare に由来する。',
  },
] as const

function publicationLines(): string[] {
  return publications.map((publication) => {
    const title = resolveLocalized(publication.title, 'en').replace(/\.$/, '')
    const venue = resolveLocalized(publication.venue, 'en')
    const links = [publication.url, publication.arxivUrl].filter(Boolean).join(' ')
    return `- ${title}. ${venue}, ${publication.date}. ${links}`.trim()
  })
}

export function llmsTxt(): string {
  return `# Keigo Minamida (南田桂吾)

> ${profileFacts.role.en}. ${profileFacts.positioning.en}
>
> ${profileFacts.role.ja}。${profileFacts.positioning.ja}

${profileFacts.coreTheme.en}
${profileFacts.coreTheme.ja}

Canonical site: ${SITE_URL}/
Email: mkeigo1110@gmail.com
Affiliation: ${profileFacts.affiliation.en}
所属: ${profileFacts.affiliation.ja}
Full context: ${SITE_URL}/llms-full.txt

## Pages

${pages.flatMap((page) => {
  const enUrl = page.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${page.path}`
  const jaPath = page.path === '/' ? '/ja' : `/ja${page.path}`
  return [
    `- [English](${enUrl}): ${page.en}`,
    `- [日本語](${SITE_URL}${jaPath}): ${page.ja}`,
  ]
}).join('\n')}

## Publications

${publicationLines().join('\n')}

## Profiles

- [GitHub](https://github.com/keigo1110)
- [LinkedIn](https://www.linkedin.com/in/keigominamida/)
- [X](https://twitter.com/keigominamida)
- [note](https://note.com/namida1110)
- [Qiita](https://qiita.com/keigo1110)
`
}

export function llmsFullTxt(): string {
  const research = [
    ['agencyPerceptionDescription', 'Can People Distinguish Human and AI Agency in Humanoid Teleoperation?'],
    ['warpingWorkspaceDescription', 'Warping the Workspace'],
    ['scopeGsDescription', 'SCOPE-GS'],
    ['augmentedLeapDescription', 'Augmented Leap'],
    ['IGSDescription', 'Incremental Gaussian Splatting'],
    ['recertifDescription', 'Recertif'],
    ['fstlDescription', 'FSTL'],
  ] as const

  const artworks = [1, 2, 3, 4, 5, 6, 7] as const

  return `${llmsTxt()}
## Identity

- English name: Keigo Minamida
- Japanese name: 南田桂吾
- Role: ${en.roll} / ${ja.roll}
- School: ${en.school} / ${ja.school}
- Laboratory: ${en.Lab} / ${ja.Lab}
- Life theme: ${en.statementTab1} / ${ja.statementTab1}

## Statement

${en.statement}

${ja.statement}

## Research interests

- ${en.interest1} / ${ja.interest1}
- ${en.interest2} / ${ja.interest2}
- ${en.interest3} / ${ja.interest3}
- ${en.interest4} / ${ja.interest4}

## Research projects

${research
  .map(([key, title]) => `### ${title}\n\n${en[key]}\n\n${ja[key]}`)
  .join('\n\n')}

## Artwork

${artworks
  .map((index) => {
    const title = `artwork${index}Title` as const
    const description = `artwork${index}Description` as const
    return `### ${en[title]}\n\n${en[description]}\n\n${ja[description]}`
  })
  .join('\n\n')}

### LexiAtlas

Select a word in text to retrieve dictionary definitions, thesaurus entries, translations, and etymology.
https://wordtree-one.vercel.app/

### kAIgi

${en.oProject8Description}

${ja.oProject8Description}
https://keigo1110.github.io/kAIgi-download/

## Wakabar

${en.Companyname}
${en.wakabarDescription}
${ja.wakabarDescription}
${en.startupMissionDescription}

- App Store: ${WAKABAR_APP_STORE_URL}
- App site: ${WAKABAR_APP_URL}
- Corporate site: ${WAKABAR_CORPORATE_URL}

## ROTA

${rotaProfile.eyebrow.en} / ${rotaProfile.eyebrow.ja}
${rotaProfile.lead.en}
${rotaProfile.lead.ja}
${rotaProfile.story.en}
${rotaProfile.story.ja}

- LINE stamp (ja): ${rotaLineStampUrls.ja}
- LINE stamp (en): ${rotaLineStampUrls.en}

## Awards

- ${en.award4no1} ${en.award4no2} ${en.award4no3} ${en.award4no4} / ${ja.award4no1}
- ${en.award1}
- ${en.award2}
`
}