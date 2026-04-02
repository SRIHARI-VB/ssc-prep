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
