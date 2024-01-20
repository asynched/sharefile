import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { users } from 'src/database/schema/users'

export const folders = sqliteTable(
  'folders',
  {
    id: text('id')
      .primaryKey()
      .notNull()
      .$default(() => crypto.randomUUID()),
    name: text('name').notNull(),
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
  },
  (table) => ({
    foldersUniqueNameUserId: uniqueIndex('folder_unique_name_user_id').on(
      table.name,
      table.userId
    ),
  })
)
