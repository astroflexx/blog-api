const { body, validationResult } = require("express-validator");
const { errorResponse } = require("../utils/response");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array(), 400);
  }
  next();
};

const validatePost = [
  body("title")
    .isString()
    .withMessage("Title must be a string.")
    .notEmpty()
    .withMessage("Title is required.")
    .trim(),
  body("content")
    .isString()
    .withMessage("Content must be a string.")
    .notEmpty()
    .withMessage("Content is required.")
    .trim(),
  body("published")
    .optional()
    .isBoolean()
    .withMessage("Published must be a boolean value."),
  handleValidationErrors,
];

const validateComment = [
  body("content")
    .isString()
    .withMessage("Content must be a string.")
    .notEmpty()
    .withMessage("Content is required.")
    .trim(),
  handleValidationErrors,
];

const validateUserSignup = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address.")
    .notEmpty()
    .withMessage("Email is required.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .notEmpty()
    .withMessage("Password is required.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[\W_]/)
    .withMessage(
      "Password must contain at least one special character (e.g. !, @, #)."
    ),
  body("username")
    .isString()
    .withMessage("Username must be a string.")
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores.")
    .trim(),
  handleValidationErrors,
];

module.exports = { validatePost, validateComment, validateUserSignup };
