import express from 'express';

import productService from '../service/productService.js';

const productController = express.Router();

productController.post('/', async (req, res, next) => {
  const createdProduct = await productService.register(req.body, req.prisma);
  res.send(createdProduct);
});

productController.get('/:id', async (req, res, next) => {
  const product = await productService.getById(req.params.id, req.prisma);
  res.send(product);
});

export default productController;
