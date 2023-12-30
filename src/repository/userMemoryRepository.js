// In-memory user data
const users = [];

function findByEmail (email) {
  return users.find((user) => user.email === email);
};

function save (user) {
  const id = users.length + 1;
  users.push({ id, ...user });
  return users[id - 1];
};

function getUsers () {
  return users;
}

export default {
  findByEmail,
  save,
  getUsers
};
