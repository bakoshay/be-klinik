import { Elysia } from 'elysia';
import {dokterRoute} from './routes/dokter.route'
import { cors } from '@elysiajs/cors'

const port = process.env.PORT || 3001;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

const app = new Elysia()
  .use(
    cors({
      origin: frontendUrl,
      credentials: true,
    })
  )
  .use(dokterRoute)
  .listen({ port });

console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
