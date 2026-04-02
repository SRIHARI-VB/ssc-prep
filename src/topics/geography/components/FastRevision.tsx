import { useState } from 'react'
import { geoData, type GeoCategory, type GeoEntry } from '../data'

const CATEGORIES: {
  key: GeoCategory
  icon: string
  color: string
  accent: string
  ring: string
}[] = [
  { key: 'Indian Rivers',            icon: '🏞️', color: 'bg-blue-50 border-blue-200',    accent: 'text-blue-700 bg-blue-100 border-blue-200',       ring: 'ring-blue-400' },
  { key: 'Mountains & Passes',       icon: '🏔️', color: 'bg-violet-50 border-violet-200', accent: 'text-violet-700 bg-violet-100 border-violet-200',  ring: 'ring-violet-400' },
  { key: 'Soil & Climate',           icon: '🌦️', color: 'bg-yellow-50 border-yellow-200', accent: 'text-yellow-700 bg-yellow-100 border-yellow-200',  ring: 'ring-yellow-400' },
  { key: 'National Parks & Wildlife', icon: '🐅', color: 'bg-green-50 border-green-200',   accent: 'text-green-700 bg-green-100 border-green-200',    ring: 'ring-green-400' },
  { key: 'Agriculture & Crops',      icon: '🌾', color: 'bg-lime-50 border-lime-200',      accent: 'text-lime-700 bg-lime-100 border-lime-200',       ring: 'ring-lime-400' },
  { key: 'Minerals & Resources',     icon: '💎', color: 'bg-orange-50 border-orange-200',  accent: 'text-orange-700 bg-orange-100 border-orange-200', ring: 'ring-orange-400' },
  { key: 'Dams & Irrigation',        icon: '🌊', color: 'bg-cyan-50 border-cyan-200',      accent: 'text-cyan-700 bg-cyan-100 border-cyan-200',       ring: 'ring-cyan-400' },
  { key: 'World Geography',          icon: '🌍', color: 'bg-indigo-50 border-indigo-200',  accent: 'text-indigo-700 bg-indigo-100 border-indigo-200', ring: 'ring-indigo-400' },
  { key: 'Straits & Waterways',      icon: '🚢', color: 'bg-sky-50 border-sky-200',        accent: 'text-sky-700 bg-sky-100 border-sky-200',          ring: 'ring-sky-400' },
  { key: 'Transport & Industry',     icon: '🚂', color: 'bg-purple-50 border-purple-200',  accent: 'text-purple-700 bg-purple-100 border-purple-200', ring: 'ring-purple-400' },
  { key: 'Population & Census',      icon: '📊', color: 'bg-pink-50 border-pink-200',      accent: 'text-pink-700 bg-pink-100 border-pink-200',       ring: 'ring-pink-400' },
  { key: 'Current Affairs (Geo)',     icon: '📰', color: 'bg-red-50 border-red-200',        accent: 'text-red-700 bg-red-100 border-red-200',          ring: 'ring-red-400' },
]

const PROB_DOT: Record<string, string> = {
  Hot: 'bg-red-500', High: 'bg-orange-400', Confirmed: 'bg-green-500', Recurring: 'bg-blue-400',
}
const PROB_TEXT: Record<string, string> = {
  Hot: 'text-red-700', High: 'text-orange-700', Confirmed: 'text-green-700', Recurring: 'text-blue-700',
}

