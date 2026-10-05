import { Router } from "express";
import {
  getAllReviews,
  getSuiteReviews,
  createReview,
  updateReview,
  deleteReview,
  respondToReview,
} from "../controllers/review.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// Public
router.get("/", getAllReviews);
router.get("/suite/:suiteId", getSuiteReviews);

// Protected
router.post("/", protect, createReview);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

// Admin
router.post("/:id/respond", protect, authorize("admin"), respondToReview);

export default router;
