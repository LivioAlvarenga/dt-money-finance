import { TransactionsRepository } from '@/repositories/transactions-repository'

interface GetTransactionSummaryUseCaseResponse {
  income: number
  outcome: number
  total: number
}

export class GetTransactionSummaryUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(): Promise<GetTransactionSummaryUseCaseResponse> {
    const incomeInCents =
      await this.transactionsRepository.sumIncomeTransactions()
    const outcomeInCents =
      await this.transactionsRepository.sumOutcomeTransactions()

    const income = this.convertCentsToCurrency(incomeInCents)
    const outcome = this.convertCentsToCurrency(outcomeInCents)
    const total = income - outcome

    return {
      income,
      outcome,
      total,
    }
  }

  private convertCentsToCurrency(cents: number) {
    return Math.round((cents / 100) * 100) / 100
  }
}
