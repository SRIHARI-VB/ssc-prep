import { useState, useMemo } from 'react'
import { historyData, type HistoryCategory } from '../data'

const ERA_RANGES = [
  { label: 'Ancient (3000 BCE – 600 CE)', min: -3000, max: 600,  color: 'border-amber-400 bg-amber-50',   dot: 'bg-amber-500',  text: 'text-amber-700' },
  { label: 'Medieval (600 – 1526 CE)',     min: 600,   max: 1526, color: 'border-orange-400 bg-orange-50', dot: 'bg-orange-500', text: 'text-orange-700' },
  { label: 'Modern (1526 – 1857 CE)',      min: 1526,  max: 1857, color: 'border-blue-400 bg-blue-50',     dot: 'bg-blue-500',   text: 'text-blue-700' },
  { label: 'Freedom Era (1857 – 1950 CE)', min: 1857,  max: 1950, color: 'border-green-400 bg-green-50',   dot: 'bg-green-500',  text: 'text-green-700' },
]

const CAT_BADGE: Record<HistoryCategory, string> = {
  'Ancient India':     'bg-amber-100 text-amber-800',
  'Medieval India':    'bg-orange-100 text-orange-800',
  'Modern India':      'bg-blue-100 text-blue-800',
  'Freedom Struggle':  'bg-green-100 text-green-800',
  'Reform Movements':  'bg-violet-100 text-violet-800',
  'Art & Culture':     'bg-pink-100 text-pink-800',
  'Battles & Wars':    'bg-red-100 text-red-800',
}

const PROB_DOT: Record<string, string> = {
  Hot: 'bg-red-500', High: 'bg-orange-400', Confirmed: 'bg-green-500', Recurring: 'bg-violet-400',
}

export default function Timeline() {
  const [activeEra, setActiveEra] = useState(0)
  const [expanded, setExpanded] = useState<number | null>(null)

  const timelineEntries = useMemo(() =>
    historyData
      .filter(e => !e.questionType && e.year != null)
      .sort((a, b) => (a.year ?? 0) - (b.year ?? 0)),
    []
  )

  const era = ERA_RANGES[activeEra]
  const eraEntries = useMemo(() =>
    timelineEntries.filter(e => (e.year ?? 0) >= era.min && (e.year ?? 0) < era.max),
    [timelineEntries, era]
  )

  // Group by year for date-based recall
  const grouped = useMemo(() => {
    const map = new Map<number, typeof eraEntries>()
    eraEntries.forEach(e => {
      const y = e.year!
      if (!map.has(y)) map.set(y, [])
      map.get(y)!.push(e)
    })
    return [...map.entries()].sort((a, b) => a[0] - b[0])
  }, [eraEntries])

  const formatYear = (y: number) => y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`

  return (
    <section id="hist-timeline" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-1">Section 04 -- Chronological Timeline</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Date-Based Quick Recall</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            Events grouped by date in chronological order. Perfect for memorizing years and sequences.
            Click any event to reveal details.
          </p>
        </div>

        {/* Era selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ERA_RANGES.map((e, i) => (
            <button
              key={e.label}
              onClick={() => { setActiveEra(i); setExpanded(null) }}
              className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                activeEra === i
                  ? `${e.color} ${e.text} ring-2 ring-offset-1 ring-current shadow-sm`
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
              }`}>
              {e.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span className={`w-3 h-3 rounded-full ${era.dot}`}></span>
          <span className="text-sm font-bold text-slate-700">{eraEntries.length} events in this era</span>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>

          <div className="space-y-0">
            {grouped.map(([year, events]) => (
              <div key={year} className="relative pl-16 md:pl-20 pb-6">
                {/* Year marker */}
                <div className="absolute left-0 md:left-2 flex items-center">
                  <div className={`w-12 md:w-12 h-7 rounded-full ${era.dot} flex items-center justify-center z-10`}>
                    <span className="text-[10px] font-extrabold text-white">{year < 0 ? Math.abs(year) : year}</span>
                  </div>
                </div>

                {/* Year label */}
                <div className="mb-2">
                  <span className={`text-xs font-extrabold ${era.text} uppercase tracking-wider`}>
                    {formatYear(year)}
                  </span>
                </div>

                {/* Events for this year */}
                <div className="space-y-2">
                  {events.map(e => (
                    <div
                      key={e.id}
                      onClick={() => setExpanded(expanded === e.id ? null : e.id)}
                      className={`bg-white rounded-xl border shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all ${
                        expanded === e.id ? era.color : 'border-slate-200'
                      }`}>
                      <div className="flex items-start gap-3 px-4 py-3">
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${PROB_DOT[e.examProb]}`}></span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 leading-snug">{e.question}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CAT_BADGE[e.category]}`}>
                              {e.category}
                            </span>
                            {e.place && (
                              <span className="text-[10px] text-slate-400">📍 {e.place}</span>
                            )}
                          </div>
                        </div>
                        <span className="text-slate-300 text-sm shrink-0">{expanded === e.id ? '\u25B2' : '\u25BC'}</span>
                      </div>

                      {expanded === e.id && (
                        <div className="border-t border-slate-100 px-4 py-3 bg-slate-50 animate-fade-slide">
                          <p className="text-sm font-bold text-amber-800 mb-1">{e.answer}</p>
                          <p className="text-xs text-slate-600 leading-relaxed">{e.detail}</p>
                          {e.shortcut && (
                            <p className="font-mnemonic text-xs text-amber-700 italic mt-2">
                              Shortcut: &quot;{e.shortcut}&quot;
                            </p>
                          )}
                          <p className="text-xs text-slate-400 mt-1">{e.context}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {grouped.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <span className="text-3xl block mb-2">📭</span>
                No dated events in this era range.
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
