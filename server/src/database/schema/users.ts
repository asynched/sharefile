import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  banned: integer('banned', { mode: 'boolean' }).notNull().default(false),
  tier: text('tier', { enum: ['free', 'pro'] })
    .notNull()
    .default('free'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .notNull()
    .$default(() => new Date()),
})
