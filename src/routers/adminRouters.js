import express from "express";
import { encryptPassword } from "../../helpers/bcryptHelper.js";
import { newAdminValidation } from "../middlewares/joi-validation/adminValidation.js";
import { insertAdmin } from "../models/admin/Admin.models.js";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "GET, got hit to admin router",
  });
});

router.post("/", newAdminValidation, async (req, res, next) => {
  try {
    console.log(req.body);

    const hashPassword = encryptPassword(req.body.password);
    req.body.password = hashPassword;

    // create unique email validation code
    req.body.emailValidationCode = uuidv4();

    const result = await insertAdmin(req.body);

    console.log(result);

    result?._id
      ? res.json({
          status: "success",
          message: "New admin has been created successfully",
          hashPassword,
        })
      : res.json({
          status: "error",
          message: "Unable to create new admin, Please try again later",
        });
  } catch (error) {
    console.log(error);
    error.status = 500;
    if (error.message.includes("E11000 duplicate key")) {
      error.message = "Email already exists";
      error.status = 200;
    }
    next(error);
  }
});

router.patch("/", (req, res) => {
  res.json({
    status: "success",
    message: "PATCH got hit to admin router",
  });
});

export default router;
