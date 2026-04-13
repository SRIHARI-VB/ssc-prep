import { useState } from 'react'
import { booksData, type Category, type BookEntry } from '../data'

type BookCategory = Category

const CATEGORIES: {
  key: BookCategory; icon: string; color: string; accent: string; ring: string
}[] = [
  { key: 'Ancient/Medieval',  icon: '\u{1F4DC}', color: 'bg-amber-50 border-amber-200',    accent: 'text-amber-700 bg-amber-100 border-amber-200',     ring: 'ring-amber-400' },
  { key: 'Freedom Struggle',  icon: '\u270A',     color: 'bg-red-50 border-red-200',        accent: 'text-red-700 bg-red-100 border-red-200',           ring: 'ring-red-400' },
  { key: 'Literary Award',    icon: '\u{1F3C6}',  color: 'bg-violet-50 border-violet-200',  accent: 'text-violet-700 bg-violet-100 border-violet-200',  ring: 'ring-violet-400' },
  { key: 'Current Affairs',   icon: '\u26A1',      color: 'bg-cyan-50 border-cyan-200',      accent: 'text-cyan-700 bg-cyan-100 border-cyan-200',        ring: 'ring-cyan-400' },
  { key: 'Sports',            icon: '\u{1F3C5}',  color: 'bg-emerald-50 border-emerald-200',accent: 'text-emerald-700 bg-emerald-100 border-emerald-200',ring: 'ring-emerald-400' },
  { key: 'PYQ',               icon: '\u{1F4DD}',  color: 'bg-orange-50 border-orange-200',  accent: 'text-orange-700 bg-orange-100 border-orange-200',  ring: 'ring-orange-400' },
]

const PROB_DOT: Record<string, string> = {
  Hot: 'bg-red-500', High: 'bg-orange-400', Confirmed: 'bg-green-500', Recurring: 'bg-blue-400', Medium: 'bg-slate-400',
}
const PROB_TEXT: Record<string, string> = {
  Hot: 'text-red-700', High: 'text-orange-700', Confirmed: 'text-green-700', Recurring: 'text-blue-700', Medium: 'text-slate-600',
}

const CHEATSHEET: Record<BookCategory, { title: string; bullets: string[] }> = {
  'Ancient/Medieval': {
    title: 'Ancient/Medieval -- Quick Recall',
    bullets: [
      'Arthashastra = Kautilya (Chanakya) | ~300 BCE | Mauryan statecraft, economics & military',
      'Indica = Megasthenes | ~300 BCE | Greek ambassador to Chandragupta Maurya',
      'Ashtadhyayi = Panini | ~4th C BCE | 3959 rules | First formal grammar',
      'Tolkappiyam = Tolkappiyar | ~3rd C BCE | Oldest Tamil grammar',
      'Silappadikaram = Ilango Adigal | ~2nd C CE | Kannagi burns Madurai',
      'Rajatarangini = Kalhana | 1148 CE | River of Kings | Kashmir history',
      'Harsha Charita = Banabhatta | 7th C CE | Biography of King Harsha',
      'Kitab-ul-Hind = Al-Biruni | 11th C CE | Account of medieval India (Al-Biruni repeated in PYQs)',
    ],
  },
  'Freedom Struggle': {
    title: 'Freedom Struggle -- Key Books',
    bullets: [
      'Hind Swaraj = Gandhi (1909) | Indian self-rule manifesto | Written on ship',
      'My Experiments with Truth = Gandhi (1927) | Autobiography | Gujarati origin',
      'Discovery of India = Nehru (1946) | Ahmednagar Fort | Civilizational history',
      'Poverty and Un-British Rule = Dadabhai Naoroji (1901) | Drain of Wealth theory',
      'Annihilation of Caste = B.R. Ambedkar (1936) | Undelivered speech on caste',
      'Gitanjali = Rabindranath Tagore (1912) | Nobel Prize 1913 | Song Offerings',
      'Neel Darpan = Dinabandhu Mitra (1860) | Indigo planter exploitation in Bengal',
      'Anandamath = Bankim Chandra (1882) | Vande Mataram origin | Sanyasi rebellion',
    ],
  },
  'Literary Award': {
    title: 'Literary Awards -- Recent Winners',
    bullets: [
      'Nobel Literature 2024 = Han Kang (South Korea) | First Korean laureate',
      'Nobel Literature 2023 = Jon Fosse (Norway) | Plays & prose',
      'Booker Prize 2024 = Samantha Harvey (Orbital) | Space station novel',
      'Booker Prize 2023 = Paul Lynch (Prophet Song) | Ireland dystopia',
      'Jnanpith 2023 = Gulzar (Urdu) | 58th award | Poet + filmmaker',
      'Sahitya Akademi 2024 Hindi = Sanjeev (Mujhe Pehchano)',
      'Pulitzer Fiction 2025 = Percival Everett (James) | Retelling Huck Finn',
      'International Booker 2022 = Geetanjali Shree (Tomb of Sand) | First Hindi winner',
    ],
  },
  'Current Affairs': {
    title: 'Current Affairs -- Bestsellers 2024-26',
    bullets: [
      'Why Bharat Matters = S. Jaishankar (2024) | Indian foreign policy vision',
      'Smoke and Ashes = Amitav Ghosh (2023) | Opium trade & colonialism',
      'India That Is Bharat = J. Sai Deepak (2024) | Decoloniality trilogy',
      'Not Just Cricket = Shashi Tharoor (2024) | Cricket as cultural-political lens',
      'Covenant of Water = Abraham Verghese (2023) | Kerala multi-generational saga',
      'Wings of Fire = APJ Abdul Kalam (1999) | Autobiography with Arun Tiwari | Missile Man',
      'The India Way = S. Jaishankar (2020) | India in global geopolitics',
      'An Era of Darkness = Shashi Tharoor (2016) | British exploitation of India',
    ],
  },
  'Sports': {
    title: 'Sports Autobiographies -- Key Books',
    bullets: [
      'Playing It My Way = Sachin Tendulkar | "God of Cricket" | 100 international centuries',
      'Unbreakable = Mary Kom | Six-time World Boxing Champion | Manipur',
      'A Shot at History = Abhinav Bindra | First individual Olympic Gold (2008 Shooting)',
      'A Century Is Not Enough = Sourav Ganguly | BCCI President | Captain courageous',
      'The Test of My Life = Yuvraj Singh | Cancer battle + cricket comeback',
      'Crossing the Line = Neeraj Chopra | Olympic Gold javelin Tokyo 2021',
      'No Spin = Shane Warne | Australian leg-spin legend',
      'Playing to Win = Saina Nehwal | Badminton champion autobiography',
    ],
  },
  'PYQ': {
    title: 'PYQ -- Frequently Asked',
    bullets: [
      'Arthashastra = Kautilya | Most repeated ancient text question',
      'Kitab-ul-Hind = Al-Biruni | Repeated 2021 & 2023',
      'Harsha Charita = Banabhatta | SSC CGL Dec 2022',
      'Rihla = Ibn Battuta | Travel account | SSC CGL Sep 2024',
      'Kamayani = Jaishankar Prasad | Chhayavaad Hindi epic | SSC CGL Apr 2022',
      'Mricchakatika = Sudraka | "Little Clay Cart" | Sanskrit drama | Jul 2023',
      'Neel Darpan = Dinabandhu Mitra | Indigo exploitation play | Sep 2024',
      'Playing It My Way = Sachin Tendulkar | Sports auto | Dec 2022',
    ],
  },
}

