import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { DeleteTransactionUseCase } from '../delete-transaction-use-case'

export function makeDeleteTransactionUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()

  const useCase = new DeleteTransactionUseCase(transactionsRepository)

  return useCase
}
