import { useState } from 'react'
import { chapters, allConcepts, totalConceptCount } from '../learn/curriculum'
import { loadProgress, getReviewDueIds } from '../learn/storage'
import StudyView from '../learn/components/StudyView'
import ReviewView from '../learn/components/ReviewView'
import ProgressView from '../learn/components/ProgressView'

// Lazy import glossary (it may be large)
import { glossary } from '../learn/glossary'

type Tab = 'study' | 'review' | 'progress'

export default function LearnPage() {
  const [tab, setTab] = useState<Tab>('study')
  const progress = loadProgress()
  const reviewDueCount = getReviewDueIds(progress).length
  const learnedCount = Object.keys(progress.concepts).length
  const pct = totalConceptCount ? Math.round((learnedCount / totalConceptCount) * 100) : 0

  const initialPosition = progress.lastPosition || { chapterIndex: 0, conceptIndex: 0 }

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: 'study', label: 'Study' },
    { id: 'review', label: 'Review', badge: reviewDueCount || undefined },
    { id: 'progress', label: 'Progress' },
  ]

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-900 via-indigo-950 to-violet-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full mb-4">
              Learn Mode &middot; Structured Study Path
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Concept Study
              <span className="block text-indigo-400 text-xl md:text-2xl mt-1">Read &rarr; Understand &rarr; Review every 3 days</span>
            </h1>
            <p className="mt-4 text-slate-300 text-sm max-w-lg leading-relaxed">
              <strong className="text-white">{totalConceptCount} concepts</strong> from{' '}
              <strong className="text-indigo-400">{chapters.length} topics</strong> — only PYQ-important (Hot + Confirmed).
              Learn in order like a textbook. Tap any unfamiliar term for a brief.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: `${totalConceptCount} Concepts`, cls: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300' },
                { label: `${learnedCount} Learned`, cls: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' },
                { label: `${pct}% Complete`, cls: 'bg-violet-500/20 border-violet-500/40 text-violet-300' },
                { label: `${reviewDueCount} Reviews Due`, cls: reviewDueCount > 0 ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-slate-500/20 border-slate-500/40 text-slate-400' },
                { label: '3-Day Cycle', cls: 'bg-blue-500/20 border-blue-500/40 text-blue-300' },
                { label: 'Glossary Drawer', cls: 'bg-pink-500/20 border-pink-500/40 text-pink-300' },
              ].map(p => (
                <span key={p.label} className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.cls}`}>
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all relative ${
                  tab === t.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {t.label}
                {t.badge != null && t.badge > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center px-1">
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-slate-50 min-h-[60vh]">
        {tab === 'study' && (
          <StudyView
            chapters={chapters}
            glossary={glossary}
            initialChapter={initialPosition.chapterIndex}
            initialConcept={initialPosition.conceptIndex}
          />
        )}
        {tab === 'review' && (
          <ReviewView allConcepts={allConcepts} glossary={glossary} />
        )}
        {tab === 'progress' && (
          <ProgressView chapters={chapters} progress={progress} />
        )}
      </div>
    </>
  )
}
