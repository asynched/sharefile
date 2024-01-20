import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { hash, verify } from 'src/utils/password/hashing'
import { HTTPException } from 'hono/http-exception'
import { users } from 'src/database/schema/users'
import { eq } from 'drizzle-orm'
import { logger } from 'src/services/logger'
import { authenticated } from 'src/modules/auth/middlewares'
import type { JwtPayload } from 'src/modules/auth/dto'

export const router = new Hono<HonoContext>()

const signUp = z.object({
  firstName: z.string().min(2).max(64),
  lastName: z.string().min(2).max(64),
  email: z.string().email().max(255),
  password: z.string().min(8).max(255),
})

router.post('/sign-up', zValidator('json', signUp), async (c) => {
  const data = c.req.valid('json')

  try {
    await c.env.db.insert(users).values({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: await hash(data.password),
    })

    return c.json(
      {
        message: 'User created',
      },
      201
    )
  } catch (err) {
    logger.error('Error creating user', err)

    return c.json(
      {
        message: 'E-mail is already taken',
      },
      500
    )
  }
})

const signIn = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(255),
})

router.post('/sign-in', zValidator('json', signIn), async (c) => {
  const data = c.req.valid('json')

  const [user] = await c.env.db
    .select()
    .from(users)
    .where(eq(users.email, data.email))

  if (!user) {
    throw new HTTPException(401, {
      message: 'Invalid credentials',
    })
  }

  const valid = await verify(user.password, data.password)

  if (!valid) {
    throw new HTTPException(401, {
      message: 'Invalid credentials',
    })
  }

  const iat = new Date()
  const exp = new Date(iat.getTime() + 1000 * 60 * 60 * 24 * 7)

  const payload: JwtPayload = {
    sub: user.id,
    iss: 'sharefile.asynched.tech',
    iat: iat,
    exp: exp,
  }

  const token = await sign(payload, 'secret')

  return c.json({
    token,
  })
})

router.get('/profile', authenticated, async (c) => {
  const [{ password: _, ...user }] = await c.env.db
    .select()
    .from(users)
    .where(eq(users.id, c.var.userId))

  return c.json(user)
})
