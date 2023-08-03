export interface TransactionsRepository {
  countTransaction(): Promise<number>
  sumIncomeTransactions(): Promise<number>
  sumOutcomeTransactions(): Promise<number>
}
