'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { AgentFacing } from './types'

export interface AgentCoordinates {
  x: number
  y: number
}

export interface UseAgentPositionOptions {
  bubbleOpen: boolean
  reducedMotion?: boolean
  desktopSize?: number
  mobileSize?: number
  bubbleWidth?: number
  bubbleHeight?: number
}

export interface UseAgentPositionResult {
  position: AgentCoordinates
  facing: AgentFacing
  isReady: boolean
  isWalking: boolean
  isReacting: boolean
  characterSize: number
  containerStyle: CSSProperties
  moveBy: (delta: AgentCoordinates) => void
  reactToInteraction: () => void
}

interface AgentBounds {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

interface ViewportLayout {
  width: number
  height: number
  isMobile: boolean
  characterSize: number
  anchor: AgentCoordinates
  bounds: AgentBounds
}

interface ResolvedPositionOptions {
  bubbleOpen: boolean
  desktopSize: number
  mobileSize: number
  bubbleWidth: number
  bubbleHeight: number
}

const DEFAULT_DESKTOP_SIZE = 112
const DEFAULT_MOBILE_SIZE = 88
const DEFAULT_BUBBLE_WIDTH = 320
const DEFAULT_BUBBLE_HEIGHT = 230
const BUBBLE_GAP = 12
const NAVIGATION_RESERVE = 88
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

function clamp(value: number, min: number, max: number): number {
  if (max < min) return min
  return Math.min(Math.max(value, min), max)
}

function clampCoordinates(position: AgentCoordinates, bounds: AgentBounds): AgentCoordinates {
  return {
    x: clamp(position.x, bounds.minX, bounds.maxX),
    y: clamp(position.y, bounds.minY, bounds.maxY),
  }
}

function resolveOptions(options: UseAgentPositionOptions): ResolvedPositionOptions {
  return {
    bubbleOpen: options.bubbleOpen,
    desktopSize: options.desktopSize ?? DEFAULT_DESKTOP_SIZE,
    mobileSize: options.mobileSize ?? DEFAULT_MOBILE_SIZE,
    bubbleWidth: options.bubbleWidth ?? DEFAULT_BUBBLE_WIDTH,
    bubbleHeight: options.bubbleHeight ?? DEFAULT_BUBBLE_HEIGHT,
  }
}

function getViewportSize(): Pick<ViewportLayout, 'width' | 'height'> {
  const viewport = window.visualViewport

  return {
    width: Math.floor(viewport?.width ?? window.innerWidth),
    height: Math.floor(viewport?.height ?? window.innerHeight),
  }
}

function createViewportLayout(options: ResolvedPositionOptions): ViewportLayout {
  const { width, height } = getViewportSize()
  const isMobile = width < 768
  const characterSize = isMobile ? options.mobileSize : options.desktopSize

  const sideReserve = isMobile ? 12 : 28
  const bottomReserve = isMobile ? 92 : 28
  const safeTop = NAVIGATION_RESERVE
  const safeLeft = sideReserve
  const safeRight = sideReserve

  const maxX = Math.max(safeLeft, width - characterSize - safeRight)
  const maxY = Math.max(safeTop, height - characterSize - bottomReserve)
  const minXForBubble = Math.min(
    Math.max(safeLeft, options.bubbleWidth - characterSize + safeLeft),
    maxX,
  )
  const minYForBubble = Math.min(safeTop + options.bubbleHeight + BUBBLE_GAP, maxY)

  const bounds: AgentBounds = {
    minX: options.bubbleOpen ? minXForBubble : safeLeft,
    maxX,
    minY: options.bubbleOpen ? minYForBubble : safeTop,
    maxY,
  }

  const anchor = clampCoordinates(
    {
      x: width - characterSize - safeRight,
      y: height - characterSize - bottomReserve,
    },
    bounds,
  )

  return {
    width,
    height,
    isMobile,
    characterSize,
    anchor,
    bounds,
  }
}

export function useAgentPosition(options: UseAgentPositionOptions): UseAgentPositionResult {
  const {
    bubbleHeight,
    bubbleOpen,
    bubbleWidth,
    desktopSize,
    mobileSize,
    reducedMotion: reducedMotionOption,
  } = options
  const resolvedOptions = useMemo(
    () => resolveOptions({
      bubbleHeight,
      bubbleOpen,
      bubbleWidth,
      desktopSize,
      mobileSize,
    }),
    [
      bubbleHeight,
      bubbleOpen,
      bubbleWidth,
      desktopSize,
      mobileSize,
    ],
  )
  const reducedMotion = reducedMotionOption ?? false
  const [layout, setLayout] = useState<ViewportLayout | null>(null)
  const [position, setPosition] = useState<AgentCoordinates | null>(null)
  const [facing, setFacing] = useState<AgentFacing>('left')
  const [isWalking, setIsWalking] = useState(false)
  const [isReacting, setIsReacting] = useState(false)
  const timersRef = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timerId) => window.clearTimeout(timerId))
    timersRef.current = []
  }, [])

  const scheduleTimer = useCallback((callback: () => void, delay: number) => {
    const timerId = window.setTimeout(() => {
      callback()
      timersRef.current = timersRef.current.filter((storedId) => storedId !== timerId)
    }, delay)

    timersRef.current.push(timerId)
  }, [])

  const recalculateLayout = useCallback(() => {
    const nextLayout = createViewportLayout(resolvedOptions)

    setLayout(nextLayout)
    setPosition((currentPosition) => {
      return clampCoordinates(currentPosition ?? nextLayout.anchor, nextLayout.bounds)
    })
  }, [resolvedOptions])

  useBrowserLayoutEffect(() => {
    recalculateLayout()

    window.addEventListener('resize', recalculateLayout)
    window.visualViewport?.addEventListener('resize', recalculateLayout)

    return () => {
      window.removeEventListener('resize', recalculateLayout)
      window.visualViewport?.removeEventListener('resize', recalculateLayout)
    }
  }, [recalculateLayout])

  useEffect(() => clearTimers, [clearTimers])

  const reactToInteraction = useCallback(() => {
    clearTimers()
    setIsWalking(false)
    setIsReacting(true)
    scheduleTimer(() => setIsReacting(false), reducedMotion ? 240 : 920)
  }, [clearTimers, reducedMotion, scheduleTimer])

  const moveBy = useCallback((delta: AgentCoordinates) => {
    if (!layout) return

    setPosition((currentPosition) => {
      const resolvedPosition = currentPosition ?? layout.anchor
      const nextPosition = clampCoordinates(
        {
          x: resolvedPosition.x + delta.x,
          y: resolvedPosition.y + delta.y,
        },
        layout.bounds,
      )

      if (Math.abs(delta.x) > 2) {
        setFacing(delta.x < 0 ? 'left' : 'right')
      }

      return nextPosition
    })
    setIsWalking(false)
    setIsReacting(false)
  }, [layout])

  const characterSize = layout?.characterSize ?? resolvedOptions.desktopSize
  const resolvedPosition = position ?? { x: 0, y: 0 }
  const containerStyle = useMemo<CSSProperties>(
    () => ({
      width: characterSize,
      height: characterSize,
    }),
    [characterSize],
  )

  return {
    position: resolvedPosition,
    facing,
    isReady: layout !== null && position !== null,
    isWalking,
    isReacting,
    characterSize,
    containerStyle,
    moveBy,
    reactToInteraction,
  }
}
