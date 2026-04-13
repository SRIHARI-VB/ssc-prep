import { useState, useMemo } from 'react'
import { vocabData, englishQuestions, grammarRules } from '../data'
import type { EnglishQuestion, VocabEntry } from '../data'

/* ── Tab definitions ──────────────────────────────────────────────────── */

type TabKey = 'idioms' | 'one-word' | 'confused' | 'grammar' | 'spelling' | 'voice-speech' | 'pyq-hot'

interface TabDef {
  key: TabKey; icon: string; label: string; color: string
  accent: string; ring: string
}

const TABS: TabDef[] = [
  { key: 'idioms',       icon: '📝', label: 'Idioms',        color: 'bg-amber-50 border-amber-200',   accent: 'text-amber-700 bg-amber-100 border-amber-200',     ring: 'ring-amber-400' },
  { key: 'one-word',     icon: '🎯', label: 'One-Word',      color: 'bg-indigo-50 border-indigo-200', accent: 'text-indigo-700 bg-indigo-100 border-indigo-200',   ring: 'ring-indigo-400' },
  { key: 'confused',     icon: '⚡', label: 'Confused Words', color: 'bg-orange-50 border-orange-200', accent: 'text-orange-700 bg-orange-100 border-orange-200',   ring: 'ring-orange-400' },
  { key: 'grammar',      icon: '📏', label: 'Grammar Rules', color: 'bg-blue-50 border-blue-200',     accent: 'text-blue-700 bg-blue-100 border-blue-200',         ring: 'ring-blue-400' },
  { key: 'spelling',     icon: '✏️', label: 'Spelling',       color: 'bg-pink-50 border-pink-200',     accent: 'text-pink-700 bg-pink-100 border-pink-200',         ring: 'ring-pink-400' },
  { key: 'voice-speech', icon: '🔄', label: 'Voice & Speech',color: 'bg-violet-50 border-violet-200', accent: 'text-violet-700 bg-violet-100 border-violet-200',   ring: 'ring-violet-400' },
  { key: 'pyq-hot',      icon: '📖', label: 'PYQ Hot',       color: 'bg-red-50 border-red-200',       accent: 'text-red-700 bg-red-100 border-red-200',           ring: 'ring-red-400' },
]

/* ── Confused word pairs ──────────────────────────────────────────────── */

const CONFUSED_WORDS: { pair: [string, string]; tip: string }[] = [
  { pair: ['Affect', 'Effect'],       tip: 'Affect = verb (to influence); Effect = noun (result)' },
  { pair: ['Accept', 'Except'],       tip: 'Accept = receive; Except = exclude' },
  { pair: ['Advice', 'Advise'],       tip: 'Advice = noun; Advise = verb' },
  { pair: ['Principle', 'Principal'], tip: 'Principle = rule/belief; Principal = head/main' },
  { pair: ['Stationary', 'Stationery'], tip: 'Stationary = not moving; Stationery = writing materials' },
  { pair: ['Complement', 'Compliment'], tip: 'Complement = complete; Compliment = praise' },
  { pair: ['Emigrate', 'Immigrate'],   tip: 'Emigrate = leave a country; Immigrate = enter a country' },
  { pair: ['Elicit', 'Illicit'],       tip: 'Elicit = draw out; Illicit = illegal' },
  { pair: ['Loose', 'Lose'],           tip: 'Loose = not tight; Lose = to misplace/fail' },
  { pair: ['Their', 'There'],          tip: 'Their = possessive; There = place/existence' },
  { pair: ['Its', "It's"],             tip: "Its = possessive; It's = it is/it has" },
  { pair: ['Than', 'Then'],            tip: 'Than = comparison; Then = time/sequence' },
  { pair: ['Cite', 'Site'],            tip: 'Cite = quote/reference; Site = location' },
  { pair: ['Beside', 'Besides'],       tip: 'Beside = next to; Besides = in addition to' },
  { pair: ['Ensure', 'Insure'],        tip: 'Ensure = make certain; Insure = protect financially' },
  { pair: ['Farther', 'Further'],      tip: 'Farther = physical distance; Further = additional/abstract' },
  { pair: ['Discreet', 'Discrete'],    tip: 'Discreet = careful/prudent; Discrete = separate/distinct' },
  { pair: ['Eminent', 'Imminent'],     tip: 'Eminent = famous; Imminent = about to happen' },
  { pair: ['Precede', 'Proceed'],      tip: 'Precede = come before; Proceed = continue' },
  { pair: ['Allusion', 'Illusion'],    tip: 'Allusion = indirect reference; Illusion = false impression' },
  { pair: ['Amiable', 'Amicable'],     tip: 'Amiable = friendly (person); Amicable = friendly (agreement)' },
  { pair: ['Assent', 'Ascent'],        tip: 'Assent = agreement; Ascent = upward climb' },
  { pair: ['Censure', 'Censor'],       tip: 'Censure = criticize; Censor = suppress content' },
  { pair: ['Defer', 'Differ'],         tip: 'Defer = postpone/yield; Differ = be unlike' },
  { pair: ['Eligible', 'Illegible'],   tip: 'Eligible = qualified; Illegible = unreadable' },
  { pair: ['Flout', 'Flaunt'],         tip: 'Flout = disobey; Flaunt = show off' },
  { pair: ['Judicial', 'Judicious'],   tip: 'Judicial = of courts; Judicious = wise/sensible' },
  { pair: ['Moral', 'Morale'],         tip: 'Moral = ethical lesson; Morale = spirit/confidence' },
  { pair: ['Persecute', 'Prosecute'],  tip: 'Persecute = oppress; Prosecute = take legal action' },
  { pair: ['Veracious', 'Voracious'],  tip: 'Veracious = truthful; Voracious = very hungry/eager' },
]

