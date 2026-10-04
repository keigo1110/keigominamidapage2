import { toScholarlyArticles } from '@/data/research'
import {
  ORGANIZATION_ID,
  PERSON_ID,
  SITE_URL,
  WEBSITE_ID,
} from '@/data/site'
import {
  ROTA_CHARACTER_IMAGE,
  rotaLineStampUrls,
  rotaProfile,
} from '@/data/rota'
import {
  WAKABAR_APP_STORE_URL,
  WAKABAR_APP_URL,
  WAKABAR_CORPORATE_URL,
  WAKABAR_PLAY_STORE_URL,
} from '@/data/wakabar'
import { JsonLd } from './JsonLd'
import { localizedPath, type Locale } from '@/lib/locale'
import { getRequestLocale } from '@/lib/requestLocale'

function absoluteLocalized(path: string, locale: Locale) {
  const localized = localizedPath(path, locale)
  return localized === '/' ? `${SITE_URL}/` : `${SITE_URL}${localized}`
}

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList' as const,
    '@id': `${items[items.length - 1]?.path ?? SITE_URL}/#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      item: item.path,
    })),
  }
}

function webPage(options: {
  id: string
  url: string
  name: string
  description: string
  image?: string
  locale: Locale
}) {
  return {
    '@type': 'WebPage' as const,
    '@id': options.id,
    url: options.url,
    name: options.name,
    description: options.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
    primaryImageOfPage: {
      '@type': 'ImageObject' as const,
      url: options.image ?? `${SITE_URL}/images/myface.jpg`,
    },
    inLanguage: options.locale,
  }
}

const personSchema = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Keigo Minamida',
  alternateName: ['南田桂吾', 'みなみだけいご', 'けいごみなみだ'],
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/myface.jpg`,
  description:
    'Keigo Minamida (南田桂吾) is a doctoral student at The University of Tokyo specializing in Human-Computer Interaction, Augmented Humans, and Computer Vision. He is a researcher, entrepreneur, and creator of interactive art and IoT solutions including Wakabar. 南田桂吾は東京大学大学院 学際情報学府・石黒研究室の博士課程学生で、HCI・人間拡張・コンピュータビジョンを専門とする。',
  jobTitle: ['Doctoral Student', 'Researcher', 'Entrepreneur', 'Software Developer'],
  affiliation: {
    '@type': 'Organization',
    name: 'The University of Tokyo',
    url: 'https://www.iii.u-tokyo.ac.jp/',
    department: {
      '@type': 'Organization',
      name: 'Ishiguro Laboratory',
      url: 'https://ishiguro-lab.org/',
    },
  },
  alumniOf: {
    '@type': 'Organization',
    name: 'Kindai University',
    department: 'Department of Mechanical Engineering',
  },
  founderOf: { '@id': ORGANIZATION_ID },
  award: 'GUGEN2024 Grand Prize and Hosii-ne Award',
  knowsAbout: [
    'Human-computer interaction',
    'Human augmentation',
    'Augmented reality',
    'Computer vision',
    'Machine learning',
    'Software development',
    'Entrepreneurship',
  ],
  sameAs: [
    'https://twitter.com/keigominamida',
    'https://www.instagram.com/namida1110/',
    'https://www.linkedin.com/in/keigominamida/',
    'https://www.facebook.com/profile.php?id=100053066043602',
    'https://github.com/keigo1110',
    'https://qiita.com/keigo1110',
    'https://note.com/namida1110',
    'https://sora.chatgpt.com/profile/namida1110',
  ],
  email: 'mkeigo1110@gmail.com',
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Researcher',
    description:
      'Developing tools and interfaces for HCI, human augmentation, computer vision, and information editing',
  },
}

const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: 'Keigo Minamida Portfolio',
  description:
    'Portfolio of Keigo Minamida (南田桂吾) — Researcher, Entrepreneur, and Software Developer at The University of Tokyo.',
  author: { '@id': PERSON_ID },
  inLanguage: ['en', 'ja'],
}

const organizationSchema = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'Wakabar Co., Ltd.',
  description: 'Supporting safe behavior while cycling using IoT technology',
  url: WAKABAR_CORPORATE_URL,
  sameAs: [WAKABAR_APP_STORE_URL, WAKABAR_PLAY_STORE_URL, WAKABAR_APP_URL],
  founder: { '@id': PERSON_ID },
  foundingDate: '2023',
  knowsAbout: ['IoT', 'Bicycle Safety', 'Traffic Safety'],
}

const scholarlyArticles = toScholarlyArticles(PERSON_ID)

