import type { Config } from 'drizzle-kit'
import 'dotenv/config'

export default {
  driver: 'turso',
  schema: 'src/database/schema',
  out: 'drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
} satisfies Config
