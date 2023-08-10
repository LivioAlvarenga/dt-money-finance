import { TooManyRequestsError } from '@/use-cases/errors/too-many-requests-error'
import 'dotenv/config'
import { NextRequest, NextResponse } from 'next/server'

const RATE_LIMIT = process.env.RATE_LIMIT_MAX
  ? parseInt(process.env.RATE_LIMIT_MAX, 10)
  : 100 // number requests per TIME_WINDOW
const TIME_WINDOW = 1 * 2 * 1000 // 2 second in milliseconds

interface RequestCounts {
  [ip: string]: number[]
}

const ipRequestCounts: RequestCounts = {}

export function rateLimitRequest(req: NextRequest): NextResponse | void {
  const currentTimestamp = Date.now()
  const clientIp =
    req.headers.get('x-forwarded-for') || req.socket.remoteAddress

  if (!ipRequestCounts[clientIp]) {
    ipRequestCounts[clientIp] = []
  }

  ipRequestCounts[clientIp] = ipRequestCounts[clientIp].filter(
    (timestamp) => currentTimestamp - timestamp < TIME_WINDOW,
  )

  if (ipRequestCounts[clientIp].length >= RATE_LIMIT) {
    throw new TooManyRequestsError()
  }

  ipRequestCounts[clientIp].push(currentTimestamp)
}
