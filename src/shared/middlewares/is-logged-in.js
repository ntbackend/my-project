const express = require("express");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

function isLoggedIN(req, res, next) {
  console.log("session", req.session.user);
  if (!req.session.user) {
    return res.redirect("/login");
  }

  res.locals.currentUser = req.session.user;

  req.user = req.session.user;

  next();
}

module.exports = isLoggedIN;
