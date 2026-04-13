import { useState } from 'react'
import { sportsData, type SportsCategory, type SportsEntry } from '../data'

const CATEGORIES: {
  key: SportsCategory
  icon: string
  color: string
  accent: string
  ring: string
}[] = [
  { key: 'Cricket',                icon: '\u{1F3CF}', color: 'bg-orange-50 border-orange-200',  accent: 'text-orange-700 bg-orange-100 border-orange-200',   ring: 'ring-orange-400' },
  { key: 'Olympics & CWG',         icon: '\u{1F3C5}', color: 'bg-red-50 border-red-200',        accent: 'text-red-700 bg-red-100 border-red-200',             ring: 'ring-red-400' },
  { key: 'Hockey',                 icon: '\u{1F3D1}', color: 'bg-blue-50 border-blue-200',      accent: 'text-blue-700 bg-blue-100 border-blue-200',          ring: 'ring-blue-400' },
  { key: 'Football',               icon: '\u26BD',     color: 'bg-green-50 border-green-200',    accent: 'text-green-700 bg-green-100 border-green-200',       ring: 'ring-green-400' },
  { key: 'Tennis & Badminton',     icon: '\u{1F3F8}', color: 'bg-violet-50 border-violet-200',  accent: 'text-violet-700 bg-violet-100 border-violet-200',    ring: 'ring-violet-400' },
  { key: 'Athletics & Boxing',     icon: '\u{1F94A}', color: 'bg-pink-50 border-pink-200',      accent: 'text-pink-700 bg-pink-100 border-pink-200',          ring: 'ring-pink-400' },
  { key: 'Awards & Honours',       icon: '\u{1F3C6}', color: 'bg-amber-50 border-amber-200',    accent: 'text-amber-700 bg-amber-100 border-amber-200',       ring: 'ring-amber-400' },
  { key: 'Tournaments & Trophies', icon: '\u{1F947}', color: 'bg-cyan-50 border-cyan-200',      accent: 'text-cyan-700 bg-cyan-100 border-cyan-200',          ring: 'ring-cyan-400' },
  { key: 'Rules & Players',        icon: '\u{1F4CB}', color: 'bg-indigo-50 border-indigo-200',  accent: 'text-indigo-700 bg-indigo-100 border-indigo-200',    ring: 'ring-indigo-400' },
  { key: 'Venues & Events',        icon: '\u{1F3DF}\uFE0F', color: 'bg-lime-50 border-lime-200',       accent: 'text-lime-700 bg-lime-100 border-lime-200',          ring: 'ring-lime-400' },
  { key: 'Current Affairs 2024-26',icon: '\u{1F4F0}', color: 'bg-rose-50 border-rose-200',      accent: 'text-rose-700 bg-rose-100 border-rose-200',          ring: 'ring-rose-400' },
]

const PROB_DOT: Record<string, string> = {
  Hot: 'bg-red-500', High: 'bg-orange-400', Confirmed: 'bg-green-500', Recurring: 'bg-blue-400',
}
const PROB_TEXT: Record<string, string> = {
  Hot: 'text-red-700', High: 'text-orange-700', Confirmed: 'text-green-700', Recurring: 'text-blue-700',
}

