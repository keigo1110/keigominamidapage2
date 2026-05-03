'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from '../../contexts/TranslationContext'
import type { Language } from '../../translations'
import {
  createAgentTargetHref,
  getAgentGuide,
  getAgentGuidesForRoute,
  type AgentGuide,
  type AgentGuideRequest,
  type AgentKnownRoute,
  type AgentSectionId,
  type AgentSuggestion,
} from './agentContent'
import type {
  AgentAnimation as BubbleAgentAnimation,
  AgentGuideMessage,
  UseAgentGuideResult as BubbleUseAgentGuideResult,
} from './types'

export interface UseAgentGuideOptions {
  language?: Language | string
  pathname?: string
  currentSectionId?: string | null
  initialGuideId?: string | null
}

export interface UseAgentGuideResult extends BubbleUseAgentGuideResult {
  guide: AgentGuide
  guideCount: number
  suggestions: AgentSuggestion[]
  selectedSuggestionId: string | null
  activeGuideId: string
  selectSuggestion: (suggestionId: string) => AgentSuggestion | undefined
  showNextGuide: () => void
  setGuideById: (guideId: string | null) => void
  resetGuide: () => void
  getSuggestionHref: (suggestion: Pick<AgentSuggestion, 'targetRoute' | 'targetHash'>) => string | undefined
  getTargetHref: (targetRoute?: AgentKnownRoute, targetHash?: AgentSectionId) => string | undefined
}

export function useAgentGuide(options: UseAgentGuideOptions = {}): UseAgentGuideResult {
  const pathnameFromRouter = usePathname()
  const { language: languageFromContext } = useTranslation()
  const {
    language = languageFromContext,
    pathname = pathnameFromRouter,
    currentSectionId,
    initialGuideId = null,
  } = options
  const [manualGuideId, setManualGuideId] = useState<string | null>(initialGuideId)
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<string | null>(null)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    setManualGuideId(initialGuideId)
    setSelectedSuggestionId(null)
    setMessageIndex(0)
  }, [currentSectionId, initialGuideId, language, pathname])

  const routeGuideRequest: AgentGuideRequest = useMemo(() => ({
    language,
    pathname,
    currentSectionId,
  }), [currentSectionId, language, pathname])

  const guide = useMemo(() => getAgentGuide({
    ...routeGuideRequest,
    guideId: manualGuideId,
  }), [manualGuideId, routeGuideRequest])

  const routeGuides = useMemo(
    () => getAgentGuidesForRoute(pathname, language),
    [language, pathname]
  )

  const orderedGuides = useMemo(() => {
    const guideMap = new Map<string, AgentGuide>()
    guideMap.set(guide.id, guide)

    routeGuides.forEach((routeGuide) => {
      if (!guideMap.has(routeGuide.id)) {
        guideMap.set(routeGuide.id, routeGuide)
      }
    })

    return [...guideMap.values()]
  }, [guide, routeGuides])

  const messages = useMemo(
    () => orderedGuides.map((orderedGuide) => toAgentGuideMessage(orderedGuide)),
    [orderedGuides]
  )

  const totalMessages = messages.length
  const currentIndex = totalMessages > 0 ? messageIndex % totalMessages : 0
  const currentMessage = messages[currentIndex] ?? toAgentGuideMessage(guide)
  const hasNext = totalMessages > 1 && currentIndex < totalMessages - 1

  const selectSuggestion = useCallback((suggestionId: string): AgentSuggestion | undefined => {
    const suggestion = guide.suggestions.find((candidate) => candidate.id === suggestionId)

    if (!suggestion) return undefined

    setSelectedSuggestionId(suggestion.id)
    setMessageIndex(0)

    if (suggestion.responseGuideId) {
      setManualGuideId(suggestion.responseGuideId)
    }

    return suggestion
  }, [guide.suggestions])

  const setGuideById = useCallback((guideId: string | null) => {
    setManualGuideId(guideId)
    setSelectedSuggestionId(null)
    setMessageIndex(0)
  }, [])

  const resetGuide = useCallback(() => {
    setManualGuideId(null)
    setSelectedSuggestionId(null)
    setMessageIndex(0)
  }, [])

  const nextMessage = useCallback(() => {
    setMessageIndex((currentMessageIndex) => {
      if (totalMessages <= 1) return 0
      return (currentMessageIndex + 1) % totalMessages
    })
  }, [totalMessages])

  const getTargetHref = useCallback((
    targetRoute?: AgentKnownRoute,
    targetHash?: AgentSectionId
  ) => createAgentTargetHref(targetRoute, targetHash), [])

  const getSuggestionHref = useCallback((
    suggestion: Pick<AgentSuggestion, 'targetRoute' | 'targetHash'>
  ) => getTargetHref(suggestion.targetRoute, suggestion.targetHash), [getTargetHref])

  return {
    currentMessage,
    currentIndex,
    totalMessages,
    guideCount: totalMessages,
    hasNext,
    nextMessage,
    showNextGuide: nextMessage,
    guide,
    suggestions: guide.suggestions,
    selectedSuggestionId,
    activeGuideId: guide.id,
    selectSuggestion,
    setGuideById,
    resetGuide,
    getSuggestionHref,
    getTargetHref,
  }
}

function toAgentGuideMessage(guide: AgentGuide): AgentGuideMessage {
  const targetHref = createAgentTargetHref(guide.targetRoute, guide.targetHash)

  return {
    id: guide.id,
    eyebrow: guide.title,
    title: guide.title ?? 'Portfolio guide',
    body: guide.message,
    ctaLabel: guide.targetHash ? undefined : guide.title,
    target: targetHref
      ? {
        href: guide.targetRoute,
        sectionId: guide.targetHash,
        label: guide.title ?? 'Portfolio section',
        ariaLabel: guide.title ? `Move to ${guide.title}` : 'Move to portfolio section',
      }
      : undefined,
    animation: toBubbleAnimation(guide.animation),
  }
}

function toBubbleAnimation(animation: AgentGuide['animation']): BubbleAgentAnimation {
  switch (animation) {
    case 'walk':
      return 'walk'
    case 'wave':
    case 'celebrate':
      return 'wave'
    case 'think':
      return 'thinking'
    case 'talk':
      return 'talk'
    case 'idle':
      return 'idle'
  }
}
