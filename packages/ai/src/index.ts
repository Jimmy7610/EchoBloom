/**
 * EchoBloom AI Module — MVP Sentiment & Insight Engine
 * 
 * This module provides rule-based sentiment analysis for the MVP.
 * It is designed to be swapped out for an OpenAI-powered version
 * once API keys are configured, without changing the interface.
 */

// -- Types --

export type Sentiment = 'positive' | 'neutral' | 'negative'

export interface SentimentResult {
  sentiment: Sentiment
  confidence: number // 0 to 1
}

export interface ResponseData {
  id: string
  prompt_id: string
  rating_value: number | null
  emoji_value: string | null
  text_value: string | null
  created_at: string
}

export interface AISummary {
  overallSentiment: Sentiment
  sentimentBreakdown: { positive: number; neutral: number; negative: number }
  summary: string
  themes: string[]
  suggestedActions: string[]
  negativeCount: number
  totalResponses: number
}

// -- Sentiment Keywords --

const POSITIVE_WORDS = [
  'great', 'love', 'awesome', 'easy', 'good', 'excellent', 'amazing',
  'helpful', 'fantastic', 'perfect', 'smooth', 'intuitive', 'clear',
  'wonderful', 'nice', 'simple', 'fast', 'quick', 'beautiful', 'best',
  'happy', 'pleased', 'impressed', 'enjoy', 'convenient', 'useful',
]

const NEGATIVE_WORDS = [
  'bad', 'terrible', 'awful', 'confusing', 'slow', 'broken', 'hate',
  'frustrating', 'annoying', 'difficult', 'hard', 'complicated',
  'unclear', 'bug', 'error', 'crash', 'stuck', 'lost', 'worst',
  'horrible', 'useless', 'disappointed', 'problem', 'issue', 'fail',
  'ugly', 'laggy', 'clunky', 'overwhelming',
]

// Common theme keyword groups
const THEME_GROUPS: Record<string, string[]> = {
  'Setup difficulty': ['setup', 'install', 'configure', 'onboard', 'start', 'begin', 'getting started'],
  'UI/UX confusion': ['confusing', 'unclear', 'hard to find', 'navigate', 'layout', 'design', 'ui', 'ux', 'interface'],
  'Performance issues': ['slow', 'lag', 'loading', 'speed', 'fast', 'performance', 'crash', 'freeze'],
  'Documentation gaps': ['docs', 'documentation', 'help', 'guide', 'tutorial', 'instructions', 'explain'],
  'Feature requests': ['wish', 'want', 'need', 'missing', 'add', 'feature', 'would be nice', 'should have'],
  'Positive experience': ['love', 'great', 'awesome', 'easy', 'simple', 'smooth', 'intuitive', 'perfect'],
}

// -- Core Functions --

/** Classify the sentiment of a single text response */
export function classifySentiment(text: string): SentimentResult {
  if (!text || text.trim().length === 0) {
    return { sentiment: 'neutral', confidence: 0.5 }
  }

  const lower = text.toLowerCase()
  const words = lower.split(/\s+/)

  let positiveScore = 0
  let negativeScore = 0

  for (const word of words) {
    if (POSITIVE_WORDS.some(pw => word.includes(pw))) positiveScore++
    if (NEGATIVE_WORDS.some(nw => word.includes(nw))) negativeScore++
  }

  const total = positiveScore + negativeScore
  if (total === 0) return { sentiment: 'neutral', confidence: 0.5 }

  if (positiveScore > negativeScore) {
    return { sentiment: 'positive', confidence: Math.min(0.5 + (positiveScore - negativeScore) / total * 0.5, 1) }
  } else if (negativeScore > positiveScore) {
    return { sentiment: 'negative', confidence: Math.min(0.5 + (negativeScore - positiveScore) / total * 0.5, 1) }
  }
  return { sentiment: 'neutral', confidence: 0.5 }
}

/** Classify sentiment from emoji value */
export function classifyEmojiSentiment(emoji: string): SentimentResult {
  const emojiMap: Record<string, Sentiment> = {
    'love': 'positive',
    'happy': 'positive',
    'neutral': 'neutral',
    'sad': 'negative',
    'angry': 'negative',
  }
  return {
    sentiment: emojiMap[emoji] || 'neutral',
    confidence: 0.85,
  }
}

