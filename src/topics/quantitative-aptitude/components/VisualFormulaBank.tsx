import { useState, useMemo } from 'react'
import { mathsFormulaData, type FormulaEntry } from '../data'
import { SVG_MAP } from './svg'

const PROB_CHIP: Record<string, string> = {
  Hot:       'bg-red-100 text-red-700 border-red-200',
  High:      'bg-orange-100 text-orange-700 border-orange-200',
  Confirmed: 'bg-green-100 text-green-700 border-green-200',
  Recurring: 'bg-violet-100 text-violet-700 border-violet-200',
}

const TOPIC_COLORS: Record<string, string> = {
  'Data Interpretation':    'border-l-cyan-500',
  'Geometry':               'border-l-amber-500',
  'Mensuration':            'border-l-orange-500',
  'Trigonometry':           'border-l-rose-500',
  'Algebra':                'border-l-indigo-500',
  'Number System':          'border-l-violet-500',
  'Percentage':             'border-l-blue-500',
  'Profit & Loss':          'border-l-green-500',
  'Simple & Compound Interest': 'border-l-teal-500',
  'Speed, Distance & Time': 'border-l-emerald-500',
  'Time & Work':            'border-l-sky-500',
  'Average & Alligation':   'border-l-lime-500',
  'Ratio & Proportion':     'border-l-blue-400',
  'Statistics':             'border-l-pink-500',
  'Surds & Indices':        'border-l-red-500',
  'Coordinate Geometry':    'border-l-fuchsia-500',
  'Mixture & Alligation':   'border-l-yellow-500',
}

function getTopicColor(topic: string): string {
  return TOPIC_COLORS[topic] || 'border-l-slate-400'
}

export default function VisualFormulaBank() {
  const [search, setSearch] = useState('')
  const [topicFilter, setTopicFilter] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [groupByTopic, setGroupByTopic] = useState(true)

  const topics = useMemo(
    () => ['all', ...new Set(mathsFormulaData.map(f => f.topic))] as string[],
    []
  )

  const filtered = useMemo(() => {
    let pool = mathsFormulaData
    if (topicFilter !== 'all') pool = pool.filter(f => f.topic === topicFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      pool = pool.filter(
        f =>
          f.title.toLowerCase().includes(q) ||
          f.formula.toLowerCase().includes(q) ||
          f.detail.toLowerCase().includes(q) ||
          (f.shortcut && f.shortcut.toLowerCase().includes(q))
      )
    }
    return pool
  }, [topicFilter, search])

  const grouped = useMemo(() => {
    if (!groupByTopic) return { All: filtered }
    const map: Record<string, FormulaEntry[]> = {}
    for (const f of filtered) {
      const key = f.topic as string
      if (!map[key]) map[key] = []
      map[key].push(f)
    }
    return map
  }, [filtered, groupByTopic])

  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())

  const toggleGroup = (g: string) => {
    setCollapsedGroups(prev => {
      const s = new Set(prev)
      s.has(g) ? s.delete(g) : s.add(g)
      return s
    })
  }

  return (
    <section id="qa-formulas" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-indigo-500" />
          <h2 className="text-xl font-extrabold text-brand-900">Visual Formula Bank</h2>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            {mathsFormulaData.length} Formulas
          </span>
        </div>

        {/* Search & controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Search formulas, topics, shortcuts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
          <button
            onClick={() => setGroupByTopic(g => !g)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              groupByTopic
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {groupByTopic ? 'Grouped by Topic' : 'Flat List'}
          </button>
        </div>

        {/* Topic filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {topics.map(t => (
            <button
              key={t}
              onClick={() => setTopicFilter(t)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                topicFilter === t
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300'
              }`}
            >
              {t === 'all' ? `All (${mathsFormulaData.length})` : t}
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Showing {filtered.length} formula(s)
        </p>

        {/* Grouped formula cards */}
        {Object.entries(grouped).map(([group, formulas]) => (
          <div key={group} className="mb-6">
            {groupByTopic && (
              <button
                onClick={() => toggleGroup(group)}
                className="flex items-center gap-2 mb-3 group"
              >
                <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
                  {group}
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  ({formulas.length})
                </span>
                <span className="text-slate-400 text-xs transition-transform group-hover:text-indigo-500">
                  {collapsedGroups.has(group) ? '+ Expand' : '- Collapse'}
                </span>
              </button>
            )}

            {!collapsedGroups.has(group) && (
              <div className="space-y-3">
                {formulas.map(f => {
                  const SvgComponent = f.svgKey ? SVG_MAP[f.svgKey] : null
                  const isExpanded = expandedId === f.id

                  return (
                    <div
                      key={f.id}
                      onClick={() => setExpandedId(isExpanded ? null : f.id)}
                      className={`border-l-4 ${getTopicColor(f.topic)} bg-slate-50 border border-slate-200 rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                        isExpanded ? 'shadow-md ring-2 ring-blue-200' : ''
                      }`}
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Left side: SVG illustration */}
                        <div className="md:w-[40%] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4 min-h-[120px]">
                          {SvgComponent ? (
                            <SvgComponent className="w-full h-24 md:h-28" />
                          ) : (
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg">
                              {f.title.charAt(0)}
                            </div>
                          )}
                        </div>

                        {/* Right side: formula info */}
                        <div className="md:w-[60%] p-4">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="text-sm font-extrabold text-slate-800 leading-snug">
                              {f.title}
                            </h4>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ${
                                PROB_CHIP[f.examProb]
                              }`}
                            >
                              {f.examProb}
                            </span>
                          </div>

                          {/* Formula block */}
                          <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 mb-2">
                            <p className="font-mono text-xs text-blue-800 font-bold whitespace-pre-wrap leading-relaxed">
                              {f.formula}
                            </p>
                          </div>

                          {/* Priority badge */}
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                              P{f.priority}
                            </span>
                            <span className="text-[10px] text-slate-400">{f.topic}</span>
                          </div>

                          {/* Expanded detail */}
                          {isExpanded && (
                            <div className="mt-3 space-y-2 animate-[fadeIn_0.2s_ease-in]">
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {f.detail}
                              </p>
                              {f.shortcut && (
                                <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                                  <p className="text-xs text-amber-700 italic">
                                    Shortcut: {f.shortcut}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {!isExpanded && (
                            <p className="text-[10px] text-blue-500 mt-1">
                              Click to expand details
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-4xl mb-2">🔍</p>
            <p className="font-medium">No formulas match your search. Try a different query.</p>
          </div>
        )}
      </div>
    </section>
  )
}
