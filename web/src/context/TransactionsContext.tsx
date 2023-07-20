'use client'

import { api } from '@/lib/axios'
import React, { ReactNode, createContext, useEffect, useState } from 'react'

interface TransactionProps {
  id: number
  description: string
  price: number
  type: 'income' | 'outcome'
  category: string
  createdAt: string
}

interface CreateTransactionInputProps {
  description: string
  price: number
  type: 'income' | 'outcome'
  category: string
}

interface TransactionContextType {
  transactions: TransactionProps[]
  fetchTransactions: (
    page?: number,
    limit?: number,
    search?: string,
  ) => Promise<void>
  createTransaction: (transaction: CreateTransactionInputProps) => Promise<void>
  nextPage: (page: number) => void
  prevPage: (page: number) => void
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageList: number[]
  currentPage: number
  totalPagination: number
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

const TRANSACTION_LIMIT = 5

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageList, setPageList] = useState<number[]>([])
  const [totalPagination, setTotalPagination] = useState(0)

  async function fetchTransactions(
    page = currentPage,
    limit = TRANSACTION_LIMIT,
    search?: string,
  ) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        _page: page,
        _limit: limit,
        q: search,
      },
    })

    setTransactions(response.data)
  }

  async function getTotalPagination() {
    const response = await api.get('/transactions')
    const totalTransactions = response.data.length
    setTotalPagination(Math.ceil(totalTransactions / TRANSACTION_LIMIT))
  }

  async function createTransaction(transaction: CreateTransactionInputProps) {
    const { description, price, category, type } = transaction

    const response = await api.post('/transactions', {
      description,
      price,
      category,
      type,
    })

    setTransactions((state) =>
      [response.data, ...state].slice(0, TRANSACTION_LIMIT),
    )
  }

  function nextPage(page: number) {
    if (page < pageList[pageList.length - 1]) {
      setCurrentPage((state) => state + 1)
    }
  }

  function prevPage(page: number) {
    if (page > 1) {
      setCurrentPage((state) => state - 1)
    }
  }

  // Calculate page list
  useEffect(() => {
    const startPage = currentPage > 1 ? currentPage - 1 : 1
    setPageList(Array.from({ length: 3 }, (_, i) => startPage + i))
  }, [currentPage])

  // Fetch transactions initially and on page changes
  useEffect(() => {
    fetchTransactions()
  }, [currentPage])

  // Fetch total pagination
  useEffect(() => {
    getTotalPagination()
  }, [transactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        nextPage,
        prevPage,
        setCurrentPage,
        pageList,
        currentPage,
        totalPagination,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
