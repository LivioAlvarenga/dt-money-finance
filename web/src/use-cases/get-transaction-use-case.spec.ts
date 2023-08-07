import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { InvalidTransactionIdError } from '@/use-cases/errors/invalid-transaction-id-error'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetTransactionUseCase } from './get-transaction-use-case'

describe('Get Transaction Use Case', () => {
  let transactionsRepository: InMemoryTransactionsRepository
  let sut: GetTransactionUseCase

  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new GetTransactionUseCase(transactionsRepository)
  })

  it('should be able to get a transaction successfully', async () => {
    const createdTransaction = await transactionsRepository.createTransaction({
      description: 'Test transaction',
      price: 100,
      category: 'test',
      type: 'income',
    })

    const transaction = await sut.execute(createdTransaction.id)

    expect(transaction.id).toEqual(createdTransaction.id)
    expect(transaction.description).toEqual(createdTransaction.description)
    expect(transaction.price).toEqual(createdTransaction.price)
    expect(transaction.category).toEqual(createdTransaction.category)
    expect(transaction.type).toEqual(createdTransaction.type)
  })

  it('should throw an InvalidTransactionIdError if the transaction does not exist', async () => {
    try {
      await sut.execute('non-existing-id')
    } catch (err) {
      const error = err as Error
      expect(error).toBeInstanceOf(InvalidTransactionIdError)
      expect(error.message).toEqual(
        'A transação de id: non-existing-id não existe',
      )
    }
  })
})
