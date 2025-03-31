// import jwt from "jsonwebtoken";

// const authenticate = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ error: "Access denied" });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).json({ error: "Invalid token" });
//   }
// };

// export { authenticate };

import jwt from 'jsonwebtoken';
import { asyncHandler } from '../app.js';
import User from '../models/User.js';

/**
 * JWT Authentication Middleware
 * 1. Extracts token from Authorization header
 * 2. Verifies token validity
 * 3. Fetches complete user document
 * 4. Attaches user to request object
 * 
 * @throws {Error} 
 * - 401 if no token provided
 * - 401 if invalid/expired token
 * - 404 if user not found
 */
export const authenticate = asyncHandler(async (req, res, next) => {
  // 1. Extract token
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    throw new Error('Authentication token required', { statusCode: 401 });
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Fetch user
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      throw new Error('User not found', { statusCode: 404 });
    }

    // 4. Attach user to request
    req.user = user;
    next();
    
  } catch (error) {
    // Handle specific JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token', { statusCode: 401 });
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired', { statusCode: 401 });
    }
    throw error; // Re-throw other errors
  }
});