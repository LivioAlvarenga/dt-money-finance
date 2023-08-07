import { TransactionsRepository } from '@/repositories/transactions-repository'

export class GetTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(id: string) {
    const transaction = await this.transactionsRepository.getTransaction(id)

    transaction.price = this.convertCentsToCurrency(transaction.price)

    return transaction
  }

  private convertCentsToCurrency(cents: number) {
    return Math.round((cents / 100) * 100) / 100
  }
}
