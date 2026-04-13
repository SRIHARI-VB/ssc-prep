import { useMemo } from 'react'
import { Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, Title,
} from 'chart.js'
import { englishQuestions, vocabData } from '../data'
import type { EnglishQType, Level } from '../data'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const QTYPE_LABELS: Record<EnglishQType, string> = {
  'error-spotting':         'Error Spotting',
  'fill-blank':             'Fill in the Blank',
  'sentence-improvement':   'Sentence Improvement',
  'synonyms':               'Synonyms',
  'antonyms':               'Antonyms',
  'idioms-phrases':         'Idioms & Phrases',
  'one-word-substitution':  'One Word Substitution',
  'spelling-correction':    'Spelling Correction',
  'cloze-test':             'Cloze Test',
  'para-jumble':            'Para Jumble',
  'sentence-rearrangement': 'Sentence Rearrangement',
  'active-passive':         'Active/Passive',
  'direct-indirect':        'Direct/Indirect',
  'reading-comprehension':  'Reading Comprehension',
}

const QTYPE_COLORS: Record<EnglishQType, string> = {
  'error-spotting':         'rgba(239,68,68,0.8)',
  'fill-blank':             'rgba(59,130,246,0.8)',
  'sentence-improvement':   'rgba(34,197,94,0.8)',
  'synonyms':               'rgba(20,184,166,0.8)',
  'antonyms':               'rgba(168,85,247,0.8)',
  'idioms-phrases':         'rgba(245,158,11,0.8)',
  'one-word-substitution':  'rgba(99,102,241,0.8)',
  'spelling-correction':    'rgba(236,72,153,0.8)',
  'cloze-test':             'rgba(6,182,212,0.8)',
  'para-jumble':            'rgba(249,115,22,0.8)',
  'sentence-rearrangement': 'rgba(132,204,22,0.8)',
  'active-passive':         'rgba(139,92,246,0.8)',
  'direct-indirect':        'rgba(16,185,129,0.8)',
  'reading-comprehension':  'rgba(244,63,94,0.8)',
}

const LEVEL_COLORS: Record<Level, string> = {
  Easy:   'rgba(34,197,94,0.8)',
  Medium: 'rgba(245,158,11,0.8)',
  Hard:   'rgba(239,68,68,0.8)',
}

const TIER_COLORS = {
  tier1: 'rgba(59,130,246,0.8)',
  tier2: 'rgba(168,85,247,0.8)',
  both:  'rgba(20,184,166,0.8)',
}

const PROB_COLORS: Record<string, string> = {
  'Hot':       'rgba(239,68,68,0.9)',
  'High':      'rgba(249,115,22,0.9)',
  'Confirmed': 'rgba(34,197,94,0.9)',
  'Recurring': 'rgba(139,92,246,0.9)',
}

