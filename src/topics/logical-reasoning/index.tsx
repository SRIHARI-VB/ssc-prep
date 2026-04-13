import Analytics     from './components/Analytics'
import ConceptCards from './components/ConceptCards'
import VisualGuides from './components/VisualGuides'
import Flashcard    from './components/Flashcard'
import PatternQuiz  from './components/PatternQuiz'
import ExamLoop     from './components/ExamLoop'
import PYQTracker   from './components/PYQTracker'
import { reasoningConceptData, reasoningPYQs } from './data'

const topicCount = [...new Set(reasoningConceptData.map(c => c.topic))].length
const hotCount = reasoningConceptData.filter(c => c.examProb === 'Hot').length

export default function LogicalReasoningPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1 max-w-2xl">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-4">
                Topic 07 &middot; Logical Reasoning &middot; Method Bank
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Logical Reasoning
                <span className="block text-emerald-400 text-2xl md:text-3xl mt-1">
                  Methods, Patterns &amp; Visual Rules
                </span>
              </h1>
              <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base max-w-lg">
                <strong className="text-white">{reasoningConceptData.length} concepts &amp; methods</strong> across{' '}
                <strong className="text-emerald-400">{topicCount} reasoning topics</strong> &mdash;
                each with step-by-step solving approaches and visual guides.
                Includes <strong className="text-amber-400">{reasoningPYQs.length} PYQ questions</strong> from
                SSC CGL with detailed method-based solutions.
              </p>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  { label: `${reasoningConceptData.length} Concepts`, color: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' },
                  { label: `${topicCount} Topics`, color: 'bg-teal-500/20 border-teal-500/40 text-teal-300' },
                  { label: `${hotCount} Hot Priority`, color: 'bg-red-500/20 border-red-500/40 text-red-300' },
                  { label: `${reasoningPYQs.length} PYQs`, color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
                  { label: '8 Visual Guides', color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' },
                ].map(p => (
                  <span key={p.label} className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.color}`}>
                    {p.label}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-7">
                <a href="#lr-concepts" className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-bold transition-all shadow-lg shadow-emerald-900/40">
                  Method Bank &rarr;
                </a>
                <a href="#lr-guides" className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-sm font-bold transition-all shadow-lg shadow-teal-900/40">
                  Visual Guides
                </a>
                <a href="#lr-test" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                  Method Quiz
                </a>
                <a href="#lr-loop" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                  PYQ Exam Loop
                </a>
              </div>
            </div>

            {/* Hero SVG illustration collage */}
            <div className="shrink-0 hidden lg:flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Venn Diagram illustration */}
                <svg className="absolute top-0 left-0 w-36 h-36 opacity-20" viewBox="0 0 120 120">
                  <circle cx="45" cy="55" r="35" fill="none" stroke="#34d399" strokeWidth="2" />
                  <circle cx="75" cy="55" r="35" fill="none" stroke="#2dd4bf" strokeWidth="2" />
                  <text x="60" y="58" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">A &cap; B</text>
                </svg>
                {/* Compass illustration */}
                <svg className="absolute top-4 right-0 w-28 h-28 opacity-20" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#34d399" strokeWidth="1.5" />
                  <line x1="50" y1="12" x2="50" y2="88" stroke="#6ee7b7" strokeWidth="1" />
                  <line x1="12" y1="50" x2="88" y2="50" stroke="#6ee7b7" strokeWidth="1" />
                  <text x="50" y="20" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">N</text>
                  <text x="50" y="88" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">S</text>
                  <text x="85" y="54" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">E</text>
                  <text x="16" y="54" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">W</text>
                </svg>
                {/* Dice illustration */}
                <svg className="absolute bottom-0 left-8 w-32 h-32 opacity-20" viewBox="0 0 100 100">
                  <rect x="20" y="20" width="60" height="60" rx="8" fill="none" stroke="#2dd4bf" strokeWidth="2" />
                  <circle cx="35" cy="35" r="4" fill="#6ee7b7" />
                  <circle cx="65" cy="35" r="4" fill="#6ee7b7" />
                  <circle cx="50" cy="50" r="4" fill="#6ee7b7" />
                  <circle cx="35" cy="65" r="4" fill="#6ee7b7" />
                  <circle cx="65" cy="65" r="4" fill="#6ee7b7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <Analytics />
      <ConceptCards />
      <VisualGuides />
      <Flashcard />
      <PatternQuiz />
      <ExamLoop />
      <PYQTracker />
    </>
  )
}
