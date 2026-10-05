import rateLimit from "express-rate-limit";

/**
 * Strict limiter for authentication endpoints (login, register, google).
 * Prevents brute-force attacks on auth routes.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 requests per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts from this IP. Please try again after 15 minutes.",
  },
  skipSuccessfulRequests: false,
});

/**
 * General API limiter for all routes.
 * Prevents API abuse and DDoS.
 */
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // max 100 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP. Please slow down.",
  },
});

/**
 * Strict limiter for booking creation.
 * Prevents booking spam.
 */
export const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // max 20 booking attempts per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Booking limit reached. Please try again later.",
  },
});
