class Response {
  sendSuccessResponse = (res, statusCode, data) => {
    res.status(statusCode).json({
      success: true,
      data: data,
    });
  };

  sendErrorResponse = (res, statusCode, error) => {
    res.status(statusCode).json({
      success: false,
      error: error,
    });
  };
}

module.exports = Response;
