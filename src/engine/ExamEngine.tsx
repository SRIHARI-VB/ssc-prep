/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║                    SHARED EXAM ENGINE                           ║
 * ║                                                                  ║
 * ║  Used by: Science-Tech, Polity, Govt-Schemes, Geography,        ║
 * ║           Union-Budget modules.                                  ║
 * ║  Books-Authors has its own 3-step engine (BooksExamEngine.tsx)  ║
 * ║                                                                  ║
 * ║  Contract: every question in `questions` prop MUST have         ║
 * ║  options[4] set explicitly. No auto-generation here.            ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * USAGE
 * ─────
 * The parent (module ExamLoop) is responsible for:
 *   1. Managing filter state (category, difficulty, SSC Format, extras)
 *   2. Computing the filtered question array
 *   3. Rendering the filter bar UI
 *   4. Passing the filtered array + a unique `key` so the engine resets
 *      when filters change:
 *
 *   <ExamEngine
 *     key={`${filterCat}-${filterProb}`}   ← forces remount = state reset
 *     questions={filteredQuestions}
 *     getCat={q => q.subject}
 *     catDef={SUBJECT_DEF}
 *     accent={ACCENT}
 *     sectionId="sci-loop"
 *   />
 */

import { useState, useCallback } from 'react'
import type { EngineQuestion, AccentPalette, CategoryMap } from './types'
import QuestionContent from '../components/QuestionContent'

// ── Types ───────────────────────────────────────────────────────────────────

type Phase = 'question' | 'correct' | 'wrong'

interface State {
  card:     EngineQuestion
  phase:    Phase
  score:    number
  total:    number
  queue:    EngineQuestion[]
  cycleNum: number
}

