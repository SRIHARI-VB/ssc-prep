import { useState } from 'react'
import { pyqHistory } from '../data'

const CAT_BADGE: Record<string, string> = {
  'Ancient/Medieval': 'bg-amber-100 text-amber-800',
  'Freedom Struggle': 'bg-orange-100 text-orange-800',
  'Sports':           'bg-sky-100 text-sky-800',
  'PYQ':              'bg-indigo-100 text-indigo-800',
  'Literary Award':   'bg-violet-100 text-violet-800',
}

// Key insight cards derived from the research analysis
const INSIGHTS = [
  {
    icon: '🔁',
    title: 'Repeat Patterns',
    body: 'Kitab-ul-Hind (Al-Biruni) appeared in both Aug 2021 and Jul 2023. Once a book enters SSC\'s database it stays relevant for multiple years.',
    color: 'border-indigo-400 bg-indigo-50',
    textColor: 'text-indigo-800',
  },
  {
    icon: '⏱️',
    title: 'News-to-Exam Pipeline',
    body: 'There\'s a 6–9 month lag between a major launch and its exam appearance. Books from early 2026 will likely target the Tier 2 of mid-to-late 2026.',
    color: 'border-emerald-400 bg-emerald-50',
    textColor: 'text-emerald-800',
  },
  {
    icon: '🔀',
    title: 'Shift Symmetry',
    body: 'If Shift 1 has a sports autobiography, Shift 2 is statistically more likely to also have an autobiography — not an ancient text. Use early shifts to anticipate.',
    color: 'border-violet-400 bg-violet-50',
    textColor: 'text-violet-800',
  },
  {
    icon: '🌏',
    title: 'Regional Literature Rising',
    body: 'Sahitya Akademi winners in Bodo, Santali, and Assamese are increasingly appearing. Do not skip regional language winners — they raise cognitive difficulty.',
    color: 'border-amber-400 bg-amber-50',
    textColor: 'text-amber-800',
  },
]

// Question types taxonomy
const QUESTION_TYPES = [
  { type: 'Direct Attribution', freq: 'Very High', desc: '"Who wrote X?" or "X was written by?"', example: '"Who is the author of Playing It My Way?" → Sachin Tendulkar' },
  { type: 'Contextual Historical', freq: 'High', desc: 'Links book to a historical event or political context', example: '"Neel Darpan is associated with which revolt?" → Indigo Revolt' },
  { type: 'Award-Release', freq: 'High', desc: 'Award year, prize name, or language of original', example: '"First Hindi novel to win Int. Booker?" → Tomb of Sand' },
  { type: 'Collaborative / Launched By', freq: 'Rising', desc: 'Co-authors or the authority who launched the book', example: '"Launched by VP Dhankhar" → Vajpayee: The Eternal Statesman' },
  { type: 'Thematic Cluster', freq: 'Medium', desc: 'Category-based: "Books by politicians / sportspersons"', example: '"Which book is NOT an autobiography?" — set question' },
]

