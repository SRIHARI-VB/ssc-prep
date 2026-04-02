import { useState, useCallback, useMemo } from 'react'
import { budgetData, type BudgetCategory, type BudgetYear } from '../data'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

const SUBJECT_STYLE: Record<BudgetCategory, { badge: string; back: string; icon: string }> = {
  'Budget Basics & History':  { badge: 'text-indigo-600 border-indigo-500',  back: 'from-indigo-600 to-violet-700',  icon: '📜' },
  'Tax Changes':              { badge: 'text-red-600 border-red-500',        back: 'from-red-600 to-rose-700',       icon: '💸' },
  'Fiscal Numbers':           { badge: 'text-green-600 border-green-500',    back: 'from-green-600 to-emerald-700',  icon: '📊' },
  'Agriculture & Rural':      { badge: 'text-lime-600 border-lime-500',      back: 'from-lime-600 to-green-700',     icon: '🌾' },
  'Infrastructure':           { badge: 'text-violet-600 border-violet-500',  back: 'from-violet-600 to-purple-700',  icon: '🏗️' },
  'Defence':                  { badge: 'text-orange-600 border-orange-500',  back: 'from-orange-600 to-amber-700',   icon: '🛡️' },
  'Education & Health':       { badge: 'text-blue-600 border-blue-500',      back: 'from-blue-600 to-indigo-700',    icon: '🎓' },
  'Social Welfare':           { badge: 'text-pink-600 border-pink-500',      back: 'from-pink-600 to-rose-700',      icon: '🤝' },
  'New Schemes & Missions':   { badge: 'text-amber-600 border-amber-500',    back: 'from-amber-600 to-orange-700',   icon: '🚀' },
  'Digital & Technology':     { badge: 'text-cyan-600 border-cyan-500',      back: 'from-cyan-600 to-blue-700',      icon: '💻' },
  'Budget Terminology':       { badge: 'text-purple-600 border-purple-500',  back: 'from-purple-600 to-violet-700',  icon: '📖' },
}

const YEARS: ('all' | BudgetYear)[] = ['all', '2026-27', '2025-26', 'General']

export default function Flashcard() {
  const [filterYear, setFilterYear] = useState<'all' | BudgetYear>('all')

  const [deck, setDeck]      = useState(() => shuffle(budgetData))
  const [index, setIndex]    = useState(0)
  const [flipped, setFlip]   = useState(false)
  const [seen, setSeen]      = useState(0)

  const handleYearChange = useCallback((y: 'all' | BudgetYear) => {
    setFilterYear(y)
    const newPool = y === 'all' ? budgetData : budgetData.filter(e => e.budgetYear === y)
    const shuffled = shuffle(newPool)
    setDeck(shuffled)
    setIndex(0)
    setFlip(false)
    setSeen(0)
  }, [])

  const card  = useMemo(() => deck[index], [deck, index])
  const style = card ? SUBJECT_STYLE[card.category] : SUBJECT_STYLE['Budget Basics & History']

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

  return (
    <section id="ub-flash" className="py-16 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-1">Section 04</p>
          <h2 className="text-3xl font-extrabold text-white">Budget Flashcards</h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl mx-auto">
            Read the question, recall the answer, flip to verify.
          </p>

          {/* Year filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {YEARS.map(y => {
              const count = y === 'all' ? budgetData.length : budgetData.filter(e => e.budgetYear === y).length
              return (
                <button key={y} onClick={() => handleYearChange(y)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    filterYear === y
                      ? y === '2026-27' ? 'bg-emerald-500 text-white border-emerald-500'
                      : y === '2025-26' ? 'bg-sky-500 text-white border-sky-500'
                      : y === 'General' ? 'bg-slate-500 text-white border-slate-500'
                      : 'bg-amber-500 text-white border-amber-500'
                      : 'bg-white/10 text-slate-300 border-white/20 hover:bg-white/20'
                  }`}>
                  {y === 'all' ? `All (${count})` : `FY ${y} (${count})`}
                </button>
              )
            })}
          </div>
        </div>

        <div className="max-w-md mx-auto mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span>Progress</span>
            <span>{Math.min(seen + 1, deck.length)} / {deck.length}</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${((seen + 1) / deck.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <div
            className={`flashcard-wrapper h-80 cursor-pointer select-none ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlip(f => !f)}
          >
            <div className="flashcard-inner">

              <div className="flashcard-face bg-white rounded-2xl shadow-2xl flex flex-col p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold tracking-wider border-b-2 pb-0.5 ${style.badge}`}>
                    {style.icon} {card.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      card.budgetYear === '2026-27' ? 'bg-emerald-100 text-emerald-700' :
                      card.budgetYear === '2025-26' ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-600'
                    }`}>{card.budgetYear === 'General' ? 'GEN' : card.budgetYear}</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
                  <h3 className="text-base font-extrabold text-slate-800 leading-snug">{card.question}</h3>
                </div>
                <p className="text-center text-xs text-slate-300 mt-auto pt-4 border-t border-slate-100">
                  Tap to reveal answer
                </p>
              </div>

              <div className={`flashcard-face flashcard-back bg-gradient-to-br ${style.back} rounded-2xl shadow-2xl flex flex-col p-6 text-white`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white/60 border-b-2 border-white/30 pb-0.5 uppercase tracking-wider">
                    Answer
                  </span>
                  <span className="text-xs text-white/50">Tap to flip back</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center px-2 gap-2 overflow-y-auto">
                  <p className="text-lg font-extrabold leading-tight">{card.answer}</p>
                  <p className="text-xs text-white/70 leading-relaxed mt-1">{card.detail}</p>
                  {card.shortcut && (
                    <div className="mt-2 bg-white/10 rounded-xl px-4 py-2 border border-white/20 w-full">
                      <p className="font-mnemonic text-xs text-amber-300 italic">&quot;{card.shortcut}&quot;</p>
                    </div>
                  )}
                  {card.tamilNote && (
                    <div className="mt-1 bg-amber-400/15 rounded-xl px-4 py-2 border border-amber-400/30 w-full">
                      <p className="text-xs text-amber-200 leading-relaxed"><span className="font-bold">தமிழ்:</span> {card.tamilNote}</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={e => { e.stopPropagation(); nextCard() }}
                  className="mt-4 w-full py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm transition-colors"
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
