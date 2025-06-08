'use client'

import { MinimalBackground } from './MinimalBackground'
import { MinimalNavigation } from './layout/MinimalNavigation'
import { MinimalHomeSection } from './sections/MinimalHomeSection'
import { MinimalProjectsSection } from './sections/MinimalProjectsSection'
import { MinimalExperienceSection } from './sections/MinimalExperienceSection'
import { MinimalFooter } from './layout/MinimalFooter'
import { SkipLink } from './SkipLink'
import { FocusIndicator } from './FocusIndicator'
import { useScrollSection } from '../hooks/useScrollSection'

const SECTIONS = [
  'home',
  'projects',
  'experience',
  'contact'
] as const;

export function MinimalPortfolio() {
  const activeSection = useScrollSection(SECTIONS);
  const isDark = true; // ダークモード固定

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <SkipLink />
      <FocusIndicator />
      
      {/* Minimal particle background */}
      <MinimalBackground />
      
      {/* Navigation */}
      <MinimalNavigation activeSection={activeSection} sections={SECTIONS} />
      
      <main id="main-content" className="relative z-10">
        <MinimalHomeSection />
        <MinimalProjectsSection />
        <MinimalExperienceSection />
      </main>
      
      <MinimalFooter />
    </div>
  );
}