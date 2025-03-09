import { createMiddleware } from '@mswjs/http-middleware';
import express from 'express';
import cors from 'cors';
import {handlers} from './handlers.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(createMiddleware(...handlers));

// Start the server
app.listen(8000, () => {
  console.log(`Mock API server running at http://localhost:${8000}`);
});

console.log('asd')