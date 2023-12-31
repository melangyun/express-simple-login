import express from 'express';

import userService from '../service/userService.js';

const userController = express.Router();

userController.post('/register', async (req, res, next) => {
  try {
    const registeredUser = await userService.register(req.body, req.prisma);
    res.send(registeredUser);
  } catch (error) {
    next(error);
  }
}
);

userController.get('/users', async (req, res, next) => {
  try {
    const users = await userService.getUsers(req.prisma);
    res.send(users);
  } catch (error) {
    next(error);
  }
});

userController.post('/login', async (req, res, next) => {
  try {
    const token = await userService.login(req.body.email, req.body.password, req.prisma);
    res.cookie('token', token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 900000)
    });
    res.send(token);
  } catch (error) {
    next(error);
  }
});

export default userController;
