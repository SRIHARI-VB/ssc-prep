import { useState, useContext } from 'react'
import { ComposableMap, Geographies, Geography, MapContext } from 'react-simple-maps'
import { riData } from '../data'

const INDIA_TOPO = '/india-topo.json'

/* ── Name mapping: TopoJSON NAME_1 → normalized ── */
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

/* ── Org HQ markers (world) ── */
interface OrgHQ {
  name: string
  city: string
  lat: number
  lng: number
  publishes: string
  color: string
}

const ORG_HQS: OrgHQ[] = [
  { name: 'UNDP', city: 'New York', lat: 40.75, lng: -73.97, publishes: 'HDI, MPI', color: 'bg-blue-500' },
  { name: 'WEF', city: 'Geneva', lat: 46.20, lng: 6.15, publishes: 'Gender Gap, GCI', color: 'bg-violet-500' },
  { name: 'Transparency Intl', city: 'Berlin', lat: 52.52, lng: 13.40, publishes: 'CPI', color: 'bg-orange-500' },
  { name: 'WIPO', city: 'Geneva', lat: 46.20, lng: 6.15, publishes: 'GII', color: 'bg-indigo-500' },
  { name: 'IEP', city: 'Sydney', lat: -33.87, lng: 151.21, publishes: 'GPI, GTI', color: 'bg-green-500' },
  { name: 'World Bank', city: 'Washington DC', lat: 38.90, lng: -77.04, publishes: 'EoDB, LPI, HCI', color: 'bg-yellow-500' },
  { name: 'IMF', city: 'Washington DC', lat: 38.90, lng: -77.04, publishes: 'WEO, GDP data', color: 'bg-amber-500' },
  { name: 'WHO', city: 'Geneva', lat: 46.20, lng: 6.15, publishes: 'Health Reports', color: 'bg-emerald-500' },
  { name: 'WTO', city: 'Geneva', lat: 46.20, lng: 6.15, publishes: 'Trade Reports', color: 'bg-teal-500' },
  { name: 'RSF', city: 'Paris', lat: 48.86, lng: 2.35, publishes: 'Press Freedom Index', color: 'bg-red-500' },
  { name: 'UNESCO', city: 'Paris', lat: 48.86, lng: 2.35, publishes: 'World Heritage, Education', color: 'bg-pink-500' },
  { name: 'FAO', city: 'Rome', lat: 41.90, lng: 12.50, publishes: 'SOFI, Food Reports', color: 'bg-lime-500' },
]

/* ── India-related institutions (for India map markers) ── */
interface IndiaMarker {
  name: string
  city: string
  lat: number
  lng: number
  detail: string
}

const INDIA_MARKERS: IndiaMarker[] = [
  { name: 'NITI Aayog', city: 'New Delhi', lat: 28.61, lng: 77.21, detail: 'SDG India Index, MPI (national)' },
  { name: 'NSO/CSO', city: 'New Delhi', lat: 28.63, lng: 77.22, detail: 'CPI, IIP, GDP data' },
  { name: 'RBI', city: 'Mumbai', lat: 19.08, lng: 72.88, detail: 'Inflation targeting (CPI 4%+/-2%)' },
  { name: 'BSE', city: 'Mumbai', lat: 18.93, lng: 72.83, detail: 'SENSEX (30 stocks), est. 1875' },
  { name: 'NSE', city: 'Mumbai', lat: 19.06, lng: 72.86, detail: 'NIFTY 50 (50 stocks), est. 1992' },
  { name: 'FSI', city: 'Dehradun', lat: 30.32, lng: 78.03, detail: 'India State of Forest Report (ISFR)' },
  { name: 'ISRO', city: 'Bengaluru', lat: 12.97, lng: 77.59, detail: 'Chandrayaan-3, Aditya-L1' },
]

/* ── Dot on India map using projection ── */
function IndiaDot({ lat, lng, label, detail }: { lat: number; lng: number; label: string; detail: string }) {
  const { projection } = useContext(MapContext)
  const coords = projection([lng, lat])
  if (!coords) return null
  const [x, y] = coords

  const [hovered, setHovered] = useState(false)

  return (
    <g onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <circle cx={x} cy={y} r={4} fill="#7c3aed" stroke="#fff" strokeWidth={1.5} className="cursor-pointer" />
      {hovered && (
        <foreignObject x={x + 8} y={y - 30} width={200} height={80}>
          <div className="bg-white rounded-lg shadow-lg border border-violet-200 p-2 text-xs">
            <p className="font-bold text-violet-800">{label}</p>
            <p className="text-slate-500 mt-0.5">{detail}</p>
          </div>
        </foreignObject>
      )}
    </g>
  )
}

