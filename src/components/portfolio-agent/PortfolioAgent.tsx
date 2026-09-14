'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { FormEvent, PointerEvent as ReactPointerEvent } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, Send, X } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useTranslation } from '../../contexts/TranslationContext'
import type { Language } from '../../translations'
import {
  getAllAgentGuides,
  type AgentGuide,
  type AgentAnimation,
  type AgentKnownRoute,
  type AgentSectionId,
} from './agentContent'
import { SpriteCharacter } from './SpriteCharacter'
import type { SpriteAnimationName, SpriteDirection } from './spriteConfig'
import { useAgentGuide } from './useAgentGuide'
import { useAgentPosition } from './useAgentPosition'
import type { AgentCoordinates } from './useAgentPosition'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import { ROTA_CHARACTER_IMAGE, rotaProfile } from '../../data/rota'
import { chatPresets, localizePresetText } from './content/chatPresets'

function BreathMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`enchant-breathe inline-flex items-center gap-1 ${className ?? ''}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      <span className="h-1 w-1 rounded-full bg-current" />
      <span className="h-1 w-1 rounded-full bg-current" />
    </span>
  )
}

interface LocalizedLabels {
  guideName: string
  open: string
  close: string
  react: string
  navigate: string
  aboutRota: string
  chatPlaceholder: string
  send: string
  sending: string
  greeting: string
  suggestedQuestions: string
  idleHint: string
  chatError: string
  dataUseNotice: string
}

const localizedLabels = {
  en: {
    guideName: 'ROTA',
    open: 'Open portfolio guide',
    close: 'Close portfolio guide',
    react: 'React with portfolio guide',
    navigate: 'Show this part',
    aboutRota: 'About ROTA',
    chatPlaceholder: 'Ask ROTA a question',
    send: 'Send',
    sending: 'Thinking',
    greeting: "Hey. I'm ROTA. Ask about Keigo, this site, the research — whatever you're curious about.",
    suggestedQuestions: 'Suggested questions',
    idleHint: 'Tap me for a guide',
    chatError: 'ROTA could not answer right now. Please try again later.',
    dataUseNotice: 'Chats may be used to improve ROTA.',
  },
  ja: {
    guideName: 'ROTA',
    open: 'ポートフォリオ案内を開く',
    close: 'ポートフォリオ案内を閉じる',
    react: 'ポートフォリオ案内キャラクターにリアクションする',
    navigate: 'ここを見る',
    aboutRota: 'ROTAについて',
    chatPlaceholder: 'ROTAに質問する',
    send: '送信',
    sending: '考え中',
    greeting: 'はじめまして。ROTAだよ。桂吾のことでも、このサイトのことでも、気になったところから聞いてみて。',
    suggestedQuestions: 'よくある質問',
    idleHint: 'タップで案内するよ',
    chatError: '今は ROTA がうまく返答できませんでした。少し後でもう一度試してください。',
    dataUseNotice: '会話は ROTA の改善に使用します。',
  },
} as const satisfies Record<Language, LocalizedLabels>

function buildHref(route: AgentKnownRoute, hash?: AgentSectionId): string {
  return hash ? `${route}#${hash}` : route
}

type AgentChatRole = 'user' | 'assistant'

interface AgentChatMessage {
  id: string
  role: AgentChatRole
  content: string
  status?: 'error'
  kind?: 'greeting' | 'preset'
}

interface AgentChatRequestMessage {
  role: AgentChatRole
  content: string
}

interface AgentChatApiResponse {
  message?: string
  model?: string
  error?: string
}

const CHAT_HISTORY_LIMIT = 8
const CHAT_INPUT_MAX_LENGTH = 420
const CHAT_RESPONSE_ANIMATION_MS = 920
const INTRO_THINK_MS = 1000
const PRESET_THINK_MS = 720
const PANEL_WIDTH_PX = 360
const PANEL_MAX_HEIGHT_PX = 520
const IDLE_HINT_INITIAL_DELAY_MS = 4200
const IDLE_HINT_VISIBLE_MS = 4200
const IDLE_HINT_MIN_DELAY_MS = 18000
const IDLE_HINT_MAX_DELAY_MS = 42000

