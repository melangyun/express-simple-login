import reviewRepository from '../repository/reviewRepository.js';

async function register(review) {
  return reviewRepository.save(review);
}

async function getReview(id) {
  return reviewRepository.getReview(id);
}

async function getReviews() {
  return reviewRepository.getReviews();
}

async function updateReview(id, review) {
  return reviewRepository.updateReview(id, review);
}

async function deleteReview(id) {
  return reviewRepository.deleteReview(id);
}

export default {
  register,
  getReview,
  getReviews,
  updateReview,
  deleteReview,
};
