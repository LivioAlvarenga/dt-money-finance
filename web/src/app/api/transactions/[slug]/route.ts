import { deleteTransaction } from '@/http/controllers/transactions/delete-transaction'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  return deleteTransaction(req, params)
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  return NextResponse.json({ transaction: `Transaction ${params.slug} GET` })
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  return NextResponse.json({ transaction: `Transaction ${params.slug} PATCH` })
}
