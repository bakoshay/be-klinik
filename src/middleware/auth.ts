import { Elysia } from 'elysia'
import jwt from '@elysiajs/jwt'

export const jwtPlugin = jwt({
  name: 'jwt',
  secret: process.env.JWT_SECRET || 'your-secret-key',
  exp: '2h', // Token expired dalam 2 jam
})

export const authMiddleware = (app: Elysia) =>
  app.use(jwtPlugin).onBeforeHandle(async ({ jwt, set, request, store }) => {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      set.status = 401
      return { message: 'Unauthorized: Token is required' }
    }

    const token = authHeader.split(' ')[1]
    const payload = await jwt.verify(token)

    if (!payload) {
      set.status = 401
      return { message: 'Unauthorized: Invalid or expired token' }
    }
  })
