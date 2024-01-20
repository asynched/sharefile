import { Hono } from 'hono'
import { authenticated } from 'src/modules/auth/middlewares'
import { folders } from 'src/database/schema/folders'
import { count, eq, sum } from 'drizzle-orm'
import { files } from 'src/database/schema/files'
import { db } from 'src/database/client'

export const router = new Hono()

router.get('/', authenticated, async (c) => {
  const [folderStats] = await db
    .select({
      total: count(),
      access: sum(folders.clicks),
    })
    .from(folders)
    .where(eq(folders.userId, c.var.userId))

  const [fileStats] = await db
    .select({
      files: count(),
      storage: sum(files.size),
    })
    .from(files)
    .where(eq(files.userId, c.var.userId))

  return c.json({
    access: Number(folderStats?.access) || 0,
    folders: folderStats.total,
    files: fileStats.files,
    storage: Number(fileStats.storage) || 0,
  })
})
