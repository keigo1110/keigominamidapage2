export function normalizeQuery(query: string): string {
  return query.toLowerCase().replace(/\s+/g, ' ').trim()
}

export function includesKeyword(query: string, keyword: string): boolean {
  if (!keyword) return false
  return query.includes(keyword.toLowerCase())
}

export function tokenizeSearchText(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[\s,./:;()[\]'"!?、。・「」『』（）]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2)
}

export function scoreKeywordOverlap(
  query: string,
  keywords: readonly string[],
  searchableText: string,
): number {
  const directKeywordScore = keywords.reduce((score, keyword) => {
    return includesKeyword(query, keyword) ? score + 6 : score
  }, 0)
  const tokenScore = tokenizeSearchText(searchableText).reduce((score, token) => {
    return query.includes(token) ? score + 1 : score
  }, 0)

  return directKeywordScore + tokenScore
}

export function buildRetrievalQuery(
  messages: readonly { role: string; content: string }[],
): string {
  return messages
    .filter((message) => message.role === 'user')
    .slice(-3)
    .map((message) => message.content)
    .join('\n')
}
