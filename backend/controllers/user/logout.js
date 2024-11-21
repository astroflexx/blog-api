const { successResponse } = require("../../utils/response");

const logout = (req, res) => {
  try {
    successResponse(res, null, "Logged out successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Failed to log out. Please try again.", 500);
  }
};

module.exports = logout;
