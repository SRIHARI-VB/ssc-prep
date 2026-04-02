import { useState, memo } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

/* ── Types ── */
type AtlasMode = 'soil' | 'crops' | 'minerals' | 'rivers' | 'parks' | 'industry'

interface StateInfo {
  name: string
  abbr: string
  soil: string
  crops: string
  minerals: string
  rivers: string
  parks: string
  industry: string
}

/* ── TopoJSON path (simplified India states) ── */
const INDIA_TOPO = '/india-topo.json'

/* ── Name mapping: TopoJSON NAME_1 → our state key ── */
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

/* ── State data ── */
const STATES: Record<string, StateInfo> = {
  'Jammu & Kashmir': { name: 'Jammu & Kashmir', abbr: 'JK', soil: 'Mountain/Forest', crops: 'Saffron, Apple, Walnut', minerals: 'Limestone, Gypsum', rivers: 'Jhelum, Chenab, Indus', parks: 'Dachigam, Hemis', industry: 'Handicrafts, Tourism' },
  'Himachal Pradesh': { name: 'Himachal Pradesh', abbr: 'HP', soil: 'Mountain/Forest', crops: 'Apple, Tea, Barley', minerals: 'Rock Salt, Slate', rivers: 'Beas, Ravi, Sutlej', parks: 'Great Himalayan NP', industry: 'Tourism, Hydel Power' },
  'Punjab': { name: 'Punjab', abbr: 'PB', soil: 'Alluvial', crops: 'Wheat, Rice, Cotton', minerals: 'Limestone', rivers: 'Sutlej, Beas, Ravi', parks: 'Harike Wetland', industry: 'Agri-Processing, Textiles' },
  'Uttarakhand': { name: 'Uttarakhand', abbr: 'UK', soil: 'Forest/Alluvial', crops: 'Basmati Rice, Litchi', minerals: 'Limestone, Dolomite', rivers: 'Ganga, Yamuna, Alaknanda', parks: 'Jim Corbett, Valley of Flowers', industry: 'Tourism, IT (Dehradun)' },
  'Haryana': { name: 'Haryana', abbr: 'HR', soil: 'Alluvial/Sandy', crops: 'Wheat, Rice, Mustard', minerals: 'Limestone', rivers: 'Yamuna, Ghaggar', parks: 'Sultanpur NP', industry: 'Auto (Gurugram), IT' },
  'Delhi': { name: 'Delhi', abbr: 'DL', soil: 'Alluvial', crops: 'Urban', minerals: '-', rivers: 'Yamuna', parks: '-', industry: 'Services, IT, Govt' },
  'Chandigarh': { name: 'Chandigarh', abbr: 'CH', soil: 'Alluvial', crops: 'Urban', minerals: '-', rivers: 'Ghaggar', parks: '-', industry: 'Services, IT' },
  'Rajasthan': { name: 'Rajasthan', abbr: 'RJ', soil: 'Desert/Sandy/Alluvial', crops: 'Bajra, Mustard, Jowar', minerals: 'Marble, Zinc, Copper, Mica', rivers: 'Luni, Chambal, Banas', parks: 'Ranthambore, Keoladeo, Sariska', industry: 'Textiles, Marble, Tourism' },
  'Uttar Pradesh': { name: 'Uttar Pradesh', abbr: 'UP', soil: 'Alluvial', crops: 'Sugarcane, Wheat, Rice, Potato', minerals: 'Limestone, Dolomite', rivers: 'Ganga, Yamuna, Gomti, Ghaghara', parks: 'Dudhwa NP', industry: 'Agri-Processing, Leather (Kanpur)' },
  'Bihar': { name: 'Bihar', abbr: 'BR', soil: 'Alluvial', crops: 'Rice, Wheat, Maize, Litchi', minerals: 'Mica, Limestone', rivers: 'Ganga, Gandak, Kosi, Son', parks: 'Valmiki NP', industry: 'Agri-Processing' },
  'Gujarat': { name: 'Gujarat', abbr: 'GJ', soil: 'Black/Alluvial/Sandy', crops: 'Cotton, Groundnut, Tobacco', minerals: 'Petroleum, Natural Gas, Bauxite', rivers: 'Narmada, Tapi, Sabarmati, Mahi', parks: 'Gir (Asiatic Lion), Marine NP', industry: 'Petrochemical, Diamond, Textiles' },
  'Madhya Pradesh': { name: 'Madhya Pradesh', abbr: 'MP', soil: 'Black/Red/Alluvial', crops: 'Soybean, Wheat, Pulses', minerals: 'Diamond, Manganese, Coal, Iron', rivers: 'Narmada, Chambal, Betwa, Son', parks: 'Kanha, Bandhavgarh, Panna', industry: 'Cement, Textiles' },
  'Jharkhand': { name: 'Jharkhand', abbr: 'JH', soil: 'Red/Laterite', crops: 'Rice, Maize', minerals: 'Coal, Iron Ore, Mica, Copper, Uranium', rivers: 'Damodar, Subarnarekha', parks: 'Betla NP', industry: 'Steel (Jamshedpur), Coal Mining' },
  'West Bengal': { name: 'West Bengal', abbr: 'WB', soil: 'Alluvial/Laterite', crops: 'Rice, Jute, Tea', minerals: 'Coal, Dolomite', rivers: 'Ganga (Hooghly), Teesta, Damodar', parks: 'Sundarbans (Tiger)', industry: 'Jute, Steel (Durgapur), IT' },
  'Maharashtra': { name: 'Maharashtra', abbr: 'MH', soil: 'Black (Regur)/Laterite', crops: 'Sugarcane, Cotton, Jowar, Grapes', minerals: 'Manganese, Bauxite, Coal', rivers: 'Godavari, Krishna, Tapi, Bhima', parks: 'Tadoba, Sanjay Gandhi NP', industry: 'Auto, IT (Pune), Finance (Mumbai)' },
  'Chhattisgarh': { name: 'Chhattisgarh', abbr: 'CG', soil: 'Red/Laterite', crops: 'Rice (Rice Bowl of India)', minerals: 'Iron Ore, Coal, Tin, Bauxite', rivers: 'Mahanadi, Indravati', parks: 'Indravati NP, Kanger Valley', industry: 'Steel (Bhilai), Cement' },
  'Odisha': { name: 'Odisha', abbr: 'OD', soil: 'Red/Laterite/Alluvial', crops: 'Rice, Pulses, Oilseeds', minerals: 'Iron Ore, Chromite, Bauxite, Manganese', rivers: 'Mahanadi, Brahmani, Baitarani', parks: 'Similipal, Bhitarkanika, Chilika', industry: 'Steel, Aluminium, Ports' },
  'Goa': { name: 'Goa', abbr: 'GA', soil: 'Laterite', crops: 'Rice, Coconut, Cashew', minerals: 'Iron Ore, Manganese', rivers: 'Mandovi, Zuari', parks: 'Bhagwan Mahavir NP', industry: 'Tourism, Mining, Fisheries' },
  'Karnataka': { name: 'Karnataka', abbr: 'KA', soil: 'Red/Laterite/Black', crops: 'Coffee, Ragi, Sugarcane, Sandalwood', minerals: 'Iron Ore, Gold (KGF), Manganese', rivers: 'Krishna, Cauvery, Tungabhadra', parks: 'Bandipur, Nagarhole, Bannerghatta', industry: 'IT (Bengaluru), Biotech, Silk' },
  'Telangana': { name: 'Telangana', abbr: 'TS', soil: 'Black/Red', crops: 'Cotton, Rice, Turmeric', minerals: 'Coal, Limestone, Mica', rivers: 'Godavari, Krishna, Musi', parks: 'Kawal WS, Mrugavani', industry: 'IT (Hyderabad), Pharma' },
  'Andhra Pradesh': { name: 'Andhra Pradesh', abbr: 'AP', soil: 'Black/Red/Alluvial', crops: 'Rice, Chilli, Tobacco, Mango', minerals: 'Limestone, Barytes, Mica', rivers: 'Godavari, Krishna, Pennar', parks: 'Sri Venkateswara NP', industry: 'Pharma, Ports (Vizag), Aquaculture' },
  'Kerala': { name: 'Kerala', abbr: 'KL', soil: 'Laterite/Forest', crops: 'Rubber, Coconut, Pepper, Cardamom, Tea', minerals: 'Monazite (Thorium), Ilmenite', rivers: 'Periyar, Bharathapuzha', parks: 'Periyar, Eravikulam, Silent Valley', industry: 'Tourism, Spices, Coir' },
  'Tamil Nadu': { name: 'Tamil Nadu', abbr: 'TN', soil: 'Red/Black/Alluvial/Laterite', crops: 'Rice, Sugarcane, Cotton, Banana', minerals: 'Lignite (Neyveli), Limestone, Granite', rivers: 'Cauvery, Vaigai, Palar', parks: 'Mudumalai, Gulf of Mannar', industry: 'Auto (Chennai), Textiles, IT' },
  'Sikkim': { name: 'Sikkim', abbr: 'SK', soil: 'Mountain/Forest', crops: 'Cardamom, Tea, Rice', minerals: 'Copper, Lead, Zinc', rivers: 'Teesta, Rangit', parks: 'Khangchendzonga NP', industry: 'Tourism, Organic Farming' },
  'Assam': { name: 'Assam', abbr: 'AS', soil: 'Alluvial', crops: 'Tea (#1 producer), Rice, Jute', minerals: 'Petroleum (Digboi), Coal, Limestone', rivers: 'Brahmaputra, Barak', parks: 'Kaziranga (Rhino), Manas', industry: 'Tea, Oil Refinery' },
  'Arunachal Pradesh': { name: 'Arunachal Pradesh', abbr: 'AR', soil: 'Mountain/Forest', crops: 'Rice, Maize, Orange', minerals: 'Petroleum, Dolomite', rivers: 'Brahmaputra (Dihang), Lohit, Subansiri', parks: 'Namdapha NP', industry: 'Hydropower, Forestry' },
  'Meghalaya': { name: 'Meghalaya', abbr: 'ML', soil: 'Laterite/Forest', crops: 'Rice, Potato, Orange', minerals: 'Coal, Limestone, Sillimanite', rivers: 'Shillong, Umiam', parks: 'Nokrek, Balpakram', industry: 'Mining, Cement' },
  'Nagaland': { name: 'Nagaland', abbr: 'NL', soil: 'Mountain/Forest', crops: 'Rice, Maize, Sugarcane', minerals: 'Petroleum, Chromite', rivers: 'Doyang, Dhansiri', parks: 'Intanki NP', industry: 'Handicrafts, Forestry' },
  'Manipur': { name: 'Manipur', abbr: 'MN', soil: 'Mountain/Red', crops: 'Rice, Maize, Fruits', minerals: 'Limestone, Chromite', rivers: 'Barak, Imphal', parks: 'Keibul Lamjao (Sangai Deer)', industry: 'Handloom, Handicrafts' },
  'Mizoram': { name: 'Mizoram', abbr: 'MZ', soil: 'Mountain/Laterite', crops: 'Rice, Maize, Ginger', minerals: 'Coal, Limestone', rivers: 'Tlawng, Tuirial', parks: 'Murlen NP, Phawngpui', industry: 'Bamboo, Handloom' },
  'Tripura': { name: 'Tripura', abbr: 'TR', soil: 'Red/Laterite', crops: 'Rice, Rubber, Tea, Pineapple', minerals: 'Natural Gas', rivers: 'Gomati, Manu', parks: 'Sepahijala WS', industry: 'Rubber, Tea' },
  'Andaman & Nicobar': { name: 'Andaman & Nicobar', abbr: 'AN', soil: 'Forest/Coastal', crops: 'Coconut, Arecanut', minerals: '-', rivers: '-', parks: 'Mahatma Gandhi Marine NP', industry: 'Tourism, Fisheries' },
  'Lakshadweep': { name: 'Lakshadweep', abbr: 'LD', soil: 'Coral/Sandy', crops: 'Coconut, Tuna', minerals: '-', rivers: '-', parks: 'Pitti Island WS', industry: 'Fisheries, Tourism' },
  'Puducherry': { name: 'Puducherry', abbr: 'PY', soil: 'Alluvial/Coastal', crops: 'Rice, Sugarcane', minerals: 'Lignite', rivers: 'Gingee', parks: '-', industry: 'Tourism, Textiles' },
  'Dadra & Nagar Haveli': { name: 'Dadra & Nagar Haveli', abbr: 'DN', soil: 'Alluvial', crops: 'Rice, Ragi', minerals: '-', rivers: 'Daman Ganga', parks: '-', industry: 'Manufacturing' },
  'Daman & Diu': { name: 'Daman & Diu', abbr: 'DD', soil: 'Alluvial/Coastal', crops: 'Rice, Wheat', minerals: '-', rivers: '-', parks: '-', industry: 'Tourism, Fisheries' },
}

