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
}
);

userController.post('/login', async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await userService.login(req.body.email, req.body.password);
    res.cookie('token', refreshToken, { httpOnly: true, sameSite: 'none', secure: true });
    res.header('Authorization', `Bearer ${accessToken}`);
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

userController.post('/renew-token',
  // authMiddleware.checkRefreshToken,
  passport.authenticate('refresh-token', { failureFlash: true }),
  async (req, res, next) => {
    try {
      const token = await userService.renewToken(req.user.id);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  });

userController.post('/session-login',
  passport.authenticate('local', {
    successRedirect: '/products/register'
  })
);

export default userController;
