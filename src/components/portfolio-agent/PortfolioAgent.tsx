'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, MapPin, Sparkles, X } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useTranslation } from '../../contexts/TranslationContext'
import type { Language } from '../../translations'
import {
  getAgentGuidesForRoute,
  type AgentAnimation,
  type AgentKnownRoute,
  type AgentMood,
  type AgentSectionId,
} from './agentContent'
import { SpriteCharacter } from './SpriteCharacter'
import type { SpriteAnimationName, SpriteDirection } from './spriteConfig'
import { useAgentGuide } from './useAgentGuide'
import { useAgentPosition } from './useAgentPosition'
import type { AgentCoordinates } from './useAgentPosition'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface LocalizedLabels {
  guideName: string
  open: string
  close: string
  react: string
  next: string
  navigate: string
  suggestions: string
  progress: (current: number, total: number) => string
  mood: Record<AgentMood, string>
}

const localizedLabels = {
  en: {
    guideName: 'Rota',
    open: 'Open portfolio guide',
    close: 'Close portfolio guide',
    react: 'React with portfolio guide',
    next: 'Next message',
    navigate: 'Show this part',
    suggestions: 'Suggested paths',
    progress: (current, total) => `${current} / ${total}`,
    mood: {
      friendly: 'Guide',
      focused: 'Focus',
      curious: 'Context',
      excited: 'Highlight',
      thoughtful: 'Thought',
    },
  },
  ja: {
    guideName: 'Rota',
    open: 'ポートフォリオ案内を開く',
    close: 'ポートフォリオ案内を閉じる',
    react: 'ポートフォリオ案内キャラクターにリアクションする',
    next: '次のメッセージ',
    navigate: 'ここを見る',
    suggestions: 'おすすめ導線',
    progress: (current, total) => `${current} / ${total}`,
    mood: {
      friendly: '案内',
      focused: '要点',
      curious: '文脈',
      excited: '注目',
      thoughtful: '整理',
    },
  },
} as const satisfies Record<Language, LocalizedLabels>

function buildHref(route: AgentKnownRoute, hash?: AgentSectionId): string {
  return hash ? `${route}#${hash}` : route
}

function mapAgentAnimation(
  animation: AgentAnimation,
  isOpen: boolean,
  isWalking: boolean,
  isReacting: boolean,
  reactionAnimation: SpriteAnimationName | null,
): SpriteAnimationName {
  if (isWalking) return 'walk'
  if (reactionAnimation) return reactionAnimation
  if (isReacting) return 'wave'
  if (!isOpen) return 'idle'

  switch (animation) {
    case 'celebrate':
      return 'celebrate'
    case 'think':
      return 'think'
    case 'talk':
      return 'talk'
    case 'walk':
      return 'walk'
    case 'wave':
      return 'wave'
    case 'idle':
      return 'talk'
  }

  return 'idle'
}

function getFacingFromDeltaX(deltaX: number): SpriteDirection | null {
  if (Math.abs(deltaX) <= 2) return null
  return deltaX < 0 ? 'left' : 'right'
}

const DRAG_THRESHOLD_PX = 4
const ZERO_OFFSET: AgentCoordinates = { x: 0, y: 0 }
const CLICK_REACTION_SEQUENCE = ['wave', 'celebrate', 'think', 'talk', 'cast'] as const satisfies readonly SpriteAnimationName[]

