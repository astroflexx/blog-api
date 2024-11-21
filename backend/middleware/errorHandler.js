const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    status: "error",
    message: "Something went wrong. Please try again later.",
  });
};

module.exports = errorHandler;
