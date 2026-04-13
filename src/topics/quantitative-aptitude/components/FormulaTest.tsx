import { useState, useCallback, useMemo } from 'react'
import { mathsFormulaData, type FormulaEntry } from '../data'

type Phase = 'question' | 'correct' | 'wrong'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface TestQ {
  id: number
  prompt: string
  correctFormula: string
  options: [string, string, string, string]
  topic: string
  detail: string
  shortcut?: string
}

function generateFormulaQuestions(entries: FormulaEntry[]): TestQ[] {
  return entries.map(f => {
    const others = mathsFormulaData.filter(o => o.id !== f.id)
    const wrongPool = shuffle(others).slice(0, 3).map(o => o.formula)
    while (wrongPool.length < 3) {
      wrongPool.push('No formula needed')
    }
    const opts = shuffle([f.formula, ...wrongPool]) as [string, string, string, string]
    return {
      id: f.id,
      prompt: f.title,
      correctFormula: f.formula,
      options: opts,
      topic: f.topic as string,
      detail: f.detail,
      shortcut: f.shortcut,
    }
  })
}

export default function FormulaTest() {
  const [filterTopic, setFilterTopic] = useState<string>('all')
  const [started, setStarted] = useState(false)
  const [queue, setQueue] = useState<TestQ[]>([])
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>('question')
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [mistakes, setMistakes] = useState<TestQ[]>([])
  const [cycle, setCycle] = useState(1)

  const topics = useMemo(
    () => ['all', ...new Set(mathsFormulaData.map(f => f.topic))] as string[],
    []
  )

  const availableCount = useMemo(() => {
    if (filterTopic === 'all') return mathsFormulaData.length
    return mathsFormulaData.filter(f => f.topic === filterTopic).length
  }, [filterTopic])

  const startQuiz = useCallback(() => {
    let pool: FormulaEntry[] = mathsFormulaData
    if (filterTopic !== 'all') pool = pool.filter(f => f.topic === filterTopic)
    const qs = shuffle(generateFormulaQuestions(pool))
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
    if (opt === q.correctFormula) {
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
      const newQ = generateFormulaQuestions(
        mistakes.map(m => mathsFormulaData.find(f => f.id === m.id)!).filter(Boolean)
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

  return (
    <section id="qa-test" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500" />
          <h2 className="text-xl font-extrabold text-brand-900">Formula Quiz</h2>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            Test your recall
          </span>
        </div>

        {!started ? (
          <div className="max-w-xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-extrabold mb-2">Formula Recall Test</h3>
              <p className="text-blue-100 text-sm mb-6">
                We show you a formula name/concept — you pick the correct formula from 4 options.
                Wrong answers get retested until you get them all right!
              </p>

              {/* Topic selector */}
              <div className="flex flex-wrap gap-2 mb-6">
                {topics.map(t => (
                  <button key={t} onClick={() => setFilterTopic(t)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                      filterTopic === t ? 'bg-white text-blue-700' : 'bg-white/15 text-white/80 hover:bg-white/25'
                    }`}>
                    {t === 'all' ? 'All Topics' : t}
                  </button>
                ))}
              </div>

              <p className="text-blue-200 text-xs mb-4">{availableCount} questions available</p>

              <button onClick={startQuiz}
                className="w-full py-3 rounded-xl bg-white text-blue-700 font-bold hover:bg-blue-50 transition-colors shadow-lg">
                Start Quiz ({availableCount} questions) &rarr;
              </button>
            </div>
          </div>
        ) : testDone ? (
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
              <div className="text-5xl mb-3">{score === total ? '\uD83C\uDFC6' : score >= total * 0.8 ? '\uD83C\uDF89' : '\uD83D\uDCAA'}</div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-2">
                {score === total ? 'All Formulas Mastered!' : 'Good Progress!'}
              </h3>
              <p className="text-4xl font-extrabold text-blue-600 mb-1">{score}/{total}</p>
              <p className="text-sm text-slate-500 mb-6">Completed in {cycle} cycle(s)</p>
              <div className="flex gap-3 justify-center">
                <button onClick={startQuiz}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm">
                  Try Again
                </button>
                <button onClick={() => setStarted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm">
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
              <span className="text-blue-600">{score}/{total} correct</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-6">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${((idx + 1) / queue.length) * 100}%` }} />
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{q.topic}</span>
                {mistakes.length > 0 && (
                  <span className="text-[10px] text-rose-500 font-bold">{mistakes.length} to retry</span>
                )}
              </div>

              <h3 className="text-lg font-extrabold text-slate-800 mb-6">
                What is the formula for: <span className="text-blue-600">{q.prompt}</span>?
              </h3>

              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  let cls = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 cursor-pointer'
                  if (phase !== 'question') {
                    if (opt === q.correctFormula) cls = 'bg-emerald-100 border-emerald-400 text-emerald-800'
                    else if (opt === selected) cls = 'bg-red-100 border-red-400 text-red-800'
                    else cls = 'bg-slate-50 border-slate-200 text-slate-400'
                  }
                  return (
                    <button key={i} onClick={() => handleAnswer(opt)}
                      disabled={phase !== 'question'}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${cls}`}>
                      <span className="text-xs font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                      <span className="font-mono text-sm">{opt}</span>
                    </button>
                  )
                })}
              </div>

              {phase !== 'question' && (
                <>
                  <div className={`mt-4 p-4 rounded-xl ${phase === 'correct' ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
                    <p className={`text-sm font-bold ${phase === 'correct' ? 'text-emerald-700' : 'text-red-700'}`}>
                      {phase === 'correct' ? 'Correct!' : 'Wrong!'}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">{q.detail}</p>
                    {q.shortcut && (
                      <p className="text-xs text-amber-600 mt-1 italic">Shortcut: {q.shortcut}</p>
                    )}
                  </div>
                  <button onClick={nextQuestion}
                    className="mt-4 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors">
                    {idx + 1 < queue.length ? 'Next \u2192' : mistakes.length > 0 ? `Retry ${mistakes.length} Mistakes \u2192` : 'Finish'}
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
