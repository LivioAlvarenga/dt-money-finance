import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

// if in development, log all queries
export const prisma = new PrismaClient({
  log: process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? ['query'] : [],
})
