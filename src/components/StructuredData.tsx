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
} from '@/data/wakabar'
import { JsonLd } from './JsonLd'

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
    inLanguage: ['en', 'ja'],
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
    'Keigo Minamida (南田桂吾) is a doctoral student at The University of Tokyo specializing in Human-Computer Interaction, Augmented Humans, and Computer Vision. He is a researcher, entrepreneur, and creator of interactive art and IoT solutions including Wakabar.',
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
  sameAs: [WAKABAR_APP_STORE_URL, WAKABAR_APP_URL],
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

export function HomeStructuredData() {
  return (
    <JsonLd
      graph={[
        webPage({
          id: `${SITE_URL}/#webpage`,
          url: `${SITE_URL}/`,
          name: 'Keigo Minamida | HCI Researcher & Creative Technologist',
          description:
            'Keigo Minamida (南田桂吾) is a doctoral student at The University of Tokyo specializing in HCI, Augmented Humans, and Computer Vision. Researcher, entrepreneur, and creator of interactive art and IoT solutions.',
        }),
        breadcrumb([{ name: 'Home', path: `${SITE_URL}/` }]),
        {
          '@type': 'FAQPage',
          '@id': `${SITE_URL}/#faq`,
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
          ],
        },
        ...scholarlyArticles,
      ]}
    />
  )
}

export function StartupStructuredData() {
  return (
    <JsonLd
      graph={[
        webPage({
          id: `${SITE_URL}/startup#webpage`,
          url: `${SITE_URL}/startup`,
          name: 'Startup | Keigo Minamida',
          description:
            'Wakabar — bicycle safety startup by Keigo Minamida. IoT and location-based alerts to prevent accidents. The iOS app is on the App Store.',
        }),
        breadcrumb([
          { name: 'Home', path: `${SITE_URL}/` },
          { name: 'Startup', path: `${SITE_URL}/startup` },
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
      ]}
    />
  )
}

export function ExperienceStructuredData() {
  return (
    <JsonLd
      graph={[
        webPage({
          id: `${SITE_URL}/experience#webpage`,
          url: `${SITE_URL}/experience`,
          name: 'Experience | Keigo Minamida',
          description:
            'Publications, awards, education, and professional experience of Keigo Minamida.',
        }),
        breadcrumb([
          { name: 'Home', path: `${SITE_URL}/` },
          { name: 'Experience', path: `${SITE_URL}/experience` },
        ]),
        ...scholarlyArticles,
      ]}
    />
  )
}

export function ArtworkStructuredData() {
  return (
    <JsonLd
      graph={[
        webPage({
          id: `${SITE_URL}/artwork#webpage`,
          url: `${SITE_URL}/artwork`,
          name: 'Artwork | Keigo Minamida',
          description:
            'Team and personal creative projects by Keigo Minamida: 4ZIGEN interactive art, installations, and personal works.',
        }),
        breadcrumb([
          { name: 'Home', path: `${SITE_URL}/` },
          { name: 'Artwork', path: `${SITE_URL}/artwork` },
        ]),
        ...creativeWorksSchema,
      ]}
    />
  )
}

export function RotaStructuredData() {
  return (
    <JsonLd
      graph={[
        webPage({
          id: `${SITE_URL}/rota#webpage`,
          url: `${SITE_URL}/rota`,
          name: 'ROTA | Keigo Minamida',
          description: rotaProfile.lead.en,
          image: `${SITE_URL}${ROTA_CHARACTER_IMAGE}`,
        }),
        breadcrumb([
          { name: 'Home', path: `${SITE_URL}/` },
          { name: 'ROTA', path: `${SITE_URL}/rota` },
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
