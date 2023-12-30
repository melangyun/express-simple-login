import 'dotenv/config';
import express, { json } from 'express';
// import expressjwt from 'express-jwt';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';

import userRouter from './router/userRouter.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = process.env.PORT ?? 3000;
const prisma = new PrismaClient();

app.use(json());
// app.use(expressjwt({
//   secret: process.env.JWT_SECRET,
//   algorithms: ['HS256'],
//   credentialsRequired: false
// }));
app.use(cookieParser());

// attach prisma to request
app.use((req, _, next) => {
  req.prisma = prisma;
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 유저 라우터
app.use('', userRouter);

// 에러 핸들러
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
