import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { GetTransactionCountUseCase } from '../get-transaction-count'

export function makeGetTransactionCountUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()

  const useCase = new GetTransactionCountUseCase(transactionsRepository)

  return useCase
}
