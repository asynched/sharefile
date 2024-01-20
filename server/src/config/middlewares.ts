import { MiddlewareHandler } from 'hono'
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { Storage, VercelStorage } from 'src/services/storage'
import { DefaultLogger } from 'drizzle-orm'
import { logger } from 'src/services/logger'

export const useDatabase: MiddlewareHandler<{
  Bindings: {
    DATABASE_URL: string
    DATABASE_AUTH_TOKEN: string
    db: LibSQLDatabase
  }
}> = (c, next) => {
  c.env.db = drizzle(
    createClient({
      url: c.env.DATABASE_URL,
      authToken: c.env.DATABASE_AUTH_TOKEN!,
    }),
    {
      logger: {
        logQuery: (query, params) => logger.info(query, { params }),
      },
    }
  )

  return next()
}

export const useStorage: MiddlewareHandler<{
  Bindings: {
    STORAGE_TOKEN: string
    storage: Storage
  }
}> = (c, next) => {
  c.env.storage = new VercelStorage(c.env.STORAGE_TOKEN)

  return next()
}
