import { withErrorHandler } from '@/http/middlewares/with-error-handler'
import { makeGetTransactionsUseCase } from '@/use-cases/factories/make-get-transactions-use-case'
import { transactionParamsSchema } from '@/validators/validation'
import { NextRequest, NextResponse } from 'next/server'

export const getTransactions = withErrorHandler(async (req: NextRequest) => {
  const params = {
    sort: req.nextUrl.searchParams.get('_sort') ?? undefined,
    order: req.nextUrl.searchParams.get('_order') ?? undefined,
    page: req.nextUrl.searchParams.get('_page') ?? undefined,
    limit: req.nextUrl.searchParams.get('_limit') ?? undefined,
    searchTerm: req.nextUrl.searchParams.get('q') ?? undefined,
  }

  const paramsValidate = transactionParamsSchema.parse(params)

  const getTransactionsUseCase = makeGetTransactionsUseCase()

  const response = await getTransactionsUseCase.execute(paramsValidate)

  return NextResponse.json(response, { status: 200 })
})
