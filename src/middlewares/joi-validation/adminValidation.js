import Joi from "joi";

import {
  FNAME,
  LNAME,
  DOB,
  EMAIL,
  PASSWORD,
  PHONE,
  ADDRESS,
  REQUIREDSTR,
  validationProcessor,
} from "./constantValidation.js";

export const newAdminValidation = (req, res, next) => {
  const schema = Joi.object({
    fName: FNAME,
    lName: LNAME,
    dob: DOB,
    email: EMAIL,
    password: PASSWORD,
    phone: PHONE,
    address: ADDRESS,
    requiredStr: REQUIREDSTR,
  });

  validationProcessor(schema, req, res, next);
};

export const emailVerificationValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL,
    emailValidationCode: REQUIREDSTR,
  });
  validationProcessor(schema, req, res, next);
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL,
    password: PASSWORD,
  });
  validationProcessor(schema, req, res, next);
};
