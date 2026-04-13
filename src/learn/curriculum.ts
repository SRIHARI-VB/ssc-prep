/**
 * Learn Mode Curriculum
 *
 * Imports all 15 topic data files, filters for Hot + Confirmed entries,
 * normalizes them into LearnConcept[], and arranges them in pedagogical order.
 */

import type { Page } from '../types'
import type { LearnConcept, Chapter } from './types'

// ── GA Topics (standard shape: question/answer/detail/shortcut) ─────
import { econData } from '../topics/economics/data'
import { polityData } from '../topics/polity-constitution/data'
import { schemesData } from '../topics/govt-schemes/data'
import { budgetData } from '../topics/union-budget/data'
import { historyData } from '../topics/history/data'
import { geoData } from '../topics/geography/data'
import { sciData } from '../topics/science-tech/data'
import { riData } from '../topics/reports-indices/data'
import { miData } from '../topics/music-instruments/data'
import { danceData } from '../topics/dances/data'
import { sportsData } from '../topics/sports/data'

// ── Non-standard shapes ─────────────────────────────────────────────
import { booksData } from '../topics/books-authors/data'
import { mathsFormulaData, mathsPYQs } from '../topics/quantitative-aptitude/data'
import { reasoningConceptData, reasoningPYQs } from '../topics/logical-reasoning/data'
import { vocabData, grammarRules, englishQuestions } from '../topics/english/data'

// ── Adapters ────────────────────────────────────────────────────────

/** Standard GA adapter — works for topics that share question/answer/detail/shortcut shape */
function adaptStandardGA(
  data: Array<{
    id: number
    category?: string
    subject?: string
    topic: string
    question: string
    options?: string[] | readonly string[]
    answer: string
    detail?: string
    explanation?: string
    shortcut?: string
    mnemonic?: string
    context?: string
    examProb: string
  }>,
  slug: Page,
): LearnConcept[] {
  return data
    .filter(e => e.examProb === 'Hot' || e.examProb === 'Confirmed')
    .map(e => {
      const opts = e.options as [string, string, string, string] | undefined
      return {
        id: `${slug}-${e.id}`,
        sourceModule: slug,
        category: e.category || e.subject || '',
        title: e.topic,
        explanation: e.detail || e.explanation || '',
        memoryHook: e.shortcut || e.mnemonic || null,
        pyqContext: e.context || '',
        examProb: e.examProb as 'Hot' | 'Confirmed',
        checkQuestion: e.question,
        checkOptions: opts,
        checkAnswer: e.answer,
      }
    })
}

/** Books & Authors adapter */
function adaptBooks(): LearnConcept[] {
  return booksData
    .filter(e => e.examProb === 'Hot' || e.examProb === 'Confirmed')
    .map(e => ({
      id: `books-authors-${e.id}`,
      sourceModule: 'books-authors' as Page,
      category: e.category,
      title: `${e.title} — ${e.author}`,
      explanation: `${e.theme}${e.award !== 'N/A' && e.award !== '-' ? ` | Award: ${e.award}` : ''}${e.year ? ` | Year: ${e.year}` : ''}`,
      memoryHook: e.mnemonic || null,
      pyqContext: e.context || '',
      examProb: e.examProb as 'Hot' | 'Confirmed',
      checkQuestion: e.question || `Who wrote "${e.title}"?`,
      checkOptions: e.options || e.authorOptions,
      checkAnswer: e.answer || e.author,
    }))
}

/** Quantitative Aptitude adapter */
function adaptQA(): LearnConcept[] {
  // Build a map from topic → PYQ for comprehension checks
  const pyqByTopic = new Map<string, (typeof mathsPYQs)[0]>()
  for (const p of mathsPYQs) {
    if (!pyqByTopic.has(p.topic)) pyqByTopic.set(p.topic, p)
  }

  return mathsFormulaData
    .filter(e => e.examProb === 'Hot' || e.examProb === 'Confirmed')
    .map(e => {
      const pyq = pyqByTopic.get(e.topic)
      return {
        id: `quantitative-aptitude-${e.id}`,
        sourceModule: 'quantitative-aptitude' as Page,
        category: e.topic,
        title: e.title,
        explanation: `${e.formula}\n\n${e.detail}`,
        memoryHook: e.shortcut || null,
        pyqContext: pyq ? `${pyq.year} ${pyq.shift}` : '',
        examProb: e.examProb as 'Hot' | 'Confirmed',
        checkQuestion: pyq?.question,
        checkOptions: pyq?.options,
        checkAnswer: pyq?.answer,
      }
    })
}

