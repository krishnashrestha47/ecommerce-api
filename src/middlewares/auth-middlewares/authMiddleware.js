import { verifyAccessJwt } from "../../helpers/jwtHelper.js";
import { getAdmin, getAdminById } from "../../models/admin/Admin.models.js";
import { getSession } from "../../models/session/SessionModel.js";

export const adminAuth = async (req, res, next) => {
  try {
    //get the accessJWT from header
    const { authorization } = req.headers;

    if (authorization) {
      //check if it is valid and not expired
      const decoded = verifyAccessJwt(authorization);

      if (decoded === "jwt expired") {
        return res.status(403).json({
          status: "error",
          message: "jwt expired!",
        });
      }

      if (decoded?.email) {
        //check if exist in database
        const existInDb = await getSession({
          type: "jwt",
          token: authorization,
        });
        if (existInDb?._id) {
          //get the user info and attach in our req body
          const admin = await getAdmin({ email: decoded.email });
          if (admin?._id) {
            req.adminInfo = admin;
            return next();
          }
        }
      }
    }
    res.status(401).json({
      status: "error",
      message: "Unauthorized !",
    });
  } catch (error) {
    next(error);
  }
};
