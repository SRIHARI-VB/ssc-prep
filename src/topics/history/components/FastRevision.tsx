import { useState } from 'react'
import { historyData, type HistoryCategory, type HistoryEntry } from '../data'

const CATEGORIES: {
  key: HistoryCategory; icon: string; color: string; accent: string; ring: string
}[] = [
  { key: 'Ancient India',     icon: '🏛️', color: 'bg-amber-50 border-amber-200',   accent: 'text-amber-700 bg-amber-100 border-amber-200',     ring: 'ring-amber-400' },
  { key: 'Medieval India',    icon: '🕌', color: 'bg-orange-50 border-orange-200', accent: 'text-orange-700 bg-orange-100 border-orange-200',   ring: 'ring-orange-400' },
  { key: 'Modern India',      icon: '🏗️', color: 'bg-blue-50 border-blue-200',     accent: 'text-blue-700 bg-blue-100 border-blue-200',         ring: 'ring-blue-400' },
  { key: 'Freedom Struggle',  icon: '🇮🇳', color: 'bg-green-50 border-green-200',   accent: 'text-green-700 bg-green-100 border-green-200',      ring: 'ring-green-400' },
  { key: 'Reform Movements',  icon: '✊', color: 'bg-violet-50 border-violet-200', accent: 'text-violet-700 bg-violet-100 border-violet-200',   ring: 'ring-violet-400' },
  { key: 'Art & Culture',     icon: '🎨', color: 'bg-pink-50 border-pink-200',     accent: 'text-pink-700 bg-pink-100 border-pink-200',         ring: 'ring-pink-400' },
  { key: 'Battles & Wars',    icon: '⚔️', color: 'bg-red-50 border-red-200',       accent: 'text-red-700 bg-red-100 border-red-200',            ring: 'ring-red-400' },
]

const PROB_DOT: Record<string, string> = {
  Hot: 'bg-red-500', High: 'bg-orange-400', Confirmed: 'bg-green-500', Recurring: 'bg-blue-400',
}
const PROB_TEXT: Record<string, string> = {
  Hot: 'text-red-700', High: 'text-orange-700', Confirmed: 'text-green-700', Recurring: 'text-blue-700',
}

