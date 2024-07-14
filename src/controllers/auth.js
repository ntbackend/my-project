const express = require("express");
const bcrypt = require("bcryptjs");
const User = require('../models/users');
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const loginPage = (req, res) => {
  req.session.returnTo = "/login";

  res.render("auth/login", {
    layout: "layouts/auth",
  });
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const login = async (req, res, next) =>  {
  const { username, password } = req.body;

  const existing = await User.findOne({ username });

  console.log("existing", existing.password)

  if (!existing) {
    req.flash("error", "Login yoki parol xato");
    return res.redirect("/login");
  }

  const match = bcrypt.compareSync(password, existing.password);

  if (match) {
    req.flash("error", "Login yoki parol xato");
    return res.redirect("/login");
  }

  req.session.user = existing;

  req.flash("success", "Logindan muvaffaqqiyatli o'tdingiz. Xush kelibsiz");

  res.redirect("/guides/list");
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

function logout(req, res) {
  req.session.destroy();
  res.redirect("/login");
}

module.exports = {
  loginPage,
  login,
  logout,
};
