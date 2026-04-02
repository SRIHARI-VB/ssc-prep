import type { Page } from '../../types'

const FOOTER_MSG: Record<Page, { sub: string; quote: string }> = {
  home:            { sub: 'SSC CGL Prep Hub', quote: '"Consistency beats intensity. One topic a day."' },
  'books-authors': { sub: 'Books & Authors', quote: '"Memory is a muscle. The Exam Loop is the workout."' },
  'science-tech':  { sub: 'Science & Technology', quote: '"Every equation is a story waiting to be recalled."' },
  'polity-constitution': { sub: 'Polity & Constitution', quote: '"Know the Article, own the answer. Constitution is the blueprint of India."' },
  'govt-schemes': { sub: 'Government Schemes', quote: '"Scheme name + Launch year + Ministry + Key number = Guaranteed marks."' },
  'union-budget': { sub: 'Union Budget 2025-26', quote: '"Budget size + Fiscal deficit + Tax slabs + New schemes = 3-4 guaranteed marks in GK."' },
  'geography': { sub: 'Geography', quote: '"River + Origin + Tributary + Dam = Geography questions decoded. Map is memory."' },
}

export default function Footer({ page }: { page: Page }) {
  const { sub, quote } = FOOTER_MSG[page]
  return (
    <footer className="bg-brand-900 border-t border-white/5 py-8 mt-4">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
        <p className="text-slate-400 text-sm font-medium">SSC CGL Prep Hub &mdash; {sub}</p>
        <p className="text-slate-600 text-xs italic">{quote}</p>
      </div>
    </footer>
  )
}
