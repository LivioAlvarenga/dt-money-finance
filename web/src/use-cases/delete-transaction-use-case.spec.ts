import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteTransactionUseCase } from './delete-transaction-use-case'

describe('Delete Transaction Use Case', () => {
  let transactionsRepository: InMemoryTransactionsRepository
  let sut: DeleteTransactionUseCase

  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new DeleteTransactionUseCase(transactionsRepository)
  })

  it('should be able to delete a transaction successfully', async () => {
    const transaction = await transactionsRepository.createTransaction({
      description: 'Test transaction',
      price: 100,
      category: 'test',
      type: 'income',
    })

    const deletedTransaction = await sut.execute(transaction.id)

    expect(deletedTransaction.id).toEqual(transaction.id)
  })

  it('should throw an error if the transaction does not exist', async () => {
    try {
      await sut.execute('non-existing-id')
    } catch (err) {
      const error = err as Error
      expect(error.message).toEqual('Transaction not found')
    }
  })
})
