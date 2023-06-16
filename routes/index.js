const router = require("express").Router();

const clothingItem = require("./clothingItems");
const users = require("./users");
const { createUser, login } = require("../controllers/users");
const { NotFoundError } = require("../utils/NotFoundError");

router.use("/items", clothingItem);
router.use("/users", users);
router.post("/signup", createUser);
router.post("/signin", login);
router.use("/", (req, res) => {
  next(new NotFoundError());
});

module.exports = router;