const CHEATSHEET: Record<GeoCategory, { title: string; bullets: string[] }> = {
  'Indian Rivers': {
    title: 'Indian Rivers -- Quick Recall',
    bullets: [
      'Ganga = Gangotri Glacier | 2,525 km | Largest basin (9.51L sq km) | Largest delta (Sundarbans)',
      'Yamuna = Longest Ganga tributary (1,376 km) | Sangam at Prayagraj | Ghaghara = Largest by discharge',
      'Indus = Mansarovar (Tibet) | 2,880 km | 5 tributaries: J-C-R-B-S | Chenab largest | Drains into Arabian Sea',
      'Brahmaputra = Tibet origin (Tsangpo) | Enters India at Arunachal | Majuli = Largest river island',
      'Godavari = Nasik | 1,465 km | "Dakshin Ganga" | Largest Peninsular river',
      'Sorrow Rivers = Kosi (Bihar) | Damodar (Bengal) | Mahanadi (Odisha)',
      'West-flowing = Narmada (Amarkantak) + Tapi (Satpura) | Rift valleys | Estuaries not deltas',
      'Krishna = Mahabaleshwar | 1,400 km | Tungabhadra + Bhima tributaries',
    ],
  },
  'Mountains & Passes': {
    title: 'Mountains & Passes -- Must Know',
    bullets: [
      'Karakoram Pass = Highest motorable (18,176 ft) J&K-China | Khardung La = Leh-Nubra',
      'Rohtang Pass = Himachal | Atal Tunnel (9.02 km, longest above 10K ft) | Manali-Leh highway',
      'K2 (8,611 m) = India highest (PoK/Karakoram) | Kanchenjunga (8,586 m) = Sikkim, 3rd world',
      'Nanga Parbat = "Killer Mountain" | Western Himalayas terminus | 8,126 m',
      'Western Ghats = UNESCO Biodiversity Hotspot | Nilgiri, Annamalai, Cardamom Hills',
      'Aravalli = Oldest fold mountains in India | Guru Shikhar (1,722 m) = Highest point in Rajasthan',
      'Nathu La = Sikkim-Tibet | Jelep La = Sikkim | Shipki La = HP-Tibet (Sutlej enters)',
      'Bom Di La = Arunachal | Diphu Pass = Arunachal-Myanmar | Palghat Gap = Kerala-TN',
    ],
  },
  'Soil & Climate': {
    title: 'Soil & Climate -- Exam Essentials',
    bullets: [
      'Black Soil (Regur) = Cotton soil | Deccan Plateau | Maharashtra, Gujarat, MP | Rich in iron, lime, magnesium',
      'Red Soil = Tamil Nadu, Odisha, Jharkhand, Chhattisgarh | Iron oxide = red color | Acidic, low nitrogen',
      'Laterite Soil = Heavy rainfall areas | Kerala, Karnataka | Brick-making | Leached, acidic',
      'Alluvial Soil = Most widespread | Indo-Gangetic plains | Khadar (new) + Bangar (old) | Most fertile',
      'Monsoon onset = Kerala June 1 | SW monsoon (June-Sep) = 75% rainfall | NE monsoon = TN winter rain',
      'Koppen Climate = 8 types for India | Am (Monsoon) | Aw (Tropical Savanna) | Cwg (Subtropical humid)',
      'Desert Soil = Rajasthan, Gujarat | Sandy, saline | Low humus | Kankar (calcium carbonate) layer',
      'Rainfall pattern = Mawsynram (highest avg, Meghalaya) | Cherrapunji = 2nd | Leh = rain shadow',
    ],
  },
  'National Parks & Wildlife': {
    title: 'National Parks & Wildlife -- Top PYQ Topics',
    bullets: [
      'Jim Corbett = Oldest (1936) | Uttarakhand | Project Tiger 1st park | Ramganga river',
      'Kaziranga = Assam | One-horned Rhino | UNESCO World Heritage | Brahmaputra floodplains',
      'Sundarbans = WB | Royal Bengal Tiger | Largest mangrove | UNESCO | Delta of Ganga-Brahmaputra',
      'Gir = Gujarat | ONLY habitat of Asiatic Lion | Girnar Hills',
      'Ranthambore = Rajasthan | Tigers | Fort inside park (UNESCO)',
      'Periyar = Kerala | Elephants | Periyar Lake | Cardamom Hills',
      'Hemis = Ladakh | Largest NP in India | Snow Leopard habitat',
      'Silent Valley = Kerala | Rainforest | Saved from hydroelectric project | Lion-tailed Macaque',
    ],
  },
  'Agriculture & Crops': {
    title: 'Agriculture & Crops -- Key Facts',
    bullets: [
      'Green Revolution = 1960s | M.S. Swaminathan | Wheat + Rice | Punjab, Haryana, UP',
      'White Revolution = Operation Flood | Verghese Kurien | Milk | Gujarat (Amul)',
      'Rice = #1 WB, then Punjab, UP | Kharif crop | Needs 100+ cm rainfall | Paddy = Tropical crop',
      'Wheat = #1 UP, then Punjab, MP, Haryana | Rabi crop | Needs 50-75 cm rain | Temperate crop',
      'Sugarcane = #1 UP (largest), then Maharashtra | Tropical + Subtropical | 18-month crop',
      'Tea = #1 Assam, then WB | Plantation crop | Acidic soil | Hill slopes',
      'Coffee = #1 Karnataka (Coorg) | Arabica + Robusta | Bababudan Hills',
      'Jute = #1 WB | "Golden Fibre" | Alluvial soil | Hooghly belt | Kharif crop',
    ],
  },
  'Minerals & Resources': {
    title: 'Minerals & Resources -- Location Map',
    bullets: [
      'Iron Ore = #1 Odisha (Keonjhar, Mayurbhanj) > Chhattisgarh > Karnataka > Jharkhand | Hematite + Magnetite',
      'Coal = #1 Jharkhand (Jharia, Bokaro, Dhanbad) > Odisha > Chhattisgarh > WB (Raniganj)',
      'Mica = #1 Jharkhand/Bihar (Kodarma) | "Mica Capital of India" | Used in electrical insulation',
      'Bauxite = #1 Odisha > Gujarat > Jharkhand > Maharashtra | Raw material for Aluminium',
      'Manganese = #1 Odisha > Karnataka > MP > Maharashtra | Used in steel-making',
      'Petroleum = Mumbai High (offshore) + Digboi (oldest, Assam) + Ankleshwar (Gujarat) + KG Basin',
      'Copper = #1 Rajasthan (Khetri) > Jharkhand (Singhbhum) > MP',
      'Thorium = India has 35% of world reserves | Kerala (Monazite sands) | Nuclear fuel',
    ],
  },
  'Dams & Irrigation': {
    title: 'Dams & Irrigation -- Important Dams',
    bullets: [
      'Tehri Dam = Uttarakhand | Highest dam in India (260.5 m) | Bhagirathi River | Multipurpose',
      'Bhakra Nangal = HP-Punjab border | Sutlej River | Gobind Sagar Lake | 2nd highest (226 m)',
      'Hirakud = Odisha | Mahanadi River | Longest dam in India (25.8 km) | First multipurpose after independence',
      'Nagarjuna Sagar = Telangana-AP | Krishna River | Largest masonry dam in world',
      'Sardar Sarovar = Gujarat | Narmada River | Part of Narmada Valley Development',
      'Mettur Dam = Tamil Nadu | Kaveri River | Stanley Reservoir | Oldest in South India (1934)',
      'Indira Gandhi Canal = Rajasthan | Longest canal in India | From Harike Barrage (Sutlej-Beas)',
      'Farakka Barrage = WB | Ganga River | Diverts water to Hooghly | India-Bangladesh dispute',
    ],
  },
  'World Geography': {
    title: 'World Geography -- Continents & Oceans',
    bullets: [
      'Largest continent = Asia (30%) | Smallest = Australia/Oceania | 7 continents total',
      'Pacific Ocean = Largest + Deepest | Mariana Trench (11,034 m / Challenger Deep)',
      'Sahara = Largest hot desert (Africa) | Antarctica = Largest cold desert',
      'Amazon = Largest river by discharge | Nile = Longest river (6,650 km)',
      'Caspian Sea = Largest lake (saltwater) | Lake Superior = Largest freshwater by area',
      'Ring of Fire = Pacific Ocean rim | 75% of world volcanoes + 90% of earthquakes',
      'Mt. Everest = 8,849 m (Nepal-Tibet) | Mauna Kea = Tallest from base (10,210 m)',
      'Great Barrier Reef = Australia | Largest coral reef system | UNESCO',
    ],
  },
  'Straits & Waterways': {
    title: 'Straits & Waterways -- Exam Favorites',
    bullets: [
      'Strait of Hormuz = Persian Gulf-Gulf of Oman | Oil chokepoint | Iran-Oman',
      'Strait of Malacca = Indian Ocean-Pacific | Singapore-Malaysia-Indonesia | Busiest shipping route',
      'Palk Strait = India-Sri Lanka | 53-80 km wide | Adam\'s Bridge/Ram Setu',
      'Strait of Gibraltar = Atlantic-Mediterranean | Spain-Morocco | 14 km narrowest',
      'Suez Canal = Mediterranean-Red Sea | Egypt | Opened 1869 | ~193 km',
      'Panama Canal = Atlantic-Pacific | Panama | Opened 1914 | ~82 km | Locks system',
      'Bering Strait = Asia-North America | Russia-USA | Was land bridge during Ice Age',
      'Bosphorus = Black Sea-Sea of Marmara | Turkey | Istanbul on both sides',
    ],
  },
  'Transport & Industry': {
    title: 'Transport & Industry -- Key Corridors',
    bullets: [
      'Golden Quadrilateral = Delhi-Mumbai-Chennai-Kolkata | NH network | 5,846 km | NHAI',
      'North-South Corridor = Srinagar-Kanyakumari | East-West = Silchar-Porbandar',
      'Mumbai = Financial capital | Largest port | JNPT (Nhava Sheva) = Largest container port',
      'Bhilai = Chhattisgarh (Steel) | Jamshedpur = Jharkhand (TISCO) | Rourkela = Odisha (Steel)',
      'Bangalore = IT capital | Silicon Valley of India | HAL + ISRO + DRDO',
      'Konkan Railway = Mumbai-Mangalore | 760 km | 2,000 bridges | 91 tunnels | Engineering marvel',
      'Dedicated Freight Corridors = Western (Delhi-Mumbai) + Eastern (Ludhiana-Dankuni) | Under construction',
      'Sagarmala Project = Port-led development | 12 mega ports | Coastal shipping boost',
    ],
  },
  'Population & Census': {
    title: 'Population & Census -- Census 2011 + Updates',
    bullets: [
      'Census 2011 = 121.08 crore | Growth rate 17.7% | Sex ratio 943 | Literacy 74.04%',
      'Most populous state = UP (19.98 cr) | Least = Sikkim (6.1 lakh) | Largest area = Rajasthan',
      'Highest density = Bihar (1,106/sq km) | Lowest = Arunachal Pradesh (17/sq km)',
      'Highest sex ratio = Kerala (1,084) | Lowest = Haryana (879) | Child SR worst = Haryana',
      'Highest literacy = Kerala (93.91%) | Lowest = Bihar (63.82%) | Female lit: Kerala top',
      'Census 2026 = Upcoming (delayed from 2021) | Rs 12,000+ crore budget allocation',
      'India = 2nd most populous (140+ crore by 2024) | Overtook China in 2023',
      'Urbanization = 31.16% urban (2011) | ~35% by 2024 estimate | Top: Delhi, Mumbai, Chennai',
    ],
  },
  'Current Affairs (Geo)': {
    title: 'Current Affairs (Geo) -- 2024-2026',
    bullets: [
      'Joshimath Subsidence = Uttarakhand (2023) | Land sinking | NTPC Tapovan impact',
      'Sikkim Flash Flood 2023 = Teesta River | South Lhonak Lake GLOF | 100+ dead',
      'Ken-Betwa River Linking = First river interlinking | MP-UP | Launched 2024',
      'Green Hydrogen Mission = Rs 19,744 crore | India targets 5 MMT by 2030',
      'Polavaram Dam = Andhra Pradesh | Godavari River | National project status | Multi-purpose',
      'Great Nicobar Project = Rs 72,000 crore | Greenfield city + port + airport | Environmental concerns',
      'India population overtook China = 2023 | UN estimate 142.86 crore | Most populous country',
      'Uttarakhand Tunnel Rescue = Silkyara tunnel collapse (Nov 2023) | 41 workers rescued after 17 days',
    ],
  },
}