export default function ReportsMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [selectedOrg, setSelectedOrg] = useState<OrgHQ | null>(null)

  // Group orgs by city for cleaner display
  const orgsByCity = ORG_HQS.reduce((acc, org) => {
    if (!acc[org.city]) acc[org.city] = []
    acc[org.city].push(org)
    return acc
  }, {} as Record<string, OrgHQ[]>)

  const mapEntries = riData.filter(e => e.lat && e.lng)

  return (
    <section id="ri-map" className="py-14 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8 text-center">
          <p className="text-xs font-bold tracking-widest text-violet-400 uppercase mb-1">Section 04</p>
          <h2 className="text-3xl font-extrabold text-white">Reports &amp; Indices Atlas</h2>
          <p className="mt-2 text-slate-400 text-sm max-w-2xl mx-auto">
            India map with key institutions. World organization HQs shown below.
          </p>
        </div>

        {/* India Map */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-4 mb-8">
          <h3 className="text-sm font-bold text-violet-300 mb-3">Indian Institutions &amp; Data Bodies</h3>
          <div className="max-w-lg mx-auto">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 900, center: [82, 22] }}
              width={500}
              height={500}
              style={{ width: '100%', height: 'auto' }}
            >
              <Geographies geography={INDIA_TOPO}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    const name = normalizeName(String(geo.properties.NAME_1 ?? geo.properties.name ?? ''))
                    const isHovered = hoveredState === name
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isHovered ? '#8b5cf6' : '#4c1d95'}
                        stroke="#7c3aed"
                        strokeWidth={0.5}
                        onMouseEnter={() => setHoveredState(name)}
                        onMouseLeave={() => setHoveredState(null)}
                        style={{
                          default: { outline: 'none' },
                          hover:   { outline: 'none', fill: '#8b5cf6', cursor: 'pointer' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    )
                  })
                }
              </Geographies>
              {INDIA_MARKERS.map(m => (
                <IndiaDot key={m.name} lat={m.lat} lng={m.lng} label={`${m.name} (${m.city})`} detail={m.detail} />
              ))}
            </ComposableMap>
          </div>
          {hoveredState && (
            <p className="text-center text-xs text-violet-300 mt-2 font-medium">{hoveredState}</p>
          )}
        </div>

        {/* World Org HQ Grid */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-5">
          <h3 className="text-sm font-bold text-violet-300 mb-4">International Organization HQs (World)</h3>

          {/* City-grouped layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(orgsByCity).map(([city, orgs]) => (
              <div key={city} className="bg-white/5 rounded-xl border border-white/10 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📍</span>
                  <h4 className="text-sm font-bold text-white">{city}</h4>
                </div>
                <div className="space-y-1.5">
                  {orgs.map(org => (
                    <button
                      key={org.name}
                      onClick={() => setSelectedOrg(selectedOrg?.name === org.name ? null : org)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                        selectedOrg?.name === org.name
                          ? 'bg-violet-600/40 border border-violet-400/50'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${org.color}`}></span>
                        <span className="font-bold text-white">{org.name}</span>
                      </span>
                      <span className="text-slate-400 ml-4 block">{org.publishes}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selectedOrg && (
            <div className="mt-4 bg-violet-900/40 rounded-xl border border-violet-500/30 p-4 animate-fade-slide">
              <p className="text-sm text-white">
                <strong className="text-violet-300">{selectedOrg.name}</strong> is headquartered in{' '}
                <strong className="text-violet-200">{selectedOrg.city}</strong>.
                It publishes: <span className="text-violet-300">{selectedOrg.publishes}</span>.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Coordinates: {selectedOrg.lat.toFixed(2)}N, {selectedOrg.lng.toFixed(2)}E
              </p>
            </div>
          )}
        </div>

        {/* Quick summary of map entries from data */}
        {mapEntries.length > 0 && (
          <div className="mt-6 bg-white/5 rounded-xl border border-white/10 p-4">
            <h4 className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">Data Entries with Locations</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {mapEntries.map(e => (
                <div key={e.id} className="bg-white/5 rounded-lg px-3 py-2">
                  <p className="text-xs font-bold text-white">{e.topic}</p>
                  <p className="text-[10px] text-slate-400">{e.place} ({e.lat?.toFixed(1)}, {e.lng?.toFixed(1)})</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
