import { withErrorHandler } from '@/http/middlewares/with-error-handler'
import { makeGetTransactionCountUseCase } from '@/use-cases/factories/make-get-transaction-count-use-case'
import { NextRequest, NextResponse } from 'next/server'

export const getTransactionCount = withErrorHandler(
  async (req: NextRequest) => {
    const getTransactionCountUseCase = makeGetTransactionCountUseCase()
    const response = await getTransactionCountUseCase.execute()

    return NextResponse.json(
      { totalTransactions: response.transactionsCount },
      { status: 200 },
    )
  },
)
