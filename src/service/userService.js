import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import userRepository from '../repository/userPrismaRepository.js';

async function register (user, prisma) {
  const existedUser = await userRepository.findByEmail(user.email, prisma);

  if (existedUser) {
    const error = new Error('User already exists');
    error.code = 422;
    error.data = { email: user.email };
    throw error;
  }

  const salt = createSalt();
  const hashedPassword = hashingPassword(user.password, salt);
  const createdUser = await userRepository.save({ ...user, password: hashedPassword, salt }, prisma);
  return { id: createdUser.id, email: createdUser.email, name: createdUser.name };
}

async function login (email, password, prisma) {
  const user = await userRepository.findByEmail(email, prisma);
  if (!user) {
    const error = new Error('User not found');
    error.code = 404;
    error.data = { email };
    throw error;
  }

  checkPassword(password, user.salt, user.password);

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
}

export default {
  login,
  register
};

function checkPassword (plain, salt, hashed) {
  const hashedPassword = hashingPassword(plain, salt);
  if (hashedPassword !== hashed) {
    const error = new Error('Incorrect password');
    error.code = 401;
    throw error;
  }
}

function hashingPassword (password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

function createSalt () {
  return crypto.randomBytes(16).toString('hex');
}
