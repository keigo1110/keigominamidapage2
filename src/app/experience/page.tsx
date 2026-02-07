import { PublicationsSection } from '@/components/sections/PublicationsSection'
import { AwardsSection } from '@/components/sections/AwardsSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experience | Keigo Minamida',
  description: 'Publications, awards, education, and professional experience of Keigo Minamida.',
}

export default function ExperiencePage() {
  return (
    <>
      <PublicationsSection />
      <AwardsSection />
      <EducationSection />
      <ExperienceSection />
    </>
  );
}
