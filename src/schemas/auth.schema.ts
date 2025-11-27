import { t } from 'elysia'

export const LoginSchema = t.Object({
  username: t.String(),
  password: t.String()
})
