const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
  validateCardBody,
  validateClothingItemId,
} = require("../middlewares/validation");

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", auth, validateCardBody, createItem);
router.delete("/:_id", auth, validateClothingItemId, deleteItem);
router.put("/:_id/likes", auth, validateClothingItemId, likeItem);
router.delete("/:_id/likes", auth, validateClothingItemId, dislikeItem);

module.exports = router;
