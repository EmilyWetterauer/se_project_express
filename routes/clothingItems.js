const router = require("express").Router();

const auth = require("../middlewares/auth");

const { validateCardBody } = require("../middlewares/validation");

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", auth, validateCardBody, createItem);
router.delete("/:_id", auth, deleteItem);
router.put("/:_id/likes", auth, likeItem);
router.delete("/:_id/likes", auth, dislikeItem);

module.exports = router;
