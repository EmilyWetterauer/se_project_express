const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { NotFoundError } = require("../utils/NotFoundError");
const { BadRequestError } = require("../utils/BadRequestError");
const { UnauthorizedError } = require("../utils/UnauthorizedError");
const { ConflictError } = require("../utils/ConflictError");

const DEFAULT_JWT = require("../utils/config");

const { JWT_SECRET = DEFAULT_JWT } = process.env;
const User = require("../models/user");

function getUsers(req, res, next) {
  User.find()
    .then((user) => res.send({ data: user }))
    .catch(next);
}

function createUser(req, res, next) {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, avatar, email, password: hash })

      .then((user) => {
        res.send({ data: { name, avatar, email, _id: user._id } });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          next(new BadRequestError("invalid data"));
        } else if (err.code === 11000) {
          next(new ConflictError("unique constraint violation."));
        } else {
          next(err);
        }
      })
  );
}

function login(req, res, next) {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError("Incorrect email or password"));
    });
}

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("No user with matching ID found");
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { name: req.body.name, avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new NotFoundError("No user with matching ID found");
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
