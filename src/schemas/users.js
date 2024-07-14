const Joi = require("joi");

exports.createUserSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .min(3)
    .message("Kamida 3 ta belgidan iborat bo'lishi shart")
    .max(20)
    .message("Ko'pi bilan 20 ta belgi bo'lishi kerak")
    .trim(),
  lastName: Joi.string()
    .required()
    .min(3)
    .message("Kamida 3 ta belgidan iborat bo'lishi shart")
    .max(20)
    .message("Ko'pi bilan 20 ta belgi bo'lishi kerak")
    .trim(),
  age: Joi.string().required(),
  role: Joi.string().required(),
  username: Joi.string()
    .required()
    .min(3)
    .message("Kamida 3 ta belgidan iborat bo'lishi shart")
    .max(20)
    .message("Ko'pi bilan 20 ta belgi bo'lishi kerak")
    .trim(),
  password: Joi.string()
    .required()
    .min(3)
    .message("Kamida 3 ta belgidan iborat bo'lishi shart")
    .max(20)
    .message("Ko'pi bilan 20 ta belgi bo'lishi kerak")
    .trim(),
});

exports.editUserSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .min(3)
    .message("Kamida 3 ta belgidan iborat bo'lishi shart")
    .max(20)
    .message("Ko'pi bilan 20 ta belgi bo'lishi kerak")
    .trim(),
  lastName: Joi.string()
    .required()
    .min(3)
    .message("Kamida 3 ta belgidan iborat bo'lishi shart")
    .max(20)
    .message("Ko'pi bilan 20 ta belgi bo'lishi kerak")
    .trim(),
  age: Joi.string().required(),
  role: Joi.string().required(),
  username: Joi.string()
    .required()
    .min(3)
    .message("Kamida 3 ta belgidan iborat bo'lishi shart")
    .max(20)
    .message("Ko'pi bilan 20 ta belgi bo'lishi kerak")
    .trim(),
});
