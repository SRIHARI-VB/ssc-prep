/**
 * merge-english.mjs
 *
 * Merges 4 batch question files into the main English data.ts.
 * Keeps: type definitions, vocabData, grammarRules, englishPYQHistory
 * Replaces: englishQuestions (with batch1-4 merged), passages (with batch4 passages)
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const dataPath = resolve(root, 'src/topics/english/data.ts')
const batch1Path = resolve(root, 'scripts/eng_q_batch1.ts')
const batch2Path = resolve(root, 'scripts/eng_q_batch2.ts')
const batch3Path = resolve(root, 'scripts/eng_q_batch3.ts')
const batch4Path = resolve(root, 'scripts/eng_q_batch4.ts')

// ── Read data.ts lines ──────────────────────────────────────────────────
const dataLines = readFileSync(dataPath, 'utf-8').split('\n')

// Find key line numbers (0-indexed)
function findLine(lines, pattern) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(pattern)) return i
  }
  throw new Error(`Pattern not found: ${pattern}`)
}

const englishQuestionsStart = findLine(dataLines, /^export const englishQuestions/)
const passagesStart = findLine(dataLines, /^export const passages/)
const pyqHistoryStart = findLine(dataLines, /^export const englishPYQHistory/)

// Find the comment lines above each section to keep them
// englishQuestions section starts 2 lines before (comment line)
const eqCommentStart = findLine(dataLines, /── English Questions/)
const passagesCommentStart = findLine(dataLines, /── Passages ─/)
const pyqCommentStart = findLine(dataLines, /── PYQ History ─/)

// Find closing bracket of englishQuestions (line with just ']')
function findClosingBracket(lines, startIdx) {
  for (let i = startIdx; i < lines.length; i++) {
    if (lines[i].trim() === ']') return i
  }
  throw new Error(`Closing bracket not found starting from line ${startIdx}`)
}

const englishQuestionsEnd = findClosingBracket(dataLines, englishQuestionsStart)
const passagesEnd = findClosingBracket(dataLines, passagesStart)

// ── Extract kept sections ───────────────────────────────────────────────
// Everything from start up to (but not including) the englishQuestions comment
const headerSection = dataLines.slice(0, eqCommentStart).join('\n')
// Everything from PYQ comment to end of file
const pyqSection = dataLines.slice(pyqCommentStart).join('\n')

// ── Parse batch files ───────────────────────────────────────────────────
// We'll extract the array content from each batch file using eval-like approach
// Since these are TS files with type annotations, we need to strip those

function extractArrayFromFile(filePath, varName) {
  let content = readFileSync(filePath, 'utf-8')
  // Remove import lines
  content = content.replace(/^import\s+.*$/gm, '')
  // Replace ALL "export const X: Type[] =" with "const X ="
  content = content.replace(/export\s+const\s+(\w+)\s*:\s*[^=]+=\s*/g, 'const $1 = ')
  // Replace ALL remaining "export const X =" with "const X ="
  content = content.replace(/export\s+const\s+(\w+)\s*=/g, 'const $1 =')
  // Remove 'as const' casts
  content = content.replace(/\bas\s+const\b/g, '')
  // Evaluate and return
  const fn = new Function(`${content}\nreturn ${varName};`)
  return fn()
}

console.log('Extracting batch1...')
const batch1 = extractArrayFromFile(batch1Path, 'batch1')
console.log(`  batch1: ${batch1.length} questions`)

console.log('Extracting batch2...')
const batch2 = extractArrayFromFile(batch2Path, 'batch2')
console.log(`  batch2: ${batch2.length} questions`)

console.log('Extracting batch3...')
const batch3 = extractArrayFromFile(batch3Path, 'batch3')
console.log(`  batch3: ${batch3.length} questions`)

console.log('Extracting batch4 questions...')
const batch4 = extractArrayFromFile(batch4Path, 'batch4')
console.log(`  batch4: ${batch4.length} questions`)

console.log('Extracting passages...')
const passages = extractArrayFromFile(batch4Path, 'passages_batch')
console.log(`  passages: ${passages.length} passages`)

// ── Merge and re-id questions ───────────────────────────────────────────
const allQuestions = [...batch1, ...batch2, ...batch3, ...batch4]

// Normalize: ensure required fields have defaults
for (const q of allQuestions) {
  if (!q.tier) q.tier = 'both'
  if (!q.examProb) q.examProb = 'Hot'
}

console.log(`\nTotal merged questions: ${allQuestions.length}`)
console.log(`Total passages: ${passages.length}`)

// ── Serialize to TypeScript ─────────────────────────────────────────────
function serializeValue(val) {
  if (val === undefined) return undefined
  if (val === null) return 'null'
  if (typeof val === 'number') return String(val)
  if (typeof val === 'boolean') return String(val)
  if (typeof val === 'string') return JSON.stringify(val)
  if (Array.isArray(val)) {
    if (val.every(v => typeof v === 'string')) {
      return `[${val.map(v => JSON.stringify(v)).join(', ')}]`
    }
    if (val.every(v => typeof v === 'number')) {
      return `[${val.join(', ')}]`
    }
    return JSON.stringify(val)
  }
  return JSON.stringify(val)
}

function serializeQuestion(q) {
  const fields = [
    `id: ${q.id}`,
    `qtype: ${JSON.stringify(q.qtype)}`,
    `question: ${JSON.stringify(q.question)}`,
    `options: [${q.options.map(o => JSON.stringify(o)).join(', ')}]`,
    `answer: ${JSON.stringify(q.answer)}`,
    `explanation: ${JSON.stringify(q.explanation)}`,
    `level: ${JSON.stringify(q.level)}`,
    `tier: ${JSON.stringify(q.tier)}`,
    `examProb: ${JSON.stringify(q.examProb)}`,
  ]
  // Optional fields
  for (const key of ['hint', 'ruleNote', 'passageId', 'grammarTopic', 'topic', 'ruleTag']) {
    if (q[key] !== undefined) {
      fields.push(`${key}: ${serializeValue(q[key])}`)
    }
  }
  return `  { ${fields.join(', ')} }`
}

function serializePassage(p) {
  const fields = [
    `    id: ${p.id}`,
    `    title: ${JSON.stringify(p.title)}`,
    `    text: ${JSON.stringify(p.text)}`,
    `    type: ${JSON.stringify(p.type)}`,
    `    level: ${JSON.stringify(p.level)}`,
    `    questionIds: [${p.questionIds.join(', ')}]`,
  ]
  return `  {\n${fields.join(',\n')},\n  }`
}

// ── Build output ────────────────────────────────────────────────────────
const questionsBlock = allQuestions.map(serializeQuestion).join(',\n')
const passagesBlock = passages.map(serializePassage).join(',\n')

const output = [
  headerSection,
  '// ── English Questions (MCQ) ────────────────────────────────────────────',
  '',
  `export const englishQuestions: EnglishQuestion[] = [`,
  questionsBlock,
  `]`,
  '',
  '// ── Passages ───────────────────────────────────────────────────────────',
  '',
  `export const passages: PassageEntry[] = [`,
  passagesBlock,
  `]`,
  '',
  pyqSection,
].join('\n')

writeFileSync(dataPath, output, 'utf-8')

console.log(`\nWrote ${dataPath}`)
console.log('Done!')
