import { useState, useMemo, useCallback } from 'react'
import { passages, englishQuestions } from '../data'
import type { PassageEntry, EnglishQuestion, Level } from '../data'

const LEVEL_STYLE: Record<Level, string> = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-red-100 text-red-700',
}

const TYPE_STYLE: Record<string, string> = {
  cloze: 'bg-yellow-100 text-yellow-700',
  comprehension: 'bg-blue-100 text-blue-700',
}

function renderClozeText(text: string) {
  // Split on ___(N)___ patterns and render highlighted spans
  const parts = text.split(/(___\(\d+\)___)/g)
  return parts.map((part, i) => {
    const match = part.match(/___\((\d+)\)___/)
    if (match) {
      return (
        <span key={i} className="bg-yellow-100 px-1 rounded font-semibold text-yellow-800">
          ({match[1]})
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export default function ReadingZone() {
  const [typeFilter, setTypeFilter] = useState<'all' | 'cloze' | 'comprehension'>('all')
  const [levelFilter, setLevelFilter] = useState<Level | 'all'>('all')
  const [passageIndex, setPassageIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [passageScores, setPassageScores] = useState<Record<number, { score: number; total: number }>>({})

  const filtered = useMemo(() => {
    let pool = passages
    if (typeFilter !== 'all') pool = pool.filter(p => p.type === typeFilter)
    if (levelFilter !== 'all') pool = pool.filter(p => p.level === levelFilter)
    return pool
  }, [typeFilter, levelFilter])

  const currentPassage: PassageEntry | undefined = filtered[passageIndex]

  const passageQuestions: EnglishQuestion[] = useMemo(() => {
    if (!currentPassage) return []
    return currentPassage.questionIds
      .map(id => englishQuestions.find(q => q.id === id))
      .filter((q): q is EnglishQuestion => q !== undefined)
  }, [currentPassage])

  const currentScore = useMemo(() => {
    if (!submitted) return 0
    return passageQuestions.filter(q => answers[q.id] === q.answer).length
  }, [submitted, passageQuestions, answers])

  const handleSelect = useCallback((questionId: number, option: string) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [questionId]: option }))
  }, [submitted])

  const handleSubmit = useCallback(() => {
    if (!currentPassage) return
    setSubmitted(true)
    const sc = passageQuestions.filter(q => answers[q.id] === q.answer).length
    setPassageScores(prev => ({
      ...prev,
      [currentPassage.id]: { score: sc, total: passageQuestions.length }
    }))
  }, [currentPassage, passageQuestions, answers])

  const navigateTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= filtered.length) return
    setPassageIndex(idx)
    setAnswers({})
    setSubmitted(false)
  }, [filtered.length])

  const handleFilterChange = (type: 'all' | 'cloze' | 'comprehension', level: Level | 'all') => {
    setTypeFilter(type)
    setLevelFilter(level)
    setPassageIndex(0)
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <section className="py-16 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white">
            <span className="mr-2">📖</span>Reading Zone
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl mx-auto">
            Comprehension passages & Cloze tests
          </p>

          {/* Type filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {(['all', 'comprehension', 'cloze'] as const).map(t => (
              <button
                key={t}
                onClick={() => handleFilterChange(t, levelFilter)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  typeFilter === t
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white/10 text-slate-300 border-white/20 hover:bg-white/20'
                }`}
              >
                {t === 'all' ? 'All' : t === 'cloze' ? 'Cloze Test' : 'Comprehension'}
              </button>
            ))}
          </div>

          {/* Level filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {(['all', 'Easy', 'Medium', 'Hard'] as const).map(l => (
              <button
                key={l}
                onClick={() => handleFilterChange(typeFilter, l)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  levelFilter === l
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white/10 text-slate-300 border-white/20 hover:bg-white/20'
                }`}
              >
                {l === 'all' ? 'All Levels' : l}
              </button>
            ))}
          </div>
        </div>

        {/* Passage counter */}
        {filtered.length > 0 && (
          <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-300">
              Passage {passageIndex + 1} of {filtered.length}
            </span>
            {currentPassage && passageScores[currentPassage.id] && (
              <span className="text-sm font-bold text-emerald-400">
                Score: {passageScores[currentPassage.id].score}/{passageScores[currentPassage.id].total}
              </span>
            )}
          </div>
        )}

        {/* No passages */}
        {filtered.length === 0 && (
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-2xl p-10">
              <p className="text-lg text-slate-600">No passages match this filter. Try a different combination.</p>
            </div>
          </div>
        )}

        {/* Passage card */}
        {currentPassage && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">

              {/* Title & badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h3 className="text-xl font-bold text-slate-800">{currentPassage.title}</h3>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${TYPE_STYLE[currentPassage.type]}`}>
                  {currentPassage.type === 'cloze' ? 'Cloze Test' : 'Comprehension'}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${LEVEL_STYLE[currentPassage.level]}`}>
                  {currentPassage.level}
                </span>
              </div>

              {/* Passage text */}
              <div className="text-base leading-relaxed text-slate-700 mb-6 whitespace-pre-line">
                {currentPassage.type === 'cloze'
                  ? renderClozeText(currentPassage.text)
                  : currentPassage.text
                }
              </div>

              <hr className="border-slate-200 mb-6" />

              {/* Questions */}
              <div className="space-y-6">
                {passageQuestions.map((q, qi) => (
                  <div key={q.id}>
                    <p className="text-sm font-bold text-slate-800 mb-3">
                      Q{qi + 1}: {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        let style = 'bg-white border-2 border-slate-200 hover:border-rose-300 text-slate-700'

                        if (!submitted && answers[q.id] === opt) {
                          style = 'bg-rose-50 border-2 border-rose-400 text-slate-800'
                        }

                        if (submitted) {
                          const isCorrect = opt === q.answer
                          const isSelected = answers[q.id] === opt
                          if (isCorrect) {
                            style = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-800'
                          } else if (isSelected && !isCorrect) {
                            style = 'bg-red-50 border-2 border-red-500 text-red-800'
                          } else {
                            style = 'bg-white border-2 border-slate-100 text-slate-400'
                          }
                        }

                        return (
                          <button
                            key={oi}
                            onClick={() => handleSelect(q.id, opt)}
                            disabled={submitted}
                            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${style}`}
                          >
                            <span className="mr-2 text-xs font-bold text-slate-400">
                              {String.fromCharCode(65 + oi)}.
                            </span>
                            {opt}
                            {submitted && opt === q.answer && (
                              <span className="float-right text-emerald-600 font-bold">✓</span>
                            )}
                            {submitted && answers[q.id] === opt && opt !== q.answer && (
                              <span className="float-right text-red-600 font-bold">✗</span>
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {/* Explanation after submit */}
                    {submitted && q.explanation && (
                      <div className="mt-2 p-3 bg-slate-50 rounded-xl">
                        <p className="text-xs text-slate-600">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Submit / Score */}
              <div className="mt-8 text-center">
                {!submitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={passageQuestions.some(q => !answers[q.id])}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-40"
                  >
                    Check Answers
                  </button>
                ) : (
                  <div>
                    <p className="text-lg font-bold text-slate-800 mb-4">
                      {currentScore}/{passageQuestions.length} correct
                    </p>
                    {passageIndex + 1 < filtered.length && (
                      <button
                        onClick={() => navigateTo(passageIndex + 1)}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-3 rounded-xl transition-all"
                      >
                        Next Passage →
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => navigateTo(passageIndex - 1)}
                disabled={passageIndex === 0}
                className="text-sm font-semibold text-slate-400 hover:text-white disabled:opacity-30 transition-all"
              >
                ← Previous Passage
              </button>
              <button
                onClick={() => navigateTo(passageIndex + 1)}
                disabled={passageIndex >= filtered.length - 1}
                className="text-sm font-semibold text-slate-400 hover:text-white disabled:opacity-30 transition-all"
              >
                Next Passage →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
