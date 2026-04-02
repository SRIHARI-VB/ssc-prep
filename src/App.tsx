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

export default function App() {
  const [page, setPage] = useState<Page>('home')

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header page={page} setPage={setPage} />
      <main className="flex-grow">
        {page === 'home'         && <Home setPage={setPage} />}
        {page === 'books-authors' && <BooksAuthorsPage />}
        {page === 'science-tech'  && <ScienceTechPage />}
        {page === 'polity-constitution' && <PolityConstitutionPage />}
        {page === 'govt-schemes' && <GovtSchemesPage />}
        {page === 'union-budget' && <UnionBudgetPage />}
      </main>
      <Footer page={page} />
    </div>
  )
}
