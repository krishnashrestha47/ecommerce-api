import express from "express";
import { newCategoryValidation } from "../middlewares/joi-validation/productCategoryValidation.js";
import {
  getAllCategories,
  insertCategory,
  updateCategoryById,
} from "../models/category/Category.models.js";

const router = express.Router();

import slugify from "slugify";

//add new category
router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    const slug = slugify(req.body.catName, { lower: true, trim: true });

    const result = await insertCategory({ ...req.body, slug });

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
    if (error.message.includes("E11000 duplicate key")) {
      error.status = 200;
      error.message =
        "This category already exists, please change the name of new category";
    }
    next(error);
  }
});

//return all active categories

router.get("/", async (req, res, next) => {
  try {
    // const filter = { status: "active" };
    const result = await getAllCategories();

    res.json({
      status: "success",
      message: "Categories result",
      result,
    });
  } catch (error) {
    next(error);
  }
});

//update status of a category

router.patch("/", async (req, res, next) => {
  try {
    const { _id, status } = req.body;

    if (!_id || !status) {
      throw new Error("Invalid data set");
    }

    const result = await updateCategoryById(_id, { status });

    result?._id
      ? res.json({
          status: "success",
          message: "categories result",
          result,
        })
      : res.json({
          status: "error",
          message: "Unable to update the category, please try again later",
        });
    res.json({
      status: "success",
      message: "Categories result",
      result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
