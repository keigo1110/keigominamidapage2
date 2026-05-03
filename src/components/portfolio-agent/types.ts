export type AgentFacing = 'left' | 'right'

export type AgentAnimation = 'idle' | 'walk' | 'wave' | 'talk' | 'thinking'

export interface AgentGuideTarget {
  href: string
  sectionId?: string
  label: string
  ariaLabel?: string
}

export interface AgentGuideMessage {
  id: string
  eyebrow?: string
  title: string
  body: string
  ctaLabel?: string
  target?: AgentGuideTarget
  animation?: AgentAnimation
}

export interface UseAgentGuideResult {
  currentMessage: AgentGuideMessage
  currentIndex: number
  totalMessages: number
  hasNext: boolean
  nextMessage: () => void
}

export interface SpriteCharacterProps {
  size: number
  facing: AgentFacing
  animation: AgentAnimation
  reducedMotion?: boolean
  className?: string
}
