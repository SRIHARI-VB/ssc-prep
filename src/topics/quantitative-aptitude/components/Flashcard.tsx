import { useState, useCallback, useMemo } from 'react'
import { mathsFormulaData, type FormulaEntry } from '../data'
import { SVG_MAP } from './svg'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function Flashcard() {
  const [filterTopic, setFilterTopic] = useState<string>('all')

  const topics = useMemo(
    () => ['all', ...new Set(mathsFormulaData.map(f => f.topic))] as string[],
    []
  )

  const pool = useMemo(() => {
    if (filterTopic === 'all') return mathsFormulaData
    return mathsFormulaData.filter(f => f.topic === filterTopic)
  }, [filterTopic])

  const [deck, setDeck] = useState<FormulaEntry[]>(() => shuffle(mathsFormulaData))
  const [index, setIndex] = useState(0)
  const [flipped, setFlip] = useState(false)
  const [seen, setSeen] = useState(0)

  const handleFilterChange = useCallback((t: string) => {
    setFilterTopic(t)
    let p: FormulaEntry[] = mathsFormulaData
    if (t !== 'all') p = p.filter(f => f.topic === t)
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

  const SvgComponent = card.svgKey ? SVG_MAP[card.svgKey] : null

  return (
    <section id="qa-flash" className="py-12 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-1">Formula Flashcards</p>
          <h2 className="text-3xl font-extrabold text-white">Quick Formula Recall</h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl mx-auto">
            See the formula name, recall it, flip to verify. Master every formula through spaced repetition.
          </p>

          {/* Topic filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {topics.map(t => (
              <button key={t} onClick={() => handleFilterChange(t)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                  filterTopic === t
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white/10 text-slate-400 border-white/20 hover:bg-white/20'
                }`}>
                {t === 'all' ? `All (${pool.length})` : t}
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
            <div className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${((seen + 1) / deck.length) * 100}%` }} />
          </div>
        </div>

        {/* Flashcard */}
        <div className="max-w-md mx-auto">
          <div className={`flashcard-wrapper h-96 cursor-pointer select-none ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlip(f => !f)}>
            <div className="flashcard-inner">
              {/* Front */}
              <div className="flashcard-face bg-white rounded-2xl shadow-2xl flex flex-col p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold tracking-wider text-blue-600 border-b-2 border-blue-500 pb-0.5">
                    {card.topic}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                    P{card.priority}
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
                  <h3 className="text-lg font-extrabold text-slate-800 leading-snug">{card.title}</h3>
                  <p className="text-xs text-slate-400 mt-2">Can you recall the formula?</p>
                  <span className={`mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    card.examProb === 'Hot' ? 'bg-red-50 text-red-600 border-red-200' :
                    card.examProb === 'High' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                    'bg-green-50 text-green-600 border-green-200'
                  }`}>
                    {card.examProb}
                  </span>
                </div>
                <p className="text-center text-xs text-slate-300 mt-auto pt-4 border-t border-slate-100">
                  Tap to reveal formula
                </p>
              </div>

              {/* Back */}
              <div className="flashcard-face flashcard-back bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-2xl flex flex-col p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white/60 border-b-2 border-white/30 pb-0.5 uppercase tracking-wider">Formula</span>
                  <span className="text-xs text-white/50">Tap to flip back</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center px-2 gap-2 overflow-y-auto">
                  {/* SVG illustration on back */}
                  {SvgComponent && (
                    <div className="w-full mb-2 bg-white/10 rounded-xl p-3 border border-white/20">
                      <SvgComponent className="w-full h-16" />
                    </div>
                  )}
                  <div className="bg-white/10 rounded-xl px-4 py-3 border border-white/20 w-full">
                    <p className="font-mono text-sm font-extrabold leading-relaxed whitespace-pre-wrap">{card.formula}</p>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed mt-1">{card.detail}</p>
                  {card.shortcut && (
                    <div className="bg-white/10 rounded-xl px-4 py-2 border border-white/20 w-full mt-1">
                      <p className="text-xs text-amber-300 italic">Shortcut: {card.shortcut}</p>
                    </div>
                  )}
                </div>
                <button onClick={e => { e.stopPropagation(); nextCard() }}
                  className="mt-4 w-full py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm transition-colors">
                  Next Card &rarr;
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-5">
            <button onClick={prevCard} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">&larr; Prev</button>
            <span className="text-xs text-slate-500">{index + 1} of {deck.length}</span>
            <button onClick={nextCard} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">Next &rarr;</button>
          </div>
        </div>
      </div>
    </section>
  )
}
