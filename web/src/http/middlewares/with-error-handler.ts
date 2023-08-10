import { InvalidTransactionIdError } from '@/use-cases/errors/invalid-transaction-id-error'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { TooManyRequestsError } from '@/use-cases/errors/too-many-requests-error'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { rateLimitRequest } from './rate-limit-request'

export function errorHandler(error: any, req: NextRequest): NextResponse {
  console.error(
    '💥 An error occurred while processing the request:',
    req.url,
    error,
  )

  if (error instanceof ZodError) {
    const friendlyErrorMessage = fromZodError(error)
    return NextResponse.json(
      { error: 'Validation Error', details: friendlyErrorMessage.message },
      { status: 400 },
    )
  }

  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2025':
        return NextResponse.json(
          { error: 'Invalid Transaction Id', details: error.message },
          { status: 404 },
        )

      // ... TODO: handle other Prisma errors here

      default:
        return NextResponse.json(
          { error: 'Prisma Error', details: error.message },
          { status: 500 },
        )
    }
  }

  if (error instanceof InvalidTransactionIdError) {
    return NextResponse.json(
      { error: 'Invalid Transaction Id', details: error.message },
      { status: 404 },
    )
  }

  if (error instanceof TooManyRequestsError) {
    return NextResponse.json(
      {
        error: 'Too many requests',
        details:
          'Foi atingido o numero máximo de requests, aguarde um momento e tente novamente',
      },
      { status: 429 }, // 429 Too Many Requests
    )
  }

  return NextResponse.json(
    { error: 'Internal Server Error', details: 'Api Error' },
    { status: 500 },
  )
}

// This function is used to wrap a request handler with an error handler. It
// will return a new request handler that will call the provided request handler
// and handle any errors that occur.
export function withErrorHandler(
  handler: (
    req: NextRequest,
    params?: { slug: string },
  ) => Promise<NextResponse>,
) {
  return async (
    req: NextRequest,
    params?: { slug: string },
  ): Promise<NextResponse> => {
    try {
      // Check rate limiting
      rateLimitRequest(req)

      return await handler(req, params)
    } catch (error) {
      return errorHandler(error, req)
    }
  }
}
