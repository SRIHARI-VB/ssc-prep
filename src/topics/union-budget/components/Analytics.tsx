import { useMemo } from 'react'
import { Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, Title,
} from 'chart.js'
import { budgetData, type BudgetCategory } from '../data'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const SUBJECT_COLORS: Record<BudgetCategory, string> = {
  'Budget Basics & History':  'rgba(99,102,241,0.8)',
  'Tax Changes':              'rgba(239,68,68,0.8)',
  'Fiscal Numbers':           'rgba(34,197,94,0.8)',
  'Agriculture & Rural':      'rgba(132,204,22,0.8)',
  'Infrastructure':           'rgba(168,85,247,0.8)',
  'Defence':                  'rgba(249,115,22,0.8)',
  'Education & Health':       'rgba(59,130,246,0.8)',
  'Social Welfare':           'rgba(236,72,153,0.8)',
  'New Schemes & Missions':   'rgba(251,191,36,0.8)',
  'Digital & Technology':     'rgba(6,182,212,0.8)',
  'Budget Terminology':       'rgba(139,92,246,0.8)',
}

const PROB_COLORS: Record<string, string> = {
  'Hot':       'rgba(239,68,68,0.9)',
  'High':      'rgba(249,115,22,0.9)',
  'Confirmed': 'rgba(34,197,94,0.9)',
  'Recurring': 'rgba(139,92,246,0.9)',
}

export default function Analytics() {
  const subjectCounts = useMemo(() => {
    const counts: Record<BudgetCategory, number> = {
      'Budget Basics & History': 0, 'Tax Changes': 0, 'Fiscal Numbers': 0,
      'Agriculture & Rural': 0, 'Infrastructure': 0, 'Defence': 0,
      'Education & Health': 0, 'Social Welfare': 0, 'New Schemes & Missions': 0,
      'Digital & Technology': 0, 'Budget Terminology': 0,
    }
    budgetData.forEach(e => { counts[e.category]++ })
    return counts
  }, [])

  const probCounts = useMemo(() => {
    const counts: Record<string, number> = { Hot: 0, High: 0, Confirmed: 0, Recurring: 0 }
    budgetData.forEach(e => { counts[e.examProb]++ })
    return counts
  }, [])

  const yearCounts = useMemo(() => {
    const counts = { '2026-27': 0, '2025-26': 0, 'General': 0 }
    budgetData.forEach(e => { counts[e.budgetYear]++ })
    return counts
  }, [])

  const subjects = Object.keys(subjectCounts) as BudgetCategory[]

  const barData = {
    labels: subjects.map(s => s.length > 20 ? s.slice(0, 18) + '...' : s),
    datasets: [{
      label: 'Facts',
      data: subjects.map(s => subjectCounts[s]),
      backgroundColor: subjects.map(s => SUBJECT_COLORS[s]),
      borderRadius: 8,
      borderSkipped: false as const,
    }],
  }

  const donutData = {
    labels: Object.keys(probCounts),
    datasets: [{
      data: Object.values(probCounts),
      backgroundColor: Object.keys(probCounts).map(k => PROB_COLORS[k]),
      borderWidth: 0,
    }],
  }

  const hotCount = budgetData.filter(e => e.examProb === 'Hot').length
  const confirmedCount = budgetData.filter(e => e.examProb === 'Confirmed').length

  return (
    <section id="ub-overview" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-1">Section 01</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Coverage Analytics</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            {budgetData.length} entries across {subjects.length} categories — covering both Union Budget 2026-27 and 2025-26 for SSC CGL.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { n: budgetData.length, label: 'Total Facts', color: 'bg-amber-50 border-amber-200', textColor: 'text-amber-700' },
            { n: hotCount, label: 'Hot Priority', color: 'bg-red-50 border-red-200', textColor: 'text-red-700' },
            { n: confirmedCount, label: 'Confirmed PYQ', color: 'bg-green-50 border-green-200', textColor: 'text-green-700' },
            { n: subjects.length, label: 'Categories', color: 'bg-violet-50 border-violet-200', textColor: 'text-violet-700' },
          ].map(s => (
            <div key={s.label} className={`rounded-2xl border p-4 text-center ${s.color}`}>
              <p className={`text-3xl font-extrabold ${s.textColor}`}>{s.n}</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Year breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="rounded-2xl border p-4 text-center bg-emerald-50 border-emerald-200">
            <p className="text-3xl font-extrabold text-emerald-700">{yearCounts['2026-27']}</p>
            <p className="text-xs text-slate-500 mt-1 font-medium">FY 2026-27 Facts</p>
          </div>
          <div className="rounded-2xl border p-4 text-center bg-sky-50 border-sky-200">
            <p className="text-3xl font-extrabold text-sky-700">{yearCounts['2025-26']}</p>
            <p className="text-xs text-slate-500 mt-1 font-medium">FY 2025-26 Facts</p>
          </div>
          <div className="rounded-2xl border p-4 text-center bg-slate-50 border-slate-200">
            <p className="text-3xl font-extrabold text-slate-700">{yearCounts['General']}</p>
            <p className="text-xs text-slate-500 mt-1 font-medium">General / Historical</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-4">Category Distribution</h3>
            <div className="h-72">
              <Bar data={barData} options={{
                responsive: true, maintainAspectRatio: false, indexAxis: 'y',
                plugins: { legend: { display: false } },
                scales: { x: { grid: { display: false } }, y: { grid: { display: false } } },
              }} />
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col items-center">
            <h3 className="text-sm font-bold text-slate-700 mb-4 self-start">Exam Priority</h3>
            <div className="h-52 w-52">
              <Doughnut data={donutData} options={{
                responsive: true, maintainAspectRatio: false, cutout: '65%',
                plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } },
              }} />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