/* ── Cheat sheets ─────────────────────────────────────────────────────── */

const CHEATSHEET: Record<TabKey, { title: string; bullets: string[] }> = {
  'idioms': {
    title: 'Idioms & Phrases -- Quick Recall',
    bullets: [
      'Break the ice = Start a conversation in a social setting',
      'Burn the midnight oil = Work/study late into the night',
      'A red herring = Something misleading or distracting',
      'Hit the nail on the head = Be exactly right',
      'Once in a blue moon = Very rarely',
      'Cry over spilt milk = Regret something that cannot be undone',
      'Bite the bullet = Endure a painful situation bravely',
      'The ball is in your court = It is your turn to take action',
    ],
  },
  'one-word': {
    title: 'One-Word Substitution -- Quick Recall',
    bullets: [
      'Omniscient = One who knows everything',
      'Ambidextrous = Able to use both hands equally well',
      'Inevitable = Certain to happen, unavoidable',
      'Mercenary = A soldier who fights for money',
      'Philanthropist = One who loves mankind and helps the needy',
      'Misogynist = One who hates women',
      'Insolvent = One who cannot pay debts',
      'Posthumous = Occurring after death',
    ],
  },
  'confused': {
    title: 'Confused Words -- Quick Recall',
    bullets: [
      'Affect (verb) vs Effect (noun) = "The rain affected the match. The effect was a draw."',
      'Principle (rule) vs Principal (head) = "The principal upheld the principle of fairness."',
      'Stationary (still) vs Stationery (paper) = "The stationery was on the stationary desk."',
      'Complement (complete) vs Compliment (praise) = "The wine complements the meal. She paid a compliment."',
      'Elicit (draw out) vs Illicit (illegal) = "The police elicited info about illicit trade."',
      'Eminent (famous) vs Imminent (about to happen) = "The eminent scientist warned of imminent danger."',
    ],
  },
  'grammar': {
    title: 'Grammar Rules -- Quick Recall',
    bullets: [
      'Subject-Verb Agreement = Singular subject takes singular verb; plural takes plural',
      'Tenses = Simple (fact/habit), Continuous (ongoing), Perfect (completed), Perfect Continuous (duration)',
      'Articles = "a" before consonant sound, "an" before vowel sound, "the" for specific/unique',
      'Prepositions = At (point), In (enclosed/time period), On (surface/day/date)',
      'Modals = Can (ability), May (permission/possibility), Must (obligation/certainty), Should (advice)',
      'Active to Passive = Object becomes subject; verb changes to be + past participle',
      'Direct to Indirect = Remove quotes, change pronouns/tenses, add reporting verb',
      'Parallelism = Items in a list/comparison must have the same grammatical form',
    ],
  },
  'spelling': {
    title: 'Spelling -- Quick Recall',
    bullets: [
      'i before e except after c = receive, perceive, conceive (exceptions: weird, seize)',
      'Silent letters = Knowledge (k), Pneumonia (p), Psychology (p), Honest (h), Debt (b)',
      'Double letters = Accommodate, Occurrence, Embarrass, Millennium, Committee',
      '-ible vs -able = Responsible, Visible, Capable, Adorable (no fixed rule; memorize)',
      '-ence vs -ance = Difference, Reference, Importance, Resistance',
      '-tion vs -sion = Nation, Education, Decision, Confusion',
    ],
  },
  'voice-speech': {
    title: 'Voice & Speech -- Quick Recall',
    bullets: [
      'Active to Passive = Subject and Object swap; verb becomes be + V3',
      'Present Simple = "He writes" -> "It is written by him"',
      'Past Simple = "She sang" -> "A song was sung by her"',
      'Future Simple = "They will build" -> "It will be built by them"',
      'Direct to Indirect (Statement) = say/said + that + tense shift back',
      'Direct to Indirect (Question) = asked + if/whether (yes/no) or asked + wh-word',
      'Direct to Indirect (Command) = ordered/told + to + V1',
      'Pronoun changes = I->he/she, we->they, my->his/her, this->that, here->there',
    ],
  },
  'pyq-hot': {
    title: 'PYQ Hot Words -- Quick Recall',
    bullets: [
      'Focus on words marked "Hot" in SSC CGL 2022-2024 papers',
      'Synonyms & Antonyms are the most frequently asked vocab questions',
      'Idioms repeat across shifts -- master the top 50',
      'One-word substitutions: learn Latin/Greek roots for quick recall',
      'Spelling correction: watch for double letters and silent letters',
      'Fill in the blanks: focus on prepositions and phrasal verbs',
      'Error spotting: subject-verb agreement is the #1 tested rule',
      'Sentence improvement: tense consistency is key',
    ],
  },
}

