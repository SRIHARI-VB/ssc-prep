import { useState, useCallback, useMemo } from 'react'
import { reasoningConceptData } from '../data'
import { SVG_MAP } from './svg'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

/** Split method string into steps */
function parseMethodSteps(method: string): string[] {
  if (method.includes(';')) return method.split(';').map(s => s.trim()).filter(Boolean)
  if (method.includes('\n')) return method.split('\n').map(s => s.trim()).filter(Boolean)
  const numbered = method.split(/(?=\d+\.\s)/).map(s => s.trim()).filter(Boolean)
  if (numbered.length > 1) return numbered
  return [method]
}

export default function Flashcard() {
  const [filterTopic, setFilterTopic] = useState<string>('all')

  const topics = useMemo(
    () => ['all', ...new Set(reasoningConceptData.map(c => c.topic))],
    []
  )

  const [deck, setDeck] = useState(() => shuffle(reasoningConceptData))
  const [index, setIndex] = useState(0)
  const [flipped, setFlip] = useState(false)
  const [seen, setSeen] = useState(0)

  const handleFilterChange = useCallback((t: string) => {
    setFilterTopic(t)
    let p = reasoningConceptData
    if (t !== 'all') p = p.filter(c => c.topic === t)
    setDeck(shuffle(p))
    setIndex(0)
    setFlip(false)
    setSeen(0)
  }, [])

  const card = deck[index]

  const nextCard = useCallback(() => {
    setFlip(false)
    setTimeout(() => {
      setIndex(i => (i + 1) % deck.length)
      setSeen(s => Math.min(s + 1, deck.length))
    }, 300)
  }, [deck.length])

  const prevCard = useCallback(() => {
    setFlip(false)
    setTimeout(() => setIndex(i => (i - 1 + deck.length) % deck.length), 300)
  }, [deck.length])

  if (!card) return null

  const SvgComp = card.svgKey ? SVG_MAP[card.svgKey] : null
  const steps = parseMethodSteps(card.method)

  return (
    <section id="lr-flash" className="py-12 bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-1">Concept Flashcards</p>
          <h2 className="text-3xl font-extrabold text-white">Method Recall Practice</h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl mx-auto">
            See the concept name, recall the method, flip to verify. Build pattern recognition through repetition.
          </p>

          {/* Topic filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {topics.map(t => (
              <button
                key={t}
                onClick={() => handleFilterChange(t)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                  filterTopic === t
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white/10 text-slate-400 border-white/20 hover:bg-white/20'
                }`}
              >
                {t === 'all' ? `All (${reasoningConceptData.length})` : t}
              </button>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="max-w-md mx-auto mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span>Progress</span>
            <span>{Math.min(seen + 1, deck.length)} / {deck.length}</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${((seen + 1) / deck.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="max-w-md mx-auto">
          <div
            className={`flashcard-wrapper h-96 cursor-pointer select-none ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlip(f => !f)}
          >
            <div className="flashcard-inner">
              {/* Front */}
              <div className="flashcard-face bg-white rounded-2xl shadow-2xl flex flex-col p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold tracking-wider text-emerald-600 border-b-2 border-emerald-500 pb-0.5">
                    {card.topic}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-emerald-600 border border-emerald-300">
                    P{card.priority}
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
                  <h3 className="text-lg font-extrabold text-slate-800 leading-snug">{card.title}</h3>
                  <p className="text-xs text-slate-400 mt-3">Can you recall the method?</p>
                </div>
                <p className="text-center text-xs text-slate-300 mt-auto pt-4 border-t border-slate-100">
                  Tap to reveal method
                </p>
              </div>

              {/* Back */}
              <div className="flashcard-face flashcard-back bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-2xl flex flex-col p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white/60 border-b-2 border-white/30 pb-0.5 uppercase tracking-wider">
                    Method
                  </span>
                  <span className="text-xs text-white/50">Tap to flip back</span>
                </div>
                <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                  {/* SVG illustration */}
                  {SvgComp && (
                    <div className="bg-white/10 rounded-xl p-3 border border-white/20 flex items-center justify-center">
                      <SvgComp className="w-full max-w-[120px] h-auto max-h-[80px]" />
                    </div>
                  )}

                  {/* Method steps */}
                  <div className="bg-white/10 rounded-xl px-4 py-3 border border-white/20">
                    <ol className="space-y-1.5">
                      {steps.map((step, i) => (
                        <li key={i} className="flex gap-2 text-xs leading-relaxed">
                          <span className="shrink-0 w-4 h-4 rounded-full bg-white/20 text-white font-bold text-[9px] flex items-center justify-center mt-0.5">
                            {i + 1}
                          </span>
                          <span>{step.replace(/^\d+\.\s*/, '')}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {card.shortcut && (
                    <div className="bg-white/10 rounded-xl px-4 py-2 border border-white/20">
                      <p className="text-xs text-amber-300 italic">💡 {card.shortcut}</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={e => { e.stopPropagation(); nextCard() }}
                  className="mt-3 w-full py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm transition-colors"
                >
                  Next Card &rarr;
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-5">
            <button onClick={prevCard} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">
              &larr; Prev
            </button>
            <span className="text-xs text-slate-500">{index + 1} of {deck.length}</span>
            <button onClick={nextCard} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
