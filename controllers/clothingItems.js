const { NotFoundError } = require("../utils/NotFoundError");
const { BadRequestError } = require("../utils/BadRequestError");
const { ForbiddenError } = require("../utils/ForbiddenError");

const { ERROR_CODE_500 } = require("../utils/errors");

const ClothingItem = require("../models/clothingItem");

const getItems = (req, res) => {
  ClothingItem.find()
    .sort({ createdAt: -1 })
    .then((items) => res.send(items))
    .catch(next);
};

const createItem = (req, res, next) => {
  console.log("req", req.body);
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError());
      } else {
        res
          .status(ERROR_CODE_500.status)
          .send({ message: ERROR_CODE_500.message });
      }
    });
};

const deleteItem = (req, res, next) => {
  ClothingItem.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError("No user with matching ID found");
    })
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        next(new ForbiddenError());
      }
      item.deleteOne({ _id: item._id }).then(() => {
        res.status(200).send({ message: "Item deleted" });
      });
    })
    .catch(next);
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("No user with matching ID found");
    })
    .then((item) => {
      res.send({ data: item });
    })
    .catch(next);
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("No user with matching ID found");
    })
    .then((item) => {
      res.send({ data: item });
    })
    .catch(next);
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
