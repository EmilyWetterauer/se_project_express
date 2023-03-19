const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { ERROR_CODE_401 } = require("../utils/errors");

function auth(req, res, next) {
  const { authorization } = req.headers;
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
