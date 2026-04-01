import { useState, useCallback, useMemo } from 'react'
import { booksData, type BookEntry, type Category, type ExamProb } from '../data'

type Step  = 1 | 2 | 3
type Phase = 'question' | 'correct' | 'wrong' | 'complete'

interface QuizState {
  book: BookEntry
  step: Step
  phase: Phase
  score: number
  streak: number
  totalAnswered: number
  correct: number
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function getOptions(correct: string, field: keyof BookEntry, pool: BookEntry[], count = 4): string[] {
  const others = [...new Set(pool.map(b => b[field] as string))].filter(v => v !== correct)
  // If pool is too small, fall back to full dataset for distractors
  const fallback = [...new Set(booksData.map(b => b[field] as string))].filter(v => v !== correct)
  const source = others.length >= count - 1 ? others : fallback
  return shuffle([...shuffle(source).slice(0, count - 1), correct])
}

const STEPS: { step: Step; field: keyof BookEntry; question: string; icon: string }[] = [
  { step: 1, field: 'author', question: 'Who is the author of this book?',               icon: '✍️' },
  { step: 2, field: 'theme',  question: 'What is the primary theme of this book?',       icon: '📖' },
  { step: 3, field: 'award',  question: 'Which award / recognition is associated with it?', icon: '🏆' },
]

const ALL_CATEGORIES: Category[] = [
  'Ancient/Medieval', 'Freedom Struggle', 'Sports', 'PYQ', 'Literary Award', 'Current Affairs',
]

const ALL_PROBS: ExamProb[] = ['Hot', 'High', 'Confirmed', 'Recurring', 'Medium']

const PROB_CHIP: Record<ExamProb, string> = {
  Hot:       'bg-red-100 text-red-800 border-red-300 hover:bg-red-200',
  High:      'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200',
  Confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200',
  Recurring: 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200',
  Medium:    'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200',
}
const PROB_ACTIVE: Record<ExamProb, string> = {
  Hot:       'bg-red-600 text-white border-red-600',
  High:      'bg-orange-500 text-white border-orange-500',
  Confirmed: 'bg-emerald-600 text-white border-emerald-600',
  Recurring: 'bg-blue-600 text-white border-blue-600',
  Medium:    'bg-yellow-500 text-white border-yellow-500',
}
const PROB_ICONS: Record<ExamProb, string> = {
  Hot: '🔴', High: '🟠', Confirmed: '✅', Recurring: '🔁', Medium: '🟡',
}

const CAT_CHIP: Record<Category, string> = {
  'Ancient/Medieval': 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200',
  'Freedom Struggle': 'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200',
  'Sports':           'bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200',
  'PYQ':              'bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200',
  'Literary Award':   'bg-violet-100 text-violet-800 border-violet-300 hover:bg-violet-200',
  'Current Affairs':  'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200',
}

const CAT_ACTIVE: Record<Category, string> = {
  'Ancient/Medieval': 'bg-amber-500 text-white border-amber-500',
  'Freedom Struggle': 'bg-orange-500 text-white border-orange-500',
  'Sports':           'bg-sky-500 text-white border-sky-500',
  'PYQ':              'bg-indigo-600 text-white border-indigo-600',
  'Literary Award':   'bg-violet-600 text-white border-violet-600',
  'Current Affairs':  'bg-emerald-600 text-white border-emerald-600',
}

const CAT_BACK: Record<Category, string> = {
  'Ancient/Medieval': 'from-amber-600 to-yellow-600',
  'Freedom Struggle': 'from-orange-600 to-red-600',
  'Sports':           'from-sky-600 to-blue-700',
  'PYQ':              'from-indigo-600 to-violet-700',
  'Literary Award':   'from-violet-600 to-purple-700',
  'Current Affairs':  'from-emerald-600 to-teal-700',
}

const CAT_ICONS: Record<Category, string> = {
  'Ancient/Medieval': '🏛️',
  'Freedom Struggle': '🇮🇳',
  'Sports':           '🏅',
  'PYQ':              '📜',
  'Literary Award':   '🏆',
  'Current Affairs':  '🗞️',
}

function pickFrom(pool: BookEntry[]): BookEntry {
  return pool[Math.floor(Math.random() * pool.length)]
}

function buildPool(cat: 'all' | Category, prob: 'all' | ExamProb): BookEntry[] {
  const pool = booksData.filter(b => {
    if (cat  !== 'all' && b.category !== cat)  return false
    if (prob !== 'all' && b.examProb  !== prob) return false
    return true
  })
  return pool.length > 0 ? pool : booksData  // fallback to full set if combo empty
}

export default function ExamLoop() {
  const [filterCat,  setFilterCat]  = useState<'all' | Category>('all')
  const [filterProb, setFilterProb] = useState<'all' | ExamProb>('all')

  const filteredPool = useMemo(
    () => buildPool(filterCat, filterProb),
    [filterCat, filterProb]
  )

  const [state, setState] = useState<QuizState>(() => ({
    book: pickFrom(booksData), step: 1, phase: 'question',
    score: 0, streak: 0, totalAnswered: 0, correct: 0,
  }))
  const [selected, setSelected] = useState<string | null>(null)
  const [shaking, setShaking]   = useState(false)

  const stepDef = useMemo(() => STEPS.find(s => s.step === state.step)!, [state.step])
  const correct = state.book[stepDef.field] as string

  const options = useMemo(
    () => getOptions(correct, stepDef.field, filteredPool),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.book, state.step, filteredPool]
  )

