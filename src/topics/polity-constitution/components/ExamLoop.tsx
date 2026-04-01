import { useState, useCallback, useMemo } from 'react'
import { polityData, type PolityCategory, type ExamProb, type PolityEntry } from '../data'

type Phase = 'question' | 'correct' | 'wrong' | 'complete'
const SUBJECTS: ('all' | PolityCategory)[] = ['all', 'Important Articles', 'Schedules', 'Amendments', 'Landmark Cases', 'Constitutional Bodies', 'Parliament & Executive', 'Fundamental Rights & DPSP']
const PROBS: ('all' | ExamProb)[] = ['all', 'Hot', 'Confirmed', 'High', 'Recurring']

const PROB_CHIP: Record<ExamProb, string> = {
  Hot:       'bg-red-100 text-red-800 border-red-300',
  High:      'bg-orange-100 text-orange-800 border-orange-300',
  Confirmed: 'bg-green-100 text-green-800 border-green-300',
  Recurring: 'bg-violet-100 text-violet-800 border-violet-300',
}
const PROB_ACTIVE: Record<ExamProb, string> = {
  Hot:       'bg-red-600 text-white border-red-600',
  High:      'bg-orange-500 text-white border-orange-500',
  Confirmed: 'bg-green-600 text-white border-green-600',
  Recurring: 'bg-violet-600 text-white border-violet-600',
}
const PROB_ICONS: Record<ExamProb, string> = {
  Hot: '🔴', High: '🟠', Confirmed: '✅', Recurring: '🔁',
}

