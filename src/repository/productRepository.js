async function getById (id, prisma) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id)
    }
  });
  return product;
}

async function save (product, prisma) {
  const createdProduct = await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: parseInt(product.price)
    }
  });
  return createdProduct;
}

export default {
  getById,
  save
};