/* ── Color functions for SVG fill ── */
function getSoilFill(soil: string): string {
  if (soil.includes('Alluvial') && !soil.includes('Red') && !soil.includes('Black')) return '#86efac'
  if (soil.includes('Black')) return '#374151'
  if (soil.includes('Red') || soil.includes('Laterite')) return '#fca5a5'
  if (soil.includes('Desert') || soil.includes('Sandy') || soil.includes('Arid')) return '#fde68a'
  if (soil.includes('Mountain') || soil.includes('Forest')) return '#6ee7b7'
  return '#e2e8f0'
}

function getCropFill(crop: string): string {
  if (crop.includes('Tea') || crop.includes('Coffee') || crop.includes('Rubber')) return '#4ade80'
  if (crop.includes('Rice') && !crop.includes('Wheat')) return '#86efac'
  if (crop.includes('Wheat')) return '#fde68a'
  if (crop.includes('Cotton')) return '#bae6fd'
  if (crop.includes('Pepper') || crop.includes('Spice') || crop.includes('Saffron') || crop.includes('Cardamom')) return '#fdba74'
  return '#d9f99d'
}

function getMineralFill(mineral: string): string {
  if (mineral === '-') return '#f1f5f9'
  if (mineral.includes('Iron') || mineral.includes('Steel')) return '#a8a29e'
  if (mineral.includes('Coal')) return '#4b5563'
  if (mineral.includes('Petroleum') || mineral.includes('Gas')) return '#93c5fd'
  if (mineral.includes('Mica') || mineral.includes('Bauxite')) return '#c4b5fd'
  if (mineral.includes('Gold') || mineral.includes('Diamond') || mineral.includes('Uranium') || mineral.includes('Thorium') || mineral.includes('Monazite')) return '#f9a8d4'
  return '#fed7aa'
}

