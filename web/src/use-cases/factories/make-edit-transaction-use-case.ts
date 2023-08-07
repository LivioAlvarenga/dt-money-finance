import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { EditTransactionUseCase } from '../edit-transaction-use-case'

export function makeEditTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()

  const useCase = new EditTransactionUseCase(transactionsRepository)

  return useCase
}
