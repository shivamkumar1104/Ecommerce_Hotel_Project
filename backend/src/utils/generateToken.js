import jwt from "jsonwebtoken";

export const generateToken = (userId, role = "user") => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || "fallback_default_secret_2026",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

export default generateToken;
