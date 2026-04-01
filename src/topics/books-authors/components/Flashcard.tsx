import { useState, useCallback, useMemo } from 'react'
import { booksData, type Category } from '../data'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

const CAT_STYLE: Record<Category, { badge: string; back: string }> = {
  'Ancient/Medieval': { badge: 'text-amber-600 border-amber-500',    back: 'from-amber-600 to-yellow-600' },
  'Freedom Struggle': { badge: 'text-orange-600 border-orange-500',  back: 'from-orange-600 to-red-600' },
  'Sports':           { badge: 'text-sky-600 border-sky-500',        back: 'from-sky-600 to-blue-700' },
  'PYQ':              { badge: 'text-indigo-600 border-indigo-500',  back: 'from-indigo-600 to-violet-700' },
  'Literary Award':   { badge: 'text-violet-600 border-violet-500',  back: 'from-violet-600 to-purple-700' },
  'Current Affairs':  { badge: 'text-emerald-600 border-emerald-500', back: 'from-emerald-600 to-teal-700' },
}

export default function Flashcard() {
  const [deck]             = useState(() => shuffle(booksData))
  const [index, setIndex]  = useState(0)
  const [flipped, setFlip] = useState(false)
  const [seen, setSeen]    = useState(0)

  const card    = useMemo(() => deck[index], [deck, index])
  const style   = CAT_STYLE[card.category]

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

  return (
    <section id="flashcard" className="py-16 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-1">Section 03</p>
          <h2 className="text-3xl font-extrabold text-white">Active Recall Flashcards</h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl mx-auto">
            Read the book title, guess the author, flip to reveal.
            All 74 entries are in the deck, shuffled randomly.
          </p>
        </div>

        {/* Progress bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span>Progress</span>
            <span>{Math.min(seen + 1, deck.length)} / {deck.length}</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${((seen + 1) / deck.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="max-w-md mx-auto">
          <div
            className={`flashcard-wrapper h-72 cursor-pointer select-none ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlip(f => !f)}
          >
            <div className="flashcard-inner">

              {/* Front */}
              <div className="flashcard-face bg-white rounded-2xl shadow-2xl flex flex-col p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold tracking-wider border-b-2 pb-0.5 ${style.badge}`}>
                    {card.category}
                  </span>
                  <span className="text-xs text-slate-300">Tap to flip</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                  <span className="text-3xl mb-3">📖</span>
                  <h3 className="text-xl font-extrabold text-slate-800 leading-snug">{card.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{card.theme}</p>
                </div>
                <p className="text-center text-xs text-slate-300 mt-auto pt-4 border-t border-slate-100">
                  Who wrote this?
                </p>
              </div>

              {/* Back */}
              <div className={`flashcard-face flashcard-back bg-gradient-to-br ${style.back} rounded-2xl shadow-2xl flex flex-col p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold tracking-wider text-white/60 border-b-2 border-white/30 pb-0.5">
                    AUTHOR
                  </span>
                  <span className="text-xs text-white/50">Tap to flip back</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4 gap-2">
                  <p className="text-2xl font-extrabold leading-tight">{card.author}</p>
                  <p className="text-xs text-white/70 font-medium">{card.award} · {card.year}</p>
                  <div className="mt-2 bg-white/10 rounded-xl px-4 py-2 border border-white/20 w-full">
                    <p className="font-mnemonic text-xs text-amber-300 italic">"{card.mnemonic}"</p>
                  </div>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); nextCard() }}
                  className="mt-4 w-full py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm transition-colors"
                >
                  Next Card →
                </button>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div className="flex justify-between items-center mt-5">
            <button onClick={prevCard} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">
              ← Prev
            </button>
            <span className="text-xs text-slate-500">{index + 1} of {deck.length}</span>
            <button onClick={nextCard} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">
              Next →
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
