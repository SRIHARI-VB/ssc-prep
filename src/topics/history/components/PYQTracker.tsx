import { historyPYQData, type HistoryCategory } from '../data'

const SUBJECT_BADGE: Record<HistoryCategory, string> = {
  'Ancient India':     'bg-amber-100 text-amber-800',
  'Medieval India':    'bg-orange-100 text-orange-800',
  'Modern India':      'bg-blue-100 text-blue-800',
  'Freedom Struggle':  'bg-green-100 text-green-800',
  'Reform Movements':  'bg-violet-100 text-violet-800',
  'Art & Culture':     'bg-pink-100 text-pink-800',
  'Battles & Wars':    'bg-red-100 text-red-800',
}

export default function PYQTracker() {
  return (
    <section id="hist-pyq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-1">Section 08</p>
        <h2 className="text-3xl font-extrabold text-brand-900">PYQ Tracker</h2>
        <p className="mt-2 text-slate-500 text-sm max-w-2xl">
          Confirmed SSC CGL history questions from 2019-2024 exams. Focus on recurring patterns: IVC sites, Mauryan Empire, Freedom Struggle dates, and Battles.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-700">History PYQ (2019-2024)</p>
          <span className="text-xs font-semibold text-slate-400">{historyPYQData.length} recorded</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="py-3 px-5 min-w-[100px]">Date</th>
                <th className="py-3 px-5 min-w-[80px]">Shift</th>
                <th className="py-3 px-5 min-w-[350px]">Question</th>
                <th className="py-3 px-5 min-w-[200px]">Answer</th>
                <th className="py-3 px-5 min-w-[120px]">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {historyPYQData.map((q, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 whitespace-nowrap">{q.date}</td>
                  <td className="py-3 px-5 text-slate-500 text-xs">{q.shift}</td>
                  <td className="py-3 px-5 text-slate-700">{q.question}</td>
                  <td className="py-3 px-5 font-semibold text-amber-700">{q.answer}</td>
                  <td className="py-3 px-5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${SUBJECT_BADGE[q.category]}`}>
                      {q.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 bg-amber-50 border-t border-amber-100">
          <p className="text-xs text-amber-700">
            <strong>SSC CGL History Pattern:</strong> Typically 4-6 questions per paper.
            Most common: IVC sites &amp; features, Mauryan/Gupta dynasty facts, Freedom Struggle dates &amp; movements,
            Governor-General reforms, Buddhist/Jain councils, Battle years &amp; outcomes, Reform movement founders.
            Always remember: Person + Event + Year + Place.
          </p>
        </div>
      </div>
    </section>
  )
}