export interface ExamEngineProps {
  /** Pre-filtered questions from the parent. All must have options[4]. */
  questions: EngineQuestion[]
  /** Extract the category string from a question */
  getCat: (q: EngineQuestion) => string
  /** Icon + color definitions keyed by category string */
  catDef: CategoryMap
  /** Visual theme for this module */
  accent: AccentPalette
  /** HTML id for the <section> wrapper, e.g. "sci-loop" */
  sectionId: string
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const DIFF_CHIP: Record<string, string> = {
  Hot:       'bg-red-100 text-red-700 border border-red-200',
  High:      'bg-orange-100 text-orange-700 border border-orange-200',
  Confirmed: 'bg-green-100 text-green-700 border border-green-200',
  Recurring: 'bg-violet-100 text-violet-700 border border-violet-200',
}

const TYPE_LABEL: Record<string, string> = {
  'multi-statement': '📋 Multi-Statement',
  'assertion-reason': '⚖️ Assertion-Reason',
  'match-following':  '🔗 Match the Following',
  'sequence':         '📅 Sequence',
}

// ── Component ───────────────────────────────────────────────────────────────

export default function ExamEngine({
  questions,
  getCat,
  catDef,
  accent,
  sectionId,
}: ExamEngineProps) {

  // Filter to only questions that have all 4 options — prevents runtime crashes
  // on entries that are still being migrated
  const validQuestions = questions.filter(q => Array.isArray(q.options) && q.options.length === 4)
  const activeQuestions = validQuestions.length > 0 ? validQuestions : questions

  // ── State ──────────────────────────────────────────────────────────────
  const [state, setState] = useState<State>(() => {
    const shuffled = shuffle(activeQuestions)
    return {
      card:     shuffled[0],
      phase:    'question',
      score:    0,
      total:    0,
      queue:    shuffled.slice(1),
      cycleNum: 1,
    }
  })
  const [selected, setSelected] = useState<string | null>(null)
  const [shake,    setShake]    = useState(false)

  // ── Handlers ───────────────────────────────────────────────────────────

  const handleSelect = useCallback((opt: string) => {
    if (state.phase !== 'question') return
    const isCorrect = opt === state.card.answer
    setSelected(opt)
    if (!isCorrect) {
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
    setState(s => ({
      ...s,
      phase: isCorrect ? 'correct' : 'wrong',
      score: isCorrect ? s.score + 1 : s.score,
      total: s.total + 1,
    }))
  }, [state])

  const nextQuestion = useCallback(() => {
    setSelected(null)
    setState(s => {
      const newQueue  = s.queue.length > 0 ? s.queue : shuffle(activeQuestions)
      const newCycle  = s.queue.length > 0 ? s.cycleNum : s.cycleNum + 1
      const card      = newQueue[0]
      return { ...s, card, phase: 'question', queue: newQueue.slice(1), cycleNum: newCycle }
    })
  }, [activeQuestions])

  // ── Derived ────────────────────────────────────────────────────────────
  const { card, phase, score, total } = state
  const accuracy  = total > 0 ? Math.round((score / total) * 100) : 0
  const qDone     = activeQuestions.length - state.queue.length
  const pctDone   = (qDone / activeQuestions.length) * 100
  const cat       = getCat(card)
  const catMeta   = catDef[cat] ?? { icon: '❓', color: 'border-slate-300 bg-slate-50 text-slate-600' }

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div id={sectionId} className="max-w-2xl mx-auto">

      {/* ── Cycle progress bar ──────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className={`text-xs font-bold ${accent.text}`}>
          Q {qDone} / {activeQuestions.length}
        </span>
        <span className="text-xs font-semibold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
          Cycle {state.cycleNum}
        </span>
      </div>
      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-5">
        <div
          className={`h-full ${accent.bar} rounded-full transition-all duration-300`}
          style={{ width: `${pctDone}%` }}
        />
      </div>

      {/* ── Score bar ───────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="text-center min-w-[40px]">
          <p className={`text-2xl font-extrabold ${accent.scoreText}`}>{score}</p>
          <p className="text-[10px] text-slate-400">Correct</p>
        </div>
        <div className="flex-1">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${accent.bar} rounded-full transition-all duration-500`}
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>
        <div className="text-center min-w-[48px]">
          <p className="text-2xl font-extrabold text-slate-700">{accuracy}%</p>
          <p className="text-[10px] text-slate-400">Accuracy</p>
        </div>
        <div className="text-center min-w-[40px]">
          <p className="text-2xl font-extrabold text-slate-400">{total}</p>
          <p className="text-[10px] text-slate-400">Done</p>
        </div>
      </div>

      {/* ── Question card ───────────────────────────────────────────── */}
      <div className={`bg-white rounded-2xl border-2 p-6 shadow-lg mb-4 transition-colors ${
        phase === 'correct' ? 'border-green-400' :
        phase === 'wrong'   ? 'border-red-400'   : 'border-slate-200'
      } ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>

        {/* Card header: category chip + type badge + difficulty */}
        <div className="flex items-start justify-between mb-4 gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border shrink-0 ${catMeta.color}`}>
            {catMeta.icon} {cat}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {card.questionType && card.questionType !== 'mcq' && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200">
                {TYPE_LABEL[card.questionType] ?? card.questionType}
              </span>
            )}
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${DIFF_CHIP[card.examProb] ?? ''}`}>
              {card.examProb}
            </span>
          </div>
        </div>

        {/* Sub-topic */}
        {card.topic && (
          <p className="text-[11px] text-slate-400 font-medium mb-3">{card.topic}</p>
        )}

        {/* Question body — handles MCQ, multi-statement, A-R, match, sequence */}
        <QuestionContent
          question={card.question}
          questionType={card.questionType}
          statements={card.statements}
          assertion={card.assertion}
          reason={card.reason}
          matchLeft={card.matchLeft}
          matchRight={card.matchRight}
        />

        {/* Answer options — always 4, always explicit */}
        <div className="grid grid-cols-1 gap-2.5 mt-4">
          {card.options.map((opt, i) => {
            const isCorrect  = opt === card.answer
            const isSelected = opt === selected

            let cls = 'text-left w-full px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-150 '
            if (phase === 'question') {
              cls += `border-slate-200 bg-slate-50 ${accent.optHover} cursor-pointer`
            } else if (isCorrect) {
              cls += 'border-green-500 bg-green-50 text-green-800 font-bold'
            } else if (isSelected) {
              cls += 'border-red-400 bg-red-50 text-red-700'
            } else {
              cls += 'border-slate-100 bg-slate-50 text-slate-400'
            }

            return (
              <button
                key={i}
                className={cls}
                onClick={() => handleSelect(opt)}
                disabled={phase !== 'question'}
              >
                <span className="font-bold text-slate-400 mr-2.5">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
                {phase !== 'question' && isCorrect  && <span className="ml-2 text-green-600">✓</span>}
                {phase !== 'question' && isSelected && !isCorrect && <span className="ml-2 text-red-500">✗</span>}
              </button>
            )
          })}
        </div>

        {/* Feedback panel */}
        {phase !== 'question' && (
          <div className={`mt-5 p-4 rounded-xl border ${
            phase === 'correct'
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <p className={`text-sm font-bold mb-2 ${
              phase === 'correct' ? 'text-green-700' : 'text-red-700'
            }`}>
              {phase === 'correct' ? '✅ Correct!' : '❌ Incorrect'}
            </p>

            {/* Show the correct answer for MCQ (it's already highlighted in options for SSC formats) */}
            {(!card.questionType || card.questionType === 'mcq') && (
              <p className="text-xs font-semibold text-slate-800 mb-1.5">
                ✔ {card.answer}
              </p>
            )}

            <p className="text-xs text-slate-600 leading-relaxed">{card.explanation}</p>

            {card.hint && (
              <p className="font-mnemonic text-xs text-emerald-700 italic mt-2 leading-relaxed">
                💡 &quot;{card.hint}&quot;
              </p>
            )}
          </div>
        )}
      </div>

      {/* Next button */}
      {phase !== 'question' && (
        <button
          onClick={nextQuestion}
          className={`w-full py-3.5 rounded-2xl ${accent.nextBtn} font-bold text-sm transition-all shadow-lg animate-pop-in`}
        >
          Next Question →
        </button>
      )}
    </div>
  )
}
