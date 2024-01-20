import type { MiddlewareHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { verify } from 'hono/jwt'
import type { JwtPayload } from 'src/modules/auth/dto'
import { logger } from 'src/services/logger'

export const authenticated: MiddlewareHandler<
  {
    Variables: {
      userId: number
    }
  },
  string,
  any
> = async (c, next) => {
  const auth = c.req.header('authorization')?.replace('Bearer ', '')

  if (!auth) {
    throw new HTTPException(401, {
      message: 'Missing authentication header or cookie',
    })
  }

  try {
    const data: JwtPayload = await verify(auth, 'secret')

    c.set('userId', data.sub)

    return await next()
  } catch (err) {
    logger.error('Error verifying token', err)

    return c.json(
      {
        message: 'Invalid token',
      },
      401
    )
  }
}
