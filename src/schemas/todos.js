const Joi = require("joi");

exports.createTodoSchema = Joi.object({
  user_id: Joi.string().required(),
  guide_id: Joi.string().required(),
});
