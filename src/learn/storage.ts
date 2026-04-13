import type { LearnProgress } from './types'

const STORAGE_KEY = 'ssc-prep-learn-progress'
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000 // 259200000

function defaultProgress(): LearnProgress {
  return { version: 1, concepts: {}, lastPosition: null }
}

export function loadProgress(): LearnProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress()
    const parsed = JSON.parse(raw) as LearnProgress
    if (parsed.version !== 1) return defaultProgress()
    return parsed
  } catch {
    return defaultProgress()
  }
}

export function saveProgress(p: LearnProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
}

export function markConceptLearned(id: string): LearnProgress {
  const p = loadProgress()
  const now = Date.now()
  p.concepts[id] = {
    status: 'learned',
    learnedAt: now,
    lastReviewedAt: null,
    reviewCount: 0,
    nextReviewAt: now + THREE_DAYS_MS,
  }
  saveProgress(p)
  return p
}

export function markConceptReviewed(id: string): LearnProgress {
  const p = loadProgress()
  const existing = p.concepts[id]
  if (!existing) return p
  const now = Date.now()
  existing.lastReviewedAt = now
  existing.reviewCount++
  existing.nextReviewAt = now + THREE_DAYS_MS
  existing.status = 'learned'
  saveProgress(p)
  return p
}

export function savePosition(chapterIndex: number, conceptIndex: number): void {
  const p = loadProgress()
  p.lastPosition = { chapterIndex, conceptIndex }
  saveProgress(p)
}

export function getReviewDueIds(progress: LearnProgress): string[] {
  const now = Date.now()
  return Object.entries(progress.concepts)
    .filter(([, c]) => c.nextReviewAt <= now && c.status === 'learned')
    .map(([id]) => id)
}

export function getStats(progress: LearnProgress, totalConcepts: number) {
  const entries = Object.values(progress.concepts)
  const learned = entries.length
  const reviewDue = Object.entries(progress.concepts)
    .filter(([, c]) => c.nextReviewAt <= Date.now()).length
  return { totalConcepts, learned, reviewDue }
}
