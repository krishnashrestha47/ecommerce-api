import Joi from "joi";

import {
  validationProcessor,
  SHORTSTR,
  LONGSTR,
} from "./constantValidation.js";

export const newPaymentMethodValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: SHORTSTR.allow(null, ""),
    status: SHORTSTR.required(),
    name: SHORTSTR.required(),
    description: LONGSTR.required(),
  });

  validationProcessor(schema, req, res, next);
};
