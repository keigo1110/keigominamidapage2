/**
 * Professional Animation System
 * プロフェッショナルレベルのアニメーションシステム
 */

import { Variants, Transition } from 'framer-motion'

// === イージング関数 ===
export const easings = {
  // 標準イージング
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],

  // カスタムイージング（プロフェッショナル用）
  smooth: [0.4, 0.0, 0.2, 1],          // Google Material Design
  snappy: [0.4, 0.0, 0.6, 1],          // iOS インターフェース
  elegant: [0.25, 0.46, 0.45, 0.94],   // エレガントな動き
  bounce: [0.68, -0.55, 0.265, 1.55],  // バウンス効果
  spring: [0.175, 0.885, 0.32, 1.275], // スプリング効果
  dramatic: [0.77, 0, 0.175, 1],       // ドラマチック
  gentle: [0.165, 0.84, 0.44, 1],      // 穏やかな動き
  swift: [0.55, 0.085, 0.68, 0.53],    // 素早い動き
  precise: [0.645, 0.045, 0.355, 1],   // 精密な動き
  expressive: [0.23, 1, 0.32, 1]       // 表現豊かな動き
} as const

// === デュレーション設定 ===
export const durations = {
  instant: 0,
  micro: 0.1,      // マイクロインタラクション
  fast: 0.2,       // 高速アニメーション
  quick: 0.3,      // クイックトランジション
  normal: 0.4,     // 標準的なアニメーション
  medium: 0.5,     // 中程度のアニメーション
  slow: 0.6,       // ゆっくりとしたアニメーション
  slower: 0.8,     // より遅いアニメーション
  dramatic: 1.0,   // ドラマチックなアニメーション
  cinematic: 1.2   // 映画的なアニメーション
} as const

// === 遅延設定 ===
export const delays = {
  none: 0,
  micro: 0.05,
  tiny: 0.1,
  small: 0.15,
  medium: 0.2,
  large: 0.3,
  huge: 0.5
} as const

// === ステージャード（段階的）アニメーション ===
export const staggered = {
  // 子要素を順次アニメーション
  container: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  },

  // 高速ステージャー
  fast: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  },

  // エレガントなステージャー
  elegant: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }
}

// === フェードアニメーション ===
export const fadeAnimations = {
  // 基本フェード
  fadeIn: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: durations.normal, ease: easings.elegant }
    },
    exit: {
      opacity: 0,
      transition: { duration: durations.fast, ease: easings.smooth }
    }
  } as Variants,

  // フェードアップ
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: durations.medium, ease: easings.elegant }
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: durations.fast, ease: easings.smooth }
    }
  } as Variants,

  // フェードダウン
  fadeDown: {
    initial: { opacity: 0, y: -30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: durations.medium, ease: easings.elegant }
    },
    exit: {
      opacity: 0,
      y: 30,
      transition: { duration: durations.fast, ease: easings.smooth }
    }
  } as Variants,

  // フェードレフト
  fadeLeft: {
    initial: { opacity: 0, x: 30 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: durations.medium, ease: easings.elegant }
    },
    exit: {
      opacity: 0,
      x: -30,
      transition: { duration: durations.fast, ease: easings.smooth }
    }
  } as Variants,

  // フェードライト
  fadeRight: {
    initial: { opacity: 0, x: -30 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: durations.medium, ease: easings.elegant }
    },
    exit: {
      opacity: 0,
      x: 30,
      transition: { duration: durations.fast, ease: easings.smooth }
    }
  } as Variants
}

// === スケールアニメーション ===
export const scaleAnimations = {
  // 基本スケール
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: durations.medium, ease: easings.spring }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: durations.fast, ease: easings.smooth }
    }
  } as Variants,

  // エレガントスケール
  scaleElegant: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: durations.slow, ease: easings.elegant }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: { duration: durations.normal, ease: easings.smooth }
    }
  } as Variants,

  // バウンススケール
  scaleBounce: {
    initial: { opacity: 0, scale: 0.3 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: durations.dramatic, ease: easings.bounce }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: durations.fast, ease: easings.smooth }
    }
  } as Variants
}

// === スライドアニメーション ===
export const slideAnimations = {
  // 上からスライド
  slideFromTop: {
    initial: { y: '-100%', opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: durations.medium, ease: easings.elegant }
    },
    exit: {
      y: '-100%',
      opacity: 0,
      transition: { duration: durations.fast, ease: easings.smooth }
    }
  } as Variants,

  // 下からスライド
  slideFromBottom: {
    initial: { y: '100%', opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: durations.medium, ease: easings.elegant }
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: { duration: durations.fast, ease: easings.smooth }
    }
  } as Variants,

  // 左からスライド
  slideFromLeft: {
    initial: { x: '-100%', opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: durations.medium, ease: easings.elegant }
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: { duration: durations.fast, ease: easings.smooth }
    }
  } as Variants,

  // 右からスライド
  slideFromRight: {
    initial: { x: '100%', opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: durations.medium, ease: easings.elegant }
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: { duration: durations.fast, ease: easings.smooth }
    }
  } as Variants
}

