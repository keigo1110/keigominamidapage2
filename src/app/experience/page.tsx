import { PublicationsSection } from '@/components/sections/PublicationsSection'
import { AwardsSection } from '@/components/sections/AwardsSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ExperienceStructuredData } from '@/components/StructuredData'
import type { Metadata } from 'next'

const BASE_URL = 'https://keigominamida.com'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Keigo Minamida: publications (UIST Adjunct 2026, Spatial Media Conference 2026, Augmented Humans 2026, SIGGRAPH Asia 2024), awards (GUGEN2024), education (University of Tokyo, Ishiguro Laboratory, prior Rekimoto Lab work), and professional experience.',
  alternates: { canonical: `${BASE_URL}/experience` },
  openGraph: {
    title: 'Experience | Keigo Minamida',
    description: 'Publications, awards, education, and professional experience of Keigo Minamida.',
    url: `${BASE_URL}/experience`,
    siteName: 'Keigo Minamida Portfolio',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Keigo Minamida Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience | Keigo Minamida',
    description: 'Publications, awards, education, and experience of Keigo Minamida.',
  },
  robots: { index: true, follow: true },
}

export default function ExperiencePage() {
  return (
    <>
      <ExperienceStructuredData />
      <PublicationsSection />
      <AwardsSection />
      <EducationSection />
      <ExperienceSection />
    </>
  );
}
