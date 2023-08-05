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

  it('should be able to create a transaction successfully with the return in Reais', async () => {
    const transactionData: CreateTransactionDTO = {
      description: 'Test transaction',
      price: 100, // 100 Reais
      category: 'test',
      type: 'income',
    }

    const transaction = await sut.execute(transactionData)

    expect(transaction.description).toEqual(transactionData.description)
    expect(transaction.price).toEqual(100) // 100 Reais
    expect(transaction.category).toEqual(transactionData.category)
    expect(transaction.type).toEqual(transactionData.type)
  })

  it('should store the transaction in Centavos', async () => {
    const transactionData: CreateTransactionDTO = {
      description: 'Test transaction with price in cents',
      price: 10, // 10 Reais
      category: 'test',
      type: 'income',
    }

    const transaction = await sut.execute(transactionData)

    expect(transaction.description).toEqual(transactionData.description)
    expect(transactionsRepository.items[0].price).toEqual(1000) // 10000 Centavos
  })
})
