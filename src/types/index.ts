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
  /** Tailwind class for icon on hover (e.g. group-hover:text-[#E4405F]). Uses theme blue if omitted. */
  hoverColorClass?: string;
}
