import prisma from "./prismaClient.js";

async function findById(id) {
  return await prisma.user.findUnique({ where: { id } });
}

async function findByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

async function save(user) {
  return await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: user.password,
    },
  });
}

async function saveRefreshToken(userId, token) {
  return await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: token },
  });
}

async function findOrCreate(provider, providerId, email, name) {
  return await prisma.user.upsert({
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
