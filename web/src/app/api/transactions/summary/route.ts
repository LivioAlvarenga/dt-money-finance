import { getTransactionSummary } from '@/http/controllers/transactions/get-transaction-summary'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  return getTransactionSummary(req)
}
