import 'dotenv/config';
import express from 'express';
import { expressjwt } from 'express-jwt';

import reviewService from '../service/reviewService.js';

const reviewController = express.Router();

const jwtCheck = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
});

reviewController.post('/', jwtCheck,
  async (req, res, next) => {
    try {
      const createdReview = await reviewService.register(req.body, req.prisma);
      res.status(201).send(createdReview);
    } catch (error) {
      next(error);
    }
  });

reviewController.get('/:id',
  async (req, res, next) => {
    try {
      const review = await reviewService.getReview(req.params.id, req.prisma);
      res.send(review);
    } catch (error) {
      next(error);
    }
  });

reviewController.get('/', async (req, res, next) => {
  try {
    const reviews = await reviewService.getReviews(req.prisma);
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

reviewController.put('/:id', async (req, res, next) => {
  try {
    const updatedReview = await reviewService.updateReview(req.params.id, req.body, req.prisma);
    res.send(updatedReview);
  } catch (error) {
    next(error);
  }
});

reviewController.delete('/:id', jwtCheck,
  async (req, res, next) => {
    try {
      const deletedReview = await reviewService.deleteReview(req.params.id, req.prisma);
      res.send(deletedReview);
    } catch (error) {
      next(error);
    }
  });

export default reviewController;
