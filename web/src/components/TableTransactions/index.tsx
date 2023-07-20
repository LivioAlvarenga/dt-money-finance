'use client'

import { TransactionsContext } from '@/context/TransactionsContext'
import {
  dateFormatter,
  priceFormatter,
  textTitleFormatter,
} from '@/utils/formatter'
import clsx from 'clsx'
import { Calendar, ChevronRightSquare, Trash2 } from 'lucide-react'
import { useContext } from 'react'

export function TableTransactions() {
  const { transactions, deleteTransaction } = useContext(TransactionsContext)

  function handleDeleteTransaction(id: number) {
    deleteTransaction(id)
  }

  return (
    <table className="min-h-[402px] w-full border-collapse border-spacing-x-2 overflow-hidden bg-gray-800">
      <tbody className="wrapper flex flex-col items-center justify-center gap-4 lg:gap-2">
        {transactions.map((transaction) => {
          return (
            <tr
              key={transaction.id}
              className="relative flex w-full flex-wrap justify-between rounded-md bg-gray-600 px-8 py-5 lg:flex-nowrap lg:items-center lg:justify-start"
            >
              <td className="mb-3 w-full lg:mb-0 lg:w-[45%]">
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
              <td className="absolute right-1 top-1 text-gray-500 duration-200 ease-linear lg:right-2 lg:top-1/2 lg:-translate-y-1/2 lg:text-gray-300 lg:hover:text-red-300">
                <button
                  onClick={() => handleDeleteTransaction(transaction.id)}
                  className="accessibilityFocus flex h-12 w-12 items-center justify-center rounded-md"
                >
                  <Trash2 size={20} className="" />
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
