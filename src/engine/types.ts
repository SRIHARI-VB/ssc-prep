/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║            SSC CGL PREP — SHARED ENGINE TYPES                   ║
 * ║                                                                  ║
 * ║  Every question MUST supply options[4] explicitly.              ║
 * ║  No auto-generation. This is enforced at the TypeScript level.  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * HOW TO ADD A NEW QUESTION
 * ─────────────────────────
 * 1. Pick the right module data file (e.g. src/topics/science-tech/data.ts)
 * 2. Add an entry implementing SciQuestion (or the module's own type)
 * 3. Set type: 'mcq' | 'multi-statement' | 'assertion-reason' | 'match-following' | 'sequence'
 * 4. Provide options: exactly 4 strings, ALL of the same semantic type
 *    - Year question   → ["1947", "1950", "1953", "1962"]        ✓
 *    - Organ question  → ["Liver", "Kidney", "Spleen", "Pancreas"] ✓
 *    - NEVER mix types → ["Liver", "1953", "Vitamin D", "India"]  ✗
 * 5. Set answer: must exactly match one of options
 * 6. For SSC format types supply the matching extra fields (see below)
 */

// ── Question types ──────────────────────────────────────────────────────────

export type QuestionType =
  | 'mcq'               // standard multiple-choice
  | 'multi-statement'   // "Which of the following statements is/are correct?"
  | 'assertion-reason'  // "Both A and R are true and R correctly explains A…"
  | 'match-following'   // "Match Column A with Column B"
  | 'sequence'          // "Arrange in correct chronological / ascending order"

export type Difficulty = 'Hot' | 'High' | 'Confirmed' | 'Recurring'

// ── Pre-defined options for standard SSC CGL formats ───────────────────────

export const MULTI_STATEMENT_OPTIONS = [
  'Both Statement 1 and Statement 2 are correct',
  'Only Statement 1 is correct',
  'Only Statement 2 is correct',
  'Neither Statement 1 nor Statement 2 is correct',
] as const satisfies [string, string, string, string]

export const ASSERTION_REASON_OPTIONS = [
  'Both A and R are true, and R is the correct explanation of A',
  'Both A and R are true, but R is NOT the correct explanation of A',
  'A is true but R is false',
  'A is false but R is true',
] as const satisfies [string, string, string, string]

// Convenience re-exports kept for backward compat with existing data files
export const MULTI_STATEMENT_2_OPTIONS = MULTI_STATEMENT_OPTIONS
export const ASSERTION_REASON_OPTIONS_EXPORT = ASSERTION_REASON_OPTIONS

// ── Core question interface ─────────────────────────────────────────────────

/**
 * Every question in every non-books module must satisfy this interface.
 * The critical contract: `options` is a required tuple of EXACTLY 4 strings.
 */
export interface EngineQuestion {
  id: number
  /** Human-readable sub-topic label shown on the card, e.g. "Human Body" */
  topic: string
  /**
   * Question format — omit or set 'mcq' for a plain multiple-choice question.
   * For 'multi-statement' and 'sequence': populate `statements[]`.
   * For 'assertion-reason': populate `assertion` and `reason`.
   * For 'match-following': populate `matchLeft[]` and `matchRight[]`.
   */
  questionType?: QuestionType
  /** The stem of the question shown to the learner */
  question: string
  /**
   * REQUIRED: exactly four answer choices.
   * All four must be of the SAME semantic type (all years / all organs / all acts…).
   * The correct answer must match the `answer` field exactly.
   */
  options: [string, string, string, string]
  /**
   * The correct answer.
   * MUST be one of the four `options` strings (character-for-character identical).
   */
  answer: string
  /** Shown in the feedback panel after the learner answers */
  explanation: string
  /** Short one-line memory hook shown as a hint after wrong answer */
  hint?: string
  /** Exam relevance weight */
  examProb: Difficulty
  // ── SSC format helper fields ──────────────────────────────────────────
  /** For 'multi-statement' and 'sequence': the numbered items */
  statements?: string[]
  /** For 'assertion-reason': the Assertion (A) text */
  assertion?: string
  /** For 'assertion-reason': the Reason (R) text */
  reason?: string
  /** For 'match-following': left-column labels, e.g. ["1. Ganga", "2. Brahmaputra", …] */
  matchLeft?: string[]
  /** For 'match-following': right-column labels, e.g. ["A. Uttarakhand", "B. Arunachal Pradesh", …] */
  matchRight?: string[]
}

// ── Books-Authors module (separate 3-step design) ───────────────────────────

/**
 * Books module keeps its own 3-step quiz (Author → Theme → Award).
 * Each book stores THREE explicit option pools — one per step.
 * No auto-generation from answer fields.
 */
export interface BookEngineEntry {
  id: number
  title: string
  author: string
  theme: string
  award: string
  category: string
  examProb: Difficulty
  mnemonic: string
  /** 4 author-name options for Step 1 — one must match `author` exactly */
  authorOptions: [string, string, string, string]
  /** 4 theme options for Step 2 — one must match `theme` exactly */
  themeOptions: [string, string, string, string]
  /** 4 award options for Step 3 — one must match `award` exactly */
  awardOptions: [string, string, string, string]
  // ── Optional SSC CGL format override (single-step) ──────────────────
  questionType?: QuestionType
  question?: string
  options?: [string, string, string, string]
  answer?: string
  statements?: string[]
  assertion?: string
  reason?: string
  matchLeft?: string[]
  matchRight?: string[]
}

// ── Category styling helpers (used by ExamEngine + module ExamLoops) ─────────

export interface CategoryDef {
  icon: string
  /** Tailwind chip classes: border + bg + text, e.g. "border-blue-400 bg-blue-50 text-blue-700" */
  color: string
}

export type CategoryMap = Record<string, CategoryDef>

// ── Accent palette for module theming ──────────────────────────────────────

export interface AccentPalette {
  /** Active filter chip  — bg + text + border classes */
  chipActive: string
  /** Option button hover classes */
  optHover: string
  /** Progress bar fill class */
  bar: string
  /** Score number text color */
  scoreText: string
  /** "Next Question" button classes */
  nextBtn: string
  /** Text accent color for cycle counter, etc. */
  text: string
}
