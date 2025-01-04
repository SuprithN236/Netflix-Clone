import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import { userModel } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-netflix"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET_KEY);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    const user = await userModel.findById(decoded.id).select("-password");
    req.user = user;

    next();
  } catch (error) {
    console.log("Error while authorizing routes", error.message);
    res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid token",
    });
  }
};
