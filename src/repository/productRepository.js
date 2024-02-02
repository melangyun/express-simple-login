import prisma from './prismaClient.js';

async function getById(id) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  return product;
}

async function save(product) {
  const createdProduct = await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: parseInt(product.price, 10),
    },
  });
  return createdProduct;
}

export default {
  getById,
  save,
};
