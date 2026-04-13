import { useState } from 'react'
import { danceData, type DanceCategory, type DanceEntry } from '../data'

const CATEGORIES: {
  key: DanceCategory
  icon: string
  color: string
  accent: string
  ring: string
}[] = [
  { key: 'Bharatanatyam',        icon: '💃', color: 'bg-pink-50 border-pink-200',      accent: 'text-pink-700 bg-pink-100 border-pink-200',         ring: 'ring-pink-400' },
  { key: 'Kathak',               icon: '🩰', color: 'bg-violet-50 border-violet-200',  accent: 'text-violet-700 bg-violet-100 border-violet-200',   ring: 'ring-violet-400' },
  { key: 'Kathakali',            icon: '🎭', color: 'bg-green-50 border-green-200',     accent: 'text-green-700 bg-green-100 border-green-200',      ring: 'ring-green-400' },
  { key: 'Odissi',               icon: '🏛️', color: 'bg-blue-50 border-blue-200',       accent: 'text-blue-700 bg-blue-100 border-blue-200',         ring: 'ring-blue-400' },
  { key: 'Kuchipudi',            icon: '🪔', color: 'bg-orange-50 border-orange-200',   accent: 'text-orange-700 bg-orange-100 border-orange-200',   ring: 'ring-orange-400' },
  { key: 'Manipuri',             icon: '🌸', color: 'bg-cyan-50 border-cyan-200',       accent: 'text-cyan-700 bg-cyan-100 border-cyan-200',         ring: 'ring-cyan-400' },
  { key: 'Mohiniyattam',         icon: '🦢', color: 'bg-rose-50 border-rose-200',       accent: 'text-rose-700 bg-rose-100 border-rose-200',         ring: 'ring-rose-400' },
  { key: 'Sattriya',             icon: '🙏', color: 'bg-lime-50 border-lime-200',       accent: 'text-lime-700 bg-lime-100 border-lime-200',         ring: 'ring-lime-400' },
  { key: 'Folk Dances - North',  icon: '🥁', color: 'bg-yellow-50 border-yellow-200',   accent: 'text-yellow-700 bg-yellow-100 border-yellow-200',   ring: 'ring-yellow-400' },
  { key: 'Folk Dances - South',  icon: '🌴', color: 'bg-red-50 border-red-200',         accent: 'text-red-700 bg-red-100 border-red-200',            ring: 'ring-red-400' },
  { key: 'Folk Dances - East',   icon: '🎋', color: 'bg-indigo-50 border-indigo-200',   accent: 'text-indigo-700 bg-indigo-100 border-indigo-200',   ring: 'ring-indigo-400' },
  { key: 'Folk Dances - West',   icon: '🪘', color: 'bg-sky-50 border-sky-200',         accent: 'text-sky-700 bg-sky-100 border-sky-200',            ring: 'ring-sky-400' },
  { key: 'Tribal Dances',        icon: '🏹', color: 'bg-purple-50 border-purple-200',   accent: 'text-purple-700 bg-purple-100 border-purple-200',   ring: 'ring-purple-400' },
  { key: 'UNESCO & Awards',      icon: '🏆', color: 'bg-fuchsia-50 border-fuchsia-200', accent: 'text-fuchsia-700 bg-fuchsia-100 border-fuchsia-200', ring: 'ring-fuchsia-400' },
]

const PROB_DOT: Record<string, string> = {
  Hot: 'bg-red-500', High: 'bg-orange-400', Confirmed: 'bg-green-500', Recurring: 'bg-blue-400',
}
const PROB_TEXT: Record<string, string> = {
  Hot: 'text-red-700', High: 'text-orange-700', Confirmed: 'text-green-700', Recurring: 'text-blue-700',
}

