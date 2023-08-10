import {
  CreateTransactionDTO,
  EditTransactionDTO,
} from '@/repositories/transactions-repository'
import 'dotenv/config'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let transactionId: string

describe('Edit Transaction (e2e)', () => {
  afterAll(async () => {
    if (transactionId) {
      await request(process.env.NEXT_PUBLIC_URL_API).delete(`/${transactionId}`)
    }
  })

  it('should be able to edit a transaction', async () => {
    // 1. Create a transaction
    const transactionData: CreateTransactionDTO = {
      description: 'compra de itens',
      price: 100,
      category: 'compras',
      type: 'outcome',
    }

    const createResponse = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send(transactionData)

    transactionId = createResponse.body.id

    // 2. Edit the created transaction
    const editData: EditTransactionDTO = {
      description: 'compra editada',
      price: 150,
      category: 'compras editadas',
      type: 'income',
    }

    const editResponse = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${transactionId}`)
      .send({
        description: editData.description,
        price: editData.price,
        category: editData.category,
        type: editData.type,
      })

    expect(editResponse.statusCode).toEqual(201)
    expect(editResponse.body).toHaveProperty('id')
    expect(editResponse.body.description).toBe(editData.description)
    expect(editResponse.body.price).toBe(editData.price)
    expect(editResponse.body.category).toBe(editData.category)
    expect(editResponse.body.type).toBe(editData.type)

    // 3. Optionally, retrieve the edited transaction to ensure it was really edited
    const checkResponse = await request(process.env.NEXT_PUBLIC_URL_API).get(
      `/${transactionId}`,
    )
    expect(checkResponse.body.description).toBe(editData.description)
    expect(checkResponse.body.price).toBe(editData.price)
    expect(checkResponse.body.category).toBe(editData.category)
    expect(checkResponse.body.type).toBe(editData.type)
  })

  it('should throw Invalid Transaction Id when trying to edit a non-existent transaction', async () => {
    const nonExistentId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    const transactionData: EditTransactionDTO = {
      description: 'Test transaction',
      price: 100,
      category: 'test',
      type: 'income',
    }

    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${nonExistentId}`)
      .send(transactionData)

    expect(response.statusCode).toEqual(404)
    expect(response.body.error).toEqual('Invalid Transaction Id')
  })
})

describe('Edit Transaction Validation (e2e)', () => {
  let transactionId: string
  const validTransactionData: CreateTransactionDTO = {
    description: 'compra de itens',
    price: 100,
    category: 'compras',
    type: 'outcome',
  }

  beforeAll(async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send(validTransactionData)

    transactionId = response.body.id
  })

  afterAll(async () => {
    // Delete the transaction to clean up the database
    await request(process.env.NEXT_PUBLIC_URL_API).delete(`/${transactionId}`)
  })

  it('should not allow empty description when editing', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${transactionId}`)
      .send({ ...validTransactionData, description: '' })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain(
      'A descrição deve ter pelo menos 1 caracteres',
    )
  })

  it('should not allow overly long description when editing', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${transactionId}`)
      .send({ ...validTransactionData, description: 'a'.repeat(256) })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain(
      'A descrição deve ter no máximo 255 caracteres',
    )
  })

  it('should not allow invalid characters in description when editing', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${transactionId}`)
      .send({ ...validTransactionData, description: '<script>' })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain(
      'A descrição deve conter apenas letras, números e os caracteres especiais',
    )
  })

  it('should not allow negative price when editing', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${transactionId}`)
      .send({ ...validTransactionData, price: -100 })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain('O preço deve ser maior que 0')
  })

  it('should not allow zero price when editing', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${transactionId}`)
      .send({ ...validTransactionData, price: 0 })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain('O preço deve ser maior que 0')
  })

  it('should not allow invalid transaction type when editing', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${transactionId}`)
      .send({ ...validTransactionData, type: 'invalidType' })

    expect(response.statusCode).toEqual(400)
  })

  it('should not allow empty category when editing', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${transactionId}`)
      .send({ ...validTransactionData, category: '' })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain(
      'A categoria deve ter pelo menos 1 caracteres',
    )
  })

  it('should not allow overly long category when editing', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${transactionId}`)
      .send({ ...validTransactionData, category: 'a'.repeat(256) })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain(
      'A categoria deve ter no máximo 255 caracteres',
    )
  })

  it('should not allow invalid characters in category when editing', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${transactionId}`)
      .send({ ...validTransactionData, category: '<script>' })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain(
      'A categoria deve conter apenas letras, números e os caracteres especiais',
    )
  })

  it('should not allow invalid UUID format when editing', async () => {
    const invalidUUID = 'not-a-valid-uuid'
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${invalidUUID}`)
      .send(validTransactionData)

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain('Invalid uuid')
  })
})

describe('Edit Transaction Security (e2e)', () => {
  let transactionId: string
  const validTransactionData: CreateTransactionDTO = {
    description: 'compra de itens',
    price: 100,
    category: 'compras',
    type: 'outcome',
  }

  beforeAll(async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send(validTransactionData)

    transactionId = response.body.id
  })

  afterAll(async () => {
    await request(process.env.NEXT_PUBLIC_URL_API).delete(`/${transactionId}`)
  })

  it('should prevent SQL injection attempts in the description field', async () => {
    const maliciousDescription = "'; DROP TABLE transactions; --"
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${transactionId}`)
      .send({ ...validTransactionData, description: maliciousDescription })

    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('Validation Error')
    expect(response.body.details).toContain(
      'A descrição deve conter apenas letras, números e os caracteres especiais',
    )
  })

  it('should prevent SQL injection attempts in the price field', async () => {
    const maliciousPrice = '0; DROP TABLE transactions;'
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${transactionId}`)
      .send({ ...validTransactionData, price: maliciousPrice })

    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('Validation Error')
    expect(response.body.details).toContain('Expected number')
  })

  it('should prevent SQL injection attempts in the category field', async () => {
    const maliciousCategory =
      "'; DELETE FROM transactions WHERE id = 'some-id'; --"
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${transactionId}`)
      .send({ ...validTransactionData, category: maliciousCategory })

    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('Validation Error')
    expect(response.body.details).toContain(
      'A categoria deve conter apenas letras, números e os caracteres especiais',
    )
  })

  it('should prevent SQL injection attempts in the transaction ID field', async () => {
    // Try to delete a transaction with a malicious ID
    const maliciousId = "'; DROP TABLE transactions; --"

    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .put(`/${maliciousId}`)
      .send({ ...validTransactionData })

    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toEqual('Validation Error')
    expect(response.body.details).toContain('Invalid uuid')
  })
})
