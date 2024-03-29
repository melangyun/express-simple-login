import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import userRepository from '../repository/userRepository.js';

async function hashingPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

function filterSensitiveUserData(user) {
  const { password, refreshToken, provider, providerId, ...rest } = user;
  return rest;
}

function signJwt(payload, type) {
  if (type === 'refresh') {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2w' });
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

async function generateJWT(userId) {
  const accessToken = signJwt({ id: userId });
  const refreshToken = signJwt({ id: userId }, 'refresh');
  await userRepository.saveRefreshToken(userId, refreshToken);
  return { accessToken, refreshToken };
}

async function register(user) {
  const existedUser = await userRepository.findByEmail(user.email);

  if (existedUser) {
    const error = new Error('User already exists');
    error.code = 422;
    error.data = { email: user.email };
    throw error;
  }

  const hashedPassword = await hashingPassword(user.password);
  const createdUser = await userRepository.save({
    ...user,
    password: hashedPassword,
  });
  return filterSensitiveUserData(createdUser);
}

async function validatePassword(plain, hashed) {
  const isMatch = await bcrypt.compare(plain, hashed);
  if (!isMatch) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }
}

async function sessionLogin(email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error('User not found');
    error.code = 401;
    throw error;
  }
  await validatePassword(password, user.password);
  return filterSensitiveUserData(user);
}

async function login(email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }
  await validatePassword(password, user.password);

  return generateJWT(user.id);
}

async function renewToken(userId, old) {
  const user = await userRepository.findById(userId);
  if (!user?.refreshToken !== old) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }

  return generateJWT(user.id);
}

async function oAuthRegisterOrUpdate(provider, providerId, email, name) {
  const user = await userRepository.findOrCreate(
    provider,
    providerId,
    email,
    name,
  );
  return filterSensitiveUserData(user);
}

export default {
  login,
  sessionLogin,
  register,
  renewToken,
  oAuthRegisterOrUpdate,
  generateJWT,
};