export default function FastRevision() {
  const [activeTab, setActiveTab] = useState<BookCategory>('Ancient/Medieval')
  const studyEntries = booksData.filter(e => !e.questionType)

  const cfg = CATEGORIES.find(c => c.key === activeTab)!
  const entries = studyEntries.filter(e => e.category === activeTab)
  const sheet = CHEATSHEET[activeTab]

  return (
    <section id="books-fast" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-indigo-700 uppercase mb-1">Section 02 -- Fast Revision</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Category-wise Quick Recall</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            One tab per category. Cheat sheets on the left, entries with mnemonics on the right.
            Built for <strong>last-hour revision</strong> before exam.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => {
            const catCount = studyEntries.filter(e => e.category === c.key).length
            return (
              <button
                key={c.key}
                onClick={() => setActiveTab(c.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                  activeTab === c.key
                    ? `${c.accent} ring-2 ${c.ring} shadow-sm`
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}>
                <span>{c.icon}</span>
                <span className="hidden sm:inline">{c.key}</span>
                <span className="sm:hidden">{c.key.split(' ')[0]}</span>
                <span className="ml-1 opacity-60">({catCount})</span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-slide">

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
                      <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-extrabold text-indigo-700 mt-0.5">
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

            <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 flex gap-3 flex-wrap">
              {(['Hot','High','Confirmed','Recurring'] as const).map(p => {
                const n = entries.filter(e => e.examProb === p).length
                if (!n) return null
                return (
                  <span key={p} className={`text-xs font-bold flex items-center gap-1 ${PROB_TEXT[p]}`}>
                    <span className={`w-2 h-2 rounded-full inline-block ${PROB_DOT[p]}`}></span>
                    {p}: {n}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {entries.map(e => (
              <EntryCard key={e.id} entry={e} accentClass={cfg.accent} />
            ))}
            {entries.length === 0 && (
              <p className="text-center py-10 text-slate-400 text-sm">No entries for this category.</p>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

function EntryCard({ entry: e, accentClass }: { entry: BookEntry; accentClass: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={() => setOpen(o => !o)}>
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="shrink-0 mt-0.5">
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${accentClass}`}>
            {e.category}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">
            {e.title} &rarr; {e.author} {e.year ? `(${e.year})` : ''}
          </p>
          <p className="font-mnemonic text-xs text-indigo-700 mt-1 italic leading-tight">{e.mnemonic}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`w-2 h-2 rounded-full ${PROB_DOT[e.examProb]}`} title={e.examProb}></span>
          <span className="text-slate-300 text-sm">{open ? '\u25B2' : '\u25BC'}</span>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 px-4 py-3 bg-slate-50 animate-fade-slide">
          <p className="text-sm font-bold text-slate-800 mb-1">{e.author} | {e.award}</p>
          <p className="text-xs text-slate-600 leading-relaxed">{e.theme}</p>
          {e.context && (
            <p className="text-xs text-slate-400 mt-2">{e.context}
              <span className={`ml-2 font-bold ${PROB_TEXT[e.examProb]}`}> - {e.examProb}</span>
            </p>
          )}
        </div>
      )}
    </div>
  )
}
