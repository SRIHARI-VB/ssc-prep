import { useEffect, useRef } from 'react'
import type { GlossaryEntry } from '../types'

interface Props {
  entry: GlossaryEntry | null
  onClose: () => void
  onNavigate: (term: string) => void
}

const TYPE_BADGE: Record<string, { label: string; cls: string }> = {
  award:        { label: 'Award',        cls: 'bg-amber-100 text-amber-700 border-amber-300' },
  organization: { label: 'Organization', cls: 'bg-blue-100 text-blue-700 border-blue-300' },
  person:       { label: 'Person',       cls: 'bg-violet-100 text-violet-700 border-violet-300' },
  technical:    { label: 'Technical',    cls: 'bg-teal-100 text-teal-700 border-teal-300' },
  place:        { label: 'Place',        cls: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
}

export default function GlossaryDrawer({ entry, onClose, onNavigate }: Props) {
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    if (!entry) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [entry, onClose])

  // Click outside to close
  useEffect(() => {
    if (!entry) return
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) onClose()
    }
    setTimeout(() => window.addEventListener('mousedown', handler), 10)
    return () => window.removeEventListener('mousedown', handler)
  }, [entry, onClose])

  if (!entry) return null

  const badge = TYPE_BADGE[entry.type] || TYPE_BADGE.technical

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40 transition-opacity" />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in-right"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-5 py-4 flex items-start justify-between">
          <div>
            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.cls} mb-2`}>
              {badge.label}
            </span>
            <h3 className="text-lg font-extrabold text-brand-900">{entry.term}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-5">
          <p className="text-sm text-slate-700 leading-relaxed">{entry.brief}</p>

          {entry.established && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-600">Established:</span>
              {entry.established}
            </div>
          )}

          {entry.related && entry.related.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2">Related Terms</p>
              <div className="flex flex-wrap gap-2">
                {entry.related.map(r => (
                  <button
                    key={r}
                    onClick={() => onNavigate(r)}
                    className="text-xs px-3 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          {entry.aliases && entry.aliases.length > 0 && (
            <div className="text-xs text-slate-400">
              Also known as: {entry.aliases.join(', ')}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.2s ease-out;
        }
      `}</style>
    </>
  )
}
