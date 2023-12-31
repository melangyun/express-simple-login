import { expressjwt } from 'express-jwt';

import reviewRepository from '../repository/reviewRepository.js';

async function checkReviewAuth (req, res, next) {
  try {
    const review = await reviewRepository.getReview(req.params.id, req.prisma);
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
const jwtCheck = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'user'
});

export default {
  checkReviewAuth,
  jwtCheck
};