const CHEATSHEET: Record<SportsCategory, { title: string; bullets: string[] }> = {
  'Cricket': {
    title: 'Cricket -- Quick Recall',
    bullets: [
      'Players = 11 per side | Pitch = 22 yards (20.12m) | 3 stumps + 2 bails per end',
      'Ranji Trophy = Domestic first-class (state) | Duleep Trophy = Zonal | Irani = Winner vs RoI | Deodhar = List A',
      'World Cup = Australia most wins (6) | India: 1983 (Kapil Dev), 2011 (Dhoni) | 2023: Australia beat India (Ahmedabad)',
      'T20 WC 2024 = India won (beat South Africa, Barbados) | IPL started 2008 | CSK & MI = 5 titles each',
      'Sachin Tendulkar = 100 centuries | 34,357 runs | Bharat Ratna 2014 | "God of Cricket"',
      'Narendra Modi Stadium (Motera) = Ahmedabad | World\'s largest cricket stadium (132,000 capacity)',
    ],
  },
  'Olympics & CWG': {
    title: 'Olympics & CWG -- Key Facts',
    bullets: [
      'Modern Olympics = Athens 1896 | Pierre de Coubertin | 5 rings = 5 continents | Motto: Citius Altius Fortius Communiter',
      'Tokyo 2020 = 7 medals (best ever) | Neeraj Gold Javelin | Mirabai Silver WL | PV Sindhu Bronze | Hockey Bronze',
      'Paris 2024 = 6 medals | Neeraj Silver | Manu Bhaker 2 Bronze | Swapnil Kusale Bronze | Aman Sehrawat Bronze | Hockey Bronze',
      'Abhinav Bindra = First individual Gold (Shooting, Beijing 2008) | India first Olympics: 1900 Paris',
      'CWG 2022 Birmingham = India 4th (61 medals) | Asian Games 2023 Hangzhou = India 4th (107 medals, best ever)',
      'India Hockey = 8 Olympic Golds (1928-1980) | Last Gold: 1980 Moscow | Recent Bronze: Tokyo 2020 & Paris 2024',
    ],
  },
  'Hockey': {
    title: 'Hockey -- Must Know',
    bullets: [
      'Players = 11 | Duration = 60 min (4 x 15 min) | Field = 91.4m x 55m',
      'India Hockey = 8 Olympic Golds | First: 1928 Amsterdam | Last: 1980 Moscow',
      'Major Dhyan Chand = "Hockey Wizard" | Birthday 29 Aug = National Sports Day | Khel Ratna renamed after him',
      'Sultan Azlan Shah Cup = Hockey | Malaysia | Kalinga Stadium = Bhubaneswar (Hockey WC 2018 & 2023)',
      'Tokyo 2020 Bronze = Manpreet Singh captain | Paris 2024 Bronze = Harmanpreet Singh captain',
      'PR Sreejesh = "Wall of Indian Hockey" | Retired after Paris 2024 | Legendary goalkeeper',
    ],
  },
  'Football': {
    title: 'Football -- Essentials',
    bullets: [
      'Players = 11 | Duration = 90 min (2 x 45 min) | Extra time = 30 min | Penalty shootout',
      'Durand Cup = Oldest football tournament in India & Asia (1888) | Santosh Trophy = State teams | Subroto Cup = School level',
      'FIFA WC most wins: Brazil 5 | Germany & Italy 4 each | Argentina 3 (2022 Messi in Qatar)',
      'ISL = 2014 | Indian Super League | First champion: Atletico de Kolkata',
      'Salt Lake Stadium = Kolkata | Largest football stadium in India | Kolkata = football capital',
      'FIFA U-17 Women\'s WC 2022 hosted by India | U-17 Men\'s WC 2017 also in India',
    ],
  },
  'Tennis & Badminton': {
    title: 'Tennis & Badminton -- Key Points',
    bullets: [
      'Grand Slams = 4 | Australian (hard) | French/Roland Garros (clay) | Wimbledon (grass, oldest 1877) | US Open (hard)',
      'Tennis set = 6 games | Points: 0-15-30-40-Deuce | Davis Cup = men\'s team | Billie Jean King Cup = women\'s',
      'Badminton = 21 points per game | Best of 3 | Thomas Cup = men\'s | Uber Cup = women\'s | Sudirman = mixed',
      'India Thomas Cup 2022 = First win (beat Indonesia 3-0) | PV Sindhu = Silver Rio 2016 + Bronze Tokyo 2020',
      'Prakash Padukone = First Indian All England winner (1980) | Pullela Gopichand = 2001',
      'Satwik + Chirag = Badminton doubles | Khel Ratna 2023 | Asian Games 2023 Gold',
    ],
  },
  'Athletics & Boxing': {
    title: 'Athletics & Boxing -- Champions',
    bullets: [
      'Neeraj Chopra = Javelin | Gold Tokyo 87.58m | Silver Paris 89.45m | World Champion 2023 | From Panipat',
      'Mary Kom = 6-time World Champion | 8 WC medals | Olympic Bronze 2012 | "Magnificent Mary" | Manipur',
      'Milkha Singh = "Flying Sikh" | 4th in 400m Rome 1960 | CWG Gold 1958',
      'PT Usha = "Payyoli Express" | 4th in 400m Hurdles LA 1984 (missed by 0.01s) | IOA President 2022',
      'Lovlina Borgohain = Boxing Bronze Tokyo 2020 (69kg) | Assam',
      'Aman Sehrawat = Wrestling 57kg Bronze Paris 2024 | Manu Bhaker = 2 Bronze Shooting Paris 2024',
    ],
  },
  'Awards & Honours': {
    title: 'Awards & Honours -- Complete List',
    bullets: [
      'Khel Ratna = Highest sports honour | Renamed to Major Dhyan Chand Khel Ratna (2021) | First: Vishwanathan Anand (1992)',
      'Khel Ratna 2024 = D. Gukesh (Chess) | 2023 = Chirag Shetty + Satwiksairaj (Badminton)',
      'Arjuna Award = Outstanding performance (since 1961) | Named after warrior Arjuna | Bronze statuette',
      'Dronacharya Award = Best coaches (since 1985) | Regular + Lifetime categories',
      'Dhyan Chand Award = Lifetime achievement in sports (since 2002) | Different from Khel Ratna',
      'Sachin Tendulkar = First sportsperson Bharat Ratna (2014) | National Sports Day = 29 Aug',
    ],
  },
  'Tournaments & Trophies': {
    title: 'Tournaments & Trophies -- Trophy Map',
    bullets: [
      'Cricket = Ranji (state) | Duleep (zonal) | Irani (winner vs RoI) | Deodhar (List A) | ICC World Cup',
      'Football = Durand Cup (1888, oldest) | Santosh Trophy (state) | Subroto Cup (school) | ISL | FIFA WC',
      'Hockey = Sultan Azlan Shah | Champions Trophy | FIH World Cup | Hockey India League',
      'Tennis = Grand Slams (4) | Davis Cup (men) | Billie Jean King Cup (women)',
      'Badminton = Thomas Cup (men) | Uber Cup (women) | Sudirman Cup (mixed) | All England (oldest, 1899)',
      'Chess = FIDE World Championship | D. Gukesh youngest champion (2024, age 18)',
    ],
  },
  'Rules & Players': {
    title: 'Rules & Players -- Player Count Sheet',
    bullets: [
      'Cricket = 11 | Football = 11 | Hockey = 11 | Basketball = 5 | Volleyball = 6',
      'Kabaddi = 7 | Kho-Kho = 9 (12 nominated) | Polo = 4 | Water Polo = 7',
      'Baseball = 9 | Rugby Union = 15 | Rugby League = 13 | Handball = 7',
      'Table Tennis = 11 points, 7 games | Badminton = 21 points, 3 games',
      'Polo = 8 chukkers (7 min each) | "Sport of Kings" | Origin: Manipur (Sagol Kangjei)',
      'Olympics = Athens 1896 | Motto: Citius Altius Fortius Communiter | 5 rings = 5 continents',
    ],
  },
  'Venues & Events': {
    title: 'Venues & Events -- Stadium Map',
    bullets: [
      'Narendra Modi Stadium = Ahmedabad | World\'s largest cricket stadium (132,000) | 2023 WC Final',
      'Eden Gardens = Kolkata (1864) | Wankhede = Mumbai (2011 WC Final) | Chinnaswamy = Bangalore',
      'Kalinga Stadium = Bhubaneswar (Hockey WC) | Salt Lake = Kolkata (Football)',
      'JLN Stadium = Delhi (1982 Asian Games) | Major Dhyan Chand Stadium = Delhi (Hockey)',
      'NIS (SAI) = Patiala | Premier sports coaching institute | Established 1961',
      'Fatorda = Goa (Football + Cricket) | MA Chidambaram = Chennai (Chepauk)',
    ],
  },
  'Current Affairs 2024-26': {
    title: 'Current Affairs 2024-26 -- Hot Topics',
    bullets: [
      'D. Gukesh = Youngest World Chess Champion (18 years, 2024) | Beat Ding Liren | Chennai',
      'Paris 2024 = India 6 medals | Neeraj Silver | Manu Bhaker 2 Bronze | Hockey Bronze',
      'T20 WC 2024 = India won (beat South Africa) | CWC 2023 = Australia won (India hosted)',
      'India 2036 Olympics bid = Ahmedabad | Thomas Cup 2022 = India won (Badminton)',
      'Asian Games 2023 = 107 medals (best ever) | India 4th | Cricket returned (India Gold both M/W)',
      'IPL 2024 = KKR won | PR Sreejesh retired after Paris 2024 | Swapnil Kusale Bronze Shooting',
    ],
  },
}

export default function FastRevision() {
  const [activeTab, setActiveTab] = useState<SportsCategory>('Cricket')

  const cfg = CATEGORIES.find(c => c.key === activeTab)!
  const entries = sportsData.filter(e => e.category === activeTab)
  const sheet = CHEATSHEET[activeTab]

  return (
    <section id="sp-fast" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-orange-600 uppercase mb-1">Section 02 -- Fast Revision</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Category-wise Quick Recall</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            One tab per category. Cheat sheets on the left, entries with shortcuts on the right.
            Built for <strong>last-hour revision</strong> before exam.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => {
            const catCount = sportsData.filter(e => e.category === c.key).length
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
                      <span className="shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-extrabold text-orange-700 mt-0.5">
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

function EntryCard({ entry: e, accentClass }: { entry: SportsEntry; accentClass: string }) {
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
          <p className="font-mnemonic text-xs text-orange-700 mt-1 italic leading-tight">
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
