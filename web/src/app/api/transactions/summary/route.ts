import { makeGetTransactionSummaryUseCase } from '@/use-cases/factories/make-get-transaction-summary-use-case'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
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

    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: 'Prisma Error', details: error.message },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
