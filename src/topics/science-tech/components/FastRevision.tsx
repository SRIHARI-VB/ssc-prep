import { useState } from 'react'
import { sciData, type Subject, type SciEntry } from '../data'

const CATEGORIES: {
  key: Subject; icon: string; color: string; accent: string; ring: string
}[] = [
  { key: 'Physics',         icon: '\u269B\uFE0F', color: 'bg-blue-50 border-blue-200',    accent: 'text-blue-700 bg-blue-100 border-blue-200',       ring: 'ring-blue-400' },
  { key: 'Chemistry',       icon: '\u{1F9EA}', color: 'bg-green-50 border-green-200',  accent: 'text-green-700 bg-green-100 border-green-200',     ring: 'ring-green-400' },
  { key: 'Biology',         icon: '\u{1F9EC}', color: 'bg-rose-50 border-rose-200',    accent: 'text-rose-700 bg-rose-100 border-rose-200',       ring: 'ring-rose-400' },
  { key: 'Space & Defense', icon: '\u{1F680}', color: 'bg-violet-50 border-violet-200',accent: 'text-violet-700 bg-violet-100 border-violet-200', ring: 'ring-violet-400' },
  { key: 'Technology',      icon: '\u{1F4BB}', color: 'bg-cyan-50 border-cyan-200',    accent: 'text-cyan-700 bg-cyan-100 border-cyan-200',       ring: 'ring-cyan-400' },
]

const PROB_DOT: Record<string, string> = {
  Hot: 'bg-red-500', High: 'bg-orange-400', Confirmed: 'bg-green-500', Recurring: 'bg-blue-400',
}
const PROB_TEXT: Record<string, string> = {
  Hot: 'text-red-700', High: 'text-orange-700', Confirmed: 'text-green-700', Recurring: 'text-blue-700',
}

