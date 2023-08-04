import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { GetTransactionsParams } from '@/repositories/transactions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetTransactionsUseCase } from './get-transactions-use-case'

let transactionsRepository: InMemoryTransactionsRepository
let sut: GetTransactionsUseCase

describe('Get Transactions Use Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new GetTransactionsUseCase(transactionsRepository)
    transactionsRepository.items.push(
      {
        id: 'trans-01',
        description: 'desc1',
        price: 10000, // 100.00
        category: 'cat1',
        type: 'income',
        createdAt: new Date('2021-01-01'), // Older date
        updatedAt: new Date(),
      },
      {
        id: 'trans-02',
        description: 'desc2',
        price: 20000, // 200.00
        category: 'cat2',
        type: 'outcome',
        createdAt: new Date('2022-02-01'), // More recent date
        updatedAt: new Date(),
      },
      {
        id: 'trans-03',
        description: 'desc3',
        price: 30000, // 300.00
        category: 'cat3',
        type: 'income',
        createdAt: new Date('2022-01-15'), // An semi-recent date
        updatedAt: new Date(),
      },
      {
        id: 'trans-04',
        description: 'desc4',
        price: 40000, // 400.00
        category: 'cat4',
        type: 'outcome',
        createdAt: new Date('2022-01-10'), // Another intermediate date
        updatedAt: new Date(),
      },
      {
        id: 'trans-05',
        description: 'desc5',
        price: 50000, // 500.00
        category: 'cat5',
        type: 'income',
        createdAt: new Date('2022-01-05'), // Another intermediate date
        updatedAt: new Date(),
      },
    )
  })

  it('should be able to filter and sort transactions by description', async () => {
    const params: GetTransactionsParams = {
      sort: 'description', // or 'category'
      order: 'desc', // or 'asc'
      page: 1,
      limit: 2,
      searchTerm: 'desc1',
    }

    const transactions = await sut.execute(params)

    expect(transactions.length).toEqual(1)
    expect(transactions[0].id).toEqual('trans-01')
    expect(transactions[0].price).toEqual(100.0)
  })

  it('should be able to filter and sort transactions by category', async () => {
    const params: GetTransactionsParams = {
      sort: 'category', // or 'description'
      order: 'desc',
      page: 1,
      limit: 2,
      searchTerm: 'cat2',
    }

    const transactions = await sut.execute(params)

    expect(transactions.length).toEqual(1)
    expect(transactions[0].id).toEqual('trans-02')
    expect(transactions[0].price).toEqual(200.0)
  })

  it('should be able to search transactions by price and return trans-04 with a limit of 5', async () => {
    const params: GetTransactionsParams = {
      sort: 'price',
      order: 'desc', // ou 'asc',
      page: 1,
      limit: 5,
      searchTerm: '40',
    }

    const transactions = await sut.execute(params)

    expect(transactions.length).toEqual(1)
    expect(transactions[0].id).toEqual('trans-04')
    expect(transactions[0].price).toEqual(400.0)
  })

  it('should be able to search transactions by type and return all incomes with a limit of 5', async () => {
    const params: GetTransactionsParams = {
      sort: 'type',
      order: 'asc',
      page: 1,
      limit: 5,
      searchTerm: 'income',
    }

    const transactions = await sut.execute(params)

    expect(transactions.length).toEqual(3)
    expect(transactions[0].id).toEqual('trans-01')
    expect(transactions[1].id).toEqual('trans-03')
    expect(transactions[2].id).toEqual('trans-05')
  })

  it('should be able to search transactions by createdAt and return all transactions created in 2022', async () => {
    const params: GetTransactionsParams = {
      sort: 'createdAt',
      order: 'asc',
      page: 1,
      limit: 5,
      searchTerm: '2022',
    }

    const transactions = await sut.execute(params)

    expect(transactions.length).toEqual(4)
    expect(transactions[0].id).toEqual('trans-05')
    expect(transactions[1].id).toEqual('trans-04')
    expect(transactions[2].id).toEqual('trans-03')
    expect(transactions[3].id).toEqual('trans-02')
  })

  it('should be able to filter and sort transactions by price', async () => {
    const params: GetTransactionsParams = {
      sort: 'price',
      order: 'asc',
      page: 1,
      limit: 2,
      searchTerm: '',
    }

    const transactions = await sut.execute(params)

    expect(transactions.length).toEqual(2)
    expect(transactions[0].price).toEqual(100.0)
    expect(transactions[1].price).toEqual(200.0)
  })

  it('should be able to filter and sort transactions by createdAt', async () => {
    const params: GetTransactionsParams = {
      sort: 'createdAt',
      order: 'desc',
      page: 1,
      limit: 2,
      searchTerm: '',
    }

    const transactions = await sut.execute(params)

    expect(transactions.length).toEqual(2)
    expect(transactions[0].id).toEqual('trans-02') // Most recent
    expect(transactions[1].id).toEqual('trans-03') // Oldest
  })

  it('should be able to paginate transactions', async () => {
    const params: GetTransactionsParams = {
      sort: 'description',
      order: 'asc',
      page: 2,
      limit: 2,
      searchTerm: '',
    }

    const transactions = await sut.execute(params)

    expect(transactions.length).toEqual(2)
    expect(transactions[0].id).toEqual('trans-03')
    expect(transactions[1].id).toEqual('trans-04')
  })

  it('should be able to limit transactions', async () => {
    const params: GetTransactionsParams = {
      sort: 'description',
      order: 'asc',
      page: 1,
      limit: 1,
      searchTerm: '',
    }

    const transactions = await sut.execute(params)

    expect(transactions.length).toEqual(1)
    expect(transactions[0].id).toEqual('trans-01')
  })

  it('should return an empty array if there are no transactions', async () => {
    transactionsRepository.items = []

    const params: GetTransactionsParams = {
      sort: 'description',
      order: 'desc',
      page: 1,
      limit: 2,
      searchTerm: '',
    }

    const transactions = await sut.execute(params)

    expect(transactions.length).toEqual(0)
  })
})
