const router = require("express").Router();

const {
  getUser,
  getUsers,
  createUser,
  login,
} = require("../controllers/users");

router.post("/signup", createUser);
router.post("/signin", login);

module.exports = router;
