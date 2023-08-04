import {
  GetTransactionsParams,
  TransactionDTO,
  TransactionsRepository,
} from '@/repositories/transactions-repository'

export class GetTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(params: GetTransactionsParams): Promise<TransactionDTO[]> {
    const transactions = await this.transactionsRepository.getTransactions(
      params,
    )

    return transactions.map((transaction) => ({
      ...transaction,
      price: this.convertCentsToCurrency(transaction.price),
    }))
  }

  private convertCentsToCurrency(cents: number) {
    return Math.round((cents / 100) * 100) / 100
  }
}
