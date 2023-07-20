'use client'

import { api } from '@/lib/axios'
import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

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

interface EditTransactionInputProps {
  id: number
  description: string
  price: number
  type: 'income' | 'outcome'
  category: string
}

interface TransactionContextType {
  transactions: TransactionProps[]
  createTransaction: (transaction: CreateTransactionInputProps) => Promise<void>
  deleteTransaction: (id: number) => Promise<void>
  editTransaction: (transaction: EditTransactionInputProps) => Promise<void>
  getTransactionById: (id: number) => Promise<TransactionProps>
  nextPage: (page: number) => void
  prevPage: (page: number) => void
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  pageList: number[]
  currentPage: number
  searchTerm: string
  totalPagination: number
  totalTransactions: number
  summary: {
    income: number
    outcome: number
    total: number
  }
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
  const [searchTerm, setSearchTerm] = useState('')
  const [totalTransactions, setTotalTransactions] = useState(0)
  const [summary, setSummary] = useState({ income: 0, outcome: 0, total: 0 })

  const fetchTransactions = useCallback(
    async (page = currentPage, limit = TRANSACTION_LIMIT) => {
      const response = await api.get('/transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          _page: page,
          _limit: limit,
          q: searchTerm,
        },
      })

      setTransactions([...response.data]) // Create a new array to update the state
    },
    [currentPage, searchTerm],
  )

  const getTotalPagination = useCallback(async () => {
    const response = await api.get('/transactions', {
      params: {
        q: searchTerm,
      },
    })
    const totalTransactions = response.data.length

    setTotalTransactions(totalTransactions)
    setTotalPagination(Math.ceil(totalTransactions / TRANSACTION_LIMIT))
  }, [searchTerm])

  async function getTransactionById(id: number) {
    const response = await api.get(`/transactions/${id}`)
    return response.data
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

    setTotalTransactions((prevState) => prevState + 1)
  }

  async function editTransaction(transaction: EditTransactionInputProps) {
    const { id, description, price, category, type } = transaction

    const response = await api.patch(`/transactions/${id}`, {
      description,
      price,
      category,
      type,
    })

    setTransactions((state) =>
      state.map((t) => (t.id === id ? response.data : t)),
    )
  }

  async function deleteTransaction(id: number) {
    await api.delete(`/transactions/${id}`)

    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id),
    )

    setTotalTransactions((prevTotal) => prevTotal - 1)

    fetchTransactions()
  }

  async function fetchSummary() {
    const response = await api.get('/summary')
    setSummary(response.data)
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
  }, [fetchTransactions])

  // Fetch total pagination
  useEffect(() => {
    getTotalPagination()
  }, [transactions, searchTerm, getTotalPagination])

  // Fetch summary
  useEffect(() => {
    fetchSummary()
  }, [transactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        editTransaction,
        deleteTransaction,
        getTransactionById,
        nextPage,
        prevPage,
        setCurrentPage,
        setSearchTerm,
        pageList,
        currentPage,
        searchTerm,
        totalPagination,
        totalTransactions,
        summary,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
