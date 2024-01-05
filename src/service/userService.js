import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import userRepository from '../repository/userRepository.js';

async function register (user) {
  const existedUser = await userRepository.findByEmail(user.email);

  if (existedUser) {
    const error = new Error('User already exists');
    error.code = 422;
    error.data = { email: user.email };
    throw error;
  }

  const hashedPassword = await hashingPassword(user.password);
  const createdUser = await userRepository.save({ ...user, password: hashedPassword });
  return filterSensitiveUserData(createdUser);
}

async function sessionLogin (email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error('User not found');
    error.code = 401;
    throw error;
  }
  await checkPassword(password, user.password);
  return filterSensitiveUserData(user);
}

async function login (email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }
  await checkPassword(password, user.password);

  const accessToken = signJwt({ id: user.id });
  const refreshToken = signJwt({ id: user.id }, 'refresh');
  await saveRefreshToken(user.id, refreshToken);
  return { accessToken, refreshToken };
}

async function renewToken (userId, old) {
  const user = await userRepository.findById(userId);
  if (!user?.refreshToken !== old) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }

  const accessToken = signJwt({ id: user.id });
  const refreshToken = signJwt({ id: user.id, type: 'refresh' });
  await saveRefreshToken(user.id, refreshToken);
  return { accessToken, refreshToken };
}

export default {
  login,
  sessionLogin,
  register,
  renewToken
};

function filterSensitiveUserData (user) {
  const { password, ...rest } = user;
  return rest;
}

function signJwt (payload, type) {
  if (type === 'refresh') {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2w' }
    );
  }

  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

async function saveRefreshToken (userId, token) {
  await userRepository.saveRefreshToken(userId, token);
}

async function checkPassword (plain, hashed) {
  const isMatch = await bcrypt.compare(plain, hashed);
  if (!isMatch) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }
}

async function hashingPassword (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