const CHEATSHEET: Record<HistoryCategory, { title: string; bullets: string[] }> = {
  'Ancient India': {
    title: 'Ancient India -- Quick Recall',
    bullets: [
      'IVC Sites = Lothal (Dockyard, Gujarat) | Mohenjo-daro (Great Bath, Sindh) | Dholavira (Signboard, Kutch) | Kalibangan (Ploughed field) | Rakhigarhi (Largest)',
      'Vedas = Rig (Oldest, 1028 hymns) | Sama (Music) | Yajur (Rituals) | Atharva (Medicine/Magic)',
      'Buddha = Born Lumbini | Enlightenment Bodh Gaya | 1st Sermon Sarnath | Death Kushinagar',
      'Jainism = Mahavira (24th Tirthankara) | Rishabhadeva (1st) | Parshvanatha (23rd) | Split at Pataliputra',
      'Maurya = Chandragupta (322 BCE) | Arthashastra by Kautilya | Ashoka → Kalinga War → Buddhism',
      'Ashoka = Lion Capital Sarnath → National Emblem | James Prinsep decoded Brahmi | Dhamma policy',
      'Gupta = Chandragupta I (Golden Age) | Samudragupta (Napoleon of India) | Aryabhata, Kalidasa',
      'Sangam Age = Tamil Nadu | 3 dynasties: Chera, Chola, Pandya | Tolkappiyam (oldest Tamil grammar)',
    ],
  },
  'Medieval India': {
    title: 'Medieval India -- Sultanate & Mughals',
    bullets: [
      'Delhi Sultanate = 5 dynasties: Slave → Khalji → Tughlaq → Sayyid → Lodi (1206-1526)',
      'Slave Dynasty = Qutub-ud-din Aibak (Qutub Minar) | Iltutmish (completed) | Razia Sultan (1st woman ruler)',
      'Khalji = Alauddin Khalji: Market reforms, conquered Deccan | Malik Kafur campaigns',
      'Tughlaq = Muhammad bin Tughlaq: shifted capital Delhi→Daulatabad, token currency | Firoz Shah: canals',
      'Mughals = Babur (1526 Panipat) → Humayun → Akbar → Jahangir → Shah Jahan → Aurangzeb',
      'Akbar = Din-i-Ilahi | Mansabdari | Navratnas (Tansen, Birbal, Todar Mal) | Fatehpur Sikri | Abolished Jizya',
      'Shah Jahan = Taj Mahal (Agra) | Red Fort (Delhi) | Peacock Throne | "Golden Age of Mughal Architecture"',
      'Vijayanagara = Hampi capital | Krishna Deva Raya greatest ruler | Defeated at Talikota (1565)',
    ],
  },
  'Modern India': {
    title: 'Modern India -- British Rule & Acts',
    bullets: [
      'Battle of Plassey 1757 = Clive vs Siraj-ud-Daulah | Beginning of British rule in India',
      'Governor-Generals = Warren Hastings (1st) | Cornwallis (Permanent Settlement) | Wellesley (Subsidiary Alliance)',
      'Dalhousie = Doctrine of Lapse | Railways (1853) | Telegraph | Widow Remarriage Act (1856)',
      'Curzon = Partition of Bengal (1905) | Swadeshi Movement triggered | Archaeological Survey',
      'Important Acts = Regulating Act 1773 | Pitt\'s India Act 1784 | Charter Act 1833 | GoI Act 1858, 1919, 1935',
      'Revolt of 1857 = Mangal Pandey (Barrackpore) | Rani Lakshmibai (Jhansi) | Nana Sahib (Kanpur)',
      'Morley-Minto 1909 = Separate electorates for Muslims | Montagu-Chelmsford 1919 = Dyarchy',
      'GoI Act 1935 = Provincial autonomy | Federal structure | Basis of Indian Constitution',
    ],
  },
  'Freedom Struggle': {
    title: 'Freedom Struggle -- Key Movements',
    bullets: [
      'INC Founded 1885 = A.O. Hume | 1st session Bombay | W.C. Bonnerjee president',
      'Partition of Bengal 1905 = Curzon | Swadeshi & Boycott | Reunited 1911',
      'Gandhian Movements = NCM 1920 (Chauri Chaura) | CDM 1930 (Dandi March) | QIM 1942 ("Do or Die")',
      'Jallianwala Bagh 1919 = General Dyer | Amritsar | ~1000 killed | Hunter Commission',
      'Subhas Chandra Bose = INA/Azad Hind Fauj | "Give me blood, I\'ll give you freedom" | Forward Bloc',
      'Quit India 1942 = "Do or Die" | Aruna Asaf Ali hoisted flag | Parallel govt in Satara, Ballia',
      'Cabinet Mission 1946 = 3-tier structure | Constituent Assembly | Interim govt formed',
      'Independence 1947 = Mountbatten Plan | Radcliffe Line | Indian Independence Act | Aug 15',
    ],
  },
  'Reform Movements': {
    title: 'Reform Movements -- Social & Religious',
    bullets: [
      'Raja Ram Mohan Roy = Brahmo Samaj (1828) | Abolished Sati (1829) | "Father of Indian Renaissance"',
      'Dayanand Saraswati = Arya Samaj (1875) | "Back to Vedas" | Shuddhi Movement',
      'Swami Vivekananda = Ramakrishna Mission (1897) | Chicago speech 1893 | "Arise, awake, stop not"',
      'Ishwar Chandra Vidyasagar = Widow Remarriage Act 1856 | Women\'s education | Bengali prose reform',
      'Jyotirao Phule = Satyashodhak Samaj (1873) | 1st girls\' school 1848 | Anti-caste movement',
      'Annie Besant = Theosophical Society in India | Home Rule League 1916 | New India newspaper',
    ],
  },
  'Art & Culture': {
    title: 'Art & Culture -- Architecture & Literature',
    bullets: [
      'Ajanta Caves = Buddhist paintings | Maharashtra | Gupta period masterpiece | UNESCO',
      'Ellora Caves = Hindu + Buddhist + Jain | Kailasa Temple (monolithic) | Rashtrakuta dynasty',
      'Konark Sun Temple = Odisha | Narasimhadeva I | Chariot-shaped | "Black Pagoda"',
      'Khajuraho = MP | Chandela dynasty | Erotic sculptures | UNESCO | Hindu & Jain temples',
      'Nalanda = Bihar | Ancient Buddhist university | Destroyed by Bakhtiyar Khalji (1193)',
      'Sangam Literature = Tolkappiyam (oldest Tamil grammar) | Thirukkural by Thiruvalluvar',
      'Classical Dances = Bharatanatyam (TN) | Kathak (UP) | Kathakali (Kerala) | Odissi (Odisha) | Manipuri (Manipur)',
    ],
  },
  'Battles & Wars': {
    title: 'Battles & Wars -- Decisive Conflicts',
    bullets: [
      '1st Battle of Panipat 1526 = Babur vs Ibrahim Lodi | Mughal Empire founded | Cannons used',
      '2nd Battle of Panipat 1556 = Akbar (Bairam Khan) vs Hemu | Mughal supremacy confirmed',
      '3rd Battle of Panipat 1761 = Afghans (Abdali) vs Marathas | Maratha power declined',
      'Battle of Plassey 1757 = Clive vs Siraj-ud-Daulah | Mir Jafar\'s betrayal | British Bengal control',
      'Battle of Buxar 1764 = British vs Mir Qasim + Shuja-ud-Daulah + Shah Alam II | Treaty of Allahabad',
      'Battle of Haldighati 1576 = Akbar (Man Singh) vs Rana Pratap | Chetak horse | Rajput valor',
      'Battle of Talikota 1565 = Deccan Sultanates vs Vijayanagara | End of Vijayanagara Empire',
      'Anglo-Mysore Wars = 4 wars | Hyder Ali & Tipu Sultan vs British | Tipu died at Seringapatam (1799)',
    ],
  },
}

