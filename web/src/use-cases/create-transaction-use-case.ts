import {
  CreateTransactionDTO,
  TransactionResponse,
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

    return this.convertToReais(transaction)
  }

  private convertToCents(priceInReals: number): number {
    return Math.round(priceInReals * 100)
  }

  private convertToReais(
    transaction: TransactionResponse,
  ): TransactionResponse {
    const priceInReal = Math.round((transaction.price / 100) * 100) / 100
    return { ...transaction, price: priceInReal }
  }
}
