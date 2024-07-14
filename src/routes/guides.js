const express = require("express");
const {
  createGuidePage,
  createGuides,
  listGuide,
  showGuide,
  editGuidePage,
  editGuide,
  removeGuide,
} = require("../controllers/guides");
const isLoggedIN = require("../shared/middlewares/is-logged-in");
const hasRole = require("../shared/middlewares/has-role");
const validate = require("../shared/middlewares/validate");
const { createGuideSchema, editGuideSchema } = require("../schemas/guides");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.page = "guides";
  next();
});

router.get("/guides/create", isLoggedIN, hasRole(["admin"]), createGuidePage);
router.post(
  "/guides/create",
  isLoggedIN,
  hasRole(["admin"]),
  validate(createGuideSchema),
  createGuides
);
router.get("/guides/list", isLoggedIN, listGuide);
router.get("/guides/:id", isLoggedIN, showGuide);
router.get("/guides/:id/edit", isLoggedIN, hasRole(["admin"]), editGuidePage);
router.post(
  "/guides/:id/edit",
  isLoggedIN,
  hasRole(["admin"]),
  validate(editGuideSchema),
  editGuide
);
router.post("/guides/:id/delete", isLoggedIN, hasRole(["admin"]), removeGuide);

module.exports = router;