/** Classify sentiment from a 1-5 rating */
export function classifyRatingSentiment(rating: number): SentimentResult {
  if (rating >= 4) return { sentiment: 'positive', confidence: 0.9 }
  if (rating === 3) return { sentiment: 'neutral', confidence: 0.7 }
  return { sentiment: 'negative', confidence: 0.9 }
}

/** Classify sentiment for a single response (any type) */
export function classifyResponseSentiment(response: ResponseData): SentimentResult {
  // Priority: rating > emoji > text
  if (response.rating_value != null) {
    return classifyRatingSentiment(response.rating_value)
  }
  if (response.emoji_value) {
    return classifyEmojiSentiment(response.emoji_value)
  }
  if (response.text_value) {
    return classifySentiment(response.text_value)
  }
  return { sentiment: 'neutral', confidence: 0.3 }
}

/** Extract recurring themes from a set of text responses */
export function extractThemes(responses: ResponseData[]): string[] {
  const texts = responses
    .map(r => r.text_value)
    .filter(Boolean)
    .map(t => t!.toLowerCase())

  if (texts.length === 0) return []

  const combined = texts.join(' ')
  const found: { theme: string; count: number }[] = []

  for (const [theme, keywords] of Object.entries(THEME_GROUPS)) {
    let count = 0
    for (const kw of keywords) {
      if (combined.includes(kw)) count++
    }
    if (count > 0) found.push({ theme, count })
  }

  return found
    .sort((a, b) => b.count - a.count)
    .slice(0, 4)
    .map(f => f.theme)
}

/** Generate a full AI summary from a set of responses */
export function generateSummary(responses: ResponseData[]): AISummary {
  if (responses.length === 0) {
    return {
      overallSentiment: 'neutral',
      sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
      summary: 'No responses collected yet. Once users start submitting feedback, insights will appear here.',
      themes: [],
      suggestedActions: ['Create and activate your first prompt', 'Embed the widget on your app'],
      negativeCount: 0,
      totalResponses: 0,
    }
  }

  // Classify all responses
  const sentiments = responses.map(r => classifyResponseSentiment(r))
  const breakdown = { positive: 0, neutral: 0, negative: 0 }
  for (const s of sentiments) {
    breakdown[s.sentiment]++
  }

  // Overall sentiment
  let overallSentiment: Sentiment = 'neutral'
  if (breakdown.positive > breakdown.negative && breakdown.positive > breakdown.neutral) {
    overallSentiment = 'positive'
  } else if (breakdown.negative > breakdown.positive) {
    overallSentiment = 'negative'
  }

  // Extract themes
  const themes = extractThemes(responses)

  // Generate summary text
  const total = responses.length
  const posPercent = Math.round((breakdown.positive / total) * 100)
  const negPercent = Math.round((breakdown.negative / total) * 100)

  let summary = ''
  if (overallSentiment === 'positive') {
    summary = `Overall sentiment is positive with ${posPercent}% of responses expressing satisfaction. `
  } else if (overallSentiment === 'negative') {
    summary = `Warning: Sentiment is trending negative with ${negPercent}% of responses expressing frustration. `
  } else {
    summary = `Sentiment is mixed — ${posPercent}% positive and ${negPercent}% negative. `
  }

  if (themes.length > 0) {
    summary += `Key themes include: ${themes.join(', ')}. `
  }

  if (breakdown.negative > 0) {
    summary += `${breakdown.negative} response${breakdown.negative > 1 ? 's' : ''} flagged as negative and may require attention.`
  }

  // Generate suggested actions
  const suggestedActions: string[] = []
  if (themes.includes('Setup difficulty')) {
    suggestedActions.push('Simplify the onboarding setup flow')
  }
  if (themes.includes('UI/UX confusion')) {
    suggestedActions.push('Review navigation and layout for clarity')
  }
  if (themes.includes('Performance issues')) {
    suggestedActions.push('Investigate and resolve performance bottlenecks')
  }
  if (themes.includes('Documentation gaps')) {
    suggestedActions.push('Expand help docs and add inline tooltips')
  }
  if (themes.includes('Feature requests')) {
    suggestedActions.push('Review and prioritize user-requested features')
  }
  if (breakdown.negative > total * 0.3) {
    suggestedActions.push('Urgently review negative feedback for recurring patterns')
  }
  if (suggestedActions.length === 0) {
    suggestedActions.push('Continue monitoring feedback trends')
  }

  return {
    overallSentiment,
    sentimentBreakdown: breakdown,
    summary,
    themes,
    suggestedActions,
    negativeCount: breakdown.negative,
    totalResponses: total,
  }
}
