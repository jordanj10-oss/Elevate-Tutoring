/**
 * Central error handling middleware.
 * Catches all errors thrown by route handlers and returns
 * a consistent JSON error response.
 */
function errorHandler(err, req, res, _next) {
  console.error(`[ERROR] ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  // Zod validation errors
  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message
      }))
    });
  }

  // Custom application errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token has expired' });
  }

  // Default 500
  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
}

/**
 * Helper to create application-level errors with status codes.
 */
function createError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

module.exports = { errorHandler, createError };