const CHEATSHEET: Record<DanceCategory, { title: string; bullets: string[] }> = {
  'Bharatanatyam': {
    title: 'Bharatanatyam -- Quick Recall',
    bullets: [
      'Origin = Tamil Nadu temples | Oldest classical | Natyashastra by Bharata Muni',
      'Former name = Sadir / Dasiattam | BHA-RA-TA-NATYAM = Bhava+Raga+Tala+Dance',
      'Revival = Rukmini Devi Arundale | Kalakshetra (1936, Chennai) | Padma Bhushan',
      'Sequence = Alarippu - Jatiswaram - Shabdam - Varnam - Padam - Tillana',
      'Elements = Nritta (pure) + Nritya (expression) + Natya (drama)',
      '28 Asamyuta + 24 Samyuta Hastas (hand gestures/Mudras)',
      'Balasaraswati = Thanjavur Bani | Traditional Devadasi style',
      'Key: Margam (repertoire), Varnam (centerpiece), Tillana (finale)',
    ],
  },
  'Kathak': {
    title: 'Kathak -- Must Know',
    bullets: [
      'Origin = North India / UP | Katha = Story | Temple storytelling to court dance',
      'Gharanas = Lucknow (expression) + Jaipur (footwork) + Banaras (oldest) + Raigarh',
      'Birju Maharaj = Lucknow Gharana | Padma Vibhushan | Died Jan 2022',
      'Key = Tatkar (footwork) + Tukda + Toda + Chakkar (spins) + Ghungroo',
      'ONLY classical dance with Hindu + Islamic (Mughal) influence',
      'Sitara Devi = Nritya Samragini | Lachhu Maharaj, Acchan Maharaj',
      'Wajid Ali Shah of Lucknow = major patron',
    ],
  },
  'Kathakali': {
    title: 'Kathakali -- Key Facts',
    bullets: [
      'Origin = Kerala | 17th century | Dance-drama | Traditionally all-male',
      'Makeup = Pachcha (green/hero) + Kathi (knife/anti-hero) + Thadi (beard/demon) + Kari (black/evil) + Minukku (gentle)',
      'Kerala Kalamandalam = Vallathol Narayana Menon (1930) | Cheruthuruthy, Thrissur',
      'Instruments = Chenda + Maddalam + Ilathalam + Chengila',
      'Stories from Ramayana, Mahabharata | Kalamandalam Gopi = stalwart',
      'Sopana Sangeetham = temple singing style',
    ],
  },
  'Odissi': {
    title: 'Odissi -- Exam Essentials',
    bullets: [
      'Origin = Odisha temples | Konark Sun Temple + Jagannath Puri',
      'Tribhangi = 3 bends (head + torso + knees) | S-shaped posture | Unique to Odissi',
      'Chauka = square stance | Pallavi (pure dance) + Abhinaya (expression)',
      'Guru Kelucharan Mohapatra = Father of modern Odissi | Padma Vibhushan',
      'Sonal Mansingh (Padma Vibhushan) + Sanjukta Panigrahi',
      'Udayagiri caves = 2nd century BCE evidence (oldest)',
    ],
  },
  'Kuchipudi': {
    title: 'Kuchipudi -- Key Points',
    bullets: [
      'Origin = Kuchipudi village, Krishna district, Andhra Pradesh',
      'Siddhendra Yogi = founder (17th c.) | Parijatapaharanam = first dance-drama',
      'Tarangam = Dancing on brass plate edges + pot on head | Unique to Kuchipudi',
      'Vempati Chinna Satyam = Solo form pioneer | Padma Bhushan',
      'Raja-Radha Reddy | Yamini Krishnamurthy (Padma Vibhushan)',
      'Originally male Brahmin performers | Now male and female',
    ],
  },
  'Manipuri': {
    title: 'Manipuri -- Quick Facts',
    bullets: [
      'Origin = Manipur | Ras Leela = Radha-Krishna love | Gentle, graceful',
      'Tagore introduced Manipuri to wider world (visited 1919, Shantiniketan)',
      '5 Ras types = Maha, Vasanta, Kunja, Nitya, Diva',
      'Instruments = Pung (Mridanga) + Kartal + Pena (bowed string)',
      'Kumil/Potloi = barrel-shaped skirt (unique costume)',
      'Guru Bipin Singh, Jhaveri Sisters = key exponents',
    ],
  },
  'Mohiniyattam': {
    title: 'Mohiniyattam -- Essentials',
    bullets: [
      'Origin = Kerala | Dance of the Enchantress (Mohini, Vishnu avatar)',
      'White kasavu saree + gold border | Female solo dance',
      'Lasya = graceful feminine aspect | Swaying like coconut palms',
      'Swati Tirunal (Travancore ruler) = patron and reformer',
      'Sopana Sangeetham music | Kerala Kalamandalam training',
      'Sunanda Nair, Kalyanikutty Amma = modern exponents',
    ],
  },
  'Sattriya': {
    title: 'Sattriya -- Must Remember',
    bullets: [
      'Origin = Assam | Srimanta Sankaradeva (15th century Bhakti saint)',
      'Recognized as 8th classical dance in 2000 (LATEST addition)',
      'Performed in Satras = Vaishnavite monasteries | Majuli island',
      'Themes = Krishna Leela | Ankia Naat (one-act plays) | Borgeet (songs)',
      'Both male and female traditions exist',
      'Madhavadeva = Sankaradeva\'s disciple, continued tradition',
    ],
  },
  'Folk Dances - North': {
    title: 'North India Folk -- State-Dance Map',
    bullets: [
      'Punjab = Bhangra (male, Baisakhi) + Giddha (female, Boliyan)',
      'Rajasthan = Ghoomar + Kalbelia (UNESCO 2010) + Chari + Terah Taali + Kathputli',
      'Haryana = Saang/Swang + Daff + Dhamal + Phag + Loor',
      'Himachal Pradesh = Nati (Guinness record largest folk dance, Kullu)',
      'Uttarakhand = Langvir Nritya (acrobatic) + Barada Nati + Chholiya (sword)',
      'J&K = Rouf (female spring) + Dumhal (Wattal tribe) + Hafiza',
      'UP = Raslila (Krishna, Mathura) + Nautanki + Charkula (lamp)',
      'Rajasthan = Kathputli (string puppets, Bhat community)',
    ],
  },
  'Folk Dances - South': {
    title: 'South India Folk -- Key Dances',
    bullets: [
      'TN = Kummi (clapping) + Kolattam (sticks) + Kavadi + Mayil Attam (peacock)',
      'Kerala = Thiruvathira + Ottamthullal + Koodiyattam (UNESCO 2001) + Theyyam (ritual, N. Kerala)',
      'Karnataka = Yakshagana (dance-drama, coast) + Dollu Kunitha (drum, Kuruba) + Bayalata',
      'Telangana = Perini Sivatandavam (warrior, Shiva) + Bathukamma (floral) + Lambadi (Banjara)',
      'AP = Dappu (drum) + Kolattam + Veeranatyam + Dhimsa (tribal, Araku)',
    ],
  },
  'Folk Dances - East': {
    title: 'East & NE India Folk -- Critical for SSC',
    bullets: [
      'Assam = Bihu (3 types: Bohag spring, Kati autumn, Magh winter) + Bagurumba (Bodo, butterfly)',
      'WB = Chhau (Purulia, masks) + Jatra (theatre) + Baul (mystic)',
      'Odisha = Gotipua (boys as girls, Odissi precursor) + Chhau (Mayurbhanj, no masks)',
      'Bihar = Jat-Jatin (couple) + Bidesia (migration) + Jhijhiya (rain)',
      'Jharkhand = Chhau (Seraikela, masks) + Mundari + Santhali',
      'Mizoram = Cheraw (Bamboo Dance) | Sikkim = Cham (Buddhist mask)',
      'Tripura = Hojagiri (Reang, balance) | Meghalaya = Nongkrem (Khasi) + Wangala (Garo)',
      'Nagaland = Chang Lo + War Dance | Arunachal = Wancho + Ponung + Bardo Chham',
    ],
  },
  'Folk Dances - West': {
    title: 'West India Folk -- State-Dance',
    bullets: [
      'Gujarat = Garba (circular, Navratri) + Dandiya Raas (sticks) + Bhavai (pots)',
      'Maharashtra = Lavani (Dholki) + Tamasha (theatre) + Powada (ballad) + Dindi',
      'Goa = Fugdi (women, circular) + Dhalo + Dekhni + Mando (Portuguese)',
      'Chhattisgarh = Panthi (Satnami) + Raut Nacha (herders) + Sua (parrot)',
      'MP = Matki (pot on head) + Badhai + Karma (tribal) + Jawara (harvest)',
    ],
  },
  'Tribal Dances': {
    title: 'Tribal Dances -- Key Facts',
    bullets: [
      'Santhali = Jharkhand + WB | Santhal tribe | Sohrai, Karam, Baha festivals',
      'Mundari = Munda tribe, Jharkhand | Jadeera, Jhumar styles',
      'Bison Horn (Maria) = Chhattisgarh (Bastar) | Maria Gonds | Horn headgear',
      'Danda Ras = Gujarat tribals | Stick dance | Panchmahals area',
    ],
  },
  'UNESCO & Awards': {
    title: 'UNESCO & Awards -- Timeline',
    bullets: [
      'Koodiyattam = 2001 (Kerala, earliest Indian) | Oldest surviving theatre',
      'Ramlila = 2008 (UP) | Chhau = 2010 (WB+JH+OD) | Kalbelia = 2010 (Rajasthan)',
      'Mudiyettu = 2010 (Kerala, Bhadrakali vs Darika)',
      'Sankirtana = 2013 (Manipur, Vaishnavite singing-dancing)',
      'Sangeet Natak Akademi = 1952 | Recognizes 8 classical dances',
      'No Bharat Ratna for dance yet | Rukmini Devi declined nomination',
      'Padma Vibhushan: Birju Maharaj, Sonal Mansingh, Kelucharan Mohapatra, Yamini Krishnamurthy',
    ],
  },
}

export default function FastRevision() {
  const [activeTab, setActiveTab] = useState<DanceCategory>('Bharatanatyam')

  const cfg = CATEGORIES.find(c => c.key === activeTab)!
  const entries = danceData.filter(e => e.category === activeTab)
  const sheet = CHEATSHEET[activeTab]

  return (
    <section id="dn-fast" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-fuchsia-600 uppercase mb-1">Section 02 -- Fast Revision</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Category-wise Quick Recall</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            One tab per category. Cheat sheets on the left, entries with shortcuts on the right.
            Built for <strong>last-hour revision</strong> before exam.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => {
            const catCount = danceData.filter(e => e.category === c.key).length
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
                      <span className="shrink-0 w-5 h-5 rounded-full bg-fuchsia-100 flex items-center justify-center text-[10px] font-extrabold text-fuchsia-700 mt-0.5">
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

function EntryCard({ entry: e, accentClass }: { entry: DanceEntry; accentClass: string }) {
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
          <p className="font-mnemonic text-xs text-fuchsia-700 mt-1 italic leading-tight">
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
