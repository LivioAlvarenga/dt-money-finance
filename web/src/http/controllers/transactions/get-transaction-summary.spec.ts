import { CreateTransactionDTO } from '@/repositories/transactions-repository'
import 'dotenv/config'
import request from 'supertest'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'

let transactionId: string
let initialSummary: { income: number; outcome: number; total: number }

describe('Transaction Summary (e2e)', () => {
  beforeAll(async () => {
    // 1. Get the current summary
    const summaryResponse = await request(process.env.NEXT_PUBLIC_URL_API).get(
      `/summary`,
    )
    initialSummary = summaryResponse.body
  })

  afterEach(async () => {
    if (transactionId) {
      await request(process.env.NEXT_PUBLIC_URL_API).delete(`/${transactionId}`)
    }
  })

  it('should reflect increased income after creating an income transaction', async () => {
    // 2. Create an income transaction
    const transactionData: CreateTransactionDTO = {
      description: 'Venda de item para teste',
      price: 150,
      category: 'vendas',
      type: 'income',
    }

    const createResponse = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send(transactionData)

    transactionId = createResponse.body.id

    // 3. Check the summary again
    const newSummaryResponse = await request(
      process.env.NEXT_PUBLIC_URL_API,
    ).get(`/summary`)
    const newSummary = newSummaryResponse.body

    expect(newSummary.income).toEqual(
      initialSummary.income + transactionData.price,
    )
  })

  it('should reflect increased outcome after creating an outcome transaction', async () => {
    // Reset the transaction ID for cleanup
    transactionId = ''

    // 1. Create an outcome transaction
    const transactionData: CreateTransactionDTO = {
      description: 'Compra de item para teste',
      price: 200,
      category: 'compras',
      type: 'outcome',
    }

    const createResponse = await request(process.env.NEXT_PUBLIC_URL_API)
      .post('')
      .send(transactionData)

    transactionId = createResponse.body.id

    // 2. Check the summary again
    const newSummaryResponse = await request(
      process.env.NEXT_PUBLIC_URL_API,
    ).get(`/summary`)
    const newSummary = newSummaryResponse.body

    expect(newSummary.outcome).toEqual(
      initialSummary.outcome + transactionData.price,
    )
  })
})
