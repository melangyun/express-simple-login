import userService from '../service/userService.js';

function register (req, res) {
  const registeredUser = userService.register(req.body);
  res.send(registeredUser);
}

function login (req, res) {
  const token = userService.login(req.body.email, req.body.password);
  res.cookie('token', token, {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 900000)
  });
  res.send(token);
}

function getUsers (req, res) {
  const users = userService.getUsers();
  res.send(users);
}

export default {
  register,
  login,
  getUsers
};
