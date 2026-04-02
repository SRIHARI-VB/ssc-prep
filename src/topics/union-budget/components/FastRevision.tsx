import { useState } from 'react'
import { budgetData, type BudgetCategory, type BudgetEntry, type BudgetYear } from '../data'

const CATEGORIES: {
  key: BudgetCategory
  icon: string
  color: string
  accent: string
  ring: string
}[] = [
  { key: 'Budget Basics & History', icon: '📜', color: 'bg-indigo-50 border-indigo-200', accent: 'text-indigo-700 bg-indigo-100 border-indigo-200', ring: 'ring-indigo-400' },
  { key: 'Tax Changes', icon: '💸', color: 'bg-red-50 border-red-200', accent: 'text-red-700 bg-red-100 border-red-200', ring: 'ring-red-400' },
  { key: 'Fiscal Numbers', icon: '📊', color: 'bg-green-50 border-green-200', accent: 'text-green-700 bg-green-100 border-green-200', ring: 'ring-green-400' },
  { key: 'Agriculture & Rural', icon: '🌾', color: 'bg-lime-50 border-lime-200', accent: 'text-lime-700 bg-lime-100 border-lime-200', ring: 'ring-lime-400' },
  { key: 'Infrastructure', icon: '🏗️', color: 'bg-violet-50 border-violet-200', accent: 'text-violet-700 bg-violet-100 border-violet-200', ring: 'ring-violet-400' },
  { key: 'Defence', icon: '🛡️', color: 'bg-orange-50 border-orange-200', accent: 'text-orange-700 bg-orange-100 border-orange-200', ring: 'ring-orange-400' },
  { key: 'Education & Health', icon: '🎓', color: 'bg-blue-50 border-blue-200', accent: 'text-blue-700 bg-blue-100 border-blue-200', ring: 'ring-blue-400' },
  { key: 'Social Welfare', icon: '🤝', color: 'bg-pink-50 border-pink-200', accent: 'text-pink-700 bg-pink-100 border-pink-200', ring: 'ring-pink-400' },
  { key: 'New Schemes & Missions', icon: '🚀', color: 'bg-amber-50 border-amber-200', accent: 'text-amber-700 bg-amber-100 border-amber-200', ring: 'ring-amber-400' },
  { key: 'Digital & Technology', icon: '💻', color: 'bg-cyan-50 border-cyan-200', accent: 'text-cyan-700 bg-cyan-100 border-cyan-200', ring: 'ring-cyan-400' },
  { key: 'Budget Terminology', icon: '📖', color: 'bg-purple-50 border-purple-200', accent: 'text-purple-700 bg-purple-100 border-purple-200', ring: 'ring-purple-400' },
]

const PROB_DOT: Record<string, string> = {
  Hot: 'bg-red-500', High: 'bg-orange-400', Confirmed: 'bg-green-500', Recurring: 'bg-blue-400',
}
const PROB_TEXT: Record<string, string> = {
  Hot: 'text-red-700', High: 'text-orange-700', Confirmed: 'text-green-700', Recurring: 'text-blue-700',
}

const YEARS: ('all' | BudgetYear)[] = ['all', '2026-27', '2025-26', 'General']

