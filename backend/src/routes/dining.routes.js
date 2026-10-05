import { Router } from "express";
import {
  createReservation,
  getMyReservations,
  getAllReservations,
  cancelReservation,
  updateReservationStatus,
} from "../controllers/dining.controller.js";
import { protect, authorize, optionalAuth } from "../middlewares/auth.middleware.js";

const router = Router();

// Public — guests can book without an account (optionalAuth attaches user if logged in)
router.post("/", optionalAuth, createReservation);

// Protected
router.get("/my", protect, getMyReservations);
router.patch("/:id/cancel", protect, cancelReservation);

// Admin
router.get("/", protect, authorize("admin"), getAllReservations);
router.patch("/:id/status", protect, authorize("admin"), updateReservationStatus);

export default router;
