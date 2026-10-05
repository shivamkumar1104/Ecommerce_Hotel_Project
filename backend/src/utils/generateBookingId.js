import crypto from "node:crypto";

/**
 * Generates a unique booking reference ID.
 * Format: EQL-{YEAR}-{RANDOM_HEX}
 * Example: EQL-2026-A3F8B1
 *
 * @returns {string} Unique booking reference
 */
const generateBookingId = () => {
  const year = new Date().getFullYear();
  const randomHex = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `EQL-${year}-${randomHex}`;
};

export default generateBookingId;
