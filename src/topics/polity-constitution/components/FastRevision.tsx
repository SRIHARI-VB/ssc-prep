import { useState } from 'react'
import { polityData, type PolityCategory } from '../data'

// ── Category config ────────────────────────────────────────────────────────────
const CATEGORIES: {
  key: PolityCategory
  icon: string
  color: string
  accent: string
  ring: string
  desc: string
}[] = [
  {
    key: 'Important Articles',
    icon: '📖',
    color: 'bg-indigo-50 border-indigo-200',
    accent: 'text-indigo-700 bg-indigo-100 border-indigo-200',
    ring: 'ring-indigo-400',
    desc: 'Key constitutional provisions — how SSC asks them',
  },
  {
    key: 'Schedules',
    icon: '📋',
    color: 'bg-teal-50 border-teal-200',
    accent: 'text-teal-700 bg-teal-100 border-teal-200',
    ring: 'ring-teal-400',
    desc: '12 Schedules — what each contains, added by which amendment',
  },
  {
    key: 'Amendments',
    icon: '✏️',
    color: 'bg-blue-50 border-blue-200',
    accent: 'text-blue-700 bg-blue-100 border-blue-200',
    ring: 'ring-blue-400',
    desc: 'Key amendments with year, what changed, which case overruled',
  },
  {
    key: 'Landmark Cases',
    icon: '⚖️',
    color: 'bg-emerald-50 border-emerald-200',
    accent: 'text-emerald-700 bg-emerald-100 border-emerald-200',
    ring: 'ring-emerald-400',
    desc: 'SC judgments — what was established, direct SSC question pattern',
  },
  {
    key: 'Constitutional Bodies',
    icon: '🏗️',
    color: 'bg-rose-50 border-rose-200',
    accent: 'text-rose-700 bg-rose-100 border-rose-200',
    ring: 'ring-rose-400',
    desc: 'ECI, CAG, UPSC, Finance Commission — article + key facts',
  },
  {
    key: 'Parliament & Executive',
    icon: '🏛️',
    color: 'bg-violet-50 border-violet-200',
    accent: 'text-violet-700 bg-violet-100 border-violet-200',
    ring: 'ring-violet-400',
    desc: 'Lok Sabha, Rajya Sabha, President, PM — numbers + process',
  },
  {
    key: 'Fundamental Rights & DPSP',
    icon: '⚡',
    color: 'bg-amber-50 border-amber-200',
    accent: 'text-amber-700 bg-amber-100 border-amber-200',
    ring: 'ring-amber-400',
    desc: 'All 6 FRs, writs, DPSP origin, FR vs DPSP conflict',
  },
]

const PROB_DOT: Record<string, string> = {
  Hot:       'bg-red-500',
  High:      'bg-orange-400',
  Confirmed: 'bg-green-500',
  Recurring: 'bg-blue-400',
}
const PROB_TEXT: Record<string, string> = {
  Hot:       'text-red-700',
  High:      'text-orange-700',
  Confirmed: 'text-green-700',
  Recurring: 'text-blue-700',
}

