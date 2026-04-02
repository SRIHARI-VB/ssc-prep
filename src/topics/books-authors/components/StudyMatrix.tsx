import { useState, useMemo, useEffect } from 'react'
import { booksData, type Category, type ExamProb } from '../data'

// ── Helpers ──────────────────────────────────────────────────────────────────

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === query.toLowerCase()
          ? <mark key={i} className="bg-yellow-200 text-yellow-900 rounded-sm px-0.5">{p}</mark>
          : p
      )}
    </>
  )
}

// Exam probability config
const PROB_CONFIG: Record<ExamProb, { label: string; classes: string }> = {
  Hot:       { label: '🔴 Hot',       classes: 'bg-red-100 text-red-700 border-red-200' },
  High:      { label: '🟠 High',      classes: 'bg-orange-100 text-orange-700 border-orange-200' },
  Medium:    { label: '🟡 Medium',    classes: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  Confirmed: { label: '✅ Confirmed', classes: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  Recurring: { label: '🔁 Recurring', classes: 'bg-blue-100 text-blue-700 border-blue-200' },
}

// Category config
const CAT_CONFIG: Record<Category, { short: string; classes: string }> = {
  'Ancient/Medieval': { short: '🏛️ Ancient',     classes: 'bg-amber-100 text-amber-800 border-amber-200' },
  'Freedom Struggle': { short: '🇮🇳 Freedom',     classes: 'bg-orange-100 text-orange-800 border-orange-200' },
  'Sports':           { short: '🏅 Sports',       classes: 'bg-sky-100 text-sky-800 border-sky-200' },
  'PYQ':              { short: '📜 PYQ',          classes: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  'Literary Award':   { short: '🏆 Award',        classes: 'bg-violet-100 text-violet-800 border-violet-200' },
  'Current Affairs':  { short: '🗞️ Current',      classes: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
}

type FilterCat = 'all' | Category
type FilterProb = 'all' | ExamProb

const ALL_CATEGORIES: Category[] = [
  'Ancient/Medieval', 'Freedom Struggle', 'Sports', 'PYQ', 'Literary Award', 'Current Affairs',
]
const ALL_PROBS: ExamProb[] = ['Hot', 'High', 'Confirmed', 'Recurring', 'Medium']

// ── Component ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10

export default function StudyMatrix() {
  const [search, setSearch]    = useState('')
  const [catFilter, setCat]    = useState<FilterCat>('all')
  const [probFilter, setProb]  = useState<FilterProb>('all')
  const [expanded, setExpanded] = useState<number | null>(null)
  const [page, setPage]         = useState(1)

  // Only regular book entries — SSC CGL format questions (match-following, multi-statement, etc.)
  // are practice-only and should not appear in the study reference table
  const studyEntries = useMemo(() => booksData.filter(b => !b.questionType), [])

  const filtered = useMemo(() =>
    studyEntries.filter(b => {
      const q = search.toLowerCase()
      const matchSearch =
        b.title.toLowerCase().includes(q)   ||
        b.author.toLowerCase().includes(q)  ||
        b.theme.toLowerCase().includes(q)   ||
        b.award.toLowerCase().includes(q)   ||
        (b.context ?? '').toLowerCase().includes(q)
      const matchCat  = catFilter  === 'all' || b.category === catFilter
      const matchProb = probFilter === 'all' || b.examProb === probFilter
      return matchSearch && matchCat && matchProb
    }),
    [studyEntries, search, catFilter, probFilter]
  )

  // Reset to page 1 whenever filters/search change
  useEffect(() => { setPage(1); setExpanded(null) }, [filtered])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage   = Math.min(page, totalPages)
  const paginated  = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <section id="matrix" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest text-indigo-500 uppercase mb-1">Section 02</p>
        <h2 className="text-3xl font-extrabold text-brand-900">Study Matrix</h2>
        <p className="mt-2 text-slate-500 text-sm max-w-2xl leading-relaxed">
          All {studyEntries.length} book entries across 6 categories. Theme is always visible. Filter by category or exam probability.
          Click a row to expand the mnemonic shortcut.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* Controls Panel */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 space-y-3">

          {/* Row 1 — Search + count */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-80">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm pointer-events-none">🔍</span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search book, author, theme, award…"
                className="w-full pl-9 pr-9 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600">✕</button>
              )}
            </div>
            <span className="text-xs font-semibold text-slate-400 shrink-0">
              {filtered.length} / {studyEntries.length} entries
            </span>
          </div>

          {/* Row 2 — Category filter chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCat('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${catFilter === 'all' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
            >All Categories</button>
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCat(cat === catFilter ? 'all' : cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${catFilter === cat ? CAT_CONFIG[cat].classes + ' ring-2 ring-offset-1 ring-current' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
              >
                {CAT_CONFIG[cat].short}
              </button>
            ))}
          </div>

          {/* Row 3 — Exam Prob filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-slate-400">Exam Prob:</span>
            <button
              onClick={() => setProb('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${probFilter === 'all' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
            >All</button>
            {ALL_PROBS.map(p => (
              <button
                key={p}
                onClick={() => setProb(p === probFilter ? 'all' : p)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${probFilter === p ? PROB_CONFIG[p].classes + ' ring-2 ring-offset-1 ring-current' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
              >
                {PROB_CONFIG[p].label}
              </button>
            ))}
          </div>
        </div>

        {/* ── DESKTOP TABLE ── */}
        <div className="hidden md:block overflow-x-auto">
          <table className="text-left min-w-[1150px] w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4 min-w-[240px]">Book Title</th>
                <th className="py-3 px-4 min-w-[230px]">Theme</th>
                <th className="py-3 px-4 min-w-[150px] whitespace-nowrap">Author</th>
                <th className="py-3 px-4 min-w-[110px] text-center whitespace-nowrap">Category</th>
                <th className="py-3 px-4 min-w-[180px]">Award / Year</th>
                <th className="py-3 px-4 min-w-[110px] text-center whitespace-nowrap">Exam Prob</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-400">
                    <span className="text-3xl block mb-2">😕</span>
                    No entries match your filters.
                  </td>
                </tr>
              ) : paginated.map(b => (
                <>
                  <tr
                    key={b.id}
                    onClick={() => setExpanded(expanded === b.id ? null : b.id)}
                    className="hover:bg-indigo-50/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors leading-snug">
                        {highlight(b.title, search)}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5 italic">{highlight(b.context ?? '', search)}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-xs text-slate-600 leading-relaxed">{highlight(b.theme, search)}</p>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700 text-sm">
                      {highlight(b.author, search)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${CAT_CONFIG[b.category].classes}`}>
                        {CAT_CONFIG[b.category].short}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-xs font-semibold text-emerald-700 leading-snug">{highlight(b.award, search)}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{b.year}</p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${PROB_CONFIG[b.examProb].classes}`}>
                        {PROB_CONFIG[b.examProb].label}
                      </span>
                    </td>
                  </tr>
                  {expanded === b.id && (
                    <tr key={`${b.id}-exp`} className="bg-amber-50/60">
                      <td colSpan={6} className="px-4 py-3 animate-fade-slide">
                        <div className="flex items-start gap-2">
                          <span className="text-amber-500 text-base shrink-0">💡</span>
                          <div>
                            <span className="text-xs font-bold text-amber-700 uppercase tracking-wide mr-2">Mnemonic:</span>
                            <span className="font-mnemonic text-sm text-amber-800 italic">"{b.mnemonic}"</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── MOBILE CARDS ── */}
        <div className="md:hidden divide-y divide-slate-100">
          {paginated.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <span className="text-3xl block mb-2">😕</span>No entries found.
            </div>
          ) : paginated.map(b => (
            <div
              key={b.id}
              onClick={() => setExpanded(expanded === b.id ? null : b.id)}
              className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-bold text-slate-800 text-sm leading-snug">{b.title}</p>
                <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold border ${CAT_CONFIG[b.category].classes}`}>
                  {CAT_CONFIG[b.category].short}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-1">{b.author}</p>
              <p className="text-xs text-slate-400 italic leading-relaxed">{b.theme}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${PROB_CONFIG[b.examProb].classes}`}>
                  {PROB_CONFIG[b.examProb].label}
                </span>
                <span className="text-xs text-emerald-700 font-medium">{b.award}</span>
              </div>
              {expanded === b.id && (
                <div className="mt-3 bg-amber-50 rounded-xl px-3 py-2 border border-amber-100 animate-fade-slide">
                  <p className="text-xs font-bold text-amber-700 mb-1">Mnemonic:</p>
                  <p className="font-mnemonic text-xs text-amber-800 italic">"{b.mnemonic}"</p>
                  <p className="text-xs text-slate-400 mt-1 italic">{b.context}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50">
            <span className="text-xs text-slate-500">
              {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} entries
            </span>
            <div className="flex items-center gap-1.5">
              <button onClick={() => { setPage(p => p - 1); setExpanded(null) }} disabled={safePage === 1}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border bg-white border-slate-200 hover:border-indigo-400 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                ← Prev
              </button>
              <span className="text-xs font-bold text-slate-700 px-2">
                {safePage} / {totalPages}
              </span>
              <button onClick={() => { setPage(p => p + 1); setExpanded(null) }} disabled={safePage === totalPages}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border bg-white border-slate-200 hover:border-indigo-400 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                Next →
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
