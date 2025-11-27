import { Elysia } from 'elysia';
import {privateDokterRoute, publicDokterRoute} from './routes/dokter.route'
import { authRoute } from './routes/auth.route'
import { cors } from '@elysiajs/cors'
import {jwtPlugin} from './middleware/auth'

const port = process.env.PORT || 3001;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

const app = new Elysia()
  .use(
    cors({
      origin: frontendUrl,
      credentials: true,
    })
  )
  .use(jwtPlugin)
  .use(authRoute)
  .use(publicDokterRoute)
  .use(privateDokterRoute)
  .listen({ port });

console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
