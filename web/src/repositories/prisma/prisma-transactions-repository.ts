import { prisma } from '@/lib/prisma'
import { TransactionsRepository } from '../transactions-repository'

export class PrismaTransactionsRepository implements TransactionsRepository {
  async countTransaction() {
    const countTransactions = await prisma.transaction.count()

    return countTransactions
  }
}
