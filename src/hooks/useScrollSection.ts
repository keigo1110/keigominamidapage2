import { useState, useEffect, useCallback } from 'react';
import { SectionType } from '../types';

export function useScrollSection(sections: readonly SectionType[]) {
  const [activeSection, setActiveSection] = useState<SectionType>('home');

  const handleScroll = useCallback(() => {
    const currentSection = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    
    if (currentSection) {
      setActiveSection(currentSection);
    }
  }, [sections]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初期チェック
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return activeSection;
}