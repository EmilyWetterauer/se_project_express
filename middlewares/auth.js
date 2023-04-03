const jwt = require("jsonwebtoken");

const DEFAULT_JWT = require("../utils/config");

const { JWT_SECRET = DEFAULT_JWT } = process.env;
const { ERROR_CODE_401 } = require("../utils/errors");

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(ERROR_CODE_401.status).send({ message: ERROR_CODE_401.message });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    res.status(ERROR_CODE_401.status).send({ message: ERROR_CODE_401.message });
  }
  req.user = payload;
  next();
}

module.exports = auth;
