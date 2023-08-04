import { getTransactionCount } from '@/http/controllers/transactions/get-transaction-count'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  return getTransactionCount(req)
}
