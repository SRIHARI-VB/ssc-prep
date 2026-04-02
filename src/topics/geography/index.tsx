import Analytics    from './components/Analytics'
import FastRevision from './components/FastRevision'
import FactMatrix   from './components/FactMatrix'
import GeoAtlas     from './components/GeoAtlas'
import Flashcard    from './components/Flashcard'
import ExamLoop     from './components/ExamLoop'
import PYQTracker   from './components/PYQTracker'
import { geoData, geoPYQHistory } from './data'

const hotCount = geoData.filter(e => e.examProb === 'Hot').length
const categories = [...new Set(geoData.map(e => e.category))].length

export default function GeographyPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-900 via-emerald-950 to-teal-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-4">
              Topic 06 &middot; General Awareness &middot; Geography
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Indian &amp; World Geography
              <span className="block text-emerald-400 text-2xl md:text-3xl mt-1">SSC CGL Complete Guide</span>
            </h1>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base max-w-lg">
              <strong className="text-white">{geoData.length} geography facts</strong> across{' '}
              <strong className="text-emerald-400">{categories} categories</strong> &mdash;
              Rivers, Mountains, Soils, National Parks, Agriculture, Minerals, Dams, World Geography, Straits, Transport, Population &amp; Current Affairs.
              Plus <strong className="text-cyan-400">{geoPYQHistory.length} PYQ entries</strong> from 2019-2024.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: `${geoData.length} Geography Facts`, color: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' },
                { label: `${hotCount} Hot Priority`, color: 'bg-red-500/20 border-red-500/40 text-red-300' },
                { label: `${categories} Categories`, color: 'bg-violet-500/20 border-violet-500/40 text-violet-300' },
                { label: `${geoPYQHistory.length} PYQ Records`, color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' },
                { label: 'Rivers & Tributaries', color: 'bg-blue-500/20 border-blue-500/40 text-blue-300' },
                { label: 'National Parks & Wildlife', color: 'bg-green-500/20 border-green-500/40 text-green-300' },
                { label: 'Mnemonics & Tamil Notes', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
              ].map(p => (
                <span key={p.label} className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.color}`}>
                  {p.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-7">
              <a href="#geo-fast" className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-bold transition-all shadow-lg shadow-emerald-900/40">
                Fast Revision &rarr;
              </a>
              <a href="#geo-loop" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                MCQ Loop
              </a>
              <a href="#geo-matrix" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Full Matrix
              </a>
              <a href="#geo-atlas" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Geo Atlas
              </a>
              <a href="#geo-pyq" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
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
      <GeoAtlas     />
      <Flashcard    />
      <ExamLoop     />
      <PYQTracker   />
    </>
  )
}
