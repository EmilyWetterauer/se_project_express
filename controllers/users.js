const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const {
  ERROR_CODE_500,
  ERROR_CODE_400,
  ERROR_CODE_401,
  ERROR_CODE_404,
  ERROR_CODE_409,
} = require("../utils/errors");

const DEFAULT_JWT = require("../utils/config");

const { JWT_SECRET = DEFAULT_JWT } = process.env;
const User = require("../models/user");

function getUsers(req, res) {
  User.find()
    .then((user) => res.send({ data: user }))
    .catch(() =>
      res
        .status(ERROR_CODE_500.status)
        .send({ message: ERROR_CODE_500.message })
    );
}

function createUser(req, res) {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, avatar, email, password: hash })

      .then(() => {
        res.send({ data: { name, avatar, email } });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          res
            .status(ERROR_CODE_400.status)
            .send({ message: ERROR_CODE_400.message });
        } else if (err.code === 11000) {
          res
            .status(ERROR_CODE_409.status)
            .send({ message: ERROR_CODE_409.message });
        } else {
          res
            .status(ERROR_CODE_500.status)
            .send({ message: ERROR_CODE_500.message });
        }
      })
  );
}

function login(req, res) {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      res
        .status(ERROR_CODE_401.status)
        .send({ message: ERROR_CODE_401.message });
    });
}

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res
          .status(ERROR_CODE_404.status)
          .send({ message: ERROR_CODE_404.message });
      } else if (err.statusCode === 400 || err.name === "CastError") {
        res
          .status(ERROR_CODE_400.status)
          .send({ message: ERROR_CODE_400.message });
      } else {
        res
          .status(ERROR_CODE_500.status)
          .send({ message: ERROR_CODE_500.message });
      }
    });
};

const updateProfile = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { name: req.body.name, avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res
          .status(ERROR_CODE_404.status)
          .send({ message: ERROR_CODE_404.message });
      } else if (err.name === "ValidationError" || err.name === "CastError") {
        res
          .status(ERROR_CODE_400.status)
          .send({ message: ERROR_CODE_400.message });
      } else {
        res
          .status(ERROR_CODE_500.status)
          .send({ message: ERROR_CODE_500.message });
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
