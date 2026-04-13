import type { Page } from '../../types'

const FOOTER_MSG: Record<Page, { sub: string; quote: string }> = {
  home:            { sub: 'SSC CGL Prep Hub', quote: '"Consistency beats intensity. One topic a day."' },
  'learn':         { sub: 'Learn Mode', quote: '"Read → Understand → Review every 3 days. The concept sticks forever."' },
  'books-authors': { sub: 'Books & Authors', quote: '"Memory is a muscle. The Exam Loop is the workout."' },
  'science-tech':  { sub: 'Science & Technology', quote: '"Every equation is a story waiting to be recalled."' },
  'polity-constitution': { sub: 'Polity & Constitution', quote: '"Know the Article, own the answer. Constitution is the blueprint of India."' },
  'govt-schemes': { sub: 'Government Schemes', quote: '"Scheme name + Launch year + Ministry + Key number = Guaranteed marks."' },
  'union-budget': { sub: 'Union Budget 2025-26', quote: '"Budget size + Fiscal deficit + Tax slabs + New schemes = 3-4 guaranteed marks in GK."' },
  'geography': { sub: 'Geography', quote: '"River + Origin + Tributary + Dam = Geography questions decoded. Map is memory."' },
  'history': { sub: 'History', quote: '"Person + Event + Year + Place = History questions decoded. Timeline is memory."' },
  'economics': { sub: 'Economics', quote: '"GDP formula + RBI tools + GST slabs + FYP number = Economics questions decoded. Numbers are memory."' },
  'reports-indices': { sub: 'Reports & Indices', quote: '"Index + Org + India Rank + Year = Guaranteed marks. Track the numbers, own the answer."' },
  'music-instruments': { sub: 'Music & Instruments', quote: '"Instrument + Type + Player + State = Music decoded. Hear the name, see the map."' },
  'dances': { sub: 'Dances', quote: '"Dance + State + Guru + Costume = Culture decoded. Visualize the map, recall the answer."' },
  'sports': { sub: 'Sports', quote: '"Sport + Rule + Medal + Venue = Sports decoded. Know the event, own the marks."' },
  'quantitative-aptitude': { sub: 'Quantitative Aptitude', quote: '"Formula recalled in 3 seconds = 2 marks earned. Squares, Cubes, Shortcuts — drill until automatic."' },
  'logical-reasoning': { sub: 'Logical Reasoning', quote: '"Pattern spotted in 5 seconds = 2 marks earned. Method first, answer follows."' },
  'english': { sub: 'English Language', quote: '"Grammar rule recalled in 3 seconds = 2 marks earned. Fix sentences, build vocabulary, own the section."' },
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
