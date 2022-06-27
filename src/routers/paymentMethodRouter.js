import express from "express";
import { newPaymentMethodValidation } from "../middlewares/joi-validation/paymentMethodValidation.js";
import { insertPaymentMethod } from "../models/payment-methods/PaymentMethod.models.js";

const router = express.Router();

//add new category
router.post("/", newPaymentMethodValidation, async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await insertPaymentMethod(req.body);
    console.log(result);
    result?._id
      ? res.json({
          status: "success",
          message: "Payment method had been added successfully",
        })
      : res.json({
          status: "error",
          message:
            "Unable to add payment method at the moment, please try again later",
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

//update category
router.patch("/", async (req, res, next) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "to update",
    });
  } catch (error) {
    next(error);
  }
});

//return all active categories

router.get("/", async (req, res, next) => {
  try {
    // const filter = { status: "active" };
    // const result = await getAllCategories();

    res.json({
      status: "success",
      message: "payment methods result",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    res.json({
      status: "success",
      message: "The payment method has been deleted",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