// === ホバーアニメーション ===
export const hoverAnimations = {
  // 浮上効果
  lift: {
    y: -8,
    scale: 1.02,
    transition: { duration: durations.quick, ease: easings.elegant }
  },

  // 軽い浮上
  gentleLift: {
    y: -4,
    scale: 1.01,
    transition: { duration: durations.quick, ease: easings.gentle }
  },

  // スケール
  scale: {
    scale: 1.05,
    transition: { duration: durations.quick, ease: easings.spring }
  },

  // 軽いスケール
  gentleScale: {
    scale: 1.02,
    transition: { duration: durations.quick, ease: easings.smooth }
  },

  // シャドウ強化
  shadowEnhance: {
    boxShadow: "0 20px 40px -8px rgba(0, 0, 0, 0.15)",
    transition: { duration: durations.quick, ease: easings.elegant }
  },

  // グロー効果
  glow: {
    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
    transition: { duration: durations.quick, ease: easings.smooth }
  }
}

// === フォーカスアニメーション ===
export const focusAnimations = {
  ring: {
    boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.3)",
    transition: { duration: durations.fast, ease: easings.smooth }
  },

  scale: {
    scale: 1.02,
    transition: { duration: durations.fast, ease: easings.smooth }
  }
}

// === カスタムトランジション ===
export const transitions = {
  // スムーズ
  smooth: {
    duration: durations.normal,
    ease: easings.smooth
  } as Transition,

  // エレガント
  elegant: {
    duration: durations.medium,
    ease: easings.elegant
  } as Transition,

  // スプリング
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30
  } as Transition,

  // バウンス
  bounce: {
    duration: durations.dramatic,
    ease: easings.bounce
  } as Transition,

  // 遅延付きスムーズ
  smoothDelayed: (delay: number = delays.small) => ({
    duration: durations.normal,
    ease: easings.smooth,
    delay
  }) as Transition,

  // ステージャード用
  stagger: (index: number, baseDelay: number = delays.small) => ({
    duration: durations.medium,
    ease: easings.elegant,
    delay: baseDelay + (index * delays.micro)
  }) as Transition
}

// === アニメーション組み合わせ ===
export const combinedAnimations = {
    // フェード + スケール + 上昇
  sophisticated: {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: 30
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: durations.slow,
        ease: easings.elegant
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -30,
      transition: {
        duration: durations.normal,
        ease: easings.smooth
      }
    }
  } as Variants,

    // ドラマチック登場
  dramatic: {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: -15
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: durations.dramatic,
        ease: easings.spring
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -30,
      transition: {
        duration: durations.medium,
        ease: easings.smooth
      }
    }
  } as Variants,

  // 微妙な登場
  subtle: {
    initial: {
      opacity: 0,
      y: 10,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: durations.normal,
        ease: easings.gentle
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: durations.fast,
        ease: easings.smooth
      }
    }
  } as Variants
}

// === ユーティリティ関数 ===
export const animationUtils = {
  // 遅延を生成
  generateDelay: (index: number, baseDelay: number = delays.small, increment: number = delays.micro) => {
    return baseDelay + (index * increment)
  },

  // ステージャードバリアンツを生成
  createStaggered: (staggerDelay: number = 0.1, delayChildren: number = 0.2) => ({
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: staggerDelay / 2,
        staggerDirection: -1
      }
    }
  }),

  // レスポンシブデュレーション
  responsiveDuration: (mobile: number, tablet?: number, desktop?: number) => {
    if (typeof window === 'undefined') return mobile

    const width = window.innerWidth
    if (width >= 1024) return desktop || tablet || mobile
    if (width >= 768) return tablet || mobile
    return mobile
  },

  // モーション設定を軽減（パフォーマンス配慮）
  reduceMotion: (animation: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return {
        initial: animation.animate,
        animate: animation.animate,
        exit: animation.animate,
        transition: { duration: 0 }
      }
    }
    return animation
  }
}

// === エクスポート ===
export const professionalAnimations = {
  easings,
  durations,
  delays,
  staggered,
  fade: fadeAnimations,
  scale: scaleAnimations,
  slide: slideAnimations,
  hover: hoverAnimations,
  focus: focusAnimations,
  transitions,
  combined: combinedAnimations,
  utils: animationUtils
} as const

export type ProfessionalAnimations = typeof professionalAnimations