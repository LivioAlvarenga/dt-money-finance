import { TransactionsRepository } from '@/repositories/transactions-repository'

export class DeleteTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(id: string) {
    const transaction = await this.transactionsRepository.deleteTransaction(id)

    return transaction
  }
}
