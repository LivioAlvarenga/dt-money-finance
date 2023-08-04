import { prisma } from '@/lib/prisma'
import {
  CreateTransactionDTO,
  TransactionsRepository,
} from '../transactions-repository'

export class PrismaTransactionsRepository implements TransactionsRepository {
  async createTransaction(data: CreateTransactionDTO) {
    return await prisma.transaction.create({
      data: {
        description: data.description,
        price: data.price,
        category: data.category,
        type: data.type,
      },
    })
  }

  async countTransaction() {
    const countTransactions = await prisma.transaction.count()

    return countTransactions
  }

  async sumIncomeTransactions() {
    const incomeSummary = await prisma.transaction.aggregate({
      _sum: {
        price: true,
      },
      where: {
        type: 'income',
      },
    })

    return incomeSummary._sum.price || 0
  }

  async sumOutcomeTransactions() {
    const outcomeSummary = await prisma.transaction.aggregate({
      _sum: {
        price: true,
      },
      where: {
        type: 'outcome',
      },
    })

    return outcomeSummary._sum.price || 0
  }
}
