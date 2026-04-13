import { useState } from 'react'

interface TrigRow {
  fn: string
  values: string[]
  colors: string
  bgRow: string
}

const ANGLES = ['0', '30', '45', '60', '90']

const TRIG_DATA: TrigRow[] = [
  {
    fn: 'sin',
    values: ['0', '1/2', '1/\u221A2', '\u221A3/2', '1'],
    colors: 'text-blue-700',
    bgRow: 'bg-blue-50',
  },
  {
    fn: 'cos',
    values: ['1', '\u221A3/2', '1/\u221A2', '1/2', '0'],
    colors: 'text-indigo-700',
    bgRow: 'bg-indigo-50',
  },
  {
    fn: 'tan',
    values: ['0', '1/\u221A3', '1', '\u221A3', '\u221E'],
    colors: 'text-violet-700',
    bgRow: 'bg-violet-50',
  },
  {
    fn: 'cot',
    values: ['\u221E', '\u221A3', '1', '1/\u221A3', '0'],
    colors: 'text-purple-700',
    bgRow: 'bg-purple-50',
  },
  {
    fn: 'sec',
    values: ['1', '2/\u221A3', '\u221A2', '2', '\u221E'],
    colors: 'text-rose-700',
    bgRow: 'bg-rose-50',
  },
  {
    fn: 'cosec',
    values: ['\u221E', '2', '\u221A2', '2/\u221A3', '1'],
    colors: 'text-pink-700',
    bgRow: 'bg-pink-50',
  },
]

const IDENTITIES = [
  { label: 'Pythagorean Identity 1', formula: 'sin\u00B2\u03B8 + cos\u00B2\u03B8 = 1', color: 'from-blue-500 to-indigo-500' },
  { label: 'Pythagorean Identity 2', formula: '1 + tan\u00B2\u03B8 = sec\u00B2\u03B8', color: 'from-violet-500 to-purple-500' },
  { label: 'Pythagorean Identity 3', formula: '1 + cot\u00B2\u03B8 = cosec\u00B2\u03B8', color: 'from-rose-500 to-pink-500' },
]

const COMPLEMENTARY = [
  { left: 'sin(90-\u03B8)', right: 'cos\u03B8' },
  { left: 'cos(90-\u03B8)', right: 'sin\u03B8' },
  { left: 'tan(90-\u03B8)', right: 'cot\u03B8' },
  { left: 'cot(90-\u03B8)', right: 'tan\u03B8' },
  { left: 'sec(90-\u03B8)', right: 'cosec\u03B8' },
  { left: 'cosec(90-\u03B8)', right: 'sec\u03B8' },
]

const MAX_MIN = [
  { expr: 'a sin\u03B8 + b cos\u03B8', max: '\u221A(a\u00B2+b\u00B2)', min: '-\u221A(a\u00B2+b\u00B2)' },
  { expr: 'a sin\u00B2\u03B8 + b cosec\u00B2\u03B8', max: 'No upper bound (if a<b)', min: '2\u221A(ab) when a\u2264b' },
  { expr: 'a cos\u00B2\u03B8 + b sec\u00B2\u03B8', max: 'No upper bound (if a<b)', min: '2\u221A(ab) when a\u2264b' },
  { expr: 'a tan\u00B2\u03B8 + b cot\u00B2\u03B8', max: '\u221E', min: '2\u221A(ab)' },
  { expr: 'sin\u03B8 \u00D7 cos\u03B8', max: '1/2', min: '-1/2' },
]

