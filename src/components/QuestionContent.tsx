import type { QuestionType } from '../sscQuestionTypes'

interface Props {
  question: string
  questionType?: QuestionType
  statements?: string[]
  assertion?: string
  reason?: string
  matchLeft?: string[]
  matchRight?: string[]
}

const TYPE_BADGE: Record<string, { label: string; cls: string }> = {
  'multi-statement': { label: 'Multi-Statement', cls: 'bg-blue-100 text-blue-700 border-blue-300' },
  'assertion-reason': { label: 'Assertion-Reason', cls: 'bg-purple-100 text-purple-700 border-purple-300' },
  'match-following': { label: 'Match the Following', cls: 'bg-teal-100 text-teal-700 border-teal-300' },
  'sequence': { label: 'Arrange in Order', cls: 'bg-green-100 text-green-700 border-green-300' },
}

export default function QuestionContent({
  question,
  questionType,
  statements,
  assertion,
  reason,
  matchLeft,
  matchRight,
}: Props) {

  const badge = questionType && questionType !== 'mcq' ? TYPE_BADGE[questionType] : null

  // ── Multi-Statement ──────────────────────────────────────────────────────────
  if (questionType === 'multi-statement' && statements && statements.length > 0) {
    return (
      <div className="mb-5">
        {badge && (
          <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full border mb-3 ${badge.cls}`}>
            📋 {badge.label}
          </span>
        )}
        <div className="space-y-2 mb-4">
          {statements.map((stmt, i) => (
            <div key={i} className="flex gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-xs font-extrabold text-blue-700 shrink-0 mt-0.5 w-5">S{i + 1}</span>
              <p className="text-sm text-slate-700 leading-relaxed">{stmt}</p>
            </div>
          ))}
        </div>
        <p className="text-sm font-bold text-slate-800 leading-relaxed">{question}</p>
      </div>
    )
  }

  // ── Assertion-Reason ─────────────────────────────────────────────────────────
  if (questionType === 'assertion-reason' && assertion && reason) {
    return (
      <div className="mb-5">
        {badge && (
          <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full border mb-3 ${badge.cls}`}>
            🔬 {badge.label}
          </span>
        )}
        <div className="space-y-2 mb-4">
          <div className="flex gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <span className="text-xs font-extrabold text-purple-700 shrink-0 mt-0.5 w-5">A</span>
            <div>
              <p className="text-xs font-bold text-purple-600 mb-0.5">Assertion</p>
              <p className="text-sm text-slate-700 leading-relaxed">{assertion}</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-xs font-extrabold text-amber-700 shrink-0 mt-0.5 w-5">R</span>
            <div>
              <p className="text-xs font-bold text-amber-600 mb-0.5">Reason</p>
              <p className="text-sm text-slate-700 leading-relaxed">{reason}</p>
            </div>
          </div>
        </div>
        <p className="text-sm font-bold text-slate-800 leading-relaxed">{question}</p>
      </div>
    )
  }

  // ── Match the Following ──────────────────────────────────────────────────────
  if (questionType === 'match-following' && matchLeft && matchRight) {
    return (
      <div className="mb-5">
        {badge && (
          <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full border mb-3 ${badge.cls}`}>
            🔗 {badge.label}
          </span>
        )}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <p className="text-xs font-extrabold text-slate-500 mb-2 uppercase tracking-wide">Column A</p>
            <div className="space-y-1.5">
              {matchLeft.map((item, i) => (
                <div key={i} className="flex gap-2 p-2 bg-teal-50 border border-teal-200 rounded-lg">
                  <span className="text-xs font-bold text-teal-700 shrink-0">{i + 1}.</span>
                  <p className="text-xs text-slate-700 leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-extrabold text-slate-500 mb-2 uppercase tracking-wide">Column B</p>
            <div className="space-y-1.5">
              {matchRight.map((item, i) => (
                <div key={i} className="flex gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-xs font-bold text-slate-600 shrink-0">{String.fromCharCode(97 + i)}.</span>
                  <p className="text-xs text-slate-700 leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm font-bold text-slate-800 leading-relaxed">{question}</p>
      </div>
    )
  }

  // ── Sequence / Chronological ─────────────────────────────────────────────────
  if (questionType === 'sequence' && statements && statements.length > 0) {
    return (
      <div className="mb-5">
        {badge && (
          <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full border mb-3 ${badge.cls}`}>
            🔢 {badge.label}
          </span>
        )}
        <div className="space-y-1.5 mb-4">
          {statements.map((item, i) => (
            <div key={i} className="flex gap-3 p-2.5 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-xs font-extrabold text-green-700 shrink-0 w-5">{i + 1}.</span>
              <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
        <p className="text-sm font-bold text-slate-800 leading-relaxed">{question}</p>
      </div>
    )
  }

  // ── Default: plain MCQ ───────────────────────────────────────────────────────
  return (
    <h3 className="text-base font-bold text-slate-800 leading-relaxed mb-5">{question}</h3>
  )
}
