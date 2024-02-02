import prisma from './prismaClient.js';

async function findById(id) {
  return prisma.user.findUnique({ where: { id } });
}

async function findByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

async function save(user) {
  return prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: user.password,
    },
  });
}

async function saveRefreshToken(userId, token) {
  return prisma.user.update({
    where: { id: userId },
    data: { refreshToken: token },
  });
}

async function findOrCreate(provider, providerId, email, name) {
  return prisma.user.upsert({
    where: { provider, providerId },
    update: { email, name },
    create: { provider, providerId, email, name },
  });
}

export default {
  findById,
  findByEmail,
  save,
  saveRefreshToken,
  findOrCreate,
};
