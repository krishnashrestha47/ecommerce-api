import express from "express";
import { encryptPassword } from "../../helpers/bcryptHelper.js";
import {
  emailVerificationValidation,
  loginValidation,
  newAdminValidation,
} from "../middlewares/joi-validation/adminValidation.js";
import { insertAdmin, updateAdmin } from "../models/admin/Admin.models.js";
import { v4 as uuidv4 } from "uuid";
import { sendMail } from "../../helpers/emailHelper.js";
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

    if (result?._id) {
      // create unique url and send it to the user email

      const url = `${process.env.ROOT_URL}/admin/verify-email/?c=${result.emailValidationCode}&e=${result.email}`;

      //send email to user
      sendMail({ fName: result.fName, url });

      res.json({
        status: "success",
        message: "New admin has been created successfully",
        hashPassword,
      });
    } else {
      res.json({
        status: "error",
        message: "Unable to create new admin, Please try again later",
      });
    }
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

// email verification router
router.post(
  "/email-verification",
  emailVerificationValidation,
  async (req, res) => {
    console.log(req.body);
    const filter = req.body;
    const update = { status: "active" };

    const result = await updateAdmin(filter, update);
    console.log(result);

    if (result?._id) {
      res.json({
        status: "success",
        message: "email successfully verified, You may login now",
      });
      await updateAdmin(filter, { emailValidationCode: "" });
      return;
    }
    res.json({
      status: "error",
      message: "Invalid or expired validation link",
    });
  }
);

//login user with email and password
//this feature is not complete yet
router.post("/login", loginValidation, (req, res) => {
  console.log(req.body);

  //query get user by email
  //if user exist, compare password,
  //if match process for creating JWT and etc... for future
  //for now, send login success message
  res.json({
    status: "success",
    message: "login feature is not yet implemented",
  });
  //check for authentication
});

export default router;