export default function Analytics() {
  /* ── Question type distribution ──────────────────────────────────── */
  const qtypeCounts = useMemo(() => {
    const counts: Partial<Record<EnglishQType, number>> = {}
    englishQuestions.forEach(q => { counts[q.qtype] = (counts[q.qtype] || 0) + 1 })
    return counts
  }, [])

  const qtypeLabels = Object.keys(qtypeCounts) as EnglishQType[]
  const qtypeDonutData = {
    labels: qtypeLabels.map(k => QTYPE_LABELS[k]),
    datasets: [{
      data: qtypeLabels.map(k => qtypeCounts[k]!),
      backgroundColor: qtypeLabels.map(k => QTYPE_COLORS[k]),
      borderWidth: 0,
    }],
  }

  /* ── Level distribution ──────────────────────────────────────────── */
  const levelCounts = useMemo(() => {
    const counts: Record<Level, number> = { Easy: 0, Medium: 0, Hard: 0 }
    englishQuestions.forEach(q => { counts[q.level]++ })
    return counts
  }, [])

  const levels = Object.keys(levelCounts) as Level[]
  const levelBarData = {
    labels: levels,
    datasets: [{
      label: 'Questions',
      data: levels.map(l => levelCounts[l]),
      backgroundColor: levels.map(l => LEVEL_COLORS[l]),
      borderRadius: 8,
      borderSkipped: false as const,
    }],
  }

  /* ── Tier distribution ───────────────────────────────────────────── */
  const tierCounts = useMemo(() => {
    const counts = { tier1: 0, tier2: 0, both: 0 }
    englishQuestions.forEach(q => { counts[q.tier]++ })
    return counts
  }, [])

  const tierDonutData = {
    labels: ['Tier 1', 'Tier 2', 'Both'],
    datasets: [{
      data: [tierCounts.tier1, tierCounts.tier2, tierCounts.both],
      backgroundColor: [TIER_COLORS.tier1, TIER_COLORS.tier2, TIER_COLORS.both],
      borderWidth: 0,
    }],
  }

  /* ── Exam probability distribution ───────────────────────────────── */
  const probCounts = useMemo(() => {
    const counts: Record<string, number> = { Hot: 0, High: 0, Confirmed: 0, Recurring: 0 }
    englishQuestions.forEach(q => { counts[q.examProb]++ })
    return counts
  }, [])

  const probBarData = {
    labels: Object.keys(probCounts),
    datasets: [{
      label: 'Questions',
      data: Object.values(probCounts),
      backgroundColor: Object.keys(probCounts).map(k => PROB_COLORS[k]),
      borderRadius: 8,
      borderSkipped: false as const,
    }],
  }

  const hotCount = englishQuestions.filter(q => q.examProb === 'Hot').length
  const confirmedCount = englishQuestions.filter(q => q.examProb === 'Confirmed').length

  return (
    <section id="eng-overview" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-rose-600 uppercase mb-1">Section 01</p>
          <h2 className="text-3xl font-extrabold text-brand-900">Coverage Analytics</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-2xl">
            {englishQuestions.length} questions + {vocabData.length} vocabulary entries across 14 question types — SSC CGL PYQs (2022-2024).
          </p>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { n: englishQuestions.length, label: 'Total Questions', color: 'bg-rose-50 border-rose-200', textColor: 'text-rose-700' },
            { n: vocabData.length, label: 'Vocab Entries', color: 'bg-indigo-50 border-indigo-200', textColor: 'text-indigo-700' },
            { n: hotCount, label: 'Hot Priority', color: 'bg-red-50 border-red-200', textColor: 'text-red-700' },
            { n: confirmedCount, label: 'Confirmed PYQ', color: 'bg-green-50 border-green-200', textColor: 'text-green-700' },
          ].map(s => (
            <div key={s.label} className={`rounded-2xl border p-4 text-center ${s.color}`}>
              <p className={`text-3xl font-extrabold ${s.textColor}`}>{s.n}</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doughnut: Question type distribution */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col items-center">
            <h3 className="text-sm font-bold text-slate-700 mb-4 self-start">Question Type Distribution</h3>
            <div className="h-64 w-64">
              <Doughnut data={qtypeDonutData} options={{
                responsive: true, maintainAspectRatio: false, cutout: '55%',
                plugins: { legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 10 } } },
              }} />
            </div>
          </div>

          {/* Bar: Difficulty level distribution */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-4">Difficulty Level Distribution</h3>
            <div className="h-60">
              <Bar data={levelBarData} options={{
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { grid: { display: false } }, y: { grid: { display: false } } },
              }} />
            </div>
          </div>

          {/* Doughnut: Tier distribution */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col items-center">
            <h3 className="text-sm font-bold text-slate-700 mb-4 self-start">Tier Distribution</h3>
            <div className="h-52 w-52">
              <Doughnut data={tierDonutData} options={{
                responsive: true, maintainAspectRatio: false, cutout: '65%',
                plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } },
              }} />
            </div>
          </div>

          {/* Bar: Exam probability distribution */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-4">Exam Probability Distribution</h3>
            <div className="h-60">
              <Bar data={probBarData} options={{
                responsive: true, maintainAspectRatio: false, indexAxis: 'y',
                plugins: { legend: { display: false } },
                scales: { x: { grid: { display: false } }, y: { grid: { display: false } } },
              }} />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
