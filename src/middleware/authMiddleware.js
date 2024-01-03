import { expressjwt } from 'express-jwt';

import reviewRepository from '../repository/reviewRepository.js';

async function checkReviewAuth (req, _, next) {
  try {
    const review = await reviewRepository.getReview(req.params.id);
    if (review.authorId !== req.user.id) {
      const error = new Error('Forbidden');
      error.code = 403;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
}
const checkAccessToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'user'
});

const checkRefreshToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'user',
  getToken: (req) => req.cookies.token
});

function checkSessionLogin (req, res, next) {
  if (!req.session.userId) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }
  req.user = { id: req.session.userId };
  next();
}

function passportAuthenticateSession (req, res, next) {
  // passport 에서 제공하는 isAuthenticated 메소드를 사용하여 인증 여부를 확인
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

export default {
  checkReviewAuth,
  checkSessionLogin,
  checkAccessToken,
  checkRefreshToken,
  passportAuthenticateSession
};
