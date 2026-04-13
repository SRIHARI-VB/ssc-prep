import type { Page } from '../../types'

const FOOTER_MSG: Record<Page, { sub: string; quote: string }> = {
  home:            { sub: 'SSC CGL Prep Hub', quote: '"Consistency beats intensity. One topic a day."' },
  'books-authors': { sub: 'Books & Authors', quote: '"Memory is a muscle. The Exam Loop is the workout."' },
  'science-tech':  { sub: 'Science & Technology', quote: '"Every equation is a story waiting to be recalled."' },
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
