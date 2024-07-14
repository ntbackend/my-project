const Joi = require("joi");

exports.createGuideSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(4)
    .message("Uzunligi kamida 4 ta belgidan iborat bo'lishi kerak")
    .trim(),
  content: Joi.string()
    .required()
    .max(1000)
    .message("Uzunligi eng ko'pi 1000 tadan oshmasligi kerak")
    .trim(),
  notify: Joi.boolean().required(),
});

exports.editGuideSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(4)
    .message("Uzunligi kamida 4 ta belgidan iborat bo'lishi kerak")
    .max(30)
    .message("Uzunligi ko'pi bilan 30 ta belgidan iborat bo'lishi kerak")
    .trim(),
  content: Joi.string()
    .required()
    .max(1000)
    .message("Uzunligi eng ko'pi 1000 tadan oshmasligi kerak")
    .trim(),
  notify: Joi.boolean().required(),
});
