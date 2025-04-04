import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js"; // Ensure the correct path

// Middleware to protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token is sent via cookies or authorization headers
  if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request object (excluding password)
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
});
