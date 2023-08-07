import { withErrorHandler } from '@/http/middlewares/with-error-handler'
import { makeEditTransactionUseCase } from '@/use-cases/factories/make-edit-transaction-use-case'
import {
  transactionBodySchema,
  transactionIdSchema,
} from '@/validators/validation'
import { NextRequest, NextResponse } from 'next/server'

export const editTransaction = withErrorHandler(
  async (req: NextRequest, params: { slug: string }) => {
    const { slug: id } = transactionIdSchema.parse(params)
    const data = transactionBodySchema.parse(await req.json())

    const editTransactionUseCase = makeEditTransactionUseCase()

    const transaction = await editTransactionUseCase.execute(id, data)

    return NextResponse.json(transaction, { status: 201 })
  },
)
