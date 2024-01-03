import prisma from './prismaClient.js';

async function findById (id) {
  return await prisma.user.findUnique({ where: { id } });
}

async function findByEmail (email) {
  return await prisma.user.findUnique({ where: { email } });
}

async function save (user) {
  return await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: user.password,
      salt: user.salt
    }
  });
}

export default {
  findById,
  findByEmail,
  save
};
