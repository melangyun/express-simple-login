import reviewRepository from "../repository/reviewRepository.js";

async function register(review) {
  const createdReview = await reviewRepository.save(review);
  return createdReview;
}

async function getReview(id) {
  const review = await reviewRepository.getReview(id);
  return review;
}

async function getReviews() {
  return await reviewRepository.getReviews();
}

async function updateReview(id, review) {
  const updatedReview = await reviewRepository.updateReview(id, review);
  return updatedReview;
}

async function deleteReview(id) {
  const deletedReview = await reviewRepository.deleteReview(id);
  return deletedReview;
}

export default {
  register,
  getReview,
  getReviews,
  updateReview,
  deleteReview,
};
