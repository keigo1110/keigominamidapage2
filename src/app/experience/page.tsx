import { IndexableSummary } from '@/components/IndexableSummary'
import { PublicationsSection } from '@/components/sections/PublicationsSection'
import { AwardsSection } from '@/components/sections/AwardsSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ExperienceStructuredData } from '@/components/StructuredData'
import { pageMetadata } from '@/lib/pageMetadata'

export const metadata = pageMetadata('experience', 'en')

export default function ExperiencePage() {
  return (
    <>
      <ExperienceStructuredData />
      <IndexableSummary page="experience" />
      <PublicationsSection />
      <AwardsSection />
      <EducationSection />
      <ExperienceSection />
    </>
  );
}
