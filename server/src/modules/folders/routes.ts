import { zValidator } from '@hono/zod-validator'
import { and, desc, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { files } from 'src/database/schema/files'
import { folders } from 'src/database/schema/folders'
import { authenticated } from 'src/modules/auth/middlewares'
import { logger } from 'src/services/logger'
import { TypeOf, z } from 'zod'

export const router = new Hono<HonoContext>()

router.get('/', authenticated, async (c) => {
  const rows = await c.env.db
    .select()
    .from(folders)
    .where(eq(folders.userId, c.var.userId))
    .orderBy(desc(folders.createdAt))

  return c.json(rows)
})

router.get('/:id', authenticated, async (c) => {
  const [folder] = await c.env.db
    .select()
    .from(folders)
    .where(
      and(eq(folders.userId, c.var.userId), eq(folders.id, c.req.param('id')))
    )
    .limit(1)

  if (!folder) {
    throw new HTTPException(404, {
      message: 'Folder not found',
    })
  }

  return c.json(folder)
})

const createFolder = z.object({
  name: z.string().min(1).max(255),
})

router.post('/', authenticated, zValidator('json', createFolder), async (c) => {
  try {
    const data = c.req.valid('json') as TypeOf<typeof createFolder>

    const [folder] = await c.env.db
      .insert(folders)
      .values({
        name: data.name,
        userId: c.var.userId,
      })
      .returning()

    return c.json(folder, 201)
  } catch (err) {
    logger.error('Error creating folder', err)

    return c.json('Error creating folder', 500)
  }
})

const updateFolder = z.object({
  name: z.string().min(1).max(255),
  public: z.boolean(),
})

router.put(
  '/:id',
  authenticated,
  zValidator('json', updateFolder),
  async (c) => {
    try {
      const data = c.req.valid('json') as TypeOf<typeof updateFolder>

      const [folder] = await c.env.db
        .update(folders)
        .set({
          name: data.name,
          public: data.public,
        })
        .where(
          and(
            eq(folders.userId, c.var.userId),
            eq(folders.id, c.req.param('id'))
          )
        )
        .returning()

      return c.json(folder, 200)
    } catch (err) {
      logger.error('Error updating folder', err)

      return c.json('Error updating folder', 500)
    }
  }
)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

router.patch('/:id/visibility', authenticated, async (c) => {
  await delay(1_000)

  const [folder] = await c.env.db
    .select()
    .from(folders)
    .where(
      and(eq(folders.userId, c.var.userId), eq(folders.id, c.req.param('id')))
    )
    .limit(1)

  if (!folder) {
    throw new HTTPException(404, {
      message: 'Folder not found',
    })
  }

  await c.env.db
    .update(folders)
    .set({
      public: folder.public ? false : true,
    })
    .where(eq(folders.id, c.req.param('id')))

  return new Response(null, {
    status: 204,
  })
})

router.delete('/:id', authenticated, async (c) => {
  logger.warn(
    'Folder is being deleted, although file deletion is not implemented',
    {
      id: c.req.param('id'),
    }
  )

  const urls = await c.env.db
    .select({ url: files.url })
    .from(files)
    .where(
      and(eq(files.userId, c.var.userId), eq(files.folderId, c.req.param('id')))
    )
    .then((rows) => rows.map((row) => row.url))

  await c.env.db
    .delete(files)
    .where(
      and(eq(files.userId, c.var.userId), eq(files.folderId, c.req.param('id')))
    )
    .returning()

  await c.env.storage.delete(urls)

  await c.env.db
    .delete(folders)
    .where(
      and(eq(folders.userId, c.var.userId), eq(folders.id, c.req.param('id')))
    )

  return new Response(null, {
    status: 204,
  })
})
