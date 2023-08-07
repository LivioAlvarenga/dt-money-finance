import { deleteTransaction } from '@/http/controllers/transactions/delete-transaction'
import { editTransaction } from '@/http/controllers/transactions/edit-transaction'
import { getTransaction } from '@/http/controllers/transactions/get-transaction'
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
  return getTransaction(req, params)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  return editTransaction(req, params)
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  return NextResponse.json({ transaction: `Transaction ${params.slug} POST` })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  return NextResponse.json({ transaction: `Transaction ${params.slug} PATCH` })
}
