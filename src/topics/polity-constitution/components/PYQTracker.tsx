import { polityPYQHistory, type PolityCategory, type PolityPYQEntry } from '../data'

const SUBJECT_BADGE: Record<PolityCategory, string> = {
  'Important Articles':        'bg-indigo-100 text-indigo-800',
  'Schedules':                 'bg-teal-100 text-teal-800',
  'Amendments':                'bg-blue-100 text-blue-800',
  'Landmark Cases':            'bg-green-100 text-green-800',
  'Constitutional Bodies':     'bg-red-100 text-red-800',
  'Parliament & Executive':    'bg-violet-100 text-violet-800',
  'Fundamental Rights & DPSP': 'bg-amber-100 text-amber-800',
}

export default function PYQTracker() {
  return (
    <section id="pol-pyq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-1">Section 05</p>
        <h2 className="text-3xl font-extrabold text-brand-900">PYQ &amp; Current Affairs Tracker</h2>
        <p className="mt-2 text-slate-500 text-sm max-w-2xl">
          Confirmed SSC CGL questions (2021-2024) + key Current Affairs polity facts likely to appear in 2025-26 exams. Includes constitutional amendments, SC judgments, and new laws.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-700">Polity PYQ + Current Affairs (2021-2026)</p>
          <span className="text-xs font-semibold text-slate-400">{polityPYQHistory.length} recorded</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="py-3 px-5 w-[12%]">Date</th>
                <th className="py-3 px-5 w-[10%]">Shift</th>
                <th className="py-3 px-5 w-[45%]">Question</th>
                <th className="py-3 px-5 w-[22%]">Answer</th>
                <th className="py-3 px-5 w-[11%]">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {polityPYQHistory.map((q: PolityPYQEntry, i: number) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 whitespace-nowrap">{q.date}</td>
                  <td className="py-3 px-5 text-slate-500 text-xs">{q.shift}</td>
                  <td className="py-3 px-5 text-slate-700">{q.question}</td>
                  <td className="py-3 px-5 font-semibold text-amber-700">{q.answer}</td>
                  <td className="py-3 px-5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${SUBJECT_BADGE[q.category]}`}>
                      {q.category.split(' ')[0]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 bg-amber-50 border-t border-amber-100">
          <p className="text-xs text-amber-700">
            <strong>Key pattern:</strong> Article-specific questions dominate (3-4 per paper). Amendments (42nd, 44th, 73rd, 86th, 101st) appear every year.
            Borrowed features, constitutional bodies (ECI, CAG, Finance Commission), and Fundamental Rights/Duties are the most reliable scoring areas.
            For 2025-26: Electoral Bonds judgment, ONOE Bill, new criminal laws (BNS/BNSS/BSA), CEC appointment law, and 106th Amendment (Women&apos;s Reservation) are near-certain.
          </p>
        </div>
      </div>
    </section>
  )
}