// Two cheatsheets: one for 2026-27 (priority), one for 2025-26
const CHEATSHEET_2026: Record<BudgetCategory, { title: string; bullets: string[] }> = {
  'Budget Basics & History': {
    title: 'Budget 2026-27 — Who, When, What',
    bullets: [
      'Nirmala Sitharaman = 1 Feb 2026 (SUNDAY!) | 9th consecutive budget | New record for any FM',
      'Theme = Yuva Shakti-driven Budget | Slogan: Reform Express for Viksit Bharat',
      '3 Kartavyas = Sustainable growth + Human capacity + Inclusive development',
      'First budget on a SUNDAY in independent India\'s history',
      'Digital tablet in red bahi-khata pouch — tradition since 2019',
      'Only Morarji Desai (10) has more budgets total (across 2 stints)',
    ],
  },
  'Tax Changes': {
    title: 'Tax Changes 2026-27 — Key Numbers',
    bullets: [
      'Income Tax Act 2025 REPLACES 1961 Act from 1 Apr 2026 — biggest reform in 64 years',
      '"Tax Year" replaces "Financial Year" + "Assessment Year" | ITR deadline: 31 Aug',
      'Revised return deadline: 31 Dec → 31 Mar | Updated return: 48→36 months',
      'NO change in income tax slabs — same as 2025-26 (Rs 12L tax-free)',
      'STT: Futures 0.02%→0.05% | Options 0.1%→0.15%',
      'TCS on LRS edu/medical: 5%→2% | Buyback now taxed as capital gains',
      'Customs: Life-saving drugs 0% BCD | SGB exemption only for original issue holders',
      'GST: IGST exemption on specified goods for EVs and green hydrogen',
    ],
  },
  'Fiscal Numbers': {
    title: 'Fiscal Numbers 2026-27 — Must Memorize',
    bullets: [
      'Total Expenditure = Rs 53.47 lakh crore (+7.7% over 2025-26)',
      'Fiscal Deficit = 4.3% of GDP (down from 4.4% in 2025-26)',
      'Capital Expenditure = Rs 12.22 lakh crore (+11.5%) | Effective capex: Rs 17.14L cr (4.4% GDP)',
      'Non-debt receipts = Rs 36.5 lakh crore | Net borrowing: Rs 11.7L crore',
      'Debt-to-GDP = 55.6% | Target: 50 +/- 1% by 2031',
      'Top 5 Ministries: Finance(19.73L) > Defence(7.85L) > Roads(3.10L) > Railways(2.81L) > Home(2.55L)',
      'Home Affairs biggest hike = +128% (Census 2026 driver)',
      '16th Finance Commission: Arvind Panagariya | 41% devolution retained | GDP new criterion (10%)',
    ],
  },
  'Agriculture & Rural': {
    title: 'Agriculture 2026-27 — Key Schemes',
    bullets: [
      'Bharat VISTAAR = AI farm tool | Full form: Virtually Integrated System to Access Agricultural Resources',
      'Bharat VISTAAR Helpline = 155261 | AI assistant "Bharati" | Regional languages',
      'VB-G RAM G = replaces MGNREGA | 125 days (was 100) | Rs 95,692 cr | 60:40 Centre:State',
      'PM-KISAN = Rs 63,500 cr for 11.8 cr farmers | KCC MISS = Rs 22,600 cr',
      'KUSUM = Rs 5,000 cr for solar pumps',
      'PM Dhan-Dhaanya continues | Pulses Mission continues',
    ],
  },
  'Infrastructure': {
    title: 'Infrastructure 2026-27 — Rs 12.22L Crore',
    bullets: [
      'Total capex = Rs 12.22 lakh crore (+11.5% over 2025-26)',
      'Railways = Rs 2.81L crore (+11.5%) | Roads = Rs 3.10L crore (+14%)',
      '7 High-Speed Rail Corridors = 4,000 km | Rs 16L crore | Mumbai-Pune, Pune-Hyd, Hyd-Blr, Hyd-Chennai, Chennai-Blr, Delhi-Varanasi, Varanasi-Siliguri',
      'MoHUA = Rs 85,522 cr (+49.5%) | PMAY-U = Rs 18,625 cr',
      '20 new National Waterways in 5 years | Coastal shipping 6%→12% by 2047',
      'Maritime Fund = Rs 25K crore | Infrastructure Risk Guarantee Fund',
      'Dankuni-Surat freight corridor',
    ],
  },
  'Defence': {
    title: 'Defence 2026-27 — Rs 7.85L Crore',
    bullets: [
      'Total = Rs 7,85,000 crore (+15.19%) | 2% of GDP | Highest ministry allocation',
      'Capital outlay for modernization increased significantly',
      '75% domestic procurement continued | Emergency procurement post-Operation Sindoor',
      'DRDO allocation increased | New domains: Cyber + Space + AI',
      'DAE (Atomic Energy) = Rs 24,124 cr | BARC = Rs 1,800 cr | R&D up 88%',
    ],
  },
  'Education & Health': {
    title: 'Education & Health 2026-27',
    bullets: [
      'Health = Rs 1.06 lakh crore (first time crossing Rs 1L cr)',
      '5 University Townships | 5 Regional Medical Hubs | NIMHANS-2',
      '3 new Ayurveda institutes | 75K medical seats over 5 years continues',
      'Jal Jeevan Mission = Rs 67,670 cr (2nd largest CSS) | Extended to Dec 2028',
      'SBM-G = Rs 7,192 cr | BharatNet broadband to all rural schools + PHCs',
    ],
  },
  'Social Welfare': {
    title: 'Social Welfare 2026-27',
    bullets: [
      'SHE Marts = Self-Help Entrepreneur Marts | Women-led retail outlets',
      'Gig workers = 12 million covered | PM-JAY coverage + e-Shram registration',
      'PM-VBRY = Rs 20,083 cr | MSDE budget +62%',
      'Home Affairs Rs 2,55,234 cr (+128%) — Census 2026 is major driver',
      'Divyang Kaushal Yojana + Divyang Sahara Yojana — disability welfare',
      'Corporate Mitra = MSME compliance support portal',
    ],
  },
  'New Schemes & Missions': {
    title: 'New Schemes 2026-27 — Exam Favorites',
    bullets: [
      'Biopharma SHAKTI = Strategy for Healthcare Advancement through Knowledge, Technology & Innovation | Rs 10K cr/5 yrs',
      'Nuclear Energy Mission = Rs 20K cr | SMR private sector | BCD exemption to 2035',
      'CCUS = Rs 20K cr/5 yrs | 5 sectors | 750 MT CO2 by 2050 target',
      'India Semiconductor Mission 2.0 = Rs 1,000 cr',
      'Insurance FDI = 100% (was 74%) | Sabka Bima Sabki Raksha Act 2025',
      'Integrated Textile Programme = 5 components | Rs 1,500 cr | 15L skilled in 5 yrs',
      'SME Growth Fund = Rs 10K cr | Startup FoF +Rs 10K cr',
      'Container Manufacturing Scheme = Rs 10K cr | Rare Earth Corridors in 4 states',
      'Jan Vishwas 2.0 | Banking Committee for Viksit Bharat | MG Gram Swaraj Initiative',
    ],
  },
  'Digital & Technology': {
    title: 'Digital & Technology 2026-27',
    bullets: [
      'IndiaAI Mission continues | AI Centre of Excellence = Rs 500 cr',
      'Cloud Tax Holiday = tax holiday till 2047 for foreign cloud cos using Indian data centres | Safe harbour 2%',
      'FAST DS = Foreign Assets Disclosure Scheme',
      'India Post transformation continues | BharatNet broadband expansion',
      'Investment Friendliness Index for states',
    ],
  },
  'Budget Terminology': {
    title: 'Budget Terms — Hindi + Tamil Explanations',
    bullets: [
      'Tax Year concept = NEW in 2026-27 | Replaces FY + AY dual system | ITR due: 31 Aug',
      'Halwa Ceremony = 1 week before budget | FM stirs halwa | Lock-in for officials | North Block',
      'Bahi Khata = Traditional ledger | Nirmala 2019 replaced briefcase | 2021: paperless',
      'Fiscal Deficit = Total Exp - Total Receipts (excl borrowings) | 2026-27: 4.3% GDP',
      'Vote on Account = Interim spending approval | Before elections | Art 116',
      'Cut Motion = 3 types: Disapproval (Re 1) + Economy + Token (Rs 100)',
      'Consolidated Fund = Art 266(1) | All revenues + loans | Parliament approval needed',
      'Finance Bill = Tax proposals (Art 117) | Money Bill = Art 110 (Speaker certifies)',
    ],
  },
}

