'use client'

import { ThreeBackground } from './ThreeBackground'
import { DynamicBackground } from './DynamicBackground'
import { Navigation } from './layout/Navigation'
import { HomeSection } from './sections/HomeSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { ArtworkSection } from './sections/ArtworkSection'
import { StartupSection } from './sections/StartupSection'
import { OtherProjectsSection } from './sections/OtherProjectsSection'
import { ProfessionalExperienceSection } from './sections/ProfessionalExperienceSection'
import { AwardsSection } from './sections/AwardsSection'
import { Footer } from './layout/Footer'
import { SkipLink } from './SkipLink'
// import { SectionType } from '../types' // Not used after refactoring
import { useScrollSection } from '../hooks/useScrollSection'

const SECTIONS = [
  'home',
  'projects',
  'artwork',
  'startup',
  'experience',
  'awards'
] as const;

export function PortfolioComponent() {
  const activeSection = useScrollSection(SECTIONS);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-slate-900 dark:from-black dark:via-blue-950 dark:to-slate-950 light:from-gray-50 light:via-blue-50 light:to-gray-50 text-white dark:text-white light:text-gray-900 overflow-x-hidden transition-colors duration-500">
      {/* Skip Link for Accessibility */}
      <SkipLink />

      {/* Three.js 3D Background */}
      <ThreeBackground />

      {/* Enhanced Dynamic Background */}
      <DynamicBackground />

      {/* Navigation */}
      <Navigation activeSection={activeSection} sections={SECTIONS} />

      <main id="main-content" className="pt-20 relative z-10">
        <HomeSection />
        <ProjectsSection />
        <ArtworkSection />
        <StartupSection />
        <OtherProjectsSection />
        <ProfessionalExperienceSection />
        <AwardsSection />
      </main>

      <Footer />
    </div>
  );
}

export default PortfolioComponent;