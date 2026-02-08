import { ArtworkSection } from '@/components/sections/ArtworkSection'
import { OtherProjectsSection } from '@/components/sections/OtherProjectsSection'
import type { Metadata } from 'next'

const BASE_URL = 'https://keigominamida.com'

export const metadata: Metadata = {
  title: 'Artwork',
  description:
    'Team and personal creative projects by Keigo Minamida: 4ZIGEN interactive art (GUGEN2024 Grand Prize), installations, and personal works. Interactive art and digital media.',
  alternates: { canonical: `${BASE_URL}/artwork` },
  openGraph: {
    title: 'Artwork | Keigo Minamida',
    description:
      'Team and personal creative projects by Keigo Minamida. 4ZIGEN interactive art, installations, and personal works.',
    url: `${BASE_URL}/artwork`,
    siteName: 'Keigo Minamida Portfolio',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Keigo Minamida Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artwork | Keigo Minamida',
    description: 'Creative projects by Keigo Minamida — 4ZIGEN team works and personal installations.',
  },
  robots: { index: true, follow: true },
}

export default function ArtworkPage() {
  return (
    <>
      <ArtworkSection />
      <OtherProjectsSection />
    </>
  );
}
