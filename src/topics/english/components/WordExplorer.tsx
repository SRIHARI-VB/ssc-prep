import { useState, useMemo, useCallback, useEffect } from 'react'
import { vocabData } from '../data'
import type { VocabEntry, Level } from '../data'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const LEVEL_STYLE: Record<Level, string> = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-red-100 text-red-700',
}

const PROB_STYLE: Record<string, string> = {
  Hot: 'bg-red-500 text-white',
  High: 'bg-orange-500 text-white',
  Confirmed: 'bg-emerald-500 text-white',
  Recurring: 'bg-blue-500 text-white',
}

const LS_KEY = 'english-vocab-known'

function loadKnownIds(): Set<number> {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) return new Set(JSON.parse(raw) as number[])
  } catch { /* ignore */ }
  return new Set()
}

function saveKnownIds(ids: Set<number>) {
  localStorage.setItem(LS_KEY, JSON.stringify([...ids]))
}

export default function WordExplorer() {
  const [filterLevel, setFilterLevel] = useState<'all' | Level>('all')
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'word' | 'revealed'>('word')
  const [knownIds, setKnownIds] = useState<Set<number>>(loadKnownIds)
  const [unknownIds, setUnknownIds] = useState<Set<number>>(new Set())
  const [reviewMode, setReviewMode] = useState(false)
  const [completed, setCompleted] = useState(false)

  const filtered = useMemo(
    () => filterLevel === 'all' ? vocabData : vocabData.filter(v => v.level === filterLevel),
    [filterLevel]
  )

  const deck = useMemo(() => {
    if (reviewMode) {
      return shuffle(vocabData.filter(v => unknownIds.has(v.id)))
    }
    return shuffle(filtered)
  }, [filtered, reviewMode, unknownIds])

  // Reset on filter/deck change
  useEffect(() => {
    setIndex(0)
    setPhase('word')
    setCompleted(false)
  }, [deck])

  const card: VocabEntry | undefined = deck[index]

  const knownInFilter = useMemo(
    () => filtered.filter(v => knownIds.has(v.id)).length,
    [filtered, knownIds]
  )

  const levelCounts = useMemo(() => ({
    all: vocabData.length,
    Easy: vocabData.filter(v => v.level === 'Easy').length,
    Medium: vocabData.filter(v => v.level === 'Medium').length,
    Hard: vocabData.filter(v => v.level === 'Hard').length,
  }), [])

  const advance = useCallback(() => {
    if (index + 1 >= deck.length) {
      setCompleted(true)
      return
    }
    setIndex(i => i + 1)
    setPhase('word')
  }, [index, deck.length])

  const markKnown = useCallback(() => {
    if (!card) return
    setKnownIds(prev => {
      const next = new Set(prev)
      next.add(card.id)
      saveKnownIds(next)
      return next
    })
    advance()
  }, [card, advance])

  const markUnknown = useCallback(() => {
    if (!card) return
    setUnknownIds(prev => {
      const next = new Set(prev)
      next.add(card.id)
      return next
    })
    advance()
  }, [card, advance])

  const handleFilterChange = (lvl: 'all' | Level) => {
    setFilterLevel(lvl)
    setReviewMode(false)
  }

  const startReview = () => {
    setReviewMode(true)
    setCompleted(false)
    setIndex(0)
    setPhase('word')
  }

  const highlightWord = (text: string, word: string) => {
    const regex = new RegExp(`(${word})`, 'gi')
    const parts = text.split(regex)
    return parts.map((p, i) =>
      regex.test(p)
        ? <span key={i} className="font-bold text-rose-600">{p}</span>
        : <span key={i}>{p}</span>
    )
  }

  return (
    <section className="py-16 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white">
            <span className="mr-2">📝</span>Word Explorer
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xl mx-auto">
            Interactive vocabulary — reveal, assess, repeat
          </p>

          {/* Level filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {(['all', 'Easy', 'Medium', 'Hard'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => handleFilterChange(lvl)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  filterLevel === lvl && !reviewMode
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white/10 text-slate-300 border-white/20 hover:bg-white/20'
                }`}
              >
                {lvl === 'all' ? `All (${levelCounts.all})` : `${lvl} (${levelCounts[lvl]})`}
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
            <span>Known: {knownInFilter}/{filtered.length}</span>
            <span>{reviewMode ? 'Review Mode' : `Card ${Math.min(index + 1, deck.length)} / ${deck.length}`}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${filtered.length > 0 ? (knownInFilter / filtered.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Completed summary */}
        {completed && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-2xl p-10">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-4">
                Deck Complete!
              </h3>
              <p className="text-lg text-slate-600 mb-2">
                You know <span className="font-bold text-emerald-600">{knownIds.size}</span> out of <span className="font-bold">{vocabData.length}</span> words!
              </p>
              {unknownIds.size > 0 && (
                <button
                  onClick={startReview}
                  className="mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-xl transition-all"
                >
                  Review Missed Words ({unknownIds.size})
                </button>
              )}
              <button
                onClick={() => {
                  setReviewMode(false)
                  setCompleted(false)
                  setIndex(0)
                  setPhase('word')
                  setUnknownIds(new Set())
                }}
                className="mt-4 block mx-auto text-sm text-rose-600 hover:underline"
              >
                Restart Full Deck
              </button>
            </div>
          </div>
        )}

        {/* Card */}
        {!completed && card && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">

              {/* Word header */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h3 className="text-3xl font-extrabold text-slate-800">{card.word}</h3>
                <span className="text-base italic text-slate-500">({card.pos})</span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${LEVEL_STYLE[card.level]}`}>
                  {card.level}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${PROB_STYLE[card.examProb]}`}>
                  {card.examProb}
                </span>
              </div>

              {phase === 'word' && (
                <div className="text-center py-8">
                  <button
                    onClick={() => setPhase('revealed')}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-3 rounded-xl text-lg transition-all"
                  >
                    Reveal Meaning →
                  </button>
                </div>
              )}

              {phase === 'revealed' && (
                <div className="space-y-5 mt-2">
                  {/* Meaning */}
                  <p className="text-lg text-slate-700">{card.meaning}</p>

                  {/* Examples */}
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Examples:</p>
                    {card.examples.map((ex, i) => (
                      <p key={i} className="text-sm italic text-slate-600 mb-1">
                        "{highlightWord(ex, card.word)}"
                      </p>
                    ))}
                  </div>

                  {/* Synonyms */}
                  {card.synonyms.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Synonyms:</p>
                      <div className="flex flex-wrap gap-2">
                        {card.synonyms.map(s => (
                          <span key={s} className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Antonyms */}
                  {card.antonyms.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Antonyms:</p>
                      <div className="flex flex-wrap gap-2">
                        {card.antonyms.map(a => (
                          <span key={a} className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mnemonic */}
                  {card.mnemonic && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <p className="text-sm text-amber-800">
                        <span className="mr-1">💡</span>{card.mnemonic}
                      </p>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={markKnown}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all"
                    >
                      I Know This ✓
                    </button>
                    <button
                      onClick={markUnknown}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-all"
                    >
                      Need Practice ✗
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => { setIndex(i => Math.max(0, i - 1)); setPhase('word') }}
                disabled={index === 0}
                className="text-sm font-semibold text-slate-400 hover:text-white disabled:opacity-30 transition-all"
              >
                ← Prev
              </button>
              <button
                onClick={() => { advance() }}
                disabled={index >= deck.length - 1}
                className="text-sm font-semibold text-slate-400 hover:text-white disabled:opacity-30 transition-all"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
