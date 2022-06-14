import Joi from "joi";
import {
  LONGSTR,
  SHORTSTR,
  validationProcessor,
} from "./constantValidation.js";

export const newCategoryValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      parentCatId: SHORTSTR.allow(""),
      catName: SHORTSTR.required(),
      status: SHORTSTR.required(),
    });

    validationProcessor(schema, req, res, next);
  } catch (error) {
    next(error);
  }
};
