import { CreateTransactionDTO } from '@/repositories/transactions-repository'
import 'dotenv/config'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let transactionId: string
let initialCount: number

describe('Transaction Count (e2e)', () => {
  beforeAll(async () => {
    // 1. Count the current number of transactions
    const countResponse = await request(process.env.NEXT_PUBLIC_URL_API).get(
      `/count`,
    )
    initialCount = countResponse.body.totalTransactions
  })

  afterAll(async () => {
    if (transactionId) {
      await request(process.env.NEXT_PUBLIC_URL_API).delete(`/${transactionId}`)
    }
  })

  it('should increase transaction count after creating a transaction', async () => {
    // 2. Create a transaction
    const transactionData: CreateTransactionDTO = {
      description: 'compra de itens para teste',
      price: 100,
      category: 'compras',
      type: 'outcome',
    }

    const createResponse = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send(transactionData)

    transactionId = createResponse.body.id

    // 3. Count the transactions again
    const newCountResponse = await request(process.env.NEXT_PUBLIC_URL_API).get(
      `/count`,
    )
    const newCount = newCountResponse.body.totalTransactions

    expect(newCount).toEqual(initialCount + 1)
  })
})
