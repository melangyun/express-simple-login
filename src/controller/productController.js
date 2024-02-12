import express from 'express';

import productService from '../service/productService.js';

const productController = express.Router();

productController.post(
  '/',
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
