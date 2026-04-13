import { useState, useCallback } from 'react'
import { squareCubeData, squareTricks, cubeTricks } from '../data'

type Mode = 'learn' | 'test-square' | 'test-cube' | 'test-both' | 'reverse-square' | 'reverse-cube'
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
  prompt: string
  answer: number
  options: [number, number, number, number]
  type: 'square' | 'cube'
}

function generateQuestions(mode: Mode): TestQ[] {
  const questions: TestQ[] = []

  if (mode === 'test-square' || mode === 'test-both') {
    for (const e of squareCubeData) {
      const wrong = new Set<number>()
      while (wrong.size < 3) {
        const offset = (Math.floor(Math.random() * 60) - 30) || 1
        const w = e.square + offset
        if (w > 0 && w !== e.square) wrong.add(w)
      }
      const opts = shuffle([e.square, ...wrong]) as [number, number, number, number]
      questions.push({ prompt: `${e.n}\u00B2 = ?`, answer: e.square, options: opts, type: 'square' })
    }
  }

  if (mode === 'test-cube' || mode === 'test-both') {
    for (const e of squareCubeData.filter(d => d.cube != null)) {
      const wrong = new Set<number>()
      while (wrong.size < 3) {
        const offset = (Math.floor(Math.random() * 200) - 100) || 1
        const w = e.cube! + offset
        if (w > 0 && w !== e.cube!) wrong.add(w)
      }
      const opts = shuffle([e.cube!, ...wrong]) as [number, number, number, number]
      questions.push({ prompt: `${e.n}\u00B3 = ?`, answer: e.cube!, options: opts, type: 'cube' })
    }
  }

  if (mode === 'reverse-square') {
    for (const e of squareCubeData) {
      const wrong = new Set<number>()
      while (wrong.size < 3) {
        const w = e.n + (Math.floor(Math.random() * 10) - 5) || 1
        if (w > 0 && w !== e.n && w <= 30) wrong.add(w)
      }
      if (wrong.size < 3) { while (wrong.size < 3) wrong.add(wrong.size + 31) }
      const opts = shuffle([e.n, ...wrong]) as [number, number, number, number]
      questions.push({ prompt: `\u221A${e.square} = ?`, answer: e.n, options: opts, type: 'square' })
    }
  }

  if (mode === 'reverse-cube') {
    for (const e of squareCubeData.filter(d => d.cube != null)) {
      const wrong = new Set<number>()
      while (wrong.size < 3) {
        const w = e.n + (Math.floor(Math.random() * 6) - 3) || 1
        if (w > 0 && w !== e.n && w <= 15) wrong.add(w)
      }
      if (wrong.size < 3) { while (wrong.size < 3) wrong.add(wrong.size + 16) }
      const opts = shuffle([e.n, ...wrong]) as [number, number, number, number]
      questions.push({ prompt: `\u221B${e.cube!} = ?`, answer: e.n, options: opts, type: 'cube' })
    }
  }

  return shuffle(questions)
}

