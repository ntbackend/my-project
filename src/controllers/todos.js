const { usersDb, guidesDb, todosDb } = require("../db");
const User = require("../models/users");
const Guide = require("../models/guides");
const Todos = require("../models/todos");

const createTodoPage = async (req, res) => {
  console.log("hey");

  const users = await User.find();
  const guides = await Guide.find();

  res.render("todos/create", { users, guides });
};

const createTodos = async (req, res) => {
  const { user_id, guide_id } = req.body;

  try {
    const user = await usersDb.findById(user_id);
    if (!user) {
      console.log("User not found with user_id:", user_id);
      return res.status(404).send("User not found");
    }

    const guide = await guidesDb.findById(guide_id);
    if (!guide) {
      console.log("Guide not found with guide_id:", guide_id);
      return res.status(404).send("Guide not found");
    }

    const newTodos = new Todos({
      user_id: user_id,
      guide_id: guide_id
    });

    await newTodos.save();

    req.flash("success", "Todos muvaffaqiyatli qo'shildi");
    res.redirect("/todos/list");
  } catch (error) {
    console.error("Error creating todos:", error);
    res.status(500).send("Error creating todos");
  }
};

const listTodos = async (req, res) => {
  try {
    let todos = await todosDb.findAllOfUser(req.user.id);

    const users = await User.find();
    const guides = await Guide.find();

    let usersMap = new Map(users.map((user) => [user.id.toString(), user]));
    let guidesMap = new Map(guides.map((guide) => [guide.id.toString(), guide]));

    todos = await Promise.all(todos.map(async (todo) => {
      return {
        ...todo._doc,
        user: usersMap.get(todo.user_id.toString()),
        guide: guidesMap.get(todo.guide_id.toString()),
      };
    }));

    res.render("todos/list", { todos, currentUser: req.user });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).send("Error fetching todos");
  }
};

const showTodo = async (req, res) => {
  const { id } = req.params;

  const todo = await todosDb.findById(id);

  if (!todo) {
    return res.status(404).send("todo not found");
  }

  const todoUserIdStr = todo.user_id.toString();
  const reqUserIdStr = req.user._id.toString();

  if (todoUserIdStr !== reqUserIdStr) {
    req.flash("error", "Buni ko'rish uchun sizda ruxsat yo'q");

    res.redirect("todos/list")
  }

  const todoUser = todo.user_id.toString();
  const todoGuide = todo.guide_id.toString();

  todo.user = await usersDb.findById(todoUser);
  todo.guide = await guidesDb.findById(todoGuide);

  res.render("todos/show", { todo });
};

const completeTodo = async (req, res) => {
  const { id } = req.params;

  const todo = await todosDb.findById(id);

  if (!todo) {
    console.log("todo not found");
    return res.status(404).send("todo not found");
  }

  if (todo.completed) {
    return res.status(400).send("todo already complated");
  }

  const todoUserIdStr = todo.user_id.toString();
  const reqUserIdStr = req.user._id.toString();

  if (todoUserIdStr !== reqUserIdStr) {
    req.flash("error", "Buni ko'rish uchun sizda ruxsat yo'q");

    res.redirect("todos/list")
  }

  await todosDb.update(id, { completed: true });

  req.flash("success", "Bildirishnoma muvaffaqiyatli tanishildi");

  res.redirect("/todos/list");
};

const removeTodo = (req, res) => {
  const { id } = req.params;

  const todo = todosDb.findById(id);

  if (!todo) {
    console.log("todo not found");
    return res.status(404).send("todo not found");
  }

  todosDb.remove(id);

  req.flash("success", "Bildirishnoma muvaffaqiyatli o'chirildi");

  res.redirect("/todos/list");
};

module.exports = {
  createTodoPage,
  createTodos,
  listTodos,
  showTodo,
  completeTodo,
  removeTodo,
};
