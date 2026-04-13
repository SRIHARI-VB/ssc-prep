import type { Page } from '../types'
import { booksData } from '../topics/books-authors/data'
import { sciData } from '../topics/science-tech/data'
import { polityData } from '../topics/polity-constitution/data'
import { schemesData } from '../topics/govt-schemes/data'
import { budgetData } from '../topics/union-budget/data'
import { geoData } from '../topics/geography/data'
import { historyData } from '../topics/history/data'
import { econData } from '../topics/economics/data'
import { riData } from '../topics/reports-indices/data'
import { miData } from '../topics/music-instruments/data'
import { danceData } from '../topics/dances/data'
import { sportsData } from '../topics/sports/data'
import { englishQuestions } from '../topics/english/data'

const _booksCount   = booksData.length
const _sciCount     = sciData.length
const _polityCount  = polityData.length
const _schemesCount = schemesData.length
const _budgetCount  = budgetData.length
const _geoCount     = geoData.length
const _historyCount = historyData.length
const _econCount    = econData.length
const _riCount      = riData.length
const _miCount      = miData.length
const _danceCount   = danceData.length
const _sportsCount  = sportsData.length
const _engCount     = englishQuestions.length
const _gaTotal      = _booksCount + _sciCount + _polityCount + _schemesCount + _budgetCount + _geoCount + _historyCount + _econCount + _riCount + _miCount + _danceCount + _sportsCount

interface Props {
  setPage: (p: Page) => void
}

