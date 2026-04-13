import { useState, useCallback, useMemo } from 'react'
import type { LearnConcept, LearnProgress, GlossaryEntry } from '../types'
import { loadProgress, markConceptReviewed, getReviewDueIds } from '../storage'
import ComprehensionCheck from './ComprehensionCheck'
import GlossaryText from './GlossaryText'
import GlossaryDrawer from './GlossaryDrawer'

interface Props {
  allConcepts: LearnConcept[]
  glossary: GlossaryEntry[]
}

export default function ReviewView({ allConcepts, glossary }: Props) {
  const [progress, setProgress] = useState<LearnProgress>(loadProgress)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [glossaryTerm, setGlossaryTerm] = useState<GlossaryEntry | null>(null)

  const reviewQueue = useMemo(() => {
    const dueIds = getReviewDueIds(progress)
    const conceptMap = new Map(allConcepts.map(c => [c.id, c]))
    return dueIds.map(id => conceptMap.get(id)).filter((c): c is LearnConcept => !!c)
  }, [progress, allConcepts])

  const concept = reviewQueue[currentIdx]

  const handleReviewed = useCallback(() => {
    if (!concept) return
    const updated = markConceptReviewed(concept.id)
    setProgress(updated)
    setShowQuiz(false)
    // Move to next or stay if last
    if (currentIdx < reviewQueue.length - 1) {
      setCurrentIdx(currentIdx + 1)
    }
  }, [concept, currentIdx, reviewQueue.length])

  const handleGlossaryNavigate = useCallback((term: string) => {
    const entry = glossary.find(g =>
      g.term.toLowerCase() === term.toLowerCase() ||
      g.aliases?.some(a => a.toLowerCase() === term.toLowerCase())
    )
    if (entry) setGlossaryTerm(entry)
  }, [glossary])

  // Find next review date
  const nextReviewDate = useMemo(() => {
    const allNextDates = Object.values(progress.concepts)
      .map(c => c.nextReviewAt)
      .filter(d => d > Date.now())
      .sort((a, b) => a - b)
    return allNextDates[0] ? new Date(allNextDates[0]) : null
  }, [progress])

  if (reviewQueue.length === 0) {
    const learnedCount = Object.keys(progress.concepts).length
    return (
      <div className="max-w-lg mx-auto py-16 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-brand-900">All Caught Up!</h2>
        <p className="mt-3 text-slate-500 text-sm">
          {learnedCount === 0
            ? 'Start learning concepts in the Study tab — they\'ll appear here for review after 3 days.'
            : `You have ${learnedCount} concepts learned. No reviews due right now.`
          }
        </p>
        {nextReviewDate && (
          <p className="mt-4 text-xs text-slate-400">
            Next review: <span className="font-semibold text-indigo-600">{nextReviewDate.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </p>
        )}
      </div>
    )
  }

  // Active review exists but current concept may have been reviewed
  const isStillDue = concept && progress.concepts[concept.id]?.nextReviewAt <= Date.now()

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Review counter */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-brand-900">Review Queue</h2>
          <p className="text-sm text-slate-500 mt-1">
            {reviewQueue.length} concept{reviewQueue.length !== 1 ? 's' : ''} due for review
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            {currentIdx + 1} / {reviewQueue.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all"
          style={{ width: `${((currentIdx + (isStillDue ? 0 : 1)) / reviewQueue.length) * 100}%` }}
        />
      </div>

      {concept && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{concept.category}</span>
              <h3 className="text-lg font-extrabold text-brand-900 mt-0.5">{concept.title}</h3>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
              concept.examProb === 'Hot'
                ? 'text-red-600 bg-red-50 border-red-200'
                : 'text-emerald-600 bg-emerald-50 border-emerald-200'
            }`}>
              {concept.examProb}
            </span>
          </div>

          {/* Explanation */}
          <div className="px-6 py-5">
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              <GlossaryText text={concept.explanation} glossary={glossary} onTermClick={setGlossaryTerm} />
            </div>

            {concept.memoryHook && (
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Memory Hook</p>
                <p className="text-sm font-semibold text-amber-800">{concept.memoryHook}</p>
              </div>
            )}

            {/* Quiz section */}
            {concept.checkQuestion && concept.checkOptions && concept.checkAnswer && (
              <div className="mt-5">
                {!showQuiz ? (
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Show Quiz &darr;
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

          {/* Actions */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => { if (currentIdx > 0) { setCurrentIdx(currentIdx - 1); setShowQuiz(false) } }}
              disabled={currentIdx === 0}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                currentIdx > 0 ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-300 cursor-not-allowed'
              }`}
            >
              &larr; Previous
            </button>

            <button
              onClick={handleReviewed}
              className="px-5 py-2 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-sm"
            >
              Mark as Reviewed ✓
            </button>

            <button
              onClick={() => { if (currentIdx < reviewQueue.length - 1) { setCurrentIdx(currentIdx + 1); setShowQuiz(false) } }}
              disabled={currentIdx >= reviewQueue.length - 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                currentIdx < reviewQueue.length - 1 ? 'text-indigo-600 hover:bg-indigo-50 font-semibold' : 'text-slate-300 cursor-not-allowed'
              }`}
            >
              Skip &rarr;
            </button>
          </div>
        </div>
      )}

      <GlossaryDrawer
        entry={glossaryTerm}
        onClose={() => setGlossaryTerm(null)}
        onNavigate={handleGlossaryNavigate}
      />
    </div>
  )
}