const CHEATSHEET_2025: Record<BudgetCategory, { title: string; bullets: string[] }> = {
  'Budget Basics & History': {
    title: 'Budget 2025-26 — Who, When, What',
    bullets: [
      'Nirmala Sitharaman = 1 Feb 2025 | 8th consecutive budget',
      'Theme = Sabka Vikas (Development for All) | Vision: Viksit Bharat @ 2047',
      '4 Engines = Agriculture + MSMEs + Investment + Exports (AMIE)',
      'Focus: Garib + Youth + Annadata + Nari | First budget of Modi 3.0',
    ],
  },
  'Tax Changes': {
    title: 'Tax 2025-26 — Income Tax & Customs',
    bullets: [
      'NEW regime: 0-4L Nil | 4-8L 5% | 8-12L 10% | 12-16L 15% | 16-20L 20% | 20-24L 25% | 24L+ 30%',
      'Rs 12 lakh = TAX FREE (new regime) | Rs 12.75L salaried | Section 87A rebate = Rs 60K',
      'Customs: 7 tariff rates removed | 36 drugs: 0% BCD | Corporate tax: NO change',
    ],
  },
  'Fiscal Numbers': {
    title: 'Fiscal 2025-26 — Key Numbers',
    bullets: [
      'Total Expenditure = Rs 50.65 lakh crore | Fiscal Deficit = 4.4% GDP',
      'Capex = Rs 11.21L crore (3.1% GDP) | GDP growth = 10.1%',
      'Top 5: Defence(6.81L) > Roads(2.72L) > Railways(2.52L) > Food(2.2L) > Rural(1.9L)',
    ],
  },
  'Agriculture & Rural': {
    title: 'Agriculture 2025-26',
    bullets: [
      'PM Dhan-Dhaanya Krishi Yojana = 100 districts | 1.7 crore farmers',
      'KCC limit = Rs 3L→Rs 5L | Pulses Mission (TUM) | Makhana Board = Bihar',
      'Urea plant = Namrup, Assam | High Yield Seeds Mission',
    ],
  },
  'Infrastructure': {
    title: 'Infrastructure 2025-26',
    bullets: [
      'Total infra = Rs 11.21 lakh crore | Railways Rs 2.52L cr | Roads Rs 2.72L cr',
      'Urban Challenge Fund = Rs 1L crore | Modified UDAN = 120 destinations',
      'JJM extended to 2028 | Maritime Fund = Rs 25K cr | Asset Monetization = Rs 10L cr',
    ],
  },
  'Defence': {
    title: 'Defence 2025-26',
    bullets: [
      'Total = Rs 6,81,210 crore | 13.45% of total budget | 9.53% increase',
      'Capital outlay = Rs 1,80,000 crore | 75% domestic procurement',
    ],
  },
  'Education & Health': {
    title: 'Education & Health 2025-26',
    bullets: [
      'Education = Rs 1.28L crore | AI Centre = Rs 500 cr | 75K medical seats/5 yrs',
      'Cancer Day Care Centres = all district hospitals | Health = Rs 99,859 cr',
    ],
  },
  'Social Welfare': {
    title: 'Social Welfare 2025-26',
    bullets: [
      'Women/SC/ST Rs 2 cr loans | Gig workers PM-JAY | SVANidhi revamped | SWAMIH 2 = Rs 15K cr',
    ],
  },
  'New Schemes & Missions': {
    title: 'New Schemes 2025-26',
    bullets: [
      'Nuclear Energy Mission = Rs 20K cr | National Manufacturing Mission | Geospatial Mission',
      'MSME limits 2.5x | Startup FoF = Rs 10K cr | Jan Vishwas 2.0',
    ],
  },
  'Digital & Technology': {
    title: 'Digital 2025-26',
    bullets: [
      '50K ATL Labs | India Post transformation | BharatNet | Investment Friendliness Index',
    ],
  },
  'Budget Terminology': {
    title: 'Budget Terms — General',
    bullets: [
      'Halwa Ceremony | Fiscal Deficit | Vote on Account | Cut Motion | Consolidated Fund',
      'Finance Bill vs Money Bill | Economic Survey | Appropriation Bill',
    ],
  },
}

