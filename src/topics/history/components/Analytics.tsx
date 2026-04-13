import { useMemo } from 'react'
import { Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, Title,
} from 'chart.js'
import { historyData, type HistoryCategory } from '../data'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const CAT_COLORS: Record<HistoryCategory, string> = {
  'Ancient India':     'rgba(217,119,6,0.8)',
  'Medieval India':    'rgba(249,115,22,0.8)',
  'Modern India':      'rgba(59,130,246,0.8)',
  'Freedom Struggle':  'rgba(34,197,94,0.8)',
  'Reform Movements':  'rgba(139,92,246,0.8)',
  'Art & Culture':     'rgba(236,72,153,0.8)',
  'Battles & Wars':    'rgba(239,68,68,0.8)',
}

const PROB_COLORS: Record<string, string> = {
  Hot:       'rgba(239,68,68,0.9)',
  High:      'rgba(249,115,22,0.9)',
  Confirmed: 'rgba(34,197,94,0.9)',
  Recurring: 'rgba(139,92,246,0.9)',
}

export default function Analytics() {
  const catCounts = useMemo(() => {
    const c: Record<HistoryCategory, number> = {
      'Ancient India': 0, 'Medieval India': 0, 'Modern India': 0,
      'Freedom Struggle': 0, 'Reform Movements': 0, 'Art & Culture': 0, 'Battles & Wars': 0,
    }
    historyData.forEach(e => { c[e.category]++ })
    return c
  }, [])

  const probCounts = useMemo(() => {
    const c: Record<string, number> = { Hot: 0, High: 0, Confirmed: 0, Recurring: 0 }
    historyData.forEach(e => { c[e.examProb]++ })
    return c
  }, [])

  const cats = Object.keys(catCounts) as HistoryCategory[]

  const barData = {
    labels: cats,
    datasets: [{
      label: 'Entries',
      data: cats.map(c => catCounts[c]),
      backgroundColor: cats.map(c => CAT_COLORS[c]),
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

  const hotCount = historyData.filter(e => e.examProb === 'Hot').length
  const confirmedCount = historyData.filter(e => e.examProb === 'Confirmed').length

  return (
    <section id="hist-overview" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-1">Section 01</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Coverage Analytics</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            {historyData.length} entries across {cats.length} categories — Ancient to Modern India for SSC CGL.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { n: historyData.length, label: 'Total Entries', color: 'bg-amber-50 border-amber-200', textColor: 'text-amber-700' },
            { n: hotCount, label: 'Hot Priority', color: 'bg-red-50 border-red-200', textColor: 'text-red-700' },
            { n: confirmedCount, label: 'Confirmed PYQ', color: 'bg-green-50 border-green-200', textColor: 'text-green-700' },
            { n: cats.length, label: 'Categories', color: 'bg-violet-50 border-violet-200', textColor: 'text-violet-700' },
          ].map(s => (
            <div key={s.label} className={`rounded-2xl border p-4 text-center ${s.color}`}>
              <p className={`text-3xl font-extrabold ${s.textColor}`}>{s.n}</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
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
