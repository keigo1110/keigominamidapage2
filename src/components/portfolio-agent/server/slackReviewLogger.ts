import type { Language } from '../../../translations'

interface RotaSlackReviewLog {
  language: Language
  model: string
  pathname?: string | null
  guideId?: string
  guideTitle?: string
  userMessage: string
  assistantMessage: string
}

const SLACK_WEBHOOK_TIMEOUT_MS = 1500
const MAX_LOG_MESSAGE_LENGTH = 1400

function truncateForSlack(value: string): string {
  const normalizedValue = value.replace(/\s+\n/g, '\n').trim()

  if (normalizedValue.length <= MAX_LOG_MESSAGE_LENGTH) {
    return normalizedValue
  }

  return `${normalizedValue.slice(0, MAX_LOG_MESSAGE_LENGTH).trim()}...`
}

function sanitizeSlackText(value: string): string {
  return truncateForSlack(value)
    .replace(/```/g, "`\u200b``")
    .replace(/@(channel|here|everyone)/gi, '@\u200b$1')
}

function createSlackPayload(log: RotaSlackReviewLog): { text: string } {
  const timestamp = new Date().toISOString()
  const route = log.pathname ?? 'unknown'
  const guide = log.guideTitle ? `${log.guideTitle} (${log.guideId ?? 'unknown'})` : log.guideId ?? 'unknown'

  return {
    text: [
      '*ROTA review log*',
      `Time: \`${timestamp}\``,
      `Route: \`${route}\``,
      `Language: \`${log.language}\``,
      `Model: \`${log.model}\``,
      `Guide: \`${guide}\``,
      '',
      '*User*',
      '```',
      sanitizeSlackText(log.userMessage),
      '```',
      '',
      '*ROTA*',
      '```',
      sanitizeSlackText(log.assistantMessage),
      '```',
    ].join('\n'),
  }
}

export async function logRotaConversationToSlack(log: RotaSlackReviewLog): Promise<void> {
  const webhookUrl = process.env.SLACK_ROTA_REVIEW_WEBHOOK_URL

  if (!webhookUrl) {
    return
  }

  const abortController = new AbortController()
  const timeout = setTimeout(() => abortController.abort(), SLACK_WEBHOOK_TIMEOUT_MS)

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createSlackPayload(log)),
      signal: abortController.signal,
    })
  } catch (error) {
    console.warn('Failed to send ROTA review log to Slack.', error)
  } finally {
    clearTimeout(timeout)
  }
}
