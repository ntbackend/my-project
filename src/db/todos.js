const Todo = require("../models/todos");

const findAllOfUser = async (user_id) => {
  try {
    const todos = await Todo.find(user_id);

    return todos;
  } catch (error) {
    console.error("Error finding todos of user:", error);
    throw error;
  }
};

const createBulk = async (data) => {
  try {
      const newTodos = await Todo.insertMany(data);
      return newTodos;
  } catch (error) {
      console.error("Error creating todos:", error);
      throw error;
  }
};


const findById = async (id) => {
  const todo = await Todo.findById(id);

  return todo ? todo : null;
};

const findByUsername = async (username) => {
  const todo = await Todo.findOne({ username });

  return todo ? todo : null;
};

const update = async (id, updateFields) => {
  return await Todo.findByIdAndUpdate(id, { $set: updateFields });
};

const remove = async (id) => {
  await Todo.findByIdAndDelete(id)

  return true;
};

const removeAllOfUser = async (user_id) => {
  let todos = await Todo.findByIdAndDelete(user_id);

  return true;
};

const removeAllOfGuide = async (guide_id) => {
  let todos = await Todo.findByIdAndDelete(guide_id);

  return true;
};

module.exports = {
  findAllOfUser,
  createBulk,
  findById,
  findByUsername,
  update,
  remove,
  removeAllOfUser,
  removeAllOfGuide,
};
