import { withErrorHandler } from '@/http/middlewares/with-error-handler'
import { makeGetTransactionUseCase } from '@/use-cases/factories/make-get-transaction-use-case'
import { transactionIdSchema } from '@/validators/validation'
import { NextRequest, NextResponse } from 'next/server'

export const getTransaction = withErrorHandler(
  async (req: NextRequest, params: { slug: string }) => {
    const { slug: id } = transactionIdSchema.parse(params)

    const getTransactionUseCase = makeGetTransactionUseCase()
    const transaction = await getTransactionUseCase.execute(id)
    return NextResponse.json(transaction, { status: 200 })
  },
)
