'use client'

import { TransactionsContext } from '@/context/TransactionsContext'
import { useContext } from 'react'

export function TitleWithCount() {
  const { totalTransactions } = useContext(TransactionsContext)

  return (
    <div className="wrapper flex items-center justify-between pt-8 lg:hidden">
      <h2>Transações</h2>
      <div className="text-gray-500">
        <span>{totalTransactions}</span>
        <span className="pl-2">
          {totalTransactions === 1 ? 'item' : 'itens'}
        </span>
      </div>
    </div>
  )
}
