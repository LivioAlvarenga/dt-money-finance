import { CreateTransactionDTO } from '@/repositories/transactions-repository'
import 'dotenv/config'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('Delete Transaction (e2e)', () => {
  it('should be able to delete a transaction', async () => {
    // Create a transaction to be deleted
    const transactionData: CreateTransactionDTO = {
      description: 'compra de itens',
      price: 100,
      category: 'compras',
      type: 'outcome',
    }
    const responseCreatedTransaction = await request(
      process.env.NEXT_PUBLIC_URL_API,
    )
      .post('')
      .send(transactionData)

    // Delete the transaction
    const response = await request(process.env.NEXT_PUBLIC_URL_API).delete(
      `/${responseCreatedTransaction.body.id}`,
    )

    expect(response.statusCode).toEqual(200)
    expect(response.body.id).toBe(responseCreatedTransaction.body.id)

    // Optionally, you can add another request here to ensure the transaction was really deleted
    const checkResponse = await request(process.env.NEXT_PUBLIC_URL_API).get(
      `/non-existent-transaction`,
    )
    expect(checkResponse.statusCode).toEqual(400)
  })

  it('should throw Invalid Transaction Id when trying to delete a non-existent transaction', async () => {
    const nonExistentId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'

    const response = await request(process.env.NEXT_PUBLIC_URL_API).delete(
      `/${nonExistentId}`,
    )

    expect(response.statusCode).toEqual(404)
    expect(response.body.error).toEqual('Invalid Transaction Id')
  })
})

describe('Delete Transaction Validation (e2e)', () => {
  it('should return a validation error for a non-UUID transaction id', async () => {
    const invalidId = '12345-invalid-id'

    const response = await request(process.env.NEXT_PUBLIC_URL_API).delete(
      `/${invalidId}`,
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('Validation Error')
    expect(response.body.details).toContain('Invalid uuid')
  })
})
