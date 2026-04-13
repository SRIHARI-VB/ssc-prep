import type { Page } from '../../types'

interface Props {
  page: Page
  setPage: (p: Page) => void
}

const PAGE_CONFIG: Record<Page, {
  icon: string; accent: string; label: string; bg: string;
  links: { href: string; label: string }[]; cta?: { href: string; label: string }
}> = {
  home: {
    icon: '🎯', accent: 'text-indigo-400', label: 'SSC CGL Prep Hub',
    bg: 'bg-indigo-600', links: [], cta: undefined,
  },
  'learn': {
    icon: '📖', accent: 'text-indigo-400', label: 'Learn Mode',
    bg: 'bg-indigo-600',
    links: [],
    cta: undefined,
  },
  'books-authors': {
    icon: '📚', accent: 'text-indigo-400', label: 'Books & Authors',
    bg: 'bg-indigo-600',
    links: [
      { href: '#overview',   label: 'Overview' },
      { href: '#matrix',     label: 'Study Matrix' },
      { href: '#flashcard',  label: 'Flashcards' },
      { href: '#exam-loop',  label: 'Exam Loop' },
      { href: '#pyq-tracker',label: 'PYQ Tracker' },
    ],
    cta: { href: '#exam-loop', label: 'Exam Loop →' },
  },
  'science-tech': {
    icon: '🔬', accent: 'text-teal-400', label: 'Science & Tech',
    bg: 'bg-teal-600',
    links: [
      { href: '#st-overview', label: 'Overview' },
      { href: '#st-matrix',   label: 'Fact Matrix' },
      { href: '#st-flash',    label: 'Flashcards' },
      { href: '#st-loop',     label: 'MCQ Loop' },
    ],
    cta: { href: '#st-loop', label: 'MCQ Loop →' },
  },
  'polity-constitution': {
    icon: '⚖️', accent: 'text-amber-400', label: 'Polity & Constitution',
    bg: 'bg-amber-600',
    links: [
      { href: '#pol-overview', label: 'Overview' },
      { href: '#pol-fast',     label: '⚡ Fast Revision' },
      { href: '#pol-matrix',   label: 'Fact Matrix' },
      { href: '#pol-flash',    label: 'Flashcards' },
      { href: '#pol-loop',     label: 'MCQ Loop' },
      { href: '#pol-pyq',      label: 'PYQ Tracker' },
    ],
    cta: { href: '#pol-fast', label: '⚡ Fast Revision' },
  },
  'govt-schemes': {
    icon: '🏛️', accent: 'text-emerald-400', label: 'Government Schemes',
    bg: 'bg-emerald-600',
    links: [
      { href: '#gs-overview', label: 'Overview' },
      { href: '#gs-fast',     label: 'Fast Revision' },
      { href: '#gs-matrix',   label: 'Scheme Matrix' },
      { href: '#gs-flash',    label: 'Flashcards' },
      { href: '#gs-loop',     label: 'MCQ Loop' },
      { href: '#gs-pyq',      label: 'PYQ Tracker' },
    ],
    cta: { href: '#gs-fast', label: 'Fast Revision →' },
  },
  'union-budget': {
    icon: '💰', accent: 'text-amber-400', label: 'Union Budget 2025-27',
    bg: 'bg-amber-600',
    links: [
      { href: '#ub-overview', label: 'Overview' },
      { href: '#ub-fast',     label: 'Fast Revision' },
      { href: '#ub-matrix',   label: 'Fact Matrix' },
      { href: '#ub-flash',    label: 'Flashcards' },
      { href: '#ub-loop',     label: 'MCQ Loop' },
      { href: '#ub-pyq',      label: 'PYQ Tracker' },
    ],
    cta: { href: '#ub-fast', label: 'Fast Revision →' },
  },
  'geography': {
    icon: '🌍', accent: 'text-emerald-400', label: 'Geography',
    bg: 'bg-emerald-600',
    links: [
      { href: '#geo-overview', label: 'Overview' },
      { href: '#geo-fast',     label: 'Fast Revision' },
      { href: '#geo-matrix',   label: 'Fact Matrix' },
      { href: '#geo-atlas',    label: 'Geo Atlas' },
      { href: '#geo-flash',    label: 'Flashcards' },
      { href: '#geo-loop',     label: 'MCQ Loop' },
      { href: '#geo-pyq',      label: 'PYQ Tracker' },
    ],
    cta: { href: '#geo-fast', label: 'Fast Revision →' },
  },
  'history': {
    icon: '📜', accent: 'text-amber-400', label: 'History',
    bg: 'bg-amber-700',
    links: [
      { href: '#hist-overview',  label: 'Overview' },
      { href: '#hist-fast',      label: 'Fast Revision' },
      { href: '#hist-matrix',    label: 'Fact Matrix' },
      { href: '#hist-timeline',  label: 'Timeline' },
      { href: '#hist-flash',     label: 'Flashcards' },
      { href: '#hist-map',       label: 'History Map' },
      { href: '#hist-loop',      label: 'MCQ Loop' },
      { href: '#hist-pyq',       label: 'PYQ Tracker' },
    ],
    cta: { href: '#hist-fast', label: 'Fast Revision →' },
  },
  'economics': {
    icon: '📈', accent: 'text-cyan-400', label: 'Economics',
    bg: 'bg-cyan-700',
    links: [
      { href: '#econ-overview',  label: 'Overview' },
      { href: '#econ-fast',      label: 'Fast Revision' },
      { href: '#econ-matrix',    label: 'Fact Matrix' },
      { href: '#econ-map',       label: 'Econ Atlas' },
      { href: '#econ-flash',     label: 'Flashcards' },
      { href: '#econ-loop',      label: 'MCQ Loop' },
      { href: '#econ-pyq',       label: 'PYQ Tracker' },
    ],
    cta: { href: '#econ-fast', label: 'Fast Revision →' },
  },
  'reports-indices': {
    icon: '📋', accent: 'text-violet-400', label: 'Reports & Indices',
    bg: 'bg-violet-700',
    links: [
      { href: '#ri-overview',  label: 'Overview' },
      { href: '#ri-fast',      label: 'Fast Revision' },
      { href: '#ri-matrix',    label: 'Fact Matrix' },
      { href: '#ri-map',       label: 'Org Map' },
      { href: '#ri-flash',     label: 'Flashcards' },
      { href: '#ri-loop',      label: 'MCQ Loop' },
      { href: '#ri-pyq',       label: 'PYQ Tracker' },
    ],
    cta: { href: '#ri-fast', label: 'Fast Revision →' },
  },
  'music-instruments': {
    icon: '🎵', accent: 'text-rose-400', label: 'Music & Instruments',
    bg: 'bg-rose-700',
    links: [
      { href: '#mi-overview',  label: 'Overview' },
      { href: '#mi-fast',      label: 'Fast Revision' },
      { href: '#mi-matrix',    label: 'Fact Matrix' },
      { href: '#mi-map',       label: 'Music Map' },
      { href: '#mi-flash',     label: 'Flashcards' },
      { href: '#mi-loop',      label: 'MCQ Loop' },
      { href: '#mi-pyq',       label: 'PYQ Tracker' },
    ],
    cta: { href: '#mi-fast', label: 'Fast Revision →' },
  },
  'dances': {
    icon: '💃', accent: 'text-fuchsia-400', label: 'Dances',
    bg: 'bg-fuchsia-700',
    links: [
      { href: '#dn-overview',  label: 'Overview' },
      { href: '#dn-fast',      label: 'Fast Revision' },
      { href: '#dn-matrix',    label: 'Fact Matrix' },
      { href: '#dn-map',       label: 'Dance Map' },
      { href: '#dn-flash',     label: 'Flashcards' },
      { href: '#dn-loop',      label: 'MCQ Loop' },
      { href: '#dn-pyq',       label: 'PYQ Tracker' },
    ],
    cta: { href: '#dn-fast', label: 'Fast Revision →' },
  },
  'sports': {
    icon: '🏅', accent: 'text-orange-400', label: 'Sports',
    bg: 'bg-orange-700',
    links: [
      { href: '#sp-overview',  label: 'Overview' },
      { href: '#sp-fast',      label: 'Fast Revision' },
      { href: '#sp-matrix',    label: 'Fact Matrix' },
      { href: '#sp-map',       label: 'Venues Map' },
      { href: '#sp-flash',     label: 'Flashcards' },
      { href: '#sp-loop',      label: 'MCQ Loop' },
      { href: '#sp-pyq',       label: 'PYQ Tracker' },
    ],
    cta: { href: '#sp-fast', label: 'Fast Revision →' },
  },
  'quantitative-aptitude': {
    icon: '📊', accent: 'text-blue-400', label: 'Quantitative Aptitude',
    bg: 'bg-blue-700',
    links: [
      { href: '#qa-overview',   label: 'Overview' },
      { href: '#qa-formulas',   label: 'Visual Formulas' },
      { href: '#qa-shapes',     label: 'Shapes Gallery' },
      { href: '#qa-trig',       label: 'Trig Table' },
      { href: '#qa-squares',    label: 'Squares & Cubes' },
      { href: '#qa-flash',      label: 'Flashcards' },
      { href: '#qa-test',       label: 'Formula Quiz' },
      { href: '#qa-loop',       label: 'Exam Loop' },
    ],
    cta: { href: '#qa-formulas', label: 'Visual Formulas →' },
  },
  'logical-reasoning': {
    icon: '🧩', accent: 'text-emerald-400', label: 'Logical Reasoning',
    bg: 'bg-emerald-700',
    links: [
      { href: '#lr-overview',   label: 'Overview' },
      { href: '#lr-concepts',   label: 'Concept Cards' },
      { href: '#lr-guides',     label: 'Visual Guides' },
      { href: '#lr-flash',      label: 'Flashcards' },
      { href: '#lr-test',       label: 'Pattern Quiz' },
      { href: '#lr-loop',       label: 'Exam Loop' },
      { href: '#lr-pyq',        label: 'PYQ Tracker' },
    ],
    cta: { href: '#lr-concepts', label: 'Concept Cards →' },
  },
  'english': {
    icon: '📖', accent: 'text-rose-400', label: 'English Language',
    bg: 'bg-rose-700',
    links: [
      { href: '#eng-analytics', label: 'Overview' },
      { href: '#eng-vocab',     label: 'Word Explorer' },
      { href: '#eng-grammar',   label: 'Grammar Gym' },
      { href: '#eng-loop',      label: 'Exam Loop' },
      { href: '#eng-reading',   label: 'Reading Zone' },
      { href: '#eng-flash',     label: 'Flashcards' },
      { href: '#eng-fast',      label: 'Fast Revision' },
      { href: '#eng-pyq',       label: 'PYQ Tracker' },
    ],
    cta: { href: '#eng-grammar', label: 'Grammar Gym →' },
  },
}

