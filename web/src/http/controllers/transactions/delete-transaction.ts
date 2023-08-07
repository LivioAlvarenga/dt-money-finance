import { withErrorHandler } from '@/http/middlewares/with-error-handler'
import { makeDeleteTransactionUseCase } from '@/use-cases/factories/make-delete-transaction-use-case'
import { transactionIdSchema } from '@/validators/validation'
import { NextRequest, NextResponse } from 'next/server'

export const deleteTransaction = withErrorHandler(
  async (req: NextRequest, params: { slug: string }) => {
    const { slug: id } = transactionIdSchema.parse(params)

    const deleteTransactionUseCase = makeDeleteTransactionUseCase()

    const transactionDeleted = await deleteTransactionUseCase.execute(id)

    return NextResponse.json(transactionDeleted, { status: 200 })
  },
)
