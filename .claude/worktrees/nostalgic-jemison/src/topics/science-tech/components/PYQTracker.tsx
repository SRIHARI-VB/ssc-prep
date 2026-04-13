import { sciPyqHistory, type Subject } from '../data'

const SUBJECT_BADGE: Record<Subject, string> = {
  'Physics':        'bg-indigo-100 text-indigo-800',
  'Chemistry':      'bg-teal-100 text-teal-800',
  'Biology':        'bg-green-100 text-green-800',
  'Space & Defense':'bg-red-100 text-red-800',
  'Technology':     'bg-amber-100 text-amber-800',
}

export default function PYQTracker() {
  return (
    <section id="st-pyq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest text-teal-600 uppercase mb-1">Section 05</p>
        <h2 className="text-3xl font-extrabold text-brand-900">PYQ &amp; Current Affairs Tracker</h2>
        <p className="mt-2 text-slate-500 text-sm max-w-2xl">
          Confirmed SSC CGL questions (2023–2024) + key Current Affairs science facts likely to appear in 2025–26 exams. Includes ISRO, defense, AI, nuclear, and Nobel Prize updates.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-700">S&amp;T PYQ + Current Affairs (2023–2026)</p>
          <span className="text-xs font-semibold text-slate-400">{sciPyqHistory.length} recorded</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="py-3 px-5 w-[15%]">Date</th>
                <th className="py-3 px-5 w-[12%]">Shift</th>
                <th className="py-3 px-5 w-[45%]">Question</th>
                <th className="py-3 px-5 w-[20%]">Answer</th>
                <th className="py-3 px-5 w-[8%]">Subject</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {sciPyqHistory.map((q, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 whitespace-nowrap">{q.date}</td>
                  <td className="py-3 px-5 text-slate-500 text-xs">{q.shift}</td>
                  <td className="py-3 px-5 text-slate-700">{q.question}</td>
                  <td className="py-3 px-5 font-semibold text-teal-700">{q.answer}</td>
                  <td className="py-3 px-5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${SUBJECT_BADGE[q.subject]}`}>
                      {q.subject.split(' ')[0]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 bg-teal-50 border-t border-teal-100">
          <p className="text-xs text-teal-700">
            <strong>Key pattern:</strong> Chandrayaan-3, Aditya-L1, SpaDeX, NISAR, Gaganyaan are near-certain in upcoming exams.
            Operation Sindoor, Agni-5 MIRV (Divyastra), SHANTI Act, Nobel 2025, and IndiaAI Mission will feature in CGL 2025–26 GA. Memorise the year + achievement for each.
          </p>
        </div>
      </div>
    </section>
  )
}
