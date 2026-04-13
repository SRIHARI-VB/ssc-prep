import { useState, useMemo } from 'react'
import { englishPYQHistory } from '../data'
import type { EnglishQType, EnglishPYQRecord } from '../data'

const QTYPE_LABELS: Record<EnglishQType, string> = {
  'error-spotting':         'Error Spotting',
  'fill-blank':             'Fill in the Blank',
  'sentence-improvement':   'Sentence Improvement',
  'synonyms':               'Synonyms',
  'antonyms':               'Antonyms',
  'idioms-phrases':         'Idioms & Phrases',
  'one-word-substitution':  'One Word Substitution',
  'spelling-correction':    'Spelling Correction',
  'cloze-test':             'Cloze Test',
  'para-jumble':            'Para Jumble',
  'sentence-rearrangement': 'Sentence Rearrangement',
  'active-passive':         'Active/Passive',
  'direct-indirect':        'Direct/Indirect',
  'reading-comprehension':  'Reading Comprehension',
}

const EXAM_CHIP: Record<string, string> = {
  CGL:  'bg-blue-100 text-blue-700 border-blue-200',
  CHSL: 'bg-green-100 text-green-700 border-green-200',
  MTS:  'bg-amber-100 text-amber-700 border-amber-200',
}

const PAGE_SIZE = 20

export default function PYQTracker() {
  const [filterYear, setFilterYear] = useState<number | 'all'>('all')
  const [filterExam, setFilterExam] = useState<string>('all')
  const [filterQtype, setFilterQtype] = useState<EnglishQType | 'all'>('all')
  const [page, setPage] = useState(0)

  const years = useMemo(
    () => ['all', ...Array.from(new Set(englishPYQHistory.map(r => r.year))).sort((a, b) => b - a)] as (number | 'all')[],
    []
  )

  const exams = useMemo(
    () => ['all', ...new Set(englishPYQHistory.map(r => r.exam))],
    []
  )

  const qtypes = useMemo(
    () => ['all', ...new Set(englishPYQHistory.map(r => r.qtype))] as (EnglishQType | 'all')[],
    []
  )

  const filtered = useMemo(() => {
    let pool: EnglishPYQRecord[] = englishPYQHistory
    if (filterYear !== 'all') pool = pool.filter(r => r.year === filterYear)
    if (filterExam !== 'all') pool = pool.filter(r => r.exam === filterExam)
    if (filterQtype !== 'all') pool = pool.filter(r => r.qtype === filterQtype)
    return pool
  }, [filterYear, filterExam, filterQtype])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  // Reset page on filter change
  const handleFilterYear = (y: number | 'all') => { setFilterYear(y); setPage(0) }
  const handleFilterExam = (e: string) => { setFilterExam(e); setPage(0) }
  const handleFilterQtype = (q: EnglishQType | 'all') => { setFilterQtype(q); setPage(0) }

  return (
    <section id="eng-pyq" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-rose-500 to-pink-500" />
            <h2 className="text-xl font-extrabold text-brand-900">PYQ Tracker</h2>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
              {englishPYQHistory.length} Records
            </span>
          </div>
          <p className="text-slate-500 text-sm max-w-2xl">
            Previous Year Questions from SSC CGL, CHSL, and MTS exams. Filter by year, exam, or question type.
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-6">
          {/* Year filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase self-center mr-1">Year:</span>
            {years.map(y => (
              <button key={String(y)} onClick={() => handleFilterYear(y)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                  filterYear === y ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-slate-500 border-slate-200 hover:border-rose-300'
                }`}>
                {y === 'all' ? 'All Years' : y}
              </button>
            ))}
          </div>

          {/* Exam filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase self-center mr-1">Exam:</span>
            {exams.map(e => (
              <button key={e} onClick={() => handleFilterExam(e)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                  filterExam === e ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'
                }`}>
                {e === 'all' ? 'All Exams' : e}
              </button>
            ))}
          </div>

          {/* Question type filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase self-center mr-1">Type:</span>
            {qtypes.map(q => (
              <button key={q} onClick={() => handleFilterQtype(q)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all whitespace-nowrap ${
                  filterQtype === q ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-slate-500 border-slate-200 hover:border-pink-300'
                }`}>
                {q === 'all' ? 'All Types' : QTYPE_LABELS[q]}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-slate-400 font-medium">
            Showing {pageData.length} of {filtered.length} records
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                className="px-2 py-1 text-[10px] font-bold rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed">
                &larr; Prev
              </button>
              <span className="text-[10px] font-bold text-slate-500">
                {page + 1} / {totalPages}
              </span>
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                className="px-2 py-1 text-[10px] font-bold rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed">
                Next &rarr;
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider" style={{ minWidth: 60 }}>Year</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider" style={{ minWidth: 80 }}>Shift</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider" style={{ minWidth: 70 }}>Exam</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider" style={{ minWidth: 140 }}>Question Type</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider" style={{ minWidth: 300 }}>Question</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider" style={{ minWidth: 200 }}>Answer</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map(r => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-bold text-slate-700">{r.year}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{r.shift}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${EXAM_CHIP[r.exam] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {r.exam}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{QTYPE_LABELS[r.qtype]}</td>
                  <td className="px-4 py-3 text-xs text-slate-700 leading-relaxed">{r.question}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-800">{r.answer}</td>
                </tr>
              ))}
              {pageData.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400 text-sm">
                    No PYQ records match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed">
              &larr; Previous
            </button>
            <span className="px-3 py-1.5 text-xs font-bold text-slate-500">
              Page {page + 1} of {totalPages}
            </span>
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed">
              Next &rarr;
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
