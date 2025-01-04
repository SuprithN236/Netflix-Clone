import { generateTokenAndCookie } from "../utils/generateToken.js";
import { userSignUpZod, userLoginZod } from "../config/zodValidation.js";
import { userModel } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const userValidation = userSignUpZod.safeParse(req.body);
    const { username, email, password } = req.body;

    if (!userValidation.success) {
      res.status(400).json({
        success: userValidation.success,
        message: "All fields are required and should be valid",
      });
    }

    const existingEmail = await userModel.findOne({ email: email });
    if (existingEmail) {
      res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const existingUsername = await userModel.findOne({ username: username });
    if (existingUsername) {
      res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
      image,
    });

    generateTokenAndCookie(newUser._id, res);

    res.status(200).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userValidation = userLoginZod.safeParse({ email, password });

    if (!userValidation.success) {
      res.status(400).json({
        success: false,
        message: "Invalid input credentials",
      });
    }

    const user = await userModel.findOne({ email: email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    generateTokenAndCookie(user._id, res);

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error while loging in: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error while logging out: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const authCheck = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log("Error while checking auth: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
