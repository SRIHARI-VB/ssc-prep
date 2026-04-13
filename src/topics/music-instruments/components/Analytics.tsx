import { useMemo } from 'react'
import { Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, Title,
} from 'chart.js'
import { miData, type MICategory } from '../data'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const CATEGORY_COLORS: Record<MICategory, string> = {
  'String Instruments (Tata)':             'rgba(244,63,94,0.8)',
  'Wind Instruments (Sushira)':            'rgba(249,115,22,0.8)',
  'Percussion - Membranous (Avanaddha)':   'rgba(139,92,246,0.8)',
  'Percussion - Solid (Ghana)':            'rgba(34,197,94,0.8)',
  'Hindustani Classical':                  'rgba(59,130,246,0.8)',
  'Carnatic Classical':                    'rgba(236,72,153,0.8)',
  'Famous Musicians & Awards':             'rgba(234,179,8,0.8)',
  'Current Affairs & Awards':              'rgba(239,68,68,0.8)',
  'Folk Music':                            'rgba(168,85,247,0.8)',
}

const PROB_COLORS: Record<string, string> = {
  'Hot':       'rgba(239,68,68,0.9)',
  'High':      'rgba(249,115,22,0.9)',
  'Confirmed': 'rgba(34,197,94,0.9)',
  'Recurring': 'rgba(139,92,246,0.9)',
}

export default function Analytics() {
  const categoryCounts = useMemo(() => {
    const counts: Record<MICategory, number> = {
      'String Instruments (Tata)': 0,
      'Wind Instruments (Sushira)': 0,
      'Percussion - Membranous (Avanaddha)': 0,
      'Percussion - Solid (Ghana)': 0,
      'Hindustani Classical': 0,
      'Carnatic Classical': 0,
      'Famous Musicians & Awards': 0,
      'Current Affairs & Awards': 0,
      'Folk Music': 0,
    }
    miData.forEach(e => { counts[e.category]++ })
    return counts
  }, [])

  const probCounts = useMemo(() => {
    const counts: Record<string, number> = { Hot: 0, High: 0, Confirmed: 0, Recurring: 0 }
    miData.forEach(e => { counts[e.examProb]++ })
    return counts
  }, [])

  const categories = Object.keys(categoryCounts) as MICategory[]

  const barData = {
    labels: categories.map(s => s.length > 22 ? s.slice(0, 20) + '...' : s),
    datasets: [{
      label: 'Facts',
      data: categories.map(s => categoryCounts[s]),
      backgroundColor: categories.map(s => CATEGORY_COLORS[s]),
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

  const hotCount = miData.filter(e => e.examProb === 'Hot').length
  const confirmedCount = miData.filter(e => e.examProb === 'Confirmed').length

  return (
    <section id="mi-overview" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-rose-600 uppercase mb-1">Section 01</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Coverage Analytics</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            {miData.length} entries across {categories.length} categories — covering Indian Music &amp; Instruments for SSC CGL.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { n: miData.length, label: 'Total Facts', color: 'bg-rose-50 border-rose-200', textColor: 'text-rose-700' },
            { n: hotCount, label: 'Hot Priority', color: 'bg-red-50 border-red-200', textColor: 'text-red-700' },
            { n: confirmedCount, label: 'Confirmed PYQ', color: 'bg-green-50 border-green-200', textColor: 'text-green-700' },
            { n: categories.length, label: 'Categories', color: 'bg-violet-50 border-violet-200', textColor: 'text-violet-700' },
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
