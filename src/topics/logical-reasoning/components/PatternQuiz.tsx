import { useState, useCallback, useMemo } from 'react'
import { reasoningConceptData, type ReasoningConceptEntry } from '../data'

type Phase = 'question' | 'correct' | 'wrong'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface QuizQ {
  id: number
  title: string
  correctMethod: string
  options: [string, string, string, string]
  topic: string
  detail: string
  shortcut?: string
}

function generateMethodQuestions(entries: ReasoningConceptEntry[]): QuizQ[] {
  return entries.map(c => {
    // Pick 3 wrong methods from different concepts
    const others = reasoningConceptData.filter(o => o.id !== c.id)
    const wrongPool = shuffle(others).slice(0, 3).map(o => o.method)
    while (wrongPool.length < 3) {
      wrongPool.push('No specific method needed')
    }
    const opts = shuffle([c.method, ...wrongPool]) as [string, string, string, string]
    return {
      id: c.id,
      title: c.title,
      correctMethod: c.method,
      options: opts,
      topic: c.topic as string,
      detail: c.detail,
      shortcut: c.shortcut,
    }
  })
}

export default function PatternQuiz() {
  const [filterTopic, setFilterTopic] = useState<string>('all')
  const [started, setStarted] = useState(false)
  const [queue, setQueue] = useState<QuizQ[]>([])
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>('question')
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [mistakes, setMistakes] = useState<QuizQ[]>([])
  const [cycle, setCycle] = useState(1)

  const topics = useMemo(
    () => ['all', ...new Set(reasoningConceptData.map(c => c.topic))],
    []
  )

  const availableCount = useMemo(() => {
    let pool = reasoningConceptData
    if (filterTopic !== 'all') pool = pool.filter(c => c.topic === filterTopic)
    return pool.length
  }, [filterTopic])

  const startQuiz = useCallback(() => {
    let pool = reasoningConceptData
    if (filterTopic !== 'all') pool = pool.filter(c => c.topic === filterTopic)
    const qs = shuffle(generateMethodQuestions(pool))
    setQueue(qs)
    setIdx(0)
    setPhase('question')
    setScore(0)
    setTotal(0)
    setSelected(null)
    setMistakes([])
    setCycle(1)
    setStarted(true)
  }, [filterTopic])

  const handleAnswer = useCallback((opt: string) => {
    if (phase !== 'question') return
    setSelected(opt)
    setTotal(t => t + 1)
    const q = queue[idx]
    if (opt === q.correctMethod) {
      setScore(s => s + 1)
      setPhase('correct')
    } else {
      setMistakes(prev => [...prev, q])
      setPhase('wrong')
    }
  }, [phase, queue, idx])

  const nextQuestion = useCallback(() => {
    if (idx + 1 < queue.length) {
      setIdx(i => i + 1)
      setPhase('question')
      setSelected(null)
    } else if (mistakes.length > 0) {
      setCycle(c => c + 1)
      const newQ = generateMethodQuestions(
        mistakes.map(m => reasoningConceptData.find(c => c.id === m.id)!).filter(Boolean)
      )
      setQueue(shuffle(newQ))
      setMistakes([])
      setIdx(0)
      setPhase('question')
      setSelected(null)
    }
  }, [idx, queue.length, mistakes])

  const q = queue[idx]
  const testDone = started && (idx >= queue.length - 1) && (phase !== 'question') && mistakes.length === 0

  /** Truncate method text for option display */
  const truncate = (text: string, max: number) =>
    text.length > max ? text.slice(0, max) + '...' : text

  return (
    <section id="lr-test" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-emerald-500 to-cyan-500" />
          <h2 className="text-xl font-extrabold text-brand-900">Method Quiz</h2>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            What method to use?
          </span>
        </div>

        {!started ? (
          <div className="max-w-xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-extrabold mb-2">Method Recall Test</h3>
              <p className="text-emerald-100 text-sm mb-6">
                We show a concept title &mdash; you pick the correct method/approach from 4 options.
                Wrong answers get retested until you master them all!
              </p>

              {/* Topic selector */}
              <div className="flex flex-wrap gap-2 mb-6">
                {topics.map(t => (
                  <button
                    key={t}
                    onClick={() => setFilterTopic(t)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                      filterTopic === t
                        ? 'bg-white text-emerald-700'
                        : 'bg-white/15 text-white/80 hover:bg-white/25'
                    }`}
                  >
                    {t === 'all' ? 'All Topics' : t}
                  </button>
                ))}
              </div>

              <p className="text-emerald-200 text-xs mb-4">{availableCount} concepts available</p>

              <button
                onClick={startQuiz}
                className="w-full py-3 rounded-xl bg-white text-emerald-700 font-bold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                Start Quiz ({availableCount} concepts) &rarr;
              </button>
            </div>
          </div>
        ) : testDone ? (
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
              <div className="text-5xl mb-3">{score === total ? '🏆' : score >= total * 0.8 ? '🎉' : '💪'}</div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-2">
                {score === total ? 'All Methods Mastered!' : 'Good Progress!'}
              </h3>
              <p className="text-4xl font-extrabold text-emerald-600 mb-1">{score}/{total}</p>
              <p className="text-sm text-slate-500 mb-6">Completed in {cycle} cycle(s)</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={startQuiz}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm"
                >
                  Try Again
                </button>
                <button
                  onClick={() => setStarted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
                >
                  Change Filter
                </button>
              </div>
            </div>
          </div>
        ) : q ? (
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
              <span>Cycle {cycle} &middot; Q {idx + 1}/{queue.length}</span>
              <span className="text-emerald-600">{score}/{total} correct</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${((idx + 1) / queue.length) * 100}%` }}
              />
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {q.topic}
                </span>
                {mistakes.length > 0 && (
                  <span className="text-[10px] text-rose-500 font-bold">{mistakes.length} to retry</span>
                )}
              </div>

              <h3 className="text-lg font-extrabold text-slate-800 mb-6">
                What method is used for: <span className="text-emerald-600">{q.title}</span>?
              </h3>

              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  let cls = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 cursor-pointer'
                  if (phase !== 'question') {
                    if (opt === q.correctMethod) cls = 'bg-emerald-100 border-emerald-400 text-emerald-800'
                    else if (opt === selected) cls = 'bg-red-100 border-red-400 text-red-800'
                    else cls = 'bg-slate-50 border-slate-200 text-slate-400'
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      disabled={phase !== 'question'}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${cls}`}
                    >
                      <span className="text-xs font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                      <span className="text-sm">{truncate(opt, 120)}</span>
                    </button>
                  )
                })}
              </div>

              {phase !== 'question' && (
                <>
                  <div className={`mt-4 p-4 rounded-xl ${
                    phase === 'correct' ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <p className={`text-sm font-bold ${phase === 'correct' ? 'text-emerald-700' : 'text-red-700'}`}>
                      {phase === 'correct' ? '✅ Correct!' : '❌ Wrong!'}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">{q.detail}</p>
                    {q.shortcut && (
                      <p className="text-xs text-amber-600 mt-1 italic">💡 {q.shortcut}</p>
                    )}
                  </div>
                  <button
                    onClick={nextQuestion}
                    className="mt-4 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors"
                  >
                    {idx + 1 < queue.length ? 'Next' : mistakes.length > 0 ? `Retry ${mistakes.length} Mistakes` : 'Finish'}
                     &rarr;
                  </button>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
