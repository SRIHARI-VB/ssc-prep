/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║              BOOKS & AUTHORS — 3-STEP EXAM ENGINE               ║
 * ║                                                                  ║
 * ║  Step 1: Author   — "Who wrote [title]?"                        ║
 * ║  Step 2: Theme    — "What is the primary theme of [title]?"     ║
 * ║  Step 3: Award    — "Which award is associated with [title]?"   ║
 * ║                                                                  ║
 * ║  SSC Format entries bypass the 3-step flow and run as a        ║
 * ║  single-question with options[] defined in data.                ║
 * ║                                                                  ║
 * ║  Contract: every BookEngineEntry must have                      ║
 * ║    authorOptions[4], themeOptions[4], awardOptions[4]           ║
 * ║  (or options[4] for SSC Format entries)                         ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import { useState, useCallback, useMemo } from 'react'
import type { BookEngineEntry } from './types'
import QuestionContent from '../components/QuestionContent'

// ── Types ────────────────────────────────────────────────────────────────────

type Step  = 1 | 2 | 3
type Phase = 'question' | 'correct' | 'wrong' | 'complete'

interface State {
  book:          BookEngineEntry
  step:          Step
  phase:         Phase
  score:         number
  streak:        number
  totalAnswered: number
  correct:       number
  queue:         BookEngineEntry[]
  cycleNum:      number
}

export interface CategoryStyle {
  chip:   string   // e.g. "bg-amber-100 text-amber-800 border-amber-300"
  active: string   // e.g. "bg-amber-500 text-white border-amber-500"
  grad:   string   // gradient for "Book Mastered" screen e.g. "from-amber-600 to-yellow-600"
  icon:   string
}

export type CategoryStyles = Record<string, CategoryStyle>

