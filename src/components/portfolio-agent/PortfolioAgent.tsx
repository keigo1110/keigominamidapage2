'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { FormEvent, PointerEvent as ReactPointerEvent } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, MapPin, Send, Sparkles, X } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useTranslation } from '../../contexts/TranslationContext'
import type { Language } from '../../translations'
import {
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
  navigate: string
  chatPlaceholder: string
  send: string
  sending: string
  visitorLabel: string
  chatError: string
  dataUseNotice: string
  mood: Record<AgentMood, string>
}

const localizedLabels = {
  en: {
    guideName: 'ROTA',
    open: 'Open portfolio guide',
    close: 'Close portfolio guide',
    react: 'React with portfolio guide',
    navigate: 'Show this part',
    chatPlaceholder: 'Ask ROTA a question',
    send: 'Send',
    sending: 'Thinking',
    visitorLabel: 'You',
    chatError: 'ROTA could not answer right now. Please try again later.',
    dataUseNotice: 'Chats may be used to improve ROTA.',
    mood: {
      friendly: 'Guide',
      focused: 'Focus',
      curious: 'Context',
      excited: 'Highlight',
      thoughtful: 'Thought',
    },
  },
  ja: {
    guideName: 'ROTA',
    open: 'ポートフォリオ案内を開く',
    close: 'ポートフォリオ案内を閉じる',
    react: 'ポートフォリオ案内キャラクターにリアクションする',
    navigate: 'ここを見る',
    chatPlaceholder: 'ROTAに質問する',
    send: '送信',
    sending: '考え中',
    visitorLabel: 'あなた',
    chatError: '今は ROTA がうまく返答できませんでした。少し後でもう一度試してください。',
    dataUseNotice: '会話は ROTA の改善に使用します。',
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

type AgentChatRole = 'user' | 'assistant'

interface AgentChatMessage {
  id: string
  role: AgentChatRole
  content: string
  status?: 'error'
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
const SHORT_GUIDE_MESSAGE_LENGTH = {
  en: 92,
  ja: 54,
} as const satisfies Record<Language, number>

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

function createShortGuideMessage(message: string, language: Language): string {
  const normalizedMessage = message.replace(/\s+/g, ' ').trim()
  const maxLength = SHORT_GUIDE_MESSAGE_LENGTH[language]

  if (normalizedMessage.length <= maxLength) {
    return normalizedMessage
  }

  const sentenceEndIndex = normalizedMessage.search(/[。.!?]/)

  if (sentenceEndIndex > 12 && sentenceEndIndex + 1 <= maxLength) {
    return normalizedMessage.slice(0, sentenceEndIndex + 1)
  }

  return `${normalizedMessage.slice(0, maxLength).trim()}...`
}

function mapAgentAnimation(
  animation: AgentAnimation,
  isOpen: boolean,
  isWalking: boolean,
  isReacting: boolean,
  reactionAnimation: SpriteAnimationName | null,
  isChatSending: boolean,
): SpriteAnimationName {
  if (isWalking) return 'walk'
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
  const dragSessionRef = useRef<{
    pointerId: number
    startX: number
    startY: number
  } | null>(null)
  const didDragRef = useRef(false)
  const { guide } = useAgentGuide({ language, pathname })
  const [isOpen, setIsOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState<AgentCoordinates>(ZERO_OFFSET)
  const [dragFacing, setDragFacing] = useState<SpriteDirection | null>(null)
  const [characterReactionAnimation, setCharacterReactionAnimation] = useState<SpriteAnimationName | null>(null)
  const [chatMessages, setChatMessages] = useState<AgentChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isChatSending, setIsChatSending] = useState(false)
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
    bubbleHeight: 420,
    bubbleWidth: 336,
    reducedMotion: prefersReducedMotion,
  })

  const labels = localizedLabels[language]
  const guideDisplayMessage = useMemo(
    () => createShortGuideMessage(guide.message, language),
    [guide.message, language],
  )
  const activeAnimation = mapAgentAnimation(
    guide.animation,
    isOpen,
    isWalking || isDragging,
    isReacting,
    characterReactionAnimation,
    isChatSending,
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

  useEffect(() => {
    if (!isOpen) return

    const chatScrollElement = chatScrollRef.current
    if (!chatScrollElement) return

    chatScrollElement.scrollTop = chatScrollElement.scrollHeight
  }, [chatMessages, isChatSending, isOpen])

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
            id: guide.id,
            title: guide.title,
            message: guide.message,
            contextTags: guide.contextTags,
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
    chatMessages,
    createChatMessageId,
    guide.contextTags,
    guide.id,
    guide.message,
    guide.title,
    isChatSending,
    labels.chatError,
    language,
    pathname,
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
            className={`pointer-events-auto absolute bottom-[calc(100%+0.75rem)] right-0 w-[min(21rem,calc(100vw-1.5rem))] max-h-[min(28rem,70vh)] overflow-hidden rounded-[8px] border shadow-2xl backdrop-blur-xl ${panelClassName}`}
          >
            <div className="flex max-h-[min(28rem,70vh)] flex-col">
              <div className={`flex items-center justify-between border-b px-3 py-2.5 ${dividerClassName}`}>
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] ${
                      isDark ? 'bg-[#2997FF]/15 text-[#2997FF]' : 'bg-[#0071E3]/10 text-[#0071E3]'
                    }`}
                  >
                    <Sparkles aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold tracking-normal">{labels.guideName}</p>
                    <p className={`text-xs tracking-normal ${secondaryTextClassName}`}>
                      {labels.mood[guide.mood]}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={handleNavigateToTarget}
                    className={`inline-flex min-h-9 items-center gap-1.5 rounded-[8px] px-2.5 py-1.5 text-xs font-semibold tracking-normal transition-colors ${
                      isDark
                        ? 'bg-[#2997FF]/20 text-[#2997FF] hover:bg-[#2997FF]/30'
                        : 'bg-[#0071E3]/10 text-[#0071E3] hover:bg-[#0071E3]/20'
                    }`}
                  >
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                    <span>{labels.navigate}</span>
                  </button>
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

              <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
                <div>
                  {guide.title && (
                    <h2 className="mb-1.5 text-sm font-semibold leading-snug tracking-normal">
                      {guide.title}
                    </h2>
                  )}
                  <p className={`text-sm leading-relaxed tracking-normal ${secondaryTextClassName}`}>
                    {guideDisplayMessage}
                  </p>
                </div>

                {(chatMessages.length > 0 || isChatSending) && (
                  <div
                    ref={chatScrollRef}
                    className={`max-h-44 overflow-y-auto rounded-[8px] border px-2 py-2 ${
                      isDark ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-black/[0.03]'
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
                            className={`max-w-[86%] rounded-[8px] px-2.5 py-2 text-xs leading-relaxed tracking-normal ${
                              isUserMessage
                                ? isDark
                                  ? 'bg-[#2997FF]/25 text-[#F5F5F7]'
                                  : 'bg-[#0071E3]/10 text-[#1D1D1F]'
                                : message.status === 'error'
                                  ? isDark
                                    ? 'bg-red-500/15 text-red-100'
                                    : 'bg-red-500/10 text-red-700'
                                  : isDark
                                    ? 'bg-white/10 text-[#F5F5F7]'
                                    : 'bg-white text-[#1D1D1F]'
                            }`}
                          >
                            <p className={`mb-1 text-[10px] font-semibold tracking-normal ${secondaryTextClassName}`}>
                              {isUserMessage ? labels.visitorLabel : labels.guideName}
                            </p>
                            <p>{message.content}</p>
                          </div>
                        </div>
                      )
                    })}

                    {isChatSending && (
                      <div className="flex items-center gap-2 text-xs tracking-normal text-[#86868B]">
                        <Loader2 aria-hidden="true" className="h-3.5 w-3.5 animate-spin" />
                        <span>{labels.sending}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className={`border-t px-3 py-2.5 ${dividerClassName}`}>
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
                    className={`min-w-0 flex-1 rounded-[8px] border px-3 py-2 text-sm tracking-normal outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                      isDark
                        ? 'border-white/10 bg-white/10 text-[#F5F5F7] placeholder:text-[#86868B] focus:border-[#2997FF]'
                        : 'border-black/10 bg-white text-[#1D1D1F] placeholder:text-[#86868B] focus:border-[#0071E3]'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isChatSending}
                    aria-label={labels.send}
                    className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-[8px] transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${
                      isDark
                        ? 'bg-[#2997FF]/20 text-[#2997FF] hover:bg-[#2997FF]/30'
                        : 'bg-[#0071E3]/10 text-[#0071E3] hover:bg-[#0071E3]/20'
                    }`}
                  >
                    {isChatSending ? (
                      <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
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