function getRiverFill(river: string): string {
  if (river === '-') return '#f1f5f9'
  if (river.includes('Ganga') || river.includes('Yamuna') || river.includes('Gomti') || river.includes('Ghaghara') || river.includes('Gandak') || river.includes('Kosi') || river.includes('Son') || river.includes('Hooghly')) return '#93c5fd'
  if (river.includes('Indus') || river.includes('Jhelum') || river.includes('Chenab') || river.includes('Ravi') || river.includes('Beas') || river.includes('Sutlej')) return '#67e8f9'
  if (river.includes('Brahmaputra') || river.includes('Teesta') || river.includes('Barak') || river.includes('Lohit') || river.includes('Subansiri') || river.includes('Dihang')) return '#c4b5fd'
  if (river.includes('Narmada') || river.includes('Tapi') || river.includes('Sabarmati') || river.includes('Mahi') || river.includes('Luni')) return '#fdba74'
  return '#86efac'
}

function getParkFill(park: string): string {
  if (park === '-') return '#f1f5f9'
  if (park.includes('Tiger') || park.includes('Corbett') || park.includes('Ranthambore') || park.includes('Kanha') || park.includes('Bandhavgarh') || park.includes('Bandipur') || park.includes('Sundarbans') || park.includes('Tadoba')) return '#fdba74'
  if (park.includes('Rhino') || park.includes('Kaziranga')) return '#fde68a'
  if (park.includes('Lion') || park.includes('Gir')) return '#fef08a'
  if (park.includes('Marine') || park.includes('Mannar') || park.includes('Chilika')) return '#93c5fd'
  return '#86efac'
}

