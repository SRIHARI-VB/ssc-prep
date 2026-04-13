import Analytics    from './components/Analytics'
import FastRevision from './components/FastRevision'
import FactMatrix   from './components/FactMatrix'
import VenuesMap    from './components/VenuesMap'
import Flashcard    from './components/Flashcard'
import ExamLoop     from './components/ExamLoop'
import PYQTracker   from './components/PYQTracker'
import { sportsData, sportsPYQHistory } from './data'

const hotCount = sportsData.filter(e => e.examProb === 'Hot').length
const categories = [...new Set(sportsData.map(e => e.category))].length

export default function SportsPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-900 via-orange-950 to-amber-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full mb-4">
              Topic 07 &middot; General Awareness &middot; Sports
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Sports &amp; Games
              <span className="block text-orange-400 text-2xl md:text-3xl mt-1">SSC CGL Complete Guide</span>
            </h1>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base max-w-lg">
              <strong className="text-white">{sportsData.length} sports facts</strong> across{' '}
              <strong className="text-orange-400">{categories} categories</strong> &mdash;
              Cricket, Olympics, Hockey, Football, Tennis, Boxing, Awards, Trophies, Rules, Venues &amp; Current Affairs.
              Plus <strong className="text-amber-400">{sportsPYQHistory.length} PYQ entries</strong> from 2019-2024.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: `${sportsData.length} Sports Facts`, color: 'bg-orange-500/20 border-orange-500/40 text-orange-300' },
                { label: `${hotCount} Hot Priority`, color: 'bg-red-500/20 border-red-500/40 text-red-300' },
                { label: `${categories} Categories`, color: 'bg-violet-500/20 border-violet-500/40 text-violet-300' },
                { label: `${sportsPYQHistory.length} PYQ Records`, color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' },
                { label: 'Olympics & Medals', color: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300' },
                { label: 'Player Counts & Rules', color: 'bg-blue-500/20 border-blue-500/40 text-blue-300' },
                { label: 'Awards & Venues', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
              ].map(p => (
                <span key={p.label} className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.color}`}>
                  {p.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-7">
              <a href="#sp-fast" className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-sm font-bold transition-all shadow-lg shadow-orange-900/40">
                Fast Revision &rarr;
              </a>
              <a href="#sp-loop" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                MCQ Loop
              </a>
              <a href="#sp-matrix" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Full Matrix
              </a>
              <a href="#sp-map" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Venues Map
              </a>
              <a href="#sp-pyq" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
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
      <VenuesMap    />
      <Flashcard    />
      <ExamLoop     />
      <PYQTracker   />
    </>
  )
}
