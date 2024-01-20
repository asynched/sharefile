import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { router as auth } from 'src/modules/auth/routes'
import { router as folders } from 'src/modules/folders/routes'
import { router as statistics } from 'src/modules/statistics/routes'
import { router as files } from 'src/modules/files/routes'
import { logger } from 'src/services/logger'

const app = new Hono()
  .use('*', cors())
  .get('/health', (c) =>
    c.json({
      status: 'up',
      date: new Date(),
    })
  )
  .route('/auth', auth)
  .route('/folders', folders)
  .route('/statistics', statistics)
  .route('/files', files)

Bun.serve({
  port: 8787,
  fetch: app.fetch,
})

logger.info('Server started', { port: 8787 })