function getIndustryFill(industry: string): string {
  if (industry.includes('IT') || industry.includes('Services')) return '#c4b5fd'
  if (industry.includes('Steel') || industry.includes('Mining') || industry.includes('Aluminium')) return '#a8a29e'
  if (industry.includes('Auto')) return '#fca5a5'
  if (industry.includes('Textiles') || industry.includes('Silk') || industry.includes('Jute') || industry.includes('Handloom')) return '#f9a8d4'
  if (industry.includes('Port') || industry.includes('Shipping') || industry.includes('Fisheries')) return '#67e8f9'
  return '#d8b4fe'
}

function getFillForMode(mode: AtlasMode, state: StateInfo): string {
  switch (mode) {
    case 'soil': return getSoilFill(state.soil)
    case 'crops': return getCropFill(state.crops)
    case 'minerals': return getMineralFill(state.minerals)
    case 'rivers': return getRiverFill(state.rivers)
    case 'parks': return getParkFill(state.parks)
    case 'industry': return getIndustryFill(state.industry)
  }
}

/* ── Mode config ── */
interface ModeConfig {
  key: AtlasMode; label: string; icon: string
  description: string; gradient: string
  legendColors: { label: string; color: string }[]
}

const MODES: ModeConfig[] = [
  {
    key: 'soil', label: 'Soil Types', icon: '🏜️',
    description: 'Major soil types across Indian states — Alluvial, Black (Regur), Red, Laterite, Desert, Mountain/Forest',
    gradient: 'from-amber-500 to-yellow-600',
    legendColors: [
      { label: 'Alluvial', color: '#86efac' },
      { label: 'Black (Regur)', color: '#374151' },
      { label: 'Red/Laterite', color: '#fca5a5' },
      { label: 'Desert/Sandy', color: '#fde68a' },
      { label: 'Mountain/Forest', color: '#6ee7b7' },
    ],
  },
  {
    key: 'crops', label: 'Major Crops', icon: '🌾',
    description: 'State-wise crop production — Rice belt, Wheat belt, Cotton belt, Plantation crops, Cash crops',
    gradient: 'from-lime-500 to-green-600',
    legendColors: [
      { label: 'Rice Belt', color: '#86efac' },
      { label: 'Wheat Belt', color: '#fde68a' },
      { label: 'Cotton Belt', color: '#bae6fd' },
      { label: 'Plantation (Tea/Coffee/Rubber)', color: '#4ade80' },
      { label: 'Spices & Cash Crops', color: '#fdba74' },
    ],
  },
  {
    key: 'minerals', label: 'Minerals', icon: '💎',
    description: 'Mineral resources — Iron Ore belt (Odisha-Jharkhand-CG), Coal deposits, Petroleum regions, Non-metallic minerals',
    gradient: 'from-orange-500 to-red-600',
    legendColors: [
      { label: 'Iron Ore/Steel', color: '#a8a29e' },
      { label: 'Coal', color: '#4b5563' },
      { label: 'Petroleum/Gas', color: '#93c5fd' },
      { label: 'Mica/Bauxite', color: '#c4b5fd' },
      { label: 'Rare Minerals', color: '#f9a8d4' },
    ],
  },
  {
    key: 'rivers', label: 'River Systems', icon: '🏞️',
    description: 'Major rivers flowing through each state — Himalayan rivers (Ganga, Indus, Brahmaputra), Peninsular rivers (Godavari, Krishna, Narmada)',
    gradient: 'from-blue-500 to-cyan-600',
    legendColors: [
      { label: 'Ganga System', color: '#93c5fd' },
      { label: 'Indus System', color: '#67e8f9' },
      { label: 'Brahmaputra System', color: '#c4b5fd' },
      { label: 'Peninsular East-flowing', color: '#86efac' },
      { label: 'Peninsular West-flowing', color: '#fdba74' },
    ],
  },
  {
    key: 'parks', label: 'National Parks', icon: '🐅',
    description: 'Key National Parks & Wildlife Sanctuaries — Tiger Reserves, Biosphere Reserves, Ramsar Wetlands',
    gradient: 'from-green-500 to-emerald-600',
    legendColors: [
      { label: 'Tiger Reserve', color: '#fdba74' },
      { label: 'Rhino/Elephant', color: '#fde68a' },
      { label: 'Lion Sanctuary', color: '#fef08a' },
      { label: 'Marine NP / Wetland', color: '#93c5fd' },
      { label: 'General NP / WS', color: '#86efac' },
    ],
  },
  {
    key: 'industry', label: 'Industry & Transport', icon: '🏭',
    description: 'Major industrial regions — IT corridors, Steel belt, Auto hubs, Ports, Textile centers',
    gradient: 'from-purple-500 to-violet-600',
    legendColors: [
      { label: 'IT/Services', color: '#c4b5fd' },
      { label: 'Steel/Heavy Industry', color: '#a8a29e' },
      { label: 'Auto/Manufacturing', color: '#fca5a5' },
      { label: 'Textiles', color: '#f9a8d4' },
      { label: 'Ports/Logistics', color: '#67e8f9' },
    ],
  },
]

