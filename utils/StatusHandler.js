// utils/statusHandler.js

class StatusHandler {
  // Success responses
  static success(res, statusCode = 200, message = "Success", data = {}) {
    return res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  }

  // Error responses
  static error(
    res,
    statusCode = 400,
    message = "An error occurred",
    error = {}
  ) {
    return res.status(statusCode).json({
      status: "error",
      message,
      error,
    });
  }
}

module.exports = StatusHandler;
