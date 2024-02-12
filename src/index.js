import 'dotenv/config';
import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import userController from './controller/userController.js';
import productController from './controller/productController.js';
import reviewController from './controller/reviewController.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

// 라우터
app.use('', userController);
app.use('/products', productController);
app.use('/reviews', reviewController);

// 에러 핸들러
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
