const { errorResponse } = require("../utils/response");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  errorResponse(res, "Something went wrong. Please try again later.", 500);
};

module.exports = errorHandler;
