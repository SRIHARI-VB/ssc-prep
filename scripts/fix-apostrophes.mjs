/**
 * Fix unescaped apostrophes in single-quoted TypeScript string literals.
 * Targets: union-budget/data.ts
 *
 * Heuristic: inside a single-quoted string, any ' that is both:
 *   - preceded by a word character (\w)
 *   - followed by a word character (\w) or 's' + space/comma
 * is treated as a possessive apostrophe and escaped to \'
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const filePath = join(__dirname, '..', 'src', 'topics', 'union-budget', 'data.ts')

let content = readFileSync(filePath, 'utf8')

let fixCount = 0

// Process the entire content character by character
// Track: are we inside a single-quoted string?
let result = ''
let inSingleStr = false
let i = 0

while (i < content.length) {
  const ch = content[i]
  const prev = i > 0 ? content[i - 1] : ''
  const next = i + 1 < content.length ? content[i + 1] : ''

  // Handle escape sequences — skip over them
  if (ch === '\\' && (next === "'" || next === '"' || next === '\\' || next === 'n' || next === 't' || next === 'r')) {
    result += ch + next
    i += 2
    continue
  }

  if (ch === "'" && !inSingleStr) {
    // Opening single quote
    inSingleStr = true
    result += ch
    i++
    continue
  }

  if (ch === "'" && inSingleStr) {
    // Is this a closing quote or an apostrophe?
    // Check the NEXT character (after this quote)
    // If next is a word char (a-z, A-Z, 0-9, _), it's an apostrophe mid-word
    // Otherwise it's a closing quote

    if (/\w/.test(next)) {
      // It's a possessive/contraction apostrophe — escape it
      result += "\\'"
      fixCount++
    } else {
      // Closing quote
      inSingleStr = false
      result += ch
    }
    i++
    continue
  }

  // Template literals — skip content unchanged
  if (ch === '`' && !inSingleStr) {
    // Find the closing backtick, preserving everything
    result += ch
    i++
    while (i < content.length) {
      const c = content[i]
      if (c === '\\') {
        result += c + (content[i + 1] || '')
        i += 2
        continue
      }
      result += c
      i++
      if (c === '`') break
    }
    continue
  }

  // Double-quoted strings — skip content unchanged
  if (ch === '"' && !inSingleStr) {
    result += ch
    i++
    while (i < content.length) {
      const c = content[i]
      if (c === '\\') {
        result += c + (content[i + 1] || '')
        i += 2
        continue
      }
      result += c
      i++
      if (c === '"') break
    }
    continue
  }

  // Line comments — skip to end of line
  if (ch === '/' && next === '/' && !inSingleStr) {
    while (i < content.length && content[i] !== '\n') {
      result += content[i]
      i++
    }
    continue
  }

  result += ch
  i++
}

writeFileSync(filePath, result, 'utf8')
console.log(`Fixed ${fixCount} unescaped apostrophes`)
