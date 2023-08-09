import { withErrorHandler } from '@/http/middlewares/with-error-handler'
import { makeGetTransactionsUseCase } from '@/use-cases/factories/make-get-transactions-use-case'
import {
  transactionParamsSchema,
  transactionSearchParamsSchema,
} from '@/validators/validation'
import { NextRequest, NextResponse } from 'next/server'

export const getTransactions = withErrorHandler(async (req: NextRequest) => {
  const params = {
    sort: req.nextUrl.searchParams.get('_sort') ?? undefined,
    order: req.nextUrl.searchParams.get('_order') ?? undefined,
    page: req.nextUrl.searchParams.get('_page') ?? undefined,
    limit: req.nextUrl.searchParams.get('_limit') ?? undefined,
  }
  const paramsValidate = transactionParamsSchema.parse(params)

  const search = {
    searchTerm: req.nextUrl.searchParams.get('q') ?? undefined,
  }
  let searchValidate = {}
  if (search.searchTerm !== undefined && search.searchTerm !== '') {
    searchValidate = transactionSearchParamsSchema.parse(search)
  }

  const allParams = {
    ...paramsValidate,
    ...searchValidate,
  }

  const getTransactionsUseCase = makeGetTransactionsUseCase()

  const response = await getTransactionsUseCase.execute(allParams)

  return NextResponse.json(response, { status: 200 })
})
