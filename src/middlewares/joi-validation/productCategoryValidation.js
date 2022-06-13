import Joi from "joi";
import {
  LONGSTR,
  SHORTSTR,
  validationProcessor,
} from "./constantValidation.js";

export const newCategoryValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      parentCat: SHORTSTR.allow(""),
      catName: SHORTSTR.required(),
    });

    validationProcessor(schema, req, res, next);
  } catch (error) {
    next(error);
  }
};
