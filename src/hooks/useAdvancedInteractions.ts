'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { ProcessedExperience } from '../types/experience'

// === インタラクション型定義 ===
interface KeyboardNavigationState {
  focusedIndex: number
  isNavigating: boolean
}

interface GestureState {
  isScrolling: boolean
  direction: 'up' | 'down' | 'left' | 'right' | null
  velocity: number
}

interface SmartSearchState {
  query: string
  suggestions: string[]
  recentSearches: string[]
  searchHistory: Array<{ query: string; timestamp: number; resultCount: number }>
}

interface FilterState {
  activeFilters: string[]
  quickFilters: Array<{ key: string; label: string; count: number }>
  savedFilters: Array<{ name: string; filters: string[]; query: string }>
}

// === フック定義 ===
export function useAdvancedInteractions(experiences: ProcessedExperience[]) {
  // === 基本ステート ===
  const [keyboardNav, setKeyboardNav] = useState<KeyboardNavigationState>({
    focusedIndex: -1,
    isNavigating: false
  })
  
  const [gestureState, setGestureState] = useState<GestureState>({
    isScrolling: false,
    direction: null,
    velocity: 0
  })
  
  const [smartSearch, setSmartSearch] = useState<SmartSearchState>({
    query: '',
    suggestions: [],
    recentSearches: [],
    searchHistory: []
  })
  
  const [filterState, setFilterState] = useState<FilterState>({
    activeFilters: [],
    quickFilters: [],
    savedFilters: []
  })

  // === Refs ===
  const containerRef = useRef<HTMLDivElement>(null)
  const lastTouchY = useRef<number>(0)
  const scrollVelocity = useRef<number>(0)
  const searchTimeout = useRef<NodeJS.Timeout>()

  // === キーボードナビゲーション ===
  const handleKeyboardNavigation = useCallback((event: KeyboardEvent) => {
    if (!experiences.length) return

    const { key, ctrlKey, metaKey, shiftKey } = event

    switch (key) {
      case 'ArrowDown':
        event.preventDefault()
        setKeyboardNav(prev => ({
          isNavigating: true,
          focusedIndex: Math.min(prev.focusedIndex + 1, experiences.length - 1)
        }))
        break

      case 'ArrowUp':
        event.preventDefault()
        setKeyboardNav(prev => ({
          isNavigating: true,
          focusedIndex: Math.max(prev.focusedIndex - 1, 0)
        }))
        break

      case 'Home':
        if (ctrlKey || metaKey) {
          event.preventDefault()
          setKeyboardNav({
            isNavigating: true,
            focusedIndex: 0
          })
        }
        break

      case 'End':
        if (ctrlKey || metaKey) {
          event.preventDefault()
          setKeyboardNav({
            isNavigating: true,
            focusedIndex: experiences.length - 1
          })
        }
        break

      case 'Enter':
      case ' ':
        if (keyboardNav.focusedIndex >= 0) {
          event.preventDefault()
          // フォーカスされたアイテムをアクティベート
          const focusedExperience = experiences[keyboardNav.focusedIndex]
          if (focusedExperience) {
            // カード展開やリンクを開くなどのアクション
            handleExperienceActivation(focusedExperience)
          }
        }
        break

      case 'Escape':
        setKeyboardNav({
          isNavigating: false,
          focusedIndex: -1
        })
        break

      case '/':
        if (!event.target || (event.target as HTMLElement).tagName !== 'INPUT') {
          event.preventDefault()
          // 検索フィールドにフォーカス
          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
          if (searchInput) {
            searchInput.focus()
          }
        }
        break
    }
  }, [experiences, keyboardNav.focusedIndex])

  // === ジェスチャー検出 ===
  const handleTouchStart = useCallback((event: TouchEvent) => {
    lastTouchY.current = event.touches[0].clientY
  }, [])

  const handleTouchMove = useCallback((event: TouchEvent) => {
    const currentY = event.touches[0].clientY
    const deltaY = lastTouchY.current - currentY
    
    // 速度計算
    scrollVelocity.current = Math.abs(deltaY)
    
    setGestureState(prev => ({
      ...prev,
      isScrolling: true,
      direction: deltaY > 0 ? 'up' : 'down',
      velocity: scrollVelocity.current
    }))
    
    lastTouchY.current = currentY
  }, [])

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => {
      setGestureState(prev => ({
        ...prev,
        isScrolling: false,
        direction: null,
        velocity: 0
      }))
    }, 150)
  }, [])

  // === スマート検索 ===
  const updateSearchSuggestions = useCallback((query: string) => {
    if (!query.trim()) {
      setSmartSearch(prev => ({ ...prev, suggestions: [] }))
      return
    }

    // 経験データから検索候補を生成
    const suggestions: string[] = []
    const lowerQuery = query.toLowerCase()

    experiences.forEach(exp => {
      // タイトルマッチ
      if (exp.title.toLowerCase().includes(lowerQuery) && !suggestions.includes(exp.title)) {
        suggestions.push(exp.title)
      }
      
      // 組織マッチ
      if (exp.organization && exp.organization.toLowerCase().includes(lowerQuery) && !suggestions.includes(exp.organization)) {
        suggestions.push(exp.organization)
      }
      
      // スキルマッチ
      exp.primarySkills.forEach(skill => {
        if (skill.toLowerCase().includes(lowerQuery) && !suggestions.includes(skill)) {
          suggestions.push(skill)
        }
      })
      
      // タグマッチ
      exp.tags?.forEach(tag => {
        if (tag.toLowerCase().includes(lowerQuery) && !suggestions.includes(tag)) {
          suggestions.push(tag)
        }
      })
    })

    setSmartSearch(prev => ({
      ...prev,
      suggestions: suggestions.slice(0, 8) // 最大8件
    }))
  }, [experiences])

  const handleSearch = useCallback((query: string) => {
    setSmartSearch(prev => ({
      ...prev,
      query
    }))

    // デバウンス処理
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }
    
    searchTimeout.current = setTimeout(() => {
      updateSearchSuggestions(query)
      
      // 検索履歴に追加
      if (query.trim()) {
        setSmartSearch(prev => ({
          ...prev,
          searchHistory: [
            {
              query: query.trim(),
              timestamp: Date.now(),
              resultCount: experiences.filter(exp => 
                exp.searchableText.includes(query.toLowerCase())
              ).length
            },
            ...prev.searchHistory.slice(0, 9) // 最大10件保持
          ]
        }))
      }
    }, 300)
  }, [experiences, updateSearchSuggestions])

  // === 高度なフィルタリング ===
  const generateQuickFilters = useCallback(() => {
    const filters = [
      {
        key: 'ongoing',
        label: '進行中',
        count: experiences.filter(exp => exp.status === 'ongoing').length
      },
      {
        key: 'completed',
        label: '完了',
        count: experiences.filter(exp => exp.status === 'completed').length
      },
      {
        key: 'featured',
        label: '注目',
        count: experiences.filter(exp => exp.featured).length
      },
      {
        key: 'recent',
        label: '最近',
        count: experiences.filter(exp => {
          const sixMonthsAgo = new Date()
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
          return exp.startDate >= sixMonthsAgo
        }).length
      }
    ]

    setFilterState(prev => ({
      ...prev,
      quickFilters: filters
    }))
  }, [experiences])

  const toggleFilter = useCallback((filterKey: string) => {
    setFilterState(prev => ({
      ...prev,
      activeFilters: prev.activeFilters.includes(filterKey)
        ? prev.activeFilters.filter(f => f !== filterKey)
        : [...prev.activeFilters, filterKey]
    }))
  }, [])

  // === 経験アクティベーション ===
  const handleExperienceActivation = useCallback((experience: ProcessedExperience) => {
    // プライマリリンクがある場合は開く
    const primaryLink = experience.links.find(link => link.primary)
    if (primaryLink) {
      window.open(primaryLink.url, '_blank', 'noopener,noreferrer')
    }
  }, [])

  // === パフォーマンス最適化 ===
  const debouncedScrollHandler = useCallback((callback: () => void, delay: number = 16) => {
    let timeoutId: NodeJS.Timeout
    return () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(callback, delay)
    }
  }, [])

  // === エフェクト ===
  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardNavigation)
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('keydown', handleKeyboardNavigation)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current)
      }
    }
  }, [handleKeyboardNavigation, handleTouchStart, handleTouchMove, handleTouchEnd])

  useEffect(() => {
    generateQuickFilters()
  }, [generateQuickFilters])

  // === ローカルストレージ同期 ===
  useEffect(() => {
    // 検索履歴をローカルストレージに保存
    const savedHistory = localStorage.getItem('experience-search-history')
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory)
        setSmartSearch(prev => ({ ...prev, searchHistory: history }))
      } catch (error) {
        console.warn('Failed to parse search history:', error)
      }
    }
  }, [])

  useEffect(() => {
    // 検索履歴をローカルストレージに保存
    if (smartSearch.searchHistory.length > 0) {
      localStorage.setItem('experience-search-history', JSON.stringify(smartSearch.searchHistory))
    }
  }, [smartSearch.searchHistory])

  // === 戻り値 ===
  return {
    // キーボードナビゲーション
    keyboardNav,
    setKeyboardFocus: (index: number) => setKeyboardNav({ isNavigating: true, focusedIndex: index }),
    clearKeyboardFocus: () => setKeyboardNav({ isNavigating: false, focusedIndex: -1 }),
    
    // ジェスチャー
    gestureState,
    containerRef,
    
    // スマート検索
    search: smartSearch,
    handleSearch,
    clearSearch: () => setSmartSearch(prev => ({ ...prev, query: '', suggestions: [] })),
    selectSuggestion: (suggestion: string) => {
      setSmartSearch(prev => ({ ...prev, query: suggestion, suggestions: [] }))
      handleSearch(suggestion)
    },
    
    // フィルタリング
    filters: filterState,
    toggleFilter,
    clearFilters: () => setFilterState(prev => ({ ...prev, activeFilters: [] })),
    
    // ユーティリティ
    handleExperienceActivation,
    debouncedScrollHandler,
    
    // パフォーマンス指標
    interactionMetrics: {
      totalKeyboardNavigations: keyboardNav.isNavigating ? 1 : 0,
      searchQueries: smartSearch.searchHistory.length,
      activeFilters: filterState.activeFilters.length,
      gestureInteractions: gestureState.isScrolling ? 1 : 0
    }
  }
}

// === カスタムフック：フォーカス管理 ===
export function useFocusManagement() {
  const [focusedElementId, setFocusedElementId] = useState<string | null>(null)
  
  const setFocus = useCallback((elementId: string) => {
    setFocusedElementId(elementId)
    const element = document.getElementById(elementId)
    if (element) {
      element.focus()
    }
  }, [])
  
  const clearFocus = useCallback(() => {
    setFocusedElementId(null)
  }, [])
  
  return {
    focusedElementId,
    setFocus,
    clearFocus
  }
}

// === カスタムフック：アニメーション状態管理 ===
export function useAnimationState() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationQueue, setAnimationQueue] = useState<string[]>([])
  
  const startAnimation = useCallback((animationId: string) => {
    setIsAnimating(true)
    setAnimationQueue(prev => [...prev, animationId])
  }, [])
  
  const endAnimation = useCallback((animationId: string) => {
    setAnimationQueue(prev => {
      const newQueue = prev.filter(id => id !== animationId)
      if (newQueue.length === 0) {
        setIsAnimating(false)
      }
      return newQueue
    })
  }, [])
  
  return {
    isAnimating,
    animationQueue,
    startAnimation,
    endAnimation
  }
}