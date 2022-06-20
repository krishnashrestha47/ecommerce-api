import Joi from "joi";

export const FNAME = Joi.string().alphanum().required().min(3).max(20);
export const LNAME = Joi.string().required().min(3).max(20);
export const DOB = Joi.date().allow(null);
export const DATE = Joi.date();
export const EMAIL = Joi.string().email({ minDomainSegments: 2 }).required();
export const PASSWORD = Joi.string().required();
export const PHONE = Joi.string().required().min(10).max(15);
export const ADDRESS = Joi.string().allow(null).allow("");
export const REQUIREDSTR = Joi.string().required();

export const SHORTSTR = Joi.string().max(100);
export const LONGSTR = Joi.string().max(5000);
export const PRICE = Joi.number().max(100000);
export const QTY = Joi.number().max(10000);

export const validationProcessor = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    error.status = 200;
    return next(error);
  }
  next();
};
