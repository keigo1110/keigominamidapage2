'use client'

export function StructuredData() {
  // Person Schema for Keigo Minamida
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://keigominamida.com/#person",
    "name": "Keigo Minamida",
    "alternateName": ["南田桂吾", "みなみだけいご", "けいごみなみだ"],
    "url": "https://keigominamida.com/",
    "image": "https://keigominamida.com/images/myface.jpg",
    "description": "A passionate researcher and entrepreneur focused on pioneering new ways for humans to interact with robots and real-world objects. Second-year Master student at The University of Tokyo.",
    "jobTitle": ["Master's Student", "Researcher", "Entrepreneur", "Software Developer"],
    "affiliation": {
      "@type": "Organization",
      "name": "The University of Tokyo",
      "url": "https://www.iii.u-tokyo.ac.jp/",
      "department": {
        "@type": "Organization",
        "name": "Rekimoto Lab",
        "url": "https://lab.rekimoto.org/"
      }
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "Kindai University",
      "department": "Department of Mechanical Engineering"
    },
    "knowsAbout": [
      "Human-robot interaction",
      "Augmented reality",
      "Computer vision",
      "Machine learning",
      "Software development",
      "Entrepreneurship"
    ],
    "sameAs": [
      "https://twitter.com/keigominamida",
      "https://www.instagram.com/namida1110/",
      "https://www.linkedin.com/in/keigominamida/",
      "https://www.facebook.com/profile.php?id=100053066043602",
      "https://github.com/keigo1110",
      "https://qiita.com/keigo1110"
    ],
    "email": "mkeigo1110@gmail.com",
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Researcher",
      "description": "Developing effective methods to process and utilize real-world information for human-robot interaction"
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://keigominamida.com/#website",
    "url": "https://keigominamida.com/",
    "name": "Keigo Minamida Portfolio",
    "description": "Portfolio website of Keigo Minamida (南田桂吾) - Researcher, Entrepreneur, and Software Developer",
    "author": {
      "@id": "https://keigominamida.com/#person"
    },
    "inLanguage": ["en", "ja"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://keigominamida.com/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Organization Schema for Wakabar K.K.
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://keigominamida.com/#organization",
    "name": "Wakabar K.K.",
    "description": "Supporting safe behavior while cycling using IoT technology",
    "url": "https://wakabar-cycle.com/",
    "founder": {
      "@id": "https://keigominamida.com/#person"
    },
    "foundingDate": "2023",
    "mission": "Zero traffic accidents on bicycles using IoT",
    "knowsAbout": ["IoT", "Bicycle Safety", "Traffic Safety"]
  };

  // Research Paper Schema for notable publications
  const researchWorksSchema = [
    {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      "name": "Incremental Gaussian Splatting",
      "description": "Gradual 3D Reconstruction from a Monocular Camera Following Physical World Changes",
      "author": {
        "@id": "https://keigominamida.com/#person"
      },
      "publisher": "SIGGRAPH Asia 2024",
      "url": "https://doi.org/10.1145/3681756.3697913",
      "datePublished": "2024",
      "about": ["Computer Vision", "3D Reconstruction", "Gaussian Splatting"]
    },
    {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      "name": "Recertif",
      "description": "A system that shows the robot's work status simply by directing attention to the robot",
      "author": {
        "@id": "https://keigominamida.com/#person"
      },
      "datePublished": "2024",
      "about": ["Human-Robot Interaction", "Visual Attention", "Robotics"]
    }
  ];

  // Creative Works Schema for artworks
  const creativeWorksSchema = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": "Geocussion",
      "description": "An instrument on a sandbox that can produce different sounds by hitting and pressing sand to create objects",
      "creator": {
        "@id": "https://keigominamida.com/#person"
      },
      "url": "https://geohp.vercel.app/",
      "genre": "Interactive Art",
      "artform": "Digital Installation"
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": "Protophysica",
      "description": "Expanding the possibilities of creation using supercapacitors",
      "creator": {
        "@id": "https://keigominamida.com/#person"
      },
      "url": "https://protophysicahp.vercel.app/",
      "genre": "Interactive Art",
      "artform": "Physical Computing"
    }
  ];

  // Awards Schema
  const awardsSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Award",
      "name": "GUGEN2024 Grand Prize and Hosii-ne Award",
      "description": "The Grand Prize and the Hosii-ne Award from GUGEN2024 for 4ZIGEN project",
      "recipient": {
        "@id": "https://keigominamida.com/#person"
      },
      "dateAwarded": "2024-12",
      "awardingOrganization": "GUGEN"
    }
  ];

  const allSchemas = [
    personSchema,
    websiteSchema,
    organizationSchema,
    ...researchWorksSchema,
    ...creativeWorksSchema,
    ...awardsSchema
  ];

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}
    </>
  );
}