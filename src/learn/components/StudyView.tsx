import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import type { Chapter, LearnConcept, LearnProgress, GlossaryEntry } from '../types'
import { loadProgress, markConceptLearned, savePosition } from '../storage'
import ChapterSidebar from './ChapterSidebar'
import ConceptCard from './ConceptCard'
import GlossaryDrawer from './GlossaryDrawer'

interface Props {
  chapters: Chapter[]
  glossary: GlossaryEntry[]
  initialChapter?: number
  initialConcept?: number
}

// ── Current-affairs detector ───────────────────────────────────────
const CA_KEYWORDS = /current\s*affairs|new\s*schemes|2024|2025|2026|latest|recent/i

function isCurrentAffairs(c: LearnConcept): boolean {
  return (
    CA_KEYWORDS.test(c.category) ||
    CA_KEYWORDS.test(c.pyqContext) ||
    CA_KEYWORDS.test(c.explanation)
  )
}

// ── Search result item (flat across chapters) ──────────────────────
interface SearchHit {
  chapterIdx: number
  conceptIdx: number
  concept: LearnConcept
  chapterTitle: string
  chapterIcon: string
}

export default function StudyView({ chapters, glossary, initialChapter = 0, initialConcept = 0 }: Props) {
  const [progress, setProgress] = useState<LearnProgress>(loadProgress)
  const [chapterIdx, setChapterIdx] = useState(initialChapter)
  const [conceptIdx, setConceptIdx] = useState(initialConcept)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [glossaryTerm, setGlossaryTerm] = useState<GlossaryEntry | null>(null)

  // Search + filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [caFilter, setCaFilter] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const chapter = chapters[chapterIdx]
  const concept = chapter?.concepts[conceptIdx]
  const totalInChapter = chapter?.concepts.length ?? 0

  // ── Build flat search index ────────────────────────────────────
  const allHits: SearchHit[] = useMemo(() => {
    const hits: SearchHit[] = []
    chapters.forEach((ch, ci) =>
      ch.concepts.forEach((c, cIdx) =>
        hits.push({ chapterIdx: ci, conceptIdx: cIdx, concept: c, chapterTitle: ch.title, chapterIcon: ch.icon })
      )
    )
    return hits
  }, [chapters])

  // ── Filtered results ───────────────────────────────────────────
  const filteredHits = useMemo(() => {
    let results = allHits
    if (caFilter) {
      results = results.filter(h => isCurrentAffairs(h.concept))
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      results = results.filter(h => {
        const c = h.concept
        return (
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.explanation.toLowerCase().includes(q) ||
          h.chapterTitle.toLowerCase().includes(q) ||
          (c.memoryHook?.toLowerCase().includes(q) ?? false)
        )
      })
    }
    return results
  }, [allHits, searchQuery, caFilter])

  const isFiltering = searchQuery.trim().length > 0 || caFilter
  const filterActive = isFiltering && filteredHits.length > 0

  // Current position within filtered results (for prev/next within filter)
  const currentFilterIdx = useMemo(() => {
    if (!filterActive) return -1
    return filteredHits.findIndex(h => h.chapterIdx === chapterIdx && h.conceptIdx === conceptIdx)
  }, [filterActive, filteredHits, chapterIdx, conceptIdx])

  // Save position on change
  useEffect(() => {
    savePosition(chapterIdx, conceptIdx)
  }, [chapterIdx, conceptIdx])

  const navigate = useCallback((ci: number, cIdx: number) => {
    setChapterIdx(ci)
    setConceptIdx(cIdx)
    setSidebarOpen(false)
    setShowResults(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handlePrev = useCallback(() => {
    if (filterActive && currentFilterIdx > 0) {
      const prev = filteredHits[currentFilterIdx - 1]
      navigate(prev.chapterIdx, prev.conceptIdx)
      return
    }
    if (conceptIdx > 0) {
      navigate(chapterIdx, conceptIdx - 1)
    } else if (chapterIdx > 0) {
      const prevChapter = chapters[chapterIdx - 1]
      navigate(chapterIdx - 1, prevChapter.concepts.length - 1)
    }
  }, [chapterIdx, conceptIdx, chapters, navigate, filterActive, currentFilterIdx, filteredHits])

  const handleNext = useCallback(() => {
    if (filterActive && currentFilterIdx >= 0 && currentFilterIdx < filteredHits.length - 1) {
      const next = filteredHits[currentFilterIdx + 1]
      navigate(next.chapterIdx, next.conceptIdx)
      return
    }
    if (conceptIdx < totalInChapter - 1) {
      navigate(chapterIdx, conceptIdx + 1)
    } else if (chapterIdx < chapters.length - 1) {
      navigate(chapterIdx + 1, 0)
    }
  }, [chapterIdx, conceptIdx, totalInChapter, chapters.length, navigate, filterActive, currentFilterIdx, filteredHits])

  const handleMarkLearned = useCallback(() => {
    if (!concept) return
    const updated = markConceptLearned(concept.id)
    setProgress(updated)
  }, [concept])

  // Prev/Next availability
  const canGoPrev = filterActive
    ? currentFilterIdx > 0
    : chapterIdx > 0 || conceptIdx > 0
  const canGoNext = filterActive
    ? currentFilterIdx >= 0 && currentFilterIdx < filteredHits.length - 1
    : chapterIdx < chapters.length - 1 || conceptIdx < totalInChapter - 1

  const handleGlossaryNavigate = useCallback((term: string) => {
    const entry = glossary.find(g =>
      g.term.toLowerCase() === term.toLowerCase() ||
      g.aliases?.some(a => a.toLowerCase() === term.toLowerCase())
    )
    if (entry) setGlossaryTerm(entry)
  }, [glossary])

  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setCaFilter(false)
    setShowResults(false)
  }, [])

  // Keyboard shortcut: Ctrl+K or / to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement?.tagName !== 'INPUT')) {
        e.preventDefault()
        searchRef.current?.focus()
        setShowResults(true)
      }
      if (e.key === 'Escape') {
        searchRef.current?.blur()
        setShowResults(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (!chapter || !concept) {
    return <div className="p-8 text-center text-slate-400">No concepts available.</div>
  }

  return (
    <div className="flex min-h-[calc(100vh-12rem)]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 shrink-0 border-r border-slate-200 bg-slate-50/50 p-4">
        <ChapterSidebar
          chapters={chapters}
          progress={progress}
          currentChapter={chapterIdx}
          currentConcept={conceptIdx}
          onNavigate={navigate}
        />
      </div>

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-6 left-4 z-30 w-12 h-12 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200 flex items-center justify-center hover:bg-indigo-700 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-80 max-w-[85vw] bg-white shadow-2xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-700">Chapters</h3>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ChapterSidebar
              chapters={chapters}
              progress={progress}
              currentChapter={chapterIdx}
              currentConcept={conceptIdx}
              onNavigate={navigate}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 py-6 px-4 sm:px-8">
        {/* ── Search + Current Affairs Filter Bar ────────────────── */}
        <div className="max-w-3xl mx-auto mb-5">
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Search input */}
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setShowResults(true) }}
                onFocus={() => setShowResults(true)}
                placeholder="Search concepts... (Ctrl+K)"
                className="w-full pl-9 pr-8 py-2.5 text-sm rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setShowResults(false) }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Current Affairs toggle */}
            <button
              onClick={() => { setCaFilter(!caFilter); setShowResults(true) }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all whitespace-nowrap ${
                caFilter
                  ? 'bg-orange-50 text-orange-700 border-orange-300 shadow-sm shadow-orange-100'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Current Affairs
              {caFilter && (
                <span className="text-[10px] bg-orange-200 text-orange-800 px-1.5 py-0.5 rounded-full font-bold">
                  {filteredHits.length}
                </span>
              )}
            </button>
          </div>

          {/* Filter indicator bar */}
          {isFiltering && (
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-indigo-600">{filteredHits.length}</span>
              <span>concept{filteredHits.length !== 1 ? 's' : ''} found</span>
              {caFilter && <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-[10px] font-bold">CA</span>}
              {searchQuery && <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-[10px] font-bold truncate max-w-[120px]">"{searchQuery}"</span>}
              {currentFilterIdx >= 0 && (
                <span className="ml-auto text-slate-400">{currentFilterIdx + 1} of {filteredHits.length}</span>
              )}
              <button onClick={clearFilters} className="ml-auto text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            </div>
          )}

          {/* Search results dropdown */}
          {showResults && isFiltering && (
            <div className="mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-72 overflow-y-auto divide-y divide-slate-100">
              {filteredHits.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-slate-400">
                  No concepts match your {caFilter ? 'current affairs ' : ''}search.
                </div>
              ) : (
                filteredHits.slice(0, 50).map((h, i) => {
                  const isActive = h.chapterIdx === chapterIdx && h.conceptIdx === conceptIdx
                  const isLearned = !!progress.concepts[h.concept.id]
                  return (
                    <button
                      key={h.concept.id}
                      onClick={() => navigate(h.chapterIdx, h.conceptIdx)}
                      className={`w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-indigo-50 transition-colors ${
                        isActive ? 'bg-indigo-50' : ''
                      }`}
                    >
                      <span className="text-base shrink-0">{h.chapterIcon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-medium truncate ${isActive ? 'text-indigo-700' : 'text-slate-700'}`}>
                            {h.concept.title}
                          </p>
                          {isLearned && (
                            <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full shrink-0">
                              Learned
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">
                          {h.chapterTitle} &middot; {h.concept.category}
                        </p>
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                        h.concept.examProb === 'Hot'
                          ? 'text-red-600 bg-red-50'
                          : 'text-emerald-600 bg-emerald-50'
                      }`}>
                        {h.concept.examProb}
                      </span>
                      <span className="text-[10px] text-slate-300 shrink-0">#{i + 1}</span>
                    </button>
                  )
                })
              )}
              {filteredHits.length > 50 && (
                <div className="px-4 py-2 text-center text-[11px] text-slate-400 bg-slate-50">
                  Showing 50 of {filteredHits.length} results. Refine your search.
                </div>
              )}
            </div>
          )}
        </div>

        <ConceptCard
          concept={concept}
          chapterTitle={chapter.title}
          index={filterActive ? currentFilterIdx : conceptIdx}
          total={filterActive ? filteredHits.length : totalInChapter}
          isLearned={!!progress.concepts[concept.id]}
          glossary={glossary}
          onTermClick={setGlossaryTerm}
          onMarkLearned={handleMarkLearned}
          onPrev={canGoPrev ? handlePrev : null}
          onNext={canGoNext ? handleNext : null}
        />
      </div>

      {/* Glossary Drawer */}
      <GlossaryDrawer
        entry={glossaryTerm}
        onClose={() => setGlossaryTerm(null)}
        onNavigate={handleGlossaryNavigate}
      />
    </div>
  )
}
