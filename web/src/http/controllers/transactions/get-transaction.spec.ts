import { CreateTransactionDTO } from '@/repositories/transactions-repository'
import 'dotenv/config'
import request from 'supertest'
import { afterAll, describe, expect, it } from 'vitest'

let transactionId: string

describe('Get Transaction By ID (e2e)', () => {
  afterAll(async () => {
    if (transactionId) {
      await request(process.env.NEXT_PUBLIC_URL_API).delete(`/${transactionId}`)
    }
  })

  it('should retrieve a transaction by its ID', async () => {
    // 1. Create a transaction
    const transactionData: CreateTransactionDTO = {
      description: 'transação para teste de recuperação por id',
      price: 150,
      category: 'testes',
      type: 'income',
    }

    const createResponse = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send(transactionData)

    transactionId = createResponse.body.id

    // 2. Get the transaction by its ID
    const getResponse = await request(process.env.NEXT_PUBLIC_URL_API).get(
      `/${transactionId}`,
    )

    // 3. Verify the details
    expect(getResponse.body.id).toBe(transactionId)
    expect(getResponse.body.description).toBe(transactionData.description)
    expect(getResponse.body.price).toBe(transactionData.price)
    expect(getResponse.body.category).toBe(transactionData.category)
    expect(getResponse.body.type).toBe(transactionData.type)
  })
})
