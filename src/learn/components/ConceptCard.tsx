import { useState } from 'react'
import type { LearnConcept, GlossaryEntry } from '../types'
import ComprehensionCheck from './ComprehensionCheck'
import GlossaryText from './GlossaryText'

interface Props {
  concept: LearnConcept
  chapterTitle: string
  index: number
  total: number
  isLearned: boolean
  glossary: GlossaryEntry[]
  onTermClick: (entry: GlossaryEntry) => void
  onMarkLearned: () => void
  onPrev: (() => void) | null
  onNext: (() => void) | null
}

export default function ConceptCard({
  concept, chapterTitle, index, total, isLearned,
  glossary, onTermClick, onMarkLearned, onPrev, onNext,
}: Props) {
  const [showQuiz, setShowQuiz] = useState(false)

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 flex-wrap">
        <span>{chapterTitle}</span>
        <span>/</span>
        <span className="text-slate-500 font-medium">{concept.category}</span>
        <span className="ml-auto text-slate-500">
          Concept {index + 1} of {total}
        </span>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold text-brand-900">{concept.title}</h2>
            {isLearned && (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Learned
              </span>
            )}
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
            concept.examProb === 'Hot'
              ? 'text-red-600 bg-red-50 border-red-200'
              : 'text-emerald-600 bg-emerald-50 border-emerald-200'
          }`}>
            {concept.examProb === 'Hot' ? 'Hot' : 'Confirmed PYQ'}
          </span>
        </div>

        {/* Explanation */}
        <div className="px-6 py-5">
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            <GlossaryText text={concept.explanation} glossary={glossary} onTermClick={onTermClick} />
          </div>

          {/* Memory Hook */}
          {concept.memoryHook && (
            <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Memory Hook</p>
              <p className="text-sm font-semibold text-amber-800">
                <GlossaryText text={concept.memoryHook} glossary={glossary} onTermClick={onTermClick} />
              </p>
            </div>
          )}

          {/* PYQ Context */}
          {concept.pyqContext && (
            <p className="mt-4 text-xs text-slate-400 italic">
              PYQ: {concept.pyqContext}
            </p>
          )}

          {/* Comprehension Check */}
          {concept.checkQuestion && concept.checkOptions && concept.checkAnswer && (
            <div className="mt-5">
              {!showQuiz ? (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  Test Yourself
                </button>
              ) : (
                <ComprehensionCheck
                  question={concept.checkQuestion}
                  options={concept.checkOptions}
                  answer={concept.checkAnswer}
                />
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={onPrev || undefined}
            disabled={!onPrev}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              onPrev
                ? 'text-slate-600 hover:bg-slate-100'
                : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            &larr; Previous
          </button>

          <button
            onClick={onMarkLearned}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              isLearned
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
            }`}
          >
            {isLearned ? 'Learned ✓' : 'Mark as Learned ✓'}
          </button>

          <button
            onClick={onNext || undefined}
            disabled={!onNext}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              onNext
                ? 'text-indigo-600 hover:bg-indigo-50 font-semibold'
                : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
