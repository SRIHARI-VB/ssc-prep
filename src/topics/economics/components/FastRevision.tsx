import { useState } from 'react'
import { econData, type EconCategory, type EconEntry } from '../data'

const CATEGORIES: {
  key: EconCategory; icon: string; color: string; accent: string; ring: string
}[] = [
  { key: 'Basic Concepts',            icon: '\u{1F4B0}', color: 'bg-cyan-50 border-cyan-200',    accent: 'text-cyan-700 bg-cyan-100 border-cyan-200',       ring: 'ring-cyan-400' },
  { key: 'Indian Economy & Planning', icon: '\u{1F3E6}', color: 'bg-teal-50 border-teal-200',    accent: 'text-teal-700 bg-teal-100 border-teal-200',       ring: 'ring-teal-400' },
  { key: 'Banking & Monetary Policy', icon: '\u{1F3DB}\uFE0F', color: 'bg-blue-50 border-blue-200',    accent: 'text-blue-700 bg-blue-100 border-blue-200',       ring: 'ring-blue-400' },
  { key: 'Fiscal Policy & Taxation',  icon: '\u{1F4CA}', color: 'bg-indigo-50 border-indigo-200',accent: 'text-indigo-700 bg-indigo-100 border-indigo-200', ring: 'ring-indigo-400' },
  { key: 'International Trade & Orgs',icon: '\u{1F310}', color: 'bg-emerald-50 border-emerald-200',accent: 'text-emerald-700 bg-emerald-100 border-emerald-200',ring: 'ring-emerald-400' },
  { key: 'Agriculture & Rural',       icon: '\u{1F33E}', color: 'bg-lime-50 border-lime-200',    accent: 'text-lime-700 bg-lime-100 border-lime-200',       ring: 'ring-lime-400' },
  { key: 'Industry & Infrastructure', icon: '\u{1F3ED}', color: 'bg-orange-50 border-orange-200',accent: 'text-orange-700 bg-orange-100 border-orange-200', ring: 'ring-orange-400' },
  { key: 'Financial Markets',         icon: '\u{1F4C8}', color: 'bg-violet-50 border-violet-200',accent: 'text-violet-700 bg-violet-100 border-violet-200', ring: 'ring-violet-400' },
  { key: 'Poverty & Development',     icon: '\u{1F465}', color: 'bg-rose-50 border-rose-200',    accent: 'text-rose-700 bg-rose-100 border-rose-200',       ring: 'ring-rose-400' },
  { key: 'Reforms & Current Affairs', icon: '\u26A1',    color: 'bg-amber-50 border-amber-200',  accent: 'text-amber-700 bg-amber-100 border-amber-200',   ring: 'ring-amber-400' },
]

const PROB_DOT: Record<string, string> = {
  Hot: 'bg-red-500', High: 'bg-orange-400', Confirmed: 'bg-green-500', Recurring: 'bg-blue-400',
}
const PROB_TEXT: Record<string, string> = {
  Hot: 'text-red-700', High: 'text-orange-700', Confirmed: 'text-green-700', Recurring: 'text-blue-700',
}

