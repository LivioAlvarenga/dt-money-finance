import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { GetTransactionSummaryUseCase } from '../get-transaction-summary-use-case'

export function makeGetTransactionSummaryUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()

  const useCase = new GetTransactionSummaryUseCase(transactionsRepository)

  return useCase
}
