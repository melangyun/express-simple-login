import express, { json } from 'express';
// import expressjwt from 'express-jwt';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import userRouter from './router/userRouter.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(json());
// app.use(expressjwt({
//   secret: process.env.JWT_SECRET,
//   algorithms: ['HS256'],
//   credentialsRequired: false
// }));
app.use(cookieParser());

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
