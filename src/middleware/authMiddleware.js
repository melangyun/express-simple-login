import { expressjwt } from 'express-jwt';

import reviewRepository from '../repository/reviewRepository.js';

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

function checkSessionLogin(req, res, next) {
  if (!req.session?.userId) {
    throwUnauthorizedError();
  }
  req.user = { id: req.session.userId };
  next();
}

export default {
  checkReviewAuth,
  checkSessionLogin,
  checkAccessToken,
  checkRefreshToken,
};
