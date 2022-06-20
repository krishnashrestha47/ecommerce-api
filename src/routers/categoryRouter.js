import express from "express";
import { newCategoryValidation } from "../middlewares/joi-validation/productCategoryValidation.js";
import {
  deleteCatById,
  getAllCategories,
  getCategories,
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

// update category
router.put("/", newCategoryValidation, async (req, res, next) => {
  try {
    const { _id, ...rest } = req.body;

    const result = await updateCategoryById(_id, rest);
    console.log(result);
    result?._id
      ? res.json({
          status: "success",
          message: "The category has been udpated !",
        })
      : res.json({
          status: "error",
          message: "Unable to update the category, Please try again later",
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

router.delete("/", async (req, res, next) => {
  try {
    const { _id } = req.body;
    const filter = { parentCatId: _id };

    const childCats = await getCategories(filter);

    if (childCats.length) {
      return res.json({
        status: "error",
        message:
          "This parent category is not empty. Please reallocate the child categories first and then proceed",
      });
    }

    console.log(req.body);
    const result = await deleteCatById(_id);
    result?._id
      ? res.json({
          status: "success",
          message: "The category has been deleted",
        })
      : res.json({
          status: "error",
          message: "Unable to delete, try again later",
        });
    res.json({
      status: "success",
      message: "todo",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
