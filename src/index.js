import 'dotenv/config';
import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';

import userController from './controller/userController.js';
import productController from './controller/productController.js';
import reviewController from './controller/reviewController.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = process.env.PORT ?? 3000;
const prisma = new PrismaClient();

app.use(json());
app.use(cookieParser());

// attach prisma to request
app.use((req, _, next) => {
  req.prisma = prisma;
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 라우터
app.use('', userController);
app.use('/products', productController);
app.use('/reviews', reviewController);

// 에러 핸들러
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
