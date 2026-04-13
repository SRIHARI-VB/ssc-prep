import { useState, useCallback, useMemo } from 'react'
import { sciData, type Subject, type SciEntry } from '../data'

type Phase = 'question' | 'correct' | 'wrong' | 'complete'
const SUBJECTS: ('all' | Subject)[] = ['all', 'Physics', 'Chemistry', 'Biology', 'Space & Defense', 'Technology']

const SUBJECT_ICON: Record<Subject, string> = {
  'Physics': '⚛️', 'Chemistry': '🧪', 'Biology': '🧬', 'Space & Defense': '🚀', 'Technology': '💻',
}
const SUBJECT_COLOR: Record<Subject, string> = {
  'Physics':        'border-indigo-400 bg-indigo-50 text-indigo-700',
  'Chemistry':      'border-teal-400 bg-teal-50 text-teal-700',
  'Biology':        'border-green-400 bg-green-50 text-green-700',
  'Space & Defense':'border-red-400 bg-red-50 text-red-700',
  'Technology':     'border-amber-400 bg-amber-50 text-amber-700',
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function pickFrom(pool: SciEntry[]): SciEntry {
  return pool[Math.floor(Math.random() * pool.length)]
}

function getOptions(correct: SciEntry, pool: SciEntry[], count = 4): string[] {
  const distractors = shuffle(
    (pool.length >= count ? pool : sciData)
      .filter(e => e.id !== correct.id && e.answer !== correct.answer)
  ).slice(0, count - 1).map(e => e.answer)
  return shuffle([correct.answer, ...distractors])
}

interface LoopState {
  card: SciEntry
  options: string[]
  phase: Phase
  score: number
  total: number
}

export default function ExamLoop() {
  const [filterSub, setFilterSub] = useState<'all' | Subject>('all')

  const filteredPool = useMemo(
    () => filterSub === 'all' ? sciData : sciData.filter(e => e.subject === filterSub),
    [filterSub]
  )

  const [state, setState] = useState<LoopState>(() => {
    const card = pickFrom(sciData)
    return { card, options: getOptions(card, sciData), phase: 'question', score: 0, total: 0 }
  })
  const [selected, setSelected] = useState<string | null>(null)
  const [shake, setShake] = useState(false)

  const handleFilter = useCallback((sub: 'all' | Subject) => {
    const pool = sub === 'all' ? sciData : sciData.filter(e => e.subject === sub)
    const card = pickFrom(pool)
    setFilterSub(sub)
    setSelected(null)
    setState({ card, options: getOptions(card, pool), phase: 'question', score: 0, total: 0 })
  }, [])

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
    <section id="st-loop" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-teal-600 uppercase mb-1">Section 04</p>
          <h2 className="text-3xl font-extrabold text-brand-900">MCQ Exam Loop</h2>
          <p className="mt-1 text-slate-500 text-sm">Single-step MCQ — select the correct answer instantly.</p>
        </div>

        {/* Subject filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SUBJECTS.map(s => {
            const count = s === 'all' ? sciData.length : sciData.filter(e => e.subject === s).length
            return (
              <button key={s} onClick={() => handleFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  filterSub === s
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400'
                }`}>
                {s === 'all' ? `🌐 All (${count})` : `${SUBJECT_ICON[s as Subject]} ${s} (${count})`}
              </button>
            )
          })}
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Score bar */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-teal-600">{score}</p>
              <p className="text-xs text-slate-400">Correct</p>
            </div>
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full transition-all duration-500"
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
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${SUBJECT_COLOR[card.subject]}`}>
                {SUBJECT_ICON[card.subject]} {card.subject}
              </span>
              <span className="text-xs text-slate-400 font-medium">{card.topic}</span>
            </div>

            {/* Question */}
            <h3 className="text-base font-bold text-slate-800 leading-relaxed mb-5">
              {card.question}
            </h3>

            {/* Options grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {options.map((opt, i) => {
                const isCorrect = opt === card.answer
                const isSelected = opt === selected
                let cls = 'text-left w-full px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all '
                if (phase === 'question') {
                  cls += 'border-slate-200 bg-slate-50 hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700 cursor-pointer'
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
                <p className="text-xs text-slate-600 leading-relaxed">{card.explanation}</p>
                {card.mnemonic && (
                  <p className="font-mnemonic text-xs text-amber-700 italic mt-2">💡 &quot;{card.mnemonic}&quot;</p>
                )}
                <p className="text-xs text-slate-400 mt-1">📅 {card.context}</p>
              </div>
            )}
          </div>

          {/* Next button */}
          {phase !== 'question' && (
            <button onClick={nextQuestion}
              className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors shadow-lg animate-pop-in">
              Next Question →
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
