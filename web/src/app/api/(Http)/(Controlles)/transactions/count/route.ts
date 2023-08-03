import { makeGetTransactionCountUseCase } from '@/use-cases/factories/make-get-transaction-count-use-case'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const getTransactionCountUseCase = makeGetTransactionCountUseCase() // <== Call the factory function
    const response = await getTransactionCountUseCase.execute()

    return NextResponse.json(
      { totalTransactions: response.transactionsCount },
      { status: 200 },
    )
  } catch (error) {
    console.error(
      '💥An error occurred while processing the request: transactions/count',
      error,
    )

    if (error instanceof PrismaClientKnownRequestError) {
      // switch (error.code) {
      //   case 'P2002':
      //     return NextResponse.json(
      //       { error: 'Duplicate key error' },
      //       { status: 400 },
      //     )
      // }
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
