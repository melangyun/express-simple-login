import 'dotenv/config';
import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import reviewService from '../service/reviewService.js';

const reviewController = express.Router();

reviewController.post('/',
  authMiddleware.checkAccessToken,
  async (req, res, next) => {
    try {
      const createdReview = await reviewService.register({ ...req.body, authorId: req.user.id });
      res.status(201).send(createdReview);
    } catch (error) {
      next(error);
    }
  });

reviewController.get('/:id',
  async (req, res, next) => {
    try {
      const review = await reviewService.getReview(req.params.id);
      res.send(review);
    } catch (error) {
      next(error);
    }
  });

reviewController.get('/', async (req, res, next) => {
  try {
    const reviews = await reviewService.getReviews();
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

reviewController.put('/:id',
  authMiddleware.checkAccessToken,
  authMiddleware.checkReviewAuth,
  async (req, res, next) => {
    try {
      const updatedReview = await reviewService.updateReview(req.params.id, req.body);
      res.send(updatedReview);
    } catch (error) {
      next(error);
    }
  });

reviewController.delete('/:id',
  authMiddleware.checkAccessToken,
  authMiddleware.checkReviewAuth,
  async (req, res, next) => {
    try {
      const deletedReview = await reviewService.deleteReview(req.params.id);
      res.send(deletedReview);
    } catch (error) {
      next(error);
    }
  });

export default reviewController;
