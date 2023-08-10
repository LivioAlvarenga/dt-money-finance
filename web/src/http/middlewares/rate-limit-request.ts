import { TooManyRequestsError } from '@/use-cases/errors/too-many-requests-error'
import 'dotenv/config'
import { NextRequest, NextResponse } from 'next/server'

const RATE_LIMIT = process.env.NEXT_PUBLIC_RATE_LIMIT_MAX
  ? parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT_MAX, 10)
  : 100 // number requests per TIME_WINDOW
const TIME_WINDOW = 1 * 2 * 1000 // 2 second in milliseconds

interface RequestCounts {
  [ip: string]: number[]
}

function getClientIp(req: NextRequest): string | null {
  // Get the request's x-forwarded-for header value
  const forwardedIps = (req.headers.get('x-forwarded-for') || '')
    .split(',')
    .map((ip) => ip.trim())

  // The first IP should be the client IP
  if (forwardedIps.length && forwardedIps[0]) {
    return forwardedIps[0]
  }

  // If x-real-ip header is set, use that value
  const realIp = req.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  // If no forwarded for header, use the request's remote address
  return null
}

const ipRequestCounts: RequestCounts = {}

export function rateLimitRequest(req: NextRequest): NextResponse | void {
  const currentTimestamp = Date.now()
  const clientIp = getClientIp(req)

  // If client IP is not found, let the request pass
  if (!clientIp) {
    return
  }

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
