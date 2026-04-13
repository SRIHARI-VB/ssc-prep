import { useState } from 'react'
import { riData, type RICategory, type RIEntry } from '../data'

const CATEGORIES: {
  key: RICategory
  icon: string
  color: string
  accent: string
  ring: string
}[] = [
  { key: 'Global Indices',              icon: '🌐', color: 'bg-violet-50 border-violet-200',  accent: 'text-violet-700 bg-violet-100 border-violet-200',  ring: 'ring-violet-400' },
  { key: 'India Rankings',              icon: '🇮🇳', color: 'bg-blue-50 border-blue-200',      accent: 'text-blue-700 bg-blue-100 border-blue-200',        ring: 'ring-blue-400' },
  { key: 'Economic Indices',            icon: '📈', color: 'bg-yellow-50 border-yellow-200',  accent: 'text-yellow-700 bg-yellow-100 border-yellow-200',  ring: 'ring-yellow-400' },
  { key: 'Social Indices',              icon: '👥', color: 'bg-pink-50 border-pink-200',      accent: 'text-pink-700 bg-pink-100 border-pink-200',        ring: 'ring-pink-400' },
  { key: 'Governance & Transparency',   icon: '⚖️', color: 'bg-orange-50 border-orange-200',  accent: 'text-orange-700 bg-orange-100 border-orange-200',  ring: 'ring-orange-400' },
  { key: 'Environment & Sustainability', icon: '🌿', color: 'bg-green-50 border-green-200',   accent: 'text-green-700 bg-green-100 border-green-200',     ring: 'ring-green-400' },
  { key: 'Publishing Organizations',    icon: '🏛️', color: 'bg-indigo-50 border-indigo-200',  accent: 'text-indigo-700 bg-indigo-100 border-indigo-200',  ring: 'ring-indigo-400' },
  { key: 'Current Affairs 2024-26',     icon: '📰', color: 'bg-red-50 border-red-200',        accent: 'text-red-700 bg-red-100 border-red-200',           ring: 'ring-red-400' },
]

const PROB_DOT: Record<string, string> = {
  Hot: 'bg-red-500', High: 'bg-orange-400', Confirmed: 'bg-green-500', Recurring: 'bg-blue-400',
}
const PROB_TEXT: Record<string, string> = {
  Hot: 'text-red-700', High: 'text-orange-700', Confirmed: 'text-green-700', Recurring: 'text-blue-700',
}

