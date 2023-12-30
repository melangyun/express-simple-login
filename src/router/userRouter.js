import express from 'express';

import userController from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/register', userController.register);

userRouter.get('/users', userController.getUsers);

userRouter.post('/login', userController.login);

export default userRouter;
