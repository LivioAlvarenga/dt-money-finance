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

describe('Create Transaction Validation (e2e)', () => {
  const validTransactionData: CreateTransactionDTO = {
    description: 'compra de itens',
    price: 100,
    category: 'compras',
    type: 'outcome',
  }

  it('should not allow empty description', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send({ ...validTransactionData, description: '' })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain(
      'A descrição deve ter pelo menos 1 caracteres',
    )
  })

  it('should not allow overly long description', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send({ ...validTransactionData, description: 'a'.repeat(256) })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain(
      'A descrição deve ter no máximo 255 caracteres',
    )
  })

  it('should not allow invalid characters in description', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send({ ...validTransactionData, description: '<script>' })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain(
      'A descrição deve conter apenas letras, números e os caracteres especiais',
    )
  })

  it('should not allow negative price', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send({ ...validTransactionData, price: -100 })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain('O preço deve ser maior que 0')
  })

  it('should not allow zero price', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send({ ...validTransactionData, price: 0 })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain('O preço deve ser maior que 0')
  })

  it('should not allow invalid transaction type', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send({ ...validTransactionData, type: 'invalidType' })

    expect(response.statusCode).toEqual(400)
  })

  it('should not allow empty category', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send({ ...validTransactionData, category: '' })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain(
      'A categoria deve ter pelo menos 1 caracteres',
    )
  })

  it('should not allow overly long category', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send({ ...validTransactionData, category: 'a'.repeat(256) })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain(
      'A categoria deve ter no máximo 255 caracteres',
    )
  })

  it('should not allow invalid characters in category', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send({ ...validTransactionData, category: '<script>' })

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain(
      'A categoria deve conter apenas letras, números e os caracteres especiais',
    )
  })
})

describe('Transaction Creation Security (e2e)', () => {
  it('should prevent SQL injection in the description field', async () => {
    const maliciousData: CreateTransactionDTO = {
      description: "'; DROP TABLE transactions; --",
      price: 100,
      category: 'compras',
      type: 'outcome',
    }

    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send(maliciousData)

    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toBe('Validation Error')
    expect(response.body.details).toContain(
      'A descrição deve conter apenas letras, números e os caracteres especiais: .,!?@#$%^&*()_+-=',
    )
  })

  it('should prevent SQL injection in the price field', async () => {
    const maliciousData: CreateTransactionDTO = {
      description: 'compra de itens',
      price: '100; DROP TABLE transactions; --' as any, // we cast to any here to bypass TypeScript checks, in reality an attacker won't have these checks
      category: 'compras',
      type: 'outcome',
    }

    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send(maliciousData)

    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toBe('Validation Error')
    expect(response.body.details).toContain('Expected number')
  })

  it('should prevent SQL injection in the category field', async () => {
    const maliciousData: CreateTransactionDTO = {
      description: 'compra de itens',
      price: 100,
      category: "'; DROP TABLE transactions; --",
      type: 'outcome',
    }

    const response = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send(maliciousData)

    expect(response.statusCode).toEqual(400)
    expect(response.body.error).toBe('Validation Error')
    expect(response.body.details).toContain(
      'A categoria deve conter apenas letras, números e os caracteres especiais: .,!?@#$%^&*()_+-=',
    )
  })
})
