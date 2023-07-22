const createHttpError = require("http-errors");

const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};

const routerError = (req, res, next) => {
  next(createHttpError(404, "Route not found"));
};

module.exports = { errorHandler, routerError };

/*
! 400 Bad Request Error:
Used when user fails to include a field (like no credit card information in a payment form)
Also used when user enters incorrect information (Example: Entering different passwords in a password field and password confirmation field).
! 401 Unauthorized Error: 
Used when user enters incorrect login information (like username, email or password).
! 403 Forbidden Error: 
Used when user is not allowed access the endpoint.
! 404 Not Found Error: 
Used when the endpoint cannot be found.
! 500 Internal Server Error:
Used the request sent by the frontend is correct, but there was an error from the backend.
*/
