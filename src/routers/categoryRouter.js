import express from "express";
import { newCategoryValidation } from "../middlewares/joi-validation/productCategoryValidation.js";
import { insertCategory } from "../models/category/Category.models.js";

const router = express.Router();

import slugify from "slugify";

//add new category
router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    const slug = slugify(req.body.catName, { lower: true, trim: true });

    const result = await insertCategory(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "New category has been added !",
        })
      : res.json({
          status: "error",
          message: "Unable to add the category, Please try again",
        });
  } catch (error) {
    console.log(error);
    error.status = 500;
    next(error);
  }
});

export default router;
