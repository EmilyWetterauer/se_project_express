const router = require("express").Router();

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", createItem);
router.delete("/:_id", deleteItem);
router.put("/:_id/likes", likeItem);
router.delete("/:_id/likes", dislikeItem);

module.exports = router;
