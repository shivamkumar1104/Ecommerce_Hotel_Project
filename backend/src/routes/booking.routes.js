import { Router } from "express";
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/booking.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { bookingLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

// All booking routes require authentication
router.use(protect);

// User routes
router.post("/", bookingLimiter, createBooking);
router.get("/my", getMyBookings);
router.get("/:id", getBookingById);
router.patch("/:id/cancel", cancelBooking);

// Admin-only routes
router.get("/", authorize("admin"), getAllBookings);
router.patch("/:id/status", authorize("admin"), updateBookingStatus);

export default router;
