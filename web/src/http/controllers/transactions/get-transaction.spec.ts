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

  it('should throw Invalid Transaction Id when trying to get a non-existent transaction', async () => {
    const nonExistentId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'

    const response = await request(process.env.NEXT_PUBLIC_URL_API).get(
      `/${nonExistentId}`,
    )

    expect(response.statusCode).toEqual(404)
    expect(response.body.error).toEqual('Invalid Transaction Id')
  })
})

describe('Get Transaction Validation (e2e)', () => {
  it('should return a validation error for a non-UUID transaction id', async () => {
    const invalidId = '12345-invalid-id'

    const response = await request(process.env.NEXT_PUBLIC_URL_API).get(
      `/${invalidId}`,
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('Validation Error')
    expect(response.body.details).toContain('Invalid uuid')
  })
})

describe('Get Transaction Security (e2e)', () => {
  it('should prevent SQL injection attempts in the transaction ID field', async () => {
    // Try to delete a transaction with a malicious ID
    const maliciousId = "'; DROP TABLE transactions; --"

    const response = await request(process.env.NEXT_PUBLIC_URL_API).get(
      `/${maliciousId}`,
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('Validation Error')
    expect(response.body.details).toContain('Invalid uuid')
  })
})
