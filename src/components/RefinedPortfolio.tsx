'use client'

import { useState, useEffect } from 'react'
import { ThreeBackground } from './ThreeBackground'
import { RefinedNavigation } from './layout/RefinedNavigation'
import { RefinedHomeSection } from './sections/RefinedHomeSection'
import { RefinedProjectsSection } from './sections/RefinedProjectsSection'
import { RefinedArtworkSection } from './sections/RefinedArtworkSection'
import { RefinedStartupSection } from './sections/RefinedStartupSection'
import { RefinedOtherProjectsSection } from './sections/RefinedOtherProjectsSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { RefinedAwardsSection } from './sections/RefinedAwardsSection'
import { RefinedFooter } from './layout/RefinedFooter'
import { SkipLink } from './SkipLink'
import { FocusIndicator } from './FocusIndicator'
import { useScrollSection } from '../hooks/useScrollSection'

const SECTIONS = [
  'home',
  'projects',
  'artwork',
  'startup',
  'experience',
  'awards'
] as const;

export function RefinedPortfolio() {
  const activeSection = useScrollSection(SECTIONS);
  const isDark = true; // ダークモード固定
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-950' : 'bg-gray-50'} transition-colors duration-500`}>
      <SkipLink />
      <FocusIndicator />

      {/* Refined Three.js background */}
      <div className="opacity-30">
        <ThreeBackground />
      </div>

      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${
          isDark
            ? 'from-indigo-950/20 via-transparent to-purple-950/20'
            : 'from-indigo-50/40 via-transparent to-purple-50/40'
        }`} />

        {/* Interactive glow */}
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
            isDark ? 'bg-indigo-500/5' : 'bg-indigo-400/10'
          }`}
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      <RefinedNavigation activeSection={activeSection} sections={SECTIONS} />

      <main id="main-content" className="relative z-10">
        <RefinedHomeSection />
        <RefinedProjectsSection />
        <RefinedArtworkSection />
        <RefinedStartupSection />
        <RefinedOtherProjectsSection />
        <ExperienceSection />
        <RefinedAwardsSection />
      </main>

      <RefinedFooter />
    </div>
  );
}