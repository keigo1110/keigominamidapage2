// Apple-style design system utilities

export const appleStyles = {
  // Typography
  heading: {
    hero: 'text-5xl md:text-6xl font-semibold tracking-tight',
    section: 'text-4xl md:text-5xl font-semibold tracking-tight',
    card: 'text-xl font-medium',
    sub: 'text-2xl font-semibold',
  },

  text: {
    body: (isDark: boolean) =>
      `text-base md:text-lg leading-relaxed ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`,
    muted: 'text-[#86868B]',
    caption: 'text-sm text-[#86868B]',
    accent: (isDark: boolean) =>
      isDark ? 'text-[#2997FF]' : 'text-[#0071E3]',
  },

  // Card styles
  card: {
    base: (isDark: boolean) =>
      `${isDark ? 'bg-[#1D1D1F]' : 'bg-[#F5F5F7]'} rounded-2xl transition-all duration-300`,
    hover: 'hover:shadow-md',
    interactive: (isDark: boolean) =>
      `${isDark ? 'bg-[#1D1D1F]' : 'bg-[#F5F5F7]'} rounded-2xl transition-all duration-300 hover:shadow-md`,
  },

  // Button styles
  button: {
    primary: (isDark: boolean) =>
      `${isDark ? 'bg-[#2997FF] hover:bg-[#2997FF]/90' : 'bg-[#0071E3] hover:bg-[#0071E3]/90'} text-white rounded-lg px-6 py-3 font-medium transition-all duration-300`,
    secondary: (isDark: boolean) =>
      `${isDark ? 'bg-[#333336] hover:bg-[#333336]/80 text-[#F5F5F7]' : 'bg-[#E8E8ED] hover:bg-[#E8E8ED]/80 text-[#1D1D1F]'} rounded-lg px-6 py-3 font-medium transition-all duration-300`,
    ghost: (isDark: boolean) =>
      `${isDark ? 'text-[#2997FF] hover:bg-[#2997FF]/10' : 'text-[#0071E3] hover:bg-[#0071E3]/10'} rounded-lg px-4 py-2 font-medium transition-all duration-300`,
    base: 'inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300 font-medium',
  },

  // Section styles
  section: {
    padding: 'py-24 md:py-32 lg:py-40',
    container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  },

  // Link styles
  link: (isDark: boolean) =>
    `${isDark ? 'text-[#2997FF] hover:text-[#2997FF]/80' : 'text-[#0071E3] hover:text-[#0071E3]/80'} transition-colors underline-offset-4 hover:underline`,

  // Divider
  divider: (isDark: boolean) =>
    `w-24 h-0.5 mx-auto ${isDark ? 'bg-[#333336]' : 'bg-[#D2D2D7]'}`,

  // Colors for direct reference
  colors: {
    bg: { light: '#FFFFFF', dark: '#000000' },
    cardBg: { light: '#F5F5F7', dark: '#1D1D1F' },
    text: { light: '#1D1D1F', dark: '#F5F5F7' },
    muted: '#86868B',
    accent: { light: '#0071E3', dark: '#2997FF' },
    border: { light: '#D2D2D7', dark: '#333336' },
    subBg: { light: '#E8E8ED', dark: '#2C2C2E' },
  },
};

// Keep backward compatibility exports
export const gradientStyles = {
  textPrimary: () => '',
  textSecondary: () => '',
  textTertiary: () => '',
  textQuaternary: () => '',
  textWarning: () => '',
  textDanger: () => '',
};

export const cardStyles = {
  base: (isDark: boolean) => appleStyles.card.base(isDark),
  borderPrimary: () => '',
  borderSecondary: () => '',
  borderTertiary: () => '',
  borderQuaternary: () => '',
};

export const sectionStyles = {
  heading: (isDark: boolean) =>
    `${appleStyles.heading.section} text-center mb-12 ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`,
  subheading: (isDark: boolean) =>
    `${appleStyles.heading.sub} mb-4 ${isDark ? 'text-[#2997FF]' : 'text-[#0071E3]'}`,
};

export const textStyles = {
  body: (isDark: boolean) => isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]',
  bodyMuted: () => 'text-[#86868B]',
  link: (isDark: boolean) =>
    `${isDark ? 'hover:text-[#2997FF]' : 'hover:text-[#0071E3]'} transition-colors`,
};

export const buttonStyles = {
  primary: 'bg-[#0071E3] dark:bg-[#2997FF] hover:opacity-90 text-white',
  secondary: 'bg-[#E8E8ED] dark:bg-[#333336] hover:opacity-90 text-[#1D1D1F] dark:text-[#F5F5F7]',
  base: 'inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300 font-medium',
};

export const backgroundStyles = {
  sectionGradient: {
    primary: '',
    secondary: '',
    tertiary: '',
    quaternary: '',
    quinary: '',
    senary: '',
  },
};
