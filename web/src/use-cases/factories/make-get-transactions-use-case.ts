import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { GetTransactionsUseCase } from '../get-transactions-use-case'

export function makeGetTransactionsUseCase() {
  const transactionsRepository = new PrismaTransactionsRepository()

  const useCase = new GetTransactionsUseCase(transactionsRepository)

  return useCase
}
