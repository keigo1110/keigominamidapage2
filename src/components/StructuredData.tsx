import { toScholarlyArticles } from '@/data/research'
import { WAKABAR_APP_STORE_URL, WAKABAR_CORPORATE_URL } from '@/data/wakabar'

const BASE = 'https://keigominamida.com'

export function StructuredData() {
  const personSchema = {
    '@type': 'Person',
    '@id': `${BASE}/#person`,
    name: 'Keigo Minamida',
    alternateName: ['南田桂吾', 'みなみだけいご', 'けいごみなみだ'],
    url: `${BASE}/`,
    image: `${BASE}/images/myface.jpg`,
    description: 'Keigo Minamida (南田桂吾) is a doctoral student at The University of Tokyo specializing in Human-Computer Interaction, Augmented Humans, and Computer Vision. He is a researcher, entrepreneur, and creator of interactive art and IoT solutions including Wakabar.',
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
    '@id': `${BASE}/#website`,
    url: `${BASE}/`,
    name: 'Keigo Minamida Portfolio',
    description:
      'Portfolio of Keigo Minamida (南田桂吾) — Researcher, Entrepreneur, and Software Developer at The University of Tokyo.',
    author: { '@id': `${BASE}/#person` },
    inLanguage: ['en', 'ja'],
  }

  const webPageSchema = {
    '@type': 'WebPage',
    '@id': `${BASE}/#webpage`,
    url: `${BASE}/`,
    name: 'Keigo Minamida | HCI Researcher & Creative Technologist',
    description:
      'Keigo Minamida (南田桂吾) is a doctoral student at The University of Tokyo specializing in HCI, Augmented Humans, and Computer Vision. Researcher, entrepreneur, and creator of interactive art and IoT solutions.',
    isPartOf: { '@id': `${BASE}/#website` },
    about: { '@id': `${BASE}/#person` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${BASE}/images/myface.jpg`,
    },
    inLanguage: 'en',
    potentialAction: {
      '@type': 'ReadAction',
      target: `${BASE}/`,
    },
  }

  const faqSchema = {
    '@type': 'FAQPage',
    '@id': `${BASE}/#faq`,
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
  }

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    '@id': `${BASE}/#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
    ],
  }

  const organizationSchema = {
    '@type': 'Organization',
    '@id': `${BASE}/#organization`,
    name: 'Wakabar Co., Ltd.',
    description: 'Supporting safe behavior while cycling using IoT technology',
    url: WAKABAR_CORPORATE_URL,
    sameAs: [WAKABAR_APP_STORE_URL],
    founder: { '@id': `${BASE}/#person` },
    foundingDate: '2023',
    mission: 'Zero traffic accidents on bicycles using IoT',
    knowsAbout: ['IoT', 'Bicycle Safety', 'Traffic Safety'],
  }

  const researchWorksSchema = toScholarlyArticles(`${BASE}/#person`)

  const creativeWorksSchema = [
    {
      '@type': 'CreativeWork',
      name: 'Geocussion',
      description:
        'An instrument on a sandbox that produces different sounds by hitting and pressing sand to create objects',
      creator: { '@id': `${BASE}/#person` },
      url: 'https://geohp.vercel.app/',
      genre: 'Interactive Art',
      artform: 'Digital Installation',
    },
    {
      '@type': 'CreativeWork',
      name: 'Protophysica',
      description: 'Expanding the possibilities of creation using supercapacitors',
      creator: { '@id': `${BASE}/#person` },
      url: 'https://protophysicahp.vercel.app/',
      genre: 'Interactive Art',
      artform: 'Physical Computing',
    },
  ]

  const awardsSchema = [
    {
      '@type': 'Award',
      name: 'GUGEN2024 Grand Prize and Hosii-ne Award',
      description: 'Grand Prize and Hosii-ne Award from GUGEN2024 for 4ZIGEN project',
      recipient: { '@id': `${BASE}/#person` },
      dateAwarded: '2024-12',
      awardingOrganization: 'GUGEN',
    },
  ]

  const graph = [
    personSchema,
    websiteSchema,
    webPageSchema,
    faqSchema,
    breadcrumbSchema,
    organizationSchema,
    ...researchWorksSchema,
    ...creativeWorksSchema,
    ...awardsSchema,
  ]

  const schemaWithGraph = {
    '@context': 'https://schema.org',
    '@graph': graph,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaWithGraph),
      }}
    />
  )
}
