import Analytics    from './components/Analytics'
import FastRevision from './components/FastRevision'
import FactMatrix   from './components/FactMatrix'
import DanceMap     from './components/DanceMap'
import Flashcard    from './components/Flashcard'
import ExamLoop     from './components/ExamLoop'
import PYQTracker   from './components/PYQTracker'
import { danceData, dancePYQHistory } from './data'

const hotCount = danceData.filter(e => e.examProb === 'Hot').length
const categories = [...new Set(danceData.map(e => e.category))].length

export default function DancesPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-900 via-fuchsia-950 to-pink-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20 px-3 py-1 rounded-full mb-4">
              Topic 12 &middot; General Awareness &middot; Dances of India
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Indian Dances
              <span className="block text-fuchsia-400 text-2xl md:text-3xl mt-1">SSC CGL Complete Guide</span>
            </h1>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base max-w-lg">
              <strong className="text-white">{danceData.length} dance facts</strong> across{' '}
              <strong className="text-fuchsia-400">{categories} categories</strong> &mdash;
              8 Classical Dances, Folk Dances of every state, Tribal Dances, UNESCO Heritage &amp; Awards.
              Plus <strong className="text-pink-400">{dancePYQHistory.length} PYQ entries</strong> from 2018-2024.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: `${danceData.length} Dance Facts`, color: 'bg-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-300' },
                { label: `${hotCount} Hot Priority`, color: 'bg-red-500/20 border-red-500/40 text-red-300' },
                { label: `${categories} Categories`, color: 'bg-violet-500/20 border-violet-500/40 text-violet-300' },
                { label: `${dancePYQHistory.length} PYQ Records`, color: 'bg-pink-500/20 border-pink-500/40 text-pink-300' },
                { label: '8 Classical Dances', color: 'bg-rose-500/20 border-rose-500/40 text-rose-300' },
                { label: 'State-Dance Matching', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
                { label: 'UNESCO Heritage', color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' },
              ].map(p => (
                <span key={p.label} className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.color}`}>
                  {p.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-7">
              <a href="#dn-fast" className="px-5 py-2.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-sm font-bold transition-all shadow-lg shadow-fuchsia-900/40">
                Fast Revision &rarr;
              </a>
              <a href="#dn-loop" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                MCQ Loop
              </a>
              <a href="#dn-matrix" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Full Matrix
              </a>
              <a href="#dn-map" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Dance Map
              </a>
              <a href="#dn-pyq" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
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
      <DanceMap     />
      <Flashcard    />
      <ExamLoop     />
      <PYQTracker   />
    </>
  )
}
