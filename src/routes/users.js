const express = require("express");
const {
  createUserPage,
  createUser,
  listUsers,
  showUser,
  editUserPage,
  editUser,
  removeUser,
  userDashbord
} = require("../controllers/users");

const isLoggedIN = require("../shared/middlewares/is-logged-in");
const hasRole = require("../shared/middlewares/has-role");
const validate = require("../shared/middlewares/validate");
const { createUserSchema, editUserSchema } = require("../schemas/users");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.page = "users";
  next();
});

router.get("/", isLoggedIN, userDashbord)
router.get("/users/create", isLoggedIN, hasRole(["admin"]), createUserPage);
router.post(
  "/users/create",
  isLoggedIN,
  hasRole(["admin"]),
  validate(createUserSchema),
  createUser
);
router.get("/users/list", isLoggedIN, hasRole(["admin"]), listUsers);
router.get("/users/:id", isLoggedIN, hasRole(["admin"]), showUser);
router.get("/users/:id/edit", isLoggedIN, hasRole(["admin"]), editUserPage);
router.post(
  "/users/:id/edit",
  isLoggedIN,
  hasRole(["admin"]),
  validate(editUserSchema),
  editUser
);
router.post("/users/:id/delete", isLoggedIN, hasRole(["admin"]), removeUser);

module.exports = router;