const creativeWorksSchema = [
  {
    '@type': 'CreativeWork' as const,
    '@id': `${SITE_URL}/#work-geocussion`,
    name: 'Geocussion',
    description:
      'An instrument on a sandbox that produces different sounds by hitting and pressing sand to create objects',
    creator: { '@id': PERSON_ID },
    url: 'https://geohp.vercel.app/',
    genre: 'Interactive Art',
    artform: 'Digital Installation',
  },
  {
    '@type': 'CreativeWork' as const,
    '@id': `${SITE_URL}/#work-protophysica`,
    name: 'Protophysica',
    description: 'Expanding the possibilities of creation using supercapacitors',
    creator: { '@id': PERSON_ID },
    url: 'https://protophysicahp.vercel.app/',
    genre: 'Interactive Art',
    artform: 'Physical Computing',
  },
]

export function SiteIdentityStructuredData() {
  return <JsonLd graph={[personSchema, websiteSchema, organizationSchema]} />
}

export async function HomeStructuredData() {
  const locale = await getRequestLocale()
  const home = absoluteLocalized('/', locale)
  const name = locale === 'ja'
    ? '南田桂吾 | HCI研究者・クリエイティブテクノロジスト'
    : 'Keigo Minamida | HCI Researcher & Creative Technologist'

  return (
    <JsonLd
      graph={[
        webPage({
          id: `${home}#webpage`,
          url: home,
          name,
          description:
            locale === 'ja'
              ? '南田桂吾は東京大学大学院 学際情報学府・石黒研究室の博士課程学生。HCI、人間拡張、コンピュータビジョンを研究し、インタラクティブ作品と自転車安全のスタートアップ Wakabar に取り組む。'
              : 'Keigo Minamida (南田桂吾) is a doctoral student at The University of Tokyo specializing in HCI, Augmented Humans, and Computer Vision. Researcher, entrepreneur, and creator of interactive art and IoT solutions.',
          locale,
        }),
        breadcrumb([{ name: locale === 'ja' ? 'ホーム' : 'Home', path: home }]),
        {
          '@type': 'FAQPage',
          '@id': `${home}#faq`,
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Who is Keigo Minamida?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Keigo Minamida (南田桂吾) is a doctoral student at The University of Tokyo (Ishiguro Laboratory) specializing in Human-Computer Interaction, Augmented Humans, and Computer Vision. He is a researcher, entrepreneur, and software developer. He has published at UIST Adjunct 2026, Spatial Media Conference 2026, Augmented Humans 2026, and SIGGRAPH Asia 2024, works on Wakabar (bicycle safety IoT), and creates interactive art with the 4ZIGEN team (GUGEN2024 Grand Prize).',
              },
            },
            {
              '@type': 'Question',
              name: 'What does Keigo Minamida research?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Keigo Minamida researches Human-Computer Interaction (HCI), Augmented Humans, and Computer Vision. His work includes humanoid teleoperation (agency perception and Warping the Workspace), 3D reconstruction (SCOPE-GS and Incremental Gaussian Splatting), human-robot interaction (Recertif), and real-world sensing for interactive systems.',
              },
            },
            {
              '@type': 'Question',
              name: '南田桂吾とは誰ですか？',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '南田桂吾（Keigo Minamida）は、東京大学大学院 学際情報学府・石黒研究室の博士課程学生です。専門はHCI（ヒューマン・コンピュータ・インタラクション）、人間拡張、コンピュータビジョン。研究者、起業家、ソフトウェア開発者でもあります。UIST Adjunct 2026、空間メディアコンファレンス2026、Augmented Humans 2026、SIGGRAPH Asia 2024で発表し、自転車安全のIoTスタートアップ Wakabar と、4ZIGENでのインタラクティブ作品（GUGEN2024 大賞）に取り組んでいます。',
              },
            },
            {
              '@type': 'Question',
              name: '南田桂吾の研究テーマは何ですか？',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '南田桂吾は、HCI、人間拡張、コンピュータビジョンを研究しています。ヒューマノイド遠隔操作（エージェンシー知覚、Warping the Workspace）、3D再構成（SCOPE-GS、Incremental Gaussian Splatting）、人とロボットの協働（Recertif）などに取り組んでいます。ライフテーマは「ソフトウェアとしての編集化」です。',
              },
            },
          ],
        },
        ...scholarlyArticles,
      ]}
    />
  )
}

