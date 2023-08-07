export class InvalidTransactionIdError extends Error {
  constructor(id: string) {
    super(`A transação de id: ${id} não existe`)
  }
}
