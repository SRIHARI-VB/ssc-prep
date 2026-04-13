import { useState } from 'react'
import { miData, type MICategory, type MIEntry } from '../data'

const CATEGORIES: {
  key: MICategory
  icon: string
  color: string
  accent: string
  ring: string
}[] = [
  { key: 'String Instruments (Tata)',           icon: '\uD83C\uDFB8', color: 'bg-rose-50 border-rose-200',    accent: 'text-rose-700 bg-rose-100 border-rose-200',       ring: 'ring-rose-400' },
  { key: 'Wind Instruments (Sushira)',          icon: '\uD83C\uDFB5', color: 'bg-orange-50 border-orange-200', accent: 'text-orange-700 bg-orange-100 border-orange-200',  ring: 'ring-orange-400' },
  { key: 'Percussion - Membranous (Avanaddha)', icon: '\uD83E\uDD41', color: 'bg-violet-50 border-violet-200', accent: 'text-violet-700 bg-violet-100 border-violet-200',  ring: 'ring-violet-400' },
  { key: 'Percussion - Solid (Ghana)',          icon: '\uD83D\uDD14', color: 'bg-green-50 border-green-200',   accent: 'text-green-700 bg-green-100 border-green-200',    ring: 'ring-green-400' },
  { key: 'Hindustani Classical',                icon: '\uD83C\uDFB6', color: 'bg-blue-50 border-blue-200',     accent: 'text-blue-700 bg-blue-100 border-blue-200',       ring: 'ring-blue-400' },
  { key: 'Carnatic Classical',                  icon: '\uD83C\uDFB9', color: 'bg-pink-50 border-pink-200',     accent: 'text-pink-700 bg-pink-100 border-pink-200',       ring: 'ring-pink-400' },
  { key: 'Famous Musicians & Awards',           icon: '\uD83C\uDFC6', color: 'bg-yellow-50 border-yellow-200', accent: 'text-yellow-700 bg-yellow-100 border-yellow-200',  ring: 'ring-yellow-400' },
  { key: 'Current Affairs & Awards',            icon: '\uD83D\uDCF0', color: 'bg-red-50 border-red-200',       accent: 'text-red-700 bg-red-100 border-red-200',          ring: 'ring-red-400' },
  { key: 'Folk Music',                         icon: '\uD83C\uDFB6', color: 'bg-purple-50 border-purple-200', accent: 'text-purple-700 bg-purple-100 border-purple-200',  ring: 'ring-purple-400' },
]

const PROB_DOT: Record<string, string> = {
  Hot: 'bg-red-500', High: 'bg-orange-400', Confirmed: 'bg-green-500', Recurring: 'bg-blue-400',
}
const PROB_TEXT: Record<string, string> = {
  Hot: 'text-red-700', High: 'text-orange-700', Confirmed: 'text-green-700', Recurring: 'text-blue-700',
}

