import { useState, useCallback, useMemo } from 'react'
import { vocabData, type VocabEntry, type Level } from '../data'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

const LEVEL_CHIP: Record<Level, string> = {
  Easy:   'bg-green-100 text-green-700 border-green-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  Hard:   'bg-red-100 text-red-700 border-red-200',
}

const PROB_CHIP: Record<string, string> = {
  Hot:       'bg-red-50 text-red-600 border-red-200',
  High:      'bg-orange-50 text-orange-600 border-orange-200',
  Confirmed: 'bg-green-50 text-green-600 border-green-200',
  Recurring: 'bg-violet-50 text-violet-600 border-violet-200',
}

export default function Flashcard() {
  const [filterLevel, setFilterLevel] = useState<Level | 'all'>('all')

  const _pool = useMemo(() => {
    if (filterLevel === 'all') return vocabData
    return vocabData.filter(v => v.level === filterLevel)
  }, [filterLevel])
  void _pool // suppress unused warning

  const levelCounts = useMemo(() => ({
    all: vocabData.length,
    Easy: vocabData.filter(v => v.level === 'Easy').length,
    Medium: vocabData.filter(v => v.level === 'Medium').length,
    Hard: vocabData.filter(v => v.level === 'Hard').length,
  }), [])

  const [deck, setDeck] = useState<VocabEntry[]>(() => shuffle(vocabData))
  const [index, setIndex] = useState(0)
  const [flipped, setFlip] = useState(false)
  const [seen, setSeen] = useState(0)

  const handleFilterChange = useCallback((l: Level | 'all') => {
    setFilterLevel(l)
    let p: VocabEntry[] = vocabData
    if (l !== 'all') p = p.filter(v => v.level === l)
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

  return (
    <section id="eng-flash" className="py-12 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold tracking-widest text-rose-400 uppercase mb-1">Vocabulary Flashcards</p>
          <h2 className="text-3xl font-extrabold text-white">Word Power Builder</h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl mx-auto">
            See the word, recall its meaning, flip to verify. Master SSC vocabulary through spaced repetition.
          </p>

          {/* Level filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {(['all', 'Easy', 'Medium', 'Hard'] as (Level | 'all')[]).map(l => (
              <button key={l} onClick={() => handleFilterChange(l)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                  filterLevel === l
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white/10 text-slate-400 border-white/20 hover:bg-white/20'
                }`}>
                {l === 'all' ? `All (${levelCounts.all})` : `${l} (${levelCounts[l]})`}
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
            <div className="h-full bg-rose-500 rounded-full transition-all duration-500"
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
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${LEVEL_CHIP[card.level]}`}>
                    {card.level}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${PROB_CHIP[card.examProb] ?? ''}`}>
                    {card.examProb}
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
                  <h3 className="text-2xl font-extrabold text-slate-800 leading-snug">{card.word}</h3>
                  <span className="mt-2 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                    {card.pos}
                  </span>
                  <p className="text-xs text-slate-400 mt-3">Can you recall the meaning?</p>
                </div>
                <p className="text-center text-xs text-slate-300 mt-auto pt-4 border-t border-slate-100">
                  Tap to reveal meaning
                </p>
              </div>

              {/* Back */}
              <div className="flashcard-face flashcard-back bg-gradient-to-br from-rose-600 to-pink-700 rounded-2xl shadow-2xl flex flex-col p-6 text-white overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white/60 border-b-2 border-white/30 pb-0.5 uppercase tracking-wider">
                    {card.word}
                  </span>
                  <span className="text-xs text-white/50">Tap to flip back</span>
                </div>
                <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                  {/* Meaning */}
                  <div className="bg-white/10 rounded-xl px-4 py-3 border border-white/20">
                    <p className="font-bold text-sm leading-relaxed">{card.meaning}</p>
                  </div>

                  {/* Examples */}
                  <div className="space-y-1.5">
                    {card.examples.map((ex, i) => (
                      <p key={i} className="text-xs text-white/80 italic leading-relaxed">
                        &ldquo;{ex}&rdquo;
                      </p>
                    ))}
                  </div>

                  {/* Synonyms */}
                  {card.synonyms.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] text-white/50 font-bold mr-1">SYN:</span>
                      {card.synonyms.map((s, i) => (
                        <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/30 text-green-200 border border-green-400/30">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Antonyms */}
                  {card.antonyms.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] text-white/50 font-bold mr-1">ANT:</span>
                      {card.antonyms.map((a, i) => (
                        <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/30 text-red-200 border border-red-400/30">
                          {a}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Mnemonic */}
                  {card.mnemonic && (
                    <div className="bg-amber-500/20 rounded-xl px-4 py-2 border border-amber-400/30">
                      <p className="text-xs text-amber-200 italic">💡 {card.mnemonic}</p>
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
