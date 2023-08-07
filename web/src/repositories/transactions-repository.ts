import { Transaction } from '@prisma/client'

export interface CreateTransactionDTO {
  description: string
  price: number // The price is in Real 100.00
  category: string
  type: 'income' | 'outcome'
}

export interface TransactionDTO extends CreateTransactionDTO {
  id: string
  createdAt: string
}

export interface EditTransactionDTO {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

export interface TransactionResponse {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
  id: string
  createdAt: Date
}

export interface GetTransactionsParams {
  sort: 'createdAt' | 'description' | 'category' | 'price' | 'type'
  order: 'asc' | 'desc'
  page: number
  limit: number
  searchTerm?: string
}

export interface TransactionsRepository {
  countTransaction(): Promise<number>
  sumIncomeTransactions(): Promise<number>
  sumOutcomeTransactions(): Promise<number>
  createTransaction(data: CreateTransactionDTO): Promise<Transaction>
  deleteTransaction(id: string): Promise<Transaction>
  getTransaction(id: string): Promise<Transaction>
  getTransactions(params?: GetTransactionsParams): Promise<TransactionDTO[]>
  editTransaction(id: string, data: EditTransactionDTO): Promise<Transaction>
}
