import Joi from "joi";

const fName = Joi.string().alphanum().required().min(3).max(20);
const lName = Joi.string().required().min(3).max(20);
const dob = Joi.date().allow(null);
const email = Joi.string().email({ minDomainSegments: 2 }).required();
const password = Joi.string().required();
const phone = Joi.string().required().min(10).max(15);
const address = Joi.string().allow(null).allow("");
const requiredStr = Joi.string().required();

const validationProcessor = (schema, req, res, next) => {
  const { value, error } = schema.validate(req.body);
  console.log(error?.message);
  if (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
  next();
};

export const newAdminValidation = (req, res, next) => {
  const schema = Joi.object({
    fName,
    lName,
    dob,
    email,
    password,
    phone,
    address,
  });

  validationProcessor(schema, req, res, next);
};

export const emailVerificationValidation = (req, res, next) => {
  const schema = Joi.object({
    email,
    emailValidationCode: requiredStr,
  });
  validationProcessor(schema, req, res, next);
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email,
    password,
  });
  validationProcessor(schema, req, res, next);
};
