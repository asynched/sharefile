import { Hono } from 'hono'
import { authenticated } from 'src/modules/auth/middlewares'
import { folders } from 'src/database/schema/folders'
import { count, eq, sum } from 'drizzle-orm'
import { files } from 'src/database/schema/files'

export const router = new Hono<HonoContext>()

router.get('/', authenticated, async (c) => {
  const [folderStats] = await c.env.db
    .select({
      access: sum(folders.clicks),
    })
    .from(folders)
    .where(eq(folders.userId, c.var.userId))

  const [fileStats] = await c.env.db
    .select({
      files: count(),
      storage: sum(files.size),
    })
    .from(files)
    .where(eq(files.userId, c.var.userId))

  return c.json({
    access: Number(folderStats.access),
    files: fileStats.files,
    storage: Number(fileStats.storage) || 0,
  })
})
