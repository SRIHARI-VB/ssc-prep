import type { Page } from '../types'

interface Props {
  setPage: (p: Page) => void
}

const TOPICS = [
  {
    id: 'books-authors' as Page,
    icon: '📚',
    label: 'Books & Authors',
    badge: 'Topic 01',
    accent: 'from-indigo-600 to-violet-700',
    border: 'border-indigo-500/30',
    ring: 'ring-indigo-500/20',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    stats: ['98 high-priority entries', '6 categories', 'PYQ 2021–2024'],
    desc: 'Ancient/Medieval texts, Freedom Struggle authors, Literary Awards (Booker, Jnanpith), Sports autobiographies & Current Affairs.',
    status: 'live',
    statusLabel: 'Live',
  },
  {
    id: 'science-tech' as Page,
    icon: '🔬',
    label: 'Science & Technology',
    badge: 'Topic 02',
    accent: 'from-teal-600 to-cyan-700',
    border: 'border-teal-500/30',
    ring: 'ring-teal-500/20',
    badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    stats: ['85 facts & PYQs', '5 subjects', 'ISRO/DRDO 2024–25'],
    desc: 'Physics, Chemistry, Biology fundamentals + Space missions (Chandrayaan, Aditya-L1, SpaDeX) & Defence technology.',
    status: 'live',
    statusLabel: 'Live',
  },
  {
    id: 'home' as Page, // placeholder, won't navigate
    icon: '⚖️',
    label: 'Polity & Constitution',
    badge: 'Topic 03',
    accent: 'from-slate-600 to-slate-700',
    border: 'border-slate-600/30',
    ring: 'ring-slate-500/10',
    badgeColor: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
    stats: ['Coming soon', '', ''],
    desc: 'Fundamental Rights, DPSP, Constitutional bodies, Amendments, Parliament & Executive.',
    status: 'coming',
    statusLabel: 'Coming Soon',
  },
  {
    id: 'home' as Page,
    icon: '🌍',
    label: 'Geography',
    badge: 'Topic 04',
    accent: 'from-slate-600 to-slate-700',
    border: 'border-slate-600/30',
    ring: 'ring-slate-500/10',
    badgeColor: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
    stats: ['Coming soon', '', ''],
    desc: 'Physical Geography, Indian rivers, soils, climate, World Geography & Economic Geography.',
    status: 'coming',
    statusLabel: 'Coming Soon',
  },
  {
    id: 'home' as Page,
    icon: '📜',
    label: 'History',
    badge: 'Topic 05',
    accent: 'from-slate-600 to-slate-700',
    border: 'border-slate-600/30',
    ring: 'ring-slate-500/10',
    badgeColor: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
    stats: ['Coming soon', '', ''],
    desc: 'Ancient, Medieval & Modern Indian History, Freedom Movement & World History.',
    status: 'coming',
    statusLabel: 'Coming Soon',
  },
  {
    id: 'home' as Page,
    icon: '💰',
    label: 'Economy',
    badge: 'Topic 06',
    accent: 'from-slate-600 to-slate-700',
    border: 'border-slate-600/30',
    ring: 'ring-slate-500/10',
    badgeColor: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
    stats: ['Coming soon', '', ''],
    desc: 'Macro & Micro Economics, Budget, Banking, Inflation, GDP & International Trade.',
    status: 'coming',
    statusLabel: 'Coming Soon',
  },
]

export default function Home({ setPage }: Props) {
  const liveTopics = TOPICS.filter(t => t.status === 'live')
  const soonTopics = TOPICS.filter(t => t.status === 'coming')

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-900 via-slate-900 to-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4">
            SSC CGL 2025–26 Prep Hub
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            General Awareness
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-teal-400 to-cyan-400 mt-1">
              Quick Recall Engine
            </span>
          </h1>
          <p className="mt-5 text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Topic-wise flash revision for SSC CGL Tier 1 GA section.
            Each topic is a standalone drill station — Flashcards + MCQ Loop + PYQ Analysis.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { n: '183+', label: 'Total Facts' },
              { n: '6', label: 'Categories per Topic' },
              { n: '2021–25', label: 'PYQ Range' },
              { n: '2', label: 'Live Topics' },
            ].map(s => (
              <div key={s.label} className="text-center px-5 py-3 bg-white/5 border border-white/10 rounded-2xl min-w-[90px]">
                <p className="text-2xl font-extrabold text-white">{s.n}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Topics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-teal-500"></div>
          <h2 className="text-xl font-extrabold text-brand-900">Ready to Drill</h2>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            {liveTopics.length} Live
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {liveTopics.map(topic => (
            <button
              key={topic.label}
              onClick={() => setPage(topic.id)}
              className={`text-left bg-brand-900 rounded-2xl p-6 border ${topic.border} ring-2 ${topic.ring} hover:ring-4 hover:scale-[1.01] transition-all duration-200 group relative overflow-hidden`}
            >
              {/* Gradient accent top bar */}
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
                {topic.stats.filter(Boolean).map(s => (
                  <span key={s} className="text-xs text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>

              <div className={`mt-5 flex items-center gap-2 text-sm font-bold bg-gradient-to-r ${topic.accent} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                Start Drilling
                <span className="text-slate-400 group-hover:text-white transition-colors">→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="flex items-center gap-3 mt-12 mb-6">
          <div className="w-1 h-6 rounded-full bg-slate-400"></div>
          <h2 className="text-xl font-extrabold text-brand-900">Coming Soon</h2>
          <span className="text-xs font-bold text-slate-500 bg-slate-200 border border-slate-300 px-2 py-0.5 rounded-full">
            {soonTopics.length} planned
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {soonTopics.map(topic => (
            <div key={topic.label}
              className="bg-white rounded-2xl p-5 border border-slate-200 opacity-60 cursor-not-allowed relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-300" />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl">
                  {topic.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400">{topic.badge}</span>
                  <h3 className="text-sm font-bold text-slate-600">{topic.label}</h3>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{topic.desc}</p>
              <div className="mt-3 text-xs font-semibold text-slate-400">🔒 Coming soon</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