/** Logical Reasoning adapter */
function adaptLR(): LearnConcept[] {
  const pyqByTopic = new Map<string, (typeof reasoningPYQs)[0]>()
  for (const p of reasoningPYQs) {
    if (!pyqByTopic.has(p.topic)) pyqByTopic.set(p.topic, p)
  }

  return reasoningConceptData
    .filter(e => e.examProb === 'Hot' || e.examProb === 'Confirmed')
    .map(e => {
      const pyq = pyqByTopic.get(e.topic)
      return {
        id: `logical-reasoning-${e.id}`,
        sourceModule: 'logical-reasoning' as Page,
        category: e.topic,
        title: e.title,
        explanation: `${e.method}\n\n${e.detail}`,
        memoryHook: e.shortcut || null,
        pyqContext: pyq ? `${pyq.year} ${pyq.shift}` : '',
        examProb: e.examProb as 'Hot' | 'Confirmed',
        checkQuestion: pyq?.question,
        checkOptions: pyq?.options,
        checkAnswer: pyq?.answer,
      }
    })
}

/** English Language adapter */
function adaptEnglish(): LearnConcept[] {
  // Vocab entries as concepts
  const vocabConcepts: LearnConcept[] = vocabData
    .filter(v => v.examProb === 'Hot' || v.examProb === 'Confirmed')
    .map(v => ({
      id: `english-vocab-${v.id}`,
      sourceModule: 'english' as Page,
      category: 'Vocabulary',
      title: `${v.word} (${v.pos})`,
      explanation: `${v.meaning}\n\nSynonyms: ${v.synonyms.join(', ')}\nAntonyms: ${v.antonyms.join(', ')}`,
      memoryHook: v.mnemonic || null,
      pyqContext: '',
      examProb: v.examProb as 'Hot' | 'Confirmed',
      checkQuestion: `What does "${v.word}" mean?`,
      checkAnswer: v.meaning,
    }))

  // Grammar rules as concepts
  const grammarConcepts: LearnConcept[] = grammarRules
    .filter(r => r.examProb === 'Hot' || r.examProb === 'Confirmed')
    .map(r => ({
      id: `english-grammar-${r.id}`,
      sourceModule: 'english' as Page,
      category: 'Grammar',
      title: `${r.topic}: ${r.rule}`,
      explanation: `Correct: ${r.correct}\nIncorrect: ${r.incorrect}\n\nTip: ${r.tip}`,
      memoryHook: r.tip,
      pyqContext: '',
      examProb: r.examProb as 'Hot' | 'Confirmed',
      checkQuestion: englishQuestions.find(q => q.grammarTopic === r.topic)?.question,
      checkOptions: englishQuestions.find(q => q.grammarTopic === r.topic)?.options,
      checkAnswer: englishQuestions.find(q => q.grammarTopic === r.topic)?.answer,
    }))

  return [...vocabConcepts, ...grammarConcepts]
}

// ── Chapter Definitions (pedagogical order) ─────────────────────────

