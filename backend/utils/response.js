const successResponse = (res, data, message = "Request was successful") => {
  res.status(200).json({
    status: "success",
    message,
    data,
  });
};

const errorResponse = (
  res,
  message = "Something went wrong",
  statusCode = 500
) => {
  res.status(statusCode).json({
    status: "error",
    message,
  });
};

module.exports = { successResponse, errorResponse };
