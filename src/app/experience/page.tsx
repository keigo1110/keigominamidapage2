import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { AwardsSection } from '@/components/sections/AwardsSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experience & Awards | Keigo Minamida',
  description: 'Professional experience and awards received by Keigo Minamida.',
}

export default function ExperiencePage() {
  return (
    <>
      <ExperienceSection />
      <AwardsSection />
    </>
  );
}
