import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
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
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
});

userController.post('/user/renew-token',
  authMiddleware.jwtCheck,
  async (req, res, next) => {
    try {
      const token = await userService.renewToken(req.user.id, req.prisma);
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  });

export default userController;

// TODO: refresh token, 세션기반 로그인