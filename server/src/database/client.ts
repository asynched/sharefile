import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { env } from 'src/config/env'
import { logger } from 'src/services/logger'

export const db = drizzle(
  createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  }),
  {
    logger: {
      logQuery: (query, params) => logger.info(query, { params }),
    },
  }
)
