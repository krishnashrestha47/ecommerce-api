import express from "express";
import slugify from "slugify";
import {
  newProductValidation,
  updateProductValidation,
} from "../middlewares/joi-validation/productCategoryValidation.js";
import {
  deleteMultiProducts,
  getMultipleProduct,
  getProduct,
  insertProduct,
  updateProductById,
} from "../models/product/Product.model.js";

const router = express.Router();

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const products = _id
      ? await getProduct({ _id })
      : await getMultipleProduct();

    res.json({
      status: "success",
      message: "Product lists",
      products,
    });
  } catch (error) {
    next(error);
  }
});

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

router.delete("/", async (req, res, next) => {
  try {
    const ids = req.body;
    if (ids.length) {
      const result = await deleteMultiProducts(ids);
      console.log(result);
      if (result?.deletedCount) {
        return res.json({
          status: "success",
          message: "Selected products has been deleted",
        });
      }
    }
    res.json({
      status: "error",
      message: "Unable to delete the product, Please try again later",
    });
    console.log(req.body);
  } catch (error) {
    next(error);
  }
});

router.put("/", updateProductValidation, async (req, res, next) => {
  try {
    console.log(req.body);
    const { _id, ...rest } = req.body;

    const result = await updateProductById(_id, rest);

    result?._id
      ? res.json({
          status: "success",
          message: "Product has been updated",
        })
      : res.json({
          status: "error",
          message: "Unable to update the product, Please try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
