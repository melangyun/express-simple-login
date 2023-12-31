import productRepository from '../repository/productRepository.js';

async function register (product, prisma) {
  const createdProduct = await productRepository.save(product, prisma);
  return createdProduct;
}

async function getById (id, prisma) {
  const product = await productRepository.getById(id, prisma);
  return product;
}

export default {
  register,
  getById
};