const GA_TOPICS = [
  {
    id: 'books-authors' as Page,
    icon: '📚', label: 'Books & Authors', badge: 'Topic 01',
    accent: 'from-indigo-600 to-violet-700', border: 'border-indigo-500/30', ring: 'ring-indigo-500/20',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    stats: [`${_booksCount} entries`, '6 categories', 'PYQ 2021–2024'],
    desc: 'Ancient/Medieval texts, Freedom Struggle authors, Literary Awards (Booker, Jnanpith), Sports autobiographies & Current Affairs.',
  },
  {
    id: 'science-tech' as Page,
    icon: '🔬', label: 'Science & Technology', badge: 'Topic 02',
    accent: 'from-teal-600 to-cyan-700', border: 'border-teal-500/30', ring: 'ring-teal-500/20',
    badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    stats: [`${_sciCount} facts & PYQs`, '5 subjects', 'ISRO/DRDO 2024–25'],
    desc: 'Physics, Chemistry, Biology fundamentals + Space missions (Chandrayaan, Aditya-L1, SpaDeX) & Defence technology.',
  },
  {
    id: 'polity-constitution' as Page,
    icon: '⚖️', label: 'Polity & Constitution', badge: 'Topic 03',
    accent: 'from-amber-600 to-orange-700', border: 'border-amber-500/30', ring: 'ring-amber-500/20',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    stats: [`${_polityCount} entries`, '7 categories', 'PYQ 2021–2024'],
    desc: 'Fundamental Rights, DPSP, Constitutional bodies, Amendments, Parliament & Executive, SC Judgments 2024-25.',
  },
  {
    id: 'govt-schemes' as Page,
    icon: '🏛️', label: 'Government Schemes', badge: 'Topic 04',
    accent: 'from-emerald-600 to-teal-700', border: 'border-emerald-500/30', ring: 'ring-emerald-500/20',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    stats: [`${_schemesCount} schemes`, '10 categories', 'PYQ 2021-2024'],
    desc: 'PM Awas, Ayushman Bharat, Jan Dhan, MUDRA, PM-KISAN, Ujjwala, Swachh Bharat, PLI, Smart Cities, Kavach, Vande Bharat & latest 2024-26 schemes.',
  },
  {
    id: 'union-budget' as Page,
    icon: '💰', label: 'Union Budget 2025-26 & 2026-27', badge: 'Topic 05',
    accent: 'from-amber-600 to-orange-700', border: 'border-amber-500/30', ring: 'ring-amber-500/20',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    stats: [`${_budgetCount} facts`, '11 categories', 'PYQ 2021-2026'],
    desc: 'Both FY 2025-26 & 2026-27 budgets — tax slabs, fiscal deficit, Rs 53.47L Cr expenditure, new schemes, defence, infrastructure & budget terminology.',
  },
  {
    id: 'geography' as Page,
    icon: '🌍', label: 'Geography', badge: 'Topic 06',
    accent: 'from-emerald-600 to-teal-700', border: 'border-emerald-500/30', ring: 'ring-emerald-500/20',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    stats: [`${_geoCount} entries`, '12 categories', 'PYQ 2019-2024'],
    desc: 'Indian Rivers, Mountains & Passes, Soils, National Parks, Agriculture, Minerals, Dams, World Geography, Straits, Transport & Current Affairs.',
  },
  {
    id: 'history' as Page,
    icon: '📜', label: 'History', badge: 'Topic 07',
    accent: 'from-amber-700 to-orange-800', border: 'border-amber-500/30', ring: 'ring-amber-500/20',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    stats: [`${_historyCount} entries`, '7 categories', 'PYQ 2019-2024'],
    desc: 'Ancient India (IVC, Vedic, Maurya, Gupta), Medieval (Sultanate, Mughals), Modern India, Freedom Struggle, Art & Culture, Battles & Wars. Timeline & Atlas.',
  },
  {
    id: 'economics' as Page,
    icon: '📈', label: 'Economics', badge: 'Topic 08',
    accent: 'from-cyan-600 to-teal-700', border: 'border-cyan-500/30', ring: 'ring-cyan-500/20',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    stats: [`${_econCount} entries`, '10 categories', 'PYQ 2019-2024'],
    desc: 'GDP/GNP, Banking & RBI, Fiscal Policy & GST, International Trade, Agriculture Revolutions, Industry, Financial Markets, Current Affairs 2024-26.',
  },
  {
    id: 'reports-indices' as Page,
    icon: '📋', label: 'Reports & Indices', badge: 'Topic 09',
    accent: 'from-violet-600 to-purple-700', border: 'border-violet-500/30', ring: 'ring-violet-500/20',
    badgeColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    stats: [`${_riCount} indices`, '20+ orgs', 'PYQ 2019-2026'],
    desc: 'HDI, GHI, Happiness Index, Gender Gap, CPI, Ease of Business, Innovation Index, Press Freedom — India ranks, publishing orgs & HQs, current affairs 2024-26.',
  },
  {
    id: 'music-instruments' as Page,
    icon: '🎵', label: 'Music & Instruments', badge: 'Topic 10',
    accent: 'from-rose-600 to-pink-700', border: 'border-rose-500/30', ring: 'ring-rose-500/20',
    badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    stats: [`${_miCount} entries`, 'Gharanas & Trinity', 'PYQ 2019-2026'],
    desc: 'Tata/Sushira/Avanaddha/Ghana classification, Hindustani gharanas, Carnatic trinity, famous musicians, Padma/Grammy awards, instrument origins on map.',
  },
  {
    id: 'dances' as Page,
    icon: '💃', label: 'Dances', badge: 'Topic 11',
    accent: 'from-fuchsia-600 to-pink-700', border: 'border-fuchsia-500/30', ring: 'ring-fuchsia-500/20',
    badgeColor: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20',
    stats: [`${_danceCount} entries`, 'State-wise map', 'PYQ 2019-2026'],
    desc: '8 classical dances, ALL state-wise folk dances, famous dancers, UNESCO heritage, Padma awards, guru-state mapping with interactive India map.',
  },
  {
    id: 'sports' as Page,
    icon: '🏅', label: 'Sports', badge: 'Topic 12',
    accent: 'from-orange-600 to-amber-700', border: 'border-orange-500/30', ring: 'ring-orange-500/20',
    badgeColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    stats: [`${_sportsCount} entries`, 'Olympics 2020-2024', 'PYQ 2019-2026'],
    desc: 'Rules & player counts, Olympic/CWG/Asian Games medalists, Arjuna/Khel Ratna/Dronacharya awards 2023-26, major venues, sports events in India.',
  },
]

