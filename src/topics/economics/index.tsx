import Analytics    from './components/Analytics'
import FastRevision from './components/FastRevision'
import FactMatrix   from './components/FactMatrix'
import EconomicsMap from './components/EconomicsMap'
import Flashcard    from './components/Flashcard'
import ExamLoop     from './components/ExamLoop'
import PYQTracker   from './components/PYQTracker'
import { econData, econPYQData } from './data'

const hotCount = econData.filter(e => e.examProb === 'Hot').length
const categories = [...new Set(econData.map(e => e.category))].length
const mapEvents = econData.filter(e => e.lat != null && e.lng != null).length

export default function EconomicsPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-900 via-cyan-950 to-teal-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full mb-4">
              Topic 08 &middot; General Awareness &middot; Economics
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Indian Economy
              <span className="block text-cyan-400 text-2xl md:text-3xl mt-1">SSC CGL Complete Guide</span>
            </h1>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base max-w-lg">
              <strong className="text-white">{econData.length} economics entries</strong> across{' '}
              <strong className="text-cyan-400">{categories} categories</strong> &mdash;
              GDP/GNP, Banking &amp; RBI, Fiscal Policy, GST, International Trade, Agriculture, Industry, Financial Markets &amp; Current Affairs.
              Plus <strong className="text-amber-400">{econPYQData.length} PYQ entries</strong> from 2019-2024.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: `${econData.length} Economics Entries`, color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' },
                { label: `${hotCount} Hot Priority`, color: 'bg-red-500/20 border-red-500/40 text-red-300' },
                { label: `${categories} Categories`, color: 'bg-violet-500/20 border-violet-500/40 text-violet-300' },
                { label: `${econPYQData.length} PYQ Records`, color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
                { label: `${mapEvents} Map Locations`, color: 'bg-green-500/20 border-green-500/40 text-green-300' },
                { label: 'RBI & Banking Focus', color: 'bg-blue-500/20 border-blue-500/40 text-blue-300' },
                { label: 'Current Affairs 2024-26', color: 'bg-pink-500/20 border-pink-500/40 text-pink-300' },
              ].map(p => (
                <span key={p.label} className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.color}`}>
                  {p.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-7">
              <a href="#econ-fast" className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-bold transition-all shadow-lg shadow-cyan-900/40">
                Fast Revision &rarr;
              </a>
              <a href="#econ-loop" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                MCQ Loop
              </a>
              <a href="#econ-matrix" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Fact Matrix
              </a>
              <a href="#econ-map" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Economic Atlas
              </a>
              <a href="#econ-pyq" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
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
      <EconomicsMap />
      <Flashcard    />
      <ExamLoop     />
      <PYQTracker   />
    </>
  )
}