export default function FastRevision() {
  const [activeTab, setActiveTab] = useState<BudgetCategory>('Budget Basics & History')
  const [activeYear, setActiveYear] = useState<'all' | BudgetYear>('all')

  const cfg = CATEGORIES.find(c => c.key === activeTab)!
  const entries = budgetData.filter(e => {
    if (e.category !== activeTab) return false
    if (activeYear !== 'all' && e.budgetYear !== activeYear) return false
    return true
  })

  // Show 2026-27 cheatsheet first, then 2025-26 below
  const sheet2026 = CHEATSHEET_2026[activeTab]
  const sheet2025 = CHEATSHEET_2025[activeTab]

  return (
    <section id="ub-fast" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-1">Section 02 -- Fast Revision</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Category-wise Quick Recall</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            One tab per category. Cheat sheets for <strong>both budgets</strong>, entries with shortcuts on the right.
            Built for <strong>last-hour revision</strong> before exam.
          </p>
        </div>

        {/* Year filter */}
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-1">Filter Year</span>
          {YEARS.map(y => {
            const count = y === 'all' ? budgetData.length : budgetData.filter(e => e.budgetYear === y).length
            return (
              <button key={y} onClick={() => setActiveYear(y)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  activeYear === y
                    ? y === '2026-27' ? 'bg-emerald-600 text-white border-emerald-600'
                    : y === '2025-26' ? 'bg-sky-600 text-white border-sky-600'
                    : y === 'General' ? 'bg-slate-700 text-white border-slate-700'
                    : 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-amber-400'
                }`}>
                {y === 'all' ? `All (${count})` : `FY ${y} (${count})`}
              </button>
            )
          })}
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => {
            const catCount = budgetData.filter(e => {
              if (e.category !== c.key) return false
              if (activeYear !== 'all' && e.budgetYear !== activeYear) return false
              return true
            }).length
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

          {/* Cheatsheet panel — 2026-27 first, then 2025-26 */}
          <div className="lg:col-span-2 space-y-4">
            {/* 2026-27 cheatsheet */}
            {(activeYear === 'all' || activeYear === '2026-27') && (
              <div className={`rounded-2xl border p-5 ${cfg.color}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{cfg.icon}</span>
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 mr-1">2026-27</span>
                    <h3 className="text-base font-extrabold text-slate-800 mt-1">{sheet2026.title}</h3>
                  </div>
                </div>
                <ul className="space-y-2">
                  {sheet2026.bullets.map((b, i) => {
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
            )}

            {/* 2025-26 cheatsheet */}
            {(activeYear === 'all' || activeYear === '2025-26') && (
              <div className="rounded-2xl border p-5 bg-sky-50 border-sky-200">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{cfg.icon}</span>
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 mr-1">2025-26</span>
                    <h3 className="text-base font-extrabold text-slate-800 mt-1">{sheet2025.title}</h3>
                  </div>
                </div>
                <ul className="space-y-2">
                  {sheet2025.bullets.map((b, i) => {
                    const [before, ...rest] = b.split('=')
                    const after = rest.join('=')
                    return (
                      <li key={i} className="flex gap-2 text-sm leading-snug">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center text-[10px] font-extrabold text-sky-700 mt-0.5">
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
            )}

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
              <p className="text-center py-10 text-slate-400 text-sm">No entries for this category + year filter.</p>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

function EntryCard({ entry: e, accentClass }: { entry: BudgetEntry; accentClass: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="shrink-0 mt-0.5 flex flex-col gap-1">
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${accentClass}`}>
            {e.topic}
          </span>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full text-center ${
            e.budgetYear === '2026-27' ? 'bg-emerald-100 text-emerald-700' :
            e.budgetYear === '2025-26' ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-600'
          }`}>{e.budgetYear === 'General' ? 'GEN' : e.budgetYear}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">{e.question}</p>
          <p className="font-mnemonic text-xs text-amber-700 mt-1 italic leading-tight">
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
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mt-2 leading-relaxed">
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
