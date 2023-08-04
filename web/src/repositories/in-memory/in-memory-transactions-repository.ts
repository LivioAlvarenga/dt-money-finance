import { Transaction } from '@prisma/client'
import {
  CreateTransactionDTO,
  GetTransactionsParams,
  TransactionDTO,
  TransactionsRepository,
} from '../transactions-repository'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = []

  async createTransaction(data: CreateTransactionDTO): Promise<Transaction> {
    const transaction = {
      ...data,
      id: 'eaa8feeb-ce6f-4d09-9bff-24ede81c19d8',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(transaction)
    return transaction
  }

  async countTransaction() {
    return this.items.length
  }

  async sumIncomeTransactions() {
    return this.items
      .filter((transaction) => transaction.type === 'income')
      .reduce((sum, item) => sum + item.price, 0)
  }

  async sumOutcomeTransactions() {
    return this.items
      .filter((transaction) => transaction.type === 'outcome')
      .reduce((sum, item) => sum + item.price, 0)
  }

  async getTransactions(
    params: GetTransactionsParams,
  ): Promise<TransactionDTO[]> {
    const { sort, order, page, limit, searchTerm } = params

    // filter transactions by searchTerm
    let filteredTransactions = this.items.filter(
      (transaction) =>
        !searchTerm ||
        transaction.description.includes(searchTerm) ||
        transaction.category.includes(searchTerm) ||
        transaction.price.toString().includes(searchTerm) ||
        transaction.type.includes(searchTerm) ||
        transaction.createdAt.toISOString().includes(searchTerm),
    )

    // sort transactions
    if (sort) {
      filteredTransactions.sort((a, b) => {
        const valueA = a[sort]
        const valueB = b[sort]

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return order === 'desc'
            ? valueB.localeCompare(valueA)
            : valueA.localeCompare(valueB)
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return order === 'desc' ? valueB - valueA : valueA - valueB
        } else if (valueA instanceof Date && valueB instanceof Date) {
          return order === 'desc'
            ? valueB.getTime() - valueA.getTime()
            : valueA.getTime() - valueB.getTime()
        }

        return 0 // Handle other cases as needed
      })
    }

    // paginate transactions
    if (page && limit) {
      const startIdx = (page - 1) * limit
      const endIdx = startIdx + limit
      filteredTransactions = filteredTransactions.slice(startIdx, endIdx)
    }

    // return transactions with createdAt as string
    return filteredTransactions.map((transaction) => ({
      ...transaction,
      createdAt: transaction.createdAt.toISOString(),
    }))
  }
}
