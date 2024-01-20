import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { users } from './users'

export const folders = sqliteTable('folders', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$default(() => crypto.randomUUID()),
  name: text('name').unique().notNull(),
  public: integer('public', { mode: 'boolean' }).notNull().default(false),
  clicks: integer('clicks').notNull().default(0),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .notNull()
    .$default(() => new Date()),
})
