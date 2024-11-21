const { body, validationResult } = require("express-validator");
const { errorResponse } = require("../utils/response");

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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), 400);
    }
    next();
  },
];

const validateComment = [
  body("content")
    .isString()
    .withMessage("Content must be a string.")
    .notEmpty()
    .withMessage("Content is required.")
    .trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), 400);
    }
    next();
  },
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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array(), 400);
    }
    next();
  },
];

module.exports = { validatePost, validateComment, validateUserSignup };