const CHEATSHEET: Record<MICategory, { title: string; bullets: string[] }> = {
  'String Instruments (Tata)': {
    title: 'Tata Vadya (String) -- Quick Recall',
    bullets: [
      'Sitar = Ravi Shankar | Bharat Ratna 1999 | 18-21 strings | moveable frets | Amir Khusrau credited',
      'Sarod = Amjad Ali Khan | fretless | metal fingerboard | evolved from Afghan Rabab',
      'Saraswati Veena = Carnatic principal | Goddess Saraswati | South India | 4+3 strings',
      'Santoor = Shivkumar Sharma | Kashmir | hammered dulcimer | 100 strings | Sufiana Mausiqi',
      'Sarangi = Ram Narayan | Rajasthan | bowed | "closest to human voice" | 3+36 strings',
      'Ektara = Baul singers | Bengal | single string | drone | UNESCO heritage (Baul)',
      'Tanpura = Drone instrument | 4-5 strings | foundation of every raga performance',
      'Rudra Veena = Dhrupad instrument | oldest veena | Lord Shiva association',
    ],
  },
  'Wind Instruments (Sushira)': {
    title: 'Sushira Vadya (Wind) -- Must Know',
    bullets: [
      'Bansuri = Hariprasad Chaurasia | bamboo flute | Lord Krishna | Pannalal Ghosh pioneered',
      'Shehnai = Bismillah Khan | Bharat Ratna 2001 | double-reed | Red Fort 1947 | wedding instrument',
      'Nadaswaram = South Indian Shehnai | Carnatic | Tamil Nadu temples | loudest acoustic instrument',
      'Algoza = Twin flutes | Rajasthan/Punjab | one melody + one drone | circular breathing',
      'Been/Pungi = Snake charmer | gourd + bamboo | Sapera community | Rajasthan',
      'Sundari = Northeast folk flute | tribal music | bamboo-based',
    ],
  },
  'Percussion - Membranous (Avanaddha)': {
    title: 'Avanaddha Vadya -- Exam Essentials',
    bullets: [
      'Tabla = Zakir Hussain (3 Grammys 2024) | Dayan + Bayan pair | Amir Khusrau credited',
      'Mridangam = Carnatic percussion | barrel-shaped | jackwood | Palghat Mani Iyer',
      'Pakhawaj = Dhrupad accompaniment | oldest Hindustani percussion | barrel drum | deep bass',
      'Chenda = Kerala | Kathakali + temple festivals (Pooram) | cylindrical | played with sticks',
      'Damaru = Lord Shiva/Nataraja | hourglass | Maheshwara Sutras legend | cosmic dance',
      'Dhol = Punjab | Bhangra dance | double-headed | dagga + tilli sticks',
      'Khol = Bengal | Vaishnavite Kirtan | clay body | Chaitanya Mahaprabhu tradition',
      'Nagara/Naqqara = Kettledrums | royal courts | temple entrances | Rajasthan',
    ],
  },
  'Percussion - Solid (Ghana)': {
    title: 'Ghana Vadya (Solid) -- Key Facts',
    bullets: [
      'Ghatam = Clay pot | Carnatic | T.H. Vinayakram (Vikku) | Shakti band',
      'Jaltarang = Water-filled cups | different levels = different pitches | wooden sticks',
      'Kartal = Wooden clappers | Rajasthan | bhajan/kirtan | teak wood + brass jingles',
      'Chimta = Fire tongs with jingles | Punjab | Sufi/Bhangra music',
      'Manjira/Jhanj = Small cymbals | brass/bronze | bhajan/kirtan/aarti | most common',
      'Kanjira = Frame drum | Carnatic | lizard skin | South India',
      'Natyashastra 4 types = Tata (string) + Sushira (wind) + Avanaddha (membrane) + Ghana (solid)',
    ],
  },
  'Hindustani Classical': {
    title: 'Hindustani Classical -- Top PYQ Topics',
    bullets: [
      'Tansen = Akbar\'s Navaratna | greatest musician | Raga Deepak/Megh Malhar legends | Gwalior',
      'Amir Khusrau = Sitar + Tabla + Qawwali + Khayal inventor | "Parrot of India" | Nizamuddin Auliya disciple',
      'Gharana: Gwalior (oldest) > Agra > Jaipur-Atrauli > Kirana > Patiala > Lucknow > Mewati > Banaras',
      'Dhrupad = Oldest vocal form | Dagar family (19 gen) | Pakhawaj accompaniment | austere',
      'Khayal = Most popular | "imagination" | Bada + Chhota Khayal | Tabla accompaniment',
      'Raga = Min 5 notes (Audav) | 6 = Shadav | 7 = Sampurna | Sa mandatory | time-based',
      'Thumri = Lucknow | light classical | romantic | Girija Devi = "Thumri Queen"',
      'Natyashastra = Bharata Muni | ~200 BCE | performing arts bible | 4 instrument classes',
    ],
  },
  'Carnatic Classical': {
    title: 'Carnatic Classical -- Must Remember',
    bullets: [
      'Trinity = Tyagaraja + Dikshitar + Syama Sastri | all from Tiruvarur | 18th-19th century',
      'Purandara Dasa = "Father of Carnatic Music" | 1484-1564 | Karnataka | systematized teaching',
      '72 Melakarta Ragas = Parent ragas | Venkatamakhi | all 7 swaras in each',
      'M.S. Subbulakshmi = Bharat Ratna 1998 | FIRST musician to get BR | UN concert 1966',
      'Annamacharya = 32,000 kirtanas | Lord Venkateswara | Andhra Pradesh | 15th century',
      'Tyagaraja Aradhana = Thiruvaiyaru | January | Pancharatna Kritis | group singing',
      'Violin = Baluswami Dikshitar introduced to Carnatic | now standard melodic accompaniment',
    ],
  },
  'Famous Musicians & Awards': {
    title: 'Musicians & Awards -- Exam Favorites',
    bullets: [
      'Bharat Ratna order: M.S. Subbulakshmi (1998) > Ravi Shankar (1999) > Bismillah Khan + Lata (2001) > Bhimsen Joshi (2009)',
      'Lata Mangeshkar = "Nightingale of India" | Bharat Ratna 2001 | 36 languages | Dadasaheb Phalke 1989',
      'A.R. Rahman = 2 Oscars (Slumdog) | 2 Grammys | "Mozart of Madras" | Padma Bhushan 2010',
      'Zakir Hussain = 3 Grammys 2024 | Tabla | son of Alla Rakha | Padma Vibhushan 2023',
      'Bhimsen Joshi = Bharat Ratna 2009 | Kirana Gharana | Abhang | "Mile Sur Mera Tumhara"',
      'Begum Akhtar = "Queen of Ghazal" | Thumri + Dadra | Lucknow | Padma Bhushan 1975',
      'Pandit Jasraj = Mewati Gharana | Jasrangi style | Padma Vibhushan 2000 | asteroid named',
      'Asha Bhosle = Dadasaheb Phalke 2023 | Guinness record | sister of Lata',
    ],
  },
  'Current Affairs & Awards': {
    title: 'Current Affairs -- 2023-2026',
    bullets: [
      'Zakir Hussain 3 Grammys (2024): Best Global Music Album + Performance + Contemporary Instrumental',
      'Sankirtana (Manipur) = UNESCO ICH 2013 | Vaishnavite ritual | pung + cymbals',
      'Vedic Chanting = UNESCO ICH 2008 | oral tradition | oldest',
      'Sangeet Natak Akademi = 1952 | Music/Dance/Drama | Fellowship = highest honour',
      'National Film Awards = DFF | Best Music Direction + Best Playback Singer',
      'Padma Vibhushan 2023 musicians: Zakir Hussain | growing recognition of classical artists',
      'Asha Bhosle = Dadasaheb Phalke 2023 | 69th National Film Awards',
      'Ravi Shankar + George Harrison = popularized Sitar in West | Concert for Bangladesh 1971',
    ],
  },
  'Folk Music': {
    title: 'Folk Music -- Regional Traditions',
    bullets: [
      'Baul = Bengal | UNESCO 2005 | Ektara + Dotara | Lalon Fakir | Mystic wandering minstrels',
      'Lavani = Maharashtra | Dholki beat | Tamasha tradition | Nirguni (philosophical) + Shringari (romantic)',
      'Pandavani = Chhattisgarh | Mahabharata recitation | Teejan Bai (Padma Vibhushan) | Tambura + vocals',
      'Bihu Songs = Assam | Pepa + Dhol + Taal | Rongali/Bohag Bihu (April) | Harvest celebration',
      'Rajasthani Folk = Manganiar + Langa communities | desert music | Kamaicha + Morchang | Jaisalmer',
      'Bhajan/Kirtan = Devotional | Mirabai, Kabir, Tulsidas | pan-India | Harmonium + Tabla + Dholak',
      'Qawwali = Sufi devotional | Amir Khusrau started | Nusrat Fateh Ali Khan legend | Group performance',
    ],
  },
}

