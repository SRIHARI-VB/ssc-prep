import { useState, useMemo, useCallback } from 'react'
import { englishQuestions, grammarRules } from '../data'
import type { EnglishQuestion, GrammarRule, Level } from '../data'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type Phase = 'question' | 'correct' | 'wrong'

const GRAMMAR_QTYPES = ['error-spotting', 'sentence-improvement', 'active-passive', 'direct-indirect', 'fill-blank'] as const

const TOPIC_PILLS = ['All', 'Tenses', 'SVA', 'Articles', 'Prepositions', 'Voice', 'Speech', 'Modifiers'] as const

const LEVEL_STYLE: Record<Level, string> = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-red-100 text-red-700',
}

const QTYPE_STYLE: Record<string, string> = {
  'error-spotting': 'bg-purple-100 text-purple-700',
  'sentence-improvement': 'bg-blue-100 text-blue-700',
  'active-passive': 'bg-cyan-100 text-cyan-700',
  'direct-indirect': 'bg-indigo-100 text-indigo-700',
  'fill-blank': 'bg-pink-100 text-pink-700',
}

export default function GrammarGym() {
  const [topicFilter, setTopicFilter] = useState<string>('All')
  const [levelFilter, setLevelFilter] = useState<Level | 'all'>('all')
  const [pool, setPool] = useState<EnglishQuestion[]>(() => {
    const base = englishQuestions.filter(q => (GRAMMAR_QTYPES as readonly string[]).includes(q.qtype))
    return shuffle(base)
  })
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('question')
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [streak, setStreak] = useState(0)
  const [suggestLevel, setSuggestLevel] = useState<Level | null>(null)
  const [dismissed, setDismissed] = useState(false)

  const rebuildPool = useCallback((topic: string, level: Level | 'all') => {
    let base = englishQuestions.filter(q => (GRAMMAR_QTYPES as readonly string[]).includes(q.qtype))
    if (topic !== 'All') {
      base = base.filter(q => (q.topic ?? '').toLowerCase().includes(topic.toLowerCase()))
    }
    if (level !== 'all') {
      base = base.filter(q => q.level === level)
    }
    const shuffled = shuffle(base)
    setPool(shuffled)
    setIndex(0)
    setPhase('question')
    setSelected(null)
    setScore(0)
    setTotal(0)
    setStreak(0)
    setSuggestLevel(null)
    setDismissed(false)
  }, [])

  const handleTopicChange = (t: string) => {
    setTopicFilter(t)
    rebuildPool(t, levelFilter)
  }

  const handleLevelChange = (l: Level | 'all') => {
    setLevelFilter(l)
    rebuildPool(topicFilter, l)
  }

  const currentQ: EnglishQuestion | undefined = pool[index]

  const matchedRule: GrammarRule | undefined = useMemo(() => {
    if (!currentQ?.ruleTag) return undefined
    const id = parseInt(currentQ.ruleTag, 10)
    if (isNaN(id)) return undefined
    return grammarRules.find(r => r.id === id)
  }, [currentQ])

  const handleAnswer = useCallback((opt: string) => {
    if (phase !== 'question' || !currentQ) return
    setSelected(opt)
    setTotal(t => t + 1)
    if (opt === currentQ.answer) {
      setScore(s => s + 1)
      const newStreak = streak + 1
      setStreak(newStreak)
      setPhase('correct')
      // Auto-difficulty suggestion
      if (newStreak === 5 && !dismissed) {
        if (levelFilter === 'Easy' || levelFilter === 'all') {
          setSuggestLevel('Medium')
        } else if (levelFilter === 'Medium') {
          setSuggestLevel('Hard')
        }
      }
    } else {
      setStreak(0)
      setPhase('wrong')
      setSuggestLevel(null)
    }
  }, [phase, currentQ, streak, levelFilter, dismissed])

  const nextQuestion = useCallback(() => {
    if (index + 1 < pool.length) {
      setIndex(i => i + 1)
      setPhase('question')
      setSelected(null)
    }
  }, [index, pool.length])

  const acceptSuggestion = () => {
    if (suggestLevel) {
      setLevelFilter(suggestLevel)
      rebuildPool(topicFilter, suggestLevel)
      setSuggestLevel(null)
      setDismissed(true)
    }
  }

  const dismissSuggestion = () => {
    setSuggestLevel(null)
    setDismissed(true)
  }

  const pct = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <section className="py-16 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white">
            <span className="mr-2">🏋️</span>Grammar Gym
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl mx-auto">
            Fix sentences, learn rules. Not a textbook.
          </p>

          {/* Topic pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {TOPIC_PILLS.map(t => (
              <button
                key={t}
                onClick={() => handleTopicChange(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  topicFilter === t
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white/10 text-slate-300 border-white/20 hover:bg-white/20'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Level pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {(['all', 'Easy', 'Medium', 'Hard'] as const).map(l => (
              <button
                key={l}
                onClick={() => handleLevelChange(l)}
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

        {/* Score bar */}
        <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-300">
            Score: {score}/{total} ({pct}%)
          </span>
          {streak >= 2 && (
            <span className="text-sm font-bold text-amber-400">
              🔥 {streak} streak
            </span>
          )}
        </div>

        {/* Auto-difficulty suggestion */}
        {suggestLevel && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-amber-800">
                {suggestLevel === 'Hard' ? "You're on fire!" : 'Great streak!'} Try {suggestLevel}?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={acceptSuggestion}
                  className="px-4 py-1.5 text-xs font-bold rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-all"
                >
                  Yes
                </button>
                <button
                  onClick={dismissSuggestion}
                  className="px-4 py-1.5 text-xs font-bold rounded-lg bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Stay on {levelFilter === 'all' ? 'All' : levelFilter}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No questions */}
        {pool.length === 0 && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-2xl p-10">
              <p className="text-lg text-slate-600">No questions match this filter. Try a different combination.</p>
            </div>
          </div>
        )}

        {/* Question card */}
        {currentQ && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">

              {/* Header */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Fix this sentence
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${LEVEL_STYLE[currentQ.level]}`}>
                  {currentQ.level}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${QTYPE_STYLE[currentQ.qtype] || 'bg-slate-100 text-slate-600'}`}>
                  {currentQ.qtype.replace(/-/g, ' ')}
                </span>
                <span className="ml-auto text-xs text-slate-400">
                  {index + 1}/{pool.length}
                </span>
              </div>

              {/* Question */}
              <p className="text-lg font-medium text-slate-800 mb-6 leading-relaxed">{currentQ.question}</p>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, i) => {
                  let style = 'bg-white border-2 border-slate-200 hover:border-rose-300 text-slate-700'
                  if (phase !== 'question') {
                    const isCorrect = opt === currentQ.answer
                    const isSelected = opt === selected
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
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      disabled={phase !== 'question'}
                      className={`w-full text-left px-5 py-3 rounded-xl font-medium transition-all ${style}`}
                    >
                      <span className="mr-2 text-xs font-bold text-slate-400">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                      {phase !== 'question' && opt === currentQ.answer && (
                        <span className="float-right text-emerald-600 font-bold">✓</span>
                      )}
                      {phase !== 'question' && opt === selected && opt !== currentQ.answer && (
                        <span className="float-right text-red-600 font-bold">✗</span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Rule card */}
              {phase !== 'question' && matchedRule && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6 transition-all">
                  <p className="text-sm font-bold text-amber-800 mb-2">
                    📏 RULE: {matchedRule.category}
                  </p>
                  <p className="text-sm text-slate-700 mb-2">{matchedRule.rule}</p>
                  <p className="text-sm text-emerald-700 mb-1">✅ Correct: {matchedRule.correctUsage}</p>
                  <p className="text-sm text-red-700 mb-1">❌ Wrong: {matchedRule.incorrectUsage}</p>
                  <p className="text-sm text-amber-700 mt-2">💡 Tip: {matchedRule.tip}</p>
                </div>
              )}

              {/* Explanation */}
              {phase !== 'question' && currentQ.explanation && (
                <div className="mt-4 p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Explanation</p>
                  <p className="text-sm text-slate-700">{currentQ.explanation}</p>
                </div>
              )}

              {/* Rule note from question */}
              {phase !== 'question' && currentQ.ruleNote && !matchedRule && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                  <p className="text-sm text-amber-800">
                    📏 {currentQ.ruleNote}
                  </p>
                </div>
              )}

              {/* Next button */}
              {phase !== 'question' && (
                <div className="mt-6 text-center">
                  <button
                    onClick={nextQuestion}
                    disabled={index + 1 >= pool.length}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
