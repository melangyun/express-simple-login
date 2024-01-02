import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import userService from '../service/userService.js';

const userController = express.Router();

userController.post('/users/register', async (req, res, next) => {
  try {
    const registeredUser = await userService.register(req.body, req.prisma);
    res.status(201).send(registeredUser);
  } catch (error) {
    next(error);
  }
}
);

userController.post('/login', async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await userService.login(req.body.email, req.body.password, req.prisma);
    res.cookie('token', refreshToken, { httpOnly: true, sameSite: 'none', secure: true });
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

userController.post('/renew-token',
  authMiddleware.checkRefreshToken,
  async (req, res, next) => {
    try {
      const token = await userService.renewToken(req.user.id, req.prisma);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  });

userController.post('/session-login', async (req, res, next) => {
  try {
    const user = await userService.sessionLogin(req.body.email, req.body.password, req.prisma);
    req.session.userId = user.id;
    res.redirect('/products/register');
  } catch (error) {
    next(error);
  }
});

export default userController;
