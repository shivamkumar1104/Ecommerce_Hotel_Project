import { Router } from "express";
import {
  getAllSuites,
  getSuiteById,
  createSuite,
  updateSuite,
  deleteSuite,
  checkAvailability,
} from "../controllers/suite.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", getAllSuites);
router.get("/:id", getSuiteById);
router.get("/:id/availability", checkAvailability);

// Admin-only routes
router.post("/", protect, authorize("admin"), createSuite);
router.put("/:id", protect, authorize("admin"), updateSuite);
router.delete("/:id", protect, authorize("admin"), deleteSuite);

export default router;