const CHEATSHEET: Record<EconCategory, { title: string; bullets: string[] }> = {
  'Basic Concepts': {
    title: 'Basic Concepts -- Quick Recall',
    bullets: [
      'GDP = C + I + G + (X-M) | GNP = GDP + NFIA | NNP = GNP - Depreciation | NNP at FC = National Income',
      'Demand Law = Price up -> Qty demanded down (inverse) | Supply Law = Price up -> Qty supplied up (direct)',
      'Market Structures = Perfect Competition (many sellers, homogeneous) | Monopoly (single seller) | Oligopoly (few sellers) | Monopolistic (many sellers, differentiated)',
      'Inflation Types = Demand-pull (excess demand) | Cost-push (rising input costs) | Stagflation (high inflation + high unemployment + stagnant growth)',
      'Price Indices = WPI (wholesale, base 2011-12) | CPI (retail, base 2012) | GDP Deflator = (Nominal GDP / Real GDP) x 100',
      'Elasticity = Ed > 1 Elastic | Ed < 1 Inelastic | Ed = 1 Unitary | Ed = 0 Perfectly Inelastic | Ed = Infinity Perfectly Elastic',
      'Gini Coefficient = 0 (perfect equality) to 1 (perfect inequality) | Lorenz Curve measures income distribution',
      'Phillips Curve = Inverse relation between inflation & unemployment (short run)',
    ],
  },
  'Indian Economy & Planning': {
    title: 'Indian Economy & Planning -- Key Facts',
    bullets: [
      'Planning Commission (1950) replaced by NITI Aayog (2015) | Chairman = PM | Vice Chairman appointed',
      'FYPs = 1st (1951, Harrod-Domar, dams) | 2nd (Mahalanobis, heavy industry) | 3rd (food crisis) | 4th (Gadgil, Green Rev)',
      'FYPs continued = 5th (poverty) | 6th (Rao-Manmohan) | 7th (food+work+productivity) | 8th (Rao, LPG reforms) | 12th last (2012-17)',
      'NITI Aayog = No fund allocation power | Three-Year Action Agenda | 15-Year Vision | 7-Year Strategy',
      'Sectors = Primary (agriculture ~15% GDP) | Secondary (industry ~25%) | Tertiary (services ~55%) | Services largest employer shift ongoing',
      'Mixed Economy = Public + Private sectors coexist | Industrial Policy Resolution 1948 & 1956 laid framework',
      'Demographic Dividend = 65% population below 35 years | Window until ~2055 | Skill India to capitalize',
      'Per Capita Income = NNP at FC / Population | India classified as Lower-Middle Income by World Bank',
    ],
  },
  'Banking & Monetary Policy': {
    title: 'Banking & Monetary Policy -- RBI Tools',
    bullets: [
      'RBI = Est. 1935 (Hilton Young Commission) | Nationalized 1949 | HQ Mumbai | Governor heads',
      'Repo Rate = Rate at which RBI lends to banks (short-term) | Reverse Repo = Rate banks park funds with RBI',
      'CRR = Cash Reserve Ratio (% of NDTL kept with RBI, no interest) | SLR = Statutory Liquidity Ratio (% in gold/govt securities)',
      'MSF = Marginal Standing Facility (Repo + 0.25%, emergency) | Bank Rate = Long-term lending rate by RBI',
      'OMO = Open Market Operations (buy/sell govt securities to control money supply) | LAF = Liquidity Adjustment Facility',
      'Bank Types = Scheduled (in RBI 2nd Schedule) | Commercial (SBI, PNB) | Cooperative | Regional Rural (RRBs by NABARD)',
      'Payment Banks = Max deposit 2 lakh | No lending | Paytm, Airtel, India Post, Fino, Jio | Est. 2017 guidelines',
      'Small Finance Banks = Min 75% PSL | Can lend & accept deposits | AU, Equitas, Ujjivan, Jana | Nachiket Mor committee',
    ],
  },
  'Fiscal Policy & Taxation': {
    title: 'Fiscal Policy & Taxation -- Budget & GST',
    bullets: [
      'GST = Launched 1 July 2017 (101st Amendment) | "One Nation One Tax" | Subsumed 17 taxes',
      'GST Slabs = 0% (essentials) | 5% (basic) | 12% (standard) | 18% (most services) | 28% (luxury/sin goods) + Compensation Cess',
      'GST Types = CGST + SGST (intra-state) | IGST (inter-state) | GST Council (Art 279A, FM chairs, all state FMs)',
      'Deficit Types = Revenue Deficit (Rev Receipts - Rev Expenditure) | Fiscal Deficit (Total Receipts excl borrowing - Total Expenditure)',
      'Primary Deficit = Fiscal Deficit - Interest Payments | Effective Revenue Deficit = Rev Deficit - Grants for asset creation',
      'FRBM Act 2003 = Fiscal Responsibility & Budget Management | Target: Fiscal Deficit 3% of GDP | Amended multiple times',
      'Direct Tax = Income Tax, Corporate Tax (on income/profit) | Indirect Tax = GST, Customs Duty (on goods/services)',
      'Budget = Annual Financial Statement (Art 112) | Finance Bill (tax proposals) | Appropriation Bill (expenditure authorization)',
    ],
  },
  'International Trade & Orgs': {
    title: 'International Trade & Organizations -- HQs & Roles',
    bullets: [
      'WTO = Geneva (1995, replaced GATT 1947) | 164 members | MFN principle | Dispute Settlement Body',
      'IMF = Washington DC (1945) | SDR (Special Drawing Rights) | India 8th largest quota | Surveillance + Lending',
      'World Bank = Washington DC (1944, Bretton Woods) | IBRD + IDA | Poverty reduction | President from USA traditionally',
      'ADB = Manila (1966) | Regional development | Japan & USA largest shareholders | India founding member',
      'NDB = Shanghai (2015) | BRICS bank | Equal voting | India 2nd president (Dilma Rousseff 1st)',
      'AIIB = Beijing (2016) | China-led | 109 members | Infrastructure focus | India 2nd largest shareholder',
      'FDI vs FII = FDI (long-term, management control, 10%+ equity) | FII (portfolio, short-term, volatile, <10%)',
      'BoP = Current Account (trade + services + transfers) + Capital Account (FDI + FII + loans) | CAD = imports > exports',
    ],
  },
  'Agriculture & Rural': {
    title: 'Agriculture & Rural Economy -- Revolutions & Schemes',
    bullets: [
      'Green Revolution = M.S. Swaminathan (Father) | Norman Borlaug (Nobel) | 1960s | HYV wheat & rice | Punjab, Haryana',
      'White Revolution = Operation Flood | Verghese Kurien (Milkman of India) | 1970 | Amul/NDDB | Gujarat',
      'Blue Revolution = Fish production | Arun Krishnan | Neel Kranti Mission | Aquaculture focus',
      'Yellow Revolution = Oilseeds (Sam Pitroda) | Pink Revolution = Meat/Prawns | Golden Revolution = Horticulture/Honey',
      'MSP = Minimum Support Price | Recommended by CACP (Commission for Agricultural Costs & Prices) | 22+ crops | Announced by Cabinet',
      'NABARD = Est. 1982 (Shivaraman Committee) | HQ Mumbai | Refinance to rural banks | SHG-Bank linkage',
      'PM-KISAN = Rs 6000/year in 3 installments | Small & marginal farmers | Direct Benefit Transfer (DBT)',
      'Other Schemes = PMFBY (crop insurance) | eNAM (electronic mandi) | Kisan Credit Card | Soil Health Card | PM-AASHA (pulses & oilseeds)',
    ],
  },
  'Industry & Infrastructure': {
    title: 'Industry & Infrastructure -- Policies & Reforms',
    bullets: [
      'LPG 1991 = Liberalization, Privatization, Globalization | PM Narasimha Rao | FM Manmohan Singh | BoP crisis trigger',
      'IPR 1956 = Industrial Policy Resolution | 3 Schedules: Schedule A (State monopoly, 17) | Schedule B (State+Private) | Schedule C (Private)',
      'Make in India = 2014 | 25 sectors | FDI liberalization | Ease of Doing Business focus | Lion logo',
      'PLI = Production Linked Incentive | 14 sectors | Mobile, pharma, auto, textile, solar | Boost domestic manufacturing',
      'SEZ = Special Economic Zones Act 2005 | Tax holidays | Duty-free imports | Single window clearance | NSEZ in Noida (1st)',
      'Major Ports = 12 major ports (under Central Govt) | Sagarmala Project (port-led development) | Jawaharlal Nehru Port (largest container)',
      'National Highways = NHAI (1988) | Bharatmala Pariyojana | Golden Quadrilateral (connecting 4 metros) | North-South & East-West Corridor',
      'Disinvestment = Selling govt stake in PSUs | DIPAM handles | Strategic vs Minority | Air India to Tata (2022)',
    ],
  },
  'Financial Markets': {
    title: 'Financial Markets -- Regulators & Indices',
    bullets: [
      'SEBI = Securities & Exchange Board of India | Est. 1988, statutory 1992 | HQ Mumbai | Regulates stock markets',
      'BSE = Bombay Stock Exchange | Est. 1875 (oldest in Asia) | Sensex = 30 stocks | Base year 1978-79 | Dalal Street',
      'NSE = National Stock Exchange | Est. 1992 | Nifty 50 = 50 stocks | Base year 1995 | Fully electronic trading',
      'IRDAI = Insurance Regulatory & Development Authority | Est. 1999 | HQ Hyderabad | Regulates insurance sector',
      'PFRDA = Pension Fund Regulatory & Development Authority | Est. 2003, Act 2013 | NPS & APY schemes',
      'UPI = Unified Payments Interface | NPCI | Launched 2016 | 10 billion txns/month milestone | Real-time, 24x7',
      'Money Market = T-Bills (91/182/364 days) | Commercial Paper | Certificate of Deposit | Call Money (overnight)',
      'Capital Market = Primary (IPO, FPO) | Secondary (stock exchange) | Equity + Debt | SEBI regulates both',
    ],
  },
  'Poverty & Development': {
    title: 'Poverty & Development -- Lines & Indices',
    bullets: [
      'Tendulkar Committee = Poverty line: Rs 816/month (rural), Rs 1000/month (urban) | Based on calorie + non-food | 2011-12: 21.9%',
      'Rangarajan Committee = Rs 972 (rural), Rs 1407 (urban) | Higher poverty estimate ~29.5% | Includes education & health',
      'Multidimensional Poverty Index = UNDP + Oxford | Health + Education + Living Standards | India: significant decline post-2005',
      'Disguised Unemployment = MPL = 0 (Marginal Product of Labour zero) | Common in agriculture | Removing workers won\'t reduce output',
      'HDI = Human Development Index | UNDP | Life expectancy + Education + Per Capita Income | India ranked ~134 out of 193',
      'MGNREGA = 100 days guaranteed employment | Rural households | Min wage | Demand-driven | Social audit mandatory | Est. 2005',
      'SDGs = 17 Sustainable Development Goals | UN 2015 | Target 2030 | India NITI Aayog SDG Index monitors progress',
      'Gig Economy = Platform-based workers | e-Shram portal (unorganized sector) | Code on Social Security 2020 covers gig workers',
    ],
  },
  'Reforms & Current Affairs': {
    title: 'Reforms & Current Affairs -- Recent Milestones',
    bullets: [
      'Demonetization 2016 = Rs 500 & 1000 notes banned (8 Nov) | Cashless push | New Rs 500 & 2000 notes | 86% currency scrapped',
      'GST 2017 = 1 July | 101st Constitutional Amendment | One Nation One Tax | GST Council under Art 279A',
      'e-Rupee (CBDC) = RBI Digital Currency | Wholesale (Nov 2022) | Retail (Dec 2022) | Blockchain-based | Legal tender',
      'India Stack = Aadhaar + UPI + DigiLocker + eKYC | Digital public infrastructure | JAM Trinity (Jan Dhan + Aadhaar + Mobile)',
      'FTA Tracker = India-UAE CEPA (2022) | India-Australia ECTA (2022) | RCEP (India opted out) | India-EFTA (2024)',
      'IBC 2016 = Insolvency & Bankruptcy Code | NCLT resolves | 330-day deadline | Replaced SICA, BIFR | Waterfall mechanism',
      'PLI Scheme = 14 sectors | Rs 1.97 lakh crore outlay | Mobile largest share | Boost exports & manufacturing',
      'Budget 2024-25 = Capex Rs 11.11 lakh crore | Fiscal deficit target 5.1% | Viksit Bharat 2047 vision | New tax regime default',
    ],
  },
}

