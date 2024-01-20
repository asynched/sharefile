import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { folders } from 'src/database/schema/folders'
import { users } from 'src/database/schema/users'

export const files = sqliteTable(
  'files',
  {
    id: text('id')
      .primaryKey()
      .notNull()
      .$default(() => crypto.randomUUID()),
    name: text('name').notNull(),
    url: text('url').notNull(),
    size: integer('size').notNull(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),
    folderId: text('folder_id')
      .notNull()
      .references(() => folders.id, {
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
    filesUniqueNameFolderId: uniqueIndex('file_unique_name_folder_id').on(
      table.name,
      table.folderId
    ),
  })
)
