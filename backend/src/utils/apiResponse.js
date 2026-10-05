/**
 * Standardized API Response Utility
 * Ensures consistent response shape across all endpoints.
 */

export class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.success = statusCode >= 200 && statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

/**
 * Send a success response.
 * @param {import('express').Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {object} [data]
 */
export const sendSuccess = (res, statusCode = 200, message = "Success", data = null) => {
  const payload = {
    success: true,
    message,
  };
  if (data !== null && data !== undefined) {
    // Spread data keys into the root for backward compatibility
    if (typeof data === "object" && !Array.isArray(data)) {
      Object.assign(payload, data);
    } else {
      payload.data = data;
    }
  }
  return res.status(statusCode).json(payload);
};

/**
 * Send an error response.
 * @param {import('express').Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {object} [errors]
 */
export const sendError = (res, statusCode = 500, message = "Internal Server Error", errors = null) => {
  const payload = {
    success: false,
    message,
  };
  if (errors) {
    payload.errors = errors;
  }
  return res.status(statusCode).json(payload);
};

export default { ApiResponse, sendSuccess, sendError };
