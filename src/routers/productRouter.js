import express from "express";
import slugify from "slugify";
import { newProductValidation } from "../middlewares/joi-validation/productCategoryValidation.js";
import { insertProduct } from "../models/product/Product.model.js";

const router = express.Router();

router.post("/", newProductValidation, async (req, res, next) => {
  try {
    console.log(req.body);
    const { name } = req.body;
    const slug = slugify(name, { lower: true, trim: true });
    req.body.slug = slug;
    const result = await insertProduct(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "New product has been created",
        })
      : res.json({
          status: "success",
          message: "New product has been created",
        });

    res.json({
      status: "success",
      message: "To do...",
    });
  } catch (error) {
    //duplicate slug and the sku
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Another product with similar name or SKU already exists";
      error.status = 200;
    }
    next(error);
  }
});

export default router;
