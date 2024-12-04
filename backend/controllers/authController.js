const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../utils/response");

const JWT_SECRET = process.env.JWT_SECRET;

const authController = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return errorResponse(res, ["Token is required"], 400);
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return errorResponse(res, ["Invalid or expired token"], 401);
    }

    return successResponse(res, ["Token is valid"], { user: decoded });
  });
};

module.exports = authController;
