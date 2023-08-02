import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import path from 'path'
import { URL } from 'url'

export async function GET(req: NextRequest) {
  const url = new URL(req.url, 'http://localhost')
  const sort = url.searchParams.get('_sort') || 'createdAt'
  const order = url.searchParams.get('_order') || 'desc'
  const page = parseInt(url.searchParams.get('_page') || '1')
  const limit = parseInt(url.searchParams.get('_limit') || '9999')
  const searchTerm = url.searchParams.get('q') || ''

  const filePath = path.join(process.cwd(), 'db.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(fileContents)

  let transactions = data.transactions

  // Implementar a lógica para ordenar, paginar e filtrar os resultados
  if (searchTerm) {
    transactions = transactions.filter((transaction: any) => {
      return (
        transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.price.toString().includes(searchTerm) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }

  if (sort && order) {
    transactions.sort((a: any, b: any) =>
      order === 'desc' ? b[sort] - a[sort] : a[sort] - b[sort],
    )
  }

  const startIdx = (page - 1) * limit
  transactions = transactions.slice(startIdx, startIdx + limit)

  // transform price to real
  const transactionsInReal = transactions.map((transaction: any) => ({
    ...transaction,
    price: Math.round((transaction.price / 100) * 100) / 100,
  }))

  return NextResponse.json(transactionsInReal)
}

export async function POST(req: NextRequest) {
  const { description, price, category, type } = await req.json()

  const filePath = path.join(process.cwd(), 'db.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(fileContents)

  const createdAt = new Date().toISOString()

  const priceInCents = Math.ceil(price * 100) // transform price to cents

  const newTransaction = {
    id: randomUUID(),
    description,
    price: priceInCents,
    category,
    type,
    createdAt,
    updatedAt: createdAt,
  }

  data.transactions.push(newTransaction)

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

  return NextResponse.json(newTransaction)
}

export async function PUT(req: NextRequest) {
  return NextResponse.json({ transaction: 'Transaction PUT' })
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({ transaction: 'Transaction DELETE' })
}

export async function PATCH(req: NextRequest) {
  return NextResponse.json({ transaction: 'Transaction PATCH' })
}
