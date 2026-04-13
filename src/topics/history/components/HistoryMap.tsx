import { useState, useMemo, memo, useContext } from 'react'
import { ComposableMap, Geographies, Geography, MapContext } from 'react-simple-maps'
import { historyData, type HistoryCategory } from '../data'

const INDIA_TOPO = '/india-topo.json'

const CAT_COLORS: Record<HistoryCategory, string> = {
  'Ancient India':     '#d97706',
  'Medieval India':    '#ea580c',
  'Modern India':      '#2563eb',
  'Freedom Struggle':  '#16a34a',
  'Reform Movements':  '#7c3aed',
  'Art & Culture':     '#db2777',
  'Battles & Wars':    '#dc2626',
}

const CAT_BADGE: Record<HistoryCategory, string> = {
  'Ancient India':     'bg-amber-100 text-amber-800',
  'Medieval India':    'bg-orange-100 text-orange-800',
  'Modern India':      'bg-blue-100 text-blue-800',
  'Freedom Struggle':  'bg-green-100 text-green-800',
  'Reform Movements':  'bg-violet-100 text-violet-800',
  'Art & Culture':     'bg-pink-100 text-pink-800',
  'Battles & Wars':    'bg-red-100 text-red-800',
}

const ALL_CATS: HistoryCategory[] = [
  'Ancient India', 'Medieval India', 'Modern India',
  'Freedom Struggle', 'Reform Movements', 'Art & Culture', 'Battles & Wars',
]

const IndiaBg = memo(function IndiaBg() {
  return (
    <Geographies geography={INDIA_TOPO}>
      {({ geographies }) =>
        geographies.map(geo => (
          <Geography
            key={geo.rsmKey}
            geography={geo}
            fill="#f1f5f9"
            stroke="#cbd5e1"
            strokeWidth={0.5}
            style={{ default: { outline: 'none' }, hover: { outline: 'none', fill: '#e2e8f0' }, pressed: { outline: 'none' } }}
          />
        ))
      }
    </Geographies>
  )
})

interface MarkerEntry {
  id: number
  category: HistoryCategory
  lat: number
  lng: number
  place?: string
  year?: number
}

function MapMarkers({ entries, selected, onSelect }: {
  entries: MarkerEntry[]
  selected: number | null
  onSelect: (id: number | null) => void
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { projection } = useContext(MapContext) as any

  return (
    <g>
      {entries.map(e => {
        const coords = projection([e.lng, e.lat])
        if (!coords) return null
        const [x, y] = coords
        const isSel = selected === e.id
        return (
          <g key={e.id} onClick={() => onSelect(isSel ? null : e.id)} style={{ cursor: 'pointer' }}>
            {isSel && (
              <circle cx={x} cy={y} r={12} fill="none" stroke={CAT_COLORS[e.category]} strokeWidth={1.5} opacity={0.4} />
            )}
            <circle
              cx={x} cy={y}
              r={isSel ? 7 : 5}
              fill={CAT_COLORS[e.category]}
              stroke="#fff"
              strokeWidth={isSel ? 2.5 : 1.5}
              opacity={isSel ? 1 : 0.85}
            />
          </g>
        )
      })}
    </g>
  )
}

export default function HistoryMap() {
  const [filterCat, setFilterCat] = useState<'all' | HistoryCategory>('all')
  const [selected, setSelected] = useState<number | null>(null)

  const mapEntries = useMemo(() =>
    historyData.filter(e => !e.questionType && e.lat != null && e.lng != null),
    []
  )

  const filtered = useMemo(() =>
    filterCat === 'all' ? mapEntries : mapEntries.filter(e => e.category === filterCat),
    [mapEntries, filterCat]
  )

  const selectedEntry = useMemo(() =>
    filtered.find(e => e.id === selected) ?? null,
    [filtered, selected]
  )

  return (
    <section id="hist-map" className="py-14 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-6">
          <p className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-1">Section 06 -- Historical Atlas</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Events on the Map</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            Important historical events plotted on India's map. Click any marker to see details.
            Color-coded by era/category.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => { setFilterCat('all'); setSelected(null) }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
              filterCat === 'all' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400'
            }`}>
            All ({mapEntries.length})
          </button>
          {ALL_CATS.map(c => {
            const count = mapEntries.filter(e => e.category === c).length
            if (!count) return null
            return (
              <button key={c} onClick={() => { setFilterCat(c); setSelected(null) }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  filterCat === c ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400'
                }`}>
                {c} ({count})
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-4">
          {ALL_CATS.map(c => (
            <span key={c} className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CAT_COLORS[c] }}></span>
              {c}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 1000, center: [82, 22] }}
              width={700}
              height={700}
              style={{ width: '100%', height: 'auto' }}
            >
              <IndiaBg />
              <MapMarkers
                entries={filtered as MarkerEntry[]}
                selected={selected}
                onSelect={setSelected}
              />
            </ComposableMap>
          </div>

          {/* Details panel */}
          <div className="space-y-3">
            {selectedEntry ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 animate-fade-slide">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CAT_BADGE[selectedEntry.category]}`}>
                    {selectedEntry.category}
                  </span>
                  {selectedEntry.year && (
                    <span className="text-xs text-slate-400 font-mono">
                      {selectedEntry.year < 0 ? `${Math.abs(selectedEntry.year)} BCE` : `${selectedEntry.year} CE`}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-extrabold text-slate-800 mb-2">{selectedEntry.question}</h3>
                <p className="text-sm font-bold text-amber-700 mb-2">{selectedEntry.answer}</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">{selectedEntry.detail}</p>
                {selectedEntry.shortcut && (
                  <div className="bg-amber-50 rounded-lg px-3 py-2 border border-amber-200 mb-2">
                    <p className="font-mnemonic text-xs text-amber-700 italic">"{selectedEntry.shortcut}"</p>
                  </div>
                )}
                <p className="text-xs text-slate-400">📍 {selectedEntry.place}</p>
                <p className="text-xs text-slate-400 mt-1">{selectedEntry.context}</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                <span className="text-4xl block mb-3">📍</span>
                <p className="text-sm text-slate-500 font-medium">Click a marker on the map to see event details</p>
                <p className="text-xs text-slate-400 mt-1">{filtered.length} events plotted</p>
              </div>
            )}

            {/* Event list */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-h-[400px] overflow-y-auto">
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">All Mapped Events ({filtered.length})</p>
              </div>
              <div className="divide-y divide-slate-100">
                {filtered.map(e => (
                  <button
                    key={e.id}
                    onClick={() => setSelected(e.id)}
                    className={`w-full text-left px-4 py-2.5 text-xs hover:bg-slate-50 transition-colors ${
                      selected === e.id ? 'bg-amber-50' : ''
                    }`}>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: CAT_COLORS[e.category] }}></span>
                      <span className="font-mono text-slate-400 shrink-0 w-16">
                        {e.year! < 0 ? `${Math.abs(e.year!)} BCE` : `${e.year} CE`}
                      </span>
                      <span className="text-slate-700 font-medium truncate">{e.place}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
