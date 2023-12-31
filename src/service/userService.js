import jwt from 'jsonwebtoken';

// import userRepository from '../repository/userMemoryRepository.js';
import userRepository from '../repository/userPrismaRepository.js';

async function register (user, prisma) {
  const existedUser = await userRepository.findByEmail(user.email, prisma);
  if (existedUser) {
    const error = new Error('User already exists');
    error.code = 422;
    error.data = { email: user.email };
    throw error;
  }

  return await userRepository.save(user, prisma);
}

async function login (email, password, prisma) {
  const user = await userRepository.findByEmail(email, prisma);
  if (!user) {
    const error = new Error('User not found');
    error.code = 404;
    error.data = { email };
    throw error;
  }

  checkPassword(password, user.password);

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
}

async function getUsers (prisma) {
  return userRepository.getUsers(prisma);
}

export default {
  login,
  register,
  getUsers
};

function checkPassword (plain, hashed) {
  if (plain !== hashed) {
    const error = new Error('Incorrect password');
    error.code = 401;
    throw error;
  }
}
