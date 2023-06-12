export const errorHandler = (
  res,
  statusCode = 500,
  message = "Internal server error"
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export const asyncError = (passedfunc) => (req, res) => {
  return Promise.resolve(passedfunc(req, res)).catch((err) => {
    return errorHandler(res, 500, err.message);
  });
};
