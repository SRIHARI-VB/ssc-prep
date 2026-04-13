/**
 * Economics — Exam Loop
 *
 * Uses the shared ExamEngine. This file owns:
 *   - Category config (icons + colours)
 *   - Filter bar UI (category + difficulty + SSC Format)
 *   - Filtered question computation
 *   - Passes key={filterKey} so ExamEngine resets on every filter change
 */

import { useState, useMemo } from 'react'
import { econData, type EconCategory, type ExamProb } from '../data'
import ExamEngine from '../../../engine/ExamEngine'
import type { EngineQuestion, CategoryMap, AccentPalette } from '../../../engine/types'

// ── Category config ──────────────────────────────────────────────────────────

const CATEGORY_DEF: CategoryMap = {
  'Basic Concepts':              { icon: '💡', color: 'border-cyan-400 bg-cyan-50 text-cyan-700' },
  'Indian Economy & Planning':   { icon: '📊', color: 'border-blue-400 bg-blue-50 text-blue-700' },
  'Banking & Monetary Policy':   { icon: '🏦', color: 'border-green-400 bg-green-50 text-green-700' },
  'Fiscal Policy & Taxation':    { icon: '💰', color: 'border-amber-400 bg-amber-50 text-amber-700' },
  'International Trade & Orgs':  { icon: '🌐', color: 'border-violet-400 bg-violet-50 text-violet-700' },
  'Agriculture & Rural':         { icon: '🌾', color: 'border-pink-400 bg-pink-50 text-pink-700' },
  'Industry & Infrastructure':   { icon: '🏭', color: 'border-red-400 bg-red-50 text-red-700' },
  'Financial Markets':           { icon: '📈', color: 'border-orange-400 bg-orange-50 text-orange-700' },
  'Poverty & Development':       { icon: '🤝', color: 'border-lime-400 bg-lime-50 text-lime-700' },
  'Reforms & Current Affairs':   { icon: '📰', color: 'border-indigo-400 bg-indigo-50 text-indigo-700' },
}

const ACCENT: AccentPalette = {
  chipActive: 'bg-cyan-700 text-white border-cyan-700',
  optHover:   'hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700',
  bar:        'bg-cyan-500',
  scoreText:  'text-cyan-600',
  nextBtn:    'bg-cyan-700 hover:bg-cyan-600 text-white',
  text:       'text-cyan-700',
}

const CATEGORIES: EconCategory[] = [
  'Basic Concepts', 'Indian Economy & Planning', 'Banking & Monetary Policy',
  'Fiscal Policy & Taxation', 'International Trade & Orgs', 'Agriculture & Rural',
  'Industry & Infrastructure', 'Financial Markets', 'Poverty & Development',
  'Reforms & Current Affairs',
]
const PROBS: ExamProb[] = ['Hot', 'Confirmed', 'High', 'Recurring']
const PROB_CHIP: Record<ExamProb, string> = {
  Hot: 'bg-red-100 text-red-800 border-red-200', High: 'bg-orange-100 text-orange-800 border-orange-200',
  Confirmed: 'bg-green-100 text-green-800 border-green-200', Recurring: 'bg-violet-100 text-violet-800 border-violet-200',
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ExamLoop() {
  const [filterSub,  setFilterSub]  = useState<'all' | EconCategory | 'SSC Format'>('all')
  const [filterProb, setFilterProb] = useState<'all' | ExamProb>('all')

  const filtered = useMemo<EngineQuestion[]>(() => {
    const list = econData.filter(q => {
      if (filterSub === 'SSC Format') return !!q.questionType
      if (filterSub !== 'all' && q.category !== filterSub) return false
      if (filterProb !== 'all' && q.examProb !== filterProb) return false
      return true
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (list.length > 0 ? list : econData) as any as EngineQuestion[]
  }, [filterSub, filterProb])

  const sscCount = econData.filter(q => !!q.questionType).length

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-cyan-700 uppercase mb-1">Section 06</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Economics — Exam Loop</h2>
          <p className="mt-1 text-slate-500 text-sm">
            Every question has <strong>4 hand-picked, topically relevant options</strong>.
            Use <span className="text-violet-600 font-bold">SSC Format</span> to drill
            Multi-Statement, A-R, Match &amp; Sequence questions.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 mb-8 space-y-3">

          {/* Category row */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</span>
              {(filterSub !== 'all' || filterProb !== 'all') && (
                <span className="text-xs text-slate-400">— {filtered.length} questions</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setFilterSub('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${filterSub === 'all' ? ACCENT.chipActive : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-400'}`}>
                All ({econData.length})
              </button>
              <button onClick={() => setFilterSub('SSC Format')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${filterSub === 'SSC Format' ? 'bg-violet-600 text-white border-violet-600 shadow-md' : 'bg-violet-50 text-violet-700 border-violet-300 hover:bg-violet-100'}`}>
                SSC Format ({sscCount})
              </button>
              {CATEGORIES.map(s => (
                <button key={s} onClick={() => setFilterSub(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${filterSub === s ? ACCENT.chipActive : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-400'}`}>
                  {CATEGORY_DEF[s].icon} {s} ({econData.filter(q => q.category === s).length})
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty row */}
          <div className="border-t border-slate-200 pt-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Exam Priority</span>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setFilterProb('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${filterProb === 'all' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
                All Priorities ({econData.length})
              </button>
              {PROBS.map(p => (
                <button key={p} onClick={() => setFilterProb(p)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${filterProb === p ? 'bg-slate-700 text-white border-slate-700' : PROB_CHIP[p] + ' hover:opacity-80'}`}>
                  {p} ({econData.filter(q => q.examProb === p).length})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active filter badges */}
        {(filterSub !== 'all' || filterProb !== 'all') && (
          <div className="flex flex-wrap gap-2 mb-4 max-w-2xl mx-auto">
            {filterSub === 'SSC Format' && (
              <span className="text-xs font-bold px-3 py-1 rounded-full border bg-violet-100 text-violet-700 border-violet-300">
                SSC Format only
              </span>
            )}
            {filterSub !== 'all' && filterSub !== 'SSC Format' && (
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${CATEGORY_DEF[filterSub as EconCategory]?.color ?? ''}`}>
                {CATEGORY_DEF[filterSub as EconCategory]?.icon} Drilling: {filterSub}
              </span>
            )}
            {filterProb !== 'all' && (
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${PROB_CHIP[filterProb as ExamProb]}`}>
                {filterProb} priority only
              </span>
            )}
          </div>
        )}

        {/* Engine — key forces full state reset on every filter change */}
        <ExamEngine
          key={`econ-${filterSub}-${filterProb}`}
          questions={filtered}
          getCat={q => (q as unknown as { category: string }).category}
          catDef={CATEGORY_DEF}
          accent={ACCENT}
          sectionId="econ-loop"
        />
      </div>
    </section>
  )
}
