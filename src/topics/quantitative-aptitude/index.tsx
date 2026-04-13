import Analytics          from './components/Analytics'
import VisualFormulaBank from './components/VisualFormulaBank'
import ShapesGallery     from './components/ShapesGallery'
import TrigTable         from './components/TrigTable'
import SquareCubeTrainer from './components/SquareCubeTrainer'
import Flashcard         from './components/Flashcard'
import FormulaTest       from './components/FormulaTest'
import ExamLoop          from './components/ExamLoop'
import PYQTracker        from './components/PYQTracker'
import { mathsFormulaData, mathsPYQs } from './data'

const hotCount = mathsFormulaData.filter(f => f.examProb === 'Hot').length
const topicCount = new Set(mathsFormulaData.map(f => f.topic)).size

export default function QuantitativeAptitudePage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
                Quantitative Aptitude &middot; SSC CGL
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Quantitative Aptitude
                <span className="block text-blue-400 text-2xl md:text-3xl mt-1">Visual Formula Bank & PYQ Engine</span>
              </h1>
              <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base max-w-lg">
                <strong className="text-white">{mathsFormulaData.length} formulas</strong> across{' '}
                <strong className="text-blue-400">{topicCount} maths topics</strong> &mdash;
                Geometry, Trigonometry, Algebra, Mensuration, Number System, Profit & Loss, Percentage, and more.
                Plus <strong className="text-cyan-400">{mathsPYQs.length} PYQ entries</strong> from recent SSC CGL exams.
              </p>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  { label: `${mathsFormulaData.length} Formulas`, color: 'bg-blue-500/20 border-blue-500/40 text-blue-300' },
                  { label: `${hotCount} Hot Priority`, color: 'bg-red-500/20 border-red-500/40 text-red-300' },
                  { label: `${topicCount} Maths Topics`, color: 'bg-violet-500/20 border-violet-500/40 text-violet-300' },
                  { label: `${mathsPYQs.length} PYQ Records`, color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' },
                  { label: 'SVG Visual Formulas', color: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300' },
                  { label: 'Trig Quick Reference', color: 'bg-rose-500/20 border-rose-500/40 text-rose-300' },
                  { label: 'Shapes Gallery', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
                ].map(p => (
                  <span key={p.label} className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.color}`}>
                    {p.label}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-7">
                <a href="#qa-formulas" className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-bold transition-all shadow-lg shadow-blue-900/40">
                  Formula Bank &rarr;
                </a>
                <a href="#qa-loop" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                  PYQ Exam Loop
                </a>
                <a href="#qa-shapes" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                  Shapes Gallery
                </a>
                <a href="#qa-trig" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                  Trig Table
                </a>
                <a href="#qa-squares" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                  Squares & Cubes
                </a>
                <a href="#qa-flash" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                  Flashcards
                </a>
                <a href="#qa-pyq" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-all border border-white/10">
                  PYQ Tracker
                </a>
              </div>
            </div>

            {/* Right side: decorative formula collage */}
            <div className="hidden md:flex flex-col gap-3 w-72 shrink-0">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-xs text-blue-400 font-bold mb-1">Area of Circle</p>
                <p className="font-mono text-sm text-white font-extrabold">&pi;r&sup2;</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-xs text-indigo-400 font-bold mb-1">Pythagoras Theorem</p>
                <p className="font-mono text-sm text-white font-extrabold">a&sup2; + b&sup2; = c&sup2;</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-xs text-violet-400 font-bold mb-1">Quadratic Formula</p>
                <p className="font-mono text-sm text-white font-extrabold">x = (-b &plusmn; &radic;(b&sup2;-4ac)) / 2a</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-xs text-cyan-400 font-bold mb-1">sin&sup2;&theta; + cos&sup2;&theta;</p>
                <p className="font-mono text-sm text-white font-extrabold">= 1</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-xs text-rose-400 font-bold mb-1">Simple Interest</p>
                <p className="font-mono text-sm text-white font-extrabold">SI = PNR / 100</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <Analytics />
      <VisualFormulaBank />
      <ShapesGallery />
      <TrigTable />
      <SquareCubeTrainer />
      <Flashcard />
      <FormulaTest />
      <ExamLoop />
      <PYQTracker />
    </>
  )
}
