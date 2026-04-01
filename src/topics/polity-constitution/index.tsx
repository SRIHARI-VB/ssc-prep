import Analytics    from './components/Analytics'
import FastRevision from './components/FastRevision'
import FactMatrix   from './components/FactMatrix'
import Flashcard    from './components/Flashcard'
import ExamLoop     from './components/ExamLoop'
import PYQTracker   from './components/PYQTracker'
import { polityData } from './data'

const hotCount = polityData.filter(e => e.examProb === 'Hot').length

export default function PolityConstitutionPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-brand-900 via-amber-950 to-orange-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-4">
              Topic 03 · General Awareness
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Polity &amp; Constitution
              <span className="block text-amber-400 text-3xl md:text-4xl mt-1">Complete Quick Recall Guide</span>
            </h1>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base max-w-lg">
              <strong className="text-white">{polityData.length} high-priority facts</strong> across 7 categories —
              Fundamental Rights, DPSP, Union &amp; State Govt, Constitutional Bodies, Amendments, Schedules &amp; Current Affairs.
              Verified PYQs from 2021-2024 + Current Affairs through 2026. Updated with latest SC judgments, new laws &amp; amendment bills.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: `${hotCount} Hot 🔴 facts`, color: 'bg-red-500/20 border-red-500/40 text-red-300' },
                { label: 'Articles 12-370', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
                { label: '106 Amendments', color: 'bg-violet-500/20 border-violet-500/40 text-violet-300' },
                { label: 'SC Judgments 2024-26', color: 'bg-rose-500/20 border-rose-500/40 text-rose-300' },
                { label: 'Confirmed PYQs inside', color: 'bg-green-500/20 border-green-500/40 text-green-300' },
              ].map(p => (
                <span key={p.label} className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.color}`}>
                  {p.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-7">
              <a href="#pol-fast" className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-sm font-bold transition-all shadow-lg shadow-amber-900/40">
                ⚡ Fast Revision →
              </a>
              <a href="#pol-loop" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                MCQ Loop
              </a>
              <a href="#pol-matrix" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Full Matrix
              </a>
              <a href="#pol-pyq" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                PYQ Tracker ↓
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sections ─────────────────────────────────────────────────────── */}
      <Analytics    />
      <FastRevision />
      <FactMatrix   />
      <Flashcard  />
      <ExamLoop   />
      <PYQTracker />
    </>
  )
}
