import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

// if in development, log all queries
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
})