/* ── Memoized India Map ── */
const IndiaMap = memo(function IndiaMap({
  mode, hovered, onHover, onLeave, onClick,
}: {
  mode: AtlasMode
  hovered: string | null
  onHover: (name: string) => void
  onLeave: () => void
  onClick: (name: string) => void
}) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 1000, center: [82, 22] }}
      width={600}
      height={650}
      style={{ width: '100%', height: 'auto' }}
    >
      <Geographies geography={INDIA_TOPO}>
        {({ geographies }) =>
          geographies.map(geo => {
            const raw = geo.properties.NAME_1 as string
            const stateName = normalizeName(raw)
            const stateInfo = STATES[stateName]
            const fill = stateInfo ? getFillForMode(mode, stateInfo) : '#f1f5f9'
            const isHovered = hovered === stateName

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isHovered ? '#34d399' : fill}
                stroke="#475569"
                strokeWidth={isHovered ? 1.5 : 0.5}
                onMouseEnter={() => onHover(stateName)}
                onMouseLeave={onLeave}
                onClick={() => onClick(stateName)}
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none', cursor: 'pointer' },
                  pressed: { outline: 'none' },
                }}
              />
            )
          })
        }
      </Geographies>
    </ComposableMap>
  )
})

/* ── Main Component ── */
export default function GeoAtlas() {
  const [mode, setMode] = useState<AtlasMode>('soil')
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const currentMode = MODES.find(m => m.key === mode)!
  const activeState = selected ? STATES[selected] : hovered ? STATES[hovered] : null
  const activeLabel = selected ?? hovered ?? null

  return (
    <section id="geo-atlas" className="py-14 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-1">Section 07</p>
          <h2 className="text-3xl font-extrabold text-brand-900">India Geo Atlas</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            Interactive India map with real state boundaries — switch between Soil, Crops, Minerals, Rivers, National Parks &amp; Industry layers.
            Hover/tap any state to see detailed info. Essential for SSC CGL map-based questions.
          </p>
        </div>

        {/* Mode selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {MODES.map(m => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                mode === m.key
                  ? `bg-gradient-to-r ${m.gradient} text-white border-transparent shadow-lg`
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        {/* Description */}
        <div className={`bg-gradient-to-r ${currentMode.gradient} text-white rounded-2xl p-4 mb-6`}>
          <p className="text-sm font-medium">{currentMode.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Real India Map */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-4">
            <h3 className="text-sm font-bold text-slate-700 mb-3">
              {currentMode.icon} {currentMode.label} — India Map
              {activeLabel && <span className="ml-2 text-emerald-600 font-normal">({activeLabel})</span>}
            </h3>
            <IndiaMap
              mode={mode}
              hovered={hovered}
              onHover={setHovered}
              onLeave={() => setHovered(null)}
              onClick={(name) => setSelected(selected === name ? null : name)}
            />
          </div>

          {/* Info Panel + Legend */}
          <div className="space-y-4">
            {/* Legend */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <h3 className="text-sm font-bold text-slate-700 mb-3">Legend</h3>
              <div className="space-y-2">
                {currentMode.legendColors.map(l => (
                  <div key={l.label} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-md flex-shrink-0 border border-slate-300" style={{ backgroundColor: l.color }} />
                    <span className="text-xs text-slate-600 font-medium">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hovered/selected state detail */}
            <div className={`bg-white rounded-2xl border-2 p-4 transition-all ${activeState ? 'border-emerald-400 shadow-lg' : 'border-slate-200'}`}>
              <h3 className="text-sm font-bold text-slate-700 mb-3">
                {activeState ? `${activeState.name} (${activeState.abbr})` : 'Hover a state to view details'}
              </h3>
              {activeState ? (
                <div className="space-y-2.5 text-xs">
                  <InfoRow icon="🏜️" label="Soil" value={activeState.soil} />
                  <InfoRow icon="🌾" label="Crops" value={activeState.crops} />
                  <InfoRow icon="💎" label="Minerals" value={activeState.minerals} />
                  <InfoRow icon="🏞️" label="Rivers" value={activeState.rivers} />
                  <InfoRow icon="🐅" label="Parks" value={activeState.parks} />
                  <InfoRow icon="🏭" label="Industry" value={activeState.industry} />
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Select any state on the map to see soil, crops, minerals, rivers, parks &amp; industries.</p>
              )}
            </div>

            {/* SSC CGL Quick Facts */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-4">
              <h3 className="text-sm font-bold text-emerald-800 mb-2">SSC CGL — Map Quick Facts</h3>
              <ul className="text-xs text-emerald-700 space-y-1.5">
                <li>• <strong>Chhota Nagpur Plateau</strong> = Mineral hub (JH+OD+CG)</li>
                <li>• <strong>Indo-Gangetic Plain</strong> = Alluvial soil + Food basket</li>
                <li>• <strong>Deccan Plateau</strong> = Black soil + Cotton</li>
                <li>• <strong>Western Ghats</strong> = Biodiversity hotspot + Plantation</li>
                <li>• <strong>NE India</strong> = Tea + Bamboo + Petroleum + Biodiversity</li>
                <li>• <strong>Golden Quadrilateral</strong> = Delhi-Mumbai-Chennai-Kolkata</li>
                <li>• <strong>Digboi (Assam)</strong> = India&apos;s first oil refinery</li>
                <li>• <strong>Neyveli (TN)</strong> = Largest lignite deposit</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Patterns Table */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-700">Frequently Asked Patterns — SSC CGL Geography</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-3 font-bold text-slate-600">Pattern</th>
                  <th className="text-left p-3 font-bold text-slate-600">Question Type</th>
                  <th className="text-left p-3 font-bold text-slate-600">Key Answer</th>
                  <th className="text-left p-3 font-bold text-slate-600">Trick</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PATTERNS.map((p, i) => (
                  <tr key={i} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="p-3 font-semibold text-slate-700">{p.pattern}</td>
                    <td className="p-3 text-slate-600">{p.type}</td>
                    <td className="p-3 text-emerald-700 font-medium">{p.answer}</td>
                    <td className="p-3 text-slate-500 font-mnemonic">{p.trick}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="flex-shrink-0">{icon}</span>
      <div>
        <span className="font-bold text-slate-600">{label}:</span>{' '}
        <span className="text-slate-700">{value}</span>
      </div>
    </div>
  )
}

const PATTERNS = [
  { pattern: 'Longest river', type: '"Which is the longest..."', answer: 'Ganga (2,525 km) in India; Nile (6,650 km) in world', trick: 'G=2525, N=6650' },
  { pattern: 'Largest delta', type: '"World\'s largest delta"', answer: 'Ganga-Brahmaputra Delta (Sundarbans)', trick: 'Sundar = Beautiful + Bengal Tiger' },
  { pattern: 'Sorrow rivers', type: '"Sorrow of Bihar/Bengal"', answer: 'Kosi (Bihar), Damodar (Bengal)', trick: 'K=Bihar, D=Bengal' },
  { pattern: 'Soil → Crop match', type: '"Which soil is best for cotton?"', answer: 'Black Soil (Regur) = Cotton; Alluvial = Rice/Wheat', trick: 'BLACK = Cotton, GREEN(alluvial) = Food' },
  { pattern: 'Highest peak', type: '"Highest peak in India/South"', answer: 'K2 (8,611m) / Kangchenjunga (8,586m) / Anamudi (2,695m South)', trick: 'K-K-A: K2>Kang>Anamudi' },
  { pattern: 'West-flowing rivers', type: '"Which major rivers flow west?"', answer: 'Narmada & Tapi — through rift valleys', trick: 'N-T = West, all others = East' },
  { pattern: 'First national park', type: '"India\'s first NP?"', answer: 'Jim Corbett (1936, Uttarakhand)', trick: 'Corbett 36 = First Tiger' },
  { pattern: 'Mineral triangle', type: '"Mineral hub of India?"', answer: 'Chhota Nagpur Plateau (JH+OD+CG)', trick: 'JOC = Jharkhand-Odisha-Chhattisgarh' },
  { pattern: 'Strait identification', type: '"Which strait separates X?"', answer: 'Palk (India-Lanka), Hormuz (Iran-Oman), Malacca (Malaysia-Indonesia)', trick: 'PHM = PalHorMal' },
  { pattern: 'River name change', type: '"Brahmaputra is called __ in Tibet"', answer: 'Tsangpo (Tibet) → Dihang (AP) → Brahmaputra (Assam) → Jamuna (BD)', trick: 'T-D-B-J sequence' },
  { pattern: 'Largest producer', type: '"#1 producer of tea/coffee?"', answer: 'Tea = Assam, Coffee = Karnataka, Rubber = Kerala, Jute = WB', trick: 'ACKW: Assam-Coffee(Ka)-Kerala-WB' },
  { pattern: 'Dam on river', type: '"Tehri Dam is on which river?"', answer: 'Tehri=Bhagirathi, Bhakra=Sutlej, Hirakud=Mahanadi, Sardar Sarovar=Narmada', trick: 'TB-BS-HM-SN' },
]
