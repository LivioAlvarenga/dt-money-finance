import { Transaction } from '@prisma/client'
import {
  CreateTransactionDTO,
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
}
