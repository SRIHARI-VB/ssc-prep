import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { booksData, type Category, type ExamProb } from '../data'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

// ── Derived stats ─────────────────────────────────────────────────────────────

const catCounts: Record<Category, number> = {
  'Ancient/Medieval': 0,
  'Freedom Struggle': 0,
  'Sports':           0,
  'PYQ':              0,
  'Literary Award':   0,
  'Current Affairs':  0,
}
booksData.forEach(b => { catCounts[b.category]++ })

const probCounts: Record<ExamProb, number> = {
  Hot: 0, High: 0, Medium: 0, Confirmed: 0, Recurring: 0,
}
booksData.forEach(b => { probCounts[b.examProb]++ })

const uniqueAuthors = new Set(booksData.map(b => b.author)).size
const hotCount      = probCounts['Hot']
const confirmedCount = probCounts['Confirmed']

// Static (Ancient + Freedom + Sports + PYQ) vs Dynamic (Literary Award + Current Affairs)
const staticCount  = catCounts['Ancient/Medieval'] + catCounts['Freedom Struggle'] + catCounts['Sports'] + catCounts['PYQ']
const dynamicCount = catCounts['Literary Award'] + catCounts['Current Affairs']

// ── Component ─────────────────────────────────────────────────────────────────

export default function Analytics() {
  return (
    <section id="overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Section header */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest text-indigo-500 uppercase mb-1">Section 01</p>
        <h2 className="text-3xl font-extrabold text-brand-900">Syllabus Overview</h2>
        <p className="mt-2 text-slate-500 text-sm max-w-2xl leading-relaxed">
          Strategic breakdown of 74 entries across 6 categories. Filter by exam probability
          to prioritise your study time — <span className="text-red-600 font-bold">🔴 Hot</span> entries
          are from 2025–26 with highest appearance probability.
        </p>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Entries',      value: booksData.length, color: 'text-slate-800',   bg: 'bg-white' },
          { label: 'Unique Authors',     value: uniqueAuthors,    color: 'text-indigo-700',  bg: 'bg-indigo-50' },
          { label: '🔴 Hot for 2026',    value: hotCount,         color: 'text-red-700',     bg: 'bg-red-50' },
          { label: '✅ Confirmed PYQs',   value: confirmedCount,   color: 'text-emerald-700', bg: 'bg-emerald-50' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-5 border border-slate-200 shadow-sm`}>
            <span className={`block text-3xl font-extrabold ${color}`}>{value}</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* Donut — Static vs Dynamic */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <h3 className="font-bold text-brand-800 mb-1 text-base">Study Balance</h3>
          <p className="text-xs text-slate-400 mb-4">Static GK (recurring) vs Dynamic/Current Affairs</p>
          <div className="flex-1 flex items-center justify-center" style={{ minHeight: 200 }}>
            <div style={{ width: '100%', maxWidth: 260, height: 200 }}>
              <Doughnut
                data={{
                  labels: ['Static GK', 'Dynamic / CA'],
                  datasets: [{
                    data: [staticCount, dynamicCount],
                    backgroundColor: ['#6366f1', '#10b981'],
                    hoverBackgroundColor: ['#4f46e5', '#059669'],
                    borderWidth: 0,
                    hoverOffset: 6,
                  }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '70%',
                  plugins: {
                    legend: { position: 'bottom', labels: { padding: 16, font: { size: 12 } } },
                    tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed} books` } },
                  },
                }}
              />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-indigo-50 rounded-xl py-2">
              <span className="block font-bold text-indigo-700 text-lg">{staticCount}</span>
              <span className="text-indigo-500">Static GK</span>
            </div>
            <div className="bg-emerald-50 rounded-xl py-2">
              <span className="block font-bold text-emerald-700 text-lg">{dynamicCount}</span>
              <span className="text-emerald-500">Dynamic / CA</span>
            </div>
          </div>
        </div>

        {/* Bar — Category Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <h3 className="font-bold text-brand-800 mb-1 text-base">Category Breakdown</h3>
          <p className="text-xs text-slate-400 mb-4">Entries per category — focus where weightage is highest</p>
          <div className="flex-1" style={{ minHeight: 230 }}>
            <Bar
              data={{
                labels: Object.keys(catCounts),
                datasets: [{
                  label: 'Books',
                  data: Object.values(catCounts),
                  backgroundColor: [
                    '#f59e0b', // Ancient
                    '#f97316', // Freedom
                    '#38bdf8', // Sports
                    '#6366f1', // PYQ
                    '#8b5cf6', // Award
                    '#10b981', // Current Affairs
                  ],
                  borderRadius: 6,
                  borderSkipped: false,
                }],
              }}
              options={{
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { color: '#f1f5f9' }, ticks: { stepSize: 2, font: { size: 11 } } },
                  y: { ticks: { font: { size: 10 } } },
                },
              }}
            />
          </div>
        </div>

      </div>

      {/* Exam probability breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <h3 className="font-bold text-brand-800 mb-4 text-base">Exam Probability Distribution</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {([
            { key: 'Hot',       label: '🔴 Hot',        count: probCounts.Hot,       bg: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-200',     sub: '2026 releases' },
            { key: 'High',      label: '🟠 High',       count: probCounts.High,      bg: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-200',  sub: '2025 + Awards' },
            { key: 'Confirmed', label: '✅ Confirmed',  count: probCounts.Confirmed, bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', sub: 'Appeared in papers' },
            { key: 'Recurring', label: '🔁 Recurring',  count: probCounts.Recurring, bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',    sub: 'Ancient/Medieval' },
            { key: 'Medium',    label: '🟡 Medium',     count: probCounts.Medium,    bg: 'bg-yellow-50',  text: 'text-yellow-700',  border: 'border-yellow-200',  sub: '2024 releases' },
          ] as const).map(({ label, count, bg, text, border, sub }) => (
            <div key={label} className={`${bg} border ${border} rounded-xl p-4 text-center`}>
              <span className={`block text-2xl font-extrabold ${text}`}>{count}</span>
              <span className={`block text-xs font-bold ${text} mt-1`}>{label}</span>
              <span className="block text-xs text-slate-400 mt-0.5">{sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Strategy tips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl p-4">
          <h4 className="font-bold text-indigo-900 text-sm">📜 Static GK Strategy</h4>
          <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
            Ancient texts repeat every cycle. Master the <strong>Author–Text–Dynasty</strong> triplet.
            Al-Biruni's Kitab-ul-Hind appeared in both 2021 and 2023.
          </p>
        </div>
        <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl p-4">
          <h4 className="font-bold text-emerald-900 text-sm">🗞️ Dynamic Strategy</h4>
          <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
            Books launched by the <strong>President, VP, or CDS</strong> in the last 6–9 months
            are the highest-probability targets for upcoming Tier 2.
          </p>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4">
          <h4 className="font-bold text-red-900 text-sm">🔴 2026 Hot Zone</h4>
          <p className="text-xs text-red-700 mt-1 leading-relaxed">
            Focus on <strong>Booker 2025, Jnanpith 2025, Op. Sindoor,
            Vajpayee biography</strong> and <strong>Int. Booker 2025</strong> (Heart Lamp).
          </p>
        </div>
      </div>

    </section>
  )
}
