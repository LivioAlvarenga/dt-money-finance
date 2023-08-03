import { makeGetTransactionSummaryUseCase } from '@/use-cases/factories/make-get-transaction-summary-use-case'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const getTransactionSummaryUseCase = makeGetTransactionSummaryUseCase()
    const response = await getTransactionSummaryUseCase.execute()

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error(
      '💥An error occurred while processing the request: transactions/summary',
      error,
    )
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
