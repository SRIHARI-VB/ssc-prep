import { useState, useMemo, useEffect } from 'react'
import { sportsPYQHistory, type SportsCategory, type SportsPYQEntry } from '../data'

const SUBJECT_BADGE: Record<SportsCategory, string> = {
  'Cricket':                'bg-orange-100 text-orange-800',
  'Olympics & CWG':         'bg-red-100 text-red-800',
  'Hockey':                 'bg-blue-100 text-blue-800',
  'Football':               'bg-green-100 text-green-800',
  'Tennis & Badminton':     'bg-violet-100 text-violet-800',
  'Athletics & Boxing':     'bg-pink-100 text-pink-800',
  'Awards & Honours':       'bg-amber-100 text-amber-800',
  'Tournaments & Trophies': 'bg-cyan-100 text-cyan-800',
  'Rules & Players':        'bg-indigo-100 text-indigo-800',
  'Venues & Events':        'bg-lime-100 text-lime-800',
  'Current Affairs 2024-26':'bg-rose-100 text-rose-800',
}

const PAGE_SIZE = 10

export default function PYQTracker() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!search) return sportsPYQHistory
    const q = search.toLowerCase()
    return sportsPYQHistory.filter(
      e => e.question.toLowerCase().includes(q) || e.answer.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)
    )
  }, [search])

  useEffect(() => { setPage(1) }, [filtered])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <section id="sp-pyq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest text-orange-600 uppercase mb-1">Section 07</p>
        <h2 className="text-3xl font-extrabold text-brand-900">PYQ Tracker</h2>
        <p className="mt-2 text-slate-500 text-sm max-w-2xl">
          Confirmed SSC CGL sports questions from 2019-2024 exams. Focus on recurring patterns: player counts, trophies, awards, venues, and Olympic medals.
        </p>
      </div>

      <div className="mb-4 max-w-sm">
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search questions, answers, or categories..."
          className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-700">Sports PYQ (2019-2024)</p>
          <span className="text-xs font-semibold text-slate-400">{filtered.length} recorded</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="py-3 px-5 w-[12%]">Date</th>
                <th className="py-3 px-5 w-[10%]">Shift</th>
                <th className="py-3 px-5 w-[45%]">Question</th>
                <th className="py-3 px-5 w-[22%]">Answer</th>
                <th className="py-3 px-5 w-[11%]">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {paginated.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-10 text-slate-400 text-sm">No entries match your search.</td></tr>
              ) : paginated.map((q: SportsPYQEntry, i: number) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 whitespace-nowrap">{q.date}</td>
                  <td className="py-3 px-5 text-slate-500 text-xs">{q.shift}</td>
                  <td className="py-3 px-5 text-slate-700">{q.question}</td>
                  <td className="py-3 px-5 font-semibold text-orange-700">{q.answer}</td>
                  <td className="py-3 px-5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${SUBJECT_BADGE[q.category]}`}>
                      {q.category.split(' ')[0]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50">
            <span className="text-xs text-slate-500">
              {(safePage - 1) * PAGE_SIZE + 1}--{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} entries
            </span>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setPage(p => p - 1)} disabled={safePage === 1}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border bg-white border-slate-200 hover:border-orange-400 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                &larr; Prev
              </button>
              <span className="text-xs font-bold text-slate-700 px-2">{safePage} / {totalPages}</span>
              <button onClick={() => setPage(p => p + 1)} disabled={safePage === totalPages}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border bg-white border-slate-200 hover:border-orange-400 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                Next &rarr;
              </button>
            </div>
          </div>
        )}
        <div className="px-5 py-3 bg-orange-50 border-t border-orange-100">
          <p className="text-xs text-orange-700">
            <strong>SSC CGL Sports Pattern:</strong> Typically 2-4 questions per paper on sports.
            Most common: player counts per sport, trophy-sport associations, award names (Khel Ratna, Arjuna, Dronacharya),
            Olympic medal winners (especially recent), venue locations, and current affairs (recent tournaments, records).
          </p>
        </div>
      </div>
    </section>
  )
}
