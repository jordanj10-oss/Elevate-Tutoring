const jwt = require('jsonwebtoken');

/**
 * Middleware that verifies the JWT token from the Authorization header
 * and attaches the decoded user payload to req.user.
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is required' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Authorization header must be: Bearer <token>' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
}

/**
 * Middleware that optionally attaches user info if a valid token is present.
 * Does NOT reject the request if no token is provided.
 */
function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next();
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return next();
  }

  try {
    const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
    req.user = decoded;
  } catch {
    // Token invalid — continue without user
  }

  next();
}

module.exports = { requireAuth, optionalAuth };