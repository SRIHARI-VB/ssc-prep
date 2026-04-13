import Analytics    from './components/Analytics'
import FastRevision from './components/FastRevision'
import FactMatrix   from './components/FactMatrix'
import ReportsMap   from './components/ReportsMap'
import Flashcard    from './components/Flashcard'
import ExamLoop     from './components/ExamLoop'
import PYQTracker   from './components/PYQTracker'
import { riData, riPYQHistory } from './data'

const hotCount = riData.filter(e => e.examProb === 'Hot').length
const categories = [...new Set(riData.map(e => e.category))].length

export default function ReportsIndicesPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-900 via-violet-950 to-purple-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full mb-4">
              Topic 08 &middot; General Awareness &middot; Reports &amp; Indices
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Reports &amp; Indices
              <span className="block text-violet-400 text-2xl md:text-3xl mt-1">SSC CGL Complete Guide</span>
            </h1>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base max-w-lg">
              <strong className="text-white">{riData.length} curated entries</strong> across{' '}
              <strong className="text-violet-400">{categories} categories</strong> &mdash;
              Global Indices, India Rankings, Economic Indices, Social Indices, Governance,
              Environment, International Organizations &amp; Current Affairs 2024-26.
              Plus <strong className="text-purple-400">{riPYQHistory.length} PYQ entries</strong> from 2019-2024.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: `${riData.length} Entries`, color: 'bg-violet-500/20 border-violet-500/40 text-violet-300' },
                { label: `${hotCount} Hot Priority`, color: 'bg-red-500/20 border-red-500/40 text-red-300' },
                { label: `${categories} Categories`, color: 'bg-purple-500/20 border-purple-500/40 text-purple-300' },
                { label: `${riPYQHistory.length} PYQ Records`, color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' },
                { label: 'Index Publishers & HQs', color: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300' },
                { label: 'Base Years & Rankings', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
                { label: 'Current Affairs 2024-26', color: 'bg-green-500/20 border-green-500/40 text-green-300' },
              ].map(p => (
                <span key={p.label} className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.color}`}>
                  {p.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-7">
              <a href="#ri-fast" className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-sm font-bold transition-all shadow-lg shadow-violet-900/40">
                Fast Revision &rarr;
              </a>
              <a href="#ri-loop" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                MCQ Loop
              </a>
              <a href="#ri-matrix" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Full Matrix
              </a>
              <a href="#ri-map" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Atlas
              </a>
              <a href="#ri-pyq" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
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
      <ReportsMap   />
      <Flashcard    />
      <ExamLoop     />
      <PYQTracker   />
    </>
  )
}
