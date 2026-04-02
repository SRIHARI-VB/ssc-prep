import { useState, useMemo, useEffect } from 'react'
import { polityData, type PolityCategory, type ExamProb } from '../data'

const SUBJECTS: ('all' | PolityCategory)[] = ['all', 'Important Articles', 'Schedules', 'Amendments', 'Landmark Cases', 'Constitutional Bodies', 'Parliament & Executive', 'Fundamental Rights & DPSP']
const PROBS: ('all' | ExamProb)[] = ['all', 'Hot', 'Confirmed', 'High', 'Recurring']

const SUBJECT_BADGE: Record<PolityCategory, string> = {
  'Important Articles':        'bg-indigo-100 text-indigo-800',
  'Schedules':                 'bg-teal-100 text-teal-800',
  'Amendments':                'bg-blue-100 text-blue-800',
  'Landmark Cases':            'bg-green-100 text-green-800',
  'Constitutional Bodies':     'bg-red-100 text-red-800',
  'Parliament & Executive':    'bg-violet-100 text-violet-800',
  'Fundamental Rights & DPSP': 'bg-amber-100 text-amber-800',
}

const PROB_BADGE: Record<ExamProb, string> = {
  'Hot':       'bg-red-100 text-red-700 border-red-200',
  'High':      'bg-orange-100 text-orange-700 border-orange-200',
  'Confirmed': 'bg-green-100 text-green-700 border-green-200',
  'Recurring': 'bg-violet-100 text-violet-700 border-violet-200',
}

function highlight(text: string, query: string) {
  if (!query) return <>{text}</>
  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return <>{parts.map((p, i) => i % 2 === 1 ? <mark key={i} className="bg-yellow-200 rounded-sm">{p}</mark> : p)}</>
}

const PAGE_SIZE = 10

export default function FactMatrix() {
  const [filterSubject, setFilterSubject] = useState<'all' | PolityCategory>('all')
  const [filterProb, setFilterProb]       = useState<'all' | ExamProb>('all')
  const [search, setSearch]               = useState('')
  const [expanded, setExpanded]           = useState<number | null>(null)
  const [page, setPage]                   = useState(1)

  // Exclude SSC CGL format questions (multi-statement, assertion-reason, match-following)
  // — those are practice-only and should not appear in the reference matrix
  const studyEntries = useMemo(() => polityData.filter(e => !e.questionType), [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return studyEntries.filter(e => {
      if (filterSubject !== 'all' && e.category !== filterSubject) return false
      if (filterProb    !== 'all' && e.examProb !== filterProb)   return false
      if (q && !e.question.toLowerCase().includes(q) && !e.answer.toLowerCase().includes(q) && !e.topic.toLowerCase().includes(q)) return false
      return true
    })
  }, [studyEntries, filterSubject, filterProb, search])

  useEffect(() => { setPage(1); setExpanded(null) }, [filtered])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage   = Math.min(page, totalPages)
  const paginated  = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <section id="pol-matrix" className="py-14 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-1">Section 02</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Fact Matrix</h2>
          <p className="mt-2 text-slate-500 text-sm">Filter, search, click to reveal mnemonic.</p>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-5">
          {/* Subject filter */}
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map(s => (
              <button key={s} onClick={() => setFilterSubject(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  filterSubject === s
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400'
                }`}>
                {s === 'all' ? `All (${studyEntries.length})` : `${s.split(' ')[0]}... (${studyEntries.filter(e => e.category === s).length})`}
              </button>
            ))}
          </div>

          {/* Prob filter */}
          <div className="flex flex-wrap gap-2">
            {PROBS.map(p => (
              <button key={p} onClick={() => setFilterProb(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  filterProb === p
                    ? 'bg-brand-900 text-white border-brand-900'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                }`}>
                {p === 'all' ? 'All Priorities' : p}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-sm">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">🔍</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search question, answer, or article..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <p className="text-xs text-slate-400">{filtered.length} of {studyEntries.length} entries</p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="text-left min-w-[1100px] w-full">
              <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4 min-w-[100px] whitespace-nowrap">Category</th>
                  <th className="py-3 px-4 min-w-[150px] whitespace-nowrap">Topic</th>
                  <th className="py-3 px-4 min-w-[320px]">Question</th>
                  <th className="py-3 px-4 min-w-[280px]">Answer</th>
                  <th className="py-3 px-4 min-w-[90px] whitespace-nowrap">Priority</th>
                  <th className="py-3 px-4 min-w-[110px] whitespace-nowrap">Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {paginated.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-10 text-slate-400 text-sm">No entries match your filters.</td></tr>
                ) : paginated.map(e => (
                  <>
                    <tr key={e.id}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => setExpanded(expanded === e.id ? null : e.id)}>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${SUBJECT_BADGE[e.category]}`}>
                          {e.category.split(' ')[0]}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-xs font-medium">{e.topic}</td>
                      <td className="py-3 px-4 text-slate-700 font-medium">{highlight(e.question, search)}</td>
                      <td className="py-3 px-4 text-amber-700 font-bold">{highlight(e.answer, search)}</td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${PROB_BADGE[e.examProb]}`}>
                          {e.examProb}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 text-xs whitespace-nowrap">{e.context}</td>
                    </tr>
                    {expanded === e.id && (
                      <tr key={`${e.id}-exp`}>
                        <td colSpan={6} className="px-4 py-3 bg-amber-50/60 animate-fade-slide">
                          <p className="text-sm text-amber-800 leading-relaxed mb-1">
                            <strong>Explanation:</strong> {e.detail}
                          </p>
                          {e.shortcut && (
                            <p className="font-mnemonic text-xs text-amber-700 italic mt-1">
                              💡 Shortcut: &quot;{e.shortcut}&quot;
                            </p>
                          )}
                          <p className="text-xs text-slate-400 mt-1">📅 {e.context}</p>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50">
              <span className="text-xs text-slate-500">
                {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} entries
              </span>
              <div className="flex items-center gap-1.5">
                <button onClick={() => { setPage(p => p - 1); setExpanded(null) }} disabled={safePage === 1}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border bg-white border-slate-200 hover:border-amber-400 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  ← Prev
                </button>
                <span className="text-xs font-bold text-slate-700 px-2">{safePage} / {totalPages}</span>
                <button onClick={() => { setPage(p => p + 1); setExpanded(null) }} disabled={safePage === totalPages}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border bg-white border-slate-200 hover:border-amber-400 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