export default function FastRevision() {
  const [activeTab, setActiveTab] = useState<GeoCategory>('Indian Rivers')

  const cfg = CATEGORIES.find(c => c.key === activeTab)!
  const entries = geoData.filter(e => e.category === activeTab)
  const sheet = CHEATSHEET[activeTab]

  return (
    <section id="geo-fast" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-1">Section 02 -- Fast Revision</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Category-wise Quick Recall</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            One tab per category. Cheat sheets on the left, entries with shortcuts on the right.
            Built for <strong>last-hour revision</strong> before exam.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => {
            const catCount = geoData.filter(e => e.category === c.key).length
            return (
              <button
                key={c.key}
                onClick={() => setActiveTab(c.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                  activeTab === c.key
                    ? `${c.accent} ring-2 ${c.ring} shadow-sm`
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{c.icon}</span>
                <span className="hidden sm:inline">{c.key}</span>
                <span className="sm:hidden">{c.key.split(' ')[0]}</span>
                <span className="ml-1 opacity-60">({catCount})</span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-slide">

          {/* Cheatsheet panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className={`rounded-2xl border p-5 ${cfg.color}`}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{cfg.icon}</span>
                <h3 className="text-base font-extrabold text-slate-800">{sheet.title}</h3>
              </div>
              <ul className="space-y-2">
                {sheet.bullets.map((b, i) => {
                  const [before, ...rest] = b.split('=')
                  const after = rest.join('=')
                  return (
                    <li key={i} className="flex gap-2 text-sm leading-snug">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-extrabold text-emerald-700 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-slate-700">
                        {after ? (<><strong className="text-slate-900">{before.trim()}</strong><span className="text-slate-500"> = </span><span>{after.trim()}</span></>) : (<span>{b}</span>)}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Priority summary */}
            <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 flex gap-3 flex-wrap">
              {(['Hot','High','Confirmed','Recurring'] as const).map(p => {
                const n = entries.filter(e => e.examProb === p).length
                if (!n) return null
                return (
                  <span key={p} className={`text-xs font-bold flex items-center gap-1 ${PROB_TEXT[p]}`}>
                    <span className={`w-2 h-2 rounded-full inline-block ${PROB_DOT[p]}`}></span>
                    {p}: {n}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Entry cards */}
          <div className="lg:col-span-3 space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {entries.map(e => (
              <EntryCard key={e.id} entry={e} accentClass={cfg.accent} />
            ))}
            {entries.length === 0 && (
              <p className="text-center py-10 text-slate-400 text-sm">No entries for this category.</p>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

function EntryCard({ entry: e, accentClass }: { entry: GeoEntry; accentClass: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="shrink-0 mt-0.5">
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${accentClass}`}>
            {e.topic}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">{e.question}</p>
          <p className="font-mnemonic text-xs text-emerald-700 mt-1 italic leading-tight">
            {e.shortcut}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`w-2 h-2 rounded-full ${PROB_DOT[e.examProb]}`} title={e.examProb}></span>
          <span className="text-slate-300 text-sm">{open ? '\u25B2' : '\u25BC'}</span>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 px-4 py-3 bg-slate-50 animate-fade-slide">
          <p className="text-sm font-bold text-slate-800 mb-2">
            {e.answer}
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">{e.detail}</p>
          {e.tamilNote && (
            <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 mt-2 leading-relaxed">
              <span className="font-bold">தமிழ்:</span> {e.tamilNote}
            </p>
          )}
          <p className="text-xs text-slate-400 mt-2">{e.context}
            <span className={`ml-2 font-bold ${PROB_TEXT[e.examProb]}`}> - {e.examProb}</span>
          </p>
        </div>
      )}
    </div>
  )
}
