/**
 * Middleware factory that validates request data against a Zod schema.
 *
 * Usage:
 *   router.post('/example', validate(mySchema), handler);
 *
 * The schema should define the shape expected for body, params, and/or query.
 */
function validate(schema) {
  return (req, _res, next) => {
    try {
      const result = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      });

      // Replace request properties with parsed (and potentially transformed) values
      req.body = result.body ?? req.body;
      req.params = result.params ?? req.params;
      req.query = result.query ?? req.query;

      next();
    } catch (err) {
      // Zod errors are caught by the errorHandler middleware
      next(err);
    }
  };
}

module.exports = { validate };