const { createUser, findUserByEmail } = require("../../db/queries");
const { hashPassword } = require("../../utils/hashPassword");
const { successResponse, errorResponse } = require("../../utils/response");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return errorResponse(res, "User with this email already exists", 400);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await createUser(email, hashedPassword);

    const { password: _, ...userData } = newUser;
    successResponse(res, userData, "User created successfully", 201);
  } catch (err) {
    errorResponse(res, "Failed to create user", 500);
  }
};

module.exports = signup;
