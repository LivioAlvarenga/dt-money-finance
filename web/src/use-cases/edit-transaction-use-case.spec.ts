import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import {
  CreateTransactionDTO,
  EditTransactionDTO,
} from '@/repositories/transactions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { EditTransactionUseCase } from './edit-transaction-use-case'
import { InvalidTransactionIdError } from './errors/invalid-transaction-id-error'

describe('Edit Transaction Use Case', () => {
  let transactionsRepository: InMemoryTransactionsRepository
  let sut: EditTransactionUseCase

  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new EditTransactionUseCase(transactionsRepository)
  })

  it('should be able to edit a transaction successfully with the return in Reais', async () => {
    const createTransactionData: CreateTransactionDTO = {
      description: 'Test transaction',
      price: 100, // 100 Reais
      category: 'test',
      type: 'income',
    }

    const createdTransaction = await transactionsRepository.createTransaction(
      createTransactionData,
    )

    const editTransactionData: EditTransactionDTO = {
      description: 'Test transaction edited',
      price: 200, // 200 Reais
      category: 'test edited',
      type: 'outcome',
    }

    const transaction = await sut.execute(
      createdTransaction.id,
      editTransactionData,
    )

    expect(transaction.id).toEqual(createdTransaction.id)
    expect(transaction.description).toEqual(editTransactionData.description)
    expect(transaction.price).toEqual(200) // 200 Reais
    expect(transaction.category).toEqual(editTransactionData.category)
    expect(transaction.type).toEqual(editTransactionData.type)
  })

  it('should store the edited transaction in Centavos', async () => {
    transactionsRepository.items = []

    const createTransactionData: CreateTransactionDTO = {
      description: 'Test transaction',
      price: 10, // 10 Reais
      category: 'test',
      type: 'income',
    }

    const createdTransaction = await transactionsRepository.createTransaction(
      createTransactionData,
    )

    const editTransactionData: EditTransactionDTO = {
      description: 'Test transaction edited',
      price: 20, // 20 Reais
      category: 'test edited',
      type: 'outcome',
    }

    const transaction = await sut.execute(
      createdTransaction.id,
      editTransactionData,
    )

    expect(transaction.description).toEqual(editTransactionData.description)
    expect(transactionsRepository.items[0].price).toEqual(2000) // 2000 Centavos
  })

  it('should throw InvalidTransactionIdError when trying to edit a non-existent transaction', async () => {
    const nonExistentId = 'non-existent-id'
    const transactionData: EditTransactionDTO = {
      description: 'Test transaction',
      price: 100,
      category: 'test',
      type: 'income',
    }

    await expect(sut.execute(nonExistentId, transactionData)).rejects.toThrow(
      new InvalidTransactionIdError(nonExistentId),
    )
  })
})
