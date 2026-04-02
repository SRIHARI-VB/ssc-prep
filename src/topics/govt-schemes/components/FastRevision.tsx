import { useState } from 'react'
import { schemesData, type SchemeCategory, type SchemeEntry } from '../data'

const CATEGORIES: {
  key: SchemeCategory
  icon: string
  color: string
  accent: string
  ring: string
  desc: string
}[] = [
  {
    key: 'Social Welfare',
    icon: '🏠',
    color: 'bg-indigo-50 border-indigo-200',
    accent: 'text-indigo-700 bg-indigo-100 border-indigo-200',
    ring: 'ring-indigo-400',
    desc: 'PMAY, Ayushman Bharat, Swachh Bharat, Ujjwala, PMGKAY, SVANidhi',
  },
  {
    key: 'Financial Inclusion',
    icon: '💰',
    color: 'bg-teal-50 border-teal-200',
    accent: 'text-teal-700 bg-teal-100 border-teal-200',
    ring: 'ring-teal-400',
    desc: 'Jan Dhan, MUDRA, Stand Up India, APY, PMJJBY, PMSBY, SSY',
  },
  {
    key: 'Agriculture',
    icon: '🌾',
    color: 'bg-green-50 border-green-200',
    accent: 'text-green-700 bg-green-100 border-green-200',
    ring: 'ring-green-400',
    desc: 'PM-KISAN, Fasal Bima, Soil Health Card, Matsya Sampada, e-NAM',
  },
  {
    key: 'Employment & Skill',
    icon: '🛠️',
    color: 'bg-orange-50 border-orange-200',
    accent: 'text-orange-700 bg-orange-100 border-orange-200',
    ring: 'ring-orange-400',
    desc: 'MGNREGA, PMKVY, Startup India, Make in India, Atmanirbhar Bharat',
  },
  {
    key: 'Education',
    icon: '📚',
    color: 'bg-blue-50 border-blue-200',
    accent: 'text-blue-700 bg-blue-100 border-blue-200',
    ring: 'ring-blue-400',
    desc: 'NEP 2020, Samagra Shiksha, PM POSHAN',
  },
  {
    key: 'Health',
    icon: '🏥',
    color: 'bg-rose-50 border-rose-200',
    accent: 'text-rose-700 bg-rose-100 border-rose-200',
    ring: 'ring-rose-400',
    desc: 'PM-ABHIM, ABDM, National Health Mission',
  },
  {
    key: 'Infrastructure',
    icon: '🏗️',
    color: 'bg-violet-50 border-violet-200',
    accent: 'text-violet-700 bg-violet-100 border-violet-200',
    ring: 'ring-violet-400',
    desc: 'Jal Jeevan Mission, AMRUT, Saubhagya, Gati Shakti',
  },
  {
    key: 'Women & Child',
    icon: '👩‍👧',
    color: 'bg-pink-50 border-pink-200',
    accent: 'text-pink-700 bg-pink-100 border-pink-200',
    ring: 'ring-pink-400',
    desc: 'Beti Bachao Beti Padhao, Mission Shakti, Mission Vatsalya',
  },
  {
    key: 'Digital India',
    icon: '📱',
    color: 'bg-cyan-50 border-cyan-200',
    accent: 'text-cyan-700 bg-cyan-100 border-cyan-200',
    ring: 'ring-cyan-400',
    desc: 'Digital India Programme, JAM Trinity',
  },
  {
    key: 'New Schemes 2024-26',
    icon: '🆕',
    color: 'bg-amber-50 border-amber-200',
    accent: 'text-amber-700 bg-amber-100 border-amber-200',
    ring: 'ring-amber-400',
    desc: 'PM Vishwakarma, Surya Ghar, Agnipath, NPS Vatsalya, ELI, PM SETU',
  },
]

const PROB_DOT: Record<string, string> = {
  Hot:       'bg-red-500',
  High:      'bg-orange-400',
  Confirmed: 'bg-green-500',
  Recurring: 'bg-blue-400',
}
const PROB_TEXT: Record<string, string> = {
  Hot:       'text-red-700',
  High:      'text-orange-700',
  Confirmed: 'text-green-700',
  Recurring: 'text-blue-700',
}

