import type { Language } from '../../../translations'
import type { profileHighlights } from '../../../data/profile'

export const KNOWN_AGENT_ROUTES = ['/', '/artwork', '/startup', '/experience'] as const
export type AgentKnownRoute = (typeof KNOWN_AGENT_ROUTES)[number]
export type AgentRoute = AgentKnownRoute

export const AGENT_SECTION_IDS = [
  'home',
  'projects',
  'artwork',
  'otherProjects',
  'startup',
  'publications',
  'awards',
  'education',
  'experience',
] as const
export type AgentSectionId = (typeof AGENT_SECTION_IDS)[number]

export type AgentAnimation = 'idle' | 'wave' | 'walk' | 'talk' | 'think' | 'celebrate'

export type AgentMood = 'friendly' | 'focused' | 'curious' | 'excited' | 'thoughtful'

export type ProfileHighlightId = (typeof profileHighlights)[number]['id']
export type LocalizedAgentText = Record<Language, string>
export type AgentText = LocalizedAgentText | ((language: Language) => string)

export interface AgentSuggestionDefinition {
  id: string
  label: AgentText
  description?: AgentText
  targetRoute?: AgentKnownRoute
  targetHash?: AgentSectionId
  responseGuideId?: string
  animation?: AgentAnimation
  mood?: AgentMood
}

export interface AgentGuideTemplate {
  id: string
  title?: AgentText
  message: AgentText
  route: AgentKnownRoute
  sectionId?: AgentSectionId
  targetRoute?: AgentKnownRoute
  targetHash?: AgentSectionId
  animation: AgentAnimation
  mood: AgentMood
  highlightId?: ProfileHighlightId
  suggestions: readonly AgentSuggestionDefinition[]
  tags?: readonly string[]
}
