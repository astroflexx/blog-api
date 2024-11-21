const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return errorResponse(res, "Authentication required", 401);
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, "Invalid or expired token", 401);
  }
};

module.exports = authenticate;
