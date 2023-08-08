import { CreateTransactionDTO } from '@/repositories/transactions-repository'
import 'dotenv/config'
import request from 'supertest'
import { afterAll, describe, expect, it } from 'vitest'

let transactionId: string

describe('Create Transaction (e2e)', () => {
  afterAll(async () => {
    if (transactionId) {
      await request(process.env.NEXT_PUBLIC_URL_API).delete(`/${transactionId}`)
    }
  })

  it('should be able to register', async () => {
    const transactionData: CreateTransactionDTO = {
      description: 'compra de itens',
      price: 100,
      category: 'compras',
      type: 'outcome',
    }

    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send(transactionData)

    transactionId = response.body.id

    expect(response.statusCode).toEqual(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.description).toBe(transactionData.description)
    expect(response.body.price).toBe(transactionData.price)
    expect(response.body.category).toBe(transactionData.category)
    expect(response.body.type).toBe(transactionData.type)
  })
})
