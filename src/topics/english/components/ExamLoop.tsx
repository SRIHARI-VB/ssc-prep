import { useState, useMemo } from 'react'
import { englishQuestions } from '../data'
import type { EnglishQType, Level, EnglishQuestion } from '../data'
import ExamEngine from '../../../engine/ExamEngine'
import type { EngineQuestion, CategoryMap, AccentPalette } from '../../../engine/types'

type ProbFilter = 'all' | 'Hot' | 'High' | 'Confirmed' | 'Recurring'

const ACCENT: AccentPalette = {
  chipActive: 'bg-rose-600 text-white border-rose-600',
  optHover: 'hover:bg-rose-50 hover:border-rose-300',
  bar: 'bg-rose-500',
  scoreText: 'text-rose-600',
  nextBtn: 'bg-rose-600 hover:bg-rose-500 text-white',
  text: 'text-rose-600',
}

const QTYPE_DEF: CategoryMap = {
  'Error Spotting':          { icon: '🔍', color: 'border-red-400 bg-red-50 text-red-700' },
  'Fill in the Blank':       { icon: '📝', color: 'border-blue-400 bg-blue-50 text-blue-700' },
  'Sentence Improvement':    { icon: '✏️', color: 'border-green-400 bg-green-50 text-green-700' },
  'Synonyms':                { icon: '🔤', color: 'border-teal-400 bg-teal-50 text-teal-700' },
  'Antonyms':                { icon: '🔀', color: 'border-purple-400 bg-purple-50 text-purple-700' },
  'Idioms & Phrases':        { icon: '💬', color: 'border-amber-400 bg-amber-50 text-amber-700' },
  'One Word Substitution':   { icon: '🎯', color: 'border-indigo-400 bg-indigo-50 text-indigo-700' },
  'Spelling Correction':     { icon: '📋', color: 'border-pink-400 bg-pink-50 text-pink-700' },
  'Cloze Test':              { icon: '📄', color: 'border-cyan-400 bg-cyan-50 text-cyan-700' },
  'Para Jumble':             { icon: '🔀', color: 'border-orange-400 bg-orange-50 text-orange-700' },
  'Active/Passive':          { icon: '🔄', color: 'border-violet-400 bg-violet-50 text-violet-700' },
  'Direct/Indirect':         { icon: '💭', color: 'border-emerald-400 bg-emerald-50 text-emerald-700' },
  'Reading Comprehension':   { icon: '📖', color: 'border-rose-400 bg-rose-50 text-rose-700' },
  'Sentence Rearrangement':  { icon: '📑', color: 'border-lime-400 bg-lime-50 text-lime-700' },
}

const QTYPE_LABELS: Record<EnglishQType, string> = {
  'error-spotting':           'Error Spotting',
  'fill-blank':               'Fill in the Blank',
  'sentence-improvement':     'Sentence Improvement',
  'synonyms':                 'Synonyms',
  'antonyms':                 'Antonyms',
  'idioms-phrases':           'Idioms & Phrases',
  'one-word-substitution':    'One Word Substitution',
  'spelling-correction':      'Spelling Correction',
  'cloze-test':               'Cloze Test',
  'para-jumble':              'Para Jumble',
  'sentence-rearrangement':   'Sentence Rearrangement',
  'active-passive':           'Active/Passive',
  'direct-indirect':          'Direct/Indirect',
  'reading-comprehension':    'Reading Comprehension',
}

export default function ExamLoop() {
  const [filterType, setFilterType] = useState<EnglishQType | 'all'>('all')
  const [filterLevel, setFilterLevel] = useState<Level | 'all'>('all')
  const [filterTier, setFilterTier] = useState<'tier1' | 'tier2' | 'both' | 'all'>('all')
  const [filterProb, setFilterProb] = useState<ProbFilter>('all')

  const qtypes = useMemo(
    () => ['all', ...new Set(englishQuestions.map(q => q.qtype))] as (EnglishQType | 'all')[],
    []
  )

  const questions: EngineQuestion[] = useMemo(() => {
    // Exclude passage-based reading comprehension questions
    let pool: EnglishQuestion[] = englishQuestions.filter(q => !q.passageId)
    if (filterType !== 'all') pool = pool.filter(q => q.qtype === filterType)
    if (filterLevel !== 'all') pool = pool.filter(q => q.level === filterLevel)
    if (filterTier !== 'all') pool = pool.filter(q => q.tier === filterTier)
    if (filterProb !== 'all') pool = pool.filter(q => q.examProb === filterProb)
    return pool.map(q => ({
      id: q.id,
      topic: QTYPE_LABELS[q.qtype],
      question: q.question,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation + (q.ruleNote ? `\n\n📏 Rule: ${q.ruleNote}` : ''),
      hint: q.hint,
      examProb: q.examProb,
    }))
  }, [filterType, filterLevel, filterTier, filterProb])

  return (
    <section id="eng-loop" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-rose-500 to-pink-500" />
          <h2 className="text-xl font-extrabold text-brand-900">English — Exam Loop</h2>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
            {englishQuestions.filter(q => !q.passageId).length} Questions
          </span>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-6">
          {/* Row 1: Question type pills */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
            {qtypes.map(t => (
              <button key={t} onClick={() => setFilterType(t)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all whitespace-nowrap ${
                  filterType === t ? ACCENT.chipActive : 'bg-white text-slate-500 border-slate-200 hover:border-rose-300'
                }`}>
                {t === 'all' ? 'All Types' : QTYPE_LABELS[t]}
              </button>
            ))}
          </div>

          {/* Row 2: Level pills */}
          <div className="flex gap-2">
            {(['all', 'Easy', 'Medium', 'Hard'] as (Level | 'all')[]).map(l => (
              <button key={l} onClick={() => setFilterLevel(l)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                  filterLevel === l ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-slate-500 border-slate-200 hover:border-pink-300'
                }`}>
                {l === 'all' ? 'All Levels' : l}
              </button>
            ))}
          </div>

          {/* Row 3: Tier pills + Prob pills */}
          <div className="flex gap-2 flex-wrap">
            {(['all', 'tier1', 'tier2', 'both'] as ('tier1' | 'tier2' | 'both' | 'all')[]).map(t => (
              <button key={t} onClick={() => setFilterTier(t)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                  filterTier === t ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'
                }`}>
                {t === 'all' ? 'All Tiers' : t === 'tier1' ? 'Tier 1' : t === 'tier2' ? 'Tier 2' : 'Both'}
              </button>
            ))}
            <span className="w-px bg-slate-200 mx-1" />
            {(['all', 'Hot', 'High', 'Confirmed', 'Recurring'] as ProbFilter[]).map(p => (
              <button key={p} onClick={() => setFilterProb(p)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                  filterProb === p ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'
                }`}>
                {p === 'all' ? 'All Prob' : p}
              </button>
            ))}
          </div>
        </div>

        {questions.length > 0 ? (
          <ExamEngine
            key={`${filterType}-${filterLevel}-${filterTier}-${filterProb}`}
            questions={questions}
            getCat={q => q.topic}
            catDef={QTYPE_DEF}
            accent={ACCENT}
            sectionId="eng-loop"
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
