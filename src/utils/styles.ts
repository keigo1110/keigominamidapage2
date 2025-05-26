// Common style utilities to reduce code duplication

export const gradientStyles = {
  textPrimary: (isDark: boolean) => 
    isDark ? 'from-cyan-400 to-purple-400' : 'from-purple-600 to-pink-600',
  
  textSecondary: (isDark: boolean) =>
    isDark ? 'from-pink-400 to-purple-400' : 'from-pink-600 to-purple-600',
  
  textTertiary: (isDark: boolean) =>
    isDark ? 'from-green-400 to-emerald-400' : 'from-green-600 to-emerald-600',
  
  textQuaternary: (isDark: boolean) =>
    isDark ? 'from-blue-400 to-indigo-400' : 'from-blue-600 to-indigo-600',
  
  textWarning: (isDark: boolean) =>
    isDark ? 'from-yellow-400 to-orange-400' : 'from-yellow-600 to-orange-600',
  
  textDanger: (isDark: boolean) =>
    isDark ? 'from-orange-400 to-red-400' : 'from-orange-600 to-red-600',
};

export const cardStyles = {
  base: (isDark: boolean) =>
    `${isDark ? 'bg-slate-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl transition-all duration-300`,
  
  borderPrimary: (isDark: boolean) =>
    `border ${isDark ? 'border-purple-500/20 hover:border-cyan-400/40' : 'border-purple-200/30 hover:border-purple-400/40'}`,
  
  borderSecondary: (isDark: boolean) =>
    `border ${isDark ? 'border-pink-500/20 hover:border-purple-400/40' : 'border-pink-200/30 hover:border-pink-400/40'}`,
  
  borderTertiary: (isDark: boolean) =>
    `border ${isDark ? 'border-green-500/20 hover:border-emerald-400/40' : 'border-green-200/30 hover:border-green-400/40'}`,
  
  borderQuaternary: (isDark: boolean) =>
    `border ${isDark ? 'border-blue-500/20 hover:border-indigo-400/40' : 'border-blue-200/30 hover:border-blue-400/40'}`,
};

export const sectionStyles = {
  heading: (isDark: boolean, variant: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'warning' | 'danger' = 'primary') => {
    const gradientMap = {
      primary: gradientStyles.textPrimary,
      secondary: gradientStyles.textSecondary,
      tertiary: gradientStyles.textTertiary,
      quaternary: gradientStyles.textQuaternary,
      warning: gradientStyles.textWarning,
      danger: gradientStyles.textDanger,
    };
    
    return `text-5xl font-bold mb-12 text-center bg-gradient-to-r ${gradientMap[variant](isDark)} bg-clip-text text-transparent`;
  },
  
  subheading: (isDark: boolean, variant: 'primary' | 'secondary' | 'tertiary' | 'quaternary' = 'primary') => {
    const colorMap = {
      primary: isDark ? 'text-cyan-400' : 'text-purple-600',
      secondary: isDark ? 'text-pink-400' : 'text-pink-600',
      tertiary: isDark ? 'text-green-400' : 'text-green-600',
      quaternary: isDark ? 'text-blue-400' : 'text-blue-600',
    };
    
    return `text-2xl font-semibold mb-4 ${colorMap[variant]}`;
  },
};

export const textStyles = {
  body: (isDark: boolean) =>
    `${isDark ? 'text-gray-300' : 'text-gray-600'}`,
  
  bodyMuted: (isDark: boolean) =>
    `${isDark ? 'text-gray-400' : 'text-gray-500'}`,
  
  link: (isDark: boolean) =>
    `${isDark ? 'hover:text-cyan-400' : 'hover:text-purple-600'} transition-colors`,
};

export const buttonStyles = {
  primary: 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-purple-500/25',
  secondary: 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-pink-500/25',
  success: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-green-500/25',
  warning: 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-orange-500/25',
  danger: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-red-500/25',
  
  base: 'inline-flex items-center px-4 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-medium',
};

export const backgroundStyles = {
  sectionGradient: {
    primary: 'bg-gradient-to-br from-purple-50/60 via-cyan-50/40 to-purple-100/60 dark:from-slate-900/60 dark:via-purple-900/40 dark:to-slate-950/60',
    secondary: 'bg-gradient-to-br from-purple-100/40 via-pink-50/60 to-purple-50/50 dark:from-purple-950/40 dark:via-slate-900/60 dark:to-purple-900/50',
    tertiary: 'bg-gradient-to-br from-pink-50/40 via-emerald-50/60 to-green-100/50 dark:from-purple-900/40 dark:via-green-900/30 dark:to-emerald-950/60',
    quaternary: 'bg-gradient-to-br from-green-100/40 via-orange-50/50 to-yellow-100/60 dark:from-emerald-950/40 dark:via-orange-900/30 dark:to-red-950/50',
    quinary: 'bg-gradient-to-br from-yellow-100/40 via-blue-50/60 to-indigo-100/50 dark:from-red-950/40 dark:via-blue-900/30 dark:to-indigo-950/60',
    senary: 'bg-gradient-to-br from-indigo-100/40 via-yellow-50/60 to-orange-100/50 dark:from-indigo-950/40 dark:via-yellow-900/30 dark:to-orange-950/60',
  },
};