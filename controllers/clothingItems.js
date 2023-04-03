const {
  ERROR_CODE_500,
  ERROR_CODE_400,
  ERROR_CODE_403,
  ERROR_CODE_404,
} = require("../utils/errors");

const jwt = require("jsonwebtoken");

const ClothingItem = require("../models/clothingItem");

const getItems = (req, res) => {
  ClothingItem.find()
    .then((item) => res.send({ data: item }))
    .catch(() =>
      res
        .status(ERROR_CODE_500.status)
        .send({ message: ERROR_CODE_500.message })
    );
};

const createItem = (req, res) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(200).send({ data: item });
    })
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
};

const deleteItem = (req, res) => {
  // const { authorization } = req.headers;
  // const token = authorization.replace("Bearer ", "");
  // const { _id: loggedInUserId } = jwt.decode(token, { json: true });
  // console.log("loggedIn USer", loggedInUserId);
  ClothingItem.findById(req.params._id)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return res
          .status(ERROR_CODE_403.status)
          .send({ message: ERROR_CODE_403.message });
      }
      item.deleteOne({ _id: item._id }).then(() => {
        return res.status(200).send();
      });
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
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => {
      res.send({ data: item });
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
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => {
      res.send({ data: item });
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
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