  // ── category filter change ─────────────────────────────────────────────────
  const handleFilterChange = useCallback((cat: 'all' | Category) => {
    const pool = buildPool(cat, filterProb)
    setFilterCat(cat)
    setSelected(null)
    setState(s => ({ ...s, book: pickFrom(pool), step: 1, phase: 'question' }))
  }, [filterProb])

  // ── prob filter change ─────────────────────────────────────────────────────
  const handleProbChange = useCallback((prob: 'all' | ExamProb) => {
    const pool = buildPool(filterCat, prob)
    setFilterProb(prob)
    setSelected(null)
    setState(s => ({ ...s, book: pickFrom(pool), step: 1, phase: 'question' }))
  }, [filterCat])

  // ── answer handler ─────────────────────────────────────────────────────────
  const handleAnswer = useCallback((opt: string) => {
    if (state.phase !== 'question') return
    setSelected(opt)
    if (opt === correct) {
      setState(s => ({
        ...s,
        phase: 'correct',
        score: s.score + 10 + (s.streak >= 2 ? 5 : 0),
        streak: s.streak + 1,
        totalAnswered: s.totalAnswered + 1,
        correct: s.correct + 1,
      }))
      setTimeout(() => {
        setState(s => s.step < 3
          ? { ...s, step: (s.step + 1) as Step, phase: 'question' }
          : { ...s, phase: 'complete' }
        )
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
      }, 1200)
    }
  }, [state.phase, correct])

  // ── next book ──────────────────────────────────────────────────────────────
  const nextBook = useCallback(() => {
    setSelected(null)
    setState(s => ({ ...s, book: pickFrom(filteredPool), step: 1, phase: 'question' }))
  }, [filteredPool])

  // ── option styling ─────────────────────────────────────────────────────────
  const optClass = (opt: string) => {
    if (!selected) return 'border-slate-200 bg-white text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-sm'
    if (opt === correct)                     return 'border-emerald-400 bg-emerald-50 text-emerald-800 font-bold'
    if (opt === selected && opt !== correct) return 'border-red-400 bg-red-50 text-red-700'
    return 'border-slate-100 bg-slate-50 text-slate-400'
  }

  const accuracy = state.totalAnswered > 0 ? Math.round((state.correct / state.totalAnswered) * 100) : 0

