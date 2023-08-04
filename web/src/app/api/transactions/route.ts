import { createTransaction } from '@/http/controllers/transactions/create-transaction'
import { getTransactions } from '@/http/controllers/transactions/get-transactions'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  return createTransaction(req)
}

export async function GET(req: NextRequest) {
  return getTransactions(req)
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
