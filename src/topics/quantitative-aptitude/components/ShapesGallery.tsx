import { useState, useMemo } from 'react'
import { mathsFormulaData, type FormulaEntry } from '../data'
import { SVG_MAP } from './svg'

type ShapeCategory = 'All' | '2D Shapes' | '3D Shapes' | 'Circle & Sector' | 'Triangles'

const SHAPE_TOPICS = ['Geometry', 'Mensuration', 'Trigonometry', 'Coordinate Geometry']

const CATEGORY_MAP: Record<ShapeCategory, (f: FormulaEntry) => boolean> = {
  All: () => true,
  '2D Shapes': f =>
    /rectangle|square|parallelogram|rhombus|trapez|quadrilateral|polygon|hexagon/i.test(f.title + f.detail),
  '3D Shapes': f =>
    /cube|cuboid|sphere|cylinder|cone|prism|pyramid|hemisphere|frustum|solid/i.test(f.title + f.detail),
  'Circle & Sector': f =>
    /circle|sector|arc|annulus|ring|semicircle|circumference/i.test(f.title + f.detail),
  Triangles: f =>
    /triangle|pythagoras|heron|incircle|circumcircle|equilateral|isosceles|scalene|right.?angle/i.test(
      f.title + f.detail
    ),
}

const CAT_COLORS: Record<ShapeCategory, string> = {
  All:              'bg-blue-600 text-white border-blue-600',
  '2D Shapes':     'bg-indigo-600 text-white border-indigo-600',
  '3D Shapes':     'bg-violet-600 text-white border-violet-600',
  'Circle & Sector': 'bg-cyan-600 text-white border-cyan-600',
  Triangles:       'bg-amber-600 text-white border-amber-600',
}

export default function ShapesGallery() {
  const [category, setCategory] = useState<ShapeCategory>('All')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const shapeFormulas = useMemo(
    () =>
      mathsFormulaData.filter(
        f =>
          SHAPE_TOPICS.includes(f.topic) &&
          (f.visual === 'shape' || f.visual === 'diagram' || f.svgKey)
      ),
    []
  )

  // Fallback: if no visual/svgKey entries, include all geometry/mensuration formulas
  const pool = useMemo(() => {
    if (shapeFormulas.length >= 8) return shapeFormulas
    return mathsFormulaData.filter(f => SHAPE_TOPICS.includes(f.topic))
  }, [shapeFormulas])

  const filtered = useMemo(
    () => pool.filter(CATEGORY_MAP[category]),
    [pool, category]
  )

  return (
    <section id="qa-shapes" className="py-12 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-blue-500" />
          <h2 className="text-xl font-extrabold text-brand-900">Shapes & Formulas Gallery</h2>
        </div>
        <p className="text-sm text-slate-500 mb-6 ml-4">
          Visual cheat sheet wall — every shape with its key formulas at a glance.
        </p>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.keys(CATEGORY_MAP) as ShapeCategory[]).map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                category === cat
                  ? CAT_COLORS[cat]
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-400 mb-4">{filtered.length} shape formula(s)</p>

        {/* Grid of shape cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(f => {
            const SvgComponent = f.svgKey ? SVG_MAP[f.svgKey] : null
            const isExpanded = expandedId === f.id

            return (
              <div
                key={f.id}
                onClick={() => setExpandedId(isExpanded ? null : f.id)}
                className={`bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                  isExpanded ? 'ring-2 ring-blue-300 shadow-lg' : 'shadow-sm'
                }`}
              >
                {/* SVG illustration area */}
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 p-6 flex items-center justify-center min-h-[140px] relative">
                  {SvgComponent ? (
                    <SvgComponent className="w-full h-28" />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                      <span className="text-3xl font-extrabold">
                        {f.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  {/* Formula overlay */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1.5 border border-slate-200/50">
                      <p className="font-mono text-[10px] text-blue-800 font-bold truncate leading-tight">
                        {f.formula}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info area */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-extrabold text-slate-800">{f.title}</h4>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ${
                        f.examProb === 'Hot'
                          ? 'bg-red-100 text-red-700 border-red-200'
                          : f.examProb === 'High'
                          ? 'bg-orange-100 text-orange-700 border-orange-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {f.examProb}
                    </span>
                  </div>
                  <p className="text-[10px] text-indigo-500 font-bold mb-1">{f.topic}</p>

                  {isExpanded && (
                    <div className="mt-2 space-y-2 animate-[fadeIn_0.2s_ease-in]">
                      <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                        <p className="font-mono text-xs text-blue-800 font-bold whitespace-pre-wrap">
                          {f.formula}
                        </p>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{f.detail}</p>
                      {f.shortcut && (
                        <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                          <p className="text-xs text-amber-700 italic">Tip: {f.shortcut}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-4xl mb-2">🔷</p>
            <p className="font-medium">No shapes in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
