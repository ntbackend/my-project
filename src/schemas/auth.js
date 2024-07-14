const Joi = require("joi");

exports.loginSchema = Joi.object({
  username: Joi.string()
    .min(4)
    .message("Kamida 4 ta belgi bo'lishi kerak")
    .max(30)
    .message("Ko'pi bilan 30 ta belgi bo'lishi kerak")
    .required(),
  password: Joi.string()
    .min(4)
    .message("Kamida 4 ta belgi bo'lishi kerak")
    .max(30)
    .message("Kamida 30 ta belgi bo'lishi kerak")
    .required(),
});
