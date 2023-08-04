import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { CreateTransactionUseCase } from '../create-transaction-use-case'

export function makeCreateTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()

  const useCase = new CreateTransactionUseCase(transactionsRepository)

  return useCase
}
