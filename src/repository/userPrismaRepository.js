async function findByEmail (email, prisma) {
  return await prisma.user.findUnique({ where: { email } });
}

async function save (user, prisma) {
  return await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: user.password
    }
  });
}

export default {
  findByEmail,
  save
};
