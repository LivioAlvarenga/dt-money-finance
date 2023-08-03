import { makeGetTransactionCountUseCase } from '@/use-cases/factories/make-get-transaction-count-use-case'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const getTransactionCountUseCase = makeGetTransactionCountUseCase() // <== Call the factory function

  const response = await getTransactionCountUseCase.execute()

  return NextResponse.json(
    { totalTransactions: response.transactionsCount },
    { status: 200 },
  )
}
