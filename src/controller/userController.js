import express from 'express';

import userService from '../service/userService.js';

const userController = express.Router();

userController.post('/users/register', async (req, res, next) => {
  try {
    const registeredUser = await userService.register(req.body, req.prisma);
    res.send(registeredUser);
  } catch (error) {
    next(error);
  }
}
);

userController.post('/login', async (req, res, next) => {
  try {
    const token = await userService.login(req.body.email, req.body.password, req.prisma);
    res.cookie('token', token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 900000)
    });
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
});

export default userController;
