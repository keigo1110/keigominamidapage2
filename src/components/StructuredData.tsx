'use client'

const BASE = 'https://keigominamida.com'

export function StructuredData() {
  const personSchema = {
    '@type': 'Person',
    '@id': `${BASE}/#person`,
    name: 'Keigo Minamida',
    alternateName: ['南田桂吾', 'みなみだけいご', 'けいごみなみだ'],
    url: `${BASE}/`,
    image: `${BASE}/images/myface.jpg`,
    description: 'Keigo Minamida (南田桂吾) is a Master\'s student at The University of Tokyo specializing in Human-Computer Interaction, Augmented Humans, and Computer Vision. He is a researcher, entrepreneur, and creator of interactive art and IoT solutions including Wakabar.',
    jobTitle: ["Master's Student", 'Researcher', 'Entrepreneur', 'Software Developer'],
    affiliation: {
      '@type': 'Organization',
      name: 'The University of Tokyo',
      url: 'https://www.iii.u-tokyo.ac.jp/',
      department: {
        '@type': 'Organization',
        name: 'Rekimoto Lab',
        url: 'https://lab.rekimoto.org/',
      },
    },
    alumniOf: {
      '@type': 'Organization',
      name: 'Kindai University',
      department: 'Department of Mechanical Engineering',
    },
    knowsAbout: [
      'Human-robot interaction',
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
    ],
    email: 'mkeigo1110@gmail.com',
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Researcher',
      description:
        'Developing effective methods to process and utilize real-world information for human-robot interaction',
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
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE}/?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const webPageSchema = {
    '@type': 'WebPage',
    '@id': `${BASE}/#webpage`,
    url: `${BASE}/`,
    name: 'Keigo Minamida | HCI Researcher & Creative Technologist',
    description:
      'Keigo Minamida (南田桂吾) is a Master\'s student at The University of Tokyo specializing in HCI, Augmented Humans, and Computer Vision. Researcher, entrepreneur, and creator of interactive art and IoT solutions.',
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
          text: 'Keigo Minamida (南田桂吾) is a Master\'s student at The University of Tokyo (Rekimoto Lab) specializing in Human-Computer Interaction, Augmented Humans, and Computer Vision. He is a researcher, entrepreneur, and software developer. He has published at SIGGRAPH Asia (e.g. Incremental Gaussian Splatting), co-founded Wakabar (bicycle safety IoT), and creates interactive art with the 4ZIGEN team (GUGEN2024 Grand Prize).',
        },
      },
      {
        '@type': 'Question',
        name: 'What does Keigo Minamida research?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Keigo Minamida researches Human-Computer Interaction (HCI), Augmented Humans, and Computer Vision. His work includes 3D reconstruction (Gaussian Splatting), human-robot interaction (e.g. Recertif for robot status visibility), and real-world sensing for interactive systems.',
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
    name: 'Wakabar K.K.',
    description: 'Supporting safe behavior while cycling using IoT technology',
    url: 'https://wakabar-cycle.com/',
    founder: { '@id': `${BASE}/#person` },
    foundingDate: '2023',
    mission: 'Zero traffic accidents on bicycles using IoT',
    knowsAbout: ['IoT', 'Bicycle Safety', 'Traffic Safety'],
  }

  const researchWorksSchema = [
    {
      '@type': 'ScholarlyArticle',
      name: 'Incremental Gaussian Splatting',
      description:
        'Gradual 3D Reconstruction from a Monocular Camera Following Physical World Changes',
      author: { '@id': `${BASE}/#person` },
      publisher: 'SIGGRAPH Asia 2024',
      url: 'https://doi.org/10.1145/3681756.3697913',
      datePublished: '2024',
      about: ['Computer Vision', '3D Reconstruction', 'Gaussian Splatting'],
    },
    {
      '@type': 'ScholarlyArticle',
      name: 'Recertif',
      description:
        "A system that shows the robot's work status simply by directing attention to the robot",
      author: { '@id': `${BASE}/#person` },
      datePublished: '2024',
      about: ['Human-Robot Interaction', 'Visual Attention', 'Robotics'],
    },
  ]

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
