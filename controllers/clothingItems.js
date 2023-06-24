const { NotFoundError } = require("../utils/NotFoundError");
const { BadRequestError } = require("../utils/BadRequestError");
const { ForbiddenError } = require("../utils/ForbiddenError");

const ClothingItem = require("../models/clothingItem");

const getItems = (req, res, next) => {
  ClothingItem.find()
    .sort({ createdAt: -1 })
    .then((items) => res.send(items))
    .catch(next);
};

const createItem = (req, res, next) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("invalid data"));
      } else {
        next(err);
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
        return next(
          new ForbiddenError("You are not authorized to delete this item")
        );
      }
      return item.deleteOne({ _id: item._id }).then(() => {
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
