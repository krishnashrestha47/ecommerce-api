import Joi from "joi";
import {
  LONGSTR,
  SHORTSTR,
  PRICE,
  QTY,
  DATE,
  validationProcessor,
} from "./constantValidation.js";

export const newCategoryValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      _id: SHORTSTR.allow(""),
      parentCatId: SHORTSTR.allow(null, ""),
      catName: SHORTSTR.required(),
      status: SHORTSTR.required(),
    });

    validationProcessor(schema, req, res, next);
  } catch (error) {
    next(error);
  }
};

export const newProductValidation = (req, res, next) => {
  try {
    console.log(req.body);
    req.body.salesStartDate =
      req.body.salesStartDate === "null" ? null : req.body.salesStartDate;
    req.body.salesEndDate =
      req.body.salesEndDate === "null" ? null : req.body.salesEndDate;
    const schema = Joi.object({
      _id: SHORTSTR.allow(""),
      status: SHORTSTR,
      name: SHORTSTR.required(),
      sku: SHORTSTR.required(),
      description: LONGSTR.required(),
      qty: QTY.required(),
      price: PRICE.required(),
      salesPrice: PRICE,
      salesStartDate: DATE.allow(null, ""),
      salesEndDate: DATE.allow(null, ""),
      catId: SHORTSTR.required(),
    });

    validationProcessor(schema, req, res, next);
  } catch (error) {
    next(error);
  }
};

export const updateProductValidation = (req, res, next) => {
  try {
    req.body.salesStartDate =
      req.body.salesStartDate === "null" ? null : req.body.salesStartDate;
    req.body.salesEndDate =
      req.body.salesEndDate === "null" ? null : req.body.salesEndDate;
    const schema = Joi.object({
      _id: SHORTSTR.required(),
      status: SHORTSTR.required(),
      name: SHORTSTR.required(),
      description: LONGSTR.required(),
      qty: QTY.required(),
      price: PRICE.required(),
      salesPrice: PRICE,
      salesStartDate: DATE.allow(null),
      salesEndDate: DATE.allow(null),
      catId: SHORTSTR.required(),
      thumbnail: SHORTSTR,
      images: LONGSTR.allow(null, ""),
      imgToDelete: LONGSTR.allow(null, ""),
    });
    validationProcessor(schema, req, res, next);
  } catch (error) {
    next(error);
  }
};
