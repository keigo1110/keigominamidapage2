import { NextResponse } from 'next/server'

import {
  getAgentGuide,
  normalizeAgentLanguage,
  type AgentGuideRequest,
} from '@/components/portfolio-agent/agentContent'
import { PORTFOLIO_AGENT_MAX_OUTPUT_TOKENS } from '@/components/portfolio-agent/content/agentPersona'
import { buildPortfolioAgentPrompt } from '@/components/portfolio-agent/content/chatPrompt'
import { logRotaConversationToSlack } from '@/components/portfolio-agent/server/slackReviewLogger'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const OPENAI_RESPONSES_API_URL = 'https://api.openai.com/v1/responses'
const DEFAULT_MODEL = 'gpt-5.4-mini'
const MAX_MESSAGES = 12
const MAX_MESSAGE_CHARACTERS = 1200
const MAX_TOTAL_CHARACTERS = 6000

type ChatRole = 'user' | 'assistant'

interface ChatMessage {
  role: ChatRole
  content: string
}

interface ResponsesApiMessage {
  role: ChatRole
  content: string
}

interface ResponsesApiError {
  message?: unknown
}

interface ResponsesApiPayload {
  output_text?: unknown
  output?: unknown
  error?: ResponsesApiError
}

function jsonError(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status })
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readOptionalString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined
}

function truncateText(value: string, maxCharacters: number): string {
  return value.length > maxCharacters ? value.slice(0, maxCharacters) : value
}

function validateMessages(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) {
    throw new Error('messages must be an array.')
  }

  const messages: ChatMessage[] = []

  for (const item of value) {
    if (!isRecord(item)) {
      throw new Error('Each message must be an object.')
    }

    const role = item.role
    const content = item.content

    if (role !== 'user' && role !== 'assistant') {
      throw new Error('Each message role must be user or assistant.')
    }

    if (typeof content !== 'string') {
      throw new Error('Each message content must be a string.')
    }

    const trimmedContent = content.trim()

    if (!trimmedContent) {
      throw new Error('Message content cannot be empty.')
    }

    messages.push({
      role,
      content: truncateText(trimmedContent, MAX_MESSAGE_CHARACTERS),
    })
  }

  const limitedMessages = messages.slice(-MAX_MESSAGES)
  const lastMessage = limitedMessages.at(-1)
  const hasUserMessage = limitedMessages.some((message) => message.role === 'user')

  if (!hasUserMessage) {
    throw new Error('messages must include at least one user message.')
  }

  if (lastMessage?.role !== 'user') {
    throw new Error('The latest message must be from the user.')
  }

  return limitTotalMessageCharacters(limitedMessages)
}

function limitTotalMessageCharacters(messages: ChatMessage[]): ChatMessage[] {
  let remainingCharacters = MAX_TOTAL_CHARACTERS
  const limitedMessages: ChatMessage[] = []

  for (const message of [...messages].reverse()) {
    if (remainingCharacters <= 0) break

    const content = truncateText(message.content, remainingCharacters)
    remainingCharacters -= content.length
    limitedMessages.push({ ...message, content })
  }

  return limitedMessages.reverse()
}

function readGuideRequest(body: Record<string, unknown>): AgentGuideRequest {
  const nestedContext = isRecord(body.context)
    ? body.context
    : isRecord(body.currentGuide)
      ? body.currentGuide
    : isRecord(body.guide)
      ? body.guide
      : undefined

  return {
    language: readOptionalString(nestedContext?.language) ?? readOptionalString(body.language),
    pathname: readOptionalString(nestedContext?.pathname) ?? readOptionalString(body.pathname),
    currentSectionId: readOptionalString(nestedContext?.currentSectionId) ?? readOptionalString(body.currentSectionId),
    guideId: readOptionalString(nestedContext?.guideId)
      ?? readOptionalString(nestedContext?.id)
      ?? readOptionalString(body.guideId),
  }
}

function extractTextFromContent(content: unknown): string | undefined {
  if (typeof content === 'string') return content

  if (!Array.isArray(content)) return undefined

  const parts = content.flatMap((part) => {
    if (!isRecord(part)) return []

    const text = part.text ?? part.output_text
    return typeof text === 'string' ? [text] : []
  })

  return parts.length > 0 ? parts.join('') : undefined
}

function extractResponseText(payload: ResponsesApiPayload): string | undefined {
  if (typeof payload.output_text === 'string') {
    return payload.output_text.trim()
  }

  if (!Array.isArray(payload.output)) {
    return undefined
  }

  const textParts = payload.output.flatMap((item) => {
    if (!isRecord(item)) return []
    const text = extractTextFromContent(item.content)
    return text ? [text] : []
  })

  const text = textParts.join('').trim()
  return text || undefined
}

async function readJsonBody(request: Request): Promise<Record<string, unknown>> {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    throw new Error('Request body must be valid JSON.')
  }

  if (!isRecord(body)) {
    throw new Error('Request body must be a JSON object.')
  }

  return body
}

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return jsonError('OpenAI API key is not configured.', 503)
  }

  let body: Record<string, unknown>
  let messages: ChatMessage[]

  try {
    body = await readJsonBody(request)
    messages = validateMessages(body.messages)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid request.'
    return jsonError(message, 400)
  }

  const guideRequest = readGuideRequest(body)
  const language = normalizeAgentLanguage(guideRequest.language)
  const guide = getAgentGuide(guideRequest)
  const model = process.env.OPENAI_PORTFOLIO_AGENT_MODEL ?? DEFAULT_MODEL
  const input: ResponsesApiMessage[] = messages
  const latestUserMessage = messages.at(-1)?.content ?? ''

  let openAIResponse: Response

  try {
    openAIResponse = await fetch(OPENAI_RESPONSES_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        instructions: buildPortfolioAgentPrompt({ language, guide, latestUserMessage }),
        input,
        max_output_tokens: PORTFOLIO_AGENT_MAX_OUTPUT_TOKENS,
        text: {
          verbosity: 'low',
        },
      }),
    })
  } catch {
    return jsonError('Failed to reach OpenAI.', 502)
  }

  let payload: ResponsesApiPayload

  try {
    payload = await openAIResponse.json() as ResponsesApiPayload
  } catch {
    return jsonError('OpenAI returned a non-JSON response.', 502)
  }

  if (!openAIResponse.ok) {
    const detail = typeof payload.error?.message === 'string' ? payload.error.message : 'OpenAI request failed.'
    return jsonError(detail, 502)
  }

  const message = extractResponseText(payload)

  if (!message) {
    return jsonError('OpenAI returned an empty response.', 502)
  }

  await logRotaConversationToSlack({
    language,
    model,
    pathname: guideRequest.pathname,
    guideId: guide.id,
    guideTitle: guide.title,
    userMessage: latestUserMessage,
    assistantMessage: message,
  })

  return NextResponse.json({ message, model })
}
