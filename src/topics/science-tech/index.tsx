import Analytics   from './components/Analytics'
import FactMatrix  from './components/FactMatrix'
import Flashcard   from './components/Flashcard'
import ExamLoop    from './components/ExamLoop'
import PYQTracker  from './components/PYQTracker'
import { sciData } from './data'

const hotCount = sciData.filter(e => e.examProb === 'Hot').length

export default function ScienceTechPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-brand-900 via-teal-950 to-cyan-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full mb-4">
              Topic 02 · General Awareness
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Science &amp; Technology
              <span className="block text-teal-400 text-3xl md:text-4xl mt-1">Complete Quick Recall Guide</span>
            </h1>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base max-w-lg">
              <strong className="text-white">{sciData.length} high-priority facts</strong> across 5 subjects —
              Physics, Chemistry, Biology, Space &amp; Defense, Technology.
              Verified PYQs from 2022–2024 + Current Affairs through 2026.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: `${hotCount} Hot 🔴 facts`, color: 'bg-red-500/20 border-red-500/40 text-red-300' },
                { label: 'Chandrayaan-3 ✓', color: 'bg-teal-500/20 border-teal-500/40 text-teal-300' },
                { label: 'SpaDeX 2024', color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' },
                { label: 'Op. Sindoor 2025', color: 'bg-rose-500/20 border-rose-500/40 text-rose-300' },
                { label: 'Confirmed PYQs inside', color: 'bg-green-500/20 border-green-500/40 text-green-300' },
              ].map(p => (
                <span key={p.label} className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.color}`}>
                  {p.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-7">
              <a href="#st-overview" className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-sm font-bold transition-all shadow-lg shadow-teal-900/40">
                Start Studying →
              </a>
              <a href="#st-loop" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Jump to MCQ Loop
              </a>
              <a href="#st-pyq" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                PYQ Tracker ↓
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sections ─────────────────────────────────────────────────────── */}
      <Analytics  />
      <FactMatrix />
      <Flashcard  />
      <ExamLoop   />
      <PYQTracker />
    </>
  )
}