export default function SquareCubeTrainer() {
  const [mode, setMode] = useState<Mode>('learn')
  const [queue, setQueue] = useState<TestQ[]>([])
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>('question')
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [mistakes, setMistakes] = useState<TestQ[]>([])
  const [cycle, setCycle] = useState(1)

  const startTest = useCallback((m: Mode) => {
    setMode(m)
    const qs = generateQuestions(m)
    setQueue(qs)
    setIdx(0)
    setPhase('question')
    setScore(0)
    setTotal(0)
    setSelected(null)
    setMistakes([])
    setCycle(1)
  }, [])

  const handleAnswer = useCallback((opt: number) => {
    if (phase !== 'question') return
    setSelected(opt)
    setTotal(t => t + 1)
    const q = queue[idx]
    if (opt === q.answer) {
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
      setQueue(shuffle(mistakes))
      setMistakes([])
      setIdx(0)
      setPhase('question')
      setSelected(null)
    }
  }, [idx, queue.length, mistakes])

  const q = queue[idx]
  const testDone = idx >= queue.length - 1 && (phase === 'correct' || phase === 'wrong') && mistakes.length === 0

  return (
    <section id="qa-squares" className="py-12 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-indigo-500" />
          <h2 className="text-xl font-extrabold text-brand-900">Squares & Cubes Trainer</h2>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            1&sup2;&ndash;30&sup2; &amp; 1&sup3;&ndash;15&sup3;
          </span>
        </div>

        {/* Mode selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setMode('learn')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'learn' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
            Learn Mode
          </button>
          <button onClick={() => startTest('test-square')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'test-square' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
            Test Squares
          </button>
          <button onClick={() => startTest('test-cube')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'test-cube' ? 'bg-violet-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
            Test Cubes
          </button>
          <button onClick={() => startTest('test-both')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'test-both' ? 'bg-blue-700 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
            Test Both
          </button>
          <button onClick={() => startTest('reverse-square')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'reverse-square' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
            Reverse &radic;
          </button>
          <button onClick={() => startTest('reverse-cube')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'reverse-cube' ? 'bg-teal-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
            Reverse &radic;[3]
          </button>
        </div>

        {/* LEARN MODE */}
        {mode === 'learn' && (
          <div className="space-y-8">
            {/* Squares Table */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-extrabold text-blue-600 uppercase tracking-wider mb-4">Squares (1&sup2; to 30&sup2;)</h3>
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
                {squareCubeData.map(e => (
                  <div key={e.n} className="bg-blue-50 border border-blue-100 rounded-xl p-2 text-center">
                    <p className="text-xs text-slate-400 font-medium">{e.n}&sup2;</p>
                    <p className="text-lg font-extrabold text-blue-700">{e.square}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {squareTricks.map(t => (
                  <div key={t.range} className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                    <span className="text-xs font-bold text-amber-700">{t.range}:</span>{' '}
                    <span className="text-xs text-amber-600">{t.trick}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cubes Table */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-extrabold text-indigo-600 uppercase tracking-wider mb-4">Cubes (1&sup3; to 15&sup3;)</h3>
              <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-8 gap-2">
                {squareCubeData.filter(e => e.cube != null).map(e => (
                  <div key={e.n} className="bg-indigo-50 border border-indigo-100 rounded-xl p-2 text-center">
                    <p className="text-xs text-slate-400 font-medium">{e.n}&sup3;</p>
                    <p className="text-lg font-extrabold text-indigo-700">{e.cube}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {cubeTricks.map(t => (
                  <div key={t.range} className="bg-violet-50 border border-violet-100 rounded-lg px-3 py-2">
                    <span className="text-xs font-bold text-violet-700">{t.range}:</span>{' '}
                    <span className="text-xs text-violet-600">{t.trick}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Patterns */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-extrabold text-blue-600 uppercase tracking-wider mb-4">Quick Patterns</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="font-bold text-blue-700 mb-2">Unit Digit Pattern for Squares</p>
                  <p className="text-blue-600">0&sup2;&rarr;0, 1&sup2;&rarr;1, 2&sup2;&rarr;4, 3&sup2;&rarr;9, 4&sup2;&rarr;6, 5&sup2;&rarr;5, 6&sup2;&rarr;6, 7&sup2;&rarr;9, 8&sup2;&rarr;4, 9&sup2;&rarr;1</p>
                  <p className="text-blue-500 mt-1 italic">Pattern: 0,1,4,9,6,5,6,9,4,1 — symmetric around 5!</p>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                  <p className="font-bold text-indigo-700 mb-2">Quick Square: Numbers ending in 5</p>
                  <p className="text-indigo-600">n5&sup2; = n&times;(n+1) followed by 25</p>
                  <p className="text-indigo-500 mt-1 italic">25&sup2;: 2&times;3=6, append 25 &rarr; 625. 35&sup2;: 3&times;4=12, append 25 &rarr; 1225.</p>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="font-bold text-amber-700 mb-2">Perfect Cube check</p>
                  <p className="text-amber-600">Unit digits of cubes: 0&rarr;0, 1&rarr;1, 2&rarr;8, 3&rarr;7, 4&rarr;4, 5&rarr;5, 6&rarr;6, 7&rarr;3, 8&rarr;2, 9&rarr;9</p>
                  <p className="text-amber-500 mt-1 italic">Cube unit digit is unique for each digit — use for elimination!</p>
                </div>
                <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
                  <p className="font-bold text-rose-700 mb-2">(a+b)&sup2; Shortcut for any square</p>
                  <p className="text-rose-600">To find 23&sup2;: Take base 20. (20+3)&sup2; = 400+120+9 = 529</p>
                  <p className="text-rose-500 mt-1 italic">Or use: 23&sup2; = 20&times;26 + 3&sup2; = 520+9 = 529. Pick nearest round number!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TEST MODE */}
        {mode !== 'learn' && q && !testDone && (
          <div className="max-w-lg mx-auto">
            <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
              <span>Cycle {cycle} &middot; Question {idx + 1}/{queue.length}</span>
              <span className="text-blue-600">{score}/{total} correct</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-6">
              <div className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${((idx + 1) / queue.length) * 100}%` }} />
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${q.type === 'square' ? 'text-blue-600 border-blue-300 bg-blue-50' : 'text-indigo-600 border-indigo-300 bg-indigo-50'}`}>
                  {q.type === 'square' ? 'Square' : 'Cube'}
                </span>
                {mistakes.length > 0 && (
                  <span className="text-[10px] text-rose-500 font-bold">{mistakes.length} to retry</span>
                )}
              </div>

              <h3 className="text-3xl font-extrabold text-center text-slate-800 mb-8">{q.prompt}</h3>

              <div className="grid grid-cols-2 gap-3">
                {q.options.map((opt, i) => {
                  let cls = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300'
                  if (phase !== 'question') {
                    if (opt === q.answer) cls = 'bg-emerald-100 border-emerald-400 text-emerald-800'
                    else if (opt === selected) cls = 'bg-red-100 border-red-400 text-red-800'
                    else cls = 'bg-slate-50 border-slate-200 text-slate-400'
                  }
                  return (
                    <button key={i} onClick={() => handleAnswer(opt)}
                      disabled={phase !== 'question'}
                      className={`p-4 rounded-xl border-2 text-xl font-extrabold transition-all ${cls}`}>
                      {opt}
                    </button>
                  )
                })}
              </div>

              {phase !== 'question' && (
                <div className={`mt-4 p-3 rounded-xl text-center text-sm font-bold ${phase === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                  {phase === 'correct' ? 'Correct!' : `Wrong! Answer: ${q.answer}`}
                </div>
              )}

              {phase !== 'question' && (
                <button onClick={nextQuestion}
                  className="mt-4 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-colors">
                  {idx + 1 < queue.length ? 'Next Question \u2192' : mistakes.length > 0 ? `Retry ${mistakes.length} Mistakes \u2192` : 'Finish'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* TEST COMPLETE */}
        {mode !== 'learn' && testDone && (
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
              <div className="text-5xl mb-3">{score === total ? '\uD83C\uDFC6' : score >= total * 0.8 ? '\uD83C\uDF89' : '\uD83D\uDCAA'}</div>
              <h3 className="text-2xl font-extrabold text-slate-800 mb-2">
                {score === total ? 'Perfect Score!' : score >= total * 0.8 ? 'Great Job!' : 'Keep Practicing!'}
              </h3>
              <p className="text-4xl font-extrabold text-indigo-600 mb-1">{score}/{total}</p>
              <p className="text-sm text-slate-500 mb-6">Completed in {cycle} cycle(s)</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => startTest(mode)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-colors">
                  Try Again
                </button>
                <button onClick={() => setMode('learn')}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors">
                  Back to Learn
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
