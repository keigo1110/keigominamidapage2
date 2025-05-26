// Refined style system - elegant but not boring

export const colors = {
  // Primary palette - sophisticated blues and purples
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1', // Main accent
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  
  // Secondary palette - warm accents
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  
  // Neutral grays
  gray: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },
};

export const refinedStyles = {
  // Typography
  heading: {
    h1: (isDark: boolean) => 
      `text-5xl md:text-7xl font-extralight tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`,
    h2: (isDark: boolean) => 
      `text-3xl md:text-5xl font-light tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`,
    h3: (isDark: boolean) => 
      `text-2xl md:text-3xl font-light ${isDark ? 'text-white' : 'text-gray-900'}`,
    h4: (isDark: boolean) => 
      `text-lg md:text-xl font-normal ${isDark ? 'text-gray-100' : 'text-gray-800'}`,
  },
  
  // Text styles
  text: {
    body: (isDark: boolean) => 
      `text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`,
    muted: (isDark: boolean) => 
      `text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`,
    accent: (isDark: boolean) => 
      `${isDark ? 'text-indigo-400' : 'text-indigo-600'}`,
  },
  
  // Gradient text (subtle)
  gradientText: {
    primary: (isDark: boolean) => 
      `bg-gradient-to-r ${isDark ? 'from-indigo-400 to-purple-400' : 'from-indigo-600 to-purple-600'} bg-clip-text text-transparent`,
    secondary: (isDark: boolean) => 
      `bg-gradient-to-r ${isDark ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent`,
    subtle: (isDark: boolean) => 
      `bg-gradient-to-r ${isDark ? 'from-gray-100 to-gray-300' : 'from-gray-700 to-gray-900'} bg-clip-text text-transparent`,
  },
  
  // Card styles
  card: {
    base: (isDark: boolean) => 
      `${isDark ? 'bg-gray-900/50' : 'bg-white/70'} backdrop-blur-md rounded-xl border ${isDark ? 'border-gray-800' : 'border-gray-200'} shadow-lg transition-all duration-300`,
    hover: 'hover:shadow-xl hover:-translate-y-1',
    glow: () => 
      `hover:shadow-indigo-500/10 hover:border-indigo-500/30`,
  },
  
  // Button styles
  button: {
    primary: (isDark: boolean) => 
      `inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        isDark 
          ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20'
      }`,
    secondary: (isDark: boolean) => 
      `inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700' 
          : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm'
      }`,
    ghost: (isDark: boolean) => 
      `inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
        isDark 
          ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
      }`,
  },
  
  // Link styles
  link: {
    default: (isDark: boolean) => 
      `${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'} transition-colors duration-200 underline-offset-4 hover:underline`,
    nav: (isDark: boolean) => 
      `${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-all duration-200`,
    navActive: (isDark: boolean) => 
      `${isDark ? 'text-indigo-400' : 'text-indigo-600'} font-medium`,
  },
  
  // Animations
  animation: {
    fadeIn: 'animate-in fade-in duration-500',
    slideUp: 'animate-in slide-in-from-bottom-4 duration-500',
    scaleIn: 'animate-in zoom-in-95 duration-300',
  },
  
  // Sections
  section: {
    padding: 'py-20 md:py-32',
    container: 'container mx-auto px-6 md:px-8',
  },
};