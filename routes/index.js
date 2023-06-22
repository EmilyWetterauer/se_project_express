const router = require("express").Router();

const clothingItem = require("./clothingItems");
const users = require("./users");
const { createUser, login } = require("../controllers/users");
const { NotFoundError } = require("../utils/NotFoundError");
const {
  validateUserAuthentication,
  validateUserInfoBody,
} = require("../middlewares/validation");

router.use("/items", clothingItem);
router.use("/users", users);
// router.post("/signup", createUser);
// router.post("/signin", login);

router.post("/signup", validateUserInfoBody, createUser);

router.post("/signin", validateUserAuthentication, login);

router.use("/", (req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
