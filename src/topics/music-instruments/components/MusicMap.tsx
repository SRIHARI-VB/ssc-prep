import { useState, useContext, memo } from 'react'
import { ComposableMap, Geographies, Geography, MapContext } from 'react-simple-maps'
import { miData, type MIEntry } from '../data'

const INDIA_TOPO = '/india-topo.json'

/* Markers: entries that have lat/lng */
const MARKERS = miData.filter(e => e.lat !== undefined && e.lng !== undefined)

const CATEGORY_DOT: Record<string, string> = {
  'String Instruments (Tata)':             '#f43f5e',
  'Wind Instruments (Sushira)':            '#f97316',
  'Percussion - Membranous (Avanaddha)':   '#8b5cf6',
  'Percussion - Solid (Ghana)':            '#22c55e',
  'Hindustani Classical':                  '#3b82f6',
  'Carnatic Classical':                    '#ec4899',
  'Famous Musicians & Awards':             '#eab308',
  'Current Affairs & Awards':              '#ef4444',
}

function MarkerLayer({ selected, onSelect }: { selected: MIEntry | null; onSelect: (e: MIEntry | null) => void }) {
  const { projection } = useContext(MapContext)

  return (
    <g>
      {MARKERS.map(entry => {
        const coords = projection([entry.lng!, entry.lat!])
        if (!coords) return null
        const [x, y] = coords
        const isSelected = selected?.id === entry.id
        const fill = CATEGORY_DOT[entry.category] ?? '#f43f5e'
        return (
          <g key={entry.id} style={{ cursor: 'pointer' }} onClick={() => onSelect(isSelected ? null : entry)}>
            {isSelected && <circle cx={x} cy={y} r={10} fill={fill} opacity={0.2} />}
            <circle cx={x} cy={y} r={isSelected ? 6 : 4} fill={fill} stroke="#fff" strokeWidth={1.5} />
          </g>
        )
      })}
    </g>
  )
}

const MemoGeographies = memo(function MemoGeo() {
  return (
    <Geographies geography={INDIA_TOPO}>
      {({ geographies }) =>
        geographies.map(geo => (
          <Geography
            key={geo.rsmKey}
            geography={geo}
            fill="#fce7f3"
            stroke="#f9a8d4"
            strokeWidth={0.5}
            style={{
              default: { outline: 'none' },
              hover:   { fill: '#fbcfe8', outline: 'none' },
              pressed: { outline: 'none' },
            }}
          />
        ))
      }
    </Geographies>
  )
})

export default function MusicMap() {
  const [selected, setSelected] = useState<MIEntry | null>(null)

  return (
    <section id="mi-map" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-rose-600 uppercase mb-1">Section 04</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Music &amp; Instruments Map</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            Explore instrument origins and musician associations across India. Click a marker to see details.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.entries(CATEGORY_DOT).map(([cat, color]) => (
            <span key={cat} className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: color }}></span>
              {cat.split('(')[0].trim()}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 bg-slate-50 rounded-2xl border border-slate-200 p-2">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 1000, center: [82, 22] }}
              width={700}
              height={700}
              style={{ width: '100%', height: 'auto' }}
            >
              <MemoGeographies />
              <MarkerLayer selected={selected} onSelect={setSelected} />
            </ComposableMap>
          </div>

          {/* Info panel */}
          <div className="space-y-4">
            {selected ? (
              <div className="bg-rose-50 rounded-2xl border border-rose-200 p-5 animate-fade-slide">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_DOT[selected.category] }}></span>
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">{selected.category}</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-800 mb-1">{selected.topic}</h3>
                {selected.place && <p className="text-xs text-slate-500 mb-2">Origin: {selected.place}</p>}
                <p className="text-sm text-slate-700 leading-relaxed mb-3">{selected.question}</p>
                <p className="text-sm font-bold text-rose-700 mb-2">{selected.answer}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{selected.detail}</p>
                {selected.shortcut && (
                  <div className="mt-3 bg-white rounded-xl px-4 py-2 border border-rose-200">
                    <p className="font-mnemonic text-xs text-rose-700 italic">{selected.shortcut}</p>
                  </div>
                )}
                <button
                  onClick={() => setSelected(null)}
                  className="mt-4 text-xs font-bold text-rose-600 hover:text-rose-800 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                <p className="text-sm text-slate-500">Click a marker on the map to see instrument/musician details.</p>
                <p className="text-xs text-slate-400 mt-2">{MARKERS.length} locations plotted across India.</p>
              </div>
            )}

            {/* Quick list */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 max-h-[400px] overflow-y-auto">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">All Locations</h4>
              <div className="space-y-2">
                {MARKERS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSelected(m)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                      selected?.id === m.id
                        ? 'bg-rose-100 border border-rose-300'
                        : 'bg-slate-50 border border-slate-100 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-bold text-slate-700">{m.topic}</span>
                    {m.place && <span className="text-slate-400 ml-1">- {m.place}</span>}
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
