import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

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
    return NextResponse.json(
      { error: 'Prisma Error', details: error.message },
      { status: 500 },
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
  handler: (req: NextRequest) => Promise<NextResponse>,
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(req)
    } catch (error) {
      return errorHandler(error, req)
    }
  }
}
