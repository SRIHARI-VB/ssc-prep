import { useState, useCallback, useMemo } from 'react'
import { schemesData, type SchemeCategory } from '../data'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

const SUBJECT_STYLE: Record<SchemeCategory, { badge: string; back: string; icon: string }> = {
  'Social Welfare':       { badge: 'text-indigo-600 border-indigo-500',  back: 'from-indigo-600 to-violet-700',  icon: '🏠' },
  'Financial Inclusion':  { badge: 'text-teal-600 border-teal-500',      back: 'from-teal-600 to-cyan-700',       icon: '💰' },
  'Agriculture':          { badge: 'text-green-600 border-green-500',    back: 'from-green-600 to-emerald-700',   icon: '🌾' },
  'Employment & Skill':   { badge: 'text-orange-600 border-orange-500',  back: 'from-orange-600 to-amber-700',    icon: '🛠️' },
  'Education':            { badge: 'text-blue-600 border-blue-500',      back: 'from-blue-600 to-indigo-700',     icon: '📚' },
  'Health':               { badge: 'text-red-600 border-red-500',        back: 'from-red-600 to-rose-700',        icon: '🏥' },
  'Infrastructure':       { badge: 'text-violet-600 border-violet-500',  back: 'from-violet-600 to-purple-700',   icon: '🏗️' },
  'Women & Child':        { badge: 'text-pink-600 border-pink-500',      back: 'from-pink-600 to-rose-700',       icon: '👩‍👧' },
  'Digital India':        { badge: 'text-cyan-600 border-cyan-500',      back: 'from-cyan-600 to-blue-700',       icon: '📱' },
  'New Schemes 2024-26':  { badge: 'text-amber-600 border-amber-500',    back: 'from-amber-600 to-orange-700',    icon: '🆕' },
}

export default function Flashcard() {
  const [deck]             = useState(() => shuffle(schemesData))
  const [index, setIndex]  = useState(0)
  const [flipped, setFlip] = useState(false)
  const [seen, setSeen]    = useState(0)

  const card  = useMemo(() => deck[index], [deck, index])
  const style = SUBJECT_STYLE[card.category]

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
    <section id="gs-flash" className="py-16 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-1">Section 04</p>
          <h2 className="text-3xl font-extrabold text-white">Scheme Flashcards</h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl mx-auto">
            Read the question, recall the answer, flip to verify.
            All {deck.length} entries in shuffled order.
          </p>
        </div>

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
                  <span className="text-xs text-slate-400">{card.topic}</span>
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
                      <p className="font-mnemonic text-xs text-emerald-300 italic">&quot;{card.shortcut}&quot;</p>
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
