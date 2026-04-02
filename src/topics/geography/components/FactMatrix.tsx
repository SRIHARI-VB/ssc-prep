import { useState, useMemo, Fragment } from 'react'
import { geoData, type GeoCategory, type ExamProb } from '../data'

const SUBJECTS: ('all' | GeoCategory)[] = [
  'all', 'Indian Rivers', 'Mountains & Passes', 'Soil & Climate',
  'National Parks & Wildlife', 'Agriculture & Crops', 'Minerals & Resources',
  'Dams & Irrigation', 'World Geography', 'Straits & Waterways',
  'Transport & Industry', 'Population & Census', 'Current Affairs (Geo)',
]
const PROBS: ('all' | ExamProb)[] = ['all', 'Hot', 'Confirmed', 'High', 'Recurring']

const SUBJECT_BADGE: Record<GeoCategory, string> = {
  'Indian Rivers':             'bg-blue-100 text-blue-800',
  'Mountains & Passes':        'bg-violet-100 text-violet-800',
  'Soil & Climate':            'bg-yellow-100 text-yellow-800',
  'National Parks & Wildlife':  'bg-green-100 text-green-800',
  'Agriculture & Crops':       'bg-lime-100 text-lime-800',
  'Minerals & Resources':      'bg-orange-100 text-orange-800',
  'Dams & Irrigation':         'bg-cyan-100 text-cyan-800',
  'World Geography':           'bg-indigo-100 text-indigo-800',
  'Straits & Waterways':       'bg-sky-100 text-sky-800',
  'Transport & Industry':      'bg-purple-100 text-purple-800',
  'Population & Census':       'bg-pink-100 text-pink-800',
  'Current Affairs (Geo)':     'bg-red-100 text-red-800',
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

export default function FactMatrix() {
  const [filterSubject, setFilterSubject] = useState<'all' | GeoCategory>('all')
  const [filterProb, setFilterProb]       = useState<'all' | ExamProb>('all')
  const [search, setSearch]               = useState('')
  const [expanded, setExpanded]           = useState<number | null>(null)

  // Exclude SSC CGL format questions (multi-statement, assertion-reason, match-following)
  // — those are practice-only and should not appear in the reference matrix
  const studyEntries = useMemo(() => geoData.filter(e => !e.questionType), [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return studyEntries.filter(e => {
      if (filterSubject !== 'all' && e.category !== filterSubject) return false
      if (filterProb    !== 'all' && e.examProb !== filterProb)   return false
      if (q && !e.question.toLowerCase().includes(q) && !e.answer.toLowerCase().includes(q) && !e.topic.toLowerCase().includes(q)) return false
      return true
    })
  }, [studyEntries, filterSubject, filterProb, search])

  return (
    <section id="geo-matrix" className="py-14 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-6">
          <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-1">Section 03</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Geography Fact Matrix</h2>
          <p className="mt-2 text-slate-500 text-sm">Filter by category, priority -- click to reveal details and mnemonics.</p>
        </div>

        <div className="space-y-3 mb-5">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map(s => (
              <button key={s} onClick={() => setFilterSubject(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  filterSubject === s
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400'
                }`}>
                {s === 'all' ? `All (${studyEntries.length})` : `${s.split(' ')[0]}... (${studyEntries.filter(e => e.category === s).length})`}
              </button>
            ))}
          </div>

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

          <div className="relative max-w-sm">
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search topic, question, or answer..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <p className="text-xs text-slate-400">{filtered.length} of {studyEntries.length} entries</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4 w-[11%]">Category</th>
                  <th className="py-3 px-4 w-[13%]">Topic</th>
                  <th className="py-3 px-4 w-[36%]">Question</th>
                  <th className="py-3 px-4 w-[26%]">Answer</th>
                  <th className="py-3 px-4 w-[7%]">Priority</th>
                  <th className="py-3 px-4 w-[7%]">Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filtered.map(e => (
                  <Fragment key={e.id}>
                    <tr
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => setExpanded(expanded === e.id ? null : e.id)}>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${SUBJECT_BADGE[e.category]}`}>
                          {e.category.split(' ')[0]}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-xs font-medium">{e.topic}</td>
                      <td className="py-3 px-4 text-slate-700 font-medium">{highlight(e.question, search)}</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">{highlight(e.answer, search)}</td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${PROB_BADGE[e.examProb]}`}>
                          {e.examProb}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 text-xs truncate max-w-[80px]">{e.context.split(' ').slice(0,3).join(' ')}</td>
                    </tr>
                    {expanded === e.id && (
                      <tr>
                        <td colSpan={6} className="px-4 py-3 bg-emerald-50/60 animate-fade-slide">
                          <p className="text-sm text-emerald-800 leading-relaxed mb-1">
                            <strong>Details:</strong> {e.detail}
                          </p>
                          {e.shortcut && (
                            <p className="font-mnemonic text-xs text-emerald-700 italic mt-1">
                              Shortcut: &quot;{e.shortcut}&quot;
                            </p>
                          )}
                          {e.tamilNote && (
                            <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 mt-2 leading-relaxed">
                              <span className="font-bold">தமிழ்:</span> {e.tamilNote}
                            </p>
                          )}
                          <p className="text-xs text-slate-400 mt-1">{e.context}</p>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="text-center py-10 text-slate-400 text-sm">No entries match your filters.</p>
          )}
        </div>
      </div>
    </section>
  )
}
