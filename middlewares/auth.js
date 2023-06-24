const jwt = require("jsonwebtoken");

const DEFAULT_JWT = require("../utils/config");

const { JWT_SECRET = DEFAULT_JWT } = process.env;
const { UnauthorizedError } = require("../utils/UnauthorizedError");

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError("authorization required"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError("authorization required"));
  }
  req.user = payload;
  next();
}

module.exports = auth;
