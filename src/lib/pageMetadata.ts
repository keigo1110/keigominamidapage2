import type { Metadata } from 'next'
import type { Locale } from '@/lib/locale'
import { localizedPath } from '@/lib/locale'
import { SITE_URL } from '@/data/site'

type PageKey = 'home' | 'artwork' | 'startup' | 'experience' | 'rota'

const pages = {
  home: {
    path: '/',
    en: {
      title: 'Keigo Minamida',
      description:
        'Keigo Minamida (南田桂吾) is a doctoral student at The University of Tokyo specializing in HCI, Augmented Humans, and Computer Vision. Researcher, entrepreneur, and creator of interactive art and IoT solutions.',
    },
    ja: {
      title: '南田桂吾',
      description:
        '南田桂吾は東京大学大学院 学際情報学府・石黒研究室の博士課程学生。HCI、人間拡張、コンピュータビジョンを研究し、インタラクティブ作品と自転車安全のスタートアップ Wakabar に取り組む。',
    },
  },
  artwork: {
    path: '/artwork',
    en: {
      title: 'Artwork',
      description:
        'Team and personal creative projects by Keigo Minamida: 4ZIGEN interactive art (GUGEN2024 Grand Prize), installations, and personal works. Interactive art and digital media.',
    },
    ja: {
      title: '制作',
      description:
        '南田桂吾と4ZIGENのインタラクティブ作品（Geocussion、Protophysica など）と個人制作。GUGEN2024 大賞・ほしいね賞。',
    },
  },
  startup: {
    path: '/startup',
    en: {
      title: 'Startup',
      description:
        'Wakabar — bicycle safety startup by Keigo Minamida. IoT and location-based alerts to prevent accidents. Partner with local governments. The apps are on the App Store and Google Play.',
    },
    ja: {
      title: 'スタートアップ',
      description:
        'Wakabarは南田桂吾が取り組む自転車安全のスタートアップ。危険地点を事前に知らせて事故を防ぐアプリ。App Store と Google Play で公開。',
    },
  },
  experience: {
    path: '/experience',
    en: {
      title: 'Experience',
      description:
        'Keigo Minamida: publications (UIST Adjunct 2026, Spatial Media Conference 2026, Augmented Humans 2026, SIGGRAPH Asia 2024), awards (GUGEN2024), education (University of Tokyo, Ishiguro Laboratory, prior Rekimoto Lab work), and professional experience.',
    },
    ja: {
      title: '経歴',
      description:
        '南田桂吾の論文、受賞、学歴、経歴。UIST Adjunct 2026、空間メディアコンファレンス2026、Augmented Humans 2026、SIGGRAPH Asia 2024。',
    },
  },
  rota: {
    path: '/rota',
    en: {
      title: 'ROTA',
      description:
        'ROTA is a computational wizard by Keigo Minamida. The name comes from the Latin rotare — to rotate.',
    },
    ja: {
      title: 'ROTA',
      description:
        'ROTAは南田桂吾のオリジナルキャラクター、計算機魔法使い。名前はラテン語の rotare（回る）に由来する。',
    },
  },
} as const satisfies Record<PageKey, { path: string; en: { title: string; description: string }; ja: { title: string; description: string } }>

function absolute(path: string) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
}

export function pageMetadata(page: PageKey, locale: Locale): Metadata {
  const entry = pages[page]
  const copy = entry[locale]
  const canonical = localizedPath(entry.path, locale)
  const enPath = entry.path
  const jaPath = localizedPath(entry.path, 'ja')
  const title = page === 'home' ? { absolute: copy.title } : copy.title
  const image = page === 'rota'
    ? [{ url: '/images/rota/portrait.png', width: 960, height: 960, alt: locale === 'ja' ? '計算機魔法使い ROTA' : 'ROTA, computational wizard' }]
    : [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: locale === 'ja' ? '南田桂吾のポートフォリオ' : 'Keigo Minamida Portfolio' }]

  return {
    title,
    description: copy.description,
    ...(page === 'rota'
      ? {
          keywords: ['ROTA', '計算機魔法使い', 'computational wizard', 'Keigo Minamida', '南田桂吾', 'LINE stamp', 'LINEスタンプ'],
        }
      : {}),
    alternates: {
      canonical,
      languages: {
        en: enPath,
        ja: jaPath,
        'x-default': enPath,
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: absolute(canonical),
      siteName: locale === 'ja' ? '南田桂吾' : 'Keigo Minamida Portfolio',
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      alternateLocale: locale === 'ja' ? ['en_US'] : ['ja_JP'],
      type: 'website',
      images: image,
    },
    twitter: {
      card: page === 'rota' ? 'summary' : 'summary_large_image',
      title: copy.title,
      description: copy.description,
      ...(page === 'rota' ? { images: ['/images/rota/portrait.png'] } : {}),
    },
    robots: { index: true, follow: true },
  }
}
