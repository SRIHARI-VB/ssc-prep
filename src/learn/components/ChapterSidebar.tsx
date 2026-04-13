import { useState, useEffect, useRef } from 'react'
import type { Chapter, LearnProgress } from '../types'

interface Props {
  chapters: Chapter[]
  progress: LearnProgress
  currentChapter: number
  currentConcept: number
  onNavigate: (chapterIdx: number, conceptIdx: number) => void
}

export default function ChapterSidebar({ chapters, progress, currentChapter, currentConcept, onNavigate }: Props) {
  const [expandedChapter, setExpandedChapter] = useState(currentChapter)
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setExpandedChapter(currentChapter)
  }, [currentChapter])

  // Scroll active item into view
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [currentChapter, currentConcept])

  return (
    <nav className="h-full overflow-y-auto space-y-1 pr-2">
      {chapters.map((ch, ci) => {
        const learnedCount = ch.concepts.filter(c => progress.concepts[c.id]).length
        const isExpanded = expandedChapter === ci
        const isCurrent = ci === currentChapter

        return (
          <div key={ch.id}>
            {/* Chapter header */}
            <button
              onClick={() => setExpandedChapter(isExpanded ? -1 : ci)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                isCurrent
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="text-base">{ch.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="truncate">{ch.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${ch.concepts.length ? (learnedCount / ch.concepts.length) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {learnedCount}/{ch.concepts.length}
                  </span>
                </div>
              </div>
              <svg
                className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Concept list */}
            {isExpanded && (
              <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-slate-200 pl-3">
                {ch.concepts.map((concept, cIdx) => {
                  const isActive = ci === currentChapter && cIdx === currentConcept
                  const isLearnedItem = !!progress.concepts[concept.id]
                  return (
                    <button
                      key={concept.id}
                      ref={isActive ? activeRef : null}
                      onClick={() => onNavigate(ci, cIdx)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-all flex items-center gap-2 ${
                        isActive
                          ? 'bg-indigo-100 text-indigo-700 font-semibold'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 text-[8px] ${
                        isLearnedItem
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : isActive
                            ? 'border-indigo-400 bg-indigo-50'
                            : 'border-slate-300'
                      }`}>
                        {isLearnedItem ? '✓' : ''}
                      </span>
                      <span className="truncate">{concept.title}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
