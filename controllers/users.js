const {
  ERROR_CODE_500,
  ERROR_CODE_400,
  ERROR_CODE_404,
} = require("../utils/errors");

const User = require("../models/user");

function getUsers(req, res) {
  User.find()
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res
        .status(ERROR_CODE_500.status)
        .send({ message: ERROR_CODE_500.message })
    );
}

function getUser(req, res) {
  User.findById(req.params._id)
    .orFail(() => {
      const error = new Error(ERROR_CODE_404.message);
      error.statusCode = ERROR_CODE_404.status;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((error) =>
      res
        .status(error.statusCode || ERROR_CODE_500.status)
        .send({ message: error.message || ERROR_CODE_500.message, error })
    );

  console.log(req);
  console.log(res);
}

function createUser(req, res) {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res
        .status(ERROR_CODE_400.status)
        .send({ message: ERROR_CODE_400.message })
    );
  // console.log(req);
  // res.send(200);
  // console.log(res);
}

module.exports = { getUser, getUsers, createUser };
