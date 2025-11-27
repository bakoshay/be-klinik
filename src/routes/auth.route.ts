import { Elysia } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { prisma } from '../db/prisma'
import { LoginSchema } from '../schemas/auth.schema'
import { success, error } from '../utils/response'
import bcrypt from 'bcryptjs'

export const authRoute = (app: Elysia) =>
 app
    .use(
      jwt({
        name: 'jwt',
        secret: process.env.JWT_SECRET || 'supersecret',
      })
    )
    .group('/auth', app =>
      app
        // Login
        .post('/login', async ({ body, jwt }) => {
          const { username, password } = body

          const user = await prisma.admin.findUnique({ where: { username } })
          if (!user) return error('Username tidak ditemukan', 404)

          const match = await bcrypt.compare(password, user.password)
          if (!match) return error('Password salah', 401)

          const token = await jwt.sign({
            id: user.id,
            username: user.username
          })

          return success('Login berhasil', {
            name: user.name,
            username: user.username,
            token
          })
        }, { body: LoginSchema })
    )