export default function Header({ page, setPage }: Props) {
  const cfg = PAGE_CONFIG[page]

  return (
    <header className="bg-brand-900 text-white sticky top-0 z-50 shadow-2xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <button onClick={() => setPage('home')} className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity">
          <span className={`flex items-center justify-center w-9 h-9 rounded-xl ${cfg.bg} text-lg shadow-lg`}>
            {cfg.icon}
          </span>
          <div className="leading-tight text-left">
            <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">SSC CGL Prep</p>
            <p className="text-sm font-bold text-white">{cfg.label}</p>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {page !== 'home' && (
            <button
              onClick={() => setPage('home')}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/10 transition-all mr-1"
            >
              ← All Topics
            </button>
          )}
          {cfg.links.map(({ href, label }) => (
            <a key={href} href={href}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all">
              {label}
            </a>
          ))}
          {cfg.cta && (
            <a href={cfg.cta.href}
              className={`ml-3 px-4 py-1.5 rounded-full text-sm font-bold ${cfg.bg} hover:opacity-90 text-white transition-all shadow-lg`}>
              {cfg.cta.label}
            </a>
          )}
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          {page !== 'home' && (
            <button onClick={() => setPage('home')}
              className="text-xs text-slate-400 hover:text-white transition-colors">
              ← Topics
            </button>
          )}
          <span className={`text-xs font-bold ${cfg.accent} border border-current/30 px-2 py-1 rounded-full`}>
            {cfg.label}
          </span>
        </div>
      </div>
    </header>
  )
}
