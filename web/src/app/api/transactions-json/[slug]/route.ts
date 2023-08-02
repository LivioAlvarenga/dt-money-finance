import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const id = params.slug

  const filePath = path.join(process.cwd(), 'db.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(fileContents)

  const transaction = data.transactions.find(
    (transaction: any) => transaction.id === id,
  )

  if (transaction) {
    return NextResponse.json(transaction)
  } else {
    return NextResponse.json({ message: 'Transaction not found', status: 404 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  return NextResponse.json({ transaction: `Transaction ${params.slug} POST` })
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  return NextResponse.json({ transaction: `Transaction ${params.slug} PUT` })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const id = params.slug

  const filePath = path.join(process.cwd(), 'db.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(fileContents)

  const transactionIndex = data.transactions.findIndex(
    (transaction: any) => transaction.id === id,
  )

  if (transactionIndex === -1) {
    return NextResponse.json({ message: 'Transaction not found', status: 404 })
  }

  data.transactions.splice(transactionIndex, 1) // Remove a transação

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2)) // Salva as alterações no arquivo

  return NextResponse.json({ message: `Transaction ${id} deleted` }) // Retorna uma mensagem de sucesso
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const id = params.slug
  const { description, price, category, type } = await req.json()

  const filePath = path.join(process.cwd(), 'db.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(fileContents)

  const transactionIndex = data.transactions.findIndex(
    (transaction: any) => transaction.id === id,
  )

  if (transactionIndex === -1) {
    return NextResponse.json(
      { message: 'Transaction not found' },
      { status: 404 },
    )
  }

  const updatedTransaction = {
    ...data.transactions[transactionIndex],
    description,
    price,
    category,
    type,
    updatedAt: new Date().toISOString(),
  }

  data.transactions[transactionIndex] = updatedTransaction

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

  return NextResponse.json(updatedTransaction)
}
