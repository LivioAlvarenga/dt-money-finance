import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'node:path'

const prisma = new PrismaClient()

// importing seed data
const seedData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'seedDb.json'), 'utf-8'),
)

interface CreateTransactionDTO {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionResponse extends CreateTransactionDTO {
  id: string
  createdAt: Date
  updatedAt: Date
}

function convertToReais(transaction: TransactionResponse): TransactionResponse {
  const priceInReal = Math.round((transaction.price / 100) * 100) / 100
  return { ...transaction, price: priceInReal }
}

async function createTransaction(data: CreateTransactionDTO) {
  return await prisma.transaction.create({
    data: {
      description: data.description,
      price: data.price,
      category: data.category,
      type: data.type,
    },
  })
}

async function run() {
  // delete all transactions
  await prisma.transaction.deleteMany()

  for (const transaction of seedData.transactions) {
    const createdTransaction = await createTransaction(transaction)
    const transactionInReal = convertToReais(createdTransaction)
    console.log(
      `Transaction ${transactionInReal.description} added successfully with price ${transactionInReal.price} reais.`,
    )
  }
}

run()
  .then(async () => {
    console.log('🚀Database seeding completed.🚀')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
