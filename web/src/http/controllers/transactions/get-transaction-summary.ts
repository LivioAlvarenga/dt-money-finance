import { withErrorHandler } from '@/http/middlewares/with-error-handler'
import { makeGetTransactionSummaryUseCase } from '@/use-cases/factories/make-get-transaction-summary-use-case'
import { NextRequest, NextResponse } from 'next/server'

export const getTransactionSummary = withErrorHandler(
  async (req: NextRequest) => {
    const getTransactionSummaryUseCase = makeGetTransactionSummaryUseCase()
    const response = await getTransactionSummaryUseCase.execute()

    return NextResponse.json(response, { status: 200 })
  },
)
