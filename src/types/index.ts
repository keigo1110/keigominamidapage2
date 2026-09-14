// Page route types
export type PageRoute = 'home' | 'startup' | 'artwork' | 'experience';

export interface NavItem {
  key: PageRoute;
  href: string;
  labelKey: string;
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'home', href: '/', labelKey: 'home' },
  { key: 'artwork', href: '/artwork', labelKey: 'works' },
  { key: 'startup', href: '/startup', labelKey: 'startup' },
  { key: 'experience', href: '/experience', labelKey: 'experience' },
];

export interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  style: string;
  /** Color applied when this icon is the dock focus. */
  accentClass?: string
}
