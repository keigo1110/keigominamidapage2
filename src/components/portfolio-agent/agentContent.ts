import { localize, profileHighlights } from '../../data/profile'
import type { Language } from '../../translations'
import { agentGuideTemplates } from './content/guideTemplates'
import {
  AGENT_SECTION_IDS,
  KNOWN_AGENT_ROUTES,
  type AgentAnimation,
  type AgentGuideTemplate,
  type AgentKnownRoute,
  type AgentMood,
  type AgentRoute,
  type AgentSectionId,
  type AgentSuggestionDefinition,
  type AgentText,
  type ProfileHighlightId,
} from './content/types'

export type {
  AgentAnimation,
  AgentGuideTemplate,
  AgentKnownRoute,
  AgentMood,
  AgentRoute,
  AgentSectionId,
  AgentSuggestionDefinition,
  AgentText,
  ProfileHighlightId,
}

export interface AgentSuggestion {
  id: string
  label: string
  description?: string
  route: AgentKnownRoute
  hash?: AgentSectionId
  targetRoute: AgentKnownRoute
  targetHash?: AgentSectionId
  responseGuideId?: string
  animation: AgentAnimation
  mood: AgentMood
}

export interface AgentGuide {
  id: string
  title?: string
  message: string
  route: AgentKnownRoute
  sectionId?: AgentSectionId
  targetRoute: AgentKnownRoute
  targetHash?: AgentSectionId
  animation: AgentAnimation
  mood: AgentMood
  suggestions: AgentSuggestion[]
  contextTags: string[]
}

export interface AgentGuideRequest {
  language?: Language | string | null
  pathname?: string | null
  currentSectionId?: string | null
  guideId?: string | null
}

function isKnownRoute(route: string): route is AgentKnownRoute {
  return KNOWN_AGENT_ROUTES.some((knownRoute) => knownRoute === route)
}

function isAgentSectionId(sectionId: string): sectionId is AgentSectionId {
  return AGENT_SECTION_IDS.some((knownSectionId) => knownSectionId === sectionId)
}

export function normalizeAgentLanguage(language: Language | string | null | undefined): Language {
  return language === 'ja' ? 'ja' : 'en'
}

export function normalizeAgentRoute(pathname: string | null | undefined): AgentKnownRoute {
  if (!pathname) return '/'

  const [withoutQuery = '/'] = pathname.split('?')
  const [withoutHash = withoutQuery] = withoutQuery.split('#')
  const normalizedPath = withoutHash.endsWith('/') && withoutHash !== '/'
    ? withoutHash.slice(0, -1)
    : withoutHash

  if (isKnownRoute(normalizedPath)) return normalizedPath

  const nestedRoute = KNOWN_AGENT_ROUTES.find((route) => route !== '/' && normalizedPath.startsWith(`${route}/`))
  return nestedRoute ?? '/'
}

export function normalizeAgentSectionId(sectionId: string | null | undefined): AgentSectionId | undefined {
  if (!sectionId) return undefined
  return isAgentSectionId(sectionId) ? sectionId : undefined
}

export function createAgentTargetHref(
  targetRoute: AgentKnownRoute | undefined,
  targetHash?: AgentSectionId
): string | undefined {
  if (!targetRoute) return undefined
  return targetHash ? `${targetRoute}#${targetHash}` : targetRoute
}

function resolveAgentText(text: AgentText, language: Language): string {
  return typeof text === 'function' ? text(language) : text[language]
}

function findProfileHighlight(id: ProfileHighlightId) {
  const highlight = profileHighlights.find((profileHighlight) => profileHighlight.id === id)

  if (!highlight) {
    throw new Error(`Missing profile highlight: ${id}`)
  }

  return highlight
}

export function getAgentGuideById(
  guideId: string,
  language: Language | string | null | undefined = 'en'
): AgentGuide | undefined {
  const normalizedLanguage = normalizeAgentLanguage(language)
  const template = agentGuideTemplates.find((guideTemplate) => guideTemplate.id === guideId)
  return template ? materializeAgentGuide(template, normalizedLanguage) : undefined
}

export function getAgentGuide(request: AgentGuideRequest): AgentGuide {
  const language = normalizeAgentLanguage(request.language)
  const route = normalizeAgentRoute(request.pathname)
  const sectionId = normalizeAgentSectionId(request.currentSectionId)

  if (request.guideId) {
    const guide = getAgentGuideById(request.guideId, language)
    if (guide) return guide
  }

  const template = findRouteTemplate(route, sectionId)
  return materializeAgentGuide(template, language)
}

export function getAgentGuidesForRoute(
  pathname: string | null | undefined,
  language: Language | string | null | undefined = 'en'
): AgentGuide[] {
  const route = normalizeAgentRoute(pathname)
  const normalizedLanguage = normalizeAgentLanguage(language)

  return agentGuideTemplates
    .filter((template) => template.route === route)
    .map((template) => materializeAgentGuide(template, normalizedLanguage))
}

function findRouteTemplate(route: AgentKnownRoute, sectionId: AgentSectionId | undefined): AgentGuideTemplate {
  if (sectionId) {
    const sectionTemplate = agentGuideTemplates.find(
      (template) => template.route === route && template.sectionId === sectionId
    )

    if (sectionTemplate) return sectionTemplate
  }

  const routeTemplate = agentGuideTemplates.find(
    (template) => template.route === route && template.sectionId === undefined
  )

  if (routeTemplate) return routeTemplate

  const fallbackTemplate = agentGuideTemplates.find((template) => template.id === 'home-route')

  if (fallbackTemplate) return fallbackTemplate

  const firstTemplate = agentGuideTemplates[0]

  if (!firstTemplate) {
    throw new Error('Agent guide templates must contain at least one guide.')
  }

  return firstTemplate
}

function materializeAgentGuide(template: AgentGuideTemplate, language: Language): AgentGuide {
  const highlight = template.highlightId ? findProfileHighlight(template.highlightId) : undefined
  const title = template.title
    ? resolveAgentText(template.title, language)
    : highlight
      ? localize(highlight.title, language)
      : undefined
  const contextTags = [...new Set([...(template.tags ?? []), ...(highlight?.tags ?? [])])]

  return {
    id: template.id,
    title,
    message: resolveAgentText(template.message, language),
    route: template.route,
    sectionId: template.sectionId,
    targetRoute: template.targetRoute ?? template.route,
    targetHash: template.targetHash ?? template.sectionId,
    animation: template.animation,
    mood: template.mood,
    suggestions: template.suggestions.map((suggestion) => materializeAgentSuggestion(
      suggestion,
      language,
      template.targetRoute ?? template.route,
      template.targetHash ?? template.sectionId
    )),
    contextTags,
  }
}

function materializeAgentSuggestion(
  suggestion: AgentSuggestionDefinition,
  language: Language,
  fallbackRoute: AgentKnownRoute,
  fallbackHash: AgentSectionId | undefined
): AgentSuggestion {
  const route = suggestion.targetRoute ?? fallbackRoute
  const hash = suggestion.targetHash ?? fallbackHash

  return {
    id: suggestion.id,
    label: resolveAgentText(suggestion.label, language),
    description: suggestion.description ? resolveAgentText(suggestion.description, language) : undefined,
    route,
    hash,
    targetRoute: route,
    targetHash: hash,
    responseGuideId: suggestion.responseGuideId,
    animation: suggestion.animation ?? 'idle',
    mood: suggestion.mood ?? 'friendly',
  }
}
