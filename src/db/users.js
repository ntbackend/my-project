const User = require("../models/users")

const create = async (data) => {
  const user = await new User(data)
  await user.save();

  return user;
};

const findById = async (id) => {
  const user = await User.findById(id);

  return user ? user : null;
};

const findByUsername = async (username) => {
  const user = await User.findOne({ username })

  return user ? user : null;
};

const update = async (id, newData) => {
  const user = await User.findByIdAndUpdate(id, newData, { new: true });

  console.log("updated User", user)

  return user;
};

const remove = async (id) => {
  await User.findByIdAndDelete(id)

  return true;
};

module.exports = {
  create,
  findById,
  findByUsername,
  update,
  remove,
};
