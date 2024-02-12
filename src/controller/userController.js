import express from 'express';

import userService from '../service/userService.js';

const userController = express.Router();

userController.post('/users/register', async (req, res, next) => {
  try {
    const registeredUser = await userService.register(req.body);
    res.status(201).send(registeredUser);
  } catch (error) {
    next(error);
  }
});

userController.post('/login', async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await userService.login(
      req.body.email,
      req.body.password,
    );
    res.cookie('token', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

userController.post('/renew-token', async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.token;
    const { accessToken, refreshToken } = await userService.renewToken(
      req.user.id,
      oldRefreshToken,
    );
    res.cookie('token', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

userController.post(
  '/session-login',
  // async (req, res, next) => {
  //   try {
  //     const user = await userService.sessionLogin(req.body.email, req.body.password);
  //     req.session.userId = user.id;
  //     res.json(user);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
);

export default userController;