const CHEATSHEET: Record<RICategory, { title: string; bullets: string[] }> = {
  'Global Indices': {
    title: 'Global Indices -- Quick Recall',
    bullets: [
      'HDI = UNDP (New York) | India 134/193 (2024) | Health + Education + Income | Switzerland #1',
      'GHI = Concern Worldwide + Welthungerhilfe | India 105/127 (2024) | 4 indicators | Serious category',
      'World Happiness = UN SDSN | India 126/143 (2024) | Finland #1 for 7 years',
      'Gender Gap = WEF (Geneva) | India 129/146 (2024) | 4 areas | Iceland #1 for 14 years',
      'CPI = Transparency International (Berlin) | India 93/180 (2024) | Denmark #1 | Score 0-100',
      'GII = WIPO (Geneva) | India 39/133 (2024) | Top lower-middle-income | Switzerland #1',
      'Press Freedom = RSF (Paris) | India 159/180 (2024) | Norway #1',
      'Passport Index = Henley & Partners | India 82nd | 62 visa-free countries | Singapore #1',
    ],
  },
  'India Rankings': {
    title: 'India Rankings -- Key Numbers',
    bullets: [
      'GDP Rank = 5th (nominal, IMF) | 3rd by PPP | Overtook UK in 2022 | ~$3.94T',
      'HDI = 134 | Medium Human Development | HDI value 0.644 | Improved from 131 (2020)',
      'GHI = 105/127 | Serious | Govt contested methodology | Child wasting worst indicator',
      'Gender Gap = 129/146 | Worst in Economic Participation | Best in Political Empowerment',
      'CPI = 93/180 | Score 39/100 | Needs significant improvement',
      'GII = 39/133 | Best among lower-middle-income | IT + pharma innovation hubs',
      'LPI = 38/139 (2023) | Improved from 44th (2018) | World Bank publishes it',
      'Firepower = 4th globally | After USA, Russia, China | 2nd largest active military',
    ],
  },
  'Economic Indices': {
    title: 'Economic Indices -- Base Years & Publishers',
    bullets: [
      'WPI base = 2011-12 | DPIIT publishes | 697 items | Primary + Fuel + Manufactured',
      'CPI base = 2012 | NSO/CSO publishes | RBI uses for inflation target (4% +/- 2%)',
      'IIP base = 2011-12 | NSO publishes | Mining + Manufacturing + Electricity',
      'GDP base = 2011-12 | NSO calculates | GVA method since 2015',
      'Fiscal Deficit 2025-26 = 4.4% of GDP | 2024-25 was 4.9%',
      'SENSEX = BSE (30 stocks) | NIFTY 50 = NSE (50 stocks) | BSE est. 1875 (oldest in Asia)',
      'Big 3 Rating = Moody\'s + S&P + Fitch | India: Baa3/BBB- | CRISIL = S&P subsidiary',
      'Remember: CPI base is 2012 (NOT 2011-12) -- this is the trick question!',
    ],
  },
  'Social Indices': {
    title: 'Social Indices -- Development Metrics',
    bullets: [
      'MPI = UNDP + Oxford OPHI | India lifted 140M out of poverty | 3 dimensions, 10 indicators',
      'SDG India Index = NITI Aayog | Kerala tops | 17 SDGs, 169 targets | Agenda 2030',
      'SDGs = 17 Goals | Adopted 2015 | Deadline 2030 | Replaced MDGs (8 goals, 2000-2015)',
      'Social Progress Index = 3 dimensions: Needs + Wellbeing + Opportunity | NOT GDP-based',
      'HCI = World Bank | India ~0.49 | Measures survival + schooling + health',
      'GFSI = EIU | Affordability + Availability + Quality + Natural Resources',
      'Global Slavery Index = Walk Free Foundation (Australia) | India highest absolute numbers',
      'NITI Aayog replaced Planning Commission (2015) | PM is Chairman',
    ],
  },
  'Governance & Transparency': {
    title: 'Governance & Transparency -- Key Reports',
    bullets: [
      'CPI = Transparency International (Berlin) | India 93/180 | Score 39/100 | Denmark #1',
      'Rule of Law Index = World Justice Project | India 79/142 (2024) | 8 factors',
      'Democracy Index = EIU (Economist) | India = Electoral Democracy | Norway #1',
      'Freedom in World = Freedom House (Washington DC) | India = Partly Free',
      'Good Governance Index = DARPG | Good Governance Day = Dec 25 (Vajpayee birthday)',
      'India Justice Report = Tata Trusts | 4 pillars: Police, Judiciary, Prisons, Legal Aid',
      'Key confuser: TI is in Berlin (NOT Washington DC or Geneva)',
      'EIU publishes BOTH Democracy Index AND Global Food Security Index',
    ],
  },
  'Environment & Sustainability': {
    title: 'Environment & Sustainability -- Green Reports',
    bullets: [
      'EPI = Yale + Columbia | India 176/180 (2022) | Denmark #1 | Biennial',
      'CCPI = Germanwatch + partners | India 7th (2025) | Top performer!',
      'ISFR = Forest Survey of India (Dehradun) | Biennial | India forest = 21.76% | MP largest area',
      'Paris Agreement = 2015 (COP21) | Limit 1.5-2 deg C | 196 parties | India ratified 2016',
      'Ramsar Sites = 80+ in India (2024) | UP has most | Ramsar Convention 1971 (Iran)',
      'Sustainable Dev Report = SDSN | India ~112th | Finland #1',
      'World Risk Index = Ruhr University Bochum | Natural disaster risk',
      'India\'s NDC: 45% emission intensity reduction by 2030 | Net Zero by 2070',
    ],
  },
  'Publishing Organizations': {
    title: 'Publishing Organizations -- HQ Locations',
    bullets: [
      'UNDP = New York | HDI + MPI | Est. 1965',
      'WEF = Geneva (HQ), Davos (annual meeting) | Gender Gap + GCI | Klaus Schwab 1971',
      'Transparency Intl = Berlin | CPI | Est. 1993',
      'WIPO = Geneva | GII | UN agency | Est. 1967',
      'IEP = Sydney | GPI + GTI | Steve Killelea 2007',
      'World Bank + IMF = Washington DC | Both 1944 Bretton Woods | WB Pres = Ajay Banga',
      'WHO + WTO + ILO + UNHCR = ALL Geneva | Key exam confuser',
      'FAO + WFP + IFAD = ALL Rome | UNESCO + RSF = Paris',
    ],
  },
  'Current Affairs 2024-26': {
    title: 'Current Affairs 2024-26 -- Hot Topics',
    bullets: [
      'India G20 = 2023 | Theme: One Earth, One Family, One Future | AU admitted | Delhi Declaration',
      'BRICS+ Jan 2024 = 5 new members: Egypt, Ethiopia, Iran, Saudi Arabia, UAE | Now 10',
      'India #1 Population = 2023 | ~142.86 crore | Overtook China',
      'Chandrayaan-3 = Aug 23, 2023 | 1st on Moon south pole | 4th on Moon overall | Aug 23 = National Space Day',
      'Aditya-L1 = Sep 2, 2023 | Solar mission | L1 Lagrange point | Jan 6, 2024 reached',
      'Budget 2025-26 = Tax exempt 12L (new regime) | Fiscal deficit 4.4% | FM Nirmala 8th budget',
      'Semiconductor fab = Tata (Dholera, Gujarat) | Micron (Sanand, Gujarat) | India Semi Mission 2021',
      'UPI global = Singapore PayNow + UAE IPP + France Lyra | 46% of world real-time payments',
    ],
  },
}

export default function FastRevision() {
  const [activeTab, setActiveTab] = useState<RICategory>('Global Indices')

  const cfg = CATEGORIES.find(c => c.key === activeTab)!
  const entries = riData.filter(e => e.category === activeTab)
  const sheet = CHEATSHEET[activeTab]

  return (
    <section id="ri-fast" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-1">Section 02 -- Fast Revision</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Category-wise Quick Recall</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            One tab per category. Cheat sheets on the left, entries with shortcuts on the right.
            Built for <strong>last-hour revision</strong> before exam.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => {
            const catCount = riData.filter(e => e.category === c.key).length
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
                      <span className="shrink-0 w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center text-[10px] font-extrabold text-violet-700 mt-0.5">
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

function EntryCard({ entry: e, accentClass }: { entry: RIEntry; accentClass: string }) {
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
          {e.shortcut && (
            <p className="font-mnemonic text-xs text-violet-700 mt-1 italic leading-tight">
              {e.shortcut}
            </p>
          )}
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
          <p className="text-xs text-slate-400 mt-2">{e.context}
            <span className={`ml-2 font-bold ${PROB_TEXT[e.examProb]}`}> - {e.examProb}</span>
          </p>
        </div>
      )}
    </div>
  )
}
