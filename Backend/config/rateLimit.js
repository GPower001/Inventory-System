// config/rateLimit.js
import rateLimit from "express-rate-limit";

// General API rate limiter (for most routes)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable deprecated headers
  message: {
    status: 429,
    error: "Too many requests from this IP, please try again after 15 minutes"
  },
  skip: (req) => {
    // Skip rate limiting for health checks and in development
    return req.path === "/api/health" || process.env.NODE_ENV === "development";
  }
});

// Strict limiter for authentication routes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Very strict limit for auth endpoints
  message: {
    status: 429,
    error: "Too many login attempts, please try again later"
  },
  handler: (req, res, next, options) => {
    // Custom handler to log brute force attempts
    console.warn(`Rate limit exceeded for IP ${req.ip} on auth endpoint`);
    res.status(options.statusCode).json(options.message);
  }
});

// Public API limiter (if you have public endpoints)
export const publicApiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000, // More generous limit for public API
  message: {
    status: 429,
    error: "Too many requests to our public API, please try again later"
  }
});

// Websocket connection limiter (optional)
export const wsConnectionLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // Max 10 new WS connections per IP
  keyGenerator: (req) => {
    // For WebSocket connections, use the IP from handshake
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  },
  message: "Too many new WebSocket connections, please try again later"
});