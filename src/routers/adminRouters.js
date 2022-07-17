import express from "express";
import { encryptPassword, verifyPassword } from "../helpers/bcryptHelper.js";
import {
  emailVerificationValidation,
  loginValidation,
  newAdminValidation,
  updateAdminValidation,
  updatePasswordValidation,
} from "../middlewares/joi-validation/adminValidation.js";
import {
  getAdmin,
  insertAdmin,
  updateAdmin,
} from "../models/admin/Admin.models.js";
import { v4 as uuidv4 } from "uuid";
import {
  otpNotification,
  profileUpdateNotification,
  sendMail,
} from "../helpers/emailHelper.js";
import {
  deleteSession,
  getSession,
  insertSession,
} from "../models/session/SessionModel.js";
import { createOtp } from "../helpers/randomGeneratorHelper.js";
import {
  createJWTs,
  signAccessJwt,
  verifyRefreshJwt,
} from "../helpers/jwtHelper.js";
import { adminAuth } from "../middlewares/auth-middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", adminAuth, (req, res) => {
  try {
    let user = req.adminInfo;

    user.password = undefined;
    user.refreshJWT = undefined;

    res.json({
      status: "success",
      message: "GET, got hit to admin router",
      user,
    });
  } catch (error) {
    next(error);
  }
});

//new admin registration
router.post("/", adminAuth, newAdminValidation, async (req, res, next) => {
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

//update admin registration
router.put("/", adminAuth, updateAdminValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    //query - get user by email
    const user = await getAdmin({ email });

    if (user?._id) {
      const isMatched = verifyPassword(password, user.password);
      if (isMatched) {
        //update user
        const { _id, password, ...rest } = req.body;
        const updatedAdmin = await updateAdmin({ _id }, rest);

        if (updatedAdmin?._id) {
          //send email notification saying profile is updated
          return res.json({
            status: "success",
            message: "Your profile has been updated successfully",
            user: updatedAdmin,
          });
        }
      }
    }

    res.json({
      status: "error",
      message: "Invalid request. Your profile didn't get updated.",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

//update password as logged in user

router.patch(
  "/update-password",
  adminAuth,
  updatePasswordValidation,
  async (req, res, next) => {
    try {
      const { currentPassword, email, password } = req.body;
      console.log(req.body);

      //query get user by email
      const user = await getAdmin({ email });

      if (user?._id) {
        //if user exist, compare password,
        const isMatched = verifyPassword(currentPassword, user.password);
        if (isMatched) {
          const hashPassword = encryptPassword(password);

          const updatedUser = await updateAdmin(
            {
              _id: user._id,
            },
            {
              password: hashPassword,
            }
          );

          if (updatedUser?._id) {
            profileUpdateNotification({
              fName: updatedUser.fName,
              email: updatedUser.email,
            });

            return res.json({
              status: "success",
              message: "Your password has been updated successfully",
            });
          }
        }
      }

      res.json({
        status: "error",
        message:
          "Error! Unable to update the password, please try again later.",
      });
    } catch (error) {
      error.status = 500;
      next(error);
    }
  }
);

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
router.post("/login", loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    //query get user by email
    const user = await getAdmin({ email });

    if (user?._id) {
      console.log(user);

      if (user.status === "inactive")
        return res.json({
          status: "error",
          message:
            "Your account is not active yet, please check your email and follow the instruction to activate your account",
        });
      //if user exist, compare password,
      const isMatched = verifyPassword(password, user.password);
      console.log(isMatched);
      if (isMatched) {
        user.password = undefined;
        user.refreshJWT = undefined;

        const jwts = await createJWTs({ email: user.email });

        //for now
        res.json({
          status: "success",
          message: "User logged in successfully",
          user,
          ...jwts,
        });
        return;
      }

      //if match process for creating JWT and etc... for future
      //for now, send login success message
    }
    res.status(401).json({
      status: "error",
      message: "Invalid login credentials",
    });
    //check for authentication
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

//password reset otp
router.post("/otp-request", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email) {
      //check if user exist
      const user = await getAdmin({ email });

      if (user?._id) {
        //create otp and send email
        const obj = {
          token: createOtp(),
          associate: email,
          type: "updatePassword",
        };
        const result = await insertSession(obj);
        if (result?._id) {
          console.log(result);
          res.json({
            status: "success",
            message:
              "If your email exists in our system, we will send you an OTP, Please check your email",
          });

          //send the otp to admin email
          return otpNotification({
            token: result.token,
            email,
          });
        }
      }
    }

    res.json({
      status: "error",
      message: "Invalid request",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

//reset password

router.patch("/password", async (req, res, next) => {
  try {
    const { otp, email, password } = req.body;
    console.log(req.body);

    //1. get session info based on the otp, so that we can get the user email

    const session = await deleteSession({
      token: otp,
      associate: email,
    });
    console.log(session);
    if (session?._id) {
      //2. based on the email, update password in the database after encrypting
      const update = {
        password: encryptPassword(password),
      };
      const updatedUser = await updateAdmin({ email }, update);
      if (updatedUser?._id) {
        //send the email notification
        profileUpdateNotification({
          fName: updatedUser.fName,
          email: updatedUser.email,
        });

        return res.json({
          status: "success",
          message: "Your password has been updated",
        });
      }
    }

    res.json({
      status: "error",
      message: "Invalid request, unable to update the password",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

//this will return new accessJWT

router.get("/accessjwt", async (req, res, next) => {
  try {
    const refreshJWT = req.headers.authorization;
    console.log(refreshJWT);

    const decoded = verifyRefreshJwt(refreshJWT);

    if (decoded?.email) {
      //check refJWT vlid and exist in db
      const user = await getAdmin({ email: decoded.email, refreshJWT });

      if (user?._id) {
        //create new accessJWT and return it
        const accessJWT = await signAccessJwt({ email: decoded.email });

        res.json({
          status: "success",
          accessJWT,
        });
      }
    }
    res.status(401).json({
      status: "error",
      message: "log out user",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
