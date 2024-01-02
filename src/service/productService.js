import productRepository from '../repository/productRepository.js';

async function register (product) {
  const createdProduct = await productRepository.save(product);
  return createdProduct;
}

async function getById (id) {
  const product = await productRepository.getById(id);
  return product;
}

export default {
  register,
  getById
};
