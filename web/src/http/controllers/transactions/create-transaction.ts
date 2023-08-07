import { withErrorHandler } from '@/http/middlewares/with-error-handler'
import { makeCreateTransactionUseCase } from '@/use-cases/factories/make-create-transaction-use-case'
import { transactionBodySchema } from '@/validators/validation'
import { NextRequest, NextResponse } from 'next/server'

export const createTransaction = withErrorHandler(async (req: NextRequest) => {
  const data = transactionBodySchema.parse(await req.json())

  const createTransactionUseCase = makeCreateTransactionUseCase()

  const transaction = await createTransactionUseCase.execute(data)

  return NextResponse.json(transaction, { status: 201 })
})