const CHEATSHEET: Record<Subject, { title: string; bullets: string[] }> = {
  'Physics': {
    title: 'Physics -- Quick Recall',
    bullets: [
      'Instruments = Galvanometer (current) | Barometer (pressure) | Hygrometer (humidity) | Lactometer (milk purity) | Anemometer (wind speed) | Sphygmomanometer (BP)',
      'SI Base Units = m (length) | kg (mass) | s (time) | A (current) | K (temperature) | mol (amount) | cd (luminous intensity)',
      'EM Spectrum (freq order) = Radio < Microwave < IR < Visible < UV < X-ray < Gamma — "Roman Men Invented Very Unusual X-ray Guns"',
      'Sound = Fastest in solids > liquids > gases | Echo needs min 17.2m distance | Doppler effect = pitch change with relative motion',
      'Optics = Convex mirror (rear-view, wider view) | Concave mirror (shaving, headlights) | TIR = optical fibre | Mirror formula: 1/f = 1/v + 1/u',
      'Nuclear = Fission (splitting heavy nuclei, atom bomb) | Fusion (combining light nuclei, Sun\'s energy) | E = mc²',
      'Laws of Motion = 1st (inertia) | 2nd (F=ma) | 3rd (action-reaction) | Projectile = parabolic path',
      'Thermodynamics = Zeroth (temperature concept) | 1st (energy conservation) | 2nd (entropy always increases) | 3rd (absolute zero unreachable)',
    ],
  },
  'Chemistry': {
    title: 'Chemistry -- Quick Recall',
    bullets: [
      'Bonding = Covalent (sharing electrons) | Ionic (transfer electrons) | Metallic (electron sea) | Hydrogen (weak, intermolecular)',
      'pH Scale = 0-6 Acidic | 7 Neutral | 8-14 Basic | Blood 7.4 | Gastric juice 1.5-2 | Lemon juice 2.2',
      'Alloys HOT = Brass (Cu+Zn) | Bronze (Cu+Sn) | Stainless Steel (Fe+Cr+Ni+C) | Solder (Pb+Sn) | German Silver (Cu+Zn+Ni)',
      'Polymers = Bakelite (thermosetting, first plastic) | Nylon (first synthetic fibre) | PVC (pipes) | Teflon (non-stick) | Rubber (natural elastomer)',
      'Ores = Bauxite→Al | Hematite→Fe | Galena→Pb | Chalcopyrite→Cu | Cinnabar→Hg | Calamine→Zn',
      'Cement = Limestone + Clay + Gypsum (setting regulator) | Portland cement in rotary kiln',
      'Corrosion = Rusting needs O₂ + H₂O | Prevention: galvanization (Zn), painting, oiling, alloying (stainless steel)',
      'Saponification = Fat/Oil + NaOH → Soap + Glycerol | Soaps fail in hard water, detergents work',
    ],
  },
  'Biology': {
    title: 'Biology -- Quick Recall',
    bullets: [
      'Diseases = Malaria (Plasmodium, Anopheles) | Dengue (virus, Aedes day-biting) | TB (Mycobacterium) | Typhoid (Salmonella) | Cholera (Vibrio)',
      'Vitamins = A (Night blindness) | B1 (Beriberi) | B3 (Pellagra) | C (Scurvy) | D (Rickets) | K (Bleeding/Clotting) — "ABCDK" mnemonic',
      'Plant Hormones = Auxin (growth/phototropism) | Gibberellin (stem elongation) | Cytokinin (cell division) | Ethylene (fruit ripening) | ABA (stress/dormancy)',
      'DNA = Double helix, Watson-Crick 1953 | Bases: A-T, G-C | RNA types: mRNA, tRNA, rRNA',
      'Blood Groups = A, B, AB, O | Universal donor: O-ve | Universal recipient: AB+ve | Rh factor: +ve or -ve',
      'Endocrine = Pituitary (master gland) | Thyroid (T3/T4, metabolism) | Adrenal (cortisol, adrenaline) | Pancreas (insulin, glucagon)',
      'Ecology = Food chain: Producer→1°→2°→3° consumer | 10% energy rule | Food web = interconnected chains | Ecological pyramids (energy, biomass, numbers)',
      'Cell = Mitochondria (powerhouse) | Ribosome (protein synthesis) | Chloroplast (photosynthesis) | Nucleus (DNA) | Peroxisomes (H₂O₂)',
    ],
  },
  'Space & Defense': {
    title: 'Space & Defence -- Quick Recall',
    bullets: [
      'Chandrayaan-3 = Aug 23, 2023 | South Pole landing (1st ever) | Vikram lander + Pragyan rover | Pragyan found Sulphur via LIBS',
      'Aditya-L1 = Sep 2023 launch | Sun-Earth L1 point | 1.5 million km from Earth | Solar corona study',
      'Gaganyaan = India\'s 1st crewed mission | 400 km LEO, 3 crew, 3 days | LVM3 rocket | Crewed flight 2026',
      'NISAR = NASA-ISRO SAR satellite | Jul 2025, GSLV-F16 | Dual-band L+S | Earth surface mapping every 12 days',
      'LVM3/GSLV-MkIII = 3 stages (S200+L110+C25) | 10t LEO, 4t GTO | India\'s heaviest launcher',
      'Tejas Mk 2 = 4.5-gen, medium-weight fighter | GE-F414 engine | HAL-built | First flight Q1 2026 | Replaces MiG-29/Mirage-2000',
      'SpaDeX = Dec 2024 | India 4th nation for space docking | SDX01 (Chaser) + SDX02 (Target)',
      'Operation Sindoor = May 2025 | Precision strikes on terror camps in Pakistan & PoK | Rafale, BrahMos, SCALP missiles used',
    ],
  },
  'Technology': {
    title: 'Technology -- Quick Recall',
    bullets: [
      'AI/ML = AI (machines simulating intelligence) ⊃ ML (learning from data) ⊃ Deep Learning (neural networks) | IndiaAI Mission: Rs 10,371 cr',
      'Quantum = National Quantum Mission Rs 6,003 cr (2023) | 1000-qubit target | Kaveri = India\'s 1st 64-qubit chip (QpiAI) | DST nodal',
      '5G India = Oct 2022 launch at IMC Delhi | Jio & Airtel first | Rs 1.5 lakh crore spectrum auction | n77/n78 mid-band',
      'Semiconductor = Micron ATMP at Sanand, Gujarat ($2.75B) | Tata fab at Dholera | India Semiconductor Mission (ISM)',
      'Blockchain = Distributed ledger, decentralized, immutable | Used in crypto, supply chain, voting | No central authority',
      'CERT-In = Cybersecurity nodal agency under MeitY | 6-hour incident reporting (Apr 2022) | VPN 5-year log rule',
      'Digital India = UPI (2016, NPCI) | DigiLocker | JAM Trinity (Jan Dhan+Aadhaar+Mobile) | e-Rupee CBDC (2022)',
      'DHRUV64 = India\'s first indigenous 64-bit processor | C-DAC | RISC-V architecture | Made in India chip',
    ],
  },
}

export default function FastRevision() {
  const [activeTab, setActiveTab] = useState<Subject>('Physics')
  const studyEntries = sciData.filter(e => !e.questionType)

  const cfg = CATEGORIES.find(c => c.key === activeTab)!
  const entries = studyEntries.filter(e => e.subject === activeTab)
  const sheet = CHEATSHEET[activeTab]

  return (
    <section id="st-fast" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-teal-700 uppercase mb-1">Section 02 -- Fast Revision</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Subject-wise Quick Recall</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            One tab per subject. Cheat sheets on the left, entries with mnemonics on the right.
            Built for <strong>last-hour revision</strong> before exam.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => {
            const catCount = studyEntries.filter(e => e.subject === c.key).length
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
                      <span className="shrink-0 w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-[10px] font-extrabold text-teal-700 mt-0.5">
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
              <p className="text-center py-10 text-slate-400 text-sm">No entries for this subject.</p>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

function EntryCard({ entry: e, accentClass }: { entry: SciEntry; accentClass: string }) {
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
          {e.mnemonic && <p className="font-mnemonic text-xs text-teal-700 mt-1 italic leading-tight">{e.mnemonic}</p>}
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
          <p className="text-xs text-slate-400 mt-2">{e.context}
            <span className={`ml-2 font-bold ${PROB_TEXT[e.examProb]}`}> - {e.examProb}</span>
          </p>
        </div>
      )}
    </div>
  )
}
