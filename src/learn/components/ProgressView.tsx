import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
} from 'chart.js'
import type { Chapter, LearnProgress } from '../types'
import { getReviewDueIds } from '../storage'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Props {
  chapters: Chapter[]
  progress: LearnProgress
}

const ACCENT_COLORS: Record<string, string> = {
  cyan:    'rgba(6,182,212,0.8)',
  amber:   'rgba(245,158,11,0.8)',
  emerald: 'rgba(16,185,129,0.8)',
  teal:    'rgba(20,184,166,0.8)',
  violet:  'rgba(139,92,246,0.8)',
  indigo:  'rgba(99,102,241,0.8)',
  rose:    'rgba(244,63,94,0.8)',
  fuchsia: 'rgba(217,70,239,0.8)',
  orange:  'rgba(249,115,22,0.8)',
  blue:    'rgba(59,130,246,0.8)',
}

export default function ProgressView({ chapters, progress }: Props) {
  const totalConcepts = chapters.reduce((sum, ch) => sum + ch.concepts.length, 0)
  const learnedCount = Object.keys(progress.concepts).length
  const reviewDueCount = getReviewDueIds(progress).length

  const chapterStats = useMemo(() =>
    chapters.map(ch => {
      const learned = ch.concepts.filter(c => progress.concepts[c.id]).length
      return { title: ch.title, icon: ch.icon, accent: ch.accent, total: ch.concepts.length, learned }
    }),
    [chapters, progress]
  )

  // Upcoming reviews (next 7 days)
  const upcoming = useMemo(() => {
    const now = Date.now()
    const days: { date: string; count: number }[] = []

    for (let i = 0; i < 7; i++) {
      const dayStart = now + i * 86400000
      const dayEnd = dayStart + 86400000
      const dateStr = new Date(dayStart).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
      const count = Object.values(progress.concepts).filter(c =>
        c.nextReviewAt >= dayStart && c.nextReviewAt < dayEnd
      ).length
      days.push({ date: dateStr, count })
    }
    return days
  }, [progress])

  const barData = {
    labels: chapterStats.map(s => s.title),
    datasets: [
      {
        label: 'Learned',
        data: chapterStats.map(s => s.learned),
        backgroundColor: chapterStats.map(s => ACCENT_COLORS[s.accent] || 'rgba(99,102,241,0.8)'),
        borderRadius: 6,
        borderSkipped: false as const,
      },
      {
        label: 'Remaining',
        data: chapterStats.map(s => s.total - s.learned),
        backgroundColor: 'rgba(203,213,225,0.4)',
        borderRadius: 6,
        borderSkipped: false as const,
      },
    ],
  }

  const pct = totalConcepts ? Math.round((learnedCount / totalConcepts) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { n: totalConcepts, label: 'Total Concepts', cls: 'bg-slate-50 border-slate-200', text: 'text-slate-700' },
          { n: learnedCount, label: 'Learned', cls: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700' },
          { n: reviewDueCount, label: 'Review Due', cls: 'bg-amber-50 border-amber-200', text: 'text-amber-700' },
          { n: `${pct}%`, label: 'Completion', cls: 'bg-indigo-50 border-indigo-200', text: 'text-indigo-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border p-4 text-center ${s.cls}`}>
            <p className={`text-3xl font-extrabold ${s.text}`}>{s.n}</p>
            <p className="text-xs text-slate-500 mt-1 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Overall progress bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-3">Overall Progress</h3>
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">{learnedCount} of {totalConcepts} concepts learned</p>
      </div>

      {/* Chapter progress chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">Chapter-wise Progress</h3>
        <div className="h-80">
          <Bar data={barData} options={{
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
              legend: { position: 'bottom', labels: { font: { size: 11 } } },
            },
            scales: {
              x: { stacked: true, grid: { display: false } },
              y: { stacked: true, grid: { display: false }, ticks: { font: { size: 10 } } },
            },
          }} />
        </div>
      </div>

      {/* Per-chapter progress bars */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">Chapter Details</h3>
        <div className="space-y-3">
          {chapterStats.map(s => (
            <div key={s.title} className="flex items-center gap-3">
              <span className="text-lg w-8 text-center">{s.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-slate-600 truncate">{s.title}</p>
                  <p className="text-xs text-slate-400 shrink-0">{s.learned}/{s.total}</p>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${s.total ? (s.learned / s.total) * 100 : 0}%`,
                      backgroundColor: ACCENT_COLORS[s.accent] || 'rgba(99,102,241,0.8)',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming reviews */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">Upcoming Reviews (7 days)</h3>
        <div className="grid grid-cols-7 gap-2">
          {upcoming.map((d, i) => (
            <div key={i} className={`text-center p-2 rounded-xl ${d.count > 0 ? 'bg-indigo-50 border border-indigo-200' : 'bg-slate-50'}`}>
              <p className="text-[10px] text-slate-500 mb-1">{d.date.split(',')[0]}</p>
              <p className={`text-lg font-extrabold ${d.count > 0 ? 'text-indigo-600' : 'text-slate-300'}`}>
                {d.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