export function PortfolioAgent() {
  const panelId = useId()
  const router = useRouter()
  const pathname = usePathname()
  const { language } = useTranslation()
  const { isDark } = useTheme()
  const prefersReducedMotion = usePrefersReducedMotion()
  const characterReactionTimerRef = useRef<number | null>(null)
  const characterReactionIndexRef = useRef(0)
  const dragClickGuardTimerRef = useRef<number | null>(null)
  const dragSessionRef = useRef<{
    pointerId: number
    startX: number
    startY: number
  } | null>(null)
  const didDragRef = useRef(false)
  const {
    guide,
    suggestions,
    selectedSuggestionId,
    activeGuideId,
    selectSuggestion,
    setGuideById,
  } = useAgentGuide({ language, pathname })
  const routeGuides = useMemo(
    () => getAgentGuidesForRoute(pathname, language),
    [language, pathname],
  )
  const [isOpen, setIsOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState<AgentCoordinates>(ZERO_OFFSET)
  const [dragFacing, setDragFacing] = useState<SpriteDirection | null>(null)
  const [characterReactionAnimation, setCharacterReactionAnimation] = useState<SpriteAnimationName | null>(null)
  const {
    position,
    facing,
    isReady,
    isWalking,
    isReacting,
    characterSize,
    containerStyle,
    moveBy,
    reactToInteraction,
  } = useAgentPosition({
    bubbleOpen: isOpen,
    reducedMotion: prefersReducedMotion,
  })

  const labels = localizedLabels[language]
  const guideCount = Math.max(routeGuides.length, 1)
  const activeGuideIndex = Math.max(
    routeGuides.findIndex((routeGuide) => routeGuide.id === activeGuideId),
    0,
  )
  const activeAnimation = mapAgentAnimation(
    guide.animation,
    isOpen,
    isWalking || isDragging,
    isReacting,
    characterReactionAnimation,
  )
  const activeFacing = dragFacing ?? facing
  const displayedPosition = {
    x: position.x + dragOffset.x,
    y: position.y + dragOffset.y,
  }

  useEffect(() => {
    return () => {
      if (characterReactionTimerRef.current !== null) {
        window.clearTimeout(characterReactionTimerRef.current)
      }

      if (dragClickGuardTimerRef.current !== null) {
        window.clearTimeout(dragClickGuardTimerRef.current)
      }
    }
  }, [])

  const triggerCharacterReaction = useCallback(() => {
    if (characterReactionTimerRef.current !== null) {
      window.clearTimeout(characterReactionTimerRef.current)
    }

    const reactionAnimation = CLICK_REACTION_SEQUENCE[
      characterReactionIndexRef.current % CLICK_REACTION_SEQUENCE.length
    ] ?? 'wave'
    characterReactionIndexRef.current += 1

    setCharacterReactionAnimation(reactionAnimation)
    characterReactionTimerRef.current = window.setTimeout(() => {
      setCharacterReactionAnimation(null)
      characterReactionTimerRef.current = null
    }, prefersReducedMotion ? 240 : 860)
  }, [prefersReducedMotion])

  const navigateTo = useCallback((route: AgentKnownRoute, hash?: AgentSectionId) => {
    const targetHref = buildHref(route, hash)

    if (pathname === route && hash) {
      document.getElementById(hash)?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
      return
    }

    router.push(targetHref)
  }, [pathname, prefersReducedMotion, router])

  const handleCharacterClick = useCallback(() => {
    if (didDragRef.current) {
      didDragRef.current = false
      return
    }

    triggerCharacterReaction()
    setIsOpen(true)
  }, [triggerCharacterReaction])

  const resetDragState = useCallback(() => {
    dragSessionRef.current = null
    setIsDragging(false)
    setDragOffset(ZERO_OFFSET)
    setDragFacing(null)
  }, [])

  const getPointerDelta = useCallback((event: ReactPointerEvent<HTMLButtonElement>): AgentCoordinates | null => {
    const dragSession = dragSessionRef.current
    if (!dragSession || dragSession.pointerId !== event.pointerId) return null

    return {
      x: event.clientX - dragSession.startX,
      y: event.clientY - dragSession.startY,
    }
  }, [])

  const handleCharacterPointerDown = useCallback((event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    if (dragClickGuardTimerRef.current !== null) {
      window.clearTimeout(dragClickGuardTimerRef.current)
    }

    dragSessionRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    }
    setDragOffset(ZERO_OFFSET)
    setDragFacing(null)

    event.currentTarget.setPointerCapture(event.pointerId)
  }, [])

  const handleCharacterPointerMove = useCallback((event: ReactPointerEvent<HTMLButtonElement>) => {
    const pointerDelta = getPointerDelta(event)
    if (!pointerDelta) return

    const movedEnoughToDrag = Math.hypot(pointerDelta.x, pointerDelta.y) > DRAG_THRESHOLD_PX
    if (!movedEnoughToDrag) return

    setIsDragging(true)
    setDragOffset(pointerDelta)
    setDragFacing((currentFacing) => getFacingFromDeltaX(pointerDelta.x) ?? currentFacing)
  }, [getPointerDelta])

  const handleCharacterPointerUp = useCallback((event: ReactPointerEvent<HTMLButtonElement>) => {
    const pointerDelta = getPointerDelta(event)
    if (!pointerDelta) {
      resetDragState()
      return
    }

    const movedEnoughToDrag = Math.hypot(pointerDelta.x, pointerDelta.y) > DRAG_THRESHOLD_PX
    didDragRef.current = movedEnoughToDrag

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    resetDragState()

    if (movedEnoughToDrag) {
      dragClickGuardTimerRef.current = window.setTimeout(() => {
        didDragRef.current = false
        dragClickGuardTimerRef.current = null
      }, 200)

      moveBy(pointerDelta)
    }
  }, [getPointerDelta, moveBy, resetDragState])

  const handleCharacterPointerCancel = useCallback((event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    resetDragState()
  }, [resetDragState])

  const handleSuggestionClick = useCallback((suggestionId: string) => {
    const suggestion = selectSuggestion(suggestionId)
    if (!suggestion) return

    reactToInteraction()
    setIsOpen(true)

    if (!suggestion.responseGuideId && suggestion.targetRoute) {
      navigateTo(suggestion.targetRoute, suggestion.targetHash)
      setIsOpen(false)
    }
  }, [navigateTo, reactToInteraction, selectSuggestion])

  const handleNextGuide = useCallback(() => {
    if (routeGuides.length <= 1) return

    const nextGuide = routeGuides[(activeGuideIndex + 1) % routeGuides.length]
    if (!nextGuide) return

    setGuideById(nextGuide.id)
    setIsOpen(true)
    reactToInteraction()
  }, [activeGuideIndex, reactToInteraction, routeGuides, setGuideById])

  const handleNavigateToTarget = useCallback(() => {
    navigateTo(guide.targetRoute, guide.targetHash)
    setIsOpen(false)
    reactToInteraction()
  }, [guide.targetHash, guide.targetRoute, navigateTo, reactToInteraction])

  if (!isReady) {
    return null
  }

  const shellClassName = isOpen ? 'z-40' : 'z-30'
  const panelClassName = isDark
    ? 'border-white/10 bg-black/90 text-[#F5F5F7] shadow-black/40'
    : 'border-black/10 bg-white/95 text-[#1D1D1F] shadow-black/20'
  const secondaryTextClassName = 'text-[#86868B]'
  const dividerClassName = isDark ? 'border-white/10' : 'border-black/10'
  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: 'easeOut' }
  const travelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 260, damping: 26, mass: 0.8 }

  return (
    <motion.aside
      className={`pointer-events-none fixed left-0 top-0 ${shellClassName}`}
      style={containerStyle}
      aria-label={labels.open}
      initial={false}
      animate={{
        x: displayedPosition.x,
        y: displayedPosition.y,
        scale: isReacting && !prefersReducedMotion ? 1.025 : 1,
      }}
      transition={isDragging ? { duration: 0 } : travelTransition}
    >
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            id={panelId}
            key="portfolio-agent-panel"
            role="region"
            aria-live="polite"
            aria-label={labels.open}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={panelTransition}
            className={`pointer-events-auto absolute bottom-[calc(100%+0.75rem)] right-0 w-[min(20rem,calc(100vw-1.5rem))] max-h-[44vh] overflow-hidden rounded-[8px] border shadow-2xl backdrop-blur-xl ${panelClassName}`}
          >
            <div className="flex max-h-[44vh] flex-col">
              <div className={`flex items-center justify-between border-b px-3 py-2 ${dividerClassName}`}>
                <div className="flex min-w-0 items-center gap-2">
                  <Sparkles
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 ${isDark ? 'text-[#2997FF]' : 'text-[#0071E3]'}`}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold tracking-normal">{labels.guideName}</p>
                    <p className={`text-xs tracking-normal ${secondaryTextClassName}`}>
                      {labels.mood[guide.mood]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                    }}
                    className={`rounded-[8px] p-2 transition-colors ${
                      isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                    }`}
                    aria-label={labels.close}
                    aria-controls={panelId}
                  >
                    <X aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto px-3 py-3">
                {guide.title && (
                  <h2 className="mb-2 text-sm font-semibold leading-snug tracking-normal">
                    {guide.title}
                  </h2>
                )}
                <p className={`text-sm leading-relaxed tracking-normal ${secondaryTextClassName}`}>
                  {guide.message}
                </p>

                {suggestions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2" aria-label={labels.suggestions}>
                    {suggestions.slice(0, 3).map((suggestion) => {
                      const isSelected = suggestion.id === selectedSuggestionId

                      return (
                        <button
                          key={suggestion.id}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion.id)}
                          className={`rounded-[8px] px-2.5 py-1.5 text-xs font-medium tracking-normal transition-colors ${
                            isSelected
                              ? isDark
                                ? 'bg-[#2997FF]/20 text-[#2997FF]'
                                : 'bg-[#0071E3]/10 text-[#0071E3]'
                              : isDark
                                ? 'bg-white/10 text-[#F5F5F7] hover:bg-white/20'
                                : 'bg-black/5 text-[#1D1D1F] hover:bg-black/10'
                          }`}
                        >
                          {suggestion.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className={`flex items-center justify-between gap-2 border-t px-3 py-2 ${dividerClassName}`}>
                <button
                  type="button"
                  onClick={handleNavigateToTarget}
                  className={`inline-flex min-h-10 items-center gap-1.5 rounded-[8px] px-2.5 py-2 text-xs font-semibold tracking-normal transition-colors ${
                    isDark
                      ? 'bg-[#2997FF]/20 text-[#2997FF] hover:bg-[#2997FF]/30'
                      : 'bg-[#0071E3]/10 text-[#0071E3] hover:bg-[#0071E3]/20'
                  }`}
                >
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                  <span>{labels.navigate}</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className={`text-xs tracking-normal ${secondaryTextClassName}`}>
                    {labels.progress(activeGuideIndex + 1, guideCount)}
                  </span>
                  {guideCount > 1 && (
                    <button
                      type="button"
                      onClick={handleNextGuide}
                      className={`inline-flex min-h-10 items-center gap-1.5 rounded-[8px] px-2.5 py-2 text-xs font-semibold tracking-normal transition-colors ${
                        isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                      }`}
                      aria-label={labels.next}
                    >
                      <span>{labels.next}</span>
                      <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleCharacterClick}
        onPointerDown={handleCharacterPointerDown}
        onPointerMove={handleCharacterPointerMove}
        onPointerUp={handleCharacterPointerUp}
        onPointerCancel={handleCharacterPointerCancel}
        className="pointer-events-auto absolute inset-0 flex items-center justify-center rounded-[8px] p-0.5 outline-none transition-transform hover:scale-[1.02] active:scale-[0.98]"
        aria-label={isOpen ? labels.react : labels.open}
        aria-controls={panelId}
        aria-expanded={isOpen}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
      >
        <SpriteCharacter
          animation={activeAnimation}
          direction={activeFacing}
          size={characterSize}
          ariaLabel={labels.guideName}
        />
      </motion.button>
    </motion.aside>
  )
}
