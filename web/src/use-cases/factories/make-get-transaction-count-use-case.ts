import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { GetTransactionCountUseCase } from '../get-transaction-count-use-case'

export function makeGetTransactionCountUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()

  const useCase = new GetTransactionCountUseCase(transactionsRepository)

  return useCase
}
