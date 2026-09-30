import { IndexableSummary } from '@/components/IndexableSummary'
import { HomeSection } from '@/components/sections/HomeSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { HomeStructuredData } from '@/components/StructuredData'
import { pageMetadata } from '@/lib/pageMetadata'

export const metadata = pageMetadata('home', 'en')

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      <IndexableSummary page="home" />
      <HomeSection />
      <ProjectsSection />
    </>
  );
}