const CHEATSHEET: Record<SchemeCategory, { title: string; bullets: string[] }> = {
  'Social Welfare': {
    title: 'Key Social Welfare Schemes',
    bullets: [
      'PMAY = 2015 | Housing for All | Urban (MoHUA) + Gramin (Rural Dev) | PMAY-U 2.0 Sep 2024',
      'PM-JAY = 23 Sep 2018 | Rs 5 lakh health cover | 12 crore families | World\'s largest health scheme',
      'SBM = 2 Oct 2014 | Swachh Bharat | 10 crore+ toilets | ODF India | SBM-U 2.0: Rs 1.41 lakh crore',
      'PMUY = 1 May 2016 | Free LPG to BPL women | 10.33 crore beneficiaries | Rs 300 subsidy/cylinder',
      'PMGKAY = 26 Mar 2020 | Free ration | 81 crore people | Extended to Dec 2028 | Rs 2.03 lakh crore budget',
      'SVANidhi = Jun 2020 | Street vendor loans | Rs 10K→20K→50K | Extended to Mar 2030',
      'NFSA 2013 = Right to Food | Rice Rs 3, Wheat Rs 2, Coarse Rs 1/kg | 67% population',
      'SAGY = 11 Oct 2014 | MP adopts Gram Panchayat | No separate funding | Convergence model',
      'DAY-NRLM = 25 Sep 2014 | 10 crore women in SHGs | Rs 11 lakh crore credit | 98% repayment',
      'ADP = Jan 2018 | NITI Aayog | 112 districts | 3Cs: Convergence, Collaboration, Competition',
    ],
  },
  'Financial Inclusion': {
    title: 'Financial Inclusion — JAM + Insurance + Pension',
    bullets: [
      'PMJDY = 28 Aug 2014 | Zero-balance account | Free RuPay card | 56+ crore accounts | 56% women',
      'MUDRA = 8 Apr 2015 | Shishu-Kishore-Tarun | MUDRA 2.0: Rs 20 lakh limit | 68% women beneficiaries',
      'Stand Up India = 5 Apr 2016 | SC/ST + Women | Rs 10L-1Cr | Greenfield enterprises',
      'APY = 9 May 2015 | Rs 1K-5K pension | Age 18-40 | PFRDA | 7.65 crore subscribers',
      'PMJJBY = Rs 436/yr → Rs 2L life cover | PMSBY = Rs 20/yr → Rs 2L accident cover',
      'PM-SYM = 2019 | Rs 3K pension after 60 | Income < Rs 15K | 50:50 govt match | LIC manages',
      'SSY = 22 Jan 2015 | Girl child savings | 8.2% interest | EEE tax-free | Part of BBBP',
      'GST = 1 Jul 2017 | "One Nation One Tax" | Art 246A | CGST+SGST+IGST | Rates: 0/5/12/18/28% | 101st Amendment',
      'NPS = 2004 (govt), 2009 (all) | PFRDA | Tier-I + Tier-II | Sec 80CCD | Rs 14.65L crore AUM',
      'IBC 2016 = Insolvency code | NCLT adjudicates | IBBI regulates | 180+90 days resolution | Rs 3.55L crore recovered',
      'RERA 2016 = Real estate regulation | 70% in escrow | State-level authority | Carpet area mandatory',
      'FDI Policy = 100% auto in most sectors | Insurance 74% | Defence 74% | Multi-brand retail 51%',
      'SGB = RBI issues | 2.5% p.a. + gold price | Tax-free on maturity | 8 years tenure',
      'SCSS = Senior citizens | 8.2% rate | Rs 30 lakh max | 5-year tenure | Tax benefit u/s 80C',
      'ECLGS = COVID MSME credit | Rs 5 lakh crore | 1.19 crore MSMEs helped',
      'GIFT IFSC = Gujarat | IFSCA regulates | Tax-free zone | India\'s only global financial centre',
    ],
  },
  'Agriculture': {
    title: 'Agriculture Schemes — Income + Insurance + Market',
    bullets: [
      'PM-KISAN = Feb 2019 | Rs 6,000/yr (3 x Rs 2K) | 11+ crore families | Rs 4.27 lakh crore total',
      'PMFBY = Jan 2016 | Crop insurance | Kharif 2%, Rabi 1.5%, Commercial 5% | pmfby.gov.in',
      'Soil Health Card = Feb 2015 | 14 crore cards | 12 parameters tested | Every 2 years',
      'PMMSY = Sep 2020 | Blue Revolution | Rs 20,050 crore | Fisheries development',
      'e-NAM = Apr 2016 | Online mandi | 1,361 APMCs connected | Transparent price discovery',
      'KCC = 1998 | 4% effective rate (7% - 3% subvention) | Up to Rs 3 lakh | NABARD designed | Fishers & dairy included',
      'PM Kisan Sampada = Food processing | Rs 6,000 crore | Farm gate to retail | 19.14 lakh jobs',
    ],
  },
  'Employment & Skill': {
    title: 'Employment, Skills & Self-Reliance',
    bullets: [
      'MGNREGA = 2005 | 100 days guaranteed wage | Rural households | VB-G RAM G 2025: 125 days',
      'PMKVY = 2015 | MSDE | PMKVY 4.0 merged with PM-NAPS + JSS | 1.63 crore trained',
      'Startup India = 16 Jan 2016 | 3-yr tax holiday | Fund of Funds Rs 10K crore | DPIIT',
      'Make in India = 25 Sep 2014 | 4 pillars | 27 sectors (2.0) | PLI across 14 sectors',
      'Atmanirbhar Bharat = 12 May 2020 | Rs 20 lakh crore | Self-Reliant India | COVID response',
      'PLI Scheme = 2020 | 14 sectors | Rs 1.97 lakh crore | 12 lakh jobs | Make in India booster',
      'PM MITRA = 7 mega textile parks | 5F: Farm→Fibre→Factory→Fashion→Foreign | Rs 4,445 crore',
    ],
  },
  'Education': {
    title: 'Education Schemes — NEP + Mid-Day Meal',
    bullets: [
      'NEP 2020 = 29 Jul 2020 | 5+3+3+4 structure | Mother tongue till Class 5 | 6% GDP target',
      'Samagra Shiksha = 2018 | Merged SSA+RMSA+TE | Pre-school to XII | Rs 2.94 lakh crore',
      'PM POSHAN = Sep 2021 | Replaced Mid-Day Meal | 11.8 crore children | TithiBhojan concept',
    ],
  },
  'Health': {
    title: 'Health Infrastructure & Digital Health',
    bullets: [
      'PM-ABHIM = Oct 2021 | Rs 64,180 crore | Health infra village→district | 1.78 lakh Arogya Mandirs',
      'ABDM = 27 Sep 2021 | ABHA health ID | Digital health records | NHA implements | abdm.gov.in',
      'NHM = 2013 | NRHM + NUHM | ASHA workers | JSY for institutional delivery | Free drugs',
      'PMSMA = 9 Jun 2016 | Free antenatal care on 9th of every month | MMR: 130 → 80',
      'PMBJP = Janaushadhi Kendras | 10,000+ outlets | 50-90% cheaper generic medicines',
    ],
  },
  'Infrastructure': {
    title: 'Water, Power & Connectivity Infrastructure',
    bullets: [
      'JJM = 15 Aug 2019 | Har Ghar Jal | 55 LPCD | 80% coverage | Extended to 2028',
      'AMRUT 2.0 = 2021-26 | Rs 2.99 lakh crore | Water-secure cities | 500 cities | MoHUA',
      'Saubhagya = Oct 2017 | Electricity for all | 2.86 crore homes | CLOSED Mar 2022',
      'Gati Shakti = Oct 2021 | 16 ministries on GIS | Rs 100 lakh crore NIP | Multimodal connectivity',
      'PMGSY = Dec 2000 (Vajpayee) | All-weather rural roads | PMGSY-IV: Rs 70,125 crore | 7.87L km done',
      'Smart Cities = Jun 2015 | 100 cities | Rs 47,652 crore | ICCCs in all cities',
      'Namami Gange = Jun 2014 | Rs 22,500 crore | NMCG | UN top 10 restoration | Arth Ganga model',
      'SVAMITVA = Apr 2020 | Drones for rural land mapping | 1.63 crore property cards | Min of Panchayati Raj',
      'UDAN = Oct 2016 | Regional air connectivity | 663 routes | "Hawai Chappal to Hawai Jahaz"',
      'Sagarmala = 2015 | Port-led development | Rs 5.79 lakh crore | Inland waterway cargo up 700%',
      'Bharatmala = 2017 | 34,800 km highways | Rs 6.92 lakh crore | 550 district HQs connected',
      'Kavach = RDSO developed | SIL-4 train collision avoidance | Target: 30,000 km by 2027-28',
      'Vande Bharat = Feb 2019 | ICF Chennai | 160 kmph | 164 services | 90% localization',
      'FAME/PM E-DRIVE = EV incentives | FAME-II closed Sep 2024 | PM E-DRIVE Rs 10,900 crore | 2-wheelers 50% of EVs',
      'SEZ Act 2005 = Tax holidays | 268 operational | DESH Bill proposed | Rs 1.57 lakh crore exports',
      'NIP = National Infrastructure Pipeline | Rs 111 lakh crore | 9,142 projects | 2020-25',
      'Vadhavan Port = 13th major port | Maharashtra | Rs 76,220 crore | 298 MTPA capacity | India\'s largest',
    ],
  },
  'Women & Child': {
    title: 'Women Safety, Empowerment & Child Protection',
    bullets: [
      'BBBP = 22 Jan 2015 | Panipat | Tri-ministry: WCD+Health+Education | Now under Mission Shakti',
      'Mission Shakti = 2021-26 | Sambal (safety) + Samarthya (empowerment) | Umbrella WCD scheme',
      'Mission Vatsalya = Child protection + Juvenile justice + CARA adoption',
      'Saksham Anganwadi & POSHAN 2.0 = Upgraded ICDS + POSHAN Abhiyaan | Poshan Tracker app',
      'Mahila Samman Savings = Budget 2023 | 7.5% interest | Rs 2 lakh max | 2-year deposit | Women/girls only',
    ],
  },
  'Digital India': {
    title: 'Digital Transformation — India Stack',
    bullets: [
      'Digital India = 1 Jul 2015 | MeitY | BharatNet 2.18L GPs | DigiLocker 53 crore users',
      'JAM Trinity = Jan Dhan + Aadhaar + Mobile | DBT backbone | Rs 6.9 lakh crore in FY25',
      'UPI = 1,867 crore txns worth Rs 24.77 lakh crore (Apr 2025) | Data: Rs 308/GB → Rs 9.34/GB',
    ],
  },
  'New Schemes 2024-26': {
    title: 'Latest Schemes — Must Know for 2025-26 Exam',
    bullets: [
      'PM Vishwakarma = 17 Sep 2023 | 18 artisan trades | Rs 15K toolkit + Rs 1L-2L loans | 30L registered',
      'PM Surya Ghar = 15 Feb 2024 | Rs 75K crore | 300 units free/month | 1 crore homes by 2027',
      'Agnipath = Jun 2022 | 4-yr military service | Agniveers | 25% retained | Rs 11.71L Seva Nidhi',
      'Ayushman Vaya Vandana = Oct 2024 | PM-JAY for all 70+ citizens | Regardless of income',
      'NPS Vatsalya = Sep 2024 | NPS for minors | Min Rs 1K/yr | Converts to NPS at age 18',
      'PM SETU = Budget 2025 | Rs 60K crore | 1,000 ITIs modernized | AI, Robotics, Green Energy',
      'ELI Scheme = Jul 2025 | Rs 99,446 crore | 3.5 crore jobs | Manufacturing focus',
      'UPS = Aug 2024 | 50% avg basic pay pension | Min Rs 10K/month | Effective 1 Apr 2025',
      'PM Internship = Oct 2024 | 1 crore internships | Top 500 companies | Rs 5K/month stipend',
      'Green Hydrogen Mission = Jan 2023 | Rs 19,744 crore | 5 MMT/yr by 2030 | 125 GW RE',
      'Semiconductor Mission = Dec 2021 | Rs 76,000 crore | 50% project cost subsidy | Tata, Micron fabs',
      'PM E-DRIVE = Sep 2024 | Rs 10,900 crore | Replaced FAME | EV incentives for 2-wheelers, 3-wheelers, buses, trucks',
      'PM-DevINE = Oct 2022 | Rs 6,600 crore for North-East | 8 NE states | MDoNER ministry',
      'Vivad se Vishwas 2.0 = Oct 2024 | Tax dispute resolution | Reduced penalty | Rs 1.20 lakh crore settled',
      'Mahila Samman Savings = Budget 2023 | 7.5% interest | Rs 2 lakh max | 2-year tenure | Women/girls only',
      'Vadhavan Port = Budget 2024 | Rs 76,220 crore | 13th major port | Maharashtra | PPP model',
    ],
  },
}

