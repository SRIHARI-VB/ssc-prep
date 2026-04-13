import { useState, useContext, memo } from 'react'
import { ComposableMap, Geographies, Geography, MapContext } from 'react-simple-maps'
import { danceData, type DanceCategory } from '../data'

const INDIA_TOPO = '/india-topo.json'

const NAME_MAP: Record<string, string> = {
  'Orissa': 'Odisha',
  'Uttaranchal': 'Uttarakhand',
  'Jammu and Kashmir': 'Jammu & Kashmir',
  'Andaman and Nicobar': 'Andaman & Nicobar',
  'Dadra and Nagar Haveli': 'Dadra & Nagar Haveli',
  'Daman and Diu': 'Daman & Diu',
}

function normalizeName(name: string): string {
  return NAME_MAP[name] ?? name
}

type FilterMode = 'all' | 'classical' | 'folk' | 'tribal' | 'unesco'

interface MarkerData {
  id: number
  name: string
  lat: number
  lng: number
  category: DanceCategory
  place: string
}

function getMarkers(mode: FilterMode): MarkerData[] {
  const seen = new Set<string>()
  return danceData
    .filter(e => {
      if (!e.lat || !e.lng) return false
      if (mode === 'classical') return ['Bharatanatyam','Kathak','Kathakali','Odissi','Kuchipudi','Manipuri','Mohiniyattam','Sattriya'].includes(e.category)
      if (mode === 'folk') return e.category.startsWith('Folk Dances')
      if (mode === 'tribal') return e.category === 'Tribal Dances'
      if (mode === 'unesco') return e.category === 'UNESCO & Awards'
      return true
    })
    .filter(e => {
      const key = `${e.lat}-${e.lng}-${e.category}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .map(e => ({
      id: e.id,
      name: e.topic.split(' - ').pop() || e.topic,
      lat: e.lat!,
      lng: e.lng!,
      category: e.category,
      place: e.place || '',
    }))
}

const CATEGORY_COLOR: Record<string, string> = {
  'Bharatanatyam':        '#ec4899',
  'Kathak':               '#a855f7',
  'Kathakali':            '#22c55e',
  'Odissi':               '#3b82f6',
  'Kuchipudi':            '#f97316',
  'Manipuri':             '#06b6d4',
  'Mohiniyattam':         '#f472b6',
  'Sattriya':             '#84cc16',
  'Folk Dances - North':  '#eab308',
  'Folk Dances - South':  '#ef4444',
  'Folk Dances - East':   '#6366f1',
  'Folk Dances - West':   '#0ea5e9',
  'Tribal Dances':        '#8b5cf6',
  'UNESCO & Awards':      '#d946ef',
}

function MarkerDots({ markers, selected, setSelected }: { markers: MarkerData[]; selected: MarkerData | null; setSelected: (m: MarkerData | null) => void }) {
  const { projection } = useContext(MapContext)

  return (
    <g>
      {markers.map(m => {
        const coords = projection([m.lng, m.lat])
        if (!coords) return null
        const [x, y] = coords
        const isSelected = selected?.id === m.id
        const color = CATEGORY_COLOR[m.category] || '#d946ef'

        return (
          <g key={`${m.id}-${m.lat}-${m.lng}`}
            onClick={(e) => { e.stopPropagation(); setSelected(isSelected ? null : m) }}
            style={{ cursor: 'pointer' }}
          >
            <circle cx={x} cy={y} r={isSelected ? 6 : 4}
              fill={color} stroke="#fff" strokeWidth={1.5}
              opacity={0.9}
            />
            {isSelected && (
              <>
                <circle cx={x} cy={y} r={10} fill="none" stroke={color} strokeWidth={1.5} opacity={0.5} />
                <rect x={x + 8} y={y - 12} width={Math.max(m.name.length * 5.5, 60)} height={18}
                  rx={4} fill="white" stroke={color} strokeWidth={1} opacity={0.95}
                />
                <text x={x + 12} y={y - 0} fontSize={9} fontWeight="bold" fill={color}>
                  {m.name}
                </text>
              </>
            )}
          </g>
        )
      })}
    </g>
  )
}

const IndiaSVG = memo(function IndiaSVG({ markers, selected, setSelected }: { markers: MarkerData[]; selected: MarkerData | null; setSelected: (m: MarkerData | null) => void }) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 1000, center: [83, 23] }}
      width={500} height={550}
      style={{ width: '100%', height: 'auto' }}
    >
      <Geographies geography={INDIA_TOPO}>
        {({ geographies }) =>
          geographies.map(geo => {
            const stateName = normalizeName(String(geo.properties.NAME_1 ?? geo.properties.name ?? ''))
            const isHovered = hovered === stateName
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => setHovered(stateName)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  default: { fill: isHovered ? '#f0abfc' : '#fce7f3', stroke: '#d946ef', strokeWidth: 0.5, outline: 'none' },
                  hover:   { fill: '#f0abfc', stroke: '#a21caf', strokeWidth: 0.8, outline: 'none', cursor: 'pointer' },
                  pressed: { fill: '#e879f9', stroke: '#a21caf', strokeWidth: 0.8, outline: 'none' },
                }}
              />
            )
          })
        }
      </Geographies>
      <MarkerDots markers={markers} selected={selected} setSelected={setSelected} />
    </ComposableMap>
  )
})

const FILTER_MODES: { key: FilterMode; label: string; icon: string }[] = [
  { key: 'all',       label: 'All Dances',       icon: '🗺️' },
  { key: 'classical', label: 'Classical (8)',     icon: '💃' },
  { key: 'folk',      label: 'Folk Dances',      icon: '🥁' },
  { key: 'tribal',    label: 'Tribal',           icon: '🏹' },
  { key: 'unesco',    label: 'UNESCO Heritage',  icon: '🏆' },
]

export default function DanceMap() {
  const [mode, setMode] = useState<FilterMode>('all')
  const [selected, setSelected] = useState<MarkerData | null>(null)

  const markers = getMarkers(mode)

  return (
    <section id="dn-map" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-fuchsia-600 uppercase mb-1">Section 04</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Dance Origins Map</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            Interactive map showing where each dance form originates. Click markers to see details.
          </p>
        </div>

        {/* Mode tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTER_MODES.map(f => (
            <button key={f.key} onClick={() => { setMode(f.key); setSelected(null) }}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                mode === f.key
                  ? 'bg-fuchsia-600 text-white border-fuchsia-600 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-fuchsia-400'
              }`}>
              {f.icon} {f.label} ({getMarkers(f.key).length})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 bg-slate-50 rounded-2xl border border-slate-200 p-4 overflow-hidden">
            <IndiaSVG markers={markers} selected={selected} setSelected={setSelected} />
          </div>

          {/* Info panel */}
          <div className="space-y-4">
            {selected ? (
              <div className="bg-fuchsia-50 rounded-2xl border border-fuchsia-200 p-5">
                <h3 className="text-lg font-extrabold text-fuchsia-800 mb-2">{selected.name}</h3>
                <p className="text-sm text-slate-600 mb-1"><strong>Category:</strong> {selected.category}</p>
                <p className="text-sm text-slate-600 mb-1"><strong>Place:</strong> {selected.place}</p>
                <p className="text-sm text-slate-600"><strong>Coordinates:</strong> {selected.lat.toFixed(2)}N, {selected.lng.toFixed(2)}E</p>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-center">
                <p className="text-sm text-slate-400">Click a marker on the map to see dance details</p>
              </div>
            )}

            {/* Legend */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Color Legend</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(CATEGORY_COLOR).map(([cat, color]) => (
                  <div key={cat} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }}></span>
                    <span className="text-xs text-slate-600 truncate">{cat.replace('Folk Dances - ', '')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Marker list */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 max-h-64 overflow-y-auto">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                {markers.length} markers shown
              </h4>
              <div className="space-y-1.5">
                {markers.map(m => (
                  <button key={`${m.id}-${m.lat}`}
                    onClick={() => setSelected(m)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all ${
                      selected?.id === m.id ? 'bg-fuchsia-100 text-fuchsia-800 font-bold' : 'hover:bg-slate-50 text-slate-600'
                    }`}>
                    <span className="w-2 h-2 rounded-full inline-block mr-2" style={{ backgroundColor: CATEGORY_COLOR[m.category] }}></span>
                    {m.name} — {m.place}
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
