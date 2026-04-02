import Analytics    from './components/Analytics'
import FastRevision from './components/FastRevision'
import FactMatrix   from './components/FactMatrix'
import Flashcard    from './components/Flashcard'
import ExamLoop     from './components/ExamLoop'
import PYQTracker   from './components/PYQTracker'
import { budgetData } from './data'

const hotCount = budgetData.filter(e => e.examProb === 'Hot').length
const count2026 = budgetData.filter(e => e.budgetYear === '2026-27').length
const count2025 = budgetData.filter(e => e.budgetYear === '2025-26').length

export default function UnionBudgetPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-900 via-amber-950 to-orange-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-4">
              Topic 05 &middot; General Awareness &middot; Economy
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Union Budget 2026-27
              <span className="block text-amber-400 text-2xl md:text-3xl mt-1">+ Budget 2025-26 &mdash; SSC CGL Guide</span>
            </h1>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base max-w-lg">
              <strong className="text-white">{budgetData.length} budget facts</strong> &mdash;
              <strong className="text-emerald-400"> {count2026} for FY 2026-27</strong> (priority) +
              <strong className="text-sky-400"> {count2025} for FY 2025-26</strong> +
              General budget knowledge.
              Filter by year to focus on what matters most for your exam.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: `${count2026} FY 2026-27 Facts`, color: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' },
                { label: `${count2025} FY 2025-26 Facts`, color: 'bg-sky-500/20 border-sky-500/40 text-sky-300' },
                { label: `${hotCount} Hot Priority`, color: 'bg-red-500/20 border-red-500/40 text-red-300' },
                { label: 'Rs 53.47L Cr (2026-27)', color: 'bg-green-500/20 border-green-500/40 text-green-300' },
                { label: '4.3% Fiscal Deficit', color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' },
                { label: '9th Budget by Nirmala', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
                { label: 'Year Filter Available', color: 'bg-violet-500/20 border-violet-500/40 text-violet-300' },
              ].map(p => (
                <span key={p.label} className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.color}`}>
                  {p.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-7">
              <a href="#ub-fast" className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-sm font-bold transition-all shadow-lg shadow-amber-900/40">
                Fast Revision &rarr;
              </a>
              <a href="#ub-loop" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                MCQ Loop
              </a>
              <a href="#ub-matrix" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Full Matrix
              </a>
              <a href="#ub-pyq" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                PYQ Tracker
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <Analytics    />
      <FastRevision />
      <FactMatrix   />
      <Flashcard    />
      <ExamLoop     />
      <PYQTracker   />
    </>
  )
}
