import jwt from 'jsonwebtoken';

import userRepository from '../repository/userMemoryRepository.js';

function register (user) {
  checkIfUserExists(user.email);
  const registeredUser = userRepository.save(user);
  return registeredUser;
}

function login (email, password) {
  const user = userRepository.findByEmail(email);
  checkIfUserDoesNotExist(email);
  checkPassword(password, user.password);

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
}

function getUsers () {
  return userRepository.getUsers();
}

export default {
  login,
  register,
  getUsers
};

function checkIfUserExists (email) {
  const user = userRepository.findByEmail(email);
  if (user) {
    const error = new Error('User already exists');
    error.code = 422;
    error.data = { email };
    throw error;
  }
};

function checkIfUserDoesNotExist (email) {
  const user = userRepository.findByEmail(email);
  if (!user) {
    const error = new Error('User not found');
    error.code = 404;
    error.data = { email };
    throw error;
  }
}

function checkPassword (plain, hashed) {
  if (plain !== hashed) {
    const error = new Error('Incorrect password');
    error.code = 401;
    throw error;
  }
}
