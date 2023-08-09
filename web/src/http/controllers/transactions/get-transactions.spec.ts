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
      `?_sort=createdAt&_order=desc&_page=1&_limit=3`,
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

  it('should retrieve transactions based on the searchTerm for description', async () => {
    const searchTerm = 'Transação antiga 1'

    const searchResponse = await request(process.env.NEXT_PUBLIC_URL_API).get(
      `?_sort=createdAt&_order=desc&_page=1&_limit=3&q=${searchTerm}`,
    )

    const fetchedTransactionsForSearch = searchResponse.body

    expect(fetchedTransactionsForSearch).toHaveLength(1)
    expect(fetchedTransactionsForSearch[0].description).toBe(
      searchTerm.toLowerCase(),
    )
  })

  it('should retrieve transactions based on the searchTerm for category', async () => {
    const searchTerm = 'testes'

    const searchResponse = await request(process.env.NEXT_PUBLIC_URL_API).get(
      `?_sort=createdAt&_order=desc&_page=1&_limit=3&q=${searchTerm}`,
    )

    const fetchedTransactionsForSearch = searchResponse.body

    expect(fetchedTransactionsForSearch).toHaveLength(3)
    fetchedTransactionsForSearch.forEach((transaction: TransactionDTO) => {
      expect(transaction.category).toBe(searchTerm)
    })
  })
})

describe('Fetch Transactions Validation (e2e)', () => {
  it('should validate sort parameter', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API).get(
      '?_sort=invalidSort&_order=asc&_page=1&_limit=5',
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain('Invalid enum value')
  })

  it('should validate order parameter', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API).get(
      '?_sort=createdAt&_order=invalidOrder&_page=1&_limit=5',
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain('Invalid enum value')
  })

  it('should validate minimum page value', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API).get(
      '?_sort=createdAt&_order=asc&_page=0&_limit=5',
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain('A página deve ser maior que 0')
  })

  it('should validate minimum limit value', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API).get(
      '?_sort=createdAt&_order=asc&_page=1&_limit=0',
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain('O limite deve ser maior que 0')
  })

  it('should validate maximum searchTerm length', async () => {
    const searchTerm = 'a'.repeat(256)
    const response = await request(process.env.NEXT_PUBLIC_URL_API).get(
      `?_sort=createdAt&_order=asc&_page=1&_limit=5&q=${searchTerm}`,
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain(
      'A pesquisa deve ter no máximo 255 caracteres',
    )
  })

  it('should validate invalid characters in searchTerm', async () => {
    const response = await request(process.env.NEXT_PUBLIC_URL_API).get(
      '?_sort=createdAt&_order=asc&_page=1&_limit=5&q=<script>',
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body.details).toContain(
      'A pesquisa deve conter apenas letras, números e os caracteres especiais: .,!?@#$%^&*()_+-=',
    )
  })
})
