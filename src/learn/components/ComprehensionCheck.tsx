import { useState } from 'react'

interface Props {
  question: string
  options: [string, string, string, string]
  answer: string
}

export default function ComprehensionCheck({ question, options, answer }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const answered = selected !== null
  const isCorrect = selected === answer

  return (
    <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden">
      <p className="px-4 py-3 bg-slate-50 text-sm font-semibold text-slate-700 border-b border-slate-200">
        {question}
      </p>
      <div className="p-3 space-y-2">
        {options.map((opt, i) => {
          const letter = String.fromCharCode(65 + i)
          let cls = 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
          if (answered) {
            if (opt === answer) cls = 'border-emerald-400 bg-emerald-50 text-emerald-800'
            else if (opt === selected) cls = 'border-red-400 bg-red-50 text-red-800'
            else cls = 'border-slate-200 opacity-50'
          }
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => setSelected(opt)}
              className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${cls}`}
            >
              <span className="font-bold mr-2">{letter}.</span>
              {opt}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={`px-4 py-3 text-sm font-medium ${isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {isCorrect ? '✓ Correct!' : `✗ The correct answer is: ${answer}`}
        </div>
      )}
    </div>
  )
}
