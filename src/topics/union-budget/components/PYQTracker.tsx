import { budgetPYQHistory, type BudgetCategory, type BudgetPYQEntry } from '../data'

const SUBJECT_BADGE: Record<BudgetCategory, string> = {
  'Budget Basics & History':  'bg-indigo-100 text-indigo-800',
  'Tax Changes':              'bg-red-100 text-red-800',
  'Fiscal Numbers':           'bg-green-100 text-green-800',
  'Agriculture & Rural':      'bg-lime-100 text-lime-800',
  'Infrastructure':           'bg-violet-100 text-violet-800',
  'Defence':                  'bg-orange-100 text-orange-800',
  'Education & Health':       'bg-blue-100 text-blue-800',
  'Social Welfare':           'bg-pink-100 text-pink-800',
  'New Schemes & Missions':   'bg-amber-100 text-amber-800',
  'Digital & Technology':     'bg-cyan-100 text-cyan-800',
  'Budget Terminology':       'bg-purple-100 text-purple-800',
}

export default function PYQTracker() {
  return (
    <section id="ub-pyq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-1">Section 06</p>
        <h2 className="text-3xl font-extrabold text-brand-900">PYQ &amp; Budget CA Tracker</h2>
        <p className="mt-2 text-slate-500 text-sm max-w-2xl">
          Confirmed SSC CGL budget-related questions (2021-2024) + Budget 2025-26 &amp; 2026-27 Current Affairs likely to appear in upcoming exams.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-700">Budget PYQ + Current Affairs (2021-2026)</p>
          <span className="text-xs font-semibold text-slate-400">{budgetPYQHistory.length} recorded</span>
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
              {budgetPYQHistory.map((q: BudgetPYQEntry, i: number) => (
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
            <strong>SSC CGL Budget Question Pattern:</strong> Typically 2-4 questions per paper on budget topics.
            Most common: Who presented the budget, fiscal deficit target, total budget size, new scheme names, tax slab changes.
            For 2026-27 exam: Focus on Rs 53.47L crore total expenditure, 4.3% fiscal deficit, Nirmala's 9th consecutive budget (first on Sunday),
            Income Tax Act 2025 replacing 1961 Act, VB-G RAM G (125 days, replaces MGNREGA), Bharat VISTAAR, Biopharma SHAKTI,
            7 High-Speed Rail Corridors, Rs 7.85L crore defence (+15.19%), Insurance FDI 100%, CCUS Mission.
            For 2025-26: Rs 12 lakh tax-free, 4.4% fiscal deficit, PM Dhan-Dhaanya, Nuclear Energy Mission, KCC Rs 5L.
            Always remember: who presented + total size + fiscal deficit + new schemes + tax changes.
          </p>
        </div>
      </div>
    </section>
  )
}
