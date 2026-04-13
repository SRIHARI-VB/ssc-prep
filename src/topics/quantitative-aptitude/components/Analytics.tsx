import { useMemo } from 'react'
import { mathsFormulaData, mathsPYQs, type MathsTopic } from '../data'

export default function Analytics() {
  const stats = useMemo(() => {
    const topics = [...new Set(mathsFormulaData.map(f => f.topic))] as MathsTopic[]

    const byProb = {
      hot: mathsFormulaData.filter(f => f.examProb === 'Hot').length,
      high: mathsFormulaData.filter(f => f.examProb === 'High').length,
      confirmed: mathsFormulaData.filter(f => f.examProb === 'Confirmed').length,
      recurring: mathsFormulaData.filter(f => f.examProb === 'Recurring').length,
    }

    const topTopics = topics
      .map(t => ({ topic: t, count: mathsFormulaData.filter(f => f.topic === t).length }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)

    const priorityDist = [1, 2, 3, 4, 5].map(p => ({
      priority: p,
      count: mathsFormulaData.filter(f => f.priority === p).length,
    }))

    return {
      totalFormulas: mathsFormulaData.length,
      topicCount: topics.length,
      hotCount: byProb.hot,
      pyqCount: mathsPYQs.length,
      byProb,
      topTopics,
      priorityDist,
    }
  }, [])

  return (
    <section id="qa-overview" className="py-12 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-indigo-500" />
          <h2 className="text-xl font-extrabold text-brand-900">Overview & Analytics</h2>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { n: stats.totalFormulas, label: 'Total Formulas', color: 'from-blue-600 to-indigo-600' },
            { n: stats.topicCount, label: 'Maths Topics', color: 'from-indigo-600 to-violet-600' },
            { n: stats.hotCount, label: 'Hot Priority', color: 'from-red-600 to-rose-600' },
            { n: stats.pyqCount, label: 'PYQ Questions', color: 'from-amber-600 to-orange-600' },
          ].map(c => (
            <div key={c.label} className={`bg-gradient-to-br ${c.color} rounded-2xl p-5 text-white shadow-lg`}>
              <p className="text-3xl font-extrabold">{c.n}</p>
              <p className="text-xs font-medium text-white/70 mt-1">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Topics by Formula Count */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-extrabold text-blue-600 uppercase tracking-wider mb-4">
              Top Topics by Formula Count
            </h3>
            <div className="space-y-3">
              {stats.topTopics.map((t, i) => (
                <div key={t.topic} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 w-5">#{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-700">{t.topic}</span>
                      <span className="text-blue-600">{t.count} formulas</span>
                    </div>
                    <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(t.count / stats.topTopics[0].count) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-extrabold text-indigo-600 uppercase tracking-wider mb-4">
              Priority & Exam Probability
            </h3>

            {/* Exam prob chips */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2 text-center">
                <p className="text-lg font-extrabold text-red-600">{stats.byProb.hot}</p>
                <p className="text-[10px] text-red-500 font-bold">Hot</p>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-xl px-3 py-2 text-center">
                <p className="text-lg font-extrabold text-orange-600">{stats.byProb.high}</p>
                <p className="text-[10px] text-orange-500 font-bold">High</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl px-3 py-2 text-center">
                <p className="text-lg font-extrabold text-green-600">{stats.byProb.confirmed}</p>
                <p className="text-[10px] text-green-500 font-bold">Confirmed</p>
              </div>
              <div className="bg-violet-50 border border-violet-100 rounded-xl px-3 py-2 text-center">
                <p className="text-lg font-extrabold text-violet-600">{stats.byProb.recurring}</p>
                <p className="text-[10px] text-violet-500 font-bold">Recurring</p>
              </div>
            </div>

            {/* Priority bars */}
            <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">By Priority Level</h4>
            <div className="space-y-2">
              {stats.priorityDist.map(p => (
                <div key={p.priority} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-indigo-600 w-10">P{p.priority}</span>
                  <div className="flex-1 h-2 bg-indigo-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${(p.count / stats.totalFormulas) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-500 w-8 text-right">{p.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