export default function PYQShiftTracker() {
  const [activeTab, setActiveTab] = useState<'shifts' | 'types' | 'insights'>('shifts')

  return (
    <section id="pyq-tracker" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest text-indigo-500 uppercase mb-1">Section 05</p>
        <h2 className="text-3xl font-extrabold text-brand-900">PYQ Shift Analysis</h2>
        <p className="mt-2 text-slate-500 text-sm max-w-2xl leading-relaxed">
          Exact shift-wise questions from 2021–2024, question-framing taxonomy, and higher-order strategic
          insights derived from 6 years of pattern analysis.
        </p>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 p-1 bg-slate-200 rounded-xl w-fit mb-6">
        {([
          { key: 'shifts',   label: '📋 Shift History' },
          { key: 'types',    label: '🔍 Question Types' },
          { key: 'insights', label: '💡 Strategic Insights' },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === t.key ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Shift History ── */}
      {activeTab === 'shifts' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-slide">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">SSC CGL Tier 1 — Books & Authors Questions (2021–2024)</p>
            <span className="text-xs font-semibold text-slate-400">{pyqHistory.length} recorded questions</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="py-3 px-5 w-[16%]">Exam Date</th>
                  <th className="py-3 px-5 w-[12%]">Shift</th>
                  <th className="py-3 px-5 w-[42%]">Question / Book Referenced</th>
                  <th className="py-3 px-5 w-[20%]">Correct Answer</th>
                  <th className="py-3 px-5 w-[10%]">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {pyqHistory.map((q, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-5 font-semibold text-slate-700 whitespace-nowrap">{q.date}</td>
                    <td className="py-3 px-5 text-slate-500 text-xs">{q.shift}</td>
                    <td className="py-3 px-5 text-slate-700">{q.bookOrQuestion}</td>
                    <td className="py-3 px-5 font-semibold text-indigo-700">{q.answer}</td>
                    <td className="py-3 px-5">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${CAT_BADGE[q.category] || 'bg-slate-100 text-slate-600'}`}>
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
              <strong>Key pattern:</strong> Al-Biruni's Kitab-ul-Hind appeared in <strong>both Aug 2021 and Jul 2023</strong>.
              SSC recycles high-value entries across years — a confirmed PYQ is never truly "done."
            </p>
          </div>
        </div>
      )}

      {/* ── Question Types ── */}
      {activeTab === 'types' && (
        <div className="space-y-3 animate-fade-slide">
          {QUESTION_TYPES.map((qt, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex gap-4 items-start">
              <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-extrabold text-sm flex items-center justify-center">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold text-slate-800">{qt.type}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    qt.freq === 'Very High' ? 'bg-red-100 text-red-700 border-red-200' :
                    qt.freq === 'High'      ? 'bg-orange-100 text-orange-700 border-orange-200' :
                    qt.freq === 'Rising'    ? 'bg-violet-100 text-violet-700 border-violet-200' :
                    'bg-yellow-100 text-yellow-700 border-yellow-200'
                  }`}>
                    {qt.freq}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-2">{qt.desc}</p>
                <div className="bg-slate-50 rounded-lg px-3 py-2 border-l-2 border-indigo-300">
                  <p className="text-xs font-mnemonic text-indigo-700 italic">e.g. {qt.example}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Strategic Insights ── */}
      {activeTab === 'insights' && (
        <div className="space-y-4 animate-fade-slide">
          {INSIGHTS.map((ins, i) => (
            <div key={i} className={`rounded-2xl border-l-4 p-5 ${ins.color}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{ins.icon}</span>
                <h4 className={`font-bold text-base ${ins.textColor}`}>
                  Order {i + 1} Insight: {ins.title}
                </h4>
              </div>
              <p className={`text-sm leading-relaxed ${ins.textColor} opacity-90`}>{ins.body}</p>
            </div>
          ))}

          {/* Genre study framework */}
          <div className="bg-brand-900 rounded-2xl p-6 text-white">
            <h4 className="font-bold text-base mb-4">📚 Genre-wise Daily Target Method</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { genre: 'Genre A', label: 'Ancient & Medieval', items: 'Arthashastra, Kitab-ul-Hind, Ain-i-Akbari, Rajtarangini…', color: 'border-amber-400 bg-amber-400/10' },
                { genre: 'Genre B', label: 'Nationalist Movement', items: 'My Experiments with Truth, Discovery of India, Gitanjali, Ananda Math…', color: 'border-orange-400 bg-orange-400/10' },
                { genre: 'Genre C', label: 'Award Winners', items: 'Jnanpith, Sahitya Akademi, Booker, International Booker (2022–2025)…', color: 'border-violet-400 bg-violet-400/10' },
                { genre: 'Genre D', label: 'Sports & Celebrity', items: 'Playing It My Way, Witness, A Shot at History, Wings of Fire…', color: 'border-sky-400 bg-sky-400/10' },
              ].map(g => (
                <div key={g.genre} className={`rounded-xl p-4 border ${g.color}`}>
                  <span className="text-xs font-bold text-white/60 uppercase">{g.genre}</span>
                  <p className="font-bold text-white mt-1 text-sm">{g.label}</p>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">{g.items}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Study 10–15 books/day by genre. Flashcard the <strong>Author → Theme → Award</strong> triplet.
              Use the Exam Loop above to test recall in exam format.
            </p>
          </div>
        </div>
      )}

    </section>
  )
}
