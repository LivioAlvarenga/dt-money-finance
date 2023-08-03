import { TransactionsRepository } from '@/repositories/transactions-repository'

interface GetTransactionCountUseCaseResponse {
  transactionsCount: number
}

export class GetTransactionCountUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(): Promise<GetTransactionCountUseCaseResponse> {
    const transactionsCount =
      await this.transactionsRepository.countTransaction()

    return {
      transactionsCount,
    }
  }
}
