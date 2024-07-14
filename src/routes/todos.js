const express = require("express");
const {
  createTodoPage,
  createTodos,
  listTodos,
  showTodo,
  completeTodo,
  removeTodo,
} = require("../controllers/todos");
const isLoggedIN = require("../shared/middlewares/is-logged-in");
const hasRole = require("../shared/middlewares/has-role");
const validate = require("../shared/middlewares/validate");
const { createTodoSchema } = require("../schemas/todos");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.page = "todos";
  next();
});

router.get("/todos/create", isLoggedIN, hasRole(["admin"]), createTodoPage);
router.post("/todos/create", isLoggedIN, hasRole(["admin"]), validate(createTodoSchema), createTodos);
router.get("/todos/list", isLoggedIN, listTodos);
router.get("/todos/:id/show", isLoggedIN, showTodo);
router.post("/todos/:id/complate", isLoggedIN, completeTodo);
router.post("/todos/:id/delete", isLoggedIN, hasRole(["admin"]), removeTodo);

module.exports = router;
