const {
  ERROR_CODE_500,
  ERROR_CODE_400,
  ERROR_CODE_404,
} = require("../utils/errors");
const ClothingItem = require("../models/clothingItem");

const getItems = (req, res) => {
  ClothingItem.find()
    .then((item) => res.send({ data: item }))
    .catch((error) => {
      console.log("error in getItems", error.name);
      return res
        .status(ERROR_CODE_500.status)
        .send({ message: ERROR_CODE_500.message, error });
    });
};

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body._id);

  const { name, weather, imageUrl } = req.body;
  // console.log(req.user.id); // _id will become accessible

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((error) => {
      res
        .status(ERROR_CODE_400.status)
        .send({ message: ERROR_CODE_400.message, error });
    });
};

const deleteItem = (req, res) => {
  console.log({ paramsId: req.params._id });
  ClothingItem.findByIdAndRemove(req.params._id)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((error) =>
      res
        .status(ERROR_CODE_404.status)
        .send({ message: ERROR_CODE_404.message, error })
    );
};

const likeItem = (req, res) => {
  console.log({ paramsId: req.params._id });

  ClothingItem.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
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
    .catch((error) =>
      res
        .status(ERROR_CODE_404.status)
        .send({ message: ERROR_CODE_404.message, error })
    );
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } }, // remove _id from the array
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
    .catch((error) =>
      res
        .status(ERROR_CODE_404.status)
        .send({ message: ERROR_CODE_404.message, error })
    );
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };

module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id); // _id will become accessible
};
