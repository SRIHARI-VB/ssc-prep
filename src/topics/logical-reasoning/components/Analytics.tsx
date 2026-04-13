import { useMemo } from 'react'
import { reasoningConceptData, reasoningPYQs } from '../data'

export default function Analytics() {
  const stats = useMemo(() => {
    const topics = [...new Set(reasoningConceptData.map(c => c.topic))]
    const byProb = {
      hot: reasoningConceptData.filter(c => c.examProb === 'Hot').length,
      high: reasoningConceptData.filter(c => c.examProb === 'High').length,
      confirmed: reasoningConceptData.filter(c => c.examProb === 'Confirmed').length,
      recurring: reasoningConceptData.filter(c => c.examProb === 'Recurring').length,
    }
    const topTopics = topics
      .map(t => ({ topic: t, count: reasoningConceptData.filter(c => c.topic === t).length }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)

    const pyqByTopic = topics
      .map(t => ({ topic: t, count: reasoningPYQs.filter(p => p.topic === t).length }))
      .filter(t => t.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)

    return {
      totalConcepts: reasoningConceptData.length,
      topicCount: topics.length,
      totalPYQs: reasoningPYQs.length,
      byProb,
      topTopics,
      pyqByTopic,
    }
  }, [])

  return (
    <section id="lr-overview" className="py-12 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500" />
          <h2 className="text-xl font-extrabold text-brand-900">Overview &amp; Analytics</h2>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { n: stats.totalConcepts, label: 'Total Concepts', color: 'from-emerald-600 to-teal-600', icon: '🧠' },
            { n: stats.topicCount, label: 'Reasoning Topics', color: 'from-teal-600 to-cyan-600', icon: '📂' },
            { n: stats.byProb.hot, label: 'Hot Priority', color: 'from-red-500 to-rose-600', icon: '🔥' },
            { n: stats.totalPYQs, label: 'PYQ Questions', color: 'from-amber-500 to-orange-600', icon: '📝' },
          ].map(c => (
            <div key={c.label} className={`bg-gradient-to-br ${c.color} rounded-2xl p-5 text-white shadow-lg`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{c.icon}</span>
                <p className="text-3xl font-extrabold">{c.n}</p>
              </div>
              <p className="text-xs font-medium text-white/70">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Priority breakdown strip */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Hot', count: stats.byProb.hot, bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-600', badge: '🔥' },
            { label: 'High', count: stats.byProb.high, bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-600', badge: '⚡' },
            { label: 'Confirmed', count: stats.byProb.confirmed, bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-600', badge: '✅' },
            { label: 'Recurring', count: stats.byProb.recurring, bg: 'bg-violet-50', border: 'border-violet-100', text: 'text-violet-600', badge: '🔁' },
          ].map(p => (
            <div key={p.label} className={`${p.bg} border ${p.border} rounded-xl px-3 py-3 text-center`}>
              <p className={`text-lg font-extrabold ${p.text}`}>{p.count}</p>
              <p className="text-[10px] font-bold text-slate-500">{p.badge} {p.label}</p>
            </div>
          ))}
        </div>

        {/* Two-column: top topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Topics by Concept Count */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-extrabold text-emerald-600 uppercase tracking-wider mb-4">
              Top Topics by Concept Count
            </h3>
            <div className="space-y-3">
              {stats.topTopics.map((t, i) => (
                <div key={t.topic} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 w-5">#{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-700">{t.topic}</span>
                      <span className="text-emerald-600">{t.count} concepts</span>
                    </div>
                    <div className="h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(t.count / stats.topTopics[0].count) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Topics by PYQ Count */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-extrabold text-teal-600 uppercase tracking-wider mb-4">
              Top Topics by PYQ Frequency
            </h3>
            <div className="space-y-3">
              {stats.pyqByTopic.map((t, i) => (
                <div key={t.topic} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 w-5">#{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-700">{t.topic}</span>
                      <span className="text-teal-600">{t.count} PYQs</span>
                    </div>
                    <div className="h-1.5 bg-teal-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: `${(t.count / stats.pyqByTopic[0].count) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
