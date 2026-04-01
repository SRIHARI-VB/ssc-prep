import { schemePYQHistory, type SchemeCategory, type SchemePYQEntry } from '../data'

const SUBJECT_BADGE: Record<SchemeCategory, string> = {
  'Social Welfare':       'bg-indigo-100 text-indigo-800',
  'Financial Inclusion':  'bg-teal-100 text-teal-800',
  'Agriculture':          'bg-green-100 text-green-800',
  'Employment & Skill':   'bg-orange-100 text-orange-800',
  'Education':            'bg-blue-100 text-blue-800',
  'Health':               'bg-red-100 text-red-800',
  'Infrastructure':       'bg-violet-100 text-violet-800',
  'Women & Child':        'bg-pink-100 text-pink-800',
  'Digital India':        'bg-cyan-100 text-cyan-800',
  'New Schemes 2024-26':  'bg-amber-100 text-amber-800',
}

export default function PYQTracker() {
  return (
    <section id="gs-pyq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-1">Section 06</p>
        <h2 className="text-3xl font-extrabold text-brand-900">PYQ &amp; Current Affairs Tracker</h2>
        <p className="mt-2 text-slate-500 text-sm max-w-2xl">
          Confirmed SSC CGL questions on government schemes (2021-2024) + key Current Affairs (2024-26) likely to appear in upcoming exams.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-700">Government Schemes PYQ + Current Affairs (2021-2026)</p>
          <span className="text-xs font-semibold text-slate-400">{schemePYQHistory.length} recorded</span>
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
              {schemePYQHistory.map((q: SchemePYQEntry, i: number) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-700 whitespace-nowrap">{q.date}</td>
                  <td className="py-3 px-5 text-slate-500 text-xs">{q.shift}</td>
                  <td className="py-3 px-5 text-slate-700">{q.question}</td>
                  <td className="py-3 px-5 font-semibold text-emerald-700">{q.answer}</td>
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
        <div className="px-5 py-3 bg-emerald-50 border-t border-emerald-100">
          <p className="text-xs text-emerald-700">
            <strong>Key pattern:</strong> Launch year + ministry questions dominate (2-3 per paper). PMJDY, PM-KISAN, Ayushman Bharat, Ujjwala, and Swachh Bharat are the most recurring.
            For 2025-26: PM Vishwakarma, Surya Ghar, MUDRA 2.0, Agnipath, ELI, PM SETU, Ayushman Vaya Vandana, and VB-G RAM G (125 days MGNREGA) are near-certain.
            Always remember: scheme name + launch year + ministry + key number (beneficiaries/budget/coverage amount).
          </p>
        </div>
      </div>
    </section>
  )
}