const GUIDE_RECOMMENDATION_HINTS: Record<string, readonly string[]> = {
  'home-overview': ['overview', 'introduction', '全体', '概要', '最初', '紹介'],
  'home-route': ['portfolio', 'start', 'はじめ', '案内', 'どこから'],
  'research-projects': [
    'research',
    'hci',
    'augmented humans',
    'computer vision',
    '研究',
    '人間拡張',
    '3d',
    'gaussian',
    'augmented leap',
    'uist',
    'teleoperation',
    'humanoid',
    'agency',
    'warping',
    'workspace',
    '遠隔操作',
    'ヒューマノイド',
    '歪み',
    'scope-gs',
    'scope gs',
    '逐次更新',
    '空間メディア',
  ],
  'artwork-route': ['artwork', 'creative work', '4zigen', '制作', '作品', 'アート', '展示'],
  'artwork-section': ['4zigen', 'physical computing', 'interactive art', 'センサー', 'フィジカル', 'インタラクティブ'],
  'personal-works': ['personal work', 'tool', 'archive', 'lidar', '個人制作', 'ツール', 'アーカイブ', '年表'],
  'startup-route': ['startup', 'wakabar', 'iot', 'スタートアップ', '起業'],
  'startup-section': ['wakabar', 'bicycle', 'safety', '自転車', '事故', '安全', '危険地点', 'app store', 'ios', 'アプリ'],
  'experience-route': ['experience', 'career', 'profile', '経歴', 'プロフィール', '人物像'],
  'publications-section': ['publication', 'paper', 'siggraph', 'uist', 'arxiv', '論文', '出版', '発表', '研究成果'],
  'awards-section': ['award', 'prize', 'gugen', '受賞', '賞', '大賞'],
  'education-section': ['education', 'university', 'lab', '学歴', '大学', '博士', '修士', '研究室', '東大'],
  'experience-timeline-section': ['timeline', 'editing', 'isis', '経歴', '活動', '編集', '展示運営', 'イシス'],
  'profile-pitch': ['pitch', 'strength', 'who', '強み', 'どんな人', '短く紹介'],
  'cross-domain-bridge': ['throughline', 'editing', 'connection', '横断', 'つながり', '編集'],
  'startup-bridge': ['wakabar', 'implementation', '社会', '実装', 'プロダクト'],
  'rota-route': [
    'rota',
    'who are you',
    'who is rota',
    'character',
    'wizard',
    'stamp',
    'sticker',
    'line',
    '何者',
    'キャラ',
    '魔法使い',
    'スタンプ',
  ],
  'first-visit-route': ['where to start', 'route', 'start', 'どこから', 'おすすめ', '見る順番'],
}

function createChatRequestMessages(
  previousMessages: readonly AgentChatMessage[],
  latestUserContent: string,
): AgentChatRequestMessage[] {
  const normalizedMessages = previousMessages
    .filter((message) => message.status !== 'error')
    .map((message) => ({
      role: message.role,
      content: message.content,
    }))

  return [
    ...normalizedMessages,
    {
      role: 'user' as const,
      content: latestUserContent,
    },
  ].slice(-CHAT_HISTORY_LIMIT)
}

function normalizeGuideMessage(message: string): string {
  return message.replace(/\s+/g, ' ').trim()
}

function createGuideDisplayMessage(
  guide: AgentGuide,
  language: Language,
  isChatRecommended: boolean,
): string {
  const guideMessage = normalizeGuideMessage(guide.message)

  if (!isChatRecommended) {
    return guideMessage
  }

  return language === 'ja'
    ? `その話なら、ここが近いよ。${guideMessage}`
    : `For that thread, this is the part I would show first. ${guideMessage}`
}

