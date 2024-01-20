import { and, desc, eq, sum } from 'drizzle-orm'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { MAX_USER_STORAGE_IN_BYTES } from 'src/config/globals'
import { db } from 'src/database/client'
import { files } from 'src/database/schema/files'
import { folders } from 'src/database/schema/folders'
import { authenticated } from 'src/modules/auth/middlewares'
import { storage } from 'src/services/storage'

export const router = new Hono()

router.get('/latest', authenticated, async (c) => {
  const rows = await db
    .select({
      id: files.id,
      name: files.name,
      url: files.url,
      size: files.size,
      userId: files.userId,
      folderId: files.folderId,
      folder: folders.name,
      createdAt: files.createdAt,
      updatedAt: files.updatedAt,
    })
    .from(files)
    .where(eq(files.userId, c.var.userId))
    .innerJoin(folders, eq(files.folderId, folders.id))
    .limit(10)
    .orderBy(desc(files.updatedAt))

  return c.json(rows)
})

router.get('/:folderId', authenticated, async (c) => {
  const rows = await db
    .select({
      id: files.id,
      name: files.name,
      url: files.url,
      size: files.size,
      userId: files.userId,
      folderId: files.folderId,
      folder: folders.name,
      createdAt: files.createdAt,
      updatedAt: files.updatedAt,
    })
    .from(files)
    .where(
      and(
        eq(files.folderId, c.req.param('folderId')),
        eq(files.userId, c.var.userId)
      )
    )
    .innerJoin(folders, eq(files.folderId, folders.id))
    .orderBy(desc(files.updatedAt))

  return c.json(rows)
})

router.get('/:folderId/public', async (c) => {
  const rows = await db
    .select({
      id: files.id,
      name: files.name,
      url: files.url,
      size: files.size,
      userId: files.userId,
      folderId: files.folderId,
      folder: folders.name,
      createdAt: files.createdAt,
      updatedAt: files.updatedAt,
    })
    .from(files)
    .where(
      and(eq(files.folderId, c.req.param('folderId')), eq(folders.public, true))
    )
    .innerJoin(folders, eq(files.folderId, folders.id))
    .orderBy(desc(files.updatedAt))

  return c.json(rows)
})

router.post('/:folderId', authenticated, async (c) => {
  const form = await c.req.formData()

  const archives = [] as File[]

  for (const file of form.getAll('files')) {
    if (file instanceof File) {
      archives.push(file)
    }
  }

  const totalSize = archives.reduce((acc, file) => acc + file.size, 0)

  const used = await db
    .select({
      used: sum(files.size),
    })
    .from(files)
    .where(eq(files.userId, c.var.userId))
    .groupBy(files.userId)
    .then((r) => Number(r[0]?.used) || 0)

  if (used + totalSize > MAX_USER_STORAGE_IN_BYTES) {
    throw new HTTPException(400, {
      message: 'You have exceeded your storage limit',
    })
  }

  if (!archives.length) {
    return c.json([])
  }

  const urls = await Promise.all(
    archives.map((file) =>
      storage.upload({
        file: file,
        name: file.name,
        folder: `uploads/users/${c.var.userId}`,
        // TODO: Allow for private uploads
        public: true,
      })
    )
  )

  const rows = await db
    .insert(files)
    .values(
      archives.map((file, i) => ({
        name: file.name,
        url: urls[i],
        size: file.size,
        userId: c.var.userId,
        folderId: c.req.param('folderId'),
      }))
    )
    .returning()

  return c.json(rows)
})

router.delete('/:folderId/:fileId', authenticated, async (c) => {
  const [file] = await db
    .select({
      url: files.url,
    })
    .from(files)
    .where(
      and(
        eq(files.id, c.req.param('fileId')),
        eq(files.folderId, c.req.param('folderId')),
        eq(files.userId, c.var.userId)
      )
    )

  if (!file) {
    throw new HTTPException(404, {
      message: 'File not found',
    })
  }

  const rows = await db
    .delete(files)
    .where(
      and(
        eq(files.id, c.req.param('fileId')),
        eq(files.folderId, c.req.param('folderId')),
        eq(files.userId, c.var.userId)
      )
    )
    .returning()

  await storage.delete(file.url)

  return c.json(rows)
})