export default function FastRevision() {
  const [activeTab, setActiveTab] = useState<MICategory>('String Instruments (Tata)')

  const cfg = CATEGORIES.find(c => c.key === activeTab)!
  const entries = miData.filter(e => e.category === activeTab)
  const sheet = CHEATSHEET[activeTab]

  return (
    <section id="mi-fast" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-rose-600 uppercase mb-1">Section 02 -- Fast Revision</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Category-wise Quick Recall</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            One tab per category. Cheat sheets on the left, entries with shortcuts on the right.
            Built for <strong>last-hour revision</strong> before exam.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => {
            const catCount = miData.filter(e => e.category === c.key).length
            return (
              <button
                key={c.key}
                onClick={() => setActiveTab(c.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                  activeTab === c.key
                    ? `${c.accent} ring-2 ${c.ring} shadow-sm`
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{c.icon}</span>
                <span className="hidden sm:inline">{c.key}</span>
                <span className="sm:hidden">{c.key.split(' ')[0]}</span>
                <span className="ml-1 opacity-60">({catCount})</span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-slide">

          {/* Cheatsheet panel */}
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

            {/* Priority summary */}
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

          {/* Entry cards */}
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

function EntryCard({ entry: e, accentClass }: { entry: MIEntry; accentClass: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="shrink-0 mt-0.5">
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${accentClass}`}>
            {e.topic}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">{e.question}</p>
          <p className="font-mnemonic text-xs text-rose-700 mt-1 italic leading-tight">
            {e.shortcut}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`w-2 h-2 rounded-full ${PROB_DOT[e.examProb]}`} title={e.examProb}></span>
          <span className="text-slate-300 text-sm">{open ? '\u25B2' : '\u25BC'}</span>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 px-4 py-3 bg-slate-50 animate-fade-slide">
          <p className="text-sm font-bold text-slate-800 mb-2">
            {e.answer}
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">{e.detail}</p>
          <p className="text-xs text-slate-400 mt-2">{e.context}
            <span className={`ml-2 font-bold ${PROB_TEXT[e.examProb]}`}> - {e.examProb}</span>
          </p>
        </div>
      )}
    </div>
  )
}
