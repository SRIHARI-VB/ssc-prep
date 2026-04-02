import { geoPYQHistory, type GeoCategory, type GeoPYQEntry } from '../data'

const SUBJECT_BADGE: Record<GeoCategory, string> = {
  'Indian Rivers':             'bg-blue-100 text-blue-800',
  'Mountains & Passes':        'bg-violet-100 text-violet-800',
  'Soil & Climate':            'bg-yellow-100 text-yellow-800',
  'National Parks & Wildlife':  'bg-green-100 text-green-800',
  'Agriculture & Crops':       'bg-lime-100 text-lime-800',
  'Minerals & Resources':      'bg-orange-100 text-orange-800',
  'Dams & Irrigation':         'bg-cyan-100 text-cyan-800',
  'World Geography':           'bg-indigo-100 text-indigo-800',
  'Straits & Waterways':       'bg-sky-100 text-sky-800',
  'Transport & Industry':      'bg-purple-100 text-purple-800',
  'Population & Census':       'bg-pink-100 text-pink-800',
  'Current Affairs (Geo)':     'bg-red-100 text-red-800',
}

export default function PYQTracker() {
  return (
    <section id="geo-pyq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-1">Section 06</p>
        <h2 className="text-3xl font-extrabold text-brand-900">PYQ Tracker</h2>
        <p className="mt-2 text-slate-500 text-sm max-w-2xl">
          Confirmed SSC CGL geography questions from 2019-2024 exams. Focus on recurring patterns: rivers, national parks, soil types, and straits.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-700">Geography PYQ (2019-2024)</p>
          <span className="text-xs font-semibold text-slate-400">{geoPYQHistory.length} recorded</span>
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
              {geoPYQHistory.map((q: GeoPYQEntry, i: number) => (
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
            <strong>SSC CGL Geography Pattern:</strong> Typically 3-5 questions per paper on geography.
            Most common: river origins & tributaries, national parks & associated wildlife, soil types by state,
            mountain passes, straits connecting seas, largest/longest/highest superlatives, dams & rivers,
            and mineral-producing states. Always remember: location + associated feature + famous nickname.
          </p>
        </div>
      </div>
    </section>
  )
}