export default function TrigTable() {
  const [activeTab, setActiveTab] = useState<'table' | 'identities' | 'maxmin'>('table')

  return (
    <section id="qa-trig" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-violet-500 to-blue-500" />
          <h2 className="text-xl font-extrabold text-brand-900">Trigonometry Quick Reference</h2>
        </div>
        <p className="text-sm text-slate-500 mb-6 ml-4">
          Color-coded trig values, identities, and max/min expressions for instant recall.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {([
            { key: 'table', label: 'Values Table' },
            { key: 'identities', label: 'Identities & Rules' },
            { key: 'maxmin', label: 'Max/Min Expressions' },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Values Table */}
        {activeTab === 'table' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <th className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-wider rounded-tl-2xl min-w-[80px]">
                      Function
                    </th>
                    {ANGLES.map(a => (
                      <th key={a} className="px-4 py-3 text-center text-xs font-extrabold min-w-[70px]">
                        {a}&deg;
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TRIG_DATA.map((row, i) => (
                    <tr key={row.fn} className={`${row.bgRow} ${i === TRIG_DATA.length - 1 ? '' : 'border-b border-slate-100'}`}>
                      <td className={`px-4 py-3 font-extrabold ${row.colors}`}>
                        {row.fn} &theta;
                      </td>
                      {row.values.map((v, j) => (
                        <td key={j} className="px-4 py-3 text-center">
                          <span className={`font-mono font-bold text-sm ${row.colors}`}>
                            {v}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Memory tricks */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h4 className="text-xs font-extrabold text-amber-700 uppercase tracking-wider mb-3">
                Quick Memory Trick
              </h4>
              <div className="space-y-2 text-xs text-amber-700">
                <p>
                  <span className="font-bold">sin values pattern:</span> &radic;0/2, &radic;1/2, &radic;2/2, &radic;3/2, &radic;4/2
                </p>
                <p>
                  <span className="font-bold">cos values:</span> Reverse of sin values (complementary)
                </p>
                <p>
                  <span className="font-bold">tan = sin/cos</span> at each angle. tan 45 = 1 (the pivot point).
                </p>
              </div>
            </div>

            {/* Complementary angle rules */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h4 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider mb-4">
                Complementary Angle Rules (90&deg; - &theta;)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {COMPLEMENTARY.map(c => (
                  <div
                    key={c.left}
                    className="bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2 text-center"
                  >
                    <p className="font-mono text-xs text-indigo-800 font-bold">
                      {c.left} = {c.right}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Identities */}
        {activeTab === 'identities' && (
          <div className="space-y-6">
            {/* Pythagorean Identities */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {IDENTITIES.map(id => (
                <div
                  key={id.label}
                  className={`bg-gradient-to-br ${id.color} rounded-2xl p-5 text-white shadow-lg`}
                >
                  <p className="text-xs font-bold text-white/70 mb-2">{id.label}</p>
                  <p className="font-mono text-lg font-extrabold">{id.formula}</p>
                </div>
              ))}
            </div>

            {/* Derived forms */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h4 className="text-xs font-extrabold text-violet-600 uppercase tracking-wider mb-4">
                Derived Forms
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'sin\u00B2\u03B8 = 1 - cos\u00B2\u03B8',
                  'cos\u00B2\u03B8 = 1 - sin\u00B2\u03B8',
                  'tan\u00B2\u03B8 = sec\u00B2\u03B8 - 1',
                  'cot\u00B2\u03B8 = cosec\u00B2\u03B8 - 1',
                  'sec\u00B2\u03B8 - tan\u00B2\u03B8 = 1',
                  'cosec\u00B2\u03B8 - cot\u00B2\u03B8 = 1',
                  'sin2\u03B8 = 2sin\u03B8cos\u03B8',
                  'cos2\u03B8 = cos\u00B2\u03B8 - sin\u00B2\u03B8',
                ].map(f => (
                  <div key={f} className="bg-violet-50 border border-violet-100 rounded-xl px-3 py-2">
                    <p className="font-mono text-xs text-violet-800 font-bold">{f}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sum & Difference */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h4 className="text-xs font-extrabold text-blue-600 uppercase tracking-wider mb-4">
                Sum & Difference Formulas
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'sin(A+B) = sinA cosB + cosA sinB',
                  'sin(A-B) = sinA cosB - cosA sinB',
                  'cos(A+B) = cosA cosB - sinA sinB',
                  'cos(A-B) = cosA cosB + sinA sinB',
                  'tan(A+B) = (tanA+tanB)/(1-tanA tanB)',
                  'tan(A-B) = (tanA-tanB)/(1+tanA tanB)',
                ].map(f => (
                  <div key={f} className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
                    <p className="font-mono text-xs text-blue-800 font-bold">{f}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Max/Min Expressions */}
        {activeTab === 'maxmin' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                  <th className="px-4 py-3 text-left text-xs font-extrabold uppercase tracking-wider rounded-tl-2xl">
                    Expression
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-extrabold min-w-[140px]">
                    Maximum
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-extrabold min-w-[140px] rounded-tr-2xl">
                    Minimum
                  </th>
                </tr>
              </thead>
              <tbody>
                {MAX_MIN.map((row, i) => (
                  <tr
                    key={row.expr}
                    className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-b border-slate-100`}
                  >
                    <td className="px-4 py-3 font-mono text-xs font-bold text-slate-800">
                      {row.expr}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-mono text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                        {row.max}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-mono text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                        {row.min}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-5 bg-amber-50 border-t border-amber-200 rounded-b-2xl">
              <h4 className="text-xs font-extrabold text-amber-700 uppercase tracking-wider mb-2">
                SSC Shortcut
              </h4>
              <p className="text-xs text-amber-700">
                For <span className="font-mono font-bold">a sin&theta; + b cos&theta;</span>, the range is always
                [<span className="font-bold">-&radic;(a&sup2;+b&sup2;)</span>,{' '}
                <span className="font-bold">&radic;(a&sup2;+b&sup2;)</span>]. This is the most frequently asked max/min type in SSC CGL.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
