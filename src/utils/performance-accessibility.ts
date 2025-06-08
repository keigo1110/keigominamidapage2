/**
 * Performance & Accessibility Optimization Utils
 * パフォーマンス最適化とアクセシビリティ強化ユーティリティ
 */

import { useMemo, useCallback, useRef, useEffect, useState } from 'react'
import { ProcessedExperience } from '../types/experience'

// === パフォーマンス最適化 ===

// メモ化されたフィルタリング関数
export const useOptimizedFiltering = (
  experiences: ProcessedExperience[],
  searchQuery: string,
  activeFilters: string[],
  sortMode: string
) => {
  return useMemo(() => {
    let filtered = [...experiences]

    // 検索フィルター（最適化されたアルゴリズム）
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      const searchTerms = query.split(' ').filter(term => term.length > 0)
      
      filtered = filtered.filter(exp => {
        const searchText = exp.searchableText
        return searchTerms.every(term => searchText.includes(term))
      })
    }

    // アクティブフィルター適用
    if (activeFilters.length > 0) {
      filtered = filtered.filter(exp => {
        return activeFilters.every(filter => {
          switch (filter) {
            case 'ongoing': return exp.status === 'ongoing'
            case 'completed': return exp.status === 'completed'
            case 'featured': return exp.featured === true
            case 'recent': {
              const sixMonthsAgo = new Date()
              sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
              return exp.startDate >= sixMonthsAgo
            }
            default: return true
          }
        })
      })
    }

    // ソート（最適化された比較関数）
    filtered.sort((a, b) => {
      switch (sortMode) {
        case 'date':
          return b.startDate.getTime() - a.startDate.getTime()
        case 'priority': {
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        }
        case 'duration':
          return b.duration.totalMonths - a.duration.totalMonths
        case 'impact': {
          const impactOrder = { transformative: 4, significant: 3, moderate: 2, supporting: 1 }
          return impactOrder[b.impactLevel] - impactOrder[a.impactLevel]
        }
        default:
          return 0
      }
    })

    return filtered
  }, [experiences, searchQuery, activeFilters, sortMode])
}

// 遅延ローディング用のIntersection Observer
export const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
  }, [options])

  return { targetRef, isIntersecting }
}

// パフォーマンス指標測定
export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    interactionTime: 0,
    searchTime: 0,
    filterTime: 0
  })

  const measureRender = useCallback(() => {
    const start = performance.now()
    return () => {
      const end = performance.now()
      setMetrics(prev => ({ ...prev, renderTime: end - start }))
    }
  }, [])

  const measureInteraction = useCallback(() => {
    const start = performance.now()
    return () => {
      const end = performance.now()
      setMetrics(prev => ({ ...prev, interactionTime: end - start }))
    }
  }, [])

  const measureSearch = useCallback(() => {
    const start = performance.now()
    return () => {
      const end = performance.now()
      setMetrics(prev => ({ ...prev, searchTime: end - start }))
    }
  }, [])

  const measureFilter = useCallback(() => {
    const start = performance.now()
    return () => {
      const end = performance.now()
      setMetrics(prev => ({ ...prev, filterTime: end - start }))
    }
  }, [])

  return {
    metrics,
    measureRender,
    measureInteraction,
    measureSearch,
    measureFilter
  }
}

// デバウンス最適化
export const useOptimizedDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  maxWait?: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const maxTimeoutRef = useRef<NodeJS.Timeout>()
  const lastCallTimeRef = useRef<number>(0)

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()

      // 通常のデバウンス
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // 最大待機時間のチェック
      if (maxWait && now - lastCallTimeRef.current >= maxWait) {
        callback(...args)
        lastCallTimeRef.current = now
        return
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
        lastCallTimeRef.current = Date.now()
      }, delay)
    },
    [callback, delay, maxWait]
  )
}

// === アクセシビリティ強化 ===

// ARIA属性生成
export const generateAriaAttributes = (
  experience: ProcessedExperience,
  index: number,
  total: number,
  isExpanded?: boolean,
  isFocused?: boolean
) => {
  return {
    // 基本属性
    role: 'article',
    'aria-label': `${experience.title} - ${experience.position} at ${experience.organization}`,
    'aria-describedby': `experience-${experience.id}-description`,
    'aria-posinset': index + 1,
    'aria-setsize': total,
    
    // 状態属性
    'aria-expanded': isExpanded,
    'aria-selected': isFocused,
    'aria-current': experience.isActive ? 'page' : undefined,
    
    // 対話属性
    tabIndex: isFocused ? 0 : -1,
    'aria-keyshortcuts': 'Enter Space',
    
    // 追加情報
    'aria-label-extended': [
      `${experience.title}`,
      `役職: ${experience.position}`,
      experience.organization && `組織: ${experience.organization}`,
      `期間: ${experience.displayDate}`,
      `ステータス: ${experience.status === 'ongoing' ? '進行中' : '完了'}`,
      experience.featured && '注目プロジェクト',
      `${experience.links.length}個のリンク`,
      experience.achievements && `${experience.achievements.length}個の実績`
    ].filter(Boolean).join(', ')
  }
}

