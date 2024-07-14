const express = require("express");
const User = require("../models/users")
const bcrypt = require('bcryptjs');
const { usersDb, todosDb } = require("../db");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createUserPage = (req, res) => {
  req.session.returnTo = "/users/create";

  res.render("users/create");
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const createUser = async (req, res, next) => {
  const { firstName, lastName, age, username, password, role } = req.body;

  try {
    if (!firstName || !lastName || !age || !username || !password || !role) {
      req.flash("error", "Barcha maydonlarni to'ldiring");
      return res.redirect('/users/create');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await usersDb.create({
      firstName,
      lastName,
      age,
      username,
      password: hashedPassword,
      role
    });

    req.flash("success", "Yangi foydalanuvchi muvaffaqiyatli yaratildi");
    res.redirect('/users/list');
  } catch (error) {
    req.flash("error", "Foydalanuvchini yaratishda xatolik yuz berdi");
    res.redirect("users/create")
    next(error);
  }
};

const listUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res.render("users/list", { users });
    })
    .catch(err => {
      next(err);
    });
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const showUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await usersDb.findById(id)
    if (!user) {
      return req.flash("error", "Bunday qo'llanma topilmadi");
    }

    res.render('users/show', { user, currentUser: req.user });

  } catch (error) {
    next(error);
  }
};

const editUserPage = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await usersDb.findById(id);

    if (!user) {
      req.flash("warning", "Foydalanuvchi topilmadi");
      return res.redirect("/users/list");
    }

    res.render('users/edit', { user, currentUser: req.user });
  } catch (error) {
    req.flash("error", "Taxrirlashda xatolik")
    next(error)
    res.redirect("/users/list");
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const editUser = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, age, role, username } = req.body;


  try {
    const user = await usersDb.findById(id);

    if (!user) {
      req.flash("error", "Foydalanuvchi topilmadi");
      return res.redirect("/users/list");
    }

    await usersDb.update(id, { firstName, lastName, age, role, username });

    req.flash("success", "Foydalanuvchi muvaffaqiyatli taxrirlandi");

    res.redirect("/users/list");
  } catch (error) {
    next(error)
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const removeUser = (req, res) => {
  const { id } = req.params;

  const user = usersDb.findById(id);

  if (!user) {
    req.flash("error", "Foydalanuvchi topilmadi");
    return res.redirect("/users/list");
  }

  usersDb.remove(id);

  todosDb.removeAllOfUser(id);

  req.flash("success", "Foydalanuvchi muvaffaqiyatli o'chirildi");

  res.redirect("/users/list");
};

const userDashbord = (req, res) => {
  res.locals.page = null;
  res.render("users/dashboard");
};

module.exports = {
  createUserPage,
  createUser,
  listUsers,
  showUser,
  editUserPage,
  editUser,
  removeUser,
  userDashbord,
};
