import { prisma } from '@/lib/prisma'
import { InvalidTransactionIdError } from '@/use-cases/errors/invalid-transaction-id-error'
import { Transaction } from '@prisma/client'
import {
  CreateTransactionDTO,
  EditTransactionDTO,
  GetTransactionsParams,
  TransactionDTO,
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

  async deleteTransaction(id: string): Promise<Transaction> {
    const transaction = await prisma.transaction.delete({
      where: {
        id,
      },
    })

    return transaction
  }

  async editTransaction(id: string, data: EditTransactionDTO) {
    const transaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        description: data.description,
        price: data.price,
        category: data.category,
        type: data.type,
      },
    })

    return transaction
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

  async getTransaction(id: string): Promise<Transaction> {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    })

    if (!transaction) {
      throw new InvalidTransactionIdError(id)
    }

    return transaction
  }

  async getTransactions(
    params: GetTransactionsParams,
  ): Promise<TransactionDTO[]> {
    const {
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 5,
      searchTerm,
    } = params

    // ! TODO: add price, type and createdAt to the search

    const whereConditions = {
      OR: [
        { description: { contains: searchTerm } },
        { category: { contains: searchTerm } },
      ],
    }

    const transactionsFromDB = await prisma.transaction.findMany({
      where: searchTerm ? whereConditions : undefined,
      orderBy: { [sort]: order },
      skip: (page - 1) * limit,
      take: limit,
    })

    const transactions = transactionsFromDB.map((transaction) => {
      return {
        id: transaction.id,
        description: transaction.description,
        price: transaction.price,
        category: transaction.category,
        type: transaction.type,
        createdAt: transaction.createdAt.toISOString(),
      }
    })

    return transactions
  }
}
