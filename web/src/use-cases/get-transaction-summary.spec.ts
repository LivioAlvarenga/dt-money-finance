import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetTransactionSummaryUseCase } from './get-transaction-summary'

let transactionsRepository: InMemoryTransactionsRepository
let sut: GetTransactionSummaryUseCase

describe('Get Transaction Summary Use Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new GetTransactionSummaryUseCase(transactionsRepository)
  })

  it('should be able to get transaction summary', async () => {
    transactionsRepository.items.push(
      {
        id: 'trans-01',
        description: 'desc1',
        price: 10000, // 100.00
        category: 'cat1',
        type: 'income',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'trans-02',
        description: 'desc2',
        price: 20000, // 2000.00
        category: 'cat2',
        type: 'outcome',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    )

    const { income, outcome, total } = await sut.execute()

    expect(income).toEqual(100.0)
    expect(outcome).toEqual(200.0)
    expect(total).toEqual(-100.0)
  })

  it('should return zero for income, outcome, and total if there are no transactions', async () => {
    const { income, outcome, total } = await sut.execute()

    expect(income).toEqual(0)
    expect(outcome).toEqual(0)
    expect(total).toEqual(0)
  })
})
