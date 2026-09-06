const users = [
  {
    user_id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@metropolia.fi",
    role: "user",
    password: "password",
  },
  {
    user_id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@metropolia.fi",
    role: "admin",
    password: "password2",
  },
];

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  const match = users.filter((u) => u.user_id == id);
  return match.length > 0 ? match[0] : null;
};

const createUser = (userData) => {
  const nextId = users.length + 1;
  const newUser = {
    user_id: nextId,
    name: userData.name,
    username: userData.username,
    email: userData.email,
    role: userData.role,
    password: userData.password,
  };
  users.push(newUser);
  return newUser;
};

export { getAllUsers, getUserById, createUser };
