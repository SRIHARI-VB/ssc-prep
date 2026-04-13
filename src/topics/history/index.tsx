import Analytics    from './components/Analytics'
import FastRevision from './components/FastRevision'
import FactMatrix   from './components/FactMatrix'
import Timeline     from './components/Timeline'
import Flashcard    from './components/Flashcard'
import HistoryMap   from './components/HistoryMap'
import ExamLoop     from './components/ExamLoop'
import PYQTracker   from './components/PYQTracker'
import { historyData, historyPYQData } from './data'

const hotCount = historyData.filter(e => e.examProb === 'Hot').length
const categories = [...new Set(historyData.map(e => e.category))].length
const mapEvents = historyData.filter(e => e.lat != null && e.lng != null).length

export default function HistoryPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-900 via-amber-950 to-orange-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-4">
              Topic 07 &middot; General Awareness &middot; History
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Indian History
              <span className="block text-amber-400 text-2xl md:text-3xl mt-1">SSC CGL Complete Guide</span>
            </h1>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base max-w-lg">
              <strong className="text-white">{historyData.length} history entries</strong> across{' '}
              <strong className="text-amber-400">{categories} categories</strong> &mdash;
              Ancient India, Medieval India, Modern India, Freedom Struggle, Reform Movements, Art &amp; Culture &amp; Battles.
              Plus <strong className="text-cyan-400">{historyPYQData.length} PYQ entries</strong> from 2019-2024.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: `${historyData.length} History Entries`, color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
                { label: `${hotCount} Hot Priority`, color: 'bg-red-500/20 border-red-500/40 text-red-300' },
                { label: `${categories} Categories`, color: 'bg-violet-500/20 border-violet-500/40 text-violet-300' },
                { label: `${historyPYQData.length} PYQ Records`, color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' },
                { label: `${mapEvents} Map Events`, color: 'bg-green-500/20 border-green-500/40 text-green-300' },
                { label: 'Chronological Timeline', color: 'bg-blue-500/20 border-blue-500/40 text-blue-300' },
                { label: 'Mnemonics & Shortcuts', color: 'bg-pink-500/20 border-pink-500/40 text-pink-300' },
              ].map(p => (
                <span key={p.label} className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.color}`}>
                  {p.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-7">
              <a href="#hist-fast" className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-sm font-bold transition-all shadow-lg shadow-amber-900/40">
                Fast Revision &rarr;
              </a>
              <a href="#hist-timeline" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Timeline
              </a>
              <a href="#hist-loop" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                MCQ Loop
              </a>
              <a href="#hist-matrix" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Fact Matrix
              </a>
              <a href="#hist-map" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                History Map
              </a>
              <a href="#hist-pyq" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
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
      <Timeline     />
      <Flashcard    />
      <HistoryMap   />
      <ExamLoop     />
      <PYQTracker   />
    </>
  )
}
