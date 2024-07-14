const Guide = require("../models/guides")

const create = async (title, content) => {
  const guide = new Guide({ title, content });
  await guide.save();

  return guide;
};

const findById = (id) => {
  const guide = Guide.findById(id);

  return guide ? guide : null;
};

const findByUsername = (username) => {
  const guides = Guide.find();

  const guide = guides.find((guide) => guide.username === username);

  return guide ? guide : null;
};

const update = async (id, title, content) => {
  const guide = await Guide.findByIdAndUpdate(id, { title, content }, { new: true });

  return guide;
};


const remove = async (id) => {
  await Guide.findByIdAndDelete(id);

  return true;
};

module.exports = {
  create,
  findById,
  findByUsername,
  update,
  remove,
};