const SUBJECT_ICON: Record<PolityCategory, string> = {
  'Important Articles':        '📖',
  'Schedules':                 '📋',
  'Amendments':                '✏️',
  'Landmark Cases':            '⚖️',
  'Constitutional Bodies':     '🏗️',
  'Parliament & Executive':    '🏛️',
  'Fundamental Rights & DPSP': '🛡️',
}
const SUBJECT_COLOR: Record<PolityCategory, string> = {
  'Important Articles':        'border-indigo-400 bg-indigo-50 text-indigo-700',
  'Schedules':                 'border-teal-400 bg-teal-50 text-teal-700',
  'Amendments':                'border-blue-400 bg-blue-50 text-blue-700',
  'Landmark Cases':            'border-green-400 bg-green-50 text-green-700',
  'Constitutional Bodies':     'border-red-400 bg-red-50 text-red-700',
  'Parliament & Executive':    'border-violet-400 bg-violet-50 text-violet-700',
  'Fundamental Rights & DPSP': 'border-amber-400 bg-amber-50 text-amber-700',
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function pickFrom(pool: PolityEntry[]): PolityEntry {
  return pool[Math.floor(Math.random() * pool.length)]
}

function buildPool(sub: 'all' | PolityCategory, prob: 'all' | ExamProb): PolityEntry[] {
  const pool = polityData.filter(e => {
    if (sub  !== 'all' && e.category  !== sub)  return false
    if (prob !== 'all' && e.examProb !== prob) return false
    return true
  })
  return pool.length > 0 ? pool : polityData
}

function getOptions(correct: PolityEntry, pool: PolityEntry[], count = 4): string[] {
  const distractors = shuffle(
    (pool.length >= count ? pool : polityData)
      .filter(e => e.id !== correct.id && e.answer !== correct.answer)
  ).slice(0, count - 1).map(e => e.answer)
  return shuffle([correct.answer, ...distractors])
}

interface LoopState {
  card: PolityEntry
  options: string[]
  phase: Phase
  score: number
  total: number
}

export default function ExamLoop() {
  const [filterSub,  setFilterSub]  = useState<'all' | PolityCategory>('all')
  const [filterProb, setFilterProb] = useState<'all' | ExamProb>('all')

  const filteredPool = useMemo(
    () => buildPool(filterSub, filterProb),
    [filterSub, filterProb]
  )

  const [state, setState] = useState<LoopState>(() => {
    const card = pickFrom(polityData)
    return { card, options: getOptions(card, polityData), phase: 'question', score: 0, total: 0 }
  })
  const [selected, setSelected] = useState<string | null>(null)
  const [shake, setShake] = useState(false)

  const handleFilter = useCallback((sub: 'all' | PolityCategory) => {
    const pool = buildPool(sub, filterProb)
    const card = pickFrom(pool)
    setFilterSub(sub)
    setSelected(null)
    setState({ card, options: getOptions(card, pool), phase: 'question', score: 0, total: 0 })
  }, [filterProb])

  const handleProbFilter = useCallback((prob: 'all' | ExamProb) => {
    const pool = buildPool(filterSub, prob)
    const card = pickFrom(pool)
    setFilterProb(prob)
    setSelected(null)
    setState({ card, options: getOptions(card, pool), phase: 'question', score: 0, total: 0 })
  }, [filterSub])

  const nextQuestion = useCallback(() => {
    const card = pickFrom(filteredPool)
    setSelected(null)
    setState(s => ({ ...s, card, options: getOptions(card, filteredPool), phase: 'question' }))
  }, [filteredPool])

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

  const { card, options, phase, score, total } = state
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <section id="pol-loop" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-1">Section 04</p>
          <h2 className="text-3xl font-extrabold text-brand-900">MCQ Exam Loop</h2>
          <p className="mt-1 text-slate-500 text-sm">Single-step MCQ — select the correct answer instantly.</p>
        </div>

        {/* Filters */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 mb-8 space-y-3">

          {/* Row 1 — Subject */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</span>
              {(filterSub !== 'all' || filterProb !== 'all') && (
                <span className="text-xs text-slate-400">
                  — {filteredPool.length} question{filteredPool.length !== 1 ? 's' : ''} in pool
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map(s => {
                const count = s === 'all' ? polityData.length : polityData.filter(e => e.category === s).length
                return (
                  <button key={s} onClick={() => handleFilter(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      filterSub === s
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400'
                    }`}>
                    {s === 'all' ? `🌐 All (${count})` : `${SUBJECT_ICON[s as PolityCategory]} ${(s as string).split(' ')[0]}... (${count})`}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Row 2 — Exam Priority */}
          <div className="border-t border-slate-200 pt-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Exam Priority</span>
            <div className="flex flex-wrap gap-2">
              {PROBS.map(p => {
                const count = p === 'all' ? polityData.length : polityData.filter(e => e.examProb === p).length
                const isActive = filterProb === p
                return (
                  <button key={p} onClick={() => handleProbFilter(p)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      isActive
                        ? p === 'all' ? 'bg-slate-800 text-white border-slate-800' : PROB_ACTIVE[p as ExamProb]
                        : p === 'all' ? 'bg-white text-slate-600 border-slate-200 hover:border-slate-400' : PROB_CHIP[p as ExamProb] + ' hover:opacity-80'
                    }`}>
                    {p === 'all' ? `All Priorities (${count})` : `${PROB_ICONS[p as ExamProb]} ${p} (${count})`}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Active filter chips */}
          {(filterSub !== 'all' || filterProb !== 'all') && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filterSub !== 'all' && (
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${SUBJECT_COLOR[filterSub as PolityCategory]}`}>
                  {SUBJECT_ICON[filterSub as PolityCategory]} Drilling: {filterSub}
                </span>
              )}
              {filterProb !== 'all' && (
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${PROB_CHIP[filterProb as ExamProb]}`}>
                  {PROB_ICONS[filterProb as ExamProb]} {filterProb} Priority only
                </span>
              )}
            </div>
          )}

          {/* Score bar */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-amber-600">{score}</p>
              <p className="text-xs text-slate-400">Correct</p>
            </div>
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${accuracy}%` }} />
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-slate-700">{accuracy}%</p>
              <p className="text-xs text-slate-400">Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-slate-500">{total}</p>
              <p className="text-xs text-slate-400">Attempted</p>
            </div>
          </div>

          {/* Question card */}
          <div className={`bg-white rounded-2xl border-2 p-6 shadow-lg mb-4 ${
            phase === 'correct' ? 'border-green-400' :
            phase === 'wrong'   ? 'border-red-400'   : 'border-slate-200'
          } ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>

            {/* Subject + context */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${SUBJECT_COLOR[card.category]}`}>
                {SUBJECT_ICON[card.category]} {card.category}
              </span>
              <span className="text-xs text-slate-400 font-medium">{card.topic}</span>
            </div>

            {/* Question */}
            <h3 className="text-base font-bold text-slate-800 leading-relaxed mb-5">
              {card.question}
            </h3>

            {/* Options grid */}
            <div className="grid grid-cols-1 gap-3">
              {options.map((opt, i) => {
                const isCorrect = opt === card.answer
                const isSelected = opt === selected
                let cls = 'text-left w-full px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all '
                if (phase === 'question') {
                  cls += 'border-slate-200 bg-slate-50 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 cursor-pointer'
                } else if (isCorrect) {
                  cls += 'border-green-500 bg-green-50 text-green-800 font-bold'
                } else if (isSelected && !isCorrect) {
                  cls += 'border-red-400 bg-red-50 text-red-700'
                } else {
                  cls += 'border-slate-100 bg-slate-50 text-slate-400'
                }
                return (
                  <button key={i} className={cls} onClick={() => handleSelect(opt)} disabled={phase !== 'question'}>
                    <span className="text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                    {phase !== 'question' && isCorrect && ' ✓'}
                    {phase !== 'question' && isSelected && !isCorrect && ' ✗'}
                  </button>
                )
              })}
            </div>

            {/* Feedback */}
            {phase !== 'question' && (
              <div className={`mt-4 p-4 rounded-xl ${phase === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className={`text-sm font-bold mb-1 ${phase === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                  {phase === 'correct' ? '✅ Correct!' : '❌ Incorrect'}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">{card.detail}</p>
                {card.shortcut && (
                  <p className="font-mnemonic text-xs text-amber-700 italic mt-2">💡 &quot;{card.shortcut}&quot;</p>
                )}
                <p className="text-xs text-slate-400 mt-1">📅 {card.context}</p>
              </div>
            )}
          </div>

          {/* Next button */}
          {phase !== 'question' && (
            <button onClick={nextQuestion}
              className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm transition-colors shadow-lg animate-pop-in">
              Next Question →
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