// キーボードナビゲーション属性
export const generateKeyboardNavigationAttributes = (
  hasNext: boolean,
  hasPrevious: boolean,
  isFirst: boolean,
  isLast: boolean
) => {
  const shortcuts = []
  
  if (hasPrevious) shortcuts.push('ArrowUp: 前の項目')
  if (hasNext) shortcuts.push('ArrowDown: 次の項目')
  if (isFirst) shortcuts.push('End: 最後の項目へ')
  if (isLast) shortcuts.push('Home: 最初の項目へ')
  shortcuts.push('Enter/Space: 項目を開く')
  shortcuts.push('Escape: フォーカスを解除')

  return {
    'aria-keyshortcuts': shortcuts.join(', '),
    'data-keyboard-help': shortcuts.join('\n')
  }
}

// フォーカス管理
export const useFocusManager = (itemCount: number) => {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // 参照の初期化
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, itemCount)
  }, [itemCount])

  const setItemRef = useCallback((index: number) => (ref: HTMLDivElement | null) => {
    itemRefs.current[index] = ref
  }, [])

  const focusItem = useCallback((index: number) => {
    if (index >= 0 && index < itemCount) {
      setFocusedIndex(index)
      const item = itemRefs.current[index]
      if (item) {
        item.focus()
        item.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
      }
    }
  }, [itemCount])

  const focusNext = useCallback(() => {
    focusItem(Math.min(focusedIndex + 1, itemCount - 1))
  }, [focusedIndex, itemCount, focusItem])

  const focusPrevious = useCallback(() => {
    focusItem(Math.max(focusedIndex - 1, 0))
  }, [focusedIndex, focusItem])

  const focusFirst = useCallback(() => {
    focusItem(0)
  }, [focusItem])

  const focusLast = useCallback(() => {
    focusItem(itemCount - 1)
  }, [itemCount, focusItem])

  const clearFocus = useCallback(() => {
    setFocusedIndex(-1)
  }, [])

  return {
    focusedIndex,
    setItemRef,
    focusItem,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    clearFocus
  }
}

// スクリーンリーダー向けライブリージョン
export const useLiveRegion = () => {
  const [message, setMessage] = useState('')
  const [politeness, setPoliteness] = useState<'polite' | 'assertive'>('polite')

  const announce = useCallback((
    text: string, 
    priority: 'polite' | 'assertive' = 'polite',
    delay: number = 100
  ) => {
    // 前のメッセージをクリア
    setMessage('')
    setPoliteness(priority)
    
    // 短い遅延後にメッセージを設定（スクリーンリーダーが確実に読み取るため）
    setTimeout(() => {
      setMessage(text)
    }, delay)
    
    // 一定時間後にメッセージをクリア
    setTimeout(() => {
      setMessage('')
    }, delay + 3000)
  }, [])

  const announceSearchResults = useCallback((count: number, query: string) => {
    const message = query.trim() 
      ? `検索結果: "${query}" で ${count} 件の経歴が見つかりました`
      : `${count} 件の経歴を表示しています`
    announce(message, 'polite')
  }, [announce])

  const announceFilterResults = useCallback((count: number, filters: string[]) => {
    const filterText = filters.length > 0 
      ? `フィルター "${filters.join(', ')}" で`
      : ''
    const message = `${filterText} ${count} 件の経歴を表示しています`
    announce(message, 'polite')
  }, [announce])

  const announceSort = useCallback((sortMode: string) => {
    const sortLabels: Record<string, string> = {
      date: '日付順',
      priority: '優先度順',
      duration: '期間順',
      impact: 'インパクト順'
    }
    const message = `経歴を${sortLabels[sortMode] || sortMode}でソートしました`
    announce(message, 'polite')
  }, [announce])

  return {
    message,
    politeness,
    announce,
    announceSearchResults,
    announceFilterResults,
    announceSort
  }
}

// カラーコントラスト検証
export const validateColorContrast = (
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
) => {
  // RGB値を抽出
  const getRGB = (color: string) => {
    const hex = color.replace('#', '')
    return {
      r: parseInt(hex.substr(0, 2), 16),
      g: parseInt(hex.substr(2, 2), 16),
      b: parseInt(hex.substr(4, 2), 16)
    }
  }

  // 相対輝度を計算
  const getLuminance = (rgb: { r: number; g: number; b: number }) => {
    const { r, g, b } = rgb
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  try {
    const fgLum = getLuminance(getRGB(foreground))
    const bgLum = getLuminance(getRGB(background))
    
    const contrast = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05)
    
    const requirements = {
      AA: 4.5,
      AAA: 7
    }
    
    return {
      ratio: contrast,
      passes: contrast >= requirements[level],
      level,
      grade: contrast >= 7 ? 'AAA' : contrast >= 4.5 ? 'AA' : 'Fail'
    }
  } catch (error) {
    return {
      ratio: 0,
      passes: false,
      level,
      grade: 'Error' as const
    }
  }
}

// レスポンシブブレークポイント検出
export const useResponsiveBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md')

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width < 640) setBreakpoint('xs')
      else if (width < 768) setBreakpoint('sm')
      else if (width < 1024) setBreakpoint('md')
      else if (width < 1280) setBreakpoint('lg')
      else if (width < 1536) setBreakpoint('xl')
      else setBreakpoint('2xl')
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return breakpoint
}

// === エクスポート ===
export const performanceAccessibility = {
  // パフォーマンス
  useOptimizedFiltering,
  useIntersectionObserver,
  usePerformanceMetrics,
  useOptimizedDebounce,
  
  // アクセシビリティ
  generateAriaAttributes,
  generateKeyboardNavigationAttributes,
  useFocusManager,
  useLiveRegion,
  validateColorContrast,
  useResponsiveBreakpoint
} as const