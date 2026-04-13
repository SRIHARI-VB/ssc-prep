import { useState, useMemo } from 'react'
import { reasoningPYQs } from '../data'

const PAGE_SIZE = 10

const PROB_CHIP: Record<string, string> = {
  Hot: 'bg-red-100 text-red-700 border-red-200',
  High: 'bg-orange-100 text-orange-700 border-orange-200',
  Confirmed: 'bg-green-100 text-green-700 border-green-200',
  Recurring: 'bg-violet-100 text-violet-700 border-violet-200',
}

export default function PYQTracker() {
  const [topicFilter, setTopicFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('all')
  const [revealedSet, setRevealed] = useState<Set<number>>(new Set())
  const [page, setPage] = useState(0)

  const years = useMemo(() => ['all', ...new Set(reasoningPYQs.map(p => p.year))], [])
  const topics = useMemo(() => ['all', ...new Set(reasoningPYQs.map(p => p.topic))], [])

  const filtered = useMemo(() => {
    let pool = reasoningPYQs
    if (topicFilter !== 'all') pool = pool.filter(p => p.topic === topicFilter)
    if (yearFilter !== 'all') pool = pool.filter(p => p.year === yearFilter)
    return pool
  }, [topicFilter, yearFilter])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const toggleReveal = (id: number) => {
    setRevealed(prev => {
      const s = new Set(prev)
      s.has(id) ? s.delete(id) : s.add(id)
      return s
    })
  }

  return (
    <section id="lr-pyq" className="py-12 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-teal-500 to-emerald-500" />
          <h2 className="text-xl font-extrabold text-brand-900">PYQ Tracker</h2>
          <span className="text-xs font-bold text-teal-600 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
            {reasoningPYQs.length} PYQs
          </span>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-6">
          <div className="flex flex-wrap gap-2">
            {topics.map(t => (
              <button
                key={t}
                onClick={() => { setTopicFilter(t); setPage(0) }}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                  topicFilter === t
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300'
                }`}
              >
                {t === 'all' ? 'All Topics' : t}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {years.map(y => (
              <button
                key={y}
                onClick={() => { setYearFilter(y); setPage(0) }}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                  yearFilter === y
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-amber-300'
                }`}
              >
                {y === 'all' ? 'All Years' : y}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-4">Showing {filtered.length} PYQ(s)</p>

        {/* Questions */}
        <div className="space-y-4">
          {paginated.map(p => (
            <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${PROB_CHIP[p.examProb]}`}>
                    {p.examProb}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {p.year} &middot; {p.shift}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-emerald-600 bg-emerald-50 border border-emerald-200">
                    {p.topic}
                  </span>
                </div>
              </div>

              <p className="text-sm font-bold text-slate-800 mb-3">{p.question}</p>

              <div className="grid grid-cols-2 gap-2 mb-3">
                {p.options.map((opt, i) => (
                  <div
                    key={i}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border ${
                      revealedSet.has(p.id) && opt === p.answer
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="text-slate-400 font-bold mr-1">{String.fromCharCode(65 + i)}.</span> {opt}
                  </div>
                ))}
              </div>

              {revealedSet.has(p.id) ? (
                <div className="space-y-2">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                    <p className="text-xs text-emerald-700">
                      <span className="font-bold">Answer:</span> {p.answer}
                    </p>
                  </div>
                  <p className="text-xs text-slate-600">{p.explanation}</p>
                  <div className="bg-teal-50 border border-teal-200 rounded-lg px-3 py-2">
                    <p className="text-xs text-teal-700">
                      <span className="font-bold">Method Used:</span> {p.methodUsed}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleReveal(p.id)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Hide answer ▲
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => toggleReveal(p.id)}
                  className="text-xs text-emerald-500 hover:text-emerald-700 font-medium"
                >
                  Show answer &amp; method ▼
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 disabled:opacity-40"
            >
              &larr; Prev
            </button>
            <span className="text-xs text-slate-500">Page {page + 1} of {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 disabled:opacity-40"
            >
              Next &rarr;
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-4xl mb-2">📭</p>
            <p className="font-medium">No PYQs match your filters.</p>
          </div>
        )}
      </div>
    </section>
  )
}
