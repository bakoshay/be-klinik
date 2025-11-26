import { Elysia } from 'elysia';
import {dokterRoute} from './routes/dokter.route'

const app = new Elysia()
  .use(dokterRoute)
  .listen(process.env.PORT || 3001);

console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
