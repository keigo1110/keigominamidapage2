// Section types
export type SectionType = "home" | "projects" | "artwork" | "startup" | "otherProjects" | "experience" | "awards" | "contact";

// Page route types
export type PageRoute = 'home' | 'startup' | 'artwork' | 'experience';

export interface NavItem {
  key: PageRoute;
  href: string;
  labelKey: string;
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'home', href: '/', labelKey: 'home' },
  { key: 'startup', href: '/startup', labelKey: 'startup' },
  { key: 'artwork', href: '/artwork', labelKey: 'works' },
  { key: 'experience', href: '/experience', labelKey: 'experience' },
];

// Card component props
export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  links: ProjectLink[];
}

export interface ProjectLink {
  icon: JSX.Element;
  text: string;
  url: string;
}

export interface ExperienceCardProps {
  logo: string;
  title: string;
  position: string;
  date: string;
  links: SimpleLink[];
}

export interface SimpleLink {
  text: string;
  url: string;
}

export interface ArtworkCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface StartupCardProps {
  name: string;
  description: string;
  logo: string;
  website: string;
}

// Social media link type
export interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  style: string;
}

// Project data types
export interface ProjectData {
  title: string;
  descriptionKey: string;
  image: string;
  links: Array<{
    iconType: 'paper' | 'demo' | 'youtube' | 'github' | 'slide' | 'window';
    textKey: string;
    url: string;
  }>;
}

export interface ExperienceData {
  logo: string;
  titleKey: string;
  descriptionKey: string;
  dateKey: string;
  links: Array<{
    textKey: string;
    url: string;
  }>;
}

export interface ArtworkData {
  titleKey: string;
  descriptionKey: string;
  image: string;
  link: string;
}

export interface StartupData {
  nameKey: string;
  descriptionKey: string;
  logo: string;
  website: string;
}

// Animation variants
export interface AnimationVariants {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  transition?: Record<string, unknown>;
  whileHover?: Record<string, unknown>;
  whileTap?: Record<string, unknown>;
}

// Mouse position type
export interface MousePosition {
  x: number;
  y: number;
}