export async function StartupStructuredData() {
  const locale = await getRequestLocale()
  const home = absoluteLocalized('/', locale)
  const page = absoluteLocalized('/startup', locale)

  return (
    <JsonLd
      graph={[
        webPage({
          id: `${page}#webpage`,
          url: page,
          name: locale === 'ja' ? 'スタートアップ | 南田桂吾' : 'Startup | Keigo Minamida',
          description:
            locale === 'ja'
              ? 'Wakabarは南田桂吾が取り組む自転車安全のスタートアップ。危険地点を事前に知らせて事故を防ぐアプリ。App Store と Google Play で公開。'
              : 'Wakabar — bicycle safety startup by Keigo Minamida. IoT and location-based alerts to prevent accidents. The apps are on the App Store and Google Play.',
          locale,
        }),
        breadcrumb([
          { name: locale === 'ja' ? 'ホーム' : 'Home', path: home },
          { name: locale === 'ja' ? 'スタートアップ' : 'Startup', path: page },
        ]),
        {
          '@type': 'SoftwareApplication',
          '@id': `${SITE_URL}/startup#app`,
          name: 'Wakabar',
          operatingSystem: 'iOS',
          applicationCategory: 'LifestyleApplication',
          description: 'Preventing bicycle accidents by alerting users to dangerous locations in advance',
          url: WAKABAR_APP_STORE_URL,
          downloadUrl: WAKABAR_APP_STORE_URL,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'JPY',
          },
          author: { '@id': ORGANIZATION_ID },
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${SITE_URL}/startup#android-app`,
          name: 'Wakabar',
          operatingSystem: 'Android',
          applicationCategory: 'LifestyleApplication',
          description: 'Preventing bicycle accidents by alerting users to dangerous locations in advance',
          url: WAKABAR_PLAY_STORE_URL,
          downloadUrl: WAKABAR_PLAY_STORE_URL,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'JPY',
          },
          author: { '@id': ORGANIZATION_ID },
        },
      ]}
    />
  )
}

export async function ExperienceStructuredData() {
  const locale = await getRequestLocale()
  const home = absoluteLocalized('/', locale)
  const page = absoluteLocalized('/experience', locale)

  return (
    <JsonLd
      graph={[
        webPage({
          id: `${page}#webpage`,
          url: page,
          name: locale === 'ja' ? '経歴 | 南田桂吾' : 'Experience | Keigo Minamida',
          description:
            locale === 'ja'
              ? '南田桂吾の論文、受賞、学歴、経歴。'
              : 'Publications, awards, education, and professional experience of Keigo Minamida.',
          locale,
        }),
        breadcrumb([
          { name: locale === 'ja' ? 'ホーム' : 'Home', path: home },
          { name: locale === 'ja' ? '経歴' : 'Experience', path: page },
        ]),
        ...scholarlyArticles,
      ]}
    />
  )
}

export async function ArtworkStructuredData() {
  const locale = await getRequestLocale()
  const home = absoluteLocalized('/', locale)
  const page = absoluteLocalized('/artwork', locale)

  return (
    <JsonLd
      graph={[
        webPage({
          id: `${page}#webpage`,
          url: page,
          name: locale === 'ja' ? '制作 | 南田桂吾' : 'Artwork | Keigo Minamida',
          description:
            locale === 'ja'
              ? '南田桂吾と4ZIGENのインタラクティブ作品、および個人制作。'
              : 'Team and personal creative projects by Keigo Minamida: 4ZIGEN interactive art, installations, and personal works.',
          locale,
        }),
        breadcrumb([
          { name: locale === 'ja' ? 'ホーム' : 'Home', path: home },
          { name: locale === 'ja' ? '制作' : 'Artwork', path: page },
        ]),
        ...creativeWorksSchema,
      ]}
    />
  )
}

export async function RotaStructuredData() {
  const locale = await getRequestLocale()
  const home = absoluteLocalized('/', locale)
  const page = absoluteLocalized('/rota', locale)

  return (
    <JsonLd
      graph={[
        webPage({
          id: `${page}#webpage`,
          url: page,
          name: 'ROTA | Keigo Minamida',
          description: rotaProfile.lead[locale],
          image: `${SITE_URL}${ROTA_CHARACTER_IMAGE}`,
          locale,
        }),
        breadcrumb([
          { name: locale === 'ja' ? 'ホーム' : 'Home', path: home },
          { name: 'ROTA', path: page },
        ]),
        {
          '@type': 'CreativeWork',
          '@id': `${SITE_URL}/rota#character`,
          name: rotaProfile.name,
          alternateName: ['計算機魔法使いROTA', 'Computational Wizard ROTA'],
          description: rotaProfile.lead.en,
          creator: { '@id': PERSON_ID },
          url: `${SITE_URL}/rota`,
          image: `${SITE_URL}${ROTA_CHARACTER_IMAGE}`,
          sameAs: [rotaLineStampUrls.ja, rotaLineStampUrls.en],
        },
      ]}
    />
  )
}