/* ── Prob badge helpers ───────────────────────────────────────────────── */

const PROB_DOT: Record<string, string> = {
  Hot: 'bg-red-500', High: 'bg-orange-400', Confirmed: 'bg-green-500', Recurring: 'bg-blue-400',
}
const PROB_TEXT: Record<string, string> = {
  Hot: 'text-red-700', High: 'text-orange-700', Confirmed: 'text-green-700', Recurring: 'text-blue-700',
}

/* ── Main component ───────────────────────────────────────────────────── */

export default function FastRevision() {
  const [activeTab, setActiveTab] = useState<TabKey>('idioms')

  const tabData = useMemo(() => {
    const idioms = englishQuestions.filter(q => q.qtype === 'idioms-phrases')
    const oneWord = englishQuestions.filter(q => q.qtype === 'one-word-substitution')
    const spelling = englishQuestions.filter(q => q.qtype === 'spelling-correction')
    const voiceSpeech = englishQuestions.filter(q => q.qtype === 'active-passive' || q.qtype === 'direct-indirect')
    const pyqHot = vocabData.filter(v => v.examProb === 'Hot')

    return {
      'idioms': idioms,
      'one-word': oneWord,
      'confused': CONFUSED_WORDS,
      'grammar': grammarRules,
      'spelling': spelling,
      'voice-speech': voiceSpeech,
      'pyq-hot': pyqHot,
    }
  }, [])

  const tabCounts: Record<TabKey, number> = useMemo(() => ({
    'idioms': (tabData['idioms'] as EnglishQuestion[]).length,
    'one-word': (tabData['one-word'] as EnglishQuestion[]).length,
    'confused': CONFUSED_WORDS.length,
    'grammar': (tabData['grammar'] as { category: string; rule: string; example: string; tip: string }[]).length,
    'spelling': (tabData['spelling'] as EnglishQuestion[]).length,
    'voice-speech': (tabData['voice-speech'] as EnglishQuestion[]).length,
    'pyq-hot': (tabData['pyq-hot'] as VocabEntry[]).length,
  }), [tabData])

  const cfg = TABS.find(t => t.key === activeTab)!
  const sheet = CHEATSHEET[activeTab]

  return (
    <section id="eng-fast" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-rose-700 uppercase mb-1">Section 02 -- Fast Revision</p>
          <h2 className="text-3xl font-extrabold text-brand-900">English Quick Recall</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            One tab per category. Cheat sheets on the left, entries on the right.
            Built for <strong>last-hour revision</strong> before exam.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                activeTab === t.key
                  ? `${t.accent} ring-2 ${t.ring} shadow-sm`
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
              }`}>
              <span>{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.label.split(' ')[0]}</span>
              <span className="ml-1 opacity-60">({tabCounts[t.key]})</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-slide">

          {/* Cheat sheet */}
          <div className="lg:col-span-2 space-y-4">
            <div className={`rounded-2xl border p-5 ${cfg.color}`}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{cfg.icon}</span>
                <h3 className="text-base font-extrabold text-slate-800">{sheet.title}</h3>
              </div>
              <ul className="space-y-2">
                {sheet.bullets.map((b, i) => {
                  const [before, ...rest] = b.split('=')
                  const after = rest.join('=')
                  return (
                    <li key={i} className="flex gap-2 text-sm leading-snug">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-[10px] font-extrabold text-rose-700 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-slate-700">
                        {after ? (<><strong className="text-slate-900">{before.trim()}</strong><span className="text-slate-500"> = </span><span>{after.trim()}</span></>) : (<span>{b}</span>)}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Prob distribution for applicable tabs */}
            {activeTab === 'pyq-hot' && (
              <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 flex gap-3 flex-wrap">
                {(['Hot','High','Confirmed','Recurring'] as const).map(p => {
                  const items = tabData[activeTab] as VocabEntry[]
                  const n = items.filter(e => e.examProb === p).length
                  if (!n) return null
                  return (
                    <span key={p} className={`text-xs font-bold flex items-center gap-1 ${PROB_TEXT[p]}`}>
                      <span className={`w-2 h-2 rounded-full inline-block ${PROB_DOT[p]}`}></span>
                      {p}: {n}
                    </span>
                  )
                })}
              </div>
            )}
          </div>

          {/* Entries */}
          <div className="lg:col-span-3 space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {activeTab === 'idioms' && (tabData['idioms'] as EnglishQuestion[]).map(e => (
              <QuestionCard key={e.id} entry={e} accentClass={cfg.accent} />
            ))}

            {activeTab === 'one-word' && (tabData['one-word'] as EnglishQuestion[]).map(e => (
              <QuestionCard key={e.id} entry={e} accentClass={cfg.accent} />
            ))}

            {activeTab === 'confused' && CONFUSED_WORDS.map((cw, i) => (
              <ConfusedCard key={i} pair={cw} accentClass={cfg.accent} />
            ))}

            {activeTab === 'grammar' && (tabData['grammar'] as { category: string; rule: string; example: string; tip: string }[]).map((r, i) => (
              <GrammarCard key={i} rule={r} accentClass={cfg.accent} />
            ))}

            {activeTab === 'spelling' && (tabData['spelling'] as EnglishQuestion[]).map(e => (
              <QuestionCard key={e.id} entry={e} accentClass={cfg.accent} />
            ))}

            {activeTab === 'voice-speech' && (tabData['voice-speech'] as EnglishQuestion[]).map(e => (
              <QuestionCard key={e.id} entry={e} accentClass={cfg.accent} />
            ))}

            {activeTab === 'pyq-hot' && (tabData['pyq-hot'] as VocabEntry[]).map(e => (
              <IdiomCard key={e.id} entry={e} accentClass={cfg.accent} />
            ))}

            {tabCounts[activeTab] === 0 && (
              <p className="text-center py-10 text-slate-400 text-sm">No entries for this category.</p>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

/* ── Entry cards ──────────────────────────────────────────────────────── */

function IdiomCard({ entry: e, accentClass }: { entry: VocabEntry; accentClass: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={() => setOpen(o => !o)}>
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="shrink-0 mt-0.5">
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${accentClass}`}>
            {e.pos}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">{e.word}</p>
          <p className="text-xs text-slate-500 mt-0.5">{e.meaning}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`w-2 h-2 rounded-full ${PROB_DOT[e.examProb]}`} title={e.examProb}></span>
          <span className="text-slate-300 text-sm">{open ? '\u25B2' : '\u25BC'}</span>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-100 px-4 py-3 bg-slate-50 animate-fade-slide">
          <div className="space-y-1.5 mb-2">
            {e.examples.map((ex, i) => (
              <p key={i} className="text-xs text-slate-600 italic">&ldquo;{ex}&rdquo;</p>
            ))}
          </div>
          {e.synonyms.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1">
              <span className="text-[10px] text-slate-400 font-bold">Synonyms:</span>
              {e.synonyms.map((s, i) => (
                <span key={i} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-100 text-green-700">{s}</span>
              ))}
            </div>
          )}
          {e.mnemonic && <p className="font-mnemonic text-xs text-amber-700 mt-1 italic">💡 {e.mnemonic}</p>}
          <p className="text-xs text-slate-400 mt-2">
            <span className={`font-bold ${PROB_TEXT[e.examProb]}`}>{e.examProb}</span>
          </p>
        </div>
      )}
    </div>
  )
}

