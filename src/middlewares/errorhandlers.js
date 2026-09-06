import { validationResult } from "express-validator";

function pageNotFound(req, res, next) {
  const err = new Error("Not found: " + req.originalUrl);
  err.status = 404;
  next(err);
}

function handleError(err, req, res, next) {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message,
      status: status,
    },
  });
}

function checkValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((e) => e.path + ": " + e.msg)
      .join(", ");
    const err = new Error(messages);
    err.status = 400;
    next(err);
    return;
  }
  next();
}

export { pageNotFound, handleError, checkValidation };
