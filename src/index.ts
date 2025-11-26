import { Elysia } from 'elysia';

const app = new Elysia().get('/', () => 'Hello Elysia').listen(process.env.PORT || 3001);

console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
