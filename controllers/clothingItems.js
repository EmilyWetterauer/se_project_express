const {
  ERROR_CODE_500,
  ERROR_CODE_400,
  ERROR_CODE_404,
} = require("../utils/errors");

const ObjectId = require("mongoose").Types.ObjectId;

const ClothingItem = require("../models/clothingItem");

const getItems = (req, res) => {
  ClothingItem.find()
    .then((item) => res.send({ data: item }))
    .catch((error) => {
      return res
        .status(ERROR_CODE_500.status)
        .send({ message: ERROR_CODE_500.message, error });
    });
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
          .send({ message: ERROR_CODE_400.message, err });
      } else {
        res
          .status(ERROR_CODE_500.status)
          .send({ message: ERROR_CODE_500.message, err });
      }
    });
};

const deleteItem = (req, res) => {
  ClothingItem.findByIdAndRemove(req.params._id)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((error) => {
      if (error.statusCode === 404) {
        res.status(ERROR_CODE_404.status).send({ message: error.message });
      } else if (err.name === "CastError") {
        res
          .status(ERROR_CODE_400.status)
          .send({ message: ERROR_CODE_400.message, err });
      } else {
        res
          .status(ERROR_CODE_500.status)
          .send({ message: ERROR_CODE_500.message, err });
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
      if (error.statusCode === 404) {
        res.status(ERROR_CODE_404.status).send({ message: error.message });
      }
    })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(ERROR_CODE_404.status).send({ message: error.message });
      } else if (err.name === "CastError") {
        res.status(ERROR_CODE_400.status).send({ message: error.message });
      } else {
        res
          .status(ERROR_CODE_500.status)
          .send({ message: ERROR_CODE_500.message, err });
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
        res.status(ERROR_CODE_404.status).send({ message: error.message });
      } else if (err.name === "CastError") {
        res.status(ERROR_CODE_400.status).send({ message: error.message });
      } else {
        res
          .status(ERROR_CODE_500.status)
          .send({ message: ERROR_CODE_500.message, err });
      }
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