export default function FastRevision() {
  const [activeTab, setActiveTab] = useState<HistoryCategory>('Ancient India')
  const studyEntries = historyData.filter(e => !e.questionType)

  const cfg = CATEGORIES.find(c => c.key === activeTab)!
  const entries = studyEntries.filter(e => e.category === activeTab)
  const sheet = CHEATSHEET[activeTab]

  return (
    <section id="hist-fast" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-1">Section 02 -- Fast Revision</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Era-wise Quick Recall</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            One tab per era. Cheat sheets on the left, entries with shortcuts on the right.
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
                      <span className="shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-[10px] font-extrabold text-amber-700 mt-0.5">
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

function EntryCard({ entry: e, accentClass }: { entry: HistoryEntry; accentClass: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={() => setOpen(o => !o)}>
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="shrink-0 mt-0.5">
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${accentClass}`}>
            {e.topic}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">{e.question}</p>
          <p className="font-mnemonic text-xs text-amber-700 mt-1 italic leading-tight">{e.shortcut}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {e.year && (
            <span className="text-[10px] text-slate-400 font-mono">
              {e.year < 0 ? `${Math.abs(e.year)} BCE` : `${e.year} CE`}
            </span>
          )}
          <span className={`w-2 h-2 rounded-full ${PROB_DOT[e.examProb]}`} title={e.examProb}></span>
          <span className="text-slate-300 text-sm">{open ? '\u25B2' : '\u25BC'}</span>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 px-4 py-3 bg-slate-50 animate-fade-slide">
          <p className="text-sm font-bold text-slate-800 mb-2">{e.answer}</p>
          <p className="text-xs text-slate-600 leading-relaxed">{e.detail}</p>
          {e.place && (
            <p className="text-xs text-slate-500 mt-1">📍 {e.place}</p>
          )}
          <p className="text-xs text-slate-400 mt-2">{e.context}
            <span className={`ml-2 font-bold ${PROB_TEXT[e.examProb]}`}> - {e.examProb}</span>
          </p>
        </div>
      )}
    </div>
  )
}
