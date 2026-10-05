import Suite from "../models/Suite.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

/**
 * @desc    Get all suites with filtering, sorting, pagination
 * @route   GET /api/suites
 * @access  Public
 */
export const getAllSuites = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      guests,
      isAvailable = true,
      isFeatured,
      sort = "-isFeatured,-averageRating",
      page = 1,
      limit = 12,
    } = req.query;

    // Build filter object
    const filter = {};
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === "true";
    if (category) filter.category = category;
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === "true";
    if (minPrice || maxPrice) {
      filter.pricePerNight = {};
      if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
    }
    if (guests) filter.maxGuests = { $gte: Number(guests) };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Suite.countDocuments(filter);

    const suites = await Suite.find(filter)
      .sort(sort.replace(/,/g, " "))
      .skip(skip)
      .limit(Number(limit))
      .select("-__v");

    return sendSuccess(res, 200, "Suites retrieved successfully", {
      suites,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error("getAllSuites error:", error);
    return sendError(res, 500, "Failed to retrieve suites");
  }
};

/**
 * @desc    Get single suite by ID or slug
 * @route   GET /api/suites/:id
 * @access  Public
 */
export const getSuiteById = async (req, res) => {
  try {
    const { id } = req.params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const query = isObjectId ? { _id: id } : { slug: id };

    const suite = await Suite.findOne(query);
    if (!suite) {
      return sendError(res, 404, "Suite not found");
    }

    return sendSuccess(res, 200, "Suite retrieved successfully", { suite });
  } catch (error) {
    console.error("getSuiteById error:", error);
    return sendError(res, 500, "Failed to retrieve suite");
  }
};

/**
 * @desc    Create a new suite
 * @route   POST /api/suites
 * @access  Admin
 */
export const createSuite = async (req, res) => {
  try {
    const suite = await Suite.create(req.body);
    return sendSuccess(res, 201, "Suite created successfully", { suite });
  } catch (error) {
    if (error.code === 11000) {
      return sendError(res, 409, "A suite with this name/slug already exists");
    }
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return sendError(res, 400, "Validation failed", errors);
    }
    console.error("createSuite error:", error);
    return sendError(res, 500, "Failed to create suite");
  }
};

/**
 * @desc    Update a suite
 * @route   PUT /api/suites/:id
 * @access  Admin
 */
export const updateSuite = async (req, res) => {
  try {
    const suite = await Suite.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!suite) return sendError(res, 404, "Suite not found");
    return sendSuccess(res, 200, "Suite updated successfully", { suite });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return sendError(res, 400, "Validation failed", errors);
    }
    console.error("updateSuite error:", error);
    return sendError(res, 500, "Failed to update suite");
  }
};

/**
 * @desc    Delete a suite
 * @route   DELETE /api/suites/:id
 * @access  Admin
 */
export const deleteSuite = async (req, res) => {
  try {
    const suite = await Suite.findByIdAndDelete(req.params.id);
    if (!suite) return sendError(res, 404, "Suite not found");
    return sendSuccess(res, 200, "Suite deleted successfully");
  } catch (error) {
    console.error("deleteSuite error:", error);
    return sendError(res, 500, "Failed to delete suite");
  }
};

/**
 * @desc    Check suite availability for given dates
 * @route   GET /api/suites/:id/availability
 * @access  Public
 */
export const checkAvailability = async (req, res) => {
  try {
    const { checkIn, checkOut } = req.query;
    if (!checkIn || !checkOut) {
      return sendError(res, 400, "checkIn and checkOut dates are required");
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      return sendError(res, 400, "Check-out must be after check-in");
    }

    const suite = await Suite.findById(req.params.id);
    if (!suite) return sendError(res, 404, "Suite not found");
    if (!suite.isAvailable) {
      return sendSuccess(res, 200, "Suite availability retrieved", {
        available: false,
        reason: "Suite is not currently available for booking",
      });
    }

    // Check for conflicting bookings
    const Booking = (await import("../models/Booking.js")).default;
    const conflict = await Booking.findOne({
      suite: suite._id,
      status: { $in: ["pending", "confirmed", "checked_in"] },
      $or: [
        { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } },
      ],
    });

    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const subtotal = nights * suite.pricePerNight;
    const taxAmount = subtotal * 0.12;

    return sendSuccess(res, 200, "Suite availability retrieved", {
      available: !conflict,
      suite: { id: suite._id, name: suite.name, pricePerNight: suite.pricePerNight },
      pricing: conflict
        ? null
        : {
            nights,
            nightlyRate: suite.pricePerNight,
            subtotal,
            taxAmount: Math.round(taxAmount * 100) / 100,
            total: Math.round((subtotal + taxAmount) * 100) / 100,
            currency: suite.currency,
          },
    });
  } catch (error) {
    console.error("checkAvailability error:", error);
    return sendError(res, 500, "Failed to check availability");
  }
};
