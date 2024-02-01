import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import productService from '../service/productService.js';

const productController = express.Router();

productController.post(
  '/',
  authMiddleware.passportAuthenticateSession,
  // authMiddleware.checkSessionLogin,
  async (req, res) => {
    const createdProduct = await productService.register(req.body);
    res.send(createdProduct);
  },
);

productController.get('/:id', async (req, res) => {
  const product = await productService.getById(req.params.id);
  res.send(product);
});

export default productController;
