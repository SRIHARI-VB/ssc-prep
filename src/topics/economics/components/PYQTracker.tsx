import { econPYQData, type EconCategory } from '../data'

const SUBJECT_BADGE: Record<EconCategory, string> = {
  'Basic Concepts':              'bg-cyan-100 text-cyan-800',
  'Indian Economy & Planning':   'bg-blue-100 text-blue-800',
  'Banking & Monetary Policy':   'bg-green-100 text-green-800',
  'Fiscal Policy & Taxation':    'bg-amber-100 text-amber-800',
  'International Trade & Orgs':  'bg-violet-100 text-violet-800',
  'Agriculture & Rural':         'bg-pink-100 text-pink-800',
  'Industry & Infrastructure':   'bg-red-100 text-red-800',
  'Financial Markets':           'bg-orange-100 text-orange-800',
  'Poverty & Development':       'bg-lime-100 text-lime-800',
  'Reforms & Current Affairs':   'bg-indigo-100 text-indigo-800',
}

export default function PYQTracker() {
  return (
    <section id="econ-pyq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest text-cyan-700 uppercase mb-1">Section 07</p>
        <h2 className="text-3xl font-extrabold text-brand-900">PYQ Tracker</h2>
        <p className="mt-2 text-slate-500 text-sm max-w-2xl">
          Confirmed SSC CGL economics questions from 2019-2024 exams. Focus on recurring patterns: Five Year Plans, RBI policies, Budget terms, and International organisations.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-700">Economics PYQ (2019-2024)</p>
          <span className="text-xs font-semibold text-slate-400">{econPYQData.length} recorded</span>
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
              {econPYQData.map((q, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 whitespace-nowrap">{q.date}</td>
                  <td className="py-3 px-5 text-slate-500 text-xs">{q.shift}</td>
                  <td className="py-3 px-5 text-slate-700">{q.question}</td>
                  <td className="py-3 px-5 font-semibold text-cyan-700">{q.answer}</td>
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
        <div className="px-5 py-3 bg-cyan-50 border-t border-cyan-100">
          <p className="text-xs text-cyan-700">
            <strong>SSC CGL Economics Pattern:</strong> Typically 3-5 questions per paper.
            Most common: Five Year Plans &amp; NITI Aayog, RBI functions &amp; monetary tools, Budget terminology &amp; fiscal policy,
            International organisations (IMF, WTO, World Bank), poverty alleviation schemes, GDP &amp; national income concepts.
            Always remember: Institution + Function + Year + Key Term.
          </p>
        </div>
      </div>
    </section>
  )
}
