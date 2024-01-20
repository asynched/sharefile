import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { router as auth } from 'src/modules/auth/routes'
import { router as folders } from 'src/modules/folders/routes'
import { router as statistics } from 'src/modules/statistics/routes'
import { router as files } from 'src/modules/files/routes'
import { useDatabase, useStorage } from 'src/config/middlewares'

const app = new Hono()
  .use('*', cors(), useDatabase, useStorage)
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

export default app
