'use client'

import { SearchForm } from '@/components/SearchForm'
import { Summary } from '@/components/Summary'
import { TransactionsPagination } from '@/components/TransactionsPagination'
import { TransactionsContext } from '@/context/TransactionsContext'
import {
  dateFormatter,
  priceFormatter,
  textTitleFormatter,
} from '@/utils/formatter'
import clsx from 'clsx'
import { Calendar, ChevronRightSquare } from 'lucide-react'
import { useContext } from 'react'

export default function Transactions() {
  const textShadow = {
    color: '#ffffff',
    textShadow:
      '0 0 10px #26a9e0, 0 0 20px #26a9e0, 0 0 40px #26a9e0, 0 0 80px #26a9e0',
  }

  const { transactions } = useContext(TransactionsContext)

  return (
    <main className="flex flex-col items-start justify-start">
      <h1 className="wrapper headline6 sm:headline4 lg:headline3 mb-0 mt-5 text-center font-playfair400 text-tGray lg:max-w-7xl">
        Projeto de <b style={textShadow}>DT Money Gestão Financeira</b> com
        Nextjs 13 App Router, React, Typescript e Tailwindcss.
      </h1>
      <Summary />
      <div className="flex w-full flex-col gap-7 bg-gray-800 pt-24">
        {/* title */}
        <div className="wrapper flex items-center justify-between pt-8 lg:hidden">
          <h2>Transações</h2>
          <div className="text-gray-500">
            <span>4</span>
            <span className="pl-2">itens</span> {/* TODO verify if is plural */}
          </div>
        </div>

        {/* search form */}
        <SearchForm />

        {/* table */}
        <table className="min-h-[402px] w-full border-collapse border-spacing-x-2 overflow-hidden bg-gray-800">
          <tbody className="wrapper flex flex-col items-center justify-center gap-4 lg:gap-2">
            {transactions.map((transaction) => {
              return (
                <tr
                  key={transaction.id}
                  className="flex w-full flex-wrap justify-between rounded-md bg-gray-600 px-8 py-5 lg:flex-nowrap lg:items-center lg:justify-start"
                >
                  <td className="mb-3 w-full lg:mb-0 lg:w-1/2">
                    {textTitleFormatter(transaction.description)}
                  </td>
                  <td
                    className={clsx(
                      'headline6 lg:body1 mb-5 w-full font-inter700 lg:mb-0 lg:w-[20%] lg:font-inter400',
                      {
                        'text-red-300': transaction.type === 'outcome',
                        'text-green-500': transaction.type === 'income',
                      },
                    )}
                  >
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter(transaction.price)}
                  </td>
                  <td className="flex items-center gap-2 text-gray-500 lg:w-[20%] lg:text-gray-300">
                    <ChevronRightSquare size={16} className="lg:hidden" />
                    {textTitleFormatter(transaction.category)}
                  </td>
                  <td className="flex items-center gap-2 text-gray-500 lg:w-[10%] lg:text-gray-300">
                    <Calendar size={16} className="lg:hidden" />
                    {dateFormatter(transaction.createdAt)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* pagination */}
        <TransactionsPagination />

        <div className="flex justify-center lg:hidden">
          <span className="h-[6px] w-1/3 rounded-md bg-gray-600" />
        </div>
      </div>
    </main>
  )
}
