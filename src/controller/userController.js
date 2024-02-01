import express from 'express';
import passport from 'passport';

// import authMiddleware from '../middleware/authMiddleware.js';
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

userController.post(
  '/renew-token',
  // authMiddleware.checkRefreshToken,
  passport.authenticate('refresh-token', { failureFlash: true }),
  async (req, res, next) => {
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
  },
);

userController.post(
  '/session-login',
  passport.authenticate('local'),
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

userController.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

userController.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  async (req, res, next) => {
    const { accessToken, refreshToken } = await userService.generateJWT(
      req.user.id,
    );
    res.cookie('token', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.json({ accessToken });
  },
);

userController.get('/auth/kakao', passport.authenticate('kakao'));

userController.get(
  '/auth/kakao/callback',
  passport.authenticate('kakao'),
  async (req, res, next) => {
    const { accessToken, refreshToken } = await userService.generateJWT(
      req.user.id,
    );
    res.cookie('token', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.json({ accessToken });
  },
);

userController.get('/auth/naver', passport.authenticate('naver'));
userController.get(
  '/auth/naver/callback',
  passport.authenticate('naver'),
  async (req, res, next) => {
    const { accessToken, refreshToken } = await userService.generateJWT(
      req.user.id,
    );
    res.cookie('token', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.json({ accessToken });
  },
);

export default userController;