  return (
    <section id="exam-loop" className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-indigo-500 uppercase mb-1">Section 04</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Exam Loop</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl leading-relaxed">
            3-stage recall per book: <strong>Author → Theme → Award</strong>. Filter by category
            to drill a specific genre. Streak bonus: <span className="text-amber-600 font-bold">+5 pts</span> after 2 consecutive correct answers.
          </p>
        </div>

        {/* ── Filter Bar ── */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 mb-8 space-y-3">

          {/* Row 1 — Category */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</span>
              {(filterCat !== 'all' || filterProb !== 'all') && (
                <span className="text-xs text-slate-400">
                  — {filteredPool.length} book{filteredPool.length !== 1 ? 's' : ''} in pool
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  filterCat === 'all'
                    ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'
                }`}
              >
                All ({booksData.length})
              </button>
              {ALL_CATEGORIES.map(cat => {
                const count = booksData.filter(b => b.category === cat).length
                const isActive = filterCat === cat
                return (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      isActive ? CAT_ACTIVE[cat] + ' shadow-md' : CAT_CHIP[cat]
                    }`}
                  >
                    {CAT_ICONS[cat]} {cat} ({count})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Row 2 — Exam Probability */}
          <div className="border-t border-slate-200 pt-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Exam Priority</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleProbChange('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  filterProb === 'all'
                    ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'
                }`}
              >
                All Priorities
              </button>
              {ALL_PROBS.map(prob => {
                const count = booksData.filter(b => b.examProb === prob).length
                const isActive = filterProb === prob
                return (
                  <button
                    key={prob}
                    onClick={() => handleProbChange(prob)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      isActive ? PROB_ACTIVE[prob] + ' shadow-md' : PROB_CHIP[prob]
                    }`}
                  >
                    {PROB_ICONS[prob]} {prob} ({count})
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Score Panel */}
          <div className="bg-brand-900 text-white rounded-2xl p-6 shadow-xl space-y-4">

            {/* Active filter badges */}
            {filterCat !== 'all' && (
              <div className={`rounded-xl px-3 py-2 border text-xs font-bold text-center ${CAT_CHIP[filterCat]}`}>
                {CAT_ICONS[filterCat]} {filterCat}
              </div>
            )}
            {filterProb !== 'all' && (
              <div className={`rounded-xl px-3 py-2 border text-xs font-bold text-center ${PROB_CHIP[filterProb]}`}>
                {PROB_ICONS[filterProb]} {filterProb} Priority
              </div>
            )}

            <h3 className="font-bold text-slate-300 text-xs uppercase tracking-widest">Live Stats</h3>
            {[
              { label: 'Score',      value: state.score,          color: 'text-indigo-400' },
              { label: '🔥 Streak',  value: state.streak,         color: 'text-amber-400' },
              { label: '🎯 Accuracy',value: `${accuracy}%`,       color: 'text-emerald-400' },
              { label: 'Answered',   value: state.totalAnswered,  color: 'text-slate-300' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center bg-white/5 rounded-xl px-4 py-3">
                <span className="text-sm text-slate-300">{label}</span>
                <span className={`text-xl font-extrabold ${color}`}>{value}</span>
              </div>
            ))}

            <div className="border-t border-white/10 pt-4">
              <p className="text-xs text-slate-500 mb-1 font-medium">Current Book</p>
              <p className="font-bold text-white text-sm leading-snug">{state.book.title}</p>
              <span className={`text-xs font-bold mt-1 inline-block`} style={{ color: '#a5b4fc' }}>
                {CAT_ICONS[state.book.category]} {state.book.category}
              </span>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-xs text-slate-500 mb-1 font-medium">Mnemonic</p>
              <p className="font-mnemonic text-xs text-amber-400 italic leading-relaxed">
                "{state.book.mnemonic}"
              </p>
            </div>

            <button
              onClick={nextBook}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-sm font-semibold transition-colors"
            >
              Skip Book →
            </button>
          </div>

          {/* Quiz Card */}
          <div className={`lg:col-span-2 ${shaking ? 'shake' : ''}`}>

            {/* ── COMPLETE STATE ── */}
            {state.phase === 'complete' ? (
              <div className={`bg-gradient-to-br ${CAT_BACK[state.book.category]} rounded-2xl shadow-xl p-10 text-center text-white animate-pop-in`}>
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-extrabold mb-2">Book Mastered!</h3>
                <p className="text-white/70 mb-2 text-sm">All 3 dimensions correct for:</p>
                <p className="font-bold text-xl mb-6 bg-white/10 rounded-xl px-4 py-2 inline-block">
                  "{state.book.title}"
                </p>
                <div className="grid grid-cols-3 gap-3 mb-8 text-xs">
                  {[
                    { label: 'Author', value: state.book.author },
                    { label: 'Theme',  value: state.book.theme  },
                    { label: 'Award',  value: state.book.award  },
                  ].map(d => (
                    <div key={d.label} className="bg-white/15 rounded-xl p-3">
                      <p className="font-bold text-white/80">{d.label}</p>
                      <p className="text-white mt-1 leading-tight">{d.value}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={nextBook}
                  className="px-8 py-3 rounded-xl bg-white text-slate-800 font-extrabold shadow-lg hover:bg-slate-100 transition-all"
                >
                  Next{filterCat !== 'all' ? ` ${filterCat}` : filterProb !== 'all' ? ` ${filterProb}` : ''} Book →
                </button>
              </div>

            ) : (
            /* ── QUESTION STATE ── */
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                {/* Step progress bar */}
                <div className="px-6 pt-5 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3 mb-3">
                    {STEPS.map(s => (
                      <div key={s.step} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          s.step < state.step   ? 'bg-emerald-500 text-white' :
                          s.step === state.step ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' :
                                                  'bg-slate-100 text-slate-400'
                        }`}>
                          {s.step < state.step ? '✓' : s.step}
                        </div>
                        <span className={`text-xs font-semibold hidden sm:block ${
                          s.step === state.step ? 'text-indigo-700' : 'text-slate-400'
                        }`}>
                          {['Author', 'Theme', 'Award'][s.step - 1]}
                        </span>
                        {s.step < 3 && <span className="text-slate-200 text-xs">→</span>}
                      </div>
                    ))}
                    {/* Category badge in header */}
                    <span className={`ml-auto text-xs font-bold px-2.5 py-1 rounded-full border ${CAT_CHIP[state.book.category]}`}>
                      {CAT_ICONS[state.book.category]} {state.book.category}
                    </span>
                  </div>
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 transition-all duration-500 rounded-full"
                      style={{ width: `${((state.step - 1) / 3) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question Body */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-6">
                    <span className="text-2xl shrink-0">{stepDef.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Step {state.step} of 3
                      </p>
                      <p className="text-base font-semibold text-slate-700">{stepDef.question}</p>
                      <p className="text-xl font-extrabold text-brand-900 mt-2 leading-snug">
                        "{state.book.title}"
                      </p>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        disabled={state.phase !== 'question'}
                        className={`text-left p-4 rounded-xl border-2 text-sm font-medium transition-all leading-snug ${optClass(opt)}`}
                      >
                        <span>{opt}</span>
                        {selected && opt === correct && (
                          <span className="ml-2 text-emerald-500 font-bold">✓</span>
                        )}
                        {state.phase === 'wrong' && opt === selected && opt !== correct && (
                          <span className="ml-2 text-red-500 font-bold">✗</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Wrong answer hint */}
                  {state.phase === 'wrong' && (
                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 animate-fade-slide">
                      <p className="text-xs font-bold text-amber-700 mb-1">💡 Remember this mnemonic:</p>
                      <p className="font-mnemonic text-amber-700 text-sm italic">"{state.book.mnemonic}"</p>
                    </div>
                  )}

                  {/* Correct step feedback */}
                  {state.phase === 'correct' && state.step < 3 && (
                    <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 animate-fade-slide flex items-center gap-2">
                      <span className="text-emerald-600 font-bold text-lg">✓</span>
                      <p className="text-xs font-semibold text-emerald-700">
                        Correct! Moving to Step {state.step + 1}…
                        {state.streak >= 2 && <span className="ml-2 text-amber-600">🔥 Streak bonus +5!</span>}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
