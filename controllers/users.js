const {
  ERROR_CODE_500,
  ERROR_CODE_400,
  ERROR_CODE_404,
} = require("../utils/errors");

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

function getUser(req, res) {
  User.findById(req.params._id)
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
      } else if (err.name === "CastError") {
        res
          .status(ERROR_CODE_400.status)
          .send({ message: ERROR_CODE_400.message });
      } else {
        res
          .status(ERROR_CODE_500.status)
          .send({ message: ERROR_CODE_500.message });
      }
    });
}

function createUser(req, res) {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(ERROR_CODE_400.status)
          .send({ message: ERROR_CODE_400.message });
      } else {
        res
          .status(ERROR_CODE_500.status)
          .send({ message: ERROR_CODE_500.message });
      }
    });
}

module.exports = { getUser, getUsers, createUser };
