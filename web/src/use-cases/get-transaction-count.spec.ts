import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetTransactionCountUseCase } from './get-transaction-count'

let transactionsRepository: InMemoryTransactionsRepository
let sut: GetTransactionCountUseCase

describe('Get Transaction Count Use Case', () => {
  beforeEach(() => {
    // Create a fake repository
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new GetTransactionCountUseCase(transactionsRepository)
  })

  it('should be able to get transaction count', async () => {
    // Add some transactions to the in-memory repository
    transactionsRepository.items.push(
      {
        id: 'trans-01',
        description: 'desc1',
        price: 100,
        category: 'cat1',
        type: 'income',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'trans-02',
        description: 'desc2',
        price: 200,
        category: 'cat2',
        type: 'outcome',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    )

    const { transactionsCount } = await sut.execute()

    expect(transactionsCount).toEqual(2)
  })

  it('should return zero if there are no transactions', async () => {
    const { transactionsCount } = await sut.execute()

    expect(transactionsCount).toEqual(0)
  })
})