/* ── Inline SVGs for the aptitude cards ─────────────────────────────── */
function MathsSVG() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full" fill="none">
      {/* Triangle */}
      <polygon points="10,75 50,15 90,75" stroke="#93c5fd" strokeWidth="2" fill="#1e3a5f" opacity="0.5"/>
      <text x="50" y="12" textAnchor="middle" fill="#93c5fd" fontSize="7" fontWeight="bold">A</text>
      <text x="5" y="82" fill="#93c5fd" fontSize="7" fontWeight="bold">B</text>
      <text x="93" y="82" fill="#93c5fd" fontSize="7" fontWeight="bold">C</text>
      {/* Right angle mark */}
      <polyline points="80,75 80,65 90,65" stroke="#60a5fa" strokeWidth="1.5" fill="none"/>
      {/* Formula */}
      <text x="60" y="50" fill="#dbeafe" fontSize="6" fontFamily="monospace">a²+b²=c²</text>
      {/* Circle */}
      <circle cx="100" cy="30" r="15" stroke="#fbbf24" strokeWidth="1.5" fill="none" strokeDasharray="3,2"/>
      <line x1="100" y1="30" x2="115" y2="30" stroke="#fbbf24" strokeWidth="1"/>
      <text x="107" y="28" fill="#fbbf24" fontSize="5">r</text>
    </svg>
  )
}

function ReasoningSVG() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full" fill="none">
      {/* Venn diagram */}
      <circle cx="42" cy="45" r="25" stroke="#6ee7b7" strokeWidth="2" fill="#064e3b" opacity="0.4"/>
      <circle cx="68" cy="45" r="25" stroke="#6ee7b7" strokeWidth="2" fill="#064e3b" opacity="0.4"/>
      <text x="32" y="48" fill="#6ee7b7" fontSize="7" fontWeight="bold">A</text>
      <text x="78" y="48" fill="#6ee7b7" fontSize="7" fontWeight="bold">B</text>
      {/* Compass arrow */}
      <line x1="105" y1="70" x2="105" y2="20" stroke="#fbbf24" strokeWidth="1.5"/>
      <polygon points="105,18 101,26 109,26" fill="#fbbf24"/>
      <text x="105" y="15" textAnchor="middle" fill="#fbbf24" fontSize="6" fontWeight="bold">N</text>
      <text x="105" y="80" textAnchor="middle" fill="#fbbf24" fontSize="5">S</text>
      {/* Dice face */}
      <rect x="5" y="10" width="20" height="20" rx="3" stroke="#a78bfa" strokeWidth="1.5" fill="#1e1b4b" opacity="0.6"/>
      <circle cx="11" cy="16" r="1.5" fill="#a78bfa"/>
      <circle cx="19" cy="24" r="1.5" fill="#a78bfa"/>
      <circle cx="15" cy="20" r="1.5" fill="#a78bfa"/>
    </svg>
  )
}

