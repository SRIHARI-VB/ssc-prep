/**
 * Books & Authors — Exam Loop
 *
 * Wraps BooksExamEngine with filter UI.
 * 3-step quiz per book: Author → Theme → Award.
 * SSC Format entries use single-step question with options[].
 * Every regular BookEntry must have authorOptions[4], themeOptions[4], awardOptions[4].
 */

import { useState, useMemo } from 'react'
import { booksData, type Category, type ExamProb } from '../data'
import BooksExamEngine, { type CategoryStyles } from '../../../engine/BooksExamEngine'
import type { BookEngineEntry } from '../../../engine/types'

// ── Category config ──────────────────────────────────────────────────────────

const CAT_STYLES: CategoryStyles = {
  'Ancient/Medieval': {
    icon: '🏛️',
    chip:   'bg-amber-100 text-amber-800 border-amber-300',
    active: 'bg-amber-500 text-white border-amber-500',
    grad:   'from-amber-600 to-yellow-600',
  },
  'Freedom Struggle': {
    icon: '🇮🇳',
    chip:   'bg-orange-100 text-orange-800 border-orange-300',
    active: 'bg-orange-500 text-white border-orange-500',
    grad:   'from-orange-600 to-red-600',
  },
  'Sports': {
    icon: '🏅',
    chip:   'bg-sky-100 text-sky-800 border-sky-300',
    active: 'bg-sky-500 text-white border-sky-500',
    grad:   'from-sky-600 to-blue-700',
  },
  'PYQ': {
    icon: '📜',
    chip:   'bg-indigo-100 text-indigo-800 border-indigo-300',
    active: 'bg-indigo-600 text-white border-indigo-600',
    grad:   'from-indigo-600 to-violet-700',
  },
  'Literary Award': {
    icon: '🏆',
    chip:   'bg-violet-100 text-violet-800 border-violet-300',
    active: 'bg-violet-600 text-white border-violet-600',
    grad:   'from-violet-600 to-purple-700',
  },
  'Current Affairs': {
    icon: '🗞️',
    chip:   'bg-emerald-100 text-emerald-800 border-emerald-300',
    active: 'bg-emerald-600 text-white border-emerald-600',
    grad:   'from-emerald-600 to-teal-700',
  },
}

const ALL_CATEGORIES: Category[] = [
  'Ancient/Medieval', 'Freedom Struggle', 'Sports', 'PYQ', 'Literary Award', 'Current Affairs',
]

const ALL_PROBS: ExamProb[] = ['Hot', 'High', 'Confirmed', 'Recurring', 'Medium']

const PROB_CHIP: Record<ExamProb, string> = {
  Hot:       'bg-red-100 text-red-800 border-red-200',
  High:      'bg-orange-100 text-orange-800 border-orange-200',
  Confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Recurring: 'bg-blue-100 text-blue-800 border-blue-200',
  Medium:    'bg-yellow-100 text-yellow-800 border-yellow-200',
}

// ── Component ────────────────────────────────────────────────────────────────

type FilterCat = 'all' | Category | 'SSC Format'

export default function ExamLoop() {
  const [filterCat,  setFilterCat]  = useState<FilterCat>('all')
  const [filterProb, setFilterProb] = useState<'all' | ExamProb>('all')

  const filtered = useMemo<BookEngineEntry[]>(() => {
    const list = booksData.filter(b => {
      if (filterCat === 'SSC Format') return !!b.questionType
      if (filterCat !== 'all' && b.category !== filterCat) return false
      if (filterProb !== 'all' && b.examProb !== filterProb) return false
      return true
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (list.length > 0 ? list : booksData) as any as BookEngineEntry[]
  }, [filterCat, filterProb])

  const sscCount = booksData.filter(b => !!b.questionType).length

  return (
    <section id="exam-loop" className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-indigo-500 uppercase mb-1">Section 04</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Books &amp; Authors — Exam Loop</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl leading-relaxed">
            3-stage recall per book: <strong>Author → Theme → Award</strong>.
            Every step has <strong>4 hand-picked options</strong>. No random distractors.
            <br />Streak bonus: <span className="text-amber-600 font-bold">+5 pts</span> after 2 consecutive correct.
            Use <span className="text-violet-600 font-bold">📋 SSC Format</span> for match/assertion questions.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 mb-8 space-y-3">

          {/* Category row */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</span>
              {(filterCat !== 'all' || filterProb !== 'all') && (
                <span className="text-xs text-slate-400">— {filtered.length} books</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setFilterCat('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${filterCat === 'all' ? 'bg-slate-800 text-white border-slate-800 shadow-sm' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'}`}>
                All ({booksData.length})
              </button>
              <button onClick={() => setFilterCat('SSC Format')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${filterCat === 'SSC Format' ? 'bg-violet-600 text-white border-violet-600 shadow-md' : 'bg-violet-50 text-violet-700 border-violet-300 hover:bg-violet-100'}`}>
                📋 SSC Format ({sscCount})
              </button>
              {ALL_CATEGORIES.map(cat => {
                const count = booksData.filter(b => b.category === cat).length
                const style = CAT_STYLES[cat]
                return (
                  <button key={cat} onClick={() => setFilterCat(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${filterCat === cat ? style.active + ' shadow-md' : style.chip}`}>
                    {style.icon} {cat} ({count})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Priority row */}
          <div className="border-t border-slate-200 pt-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Exam Priority</span>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setFilterProb('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${filterProb === 'all' ? 'bg-slate-800 text-white border-slate-800 shadow-sm' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'}`}>
                All Priorities
              </button>
              {ALL_PROBS.map(prob => {
                const count = booksData.filter(b => b.examProb === prob).length
                return (
                  <button key={prob} onClick={() => setFilterProb(prob)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${filterProb === prob ? 'bg-slate-700 text-white border-slate-700 shadow-md' : PROB_CHIP[prob]}`}>
                    {prob} ({count})
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Engine — key forces full state reset on filter change */}
        <BooksExamEngine
          key={`books-${filterCat}-${filterProb}`}
          books={filtered}
          totalCount={booksData.length}
          categoryStyles={CAT_STYLES}
          barClass="bg-indigo-400"
        />
      </div>
    </section>
  )
}
