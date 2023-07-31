import { NewTransactionButton } from '@/components/NewTransactionButton'
import { SearchForm } from '@/components/SearchForm'
import { Summary } from '@/components/Summary'
import { TableTransactions } from '@/components/TableTransactions'
import { TitleWithCount } from '@/components/TitleWithCount'
import { TransactionsPagination } from '@/components/TransactionsPagination'
import { Toaster } from 'react-hot-toast'

export default function Transactions() {
  const textShadow = {
    color: '#ffffff',
    textShadow:
      '0 0 10px #26a9e0, 0 0 20px #26a9e0, 0 0 40px #26a9e0, 0 0 80px #26a9e0',
  }

  return (
    <main className="flex flex-col items-start justify-start">
      <h1 className="wrapper headline6 sm:headline4 lg:headline3 mb-0 mt-5 text-center font-playfair400 text-tGray lg:max-w-7xl">
        Projeto de <b style={textShadow}>DT Money Gestão Financeira</b> com
        Nextjs 13 App Router, React, Typescript e Tailwindcss.
      </h1>
      <NewTransactionButton />
      <Summary />
      <div className="flex w-full flex-col gap-7 bg-gray-800 pt-24">
        {/* title */}
        <TitleWithCount />

        {/* search form */}
        <SearchForm />

        {/* table */}
        <TableTransactions />

        {/* pagination */}
        <TransactionsPagination />

        <div className="flex justify-center lg:hidden">
          <span className="h-[6px] w-1/3 rounded-md bg-gray-600" />
        </div>
      </div>
      <Toaster position="bottom-center" aria-live="assertive" />
    </main>
  )
}