export default function Home({ setPage }: Props) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* ───────── Hero ───────── */}
      <div className="bg-gradient-to-br from-brand-900 via-slate-900 to-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4">
            SSC CGL 2025–26 Prep Hub
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            SSC CGL
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-teal-400 to-cyan-400 mt-1">
              Complete Prep Engine
            </span>
          </h1>
          <p className="mt-5 text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            All four CGL sections — GA, QA, LR &amp; English.
            Visual flashcards, formula banks, MCQ drills &amp; PYQ analysis.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { n: `${_gaTotal}+`, label: 'GA Facts' },
              { n: '12', label: 'GA Topics' },
              { n: '17', label: 'Maths Topics' },
              { n: '20', label: 'Reasoning Topics' },
              { n: `${_engCount}+`, label: 'English Qs' },
            ].map(s => (
              <div key={s.label} className="text-center px-5 py-3 bg-white/5 border border-white/10 rounded-2xl min-w-[90px]">
                <p className="text-2xl font-extrabold text-white">{s.n}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* ═══════════════════════════════════════════════════════════════
            LEARN MODE  (Banner card)
           ═══════════════════════════════════════════════════════════════ */}
        <div>
          <button
            onClick={() => setPage('learn')}
            className="w-full text-left rounded-2xl overflow-hidden group relative hover:scale-[1.005] transition-all duration-200"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-violet-800 to-purple-900" />
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400" />
            <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <span className="text-[10px] font-bold tracking-widest text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                  NEW &middot; LEARN MODE
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-3 flex items-center gap-3">
                  <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl shadow-lg">
                    📖
                  </span>
                  Concept Study Path
                </h3>
                <p className="text-sm text-indigo-100/80 leading-relaxed mt-3 max-w-lg">
                  Don't just recall &mdash; <strong className="text-white">learn concepts in order</strong> like a textbook.
                  Only PYQ-important topics. Tap any term for a brief. Review every 3 days with spaced repetition.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['15 Chapters', 'PYQ Focused', '3-Day Review', 'Glossary Drawer', 'Progress Tracking'].map(s => (
                    <span key={s} className="text-[10px] text-indigo-200 bg-white/10 border border-white/10 px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-indigo-300 group-hover:gap-3 transition-all">
                  Start Learning
                  <span className="text-indigo-400 group-hover:text-white transition-colors">&rarr;</span>
                </div>
              </div>
              {/* Right side illustration */}
              <div className="hidden md:flex items-center gap-3 shrink-0 opacity-60 group-hover:opacity-90 transition-opacity">
                <div className="flex flex-col gap-2">
                  {['📈 Economics', '⚖️ Polity', '🏛️ Schemes', '📜 History'].map(ch => (
                    <span key={ch} className="text-xs text-indigo-200 bg-white/10 px-3 py-1.5 rounded-lg">{ch}</span>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {['🌍 Geography', '🔬 Science', '🎵 Music', '💃 Dances'].map(ch => (
                    <span key={ch} className="text-xs text-indigo-200 bg-white/10 px-3 py-1.5 rounded-lg">{ch}</span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 — APTITUDE & REASONING  (Banner cards)
           ═══════════════════════════════════════════════════════════════ */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-emerald-500" />
            <h2 className="text-xl font-extrabold text-brand-900">Aptitude, Reasoning &amp; English</h2>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
              Practice-Based
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ── Quantitative Aptitude Card ── */}
            <button
              onClick={() => setPage('quantitative-aptitude')}
              className="text-left rounded-2xl overflow-hidden group relative hover:scale-[1.01] transition-all duration-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-800 to-blue-900" />
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500" />
              <div className="relative p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-blue-300 bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 rounded-full">
                      SECTION 2 &middot; QUANTITATIVE APTITUDE
                    </span>
                    <h3 className="text-2xl font-extrabold text-white mt-3 flex items-center gap-3">
                      <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg">
                        📊
                      </span>
                      Quantitative Aptitude
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-blue-300 bg-blue-400/15 border border-blue-400/25 px-2.5 py-1 rounded-full shrink-0">
                    ● Live
                  </span>
                </div>

                <div className="flex gap-6 mt-5">
                  <div className="flex-1">
                    <p className="text-sm text-blue-100/80 leading-relaxed">
                      Visual formula bank with <strong className="text-white">SVG illustrations</strong> for every geometry shape &amp; mensuration solid.
                      Trig value tables, Squares 1&sup2;-30&sup2;, Cubes 1&sup3;-15&sup3; with repeat testing. Priority-ranked by PYQ frequency.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {['17 Topics', 'Visual Formulas', 'Shapes Gallery', 'Trig Table', 'Squares & Cubes', 'PYQ Practice'].map(s => (
                        <span key={s} className="text-[10px] text-blue-200 bg-white/10 border border-white/10 px-2 py-0.5 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-sm font-bold text-blue-300 group-hover:gap-3 transition-all">
                      Open Visual Formula Bank
                      <span className="text-blue-400 group-hover:text-white transition-colors">&rarr;</span>
                    </div>
                  </div>
                  {/* SVG decoration */}
                  <div className="hidden md:block w-28 h-28 shrink-0 opacity-60 group-hover:opacity-90 transition-opacity">
                    <MathsSVG />
                  </div>
                </div>
              </div>
            </button>

            {/* ── Logical Reasoning Card ── */}
            <button
              onClick={() => setPage('logical-reasoning')}
              className="text-left rounded-2xl overflow-hidden group relative hover:scale-[1.01] transition-all duration-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-teal-800 to-emerald-900" />
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-500" />
              <div className="relative p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      SECTION 3 &middot; LOGICAL REASONING
                    </span>
                    <h3 className="text-2xl font-extrabold text-white mt-3 flex items-center gap-3">
                      <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl shadow-lg">
                        🧩
                      </span>
                      Logical Reasoning
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-400/15 border border-emerald-400/25 px-2.5 py-1 rounded-full shrink-0">
                    ● Live
                  </span>
                </div>

                <div className="flex gap-6 mt-5">
                  <div className="flex-1">
                    <p className="text-sm text-emerald-100/80 leading-relaxed">
                      Concept method cards with <strong className="text-white">visual guides</strong> — compass diagrams, Venn diagrams, dice nets,
                      seating arrangements, mirror/water images. Pattern-based quiz &amp; PYQ practice.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {['20 Topics', 'Visual Guides', 'Concept Cards', 'Pattern Quiz', 'Clock & Calendar', 'PYQ Practice'].map(s => (
                        <span key={s} className="text-[10px] text-emerald-200 bg-white/10 border border-white/10 px-2 py-0.5 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-300 group-hover:gap-3 transition-all">
                      Open Concept Cards
                      <span className="text-emerald-400 group-hover:text-white transition-colors">&rarr;</span>
                    </div>
                  </div>
                  {/* SVG decoration */}
                  <div className="hidden md:block w-28 h-28 shrink-0 opacity-60 group-hover:opacity-90 transition-opacity">
                    <ReasoningSVG />
                  </div>
                </div>
              </div>
            </button>

            {/* ── English Language Card ── */}
            <button
              onClick={() => setPage('english')}
              className="text-left rounded-2xl overflow-hidden group relative hover:scale-[1.01] transition-all duration-200 md:col-span-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-700 via-pink-800 to-rose-900" />
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500" />
              <div className="relative p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-rose-300 bg-rose-500/20 border border-rose-500/30 px-2 py-0.5 rounded-full">
                      SECTION 4 &middot; ENGLISH LANGUAGE
                    </span>
                    <h3 className="text-2xl font-extrabold text-white mt-3 flex items-center gap-3">
                      <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-2xl shadow-lg">
                        📖
                      </span>
                      English Language
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-rose-300 bg-rose-400/15 border border-rose-400/25 px-2.5 py-1 rounded-full shrink-0">
                    ● Live
                  </span>
                </div>
                <div className="flex gap-6 mt-5">
                  <div className="flex-1">
                    <p className="text-sm text-rose-100/80 leading-relaxed">
                      Interactive learning — <strong className="text-white">Grammar Gym</strong> (fix sentences, learn rules),
                      <strong className="text-white"> Word Explorer</strong> (reveal &amp; assess vocabulary),
                      Reading Zone (comprehension &amp; cloze). 14 question types, Easy→Hard difficulty, Tier 1 + Tier 2 coverage.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {['14 Question Types', 'Word Explorer', 'Grammar Gym', 'Reading Zone', 'Easy → Hard', `${_engCount} Questions`].map(s => (
                        <span key={s} className="text-[10px] text-rose-200 bg-white/10 border border-white/10 px-2 py-0.5 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-sm font-bold text-rose-300 group-hover:gap-3 transition-all">
                      Start Interactive Practice
                      <span className="text-rose-400 group-hover:text-white transition-colors">&rarr;</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — GENERAL AWARENESS  (Grid cards)
           ═══════════════════════════════════════════════════════════════ */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-teal-500" />
            <h2 className="text-xl font-extrabold text-brand-900">General Awareness</h2>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              {GA_TOPICS.length} Topics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {GA_TOPICS.map(topic => (
              <button
                key={topic.label}
                onClick={() => setPage(topic.id)}
                className={`text-left bg-brand-900 rounded-2xl p-6 border ${topic.border} ring-2 ${topic.ring} hover:ring-4 hover:scale-[1.01] transition-all duration-200 group relative overflow-hidden`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${topic.accent}`} />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.accent} flex items-center justify-center text-2xl shadow-lg`}>
                      {topic.icon}
                    </div>
                    <div>
                      <span className={`text-[10px] font-bold tracking-widest border px-2 py-0.5 rounded-full ${topic.badgeColor}`}>
                        {topic.badge}
                      </span>
                      <h3 className="text-lg font-extrabold text-white mt-1">{topic.label}</h3>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded-full shrink-0">
                    ● Live
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-4 leading-relaxed">{topic.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {topic.stats.map(s => (
                    <span key={s} className="text-xs text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
                <div className={`mt-5 flex items-center gap-2 text-sm font-bold bg-gradient-to-r ${topic.accent} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                  Start Drilling
                  <span className="text-slate-400 group-hover:text-white transition-colors">&rarr;</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
