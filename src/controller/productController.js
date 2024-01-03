import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import productService from '../service/productService.js';

const productController = express.Router();

productController.get('/register',
  (_, res) => {
    res.sendFile('register.html', { root: 'src/public' });
  });

productController.post('/',
  authMiddleware.passportAuthenticateSession,
  async (req, res, next) => {
    const createdProduct = await productService.register(req.body);
    res.send(createdProduct);
  });

productController.get('/:id', async (req, res, next) => {
  const product = await productService.getById(req.params.id);
  res.send(product);
});

export default productController;
