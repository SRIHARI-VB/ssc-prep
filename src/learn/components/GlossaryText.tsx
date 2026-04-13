import { useMemo } from 'react'
import type { GlossaryEntry } from '../types'

interface Props {
  text: string
  glossary: GlossaryEntry[]
  onTermClick: (entry: GlossaryEntry) => void
}

interface TextSegment {
  type: 'text' | 'term'
  value: string
  entry?: GlossaryEntry
}

/**
 * Renders text with auto-linked glossary terms.
 * Uses longest-match-first strategy to avoid partial matches.
 */
export default function GlossaryText({ text, glossary, onTermClick }: Props) {
  const segments = useMemo(() => {
    if (!glossary.length || !text) return [{ type: 'text' as const, value: text }]

    // Build sorted terms list (longest first to prevent partial matches)
    const termMap = new Map<string, GlossaryEntry>()
    for (const entry of glossary) {
      termMap.set(entry.term.toLowerCase(), entry)
      if (entry.aliases) {
        for (const alias of entry.aliases) {
          termMap.set(alias.toLowerCase(), entry)
        }
      }
    }

    const sortedTerms = [...termMap.keys()].sort((a, b) => b.length - a.length)

    // Filter out very short terms (<=2 chars) to prevent false positives
    const filteredTerms = sortedTerms.filter(t => t.length > 2)

    // Build regex pattern with word boundaries
    const escaped = filteredTerms.map(t => {
      const esc = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      // Use word boundaries for short terms (< 5 chars like GDP, RBI, CPI)
      return t.length < 5 ? `\\b${esc}\\b` : esc
    })
    if (!escaped.length) return [{ type: 'text' as const, value: text }]

    const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')

    const result: TextSegment[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = pattern.exec(text)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        result.push({ type: 'text', value: text.slice(lastIndex, match.index) })
      }
      const entry = termMap.get(match[1].toLowerCase())
      if (entry) {
        result.push({ type: 'term', value: match[1], entry })
      } else {
        result.push({ type: 'text', value: match[1] })
      }
      lastIndex = pattern.lastIndex
    }

    // Add remaining text
    if (lastIndex < text.length) {
      result.push({ type: 'text', value: text.slice(lastIndex) })
    }

    return result
  }, [text, glossary])

  return (
    <span>
      {segments.map((seg, i) =>
        seg.type === 'term' && seg.entry ? (
          <button
            key={i}
            onClick={() => onTermClick(seg.entry!)}
            className="text-indigo-600 underline decoration-dotted decoration-indigo-400/50 underline-offset-2 hover:text-indigo-800 hover:decoration-indigo-600 transition-colors cursor-pointer"
          >
            {seg.value}
          </button>
        ) : (
          <span key={i}>{seg.value}</span>
        )
      )}
    </span>
  )
}
