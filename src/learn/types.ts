import type { Page } from '../types'

// ── Learn Concept (unified across all 14 topics) ────────────────────

export interface LearnConcept {
  id: string                 // 'economics-4' (topicSlug-originalId)
  sourceModule: Page
  category: string
  title: string              // concept heading
  explanation: string        // the teaching content (2-5 lines)
  memoryHook: string | null  // shortcut / mnemonic
  pyqContext: string         // "SSC CGL 2023, 2021 PYQ"
  examProb: 'Hot' | 'Confirmed'
  // Optional comprehension check
  checkQuestion?: string
  checkOptions?: [string, string, string, string]
  checkAnswer?: string
}

// ── Curriculum Structure ────────────────────────────────────────────

export interface Chapter {
  id: string
  title: string
  description: string
  sourceModule: Page
  icon: string
  accent: string             // tailwind color class
  concepts: LearnConcept[]   // filled by adapters at init
}

// ── Progress Tracking (localStorage) ────────────────────────────────

export interface ConceptProgress {
  status: 'learned' | 'review-due'
  learnedAt: number          // timestamp ms
  lastReviewedAt: number | null
  reviewCount: number
  nextReviewAt: number       // learnedAt + 3 days
}

export interface LearnProgress {
  version: 1
  concepts: Record<string, ConceptProgress>
  lastPosition: {
    chapterIndex: number
    conceptIndex: number
  } | null
}

// ── Glossary ────────────────────────────────────────────────────────

export type GlossaryType = 'award' | 'organization' | 'person' | 'technical' | 'place'

export interface GlossaryEntry {
  term: string
  aliases?: string[]
  type: GlossaryType
  brief: string
  established?: string
  related?: string[]
}
