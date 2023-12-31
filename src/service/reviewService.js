import reviewRepository from '../repository/reviewRepository.js';

async function register (review, prisma) {
  const createdReview = await reviewRepository.save(review, prisma);
  return createdReview;
}

async function getReview (id, prisma) {
  const review = await reviewRepository.getReview(id, prisma);
  return review;
}

async function getReviews (prisma) {
  return await reviewRepository.getReviews(prisma);
}

async function updateReview (id, review, prisma) {
  const updatedReview = await reviewRepository.updateReview(id, review, prisma);
  return updatedReview;
}

async function deleteReview (id, prisma) {
  const deletedReview = await reviewRepository.deleteReview(id, prisma);
  return deletedReview;
}

export default {
  register,
  getReview,
  getReviews,
  updateReview,
  deleteReview
};