function QuestionCard({ entry: e, accentClass }: { entry: EnglishQuestion; accentClass: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={() => setOpen(o => !o)}>
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="shrink-0 mt-0.5">
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${accentClass}`}>
            {e.qtype}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">{e.question}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`w-2 h-2 rounded-full ${PROB_DOT[e.examProb]}`} title={e.examProb}></span>
          <span className="text-slate-300 text-sm">{open ? '\u25B2' : '\u25BC'}</span>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-100 px-4 py-3 bg-slate-50 animate-fade-slide">
          <p className="text-sm font-bold text-slate-800 mb-2">{e.answer}</p>
          <p className="text-xs text-slate-600 leading-relaxed">{e.explanation}</p>
          {e.ruleNote && <p className="text-xs text-indigo-600 mt-1 italic">📏 Rule: {e.ruleNote}</p>}
          <p className="text-xs text-slate-400 mt-2">
            <span className={`font-bold ${PROB_TEXT[e.examProb]}`}>{e.examProb}</span>
            <span className="ml-2 text-slate-300">| {e.level} | {e.tier}</span>
          </p>
        </div>
      )}
    </div>
  )
}

function ConfusedCard({ pair, accentClass }: { pair: { pair: [string, string]; tip: string }; accentClass: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={() => setOpen(o => !o)}>
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="shrink-0 mt-0.5">
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${accentClass}`}>
            pair
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">
            {pair.pair[0]} <span className="text-slate-400">vs</span> {pair.pair[1]}
          </p>
        </div>
        <span className="text-slate-300 text-sm shrink-0">{open ? '\u25B2' : '\u25BC'}</span>
      </div>
      {open && (
        <div className="border-t border-slate-100 px-4 py-3 bg-slate-50 animate-fade-slide">
          <p className="text-sm text-slate-700 leading-relaxed">{pair.tip}</p>
        </div>
      )}
    </div>
  )
}

function GrammarCard({ rule, accentClass }: { rule: { category: string; rule: string; example: string; tip: string }; accentClass: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={() => setOpen(o => !o)}>
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="shrink-0 mt-0.5">
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${accentClass}`}>
            {rule.category}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">{rule.rule}</p>
        </div>
        <span className="text-slate-300 text-sm shrink-0">{open ? '\u25B2' : '\u25BC'}</span>
      </div>
      {open && (
        <div className="border-t border-slate-100 px-4 py-3 bg-slate-50 animate-fade-slide">
          <p className="text-xs text-slate-600 leading-relaxed mb-1"><strong>Example:</strong> {rule.example}</p>
          <p className="text-xs text-indigo-600 italic">💡 {rule.tip}</p>
        </div>
      )}
    </div>
  )
}
