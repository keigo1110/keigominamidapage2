// Minimal style utilities

export const minimalStyles = {
  // Text styles
  heading: {
    h1: (isDark: boolean) => 
      `text-5xl md:text-6xl font-light tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`,
    h2: (isDark: boolean) => 
      `text-3xl md:text-4xl font-light tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`,
    h3: (isDark: boolean) => 
      `text-xl md:text-2xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`,
    h4: (isDark: boolean) => 
      `text-lg md:text-xl font-medium ${isDark ? 'text-gray-100' : 'text-gray-800'}`,
  },
  
  text: {
    body: (isDark: boolean) => 
      `text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`,
    muted: (isDark: boolean) => 
      `text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`,
    small: (isDark: boolean) => 
      `text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`,
  },
  
  // Card styles
  card: {
    base: (isDark: boolean) => 
      `${isDark ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`,
    hover: 'hover:shadow-lg hover:-translate-y-1',
  },
  
  // Button styles
  button: {
    primary: (isDark: boolean) => 
      `${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'} font-medium px-6 py-3 rounded-lg transition-all duration-300`,
    secondary: (isDark: boolean) => 
      `${isDark ? 'bg-transparent text-white border border-gray-600 hover:border-gray-400' : 'bg-transparent text-gray-900 border border-gray-300 hover:border-gray-400'} font-medium px-6 py-3 rounded-lg transition-all duration-300`,
    ghost: (isDark: boolean) => 
      `${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100/10`,
  },
  
  // Link styles
  link: {
    default: (isDark: boolean) => 
      `${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200 underline-offset-4 hover:underline`,
    nav: (isDark: boolean) => 
      `${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`,
  },
  
  // Badge styles
  badge: {
    default: (isDark: boolean) => 
      `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`,
    accent: (isDark: boolean) => 
      `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-50 text-indigo-700'}`,
  },
  
  // Container styles
  container: {
    section: 'container mx-auto px-6 py-20 md:py-32',
    content: 'max-w-4xl mx-auto',
  },
  
  // Gradient (minimal use)
  gradient: {
    text: (isDark: boolean) => 
      isDark ? 'bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent' : 'bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent',
    accent: 'bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent',
  },
};