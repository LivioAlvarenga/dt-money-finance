'use client'

import { api } from '@/lib/axios'
import { errorToast } from '@/utils/errorToast'
import 'dotenv/config'
import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import toast from 'react-hot-toast'

interface TransactionProps {
  id: string
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
  id: string
  description: string
  price: number
  type: 'income' | 'outcome'
  category: string
}

interface TransactionContextType {
  transactions: TransactionProps[]
  createTransaction: (transaction: CreateTransactionInputProps) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  editTransaction: (transaction: EditTransactionInputProps) => Promise<void>
  getTransactionById: (id: string) => Promise<TransactionProps>
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
      try {
        const response = await api.get('', {
          params: {
            _sort: 'createdAt',
            _order: 'desc',
            _page: page,
            _limit: limit,
            q: searchTerm,
          },
        })

        setTransactions([...response.data]) // Create a new array to update the state
      } catch (error) {
        errorToast(error)
      }
    },
    [currentPage, searchTerm],
  )

  const getTotalPagination = useCallback(async () => {
    try {
      const response = await api.get('', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          _page: 1,
          _limit: 9999,
          q: searchTerm,
        },
      })
      const totalTransactions = response.data.length

      setTotalTransactions(totalTransactions)
      setTotalPagination(Math.ceil(totalTransactions / TRANSACTION_LIMIT))
    } catch (error) {
      errorToast(error)
    }
  }, [searchTerm])

  async function getTransactionById(id: string) {
    try {
      const response = await api.get(`/${id}`)

      return response.data
    } catch (error) {
      errorToast(error)
    }
  }

  async function createTransaction(transaction: CreateTransactionInputProps) {
    const { description, price, category, type } = transaction

    try {
      const response = await api.post('', {
        description,
        price,
        category,
        type,
      })

      setTransactions((state) =>
        [response.data, ...state].slice(0, TRANSACTION_LIMIT),
      )

      setTotalTransactions((prevState) => prevState + 1)

      toast.success('Transação criada com sucesso!')
    } catch (error) {
      errorToast(error)
    }
  }

  async function editTransaction(transaction: EditTransactionInputProps) {
    const { id, description, price, category, type } = transaction

    const response = await api.patch(`/${id}`, {
      description,
      price,
      category,
      type,
    })

    const { price: priceInCents, ...rest } = response.data
    const priceInReal = Math.round((priceInCents / 100) * 100) / 100

    setTransactions((state) =>
      state.map((t) => (t.id === id ? { ...rest, price: priceInReal } : t)),
    )
  }

  async function deleteTransaction(id: string) {
    try {
      const response = await api.delete(`/${id}`)

      setTransactions((prevTransactions) =>
        prevTransactions.filter(
          (transaction) => transaction.id !== response.data.id,
        ),
      )

      setTotalTransactions((prevTotal) => prevTotal - 1)

      fetchTransactions()

      toast.success('Transação deletada com sucesso!')
    } catch (error) {
      errorToast(error)
    }
  }

  async function fetchSummary() {
    try {
      const response = await api.get(`/summary`)
      setSummary(response.data)
    } catch (error) {
      errorToast(error)
    }
  }

  async function fetchCount() {
    try {
      const response = await api.get(`/count`)
      setTotalTransactions(response.data.totalTransactions)
    } catch (error) {
      errorToast(error)
    }
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
    fetchCount()
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
