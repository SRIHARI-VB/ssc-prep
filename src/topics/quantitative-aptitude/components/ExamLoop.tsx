import { useState, useMemo } from 'react'
import { mathsPYQs } from '../data'
import type { EngineQuestion, CategoryDef, AccentPalette } from '../../../engine/types'
import ExamEngine from '../../../engine/ExamEngine'

type ProbFilter = 'all' | 'Hot' | 'High' | 'Confirmed' | 'Recurring'

const ACCENT: AccentPalette = {
  chipActive: 'bg-blue-600 text-white border-blue-600',
  optHover: 'hover:bg-blue-50 hover:border-blue-300',
  bar: 'bg-blue-500',
  scoreText: 'text-blue-600',
  nextBtn: 'bg-blue-600 hover:bg-blue-500 text-white',
  text: 'text-blue-600',
}

const TOPIC_DEF: Record<string, CategoryDef> = {
  'Percentage':                   { icon: '%',  color: 'border-blue-400 bg-blue-50 text-blue-700' },
  'Profit & Loss':                { icon: '$',  color: 'border-green-400 bg-green-50 text-green-700' },
  'Simple & Compound Interest':   { icon: '%',  color: 'border-teal-400 bg-teal-50 text-teal-700' },
  'Number System':                { icon: '#',  color: 'border-violet-400 bg-violet-50 text-violet-700' },
  'Algebra':                      { icon: 'x',  color: 'border-indigo-400 bg-indigo-50 text-indigo-700' },
  'Geometry':                     { icon: '\u25B3', color: 'border-amber-400 bg-amber-50 text-amber-700' },
  'Mensuration':                  { icon: '\u25A1', color: 'border-orange-400 bg-orange-50 text-orange-700' },
  'Trigonometry':                 { icon: '\u03B8', color: 'border-rose-400 bg-rose-50 text-rose-700' },
  'Data Interpretation':          { icon: '\u2261', color: 'border-cyan-400 bg-cyan-50 text-cyan-700' },
  'Speed, Distance & Time':      { icon: '\u2192', color: 'border-emerald-400 bg-emerald-50 text-emerald-700' },
  'Time & Work':                  { icon: '\u23F1', color: 'border-blue-400 bg-blue-50 text-blue-700' },
  'Average & Alligation':        { icon: '\u2248', color: 'border-lime-400 bg-lime-50 text-lime-700' },
  'Ratio & Proportion':          { icon: ':',  color: 'border-sky-400 bg-sky-50 text-sky-700' },
  'Statistics':                   { icon: '\u03C3', color: 'border-pink-400 bg-pink-50 text-pink-700' },
  'Surds & Indices':              { icon: '\u221A', color: 'border-red-400 bg-red-50 text-red-700' },
  'Coordinate Geometry':          { icon: '\u2295', color: 'border-fuchsia-400 bg-fuchsia-50 text-fuchsia-700' },
  'Mixture & Alligation':        { icon: '\u222A', color: 'border-yellow-400 bg-yellow-50 text-yellow-700' },
}

export default function ExamLoop() {
  const [topicFilter, setTopicFilter] = useState('all')
  const [probFilter, setProbFilter] = useState<ProbFilter>('all')

  const topics = useMemo(
    () => ['all', ...new Set(mathsPYQs.map(p => p.topic))],
    []
  )

  const questions: EngineQuestion[] = useMemo(() => {
    let pool = mathsPYQs
    if (topicFilter !== 'all') pool = pool.filter(p => p.topic === topicFilter)
    if (probFilter !== 'all') pool = pool.filter(p => p.examProb === probFilter)
    return pool.map(p => ({
      id: p.id,
      topic: p.topic as string,
      question: p.question,
      options: p.options,
      answer: p.answer,
      explanation: `${p.explanation}\n\nFormula: ${p.formulaUsed}`,
      examProb: p.examProb,
    }))
  }, [topicFilter, probFilter])

  return (
    <section id="qa-loop" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-indigo-500" />
          <h2 className="text-xl font-extrabold text-brand-900">PYQ Exam Loop</h2>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            {mathsPYQs.length} Questions
          </span>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-6">
          <div className="flex flex-wrap gap-2">
            {topics.map(t => (
              <button key={t} onClick={() => setTopicFilter(t)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                  topicFilter === t ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300'
                }`}>
                {t === 'all' ? 'All Topics' : t}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {(['all', 'Hot', 'High', 'Confirmed', 'Recurring'] as ProbFilter[]).map(p => (
              <button key={p} onClick={() => setProbFilter(p)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                  probFilter === p ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'
                }`}>
                {p === 'all' ? 'All Levels' : p}
              </button>
            ))}
          </div>
        </div>

        {questions.length > 0 ? (
          <ExamEngine
            key={`${topicFilter}-${probFilter}`}
            questions={questions}
            getCat={q => q.topic}
            catDef={TOPIC_DEF}
            accent={ACCENT}
            sectionId="qa-loop"
          />
        ) : (
          <div className="text-center py-12 text-slate-400">
            <p className="text-4xl mb-2">🔍</p>
            <p className="font-medium">No questions match your filters. Try changing the selection.</p>
          </div>
        )}
      </div>
    </section>
  )
}
