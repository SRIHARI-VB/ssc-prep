import { useState } from 'react'
import type { Page } from './types'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import BooksAuthorsPage from './topics/books-authors'
import ScienceTechPage from './topics/science-tech'
import PolityConstitutionPage from './topics/polity-constitution'
import GovtSchemesPage from './topics/govt-schemes'
import UnionBudgetPage from './topics/union-budget'
import GeographyPage from './topics/geography'
import HistoryPage from './topics/history'
import EconomicsPage from './topics/economics'
import ReportsIndicesPage from './topics/reports-indices'
import MusicInstrumentsPage from './topics/music-instruments'
import DancesPage from './topics/dances'
import SportsPage from './topics/sports'
import QuantitativeAptitudePage from './topics/quantitative-aptitude'
import LogicalReasoningPage from './topics/logical-reasoning'
import EnglishPage from './topics/english'
import LearnPage from './pages/LearnPage'

export default function App() {
  const [page, setPage] = useState<Page>('home')

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header page={page} setPage={setPage} />
      <main className="flex-grow">
        {page === 'home'         && <Home setPage={setPage} />}
        {page === 'learn'        && <LearnPage />}
        {page === 'books-authors' && <BooksAuthorsPage />}
        {page === 'science-tech'  && <ScienceTechPage />}
        {page === 'polity-constitution' && <PolityConstitutionPage />}
        {page === 'govt-schemes' && <GovtSchemesPage />}
        {page === 'union-budget' && <UnionBudgetPage />}
        {page === 'geography' && <GeographyPage />}
        {page === 'history' && <HistoryPage />}
        {page === 'economics' && <EconomicsPage />}
        {page === 'reports-indices' && <ReportsIndicesPage />}
        {page === 'music-instruments' && <MusicInstrumentsPage />}
        {page === 'dances' && <DancesPage />}
        {page === 'sports' && <SportsPage />}
        {page === 'quantitative-aptitude' && <QuantitativeAptitudePage />}
        {page === 'logical-reasoning' && <LogicalReasoningPage />}
        {page === 'english' && <EnglishPage />}
      </main>
      <Footer page={page} />
    </div>
  )
}
