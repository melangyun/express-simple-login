import { expressjwt } from 'express-jwt';

import reviewRepository from '../repository/reviewRepository.js';
import userRepository from '../repository/userRepository.js';

async function checkReviewAuth(req, _, next) {
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
  requestProperty: 'user',
});

const checkRefreshToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'user',
  getToken: (req) => req.cookies.token,
});

function throwUnauthorizedError() {
  // 인증되지 않은 경우 401 에러를 발생시키는 함수
  const error = new Error('Unauthorized');
  error.code = 401;
  throw error;
}

function passportAuthenticateSession(req, res, next) {
  // passport 에서 제공하는 isAuthenticated 메소드를 사용하여 인증 여부를 확인
  if (!req.isAuthenticated()) {
    throwUnauthorizedError();
  }
  return next();
}

function checkSessionLogin(req, res, next) {
  if (!req.session?.userId) {
    throwUnauthorizedError();
  }
  const user = userRepository.findById(req.session.userId);
  if (!user) {
    throwUnauthorizedError();
  }
  req.user = {
    id: req.session.userId,
    email: user.email,
    name: user.name,
    provider: user.provider,
    providerId: user.providerId,
  };
  next();
}

export default {
  checkReviewAuth,
  checkSessionLogin,
  checkAccessToken,
  checkRefreshToken,
  passportAuthenticateSession,
};
