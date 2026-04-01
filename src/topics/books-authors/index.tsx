import Analytics       from './components/Analytics'
import StudyMatrix     from './components/StudyMatrix'
import Flashcard       from './components/Flashcard'
import ExamLoop        from './components/ExamLoop'
import PYQShiftTracker from './components/PYQShiftTracker'
import { booksData }   from './data'

const hotCount = booksData.filter(b => b.examProb === 'Hot').length

export default function BooksAuthorsPage() {
  return (
    <>
      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-brand-900 via-indigo-950 to-violet-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full mb-4">
              Topic 01 · General Awareness
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Books &amp; Authors
              <span className="block text-indigo-400 text-3xl md:text-4xl mt-1">Complete Master Guide</span>
            </h1>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base max-w-lg">
              <strong className="text-white">{booksData.length} high-priority entries</strong> across 6 categories —
              Ancient/Medieval, Freedom Struggle, Sports, PYQ, Literary Awards,
              and Current Affairs up to early 2026. Powered by 6 years of PYQ analysis.
            </p>

            {/* Quick stat pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: `${hotCount} Hot 🔴 entries`, color: 'bg-red-500/20 border-red-500/40 text-red-300' },
                { label: 'Booker 2025 covered', color: 'bg-violet-500/20 border-violet-500/40 text-violet-300' },
                { label: 'Jnanpith 2024 & 2025', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
                { label: 'Shift-wise PYQ tracker', color: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' },
              ].map(p => (
                <span key={p.label} className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.color}`}>
                  {p.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-7">
              <a href="#overview" className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-bold transition-all shadow-lg shadow-indigo-900/40">
                Start Studying →
              </a>
              <a href="#exam-loop" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Jump to Exam Loop
              </a>
              <a href="#pyq-tracker" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                PYQ Tracker ↓
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sections ────────────────────────────────────────────────────── */}
      <Analytics  />
      <StudyMatrix />
      <Flashcard   />
      <ExamLoop    />
      <PYQShiftTracker />
    </>
  )
}