interface BooksExamEngineProps {
  /** Pre-filtered books from parent */
  books: BookEngineEntry[]
  /** All books (for total count display) */
  totalCount: number
  categoryStyles: CategoryStyles
  /** Optional accent for progress bar */
  barClass?: string
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const STEPS = [
  { step: 1 as Step, label: 'Author', icon: '✍️',  question: 'Who is the author of this book?' },
  { step: 2 as Step, label: 'Theme',  icon: '📖',  question: 'What is the primary theme of this book?' },
  { step: 3 as Step, label: 'Award',  icon: '🏆',  question: 'Which award / recognition is associated with it?' },
]

/** Get the correct answer for current step */
function getCorrect(book: BookEngineEntry, step: Step): string {
  if (book.questionType && book.answer) return book.answer  // SSC Format override
  return step === 1 ? book.author : step === 2 ? book.theme : book.award
}

/** Get the options for current step */
function getStepOptions(book: BookEngineEntry, step: Step): [string, string, string, string] {
  if (book.questionType && book.options && book.options.length === 4) {
    return book.options as [string, string, string, string]
  }
  return step === 1 ? book.authorOptions : step === 2 ? book.themeOptions : book.awardOptions
}

// ── Component ────────────────────────────────────────────────────────────────

export default function BooksExamEngine({
  books,
  totalCount,
  categoryStyles,
  barClass = 'bg-indigo-400',
}: BooksExamEngineProps) {

  const [state, setState] = useState<State>(() => {
    const shuffled = shuffle(books)
    return {
      book: shuffled[0], step: 1, phase: 'question',
      score: 0, streak: 0, totalAnswered: 0, correct: 0,
      queue: shuffled.slice(1), cycleNum: 1,
    }
  })
  const [selected, setSelected] = useState<string | null>(null)
  const [shaking,  setShaking]  = useState(false)

  const { book, step, phase } = state
  const correct = useMemo(() => getCorrect(book, step), [book, step])
  const options  = useMemo(() => getStepOptions(book, step), [book, step])
  const stepDef  = STEPS.find(s => s.step === step)!
  const catStyle = categoryStyles[book.category] ?? {
    chip: 'bg-slate-100 text-slate-800 border-slate-300',
    active: 'bg-slate-500 text-white border-slate-500',
    grad: 'from-slate-600 to-slate-700',
    icon: '📚',
  }
  const accuracy = state.totalAnswered > 0 ? Math.round((state.correct / state.totalAnswered) * 100) : 0

  // ── Handlers ────────────────────────────────────────────────────────────

  const handleAnswer = useCallback((opt: string) => {
    if (phase !== 'question') return
    setSelected(opt)

    if (opt === correct) {
      setState(s => ({
        ...s, phase: 'correct',
        score: s.score + 10 + (s.streak >= 2 ? 5 : 0),
        streak: s.streak + 1, totalAnswered: s.totalAnswered + 1, correct: s.correct + 1,
      }))
      setTimeout(() => {
        setState(s => {
          const isSscFormat = !!s.book.questionType
          const isLastStep  = s.step === 3
          if (isSscFormat || isLastStep) return { ...s, phase: 'complete' }
          return { ...s, step: (s.step + 1) as Step, phase: 'question' }
        })
        setSelected(null)
      }, 900)
    } else {
      setShaking(true)
      setState(s => ({
        ...s, phase: 'wrong',
        score: Math.max(0, s.score - 5), streak: 0,
        totalAnswered: s.totalAnswered + 1,
      }))
      setTimeout(() => {
        setShaking(false)
        setState(s => ({ ...s, phase: 'question' }))
        setSelected(null)
      }, 1300)
    }
  }, [phase, correct])

  const nextBook = useCallback(() => {
    setSelected(null)
    setState(s => {
      const newQueue = s.queue.length > 0 ? s.queue : shuffle(books)
      const newCycle = s.queue.length > 0 ? s.cycleNum : s.cycleNum + 1
      return { ...s, book: newQueue[0], step: 1, phase: 'question', queue: newQueue.slice(1), cycleNum: newCycle }
    })
  }, [books])

  // ── Option styling ─────────────────────────────────────────────────────

  const optCls = (opt: string) => {
    const base = 'text-left p-4 rounded-xl border-2 text-sm font-medium transition-all leading-snug '
    if (!selected) return base + 'border-slate-200 bg-white text-slate-700 hover:border-indigo-400 hover:bg-indigo-50'
    if (opt === correct) return base + 'border-emerald-400 bg-emerald-50 text-emerald-800 font-bold'
    if (opt === selected && opt !== correct) return base + 'border-red-400 bg-red-50 text-red-700'
    return base + 'border-slate-100 bg-slate-50 text-slate-400'
  }

  // ── Progress numbers ───────────────────────────────────────────────────
  const qDone  = books.length - state.queue.length
  const pctDone = (qDone / books.length) * 100

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

      {/* ── Score Panel (left col on large screens) ─────────────────── */}
      <div className="bg-brand-900 text-white rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-300 text-xs uppercase tracking-widest">Live Stats</h3>
          <span className="text-xs text-slate-400 bg-white/10 px-2 py-0.5 rounded-full">
            {qDone}/{books.length}{books.length < totalCount ? ` of ${totalCount}` : ''} · C{state.cycleNum}
          </span>
        </div>

        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full ${barClass} rounded-full transition-all duration-300`} style={{ width: `${pctDone}%` }} />
        </div>

        {[
          { label: 'Score',       value: state.score,         color: 'text-indigo-400' },
          { label: '🔥 Streak',   value: state.streak,        color: 'text-amber-400' },
          { label: '🎯 Accuracy', value: `${accuracy}%`,      color: 'text-emerald-400' },
          { label: 'Answered',    value: state.totalAnswered, color: 'text-slate-300' },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex justify-between items-center bg-white/5 rounded-xl px-4 py-3">
            <span className="text-sm text-slate-300">{label}</span>
            <span className={`text-xl font-extrabold ${color}`}>{value}</span>
          </div>
        ))}

        <div className="border-t border-white/10 pt-4">
          <p className="text-xs text-slate-500 mb-1 font-medium">Current Book</p>
          <p className="font-bold text-white text-sm leading-snug">{book.title}</p>
          <span className="text-xs font-bold mt-1 inline-block text-indigo-300">
            {catStyle.icon} {book.category}
          </span>
        </div>

        {book.mnemonic && (
          <div className="border-t border-white/10 pt-4">
            <p className="text-xs text-slate-500 mb-1 font-medium">Memory Hook</p>
            <p className="font-mnemonic text-xs text-amber-400 italic leading-relaxed">
              &quot;{book.mnemonic}&quot;
            </p>
          </div>
        )}

        <button onClick={nextBook}
          className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-sm font-semibold transition-colors">
          Skip Book →
        </button>
      </div>

      {/* ── Quiz Card (right 2 cols) ─────────────────────────────────── */}
      <div className={`lg:col-span-2 ${shaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>

        {/* ── COMPLETE STATE ────────────────────────────────────────── */}
        {phase === 'complete' ? (
          <div className={`bg-gradient-to-br ${catStyle.grad} rounded-2xl shadow-xl p-10 text-center text-white animate-pop-in`}>
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-extrabold mb-2">
              {book.questionType ? 'Correct!' : 'Book Mastered!'}
            </h3>
            {!book.questionType && (
              <>
                <p className="text-white/70 mb-2 text-sm">All 3 dimensions correct for:</p>
                <p className="font-bold text-xl mb-6 bg-white/10 rounded-xl px-4 py-2 inline-block">
                  &quot;{book.title}&quot;
                </p>
                <div className="grid grid-cols-3 gap-3 mb-8 text-xs">
                  {[
                    { label: 'Author', value: book.author },
                    { label: 'Theme',  value: book.theme  },
                    { label: 'Award',  value: book.award  },
                  ].map(d => (
                    <div key={d.label} className="bg-white/15 rounded-xl p-3">
                      <p className="font-bold text-white/80">{d.label}</p>
                      <p className="text-white mt-1 leading-tight">{d.value}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
            <button onClick={nextBook}
              className="px-8 py-3 rounded-xl bg-white text-slate-800 font-extrabold shadow-lg hover:bg-slate-100 transition-all">
              Next Book →
            </button>
          </div>

        ) : (
        /* ── QUESTION STATE ─────────────────────────────────────────── */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Step progress bar */}
            <div className="px-6 pt-5 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                {book.questionType ? (
                  <span className="text-xs font-bold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1 rounded-full">
                    📋 SSC CGL Format · {book.title}
                  </span>
                ) : (
                  STEPS.map(s => (
                    <div key={s.step} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        s.step < step   ? 'bg-emerald-500 text-white' :
                        s.step === step ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' :
                                          'bg-slate-100 text-slate-400'
                      }`}>
                        {s.step < step ? '✓' : s.step}
                      </div>
                      <span className={`text-xs font-semibold hidden sm:block ${s.step === step ? 'text-indigo-700' : 'text-slate-400'}`}>
                        {s.label}
                      </span>
                      {s.step < 3 && <span className="text-slate-200 text-xs">→</span>}
                    </div>
                  ))
                )}
                <span className={`ml-auto text-xs font-bold px-2.5 py-1 rounded-full border ${catStyle.chip}`}>
                  {catStyle.icon} {book.category}
                </span>
              </div>
              {!book.questionType && (
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 transition-all duration-500 rounded-full"
                    style={{ width: `${((step - 1) / 3) * 100}%` }} />
                </div>
              )}
            </div>

            {/* Question body */}
            <div className="p-6">
              {book.questionType ? (
                <div className="mb-4">
                  <QuestionContent
                    question={book.question ?? stepDef.question}
                    questionType={book.questionType}
                    statements={book.statements}
                    assertion={book.assertion}
                    reason={book.reason}
                    matchLeft={book.matchLeft}
                    matchRight={book.matchRight}
                  />
                </div>
              ) : (
                <div className="flex items-start gap-3 mb-6">
                  <span className="text-2xl shrink-0">{stepDef.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Step {step} of 3
                    </p>
                    <p className="text-base font-semibold text-slate-700">{stepDef.question}</p>
                    <p className="text-xl font-extrabold text-brand-900 mt-2 leading-snug">
                      &quot;{book.title}&quot;
                    </p>
                  </div>
                </div>
              )}

              {/* Options — always 4, always explicit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {options.map(opt => (
                  <button key={opt} onClick={() => handleAnswer(opt)}
                    disabled={phase !== 'question'} className={optCls(opt)}>
                    <span>{opt}</span>
                    {selected && opt === correct && <span className="ml-2 text-emerald-500 font-bold">✓</span>}
                    {phase === 'wrong' && opt === selected && opt !== correct && <span className="ml-2 text-red-500 font-bold">✗</span>}
                  </button>
                ))}
              </div>

              {/* Wrong answer hint */}
              {phase === 'wrong' && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 animate-fade-slide">
                  <p className="text-xs font-bold text-amber-700 mb-1">💡 Memory hook:</p>
                  <p className="font-mnemonic text-amber-700 text-sm italic">&quot;{book.mnemonic}&quot;</p>
                </div>
              )}

              {/* Correct step feedback (non-complete) */}
              {phase === 'correct' && step < 3 && !book.questionType && (
                <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 animate-fade-slide flex items-center gap-2">
                  <span className="text-emerald-600 font-bold text-lg">✓</span>
                  <p className="text-xs font-semibold text-emerald-700">
                    Correct! Moving to Step {step + 1}…
                    {state.streak >= 2 && <span className="ml-2 text-amber-600">🔥 Streak +5!</span>}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
