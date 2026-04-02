// Shared SSC CGL question type definitions used across all topic modules

export type QuestionType =
  | 'mcq'              // Standard MCQ (default — randomly generated distractors)
  | 'multi-statement'  // Statement 1 & 2 — "which is/are correct?" format
  | 'assertion-reason' // Assertion (A) and Reason (R) format
  | 'match-following'  // Match Column A with Column B
  | 'sequence'         // Arrange items in correct chronological/logical order

// Add these optional fields to any entry interface that needs SSC CGL format support
export interface SSCQuestionFields {
  questionType?: QuestionType

  // For 'multi-statement' and 'sequence'
  statements?: string[]

  // For 'assertion-reason'
  assertion?: string
  reason?: string

  // For 'match-following'
  matchLeft?: string[]   // Column A items (numbered)
  matchRight?: string[]  // Column B items (lettered a/b/c…)

  // Pre-defined options for non-MCQ types (overrides auto-generated distractors)
  options?: string[]
}

// ── Standard fixed option sets ────────────────────────────────────────────────

export const MULTI_STATEMENT_2_OPTIONS = [
  'Both Statement 1 and Statement 2 are correct',
  'Only Statement 1 is correct',
  'Only Statement 2 is correct',
  'Neither Statement 1 nor Statement 2 is correct',
]

export const ASSERTION_REASON_OPTIONS = [
  'Both A and R are true, and R is the correct explanation of A',
  'Both A and R are true, but R is NOT the correct explanation of A',
  'A is true but R is false',
  'A is false but R is true',
]
