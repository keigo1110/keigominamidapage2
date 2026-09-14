import { HomeSection } from '@/components/sections/HomeSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { HomeStructuredData } from '@/components/StructuredData'

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      <HomeSection />
      <ProjectsSection />
    </>
  );
}
