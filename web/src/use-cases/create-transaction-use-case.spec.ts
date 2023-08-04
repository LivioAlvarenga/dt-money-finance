import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { CreateTransactionDTO } from '@/repositories/transactions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTransactionUseCase } from './create-transaction-use-case'

describe('Create Transaction Use Case', () => {
  let transactionsRepository: InMemoryTransactionsRepository
  let sut: CreateTransactionUseCase

  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new CreateTransactionUseCase(transactionsRepository)
  })

  it('should be able to create a transaction successfully', async () => {
    const transactionData: CreateTransactionDTO = {
      description: 'Test transaction',
      price: 100, // 100 Reais
      category: 'test',
      type: 'income',
    }

    const transaction = await sut.execute(transactionData)

    expect(transaction.description).toEqual(transactionData.description)
    expect(transaction.price).toEqual(10000) // 10000 Centavos
    expect(transaction.category).toEqual(transactionData.category)
    expect(transaction.type).toEqual(transactionData.type)
    expect(transactionsRepository.items).toContainEqual(transaction)
  })
})
