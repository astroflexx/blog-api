const { findUserByEmail } = require("../../db/queries");
const { comparePassword } = require("../../utils/hashPassword");
const { generateToken } = require("../../utils/jwt");
const { successResponse, errorResponse } = require("../../utils/response");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return errorResponse(res, "Invalid email or password", 400);
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return errorResponse(res, "Invalid email or password", 400);
    }

    const { password: _, ...userData } = user;

    const token = generateToken({
      userId: userData.id,
      username: userData.username,
    });

    successResponse(res, { ...userData, token }, "Login successful");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Failed to login. Please try again.", 500);
  }
};

module.exports = login;
