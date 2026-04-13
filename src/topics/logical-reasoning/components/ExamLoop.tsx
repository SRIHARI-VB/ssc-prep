import { useState, useMemo } from 'react'
import { reasoningPYQs } from '../data'
import type { EngineQuestion, CategoryDef, AccentPalette } from '../../../engine/types'
import ExamEngine from '../../../engine/ExamEngine'

type ProbFilter = 'all' | 'Hot' | 'High' | 'Confirmed' | 'Recurring'

const ACCENT: AccentPalette = {
  chipActive: 'bg-emerald-600 text-white border-emerald-600',
  optHover: 'hover:bg-emerald-50 hover:border-emerald-300',
  bar: 'bg-emerald-500',
  scoreText: 'text-emerald-600',
  nextBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white',
  text: 'text-emerald-600',
}

const TOPIC_DEF: Record<string, CategoryDef> = {
  'Coding-Decoding':              { icon: '🔤', color: 'border-emerald-400 bg-emerald-50 text-emerald-700' },
  'Analogy':                      { icon: '🔗', color: 'border-teal-400 bg-teal-50 text-teal-700' },
  'Series':                       { icon: '🔢', color: 'border-blue-400 bg-blue-50 text-blue-700' },
  'Classification (Odd One Out)': { icon: '❌', color: 'border-orange-400 bg-orange-50 text-orange-700' },
  'Blood Relations':              { icon: '👨‍👩‍👦', color: 'border-rose-400 bg-rose-50 text-rose-700' },
  'Direction & Distance':         { icon: '🧭', color: 'border-green-400 bg-green-50 text-green-700' },
  'Syllogism':                    { icon: '🔀', color: 'border-violet-400 bg-violet-50 text-violet-700' },
  'Mirror & Water Image':         { icon: '🪞', color: 'border-cyan-400 bg-cyan-50 text-cyan-700' },
  'Paper Folding & Cutting':      { icon: '✂️', color: 'border-pink-400 bg-pink-50 text-pink-700' },
  'Embedded Figures':             { icon: '🔲', color: 'border-slate-400 bg-slate-50 text-slate-700' },
  'Venn Diagrams':                { icon: '⭕', color: 'border-indigo-400 bg-indigo-50 text-indigo-700' },
  'Statement & Conclusion':       { icon: '📜', color: 'border-amber-400 bg-amber-50 text-amber-700' },
  'Seating Arrangement':          { icon: '💺', color: 'border-lime-400 bg-lime-50 text-lime-700' },
  'Puzzle':                       { icon: '🧩', color: 'border-fuchsia-400 bg-fuchsia-50 text-fuchsia-700' },
  'Matrix Reasoning':             { icon: '🔳', color: 'border-sky-400 bg-sky-50 text-sky-700' },
  'Calendar & Clock':             { icon: '🕐', color: 'border-amber-400 bg-amber-50 text-amber-700' },
  'Missing Number':               { icon: '❓', color: 'border-red-400 bg-red-50 text-red-700' },
  'Dice & Cube':                  { icon: '🎲', color: 'border-purple-400 bg-purple-50 text-purple-700' },
  'Word Arrangement':             { icon: '📝', color: 'border-teal-400 bg-teal-50 text-teal-700' },
  'Counting Figures':             { icon: '🔺', color: 'border-emerald-400 bg-emerald-50 text-emerald-700' },
}

export default function ExamLoop() {
  const [topicFilter, setTopicFilter] = useState('all')
  const [probFilter, setProbFilter] = useState<ProbFilter>('all')

  const topics = useMemo(
    () => ['all', ...new Set(reasoningPYQs.map(p => p.topic))],
    []
  )

  const questions: EngineQuestion[] = useMemo(() => {
    let pool = reasoningPYQs
    if (topicFilter !== 'all') pool = pool.filter(p => p.topic === topicFilter)
    if (probFilter !== 'all') pool = pool.filter(p => p.examProb === probFilter)
    return pool.map(p => ({
      id: p.id,
      topic: p.topic as string,
      question: p.question,
      options: p.options,
      answer: p.answer,
      explanation: `${p.explanation}\n\n📝 Method Used: ${p.methodUsed}`,
      examProb: p.examProb,
    }))
  }, [topicFilter, probFilter])

  return (
    <section id="lr-loop" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500" />
          <h2 className="text-xl font-extrabold text-brand-900">PYQ Exam Loop</h2>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            {reasoningPYQs.length} Questions
          </span>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-6">
          <div className="flex flex-wrap gap-2">
            {topics.map(t => (
              <button
                key={t}
                onClick={() => setTopicFilter(t)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                  topicFilter === t
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300'
                }`}
              >
                {t === 'all' ? 'All Topics' : t}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {(['all', 'Hot', 'High', 'Confirmed', 'Recurring'] as ProbFilter[]).map(p => (
              <button
                key={p}
                onClick={() => setProbFilter(p)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                  probFilter === p
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-rose-300'
                }`}
              >
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
            sectionId="lr-loop"
          />
        ) : (
          <div className="text-center py-12 text-slate-400">
            <p className="text-4xl mb-2">📭</p>
            <p className="font-medium">No questions match your filters. Try changing the selection.</p>
          </div>
        )}
      </div>
    </section>
  )
}