export default function FastRevision() {
  const [activeTab, setActiveTab] = useState<SchemeCategory>('Social Welfare')

  const cfg = CATEGORIES.find(c => c.key === activeTab)!
  const entries = schemesData.filter(e => e.category === activeTab)
  const sheet   = CHEATSHEET[activeTab]

  return (
    <section id="gs-fast" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-1">Section 02 -- Fast Revision</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Category-wise Quick Recall</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            One tab per category. Cheat sheet on the left, all entries with shortcuts on the right.
            Built for <strong>last-hour revision</strong> before exam.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => (
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
              <span className="ml-1 opacity-60">
                ({schemesData.filter(e => e.category === c.key).length})
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-slide">

          <div className={`lg:col-span-2 rounded-2xl border p-5 ${cfg.color}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{cfg.icon}</span>
              <div>
                <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">{activeTab}</p>
                <h3 className="text-base font-extrabold text-slate-800">{sheet.title}</h3>
              </div>
            </div>
            <ul className="space-y-2">
              {sheet.bullets.map((b, i) => {
                const [before, ...rest] = b.split('=')
                const after = rest.join('=')
                return (
                  <li key={i} className="flex gap-2 text-sm leading-snug">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-white/70 flex items-center justify-center text-[10px] font-extrabold text-slate-500 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-slate-700">
                      {after ? (
                        <>
                          <strong className="text-slate-900">{before.trim()}</strong>
                          <span className="text-slate-500"> = </span>
                          <span>{after.trim()}</span>
                        </>
                      ) : (
                        <span>{b}</span>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>

            <div className="mt-5 pt-4 border-t border-black/10 flex gap-3 flex-wrap">
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
          </div>
        </div>

      </div>
    </section>
  )
}

function EntryCard({ entry: e, accentClass }: { entry: SchemeEntry; accentClass: string }) {
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