// ── Static cheat-sheet blurbs per category ────────────────────────────────────
const CHEATSHEET: Record<PolityCategory, { title: string; bullets: string[] }> = {
  'Important Articles': {
    title: 'Must-Know Article Numbers',
    bullets: [
      'Art 1 = India = Union of States (not federation)',
      'Art 13 = Laws violating FRs are VOID (judicial review)',
      'Art 14–18 = Right to Equality | Art 19–22 = Right to Freedom',
      'Art 17 = Untouchability abolished (no exceptions)',
      'Art 21 = Life & Liberty (most expanded FR) | Art 21A = RTE 6–14 yrs',
      'Art 32 = Heart & Soul (Ambedkar) — 5 writs to SC',
      'Art 44 = UCC (DPSP) | Art 51A = Fundamental Duties',
      'Art 72 = President pardon (incl. death) | Art 161 = Governor (excl. death)',
      'Art 110 = Money Bill (Speaker certifies) | Art 112 = Union Budget',
      'Art 148 = CAG | Art 280 = Finance Commission | Art 324 = ECI',
      'Art 352 = National Emergency | Art 356 = President\'s Rule | Art 360 = Financial Emergency',
      'Art 368 = Amendment power | Art 300A = Property right (legal, not FR)',
    ],
  },
  'Schedules': {
    title: '12 Schedules at a Glance',
    bullets: [
      '1st = States & UTs (28 states + 8 UTs)',
      '2nd = Salaries of President, Governors, Judges, CAG, Speaker',
      '3rd = Oath forms for PM, Ministers, MPs, Judges',
      '4th = Rajya Sabha seats per State',
      '5th = Scheduled Areas & Tribes (non-NE)',
      '6th = Tribal Autonomous Councils (Assam, Meghalaya, Tripura, Mizoram = AMTM)',
      '7th = 3 Lists: Union 98 | State 59 | Concurrent 52 (Remember: 98-59-52)',
      '8th = 22 Official Languages (latest 4 by 92nd Amend: Bodo, Dogri, Maithili, Santhali)',
      '9th = FR-protected land reform laws (1st Amend 1951); laws after Apr 1973 reviewable',
      '10th = Anti-Defection Law (52nd Amend 1985); 2/3 merger exception',
      '11th = 29 Panchayat functions (73rd Amend 1992)',
      '12th = 18 Municipality functions (74th Amend 1992)',
    ],
  },
  'Amendments': {
    title: 'Key Amendments — Year + Change',
    bullets: [
      '1st (1951) = 9th Schedule + OBC reservation (Art 15(4))',
      '7th (1956) = States reorganised on linguistic basis (Fazl Ali Commission)',
      '24th (1971) = Parliament CAN amend FRs (overruled Golaknath 1967)',
      '42nd (1976) = "Mini Constitution" — Socialist+Secular in Preamble, 11 FDs, DPSP supremacy',
      '44th (1978) = Property removed from FRs → Art 300A; CoM advice binding on President',
      '52nd (1985) = 10th Schedule Anti-Defection Law (Rajiv Gandhi)',
      '61st (1988) = Voting age 21→18',
      '73rd (1992) = Panchayati Raj (11th Schedule, 29 functions)',
      '74th (1992) = Urban Local Bodies (12th Schedule, 18 functions)',
      '86th (2002) = Art 21A RTE 6–14 yrs + 11th Fundamental Duty',
      '91st (2003) = Cabinet size capped at 15% of House strength',
      '101st (2016) = GST (Art 246A + Art 279A GST Council)',
      '103rd (2019) = 10% EWS reservation (Art 15(6) + Art 16(6))',
      '104th (2020) = SC/ST political quota extended to 2030; Anglo-Indian seats removed',
      '106th (2023) = 33% Women reservation (Nari Shakti Vandan Act)',
    ],
  },
  'Landmark Cases': {
    title: 'Case → What It Established',
    bullets: [
      'A.K. Gopalan (1950) = Art 21 read narrowly (overruled by Maneka Gandhi)',
      'Golaknath (1967) = Parliament CANNOT amend FRs (overruled by 24th Amend)',
      'Kesavananda Bharati (1973) = BASIC STRUCTURE doctrine; 13-judge bench; 7:6',
      'Indira Gandhi vs Raj Narain (1975) = Free & fair elections = basic structure',
      'Maneka Gandhi (1978) = Art 21 procedure must be JUST, FAIR, REASONABLE',
      'Minerva Mills (1980) = Balance between FRs and DPSP = basic structure',
      'Indra Sawhney (1992) = 50% reservation cap; OBC creamy layer; no quota in promotions',
      'S.R. Bommai (1994) = Art 356 floor test; secularism = basic structure',
      'Vishaka (1997) = Workplace sexual harassment guidelines → POSH Act 2013',
      'I.R. Coelho (2007) = 9th Schedule laws after Apr 1973 reviewable if basic structure violated',
      'Puttaswamy (2017) = PRIVACY is FR under Art 21 (9-judge unanimous)',
      'Navtej Singh Johar (2018) = Sec 377 consensual adult same-sex decriminalised',
      'Janhit Abhiyan (2022) = EWS 10% reservation valid; 50% cap can be exceeded',
    ],
  },
  'Constitutional Bodies': {
    title: 'Body → Article + Key Fact',
    bullets: [
      'ECI = Art 324; CEC removed like SC judge; covers Parl+State+Pres+VP elections (NOT Panchayat)',
      'CAG = Art 148; removed like SC judge; audits Union + States; guardian of public purse',
      'UPSC = Art 315; max 11 members; 6-yr term or 65 yrs; cannot return to govt after',
      'Finance Commission = Art 280; every 5 yrs; recommends tax sharing Centre-States',
      '16th Finance Commission = Arvind Panagariya; report for 2026–31',
      'AG of India = Art 76; highest law officer; right of audience in ALL courts',
      'SC Commission (Art 338) + ST Commission (Art 338A) split by 89th Amend 2003',
      'Inter-State Council = Art 263; PM chairs; all CMs + 6 Cabinet Ministers',
      'Rajya Sabha creates All India Services = Art 312 (IAS, IPS, IFoS)',
    ],
  },
  'Parliament & Executive': {
    title: 'Numbers & Processes to Remember',
    bullets: [
      'Lok Sabha = max 552; currently 543 elected; 5-year term; Speaker from LS',
      'Rajya Sabha = max 250 (238 elected + 12 nominated); permanent; VP = ex-officio Chairman',
      '1/3 of RS retires every 2 years; elected by State MLAs via STV',
      'President elected by Electoral College = elected MPs + elected MLAs (not nominated)',
      'VP elected by members of BOTH Houses (not MLAs)',
      'Starred Question = oral answer + supplementary; Unstarred = written only',
      'Zero Hour = right after Question Hour; Indian innovation; no rule book provision',
      'No-Confidence Motion = needs 50 LS members; only in Lok Sabha',
      'Money Bill = Art 110; introduced only in LS; Rajya Sabha cannot reject, only recommend (14 days)',
      'Ordinance = Art 123; when Parl not in session; lapses 6 weeks after reassembly',
      'Art 352 Emergency: approved by 2/3rd present + absolute majority; LS can revoke by simple majority',
      'Art 356 President\'s Rule: max 3 years; Parliament approves every 6 months',
    ],
  },
  'Fundamental Rights & DPSP': {
    title: 'FR Articles + DPSP Key Points',
    bullets: [
      '6 FRs: Equality (14–18), Freedom (19–22), Against Exploitation (23–24), Religion (25–28), Culture/Education (29–30), Constitutional Remedies (32)',
      'Art 14 = Equality before law + Equal protection | Art 15 = No discrimination (RRCSB)',
      'Art 17 = Untouchability abolished — ONLY FR with absolutely no exceptions',
      'Art 19 = 6 freedoms (originally 7; property removed by 44th Amend)',
      'Art 20 + Art 21 = CANNOT be suspended even during Emergency',
      'Art 21A (86th Amend) = RTE 6–14 yrs — made education a FR (was DPSP before)',
      '5 Writs: Habeas Corpus (produce body), Mandamus (we command), Prohibition, Certiorari, Quo Warranto',
      'Quo Warranto = only writ ANY person can seek (not just aggrieved); challenges PUBLIC office',
      'Art 32 = writs only for FRs; Art 226 = HC writs for ANY legal right (WIDER scope)',
      'DPSP = Part IV, Art 36–51; borrowed from IRELAND; non-justiciable',
      'DPSP types: Socialistic (39,41,42), Gandhian (40,43,46–48), Liberal (44,45,50)',
      'FR vs DPSP conflict: FRs prevail; BUT basic structure requires BALANCE (Minerva Mills)',
      'Art 44 = UCC (still not implemented; Uttarakhand UCC 2024 partial)',
      'Art 51A = 11 Fundamental Duties; added 42nd Amend (10) + 86th Amend (11th: educate child)',
    ],
  },
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function FastRevision() {
  const [activeTab, setActiveTab] = useState<PolityCategory>('Important Articles')

  const cfg = CATEGORIES.find(c => c.key === activeTab)!
  const entries = polityData.filter(e => e.category === activeTab)
  const sheet   = CHEATSHEET[activeTab]

  return (
    <section id="pol-fast" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-1">Section 02 — Fast Revision</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Topic-wise Quick Recall</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            One tab per section. Cheat sheet on the left, all entries with shortcuts on the right.
            Built for <strong>last-hour revision</strong> before exam.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => (
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
              <span className="ml-1 opacity-60">
                ({polityData.filter(e => e.category === c.key).length})
              </span>
            </button>
          ))}
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-slide">

          {/* LEFT — Cheat sheet */}
          <div className={`lg:col-span-2 rounded-2xl border p-5 ${cfg.color}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{cfg.icon}</span>
              <div>
                <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">{activeTab}</p>
                <h3 className="text-base font-extrabold text-slate-800">{sheet.title}</h3>
              </div>
            </div>
            <ul className="space-y-2">
              {sheet.bullets.map((b, i) => {
                const [before, ...rest] = b.split('=')
                const after = rest.join('=')
                return (
                  <li key={i} className="flex gap-2 text-sm leading-snug">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-white/70 flex items-center justify-center text-[10px] font-extrabold text-slate-500 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-slate-700">
                      {after ? (
                        <>
                          <strong className="text-slate-900">{before.trim()}</strong>
                          <span className="text-slate-500"> = </span>
                          <span>{after.trim()}</span>
                        </>
                      ) : (
                        <span>{b}</span>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>

            {/* Quick count */}
            <div className="mt-5 pt-4 border-t border-black/10 flex gap-3 flex-wrap">
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

          {/* RIGHT — Entry cards */}
          <div className="lg:col-span-3 space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {entries.map(e => (
              <EntryCard key={e.id} entry={e} accentClass={cfg.accent} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

// ── Entry card (collapsible) ──────────────────────────────────────────────────
import type { PolityEntry } from '../data'

function EntryCard({ entry: e, accentClass }: { entry: PolityEntry; accentClass: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={() => setOpen(o => !o)}
    >
      {/* Header row */}
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="shrink-0 mt-0.5">
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${accentClass}`}>
            {e.topic}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">{e.question}</p>
          {/* Shortcut always visible */}
          <p className="font-mnemonic text-xs text-amber-700 mt-1 italic leading-tight">
            💡 {e.shortcut}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`w-2 h-2 rounded-full ${PROB_DOT[e.examProb]}`} title={e.examProb}></span>
          <span className="text-slate-300 text-sm">{open ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* Expanded — answer + detail */}
      {open && (
        <div className="border-t border-slate-100 px-4 py-3 bg-slate-50 animate-fade-slide">
          <p className="text-sm font-bold text-slate-800 mb-2">
            ✅ {e.answer}
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">{e.detail}</p>
          <p className="text-xs text-slate-400 mt-2">📅 {e.context}
            <span className={`ml-2 font-bold ${PROB_TEXT[e.examProb]}`}> • {e.examProb}</span>
          </p>
        </div>
      )}
    </div>
  )
}
