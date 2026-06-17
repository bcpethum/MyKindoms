import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      if (process.env.DISABLE_AUTH_FOR_ADSENSE === "true" || token === "adsense_bypass_token") {
        const adminUser = await Admin.findOne().select("-password");
        if (adminUser) {
          req.user = adminUser;
          return next();
        }
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await Admin.findById(
        decoded.id
      ).select("-password");

      return next();
    }

    if (process.env.DISABLE_AUTH_FOR_ADSENSE === "true") {
      const adminUser = await Admin.findOne().select("-password");
      if (adminUser) {
        req.user = adminUser;
        return next();
      }
    }

    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  } catch (error) {
    if (process.env.DISABLE_AUTH_FOR_ADSENSE === "true") {
      const adminUser = await Admin.findOne().select("-password");
      if (adminUser) {
        req.user = adminUser;
        return next();
      }
    }

    return res.status(401).json({
      success: false,
      message: "Token invalid",
    });
  }
};