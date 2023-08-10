import 'dotenv/config'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('Rate Limit Request Middleware (e2e)', () => {
  it('should hit rate limit after multiple requests', async () => {
    const API_URL = process.env.NEXT_PUBLIC_URL_API

    // Do 50 requests
    for (let i = 0; i < 50; i++) {
      await request(API_URL).get(
        `?_sort=createdAt&_order=desc&_page=1&_limit=3`,
      )
    }

    // 51st request should be rate limited
    const response = await request(API_URL).get(
      `?_sort=createdAt&_order=desc&_page=1&_limit=3`,
    )

    expect(response.statusCode).toEqual(429) // 429 Too Many Requests
    expect(response.body.error).toBe('Too many requests')
  })
})
