import Analytics    from './components/Analytics'
import WordExplorer from './components/WordExplorer'
import GrammarGym   from './components/GrammarGym'
import ExamLoop     from './components/ExamLoop'
import ReadingZone  from './components/ReadingZone'
import Flashcard    from './components/Flashcard'
import FastRevision from './components/FastRevision'
import PYQTracker   from './components/PYQTracker'
import { englishQuestions, vocabData, passages, grammarRules } from './data'

const qtypeCount = new Set(englishQuestions.map(q => q.qtype)).size

export default function EnglishPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-rose-700 via-pink-800 to-rose-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-rose-300 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full mb-4">
              Section 04 &middot; English Language
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              English Language
              <span className="block text-rose-300 text-3xl md:text-4xl mt-1">Interactive Grammar Gym &amp; PYQ Practice Engine</span>
            </h1>
            <p className="mt-4 text-rose-100/80 leading-relaxed text-sm md:text-base max-w-lg">
              Learn by doing &mdash; fix sentences in <strong className="text-white">Grammar Gym</strong>,
              build vocabulary with <strong className="text-white">Word Explorer</strong>,
              practice {qtypeCount} question types from SSC CGL/CHSL PYQs.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 mt-5 text-sm font-bold">
              <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl">
                {englishQuestions.length} Questions
              </span>
              <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl">
                {vocabData.length} Vocab Words
              </span>
              <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl">
                {passages.length} Passages
              </span>
              <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl">
                {grammarRules.length} Grammar Rules
              </span>
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: `${qtypeCount} Question Types`, color: 'bg-rose-500/20 border-rose-500/40 text-rose-300' },
                { label: 'Easy \u2192 Hard',              color: 'bg-pink-500/20 border-pink-500/40 text-pink-300' },
                { label: 'Tier 1 + 2',                    color: 'bg-red-500/20 border-red-500/40 text-red-300' },
                { label: 'Word Explorer',                  color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
                { label: 'Grammar Gym',                    color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' },
                { label: 'Reading Zone',                   color: 'bg-violet-500/20 border-violet-500/40 text-violet-300' },
              ].map(p => (
                <span key={p.label} className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.color}`}>
                  {p.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-7">
              <a href="#eng-grammar" className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-sm font-bold transition-all shadow-lg shadow-rose-900/40">
                Grammar Gym &rarr;
              </a>
              <a href="#eng-vocab" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Word Explorer
              </a>
              <a href="#eng-loop" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Exam Loop
              </a>
              <a href="#eng-reading" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Reading Zone
              </a>
              <a href="#eng-flash" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                Flashcards
              </a>
              <a href="#eng-pyq" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                PYQ Tracker
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sections ─────────────────────────────────────────────────────── */}
      <Analytics />
      <WordExplorer />
      <GrammarGym />
      <ExamLoop />
      <ReadingZone />
      <Flashcard />
      <FastRevision />
      <PYQTracker />
    </>
  )
}
