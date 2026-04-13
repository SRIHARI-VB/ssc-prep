import { useState, useMemo } from 'react'
import { reasoningConceptData, type ReasoningConceptEntry } from '../data'
import { SVG_MAP } from './svg'

const PROB_CHIP: Record<string, string> = {
  Hot: 'bg-red-100 text-red-700 border-red-200',
  High: 'bg-orange-100 text-orange-700 border-orange-200',
  Confirmed: 'bg-green-100 text-green-700 border-green-200',
  Recurring: 'bg-violet-100 text-violet-700 border-violet-200',
}

const PROB_ICON: Record<string, string> = {
  Hot: '🔥',
  High: '⚡',
  Confirmed: '✅',
  Recurring: '🔁',
}

/** Split method string into numbered steps. Splits on semicolons, newlines, or numbered prefixes. */
function parseMethodSteps(method: string): string[] {
  // Try splitting by semicolons first
  if (method.includes(';')) {
    return method.split(';').map(s => s.trim()).filter(Boolean)
  }
  // Try splitting by newlines
  if (method.includes('\n')) {
    return method.split('\n').map(s => s.trim()).filter(Boolean)
  }
  // Try splitting by numbered patterns like "1." "2." etc
  const numbered = method.split(/(?=\d+\.\s)/).map(s => s.trim()).filter(Boolean)
  if (numbered.length > 1) return numbered
  // If nothing works, treat as single step
  return [method]
}

export default function ConceptCards() {
  const [filterTopic, setFilterTopic] = useState<string>('all')
  const [searchQ, setSearchQ] = useState('')
  const [expanded, setExpanded] = useState<Set<number>>(new Set())

  const topics = useMemo(
    () => ['all', ...new Set(reasoningConceptData.map(c => c.topic))],
    []
  )

  const filtered = useMemo(() => {
    let pool: ReasoningConceptEntry[] = reasoningConceptData
    if (filterTopic !== 'all') pool = pool.filter(c => c.topic === filterTopic)
    if (searchQ.trim()) {
      const q = searchQ.toLowerCase()
      pool = pool.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.method.toLowerCase().includes(q) ||
        c.topic.toLowerCase().includes(q) ||
        c.detail.toLowerCase().includes(q)
      )
    }
    return pool.sort((a, b) => a.priority - b.priority)
  }, [filterTopic, searchQ])

  // Group by topic
  const grouped = useMemo(() => {
    const map = new Map<string, ReasoningConceptEntry[]>()
    for (const c of filtered) {
      if (!map.has(c.topic)) map.set(c.topic, [])
      map.get(c.topic)!.push(c)
    }
    return [...map.entries()]
  }, [filtered])

  const toggleExpand = (id: number) => {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <section id="lr-concepts" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500" />
          <h2 className="text-xl font-extrabold text-brand-900">Method &amp; Rule Bank</h2>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            {reasoningConceptData.length} Concepts
          </span>
        </div>

        {/* Topic filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {topics.map(t => (
            <button
              key={t}
              onClick={() => setFilterTopic(t)}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                filterTopic === t
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300'
              }`}
            >
              {t === 'all' ? 'All Topics' : t}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search methods... (e.g. 'direction', 'venn', 'blood relation')"
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-6"
        />

        <p className="text-xs text-slate-400 mb-6">
          Showing {filtered.length} concepts in {grouped.length} topics &middot; Sorted by SSC CGL priority
        </p>

        {/* Concept Groups */}
        <div className="space-y-10">
          {grouped.map(([topic, concepts]) => (
            <div key={topic}>
              <h3 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                {topic}
                <span className="text-xs font-normal text-slate-400">({concepts.length})</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {concepts.map(c => {
                  const SvgComp = c.svgKey ? SVG_MAP[c.svgKey] : null
                  const steps = parseMethodSteps(c.method)
                  const isOpen = expanded.has(c.id)

                  return (
                    <div
                      key={c.id}
                      className="bg-gradient-to-br from-slate-50 to-emerald-50/30 border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all cursor-pointer group"
                      onClick={() => toggleExpand(c.id)}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                            {c.topic}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${PROB_CHIP[c.examProb]}`}>
                            {PROB_ICON[c.examProb]} {c.examProb}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                            P{c.priority}
                          </span>
                        </div>
                        <span className="text-xs text-slate-300 group-hover:text-emerald-400 transition-colors">
                          {isOpen ? '▲' : '▼'}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-base font-extrabold text-slate-800 mb-3">{c.title}</h4>

                      {/* Content: SVG left + Method steps right */}
                      <div className={`flex gap-4 ${SvgComp ? 'items-start' : ''}`}>
                        {/* SVG Illustration */}
                        {SvgComp && (
                          <div className="shrink-0 w-24 h-24 bg-white rounded-xl border border-emerald-200 p-2 flex items-center justify-center overflow-hidden">
                            <SvgComp className="w-full h-full" />
                          </div>
                        )}

                        {/* Method Steps */}
                        <div className="flex-1 min-w-0">
                          <div className="bg-white rounded-xl border border-emerald-100 p-3">
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2">Method Steps</p>
                            <ol className="space-y-1.5">
                              {steps.map((step, i) => (
                                <li key={i} className="flex gap-2 text-xs text-slate-700 leading-relaxed">
                                  <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center mt-0.5">
                                    {i + 1}
                                  </span>
                                  <span>{step.replace(/^\d+\.\s*/, '')}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </div>

                      {/* Expanded details */}
                      {isOpen && (
                        <div className="mt-4 space-y-3 animate-fadeIn">
                          <div className="bg-white rounded-xl border border-slate-100 p-3">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Detail</p>
                            <p className="text-xs text-slate-600 leading-relaxed">{c.detail}</p>
                          </div>

                          {c.shortcut && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
                              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Shortcut Tip</p>
                              <p className="text-xs text-amber-700 italic leading-relaxed">💡 {c.shortcut}</p>
                            </div>
                          )}
                        </div>
                      )}

                      <p className="text-[10px] text-slate-300 mt-2">
                        {isOpen ? 'Click to collapse' : 'Click to expand details'}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-4xl mb-2">🔍</p>
            <p className="font-medium">No concepts match your search. Try different keywords.</p>
          </div>
        )}
      </div>
    </section>
  )
}
