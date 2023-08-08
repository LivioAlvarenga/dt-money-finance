import {
  CreateTransactionDTO,
  TransactionDTO,
} from '@/repositories/transactions-repository'
import 'dotenv/config'
import request from 'supertest'
import { afterAll, describe, expect, it } from 'vitest'

describe('Fetch Transactions (e2e)', () => {
  const createdTransactionIds: string[] = []

  afterAll(async () => {
    for (const id of createdTransactionIds) {
      await request(process.env.NEXT_PUBLIC_URL_API).delete(`/${id}`)
    }
  })

  it('should retrieve the oldest transactions based on the given parameters', async () => {
    // 1. Create three transactions with old dates
    for (let i = 0; i < 3; i++) {
      const transactionData: CreateTransactionDTO = {
        description: `Transação antiga ${i}`,
        price: 50 + i * 10,
        category: 'testes',
        type: 'income',
      }

      const createResponse = await request(process.env.NEXT_PUBLIC_URL_API)
        .post('')
        .send(transactionData)

      createdTransactionIds.push(createResponse.body.id)
    }

    // 2. Fetch the transactions with the specified parameters
    const fetchResponse = await request(process.env.NEXT_PUBLIC_URL_API).get(
      `?_sort=createdAt&_order=desc&_page=1&_limit=3&q=`,
    )

    const fetchedTransactions = fetchResponse.body

    // 3. Verify the transactions
    expect(fetchedTransactions).toHaveLength(3)
    fetchedTransactions.forEach(
      (transaction: TransactionDTO, index: number) => {
        expect(transaction.description).toBe(`transação antiga ${2 - index}`)
        expect(transaction.price).toBe(70 - index * 10)
        expect(transaction.category).toBe('testes')
        expect(transaction.type).toBe('income')
      },
    )
  })
})