export default function FastRevision() {
  const [activeTab, setActiveTab] = useState<EconCategory>('Basic Concepts')
  const studyEntries = econData.filter(e => !e.questionType)

  const cfg = CATEGORIES.find(c => c.key === activeTab)!
  const entries = studyEntries.filter(e => e.category === activeTab)
  const sheet = CHEATSHEET[activeTab]

  return (
    <section id="econ-fast" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-cyan-700 uppercase mb-1">Section 02 -- Fast Revision</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Category-wise Quick Recall</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            One tab per category. Cheat sheets on the left, entries with shortcuts on the right.
            Built for <strong>last-hour revision</strong> before exam.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => {
            const catCount = studyEntries.filter(e => e.category === c.key).length
            return (
              <button
                key={c.key}
                onClick={() => setActiveTab(c.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                  activeTab === c.key
                    ? `${c.accent} ring-2 ${c.ring} shadow-sm`
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}>
                <span>{c.icon}</span>
                <span className="hidden sm:inline">{c.key}</span>
                <span className="sm:hidden">{c.key.split(' ')[0]}</span>
                <span className="ml-1 opacity-60">({catCount})</span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-slide">

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
                      <span className="shrink-0 w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-[10px] font-extrabold text-cyan-700 mt-0.5">
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

function EntryCard({ entry: e, accentClass }: { entry: EconEntry; accentClass: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={() => setOpen(o => !o)}>
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="shrink-0 mt-0.5">
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${accentClass}`}>
            {e.topic}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">{e.question}</p>
          <p className="font-mnemonic text-xs text-cyan-700 mt-1 italic leading-tight">{e.shortcut}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`w-2 h-2 rounded-full ${PROB_DOT[e.examProb]}`} title={e.examProb}></span>
          <span className="text-slate-300 text-sm">{open ? '\u25B2' : '\u25BC'}</span>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 px-4 py-3 bg-slate-50 animate-fade-slide">
          <p className="text-sm font-bold text-slate-800 mb-2">{e.answer}</p>
          <p className="text-xs text-slate-600 leading-relaxed">{e.detail}</p>
          {e.place && (
            <p className="text-xs text-slate-500 mt-1">{e.place}</p>
          )}
          <p className="text-xs text-slate-400 mt-2">{e.context}
            <span className={`ml-2 font-bold ${PROB_TEXT[e.examProb]}`}> - {e.examProb}</span>
          </p>
        </div>
      )}
    </div>
  )
}
