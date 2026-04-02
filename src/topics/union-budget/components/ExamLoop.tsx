import { useState, useCallback, useMemo } from 'react'
import { budgetData, type BudgetCategory, type ExamProb, type BudgetEntry, type BudgetYear } from '../data'

type Phase = 'question' | 'correct' | 'wrong' | 'complete'
const SUBJECTS: ('all' | BudgetCategory)[] = ['all', 'Budget Basics & History', 'Tax Changes', 'Fiscal Numbers', 'Agriculture & Rural', 'Infrastructure', 'Defence', 'Education & Health', 'Social Welfare', 'New Schemes & Missions', 'Digital & Technology', 'Budget Terminology']
const PROBS: ('all' | ExamProb)[] = ['all', 'Hot', 'Confirmed', 'High', 'Recurring']
const YEARS: ('all' | BudgetYear)[] = ['all', '2026-27', '2025-26', 'General']

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

const SUBJECT_ICON: Record<BudgetCategory, string> = {
  'Budget Basics & History': '📜', 'Tax Changes': '💸', 'Fiscal Numbers': '📊',
  'Agriculture & Rural': '🌾', 'Infrastructure': '🏗️', 'Defence': '🛡️',
  'Education & Health': '🎓', 'Social Welfare': '🤝', 'New Schemes & Missions': '🚀',
  'Digital & Technology': '💻', 'Budget Terminology': '📖',
}
const SUBJECT_COLOR: Record<BudgetCategory, string> = {
  'Budget Basics & History':  'border-indigo-400 bg-indigo-50 text-indigo-700',
  'Tax Changes':              'border-red-400 bg-red-50 text-red-700',
  'Fiscal Numbers':           'border-green-400 bg-green-50 text-green-700',
  'Agriculture & Rural':      'border-lime-400 bg-lime-50 text-lime-700',
  'Infrastructure':           'border-violet-400 bg-violet-50 text-violet-700',
  'Defence':                  'border-orange-400 bg-orange-50 text-orange-700',
  'Education & Health':       'border-blue-400 bg-blue-50 text-blue-700',
  'Social Welfare':           'border-pink-400 bg-pink-50 text-pink-700',
  'New Schemes & Missions':   'border-amber-400 bg-amber-50 text-amber-700',
  'Digital & Technology':     'border-cyan-400 bg-cyan-50 text-cyan-700',
  'Budget Terminology':       'border-purple-400 bg-purple-50 text-purple-700',
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function pickFrom(pool: BudgetEntry[]): BudgetEntry {
  return pool[Math.floor(Math.random() * pool.length)]
}

function buildPool(sub: 'all' | BudgetCategory, prob: 'all' | ExamProb, year: 'all' | BudgetYear): BudgetEntry[] {
  const pool = budgetData.filter(e => {
    if (sub  !== 'all' && e.category  !== sub)  return false
    if (prob !== 'all' && e.examProb !== prob) return false
    if (year !== 'all' && e.budgetYear !== year) return false
    return true
  })
  return pool.length > 0 ? pool : budgetData
}

function getOptions(correct: BudgetEntry, pool: BudgetEntry[], count = 4): string[] {
  const distractors = shuffle(
    (pool.length >= count ? pool : budgetData)
      .filter(e => e.id !== correct.id && e.answer !== correct.answer)
  ).slice(0, count - 1).map(e => e.answer)
  return shuffle([correct.answer, ...distractors])
}

interface LoopState {
  card: BudgetEntry
  options: string[]
  phase: Phase
  score: number
  total: number
}

export default function ExamLoop() {
  const [filterSub,  setFilterSub]  = useState<'all' | BudgetCategory>('all')
  const [filterProb, setFilterProb] = useState<'all' | ExamProb>('all')
  const [filterYear, setFilterYear] = useState<'all' | BudgetYear>('all')

  const filteredPool = useMemo(
    () => buildPool(filterSub, filterProb, filterYear),
    [filterSub, filterProb, filterYear]
  )

  const [state, setState] = useState<LoopState>(() => {
    const card = pickFrom(budgetData)
    return { card, options: getOptions(card, budgetData), phase: 'question', score: 0, total: 0 }
  })
  const [selected, setSelected] = useState<string | null>(null)
  const [shake, setShake] = useState(false)

  const resetQuiz = useCallback((pool: BudgetEntry[]) => {
    const card = pickFrom(pool)
    setSelected(null)
    setState({ card, options: getOptions(card, pool), phase: 'question', score: 0, total: 0 })
  }, [])

  const handleFilter = useCallback((sub: 'all' | BudgetCategory) => {
    setFilterSub(sub)
    resetQuiz(buildPool(sub, filterProb, filterYear))
  }, [filterProb, filterYear, resetQuiz])

  const handleProbFilter = useCallback((prob: 'all' | ExamProb) => {
    setFilterProb(prob)
    resetQuiz(buildPool(filterSub, prob, filterYear))
  }, [filterSub, filterYear, resetQuiz])

  const handleYearFilter = useCallback((year: 'all' | BudgetYear) => {
    setFilterYear(year)
    resetQuiz(buildPool(filterSub, filterProb, year))
  }, [filterSub, filterProb, resetQuiz])

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
    <section id="ub-loop" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-1">Section 05</p>
          <h2 className="text-3xl font-extrabold text-brand-900">MCQ Exam Loop</h2>
          <p className="mt-1 text-slate-500 text-sm">Single-step MCQ -- select the correct answer instantly.</p>
        </div>

        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 mb-8 space-y-3">
          {/* Year filter */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Budget Year</span>
            <div className="flex flex-wrap gap-2">
              {YEARS.map(y => {
                const count = y === 'all' ? budgetData.length : budgetData.filter(e => e.budgetYear === y).length
                return (
                  <button key={y} onClick={() => handleYearFilter(y)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      filterYear === y
                        ? y === '2026-27' ? 'bg-emerald-600 text-white border-emerald-600'
                        : y === '2025-26' ? 'bg-sky-600 text-white border-sky-600'
                        : y === 'General' ? 'bg-slate-700 text-white border-slate-700'
                        : 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400'
                    }`}>
                    {y === 'all' ? `All Years (${count})` : `FY ${y} (${count})`}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</span>
              {(filterSub !== 'all' || filterProb !== 'all' || filterYear !== 'all') && (
                <span className="text-xs text-slate-400">
                  -- {filteredPool.length} question{filteredPool.length !== 1 ? 's' : ''} in pool
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map(s => {
                const count = s === 'all' ? budgetData.length : budgetData.filter(e => e.category === s).length
                return (
                  <button key={s} onClick={() => handleFilter(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      filterSub === s
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400'
                    }`}>
                    {s === 'all' ? `All (${count})` : `${SUBJECT_ICON[s as BudgetCategory]} ${(s as string).split(' ')[0]}... (${count})`}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Exam Priority</span>
            <div className="flex flex-wrap gap-2">
              {PROBS.map(p => {
                const count = p === 'all' ? budgetData.length : budgetData.filter(e => e.examProb === p).length
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
          {(filterSub !== 'all' || filterProb !== 'all' || filterYear !== 'all') && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filterYear !== 'all' && (
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  filterYear === '2026-27' ? 'border-emerald-400 bg-emerald-50 text-emerald-700' :
                  filterYear === '2025-26' ? 'border-sky-400 bg-sky-50 text-sky-700' :
                  'border-slate-400 bg-slate-50 text-slate-700'
                }`}>
                  FY {filterYear} only
                </span>
              )}
              {filterSub !== 'all' && (
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${SUBJECT_COLOR[filterSub as BudgetCategory]}`}>
                  {SUBJECT_ICON[filterSub as BudgetCategory]} Drilling: {filterSub}
                </span>
              )}
              {filterProb !== 'all' && (
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${PROB_CHIP[filterProb as ExamProb]}`}>
                  {PROB_ICONS[filterProb as ExamProb]} {filterProb} Priority only
                </span>
              )}
            </div>
          )}

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

          <div className={`bg-white rounded-2xl border-2 p-6 shadow-lg mb-4 ${
            phase === 'correct' ? 'border-green-400' :
            phase === 'wrong'   ? 'border-red-400'   : 'border-slate-200'
          } ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>

            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${SUBJECT_COLOR[card.category]}`}>
                {SUBJECT_ICON[card.category]} {card.category}
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  card.budgetYear === '2026-27' ? 'bg-emerald-100 text-emerald-700' :
                  card.budgetYear === '2025-26' ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-600'
                }`}>{card.budgetYear === 'General' ? 'GEN' : card.budgetYear}</span>
                <span className="text-xs text-slate-400 font-medium">{card.topic}</span>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-800 leading-relaxed mb-5">
              {card.question}
            </h3>

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
                    {phase !== 'question' && isCorrect && ' \u2713'}
                    {phase !== 'question' && isSelected && !isCorrect && ' \u2717'}
                  </button>
                )
              })}
            </div>

            {phase !== 'question' && (
              <div className={`mt-4 p-4 rounded-xl ${phase === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className={`text-sm font-bold mb-1 ${phase === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                  {phase === 'correct' ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">{card.detail}</p>
                {card.shortcut && (
                  <p className="font-mnemonic text-xs text-amber-700 italic mt-2">&quot;{card.shortcut}&quot;</p>
                )}
                <p className="text-xs text-slate-400 mt-1">{card.context}</p>
              </div>
            )}
          </div>

          {phase !== 'question' && (
            <button onClick={nextQuestion}
              className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm transition-colors shadow-lg animate-pop-in">
              Next Question &rarr;
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
