import { Elysia } from 'elysia';
import {privateDokterRoute, publicDokterRoute} from './routes/dokter.route'
import { publicAntrianRoute, privateAntrianRoute, antrianWebSocket } from './routes/antrian.route'
import { authRoute } from './routes/auth.route'
import { cors } from '@elysiajs/cors'
import {jwtPlugin} from './middleware/auth'

const port = process.env.PORT || 3001;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

const app = new Elysia();
app
  .use(
    cors({
      origin: frontendUrl,
      credentials: true,
    })
  )
  .use(jwtPlugin)
  .use(authRoute)
  .use(publicAntrianRoute)
  .use(privateAntrianRoute)
  .use(antrianWebSocket(app))
  .use(publicDokterRoute)
  .use(privateDokterRoute)
  .listen({ port });

console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
console.log(`🔌 WebSocket ready at ws://localhost:${port}/ws/antrian`);
