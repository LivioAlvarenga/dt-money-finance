import { Transaction } from '@prisma/client'
import { TransactionsRepository } from '../transactions-repository'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public items: Transaction[] = []

  async countTransaction() {
    return this.items.length
  }
}
