import { useState, useMemo } from 'react'
import { SVG_MAP } from './svg'

interface Guide {
  id: string
  title: string
  topic: string
  svgKey: string
  rules: string[]
}

const VISUAL_GUIDES: Guide[] = [
  {
    id: 'direction-compass',
    title: '8-Point Direction Compass',
    topic: 'Direction & Distance',
    svgKey: 'direction-compass',
    rules: [
      'North is always at the top of the page.',
      'Right turn from North = East; Left turn from North = West.',
      'NE, NW, SE, SW are at 45-degree angles between cardinal directions.',
      'Clockwise order: N, NE, E, SE, S, SW, W, NW.',
      'Opposite pairs: N-S, E-W, NE-SW, NW-SE.',
      'Use Pythagorean theorem for distance between two points.',
    ],
  },
  {
    id: 'venn-patterns',
    title: 'Venn Diagram Patterns',
    topic: 'Venn Diagrams',
    svgKey: 'venn-diagram',
    rules: [
      'All A are B: Circle A is fully inside Circle B.',
      'Some A are B: Circles overlap partially.',
      'No A is B: Circles are completely separate.',
      'All A are B, All B are C: A inside B, B inside C (nested).',
      'Some A are B, No B is C: A and B overlap, C is separate from B.',
    ],
  },
  {
    id: 'blood-relation-tree',
    title: 'Blood Relation Tree',
    topic: 'Blood Relations',
    svgKey: 'blood-relation',
    rules: [
      'Father/Mother = one generation above.',
      'Son/Daughter = one generation below.',
      'Brother/Sister = same generation, same parents.',
      'Uncle/Aunt = parent\'s sibling.',
      'Cousin = uncle/aunt\'s child.',
      'Draw a family tree from the top. Use + for marriage, | for child.',
      'Work from the known person outward to find the unknown relationship.',
    ],
  },
  {
    id: 'seating-linear',
    title: 'Seating Arrangement Templates',
    topic: 'Seating Arrangement',
    svgKey: 'seating-arrangement',
    rules: [
      'Linear: Draw positions left to right, use arrows for facing direction.',
      'Circular: Draw a circle with positions marked at equal spacing.',
      'Left of a person facing North = that person\'s West side.',
      'Immediate neighbor = exactly one seat away.',
      'Use elimination: fix one person, place others relative to them.',
      'Check all conditions after placement. Cross-verify pairs.',
    ],
  },
  {
    id: 'dice-cube',
    title: 'Dice Net & Opposite Faces',
    topic: 'Dice & Cube',
    svgKey: 'dice-cube',
    rules: [
      'Standard dice: Opposite faces sum to 7 (1-6, 2-5, 3-4).',
      'In a cross-shaped net, opposite faces are never adjacent.',
      'Two faces sharing an edge in a net will be adjacent on the cube.',
      'For non-standard dice: use the "L-rule" on unfolded net.',
      'If you see two views of the same dice, find the common face to determine opposites.',
    ],
  },
  {
    id: 'mirror-water',
    title: 'Mirror & Water Image Rules',
    topic: 'Mirror & Water Image',
    svgKey: 'mirror-image',
    rules: [
      'Mirror image: Left-Right reversal. Top-Bottom stays same.',
      'Water image: Top-Bottom reversal. Left-Right stays same.',
      'Mirror on the right: object flips horizontally to the right.',
      'Letters that look same in mirror: A, H, I, M, O, T, U, V, W, X, Y.',
      'Clock in mirror: Subtract actual time from 12:00 (or 11:60 for minutes).',
    ],
  },
  {
    id: 'clock-angle',
    title: 'Clock Angle Formula',
    topic: 'Calendar & Clock',
    svgKey: 'clock-angle',
    rules: [
      'Angle = |30H - 5.5M| where H=hour, M=minute.',
      'If angle > 180, then actual angle = 360 - angle.',
      'Hour hand speed: 0.5 degrees per minute.',
      'Minute hand speed: 6 degrees per minute.',
      'Hands overlap: 360/5.5 = every 65.45 minutes.',
      'Hands at 180 degrees (straight line): every 65.45 minutes offset.',
    ],
  },
  {
    id: 'counting-figures',
    title: 'Counting Figures Method',
    topic: 'Counting Figures',
    svgKey: 'counting-figures',
    rules: [
      'Count smallest units first, then combinations of 2, then 3, and so on.',
      'For triangles in a triangle: Use formula n(n+2)(2n+1)/8 for n horizontal lines.',
      'For squares in a grid: Sum of k^2 for k=1 to n for an n x n grid.',
      'For rectangles in a grid: C(m+1, 2) x C(n+1, 2) for m x n grid.',
      'Label each region with a letter for systematic counting.',
      'Avoid double-counting by using a consistent system.',
    ],
  },
]

export default function VisualGuides() {
  const [filterTopic, setFilterTopic] = useState<string>('all')

  const topics = useMemo(
    () => ['all', ...new Set(VISUAL_GUIDES.map(g => g.topic))],
    []
  )

  const filtered = useMemo(
    () => filterTopic === 'all' ? VISUAL_GUIDES : VISUAL_GUIDES.filter(g => g.topic === filterTopic),
    [filterTopic]
  )

  return (
    <section id="lr-guides" className="py-12 bg-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-1">Visual Reference Gallery</p>
          <h2 className="text-3xl font-extrabold text-white">Reasoning Visual Guides</h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl mx-auto">
            Visual references for key reasoning topics. Each guide shows the pattern with its core rules.
          </p>
        </div>

        {/* Topic filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {topics.map(t => (
            <button
              key={t}
              onClick={() => setFilterTopic(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                filterTopic === t
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'bg-white/10 text-slate-300 border-white/20 hover:bg-white/20'
              }`}
            >
              {t === 'all' ? `All Guides (${VISUAL_GUIDES.length})` : t}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(guide => {
            const SvgComp = SVG_MAP[guide.svgKey]
            return (
              <div
                key={guide.id}
                className="bg-gradient-to-br from-white/10 to-emerald-900/30 rounded-2xl border border-emerald-800/50 p-6 backdrop-blur-sm hover:border-emerald-500/50 transition-all"
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {guide.topic}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-white mb-4">{guide.title}</h3>

                {/* SVG Illustration */}
                <div className="bg-white/5 rounded-xl border border-white/10 p-4 mb-4 flex items-center justify-center min-h-[160px]">
                  {SvgComp ? (
                    <SvgComp className="w-full max-w-[240px] h-auto max-h-[150px]" />
                  ) : (
                    <div className="text-4xl text-slate-500">📊</div>
                  )}
                </div>

                {/* Rules */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Key Rules</p>
                  <ul className="space-y-1.5">
                    {guide.rules.map((rule, i) => (
                      <li key={i} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                        <span className="shrink-0 w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[9px] flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p className="text-4xl mb-2">📭</p>
            <p className="font-medium">No guides match this topic.</p>
          </div>
        )}
      </div>
    </section>
  )
}
