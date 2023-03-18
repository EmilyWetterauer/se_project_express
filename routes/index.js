const router = require("express").Router();

const clothingItem = require("./clothingItems");
const users = require("./users");
const { ERROR_CODE_404 } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", users);
router.use("/", (req, res) => {
  // res.status(404).send({ message: "not found" });
  res.status(ERROR_CODE_404.status).send({ message: ERROR_CODE_404.message });
});

module.exports = router;
