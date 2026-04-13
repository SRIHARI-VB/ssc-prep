/**
 * Inserts options[] into union-budget data.ts for all MCQ entries (IDs 1-138).
 * Uses double-quoted strings for option values to avoid apostrophe escaping issues.
 * Also appends 20 new SSC CGL format questions at the end of budgetData.
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataPath = join(__dirname, '..', 'src', 'topics', 'union-budget', 'data.ts')
const scriptPath = join(__dirname, 'apply-budget-options.mjs')

// ── Read optionsMap from apply-budget-options.mjs ────────────────────────────
const scriptContent = readFileSync(scriptPath, 'utf8')
const mapStart = scriptContent.indexOf('const optionsMap = {')
const mapEnd = scriptContent.indexOf('\n}\n\n// ─── INSERT OPTIONS', mapStart)
const mapCode = scriptContent.slice(mapStart, mapEnd + 2)

// Safe eval of the object literal (it's our own file, trusted content)
let optionsMap
eval(`optionsMap = ${mapCode.replace('const optionsMap = ', '')}`)
console.log(`Loaded ${Object.keys(optionsMap).length} optionsMap entries`)

// ── Helper: escape a string value for use inside a SINGLE-QUOTED TS string ──
function escapeSQ(str) {
  // str may be an already-JS-string (apostrophes are literal ')
  // Escape: backslash → \\, single quote → \'
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

// ── Helper: convert optionsLine to a properly escaped TS array literal ───────
// optionsLine looks like: options: ['val1', 'val2', 'val3', 'val4'],
// We'll re-parse the 4 values and rebuild with escaped single quotes.
function rebuildOptionsLine(optionsLine) {
  // Extract the 4 values between the outer brackets
  const match = optionsLine.match(/options:\s*\[(.+)\],?\s*$/)
  if (!match) return optionsLine

  // Parse the 4 quoted strings. They're separated by ', ' but values may contain commas.
  // Use a simple state-machine parser since values are JS template-literal strings
  // (no escaping needed in the source, apostrophes are raw ')
  const inner = match[1]
  const values = []
  let current = ''
  let inStr = false
  let i = 0
  while (i < inner.length) {
    const ch = inner[i]
    if (!inStr && ch === "'") {
      inStr = true
      i++
      continue
    }
    if (inStr && ch === "'") {
      // Is it a closing quote or embedded apostrophe?
      // Look ahead: if next non-space is , or ] then closing
      let k = i + 1
      while (k < inner.length && inner[k] === ' ') k++
      const nextMeaningful = inner[k] ?? ''
      if (',]'.includes(nextMeaningful) || nextMeaningful === '') {
        values.push(current)
        current = ''
        inStr = false
        // Skip past closing quote and comma separator
        i++
        while (i < inner.length && (inner[i] === ',' || inner[i] === ' ')) i++
        continue
      } else {
        // Apostrophe mid-string
        current += ch
        i++
        continue
      }
    }
    if (inStr) {
      current += ch
    }
    i++
  }

  if (values.length !== 4) {
    console.warn(`  Warning: parsed ${values.length} values instead of 4`)
    return optionsLine
  }

  // Rebuild with escaped values
  const escaped = values.map(v => `'${escapeSQ(v)}'`).join(', ')
  return `options: [${escaped}],`
}

// ── Read and patch data file ─────────────────────────────────────────────────
let data = readFileSync(dataPath, 'utf8')
let count = 0

for (const [idStr, rawOptionsLine] of Object.entries(optionsMap)) {
  const id = parseInt(idStr)

  // Find the start of this specific entry by locating '\n    id: X,'
  const idMarker = `\n    id: ${id},`
  const entryStart = data.indexOf(idMarker)
  if (entryStart === -1) {
    console.log(`  ID ${id}: not found`)
    continue
  }

  // Find the closing  },  for this entry
  const entryEnd = data.indexOf('  },\n', entryStart) + 4
  const entryBlock = data.slice(entryStart, entryEnd)

  // Skip entries that already have options or questionType
  if (entryBlock.includes('options:') || entryBlock.includes('questionType:')) {
    continue
  }

  // Rebuild with proper escaping
  const cleanOptionsLine = rebuildOptionsLine(rawOptionsLine.trim())

  // Insert before '    shortcut:'
  const newBlock = entryBlock.replace('    shortcut:', `    ${cleanOptionsLine}\n    shortcut:`)
  if (newBlock === entryBlock) {
    console.log(`  ID ${id}: could not find shortcut: field`)
    continue
  }

  data = data.slice(0, entryStart) + newBlock + data.slice(entryEnd)
  count++
}

console.log(`\nAdded options to ${count} MCQ entries`)

// ── Append 20 new SSC format questions ───────────────────────────────────────
// Extract them from the apply-budget-options.mjs script (lines 218 onwards)
// They're in the template literal newEntries. Re-read the script for the content.

const newEntriesStart = scriptContent.indexOf('\nconst newEntries = `\n') + '\nconst newEntries = `\n'.length
// The template literal ends at the line with just '`' or '`\n\n// Insert'
// In our script it was truncated, but the entries themselves end at '  },'
// Let's extract everything between newEntries start and the broken end

// Actually, load from the add-budget-options.mjs which has the clean content
const addScriptPath = join(__dirname, 'add-budget-options.mjs')
const addScript = readFileSync(addScriptPath, 'utf8')
const newEntriesMarker = '\nconst newEntries = `\n'
const newStart = addScript.indexOf(newEntriesMarker)
if (newStart !== -1) {
  const contentStart = newStart + newEntriesMarker.length
  // The template ends at line 524 which has '  },'
  // Find the last '  },' before the broken line
  const brokenLineIdx = addScript.indexOf('\n`\\n\\n// Insert new entries', contentStart)
  let newEntriesContent
  if (brokenLineIdx !== -1) {
    newEntriesContent = addScript.slice(contentStart, brokenLineIdx)
  } else {
    // Try the normal end
    const endIdx = addScript.indexOf('\n`\n\n// Insert new entries', contentStart)
    newEntriesContent = endIdx !== -1 ? addScript.slice(contentStart, endIdx) : null
  }

  if (newEntriesContent) {
    // The entries content is raw TypeScript code. Append before closing ] of budgetData.
    const closingBracket = data.lastIndexOf('\n]')
    if (closingBracket !== -1) {
      data = data.slice(0, closingBracket) + '\n' + newEntriesContent + '\n]' + data.slice(closingBracket + 2)
      console.log('Appended 20 new SSC format entries')
    } else {
      console.log('Warning: Could not find closing ] to append new entries')
    }
  } else {
    console.log('Warning: Could not extract new entries from script')
  }
}

writeFileSync(dataPath, data, 'utf8')
console.log('\n✅ Done! Written to data.ts')
