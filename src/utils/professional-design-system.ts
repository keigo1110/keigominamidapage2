/**
 * Professional Design System for Experience Section
 * プロフェッショナルレベルの経歴セクション用デザインシステム
 */

// === カラーパレット ===
export const professionalColors = {
  // プライマリー：洗練されたブルー系
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554'
  },

  // セカンダリー：エレガントなグレー系
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
  },

  // アクセント：温かみのあるオレンジ系
  accent: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12'
  },

  // ステータスカラー
  status: {
    active: '#10b981',     // エメラルドグリーン
    completed: '#6366f1',  // インディゴ
    ongoing: '#f59e0b',    // アンバー
    planned: '#8b5cf6'     // パープル
  },

  // セマンティックカラー
  semantic: {
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#0284c7'
  }
} as const

// === タイポグラフィ ===
export const typography = {
  // フォントファミリー
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
    display: ['Poppins', 'system-ui', 'sans-serif']
  },

  // フォントサイズ（クランプ対応）
  fontSize: {
    xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',      // 12-14px
    sm: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',        // 14-16px
    base: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',      // 16-18px
    lg: 'clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem)',    // 18-20px
    xl: 'clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)',        // 20-24px
    '2xl': 'clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem)',   // 24-30px
    '3xl': 'clamp(1.875rem, 1.65rem + 1.125vw, 2.25rem)', // 30-36px
    '4xl': 'clamp(2.25rem, 1.95rem + 1.5vw, 3rem)',       // 36-48px
    '5xl': 'clamp(3rem, 2.5rem + 2.5vw, 4rem)',           // 48-64px
    '6xl': 'clamp(3.75rem, 3rem + 3.75vw, 5rem)'          // 60-80px
  },

  // フォントウェイト
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  },

  // ラインハイト
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2'
  },

  // レターサイジング
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  }
} as const

// === スペーシング ===
export const spacing = {
  px: '1px',
  0: '0px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem'       // 384px
} as const

// === ボーダー半径 ===
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',    // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  '4xl': '2rem',     // 32px
  full: '9999px'
} as const

// === シャドウ ===
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  
  // カスタムシャドウ
  professional: '0 4px 20px -2px rgb(0 0 0 / 0.08), 0 2px 8px -2px rgb(0 0 0 / 0.04)',
  elegant: '0 8px 30px -4px rgb(0 0 0 / 0.1), 0 4px 12px -4px rgb(0 0 0 / 0.06)',
  dramatic: '0 20px 40px -8px rgb(0 0 0 / 0.15), 0 8px 16px -8px rgb(0 0 0 / 0.08)'
} as const

// === アニメーション ===
export const animations = {
  // イージング関数
  easing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    
    // カスタムベジェ
    smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    snappy: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
    elegant: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },

  // 持続時間
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '250ms',
    medium: '400ms',
    slow: '600ms',
    slower: '800ms',
    slowest: '1000ms'
  },

  // 遅延
  delay: {
    none: '0ms',
    xs: '50ms',
    sm: '100ms',
    md: '200ms',
    lg: '300ms',
    xl: '500ms'
  }
} as const

// === ブレークポイント ===
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1792px'
} as const

// === コンポーネントトークン ===
export const components = {
  // カード
  card: {
    background: {
      light: 'rgba(255, 255, 255, 0.95)',
      dark: 'rgba(15, 23, 42, 0.95)'
    },
    border: {
      light: 'rgba(226, 232, 240, 0.8)',
      dark: 'rgba(71, 85, 105, 0.3)'
    },
    shadow: shadows.elegant,
    radius: borderRadius['2xl'],
    padding: {
      sm: spacing[4],
      md: spacing[6],
      lg: spacing[8]
    }
  },

  // ボタン
  button: {
    height: {
      sm: spacing[8],
      md: spacing[10],
      lg: spacing[12]
    },
    padding: {
      sm: `${spacing[2]} ${spacing[3]}`,
      md: `${spacing[2.5]} ${spacing[4]}`,
      lg: `${spacing[3]} ${spacing[6]}`
    },
    radius: borderRadius.lg,
    fontWeight: typography.fontWeight.medium
  },

  // インプット
  input: {
    height: spacing[10],
    padding: `${spacing[2]} ${spacing[3]}`,
    radius: borderRadius.md,
    border: '1px solid',
    fontSize: typography.fontSize.sm
  }
} as const

// === ユーティリティ関数 ===
export const designUtils = {
  // カラーバリエーション生成
  getColorVariant: (color: keyof typeof professionalColors, variant: number = 500) => {
    return professionalColors[color][variant as keyof typeof professionalColors[typeof color]]
  },

  // レスポンシブスペーシング
  responsiveSpacing: (mobile: string, tablet?: string, desktop?: string) => {
    const base = mobile
    const md = tablet || mobile
    const lg = desktop || tablet || mobile
    return `clamp(${base}, ${md} + 1vw, ${lg})`
  },

  // 動的シャドウ
  dynamicShadow: (elevation: number, isDark: boolean = false) => {
    const opacity = isDark ? 0.3 : 0.1
    const blur = elevation * 4
    const spread = elevation * 2
    return `0 ${elevation}px ${blur}px -${spread}px rgba(0, 0, 0, ${opacity})`
  },

  // スムーズトランジション
  smoothTransition: (properties: string[], duration: string = animations.duration.normal) => {
    return properties
      .map(prop => `${prop} ${duration} ${animations.easing.elegant}`)
      .join(', ')
  }
} as const

// === デザインシステムメインエクスポート ===
export const professionalDesign = {
  colors: professionalColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  breakpoints,
  components,
  utils: designUtils
} as const

export type ProfessionalDesignSystem = typeof professionalDesign