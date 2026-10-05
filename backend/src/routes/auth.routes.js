import express from "express";
import {
  registerUser,
  loginUser,
  googleAuth,
  getMe,
  updateProfile,
  getAllUsers,
  getAdminDashboard,
} from "../controllers/auth.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);

// Protected Routes (Requires valid JWT Token)
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);

// Role-Based Authorized Routes (Requires role: "admin")
router.get("/admin/users", protect, authorize("admin"), getAllUsers);
router.get("/admin/dashboard", protect, authorize("admin"), getAdminDashboard);

export default router;