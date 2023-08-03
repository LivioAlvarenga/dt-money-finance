import { Transaction } from '@prisma/client'
import { TransactionsRepository } from '../transactions-repository'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = []

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
