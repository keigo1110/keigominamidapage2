import { ArtworkSection } from '@/components/sections/ArtworkSection'
import { OtherProjectsSection } from '@/components/sections/OtherProjectsSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artwork | Keigo Minamida',
  description: 'Creative works and art projects by Keigo Minamida, featuring interactive art and digital media.',
}

export default function ArtworkPage() {
  return (
    <>
      <ArtworkSection />
      <OtherProjectsSection />
    </>
  );
}
