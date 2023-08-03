export interface TransactionsRepository {
  countTransaction(): Promise<number>
}