export const chapters: Chapter[] = [
  {
    id: 'economics',
    title: 'Economics',
    description: 'GDP, National Income, Banking, Fiscal Policy — the foundation for Budget & Indices chapters',
    sourceModule: 'economics',
    icon: '📈',
    accent: 'cyan',
    concepts: adaptStandardGA(econData, 'economics'),
  },
  {
    id: 'polity',
    title: 'Polity & Constitution',
    description: 'Articles, Amendments, Constitutional Bodies — framework for understanding governance',
    sourceModule: 'polity-constitution',
    icon: '⚖️',
    accent: 'amber',
    concepts: adaptStandardGA(polityData, 'polity-constitution'),
  },
  {
    id: 'govt-schemes',
    title: 'Government Schemes',
    description: 'PM Awas, Ayushman Bharat, Jan Dhan — builds on polity (ministries & acts)',
    sourceModule: 'govt-schemes',
    icon: '🏛️',
    accent: 'emerald',
    concepts: adaptStandardGA(schemesData, 'govt-schemes'),
  },
  {
    id: 'union-budget',
    title: 'Union Budget',
    description: 'Tax slabs, fiscal deficit, allocations — builds on economics + polity context',
    sourceModule: 'union-budget',
    icon: '💰',
    accent: 'amber',
    concepts: adaptStandardGA(budgetData, 'union-budget'),
  },
  {
    id: 'history',
    title: 'History',
    description: 'Ancient to Modern India, Freedom Struggle, Art & Culture — chronological self-contained',
    sourceModule: 'history',
    icon: '📜',
    accent: 'amber',
    concepts: adaptStandardGA(historyData, 'history'),
  },
  {
    id: 'geography',
    title: 'Geography',
    description: 'Rivers, Mountains, Soils, National Parks, Agriculture, Minerals — spatial self-contained',
    sourceModule: 'geography',
    icon: '🌍',
    accent: 'emerald',
    concepts: adaptStandardGA(geoData, 'geography'),
  },
  {
    id: 'science-tech',
    title: 'Science & Technology',
    description: 'Physics, Chemistry, Biology, Space & Defence — self-contained factual recall',
    sourceModule: 'science-tech',
    icon: '🔬',
    accent: 'teal',
    concepts: adaptStandardGA(sciData, 'science-tech'),
  },
  {
    id: 'reports-indices',
    title: 'Reports & Indices',
    description: 'HDI, GHI, CPI, Innovation Index — needs economics context for understanding',
    sourceModule: 'reports-indices',
    icon: '📋',
    accent: 'violet',
    concepts: adaptStandardGA(riData, 'reports-indices'),
  },
  {
    id: 'books-authors',
    title: 'Books & Authors',
    description: 'Ancient texts, Freedom Struggle literature, Literary Awards — culture block begins',
    sourceModule: 'books-authors',
    icon: '📚',
    accent: 'indigo',
    concepts: adaptBooks(),
  },
  {
    id: 'music-instruments',
    title: 'Music & Instruments',
    description: 'Tata/Sushira/Avanaddha/Ghana, Gharanas, Carnatic Trinity, Awards',
    sourceModule: 'music-instruments',
    icon: '🎵',
    accent: 'rose',
    concepts: adaptStandardGA(miData, 'music-instruments'),
  },
  {
    id: 'dances',
    title: 'Dances',
    description: '8 Classical + State-wise Folk dances, UNESCO Heritage, Famous Dancers',
    sourceModule: 'dances',
    icon: '💃',
    accent: 'fuchsia',
    concepts: adaptStandardGA(danceData, 'dances'),
  },
  {
    id: 'sports',
    title: 'Sports',
    description: 'Rules, Player Counts, Olympics, Awards, Venues — current affairs heavy',
    sourceModule: 'sports',
    icon: '🏅',
    accent: 'orange',
    concepts: adaptStandardGA(sportsData, 'sports'),
  },
  {
    id: 'quantitative-aptitude',
    title: 'Quantitative Aptitude',
    description: 'Formulas, Geometry, Trigonometry, Number System — reference-style learning',
    sourceModule: 'quantitative-aptitude',
    icon: '📊',
    accent: 'blue',
    concepts: adaptQA(),
  },
  {
    id: 'logical-reasoning',
    title: 'Logical Reasoning',
    description: 'Methods, Patterns, Concept Cards — method-based learning',
    sourceModule: 'logical-reasoning',
    icon: '🧩',
    accent: 'emerald',
    concepts: adaptLR(),
  },
  {
    id: 'english',
    title: 'English Language',
    description: 'Vocabulary, Grammar Rules, Idioms, Comprehension — interactive practice-based learning',
    sourceModule: 'english',
    icon: '📖',
    accent: 'rose',
    concepts: adaptEnglish(),
  },
]

/** Flat list of all concepts for global operations */
export const allConcepts: LearnConcept[] = chapters.flatMap(ch => ch.concepts)

/** Total concept count */
export const totalConceptCount = allConcepts.length
