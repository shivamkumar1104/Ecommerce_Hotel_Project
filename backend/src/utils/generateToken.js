import jwt from "jsonwebtoken";

/**
 * Generates a signed JWT access token.
 * Throws an error if JWT_SECRET is not set — never uses a fallback in production.
 *
 * @param {string} userId - MongoDB ObjectId of the user
 * @param {string} [role="user"] - User role (e.g., "user", "admin")
 * @returns {string} Signed JWT token
 */
export const generateToken = (userId, role = "user") => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set. Cannot generate token.");
  }

  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

export default generateToken;
