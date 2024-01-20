import { type LibSQLDatabase } from 'drizzle-orm/libsql'
import { Storage } from 'src/services/storage'

declare global {
  declare type HonoContext = {
    Bindings: {
      db: LibSQLDatabase
      storage: Storage
    }
  }
}

export {}