function normalizeRecommendationText(value: string): string {
  return value.toLowerCase().replace(/\s+/g, ' ').trim()
}

function extractRecommendationTerms(value: string): string[] {
  return normalizeRecommendationText(value)
    .split(/[\s,./:;()[\]'"!?、。・「」『』（）#]+/)
    .map((term) => term.trim())
    .filter((term) => term.length >= 2 && term.length <= 48)
}

function scoreGuideRecommendation(guide: AgentGuide, normalizedQuery: string): number {
  const weightedTerms = [
    ...((guide.title ? [guide.title] : []).map((term) => ({ term, weight: 10 }))),
    ...(GUIDE_RECOMMENDATION_HINTS[guide.id]?.map((term) => ({ term, weight: 9 })) ?? []),
    ...guide.contextTags.map((term) => ({ term, weight: 8 })),
    ...[guide.id, guide.targetRoute, guide.targetHash ?? '', guide.sectionId ?? '']
      .filter((term): term is string => Boolean(term))
      .map((term) => ({ term, weight: 6 })),
    ...guide.suggestions.flatMap((suggestion) => [
      { term: suggestion.label, weight: 5 },
      ...(suggestion.description ? [{ term: suggestion.description, weight: 4 }] : []),
    ]),
    ...extractRecommendationTerms(guide.message).map((term) => ({ term, weight: 1 })),
  ]

  return weightedTerms.reduce((score, { term, weight }) => {
    const normalizedTerm = normalizeRecommendationText(term)

    if (!normalizedTerm || normalizedTerm.length < 2) return score
    return normalizedQuery.includes(normalizedTerm) ? score + weight : score
  }, 0)
}

function selectRecommendedGuideFromChat(
  guides: readonly AgentGuide[],
  userMessage: string,
  assistantMessage: string,
  fallbackGuideId: string,
): AgentGuide | null {
  const normalizedQuery = normalizeRecommendationText(`${userMessage} ${assistantMessage}`)

  if (!normalizedQuery) return null

  const scoredGuides = guides
    .map((candidateGuide) => ({
      guide: candidateGuide,
      score: scoreGuideRecommendation(candidateGuide, normalizedQuery),
    }))
    .filter(({ score }) => score >= 8)
    .sort((left, right) => right.score - left.score)

  const bestGuide = scoredGuides[0]?.guide

  if (!bestGuide || bestGuide.id === fallbackGuideId) {
    return null
  }

  return bestGuide
}

function mapAgentAnimation(
  animation: AgentAnimation,
  isOpen: boolean,
  isWalking: boolean,
  isReacting: boolean,
  reactionAnimation: SpriteAnimationName | null,
  isChatSending: boolean,
  isIntroThinking: boolean,
): SpriteAnimationName {
  if (isWalking) return 'walk'
  if (isIntroThinking) return 'think'
  if (reactionAnimation) return reactionAnimation
  if (isReacting) return 'wave'
  if (isChatSending) return 'talk'
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

function getIdleHintDelay(): number {
  return Math.round(
    IDLE_HINT_MIN_DELAY_MS + Math.random() * (IDLE_HINT_MAX_DELAY_MS - IDLE_HINT_MIN_DELAY_MS)
  )
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
  const chatMessageIdRef = useRef(0)
  const chatScrollRef = useRef<HTMLDivElement | null>(null)
  const dragClickGuardTimerRef = useRef<number | null>(null)
  const introTimerRef = useRef<number | null>(null)
  const presetTimerRef = useRef<number | null>(null)
  const greetingTextRef = useRef(localizedLabels[language].greeting)
  const dragSessionRef = useRef<{
    pointerId: number
    startX: number
    startY: number
  } | null>(null)
  const didDragRef = useRef(false)
  const { guide } = useAgentGuide({ language, pathname })
  const allGuides = useMemo(() => getAllAgentGuides(language), [language])
  const [isOpen, setIsOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState<AgentCoordinates>(ZERO_OFFSET)
  const [dragFacing, setDragFacing] = useState<SpriteDirection | null>(null)
  const [characterReactionAnimation, setCharacterReactionAnimation] = useState<SpriteAnimationName | null>(null)
  const [isIdleHintVisible, setIsIdleHintVisible] = useState(false)
  const [recommendedGuideId, setRecommendedGuideId] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<AgentChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isChatSending, setIsChatSending] = useState(false)
  const [isIntroThinking, setIsIntroThinking] = useState(false)
  const {
    position,
    facing,
    isReady,
    isMobile,
    isWalking,
    isReacting,
    characterSize,
    containerStyle,
    moveBy,
    reactToInteraction,
  } = useAgentPosition({
    bubbleOpen: isOpen,
    bubbleHeight: PANEL_MAX_HEIGHT_PX,
    bubbleWidth: PANEL_WIDTH_PX,
    reducedMotion: prefersReducedMotion,
  })

  const labels = localizedLabels[language]
  greetingTextRef.current = labels.greeting
  const recommendedGuide = useMemo(
    () => recommendedGuideId
      ? allGuides.find((candidateGuide) => candidateGuide.id === recommendedGuideId) ?? null
      : null,
    [allGuides, recommendedGuideId],
  )
  const activeGuide = recommendedGuide ?? guide
  const isChatRecommendedGuide = recommendedGuide !== null
  const shouldShowGuideCta = isChatRecommendedGuide
  const guideDisplayMessage = useMemo(
    () => createGuideDisplayMessage(activeGuide, language, isChatRecommendedGuide),
    [activeGuide, isChatRecommendedGuide, language],
  )
  const activeAnimation = mapAgentAnimation(
    activeGuide.animation,
    isOpen,
    isWalking || isDragging,
    isReacting,
    characterReactionAnimation,
    isChatSending,
    isIntroThinking,
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

      if (introTimerRef.current !== null) {
        window.clearTimeout(introTimerRef.current)
      }

      if (presetTimerRef.current !== null) {
        window.clearTimeout(presetTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const chatScrollElement = chatScrollRef.current
    if (!chatScrollElement) return

    chatScrollElement.scrollTop = chatScrollElement.scrollHeight
  }, [chatMessages, isChatSending, isIntroThinking, isOpen])

  useEffect(() => {
    setRecommendedGuideId(null)
  }, [language, pathname])

  useEffect(() => {
    if (isOpen || isDragging || isChatSending) {
      setIsIdleHintVisible(false)
      return
    }

    let showTimerId: number | null = null
    let hideTimerId: number | null = null
    let cancelled = false

    const scheduleHint = (delay: number) => {
      showTimerId = window.setTimeout(() => {
        if (cancelled) return

        setIsIdleHintVisible(true)
        hideTimerId = window.setTimeout(() => {
          if (cancelled) return

          setIsIdleHintVisible(false)
          scheduleHint(getIdleHintDelay())
        }, prefersReducedMotion ? 2800 : IDLE_HINT_VISIBLE_MS)
      }, delay)
    }

    scheduleHint(IDLE_HINT_INITIAL_DELAY_MS)

    return () => {
      cancelled = true
      if (showTimerId !== null) {
        window.clearTimeout(showTimerId)
      }
      if (hideTimerId !== null) {
        window.clearTimeout(hideTimerId)
      }
    }
  }, [isChatSending, isDragging, isOpen, pathname, prefersReducedMotion])

  const createChatMessageId = useCallback(() => {
    chatMessageIdRef.current += 1
    return `portfolio-agent-chat-${chatMessageIdRef.current}`
  }, [])

  const triggerChatResponseAnimation = useCallback(() => {
    if (characterReactionTimerRef.current !== null) {
      window.clearTimeout(characterReactionTimerRef.current)
    }

    setCharacterReactionAnimation('talk')
    characterReactionTimerRef.current = window.setTimeout(() => {
      setCharacterReactionAnimation(null)
      characterReactionTimerRef.current = null
    }, prefersReducedMotion ? 240 : CHAT_RESPONSE_ANIMATION_MS)
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!isOpen) {
      if (introTimerRef.current !== null) {
        window.clearTimeout(introTimerRef.current)
        introTimerRef.current = null
      }
      setIsIntroThinking(false)
      return
    }

    if (chatMessages.length > 0 || introTimerRef.current !== null) return

    if (prefersReducedMotion) {
      setChatMessages((currentMessages) => {
        if (currentMessages.length > 0) return currentMessages
        return [
          {
            id: createChatMessageId(),
            role: 'assistant',
            content: greetingTextRef.current,
            kind: 'greeting',
          },
        ]
      })
      return
    }

    setIsIntroThinking(true)
    introTimerRef.current = window.setTimeout(() => {
      introTimerRef.current = null
      setChatMessages((currentMessages) => {
        if (currentMessages.length > 0) return currentMessages
        return [
          {
            id: createChatMessageId(),
            role: 'assistant',
            content: greetingTextRef.current,
            kind: 'greeting',
          },
        ]
      })
      setIsIntroThinking(false)
      triggerChatResponseAnimation()
    }, INTRO_THINK_MS)
  }, [
    chatMessages.length,
    createChatMessageId,
    isOpen,
    prefersReducedMotion,
    triggerChatResponseAnimation,
  ])

  useEffect(() => {
    setChatMessages((currentMessages) => {
      if (
        currentMessages.length !== 1
        || currentMessages[0]?.kind !== 'greeting'
        || currentMessages[0].content === labels.greeting
      ) {
        return currentMessages
      }

      return [{ ...currentMessages[0], content: labels.greeting }]
    })
  }, [labels.greeting])

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

  const sendChatMessage = useCallback(async (rawContent: string) => {
    const content = rawContent.trim()

    if (!content || isChatSending) return

    if (introTimerRef.current !== null) {
      window.clearTimeout(introTimerRef.current)
      introTimerRef.current = null
    }
    setIsIntroThinking(false)

    const userMessage: AgentChatMessage = {
      id: createChatMessageId(),
      role: 'user',
      content,
    }
    const requestMessages = createChatRequestMessages(chatMessages, content)

    setChatMessages((currentMessages) => [...currentMessages, userMessage])
    setChatInput('')
    setIsOpen(true)
    setIsChatSending(true)

    try {
      const response = await fetch('/api/portfolio-agent/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          pathname,
          currentGuide: {
            id: activeGuide.id,
            title: activeGuide.title,
            message: activeGuide.message,
            contextTags: activeGuide.contextTags,
          },
          messages: requestMessages,
        }),
      })
      const responseBody = await response.json().catch(() => null) as AgentChatApiResponse | null
      const assistantMessage = responseBody?.message?.trim()

      if (!response.ok || !assistantMessage) {
        throw new Error(responseBody?.error ?? labels.chatError)
      }

      setChatMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createChatMessageId(),
          role: 'assistant',
          content: assistantMessage,
        },
      ])
      const nextRecommendedGuide = selectRecommendedGuideFromChat(
        allGuides,
        content,
        assistantMessage,
        guide.id,
      )
      setRecommendedGuideId(nextRecommendedGuide?.id ?? null)
      triggerChatResponseAnimation()
    } catch {
      setChatMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createChatMessageId(),
          role: 'assistant',
          content: labels.chatError,
          status: 'error',
        },
      ])
    } finally {
      setIsChatSending(false)
    }
  }, [
    activeGuide.contextTags,
    activeGuide.id,
    activeGuide.message,
    activeGuide.title,
    allGuides,
    chatMessages,
    createChatMessageId,
    guide.id,
    isChatSending,
    labels.chatError,
    language,
    pathname,
    triggerChatResponseAnimation,
  ])

  const playPreset = useCallback((presetId: string) => {
    const preset = chatPresets.find((candidate) => candidate.id === presetId)
    if (!preset || isChatSending) return

    if (introTimerRef.current !== null) {
      window.clearTimeout(introTimerRef.current)
      introTimerRef.current = null
    }
    setIsIntroThinking(false)

    if (presetTimerRef.current !== null) {
      window.clearTimeout(presetTimerRef.current)
      presetTimerRef.current = null
    }

    const question = localizePresetText(preset.question, language)
    const answer = localizePresetText(preset.answer, language)
    const userMessage: AgentChatMessage = {
      id: createChatMessageId(),
      role: 'user',
      content: question,
      kind: 'preset',
    }

    setChatMessages((currentMessages) => [...currentMessages, userMessage])
    setChatInput('')
    setIsOpen(true)
    setIsChatSending(true)

    const delay = prefersReducedMotion ? 0 : PRESET_THINK_MS
    presetTimerRef.current = window.setTimeout(() => {
      presetTimerRef.current = null
      setChatMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createChatMessageId(),
          role: 'assistant',
          content: answer,
          kind: 'preset',
        },
      ])
      setRecommendedGuideId(preset.guideId ?? null)
      triggerChatResponseAnimation()
      setIsChatSending(false)
    }, delay)
  }, [
    createChatMessageId,
    isChatSending,
    language,
    prefersReducedMotion,
    triggerChatResponseAnimation,
  ])

  const handleChatSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void sendChatMessage(chatInput)
  }, [chatInput, sendChatMessage])

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

    setIsIdleHintVisible(false)
    setIsOpen(true)
    if (chatMessages.length > 0) {
      triggerCharacterReaction()
    }
  }, [chatMessages.length, triggerCharacterReaction])

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
    setIsIdleHintVisible(false)
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

  const handleNavigateToTarget = useCallback(() => {
    navigateTo(activeGuide.targetRoute, activeGuide.targetHash)
    setIsOpen(false)
    reactToInteraction()
  }, [activeGuide.targetHash, activeGuide.targetRoute, navigateTo, reactToInteraction])

  if (!isReady) {
    return null
  }

  const shellClassName = isOpen ? 'z-40' : 'z-30'
  const panelClassName = isDark
    ? 'border-[#2A2724] bg-[#0C0B0A]/92 text-[#F2EFE9] shadow-black/40'
    : 'border-[#E4DFD6] bg-[#F7F4EF]/96 text-[#1C1916] shadow-black/15'
  const secondaryTextClassName = isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'
  const dividerClassName = isDark ? 'border-[#2A2724]' : 'border-[#E4DFD6]'
  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
  const travelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 240, damping: 28, mass: 0.85 }
  const accentClass = isDark
    ? 'bg-[#B8A04A]/12 text-[#D4C07A] hover:bg-[#B8A04A]/20'
    : 'bg-[#8A7428]/08 text-[#8A7428] hover:bg-[#8A7428]/14'
  const panelContent = (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className={`flex items-center gap-2 border-b px-3 py-2.5 ${dividerClassName}`}>
        <Image
          src={ROTA_CHARACTER_IMAGE}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 shrink-0 object-contain"
        />
        <p className={`shrink-0 text-sm font-semibold leading-none tracking-normal ${
          isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
        }`}>
          {rotaProfile.name}
        </p>
        {pathname !== '/rota' && (
          <Link
            href="/rota"
            prefetch
            onClick={() => {
              setIsOpen(false)
            }}
            className={`ml-0.5 inline-flex min-h-7 shrink-0 items-center whitespace-nowrap rounded-full px-2.5 text-[11px] font-medium tracking-normal transition-colors ${
              isDark
                ? 'bg-white/[0.07] text-[#D4C07A] hover:bg-white/[0.12]'
                : 'bg-black/[0.05] text-[#8A7428] hover:bg-black/[0.08]'
            }`}
          >
            {labels.aboutRota}
          </Link>
        )}
        <button
          type="button"
          onClick={() => {
            setIsOpen(false)
          }}
          className={`ml-auto rounded-[8px] p-1.5 transition-colors ${
            isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
          }`}
          aria-label={labels.close}
          aria-controls={panelId}
        >
          <X aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-3 pt-3">
        <div
          className={`relative shrink-0 border-l px-3 py-1 ${
            isDark ? 'border-[#B8A04A]/35' : 'border-[#8A7428]/30'
          }`}
        >
          <p className={`text-sm leading-relaxed tracking-normal ${secondaryTextClassName}`}>
            {guideDisplayMessage}
          </p>
          {shouldShowGuideCta && (
            <button
              type="button"
              onClick={handleNavigateToTarget}
              className={`mt-2 inline-flex min-h-8 items-center gap-1.5 rounded-[8px] px-2.5 py-1.5 text-xs font-semibold tracking-normal transition-colors ${accentClass}`}
            >
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              <span>
                {activeGuide.targetRoute === '/rota' ? labels.aboutRota : labels.navigate}
              </span>
            </button>
          )}
        </div>

        <div
          ref={chatScrollRef}
          className={`min-h-0 flex-1 overflow-y-auto rounded-[10px] border px-2 py-2 ${
            isDark ? 'border-[#2A2724] bg-white/[0.03]' : 'border-[#E4DFD6] bg-black/[0.02]'
          }`}
          aria-label={labels.chatPlaceholder}
          aria-live="polite"
        >
          {chatMessages.map((message) => {
              const isUserMessage = message.role === 'user'

              return (
                <div
                  key={message.id}
                  className={`mb-2 flex last:mb-0 ${isUserMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-[10px] px-2.5 py-2 text-xs leading-relaxed tracking-normal md:max-w-[86%] ${
                      isUserMessage
                        ? isDark
                          ? 'bg-[#B8A04A]/15 text-[#F2EFE9]'
                          : 'bg-[#8A7428]/08 text-[#1C1916]'
                        : message.status === 'error'
                          ? isDark
                            ? 'bg-red-500/15 text-red-100'
                            : 'bg-red-500/10 text-red-700'
                          : isDark
                            ? 'bg-[#161412] text-[#F2EFE9]'
                            : 'bg-white/80 text-[#1C1916]'
                    }`}
                  >
                    {!isUserMessage && (
                      <p className={`mb-1 text-[10px] font-semibold tracking-normal ${secondaryTextClassName}`}>
                        {labels.guideName}
                      </p>
                    )}
                    <p>{message.content}</p>
                  </div>
                </div>
              )
            })}

            {(isChatSending || isIntroThinking) && (
              <div className={`flex items-center gap-2.5 text-xs tracking-normal ${secondaryTextClassName}`}>
                <BreathMark />
                <span>{labels.sending}</span>
              </div>
            )}
        </div>
      </div>

      <div className={`border-t px-3 py-2.5 ${dividerClassName}`}>
        {!isIntroThinking && (
          <div className="mb-2.5">
            <p className="sr-only">{labels.suggestedQuestions}</p>
            <div className="flex flex-wrap gap-1.5">
              {chatPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  disabled={isChatSending}
                  onClick={() => playPreset(preset.id)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-normal transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${
                    isDark
                      ? 'border-white/10 bg-white/[0.04] text-[#D8D2C8] hover:border-[#B8A04A]/40 hover:text-[#F2EFE9]'
                      : 'border-[#E4DFD6] bg-black/[0.03] text-[#4A453C] hover:border-[#8A7428]/35 hover:text-[#1C1916]'
                  }`}
                >
                  {localizePresetText(preset.label, language)}
                </button>
              ))}
            </div>
          </div>
        )}
        <form className="flex items-center gap-2" onSubmit={handleChatSubmit}>
          <label className="sr-only" htmlFor={`${panelId}-chat-input`}>
            {labels.chatPlaceholder}
          </label>
          <input
            id={`${panelId}-chat-input`}
            type="text"
            value={chatInput}
            onChange={(event) => {
              setChatInput(event.target.value.slice(0, CHAT_INPUT_MAX_LENGTH))
            }}
            maxLength={CHAT_INPUT_MAX_LENGTH}
            disabled={isChatSending}
            placeholder={labels.chatPlaceholder}
            className={`min-h-12 min-w-0 flex-1 rounded-[10px] border px-3 py-2 text-base tracking-normal outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60 md:min-h-0 md:text-sm ${
              isDark
                ? 'border-[#2A2724] bg-[#161412] text-[#F2EFE9] placeholder:text-[#9A958C] focus:border-[#B8A04A]/70'
                : 'border-[#E4DFD6] bg-white/70 text-[#1C1916] placeholder:text-[#7A756C] focus:border-[#8A7428]/70'
            }`}
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || isChatSending}
            aria-label={labels.send}
            className={`inline-flex min-h-12 min-w-12 items-center justify-center rounded-[10px] transition-colors disabled:cursor-not-allowed disabled:opacity-45 md:min-h-11 md:min-w-11 ${accentClass}`}
          >
            {isChatSending ? (
              <BreathMark />
            ) : (
              <Send aria-hidden="true" className="h-4 w-4" />
            )}
          </button>
        </form>
        <p className={`mt-1.5 text-[10px] leading-snug tracking-normal ${secondaryTextClassName}`}>
          {labels.dataUseNotice}
        </p>
      </div>
    </div>
  )

  return (
    <>
      <AnimatePresence initial={false}>
        {isOpen && isMobile && (
          <motion.section
            id={panelId}
            key="portfolio-agent-mobile-panel"
            role="region"
            aria-live="polite"
            aria-label={labels.open}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={panelTransition}
            className={`pointer-events-auto fixed inset-x-2 bottom-[calc(0.5rem_+_env(safe-area-inset-bottom))] z-50 flex h-[min(36rem,calc(100dvh_-_6.5rem_-_env(safe-area-inset-top)_-_env(safe-area-inset-bottom)))] flex-col overflow-hidden rounded-[12px] border shadow-2xl backdrop-blur-xl ${panelClassName}`}
          >
            {panelContent}
          </motion.section>
        )}
      </AnimatePresence>

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
          {!isOpen && !isDragging && isIdleHintVisible && (
            <motion.div
              key="portfolio-agent-idle-hint"
              aria-hidden="true"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.98 }}
              transition={panelTransition}
              className={`pointer-events-none absolute bottom-[calc(100%-0.25rem)] right-1 max-w-[11rem] rounded-[10px] border px-3 py-2 text-xs font-semibold leading-snug tracking-normal shadow-lg backdrop-blur-xl ${
                isDark
                  ? 'border-[#2A2724] bg-[#0C0B0A]/90 text-[#F2EFE9]'
                  : 'border-[#E4DFD6] bg-[#F7F4EF]/95 text-[#1C1916]'
              }`}
            >
              <span>{labels.idleHint}</span>
              <span
                className={`absolute -bottom-1 right-6 h-2 w-2 rotate-45 border-b border-r ${
                  isDark ? 'border-[#2A2724] bg-[#0C0B0A]/90' : 'border-[#E4DFD6] bg-[#F7F4EF]/95'
                }`}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {isOpen && !isMobile && (
            <motion.section
              id={panelId}
              key="portfolio-agent-desktop-panel"
              role="region"
              aria-live="polite"
              aria-label={labels.open}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
              transition={panelTransition}
              className={`pointer-events-auto absolute bottom-[calc(100%+0.75rem)] right-0 flex h-[min(32rem,calc(100dvh-8.5rem))] w-[min(22.5rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[12px] border shadow-2xl backdrop-blur-xl ${panelClassName}`}
            >
              {panelContent}
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
    </>
  )
}
