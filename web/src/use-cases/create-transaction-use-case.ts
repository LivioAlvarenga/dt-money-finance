import {
  CreateTransactionDTO,
  TransactionsRepository,
} from '@/repositories/transactions-repository'

export class CreateTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(data: CreateTransactionDTO) {
    const priceInCents = this.convertToCents(data.price)

    const transaction = await this.transactionsRepository.createTransaction({
      ...data,
      price: priceInCents,
    })

    return transaction
  }

  private convertToCents(priceInReals: number): number {
    return Math.round(priceInReals * 100)
  }
}
