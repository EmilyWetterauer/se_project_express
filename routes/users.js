const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
  getCurrentUser,
  createUser,
  login,
  updateProfile,
} = require("../controllers/users");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateProfile);
// router.patch("/me", updateProfile);
// router.patch("/me", updateProfile);
// router.patch("/me", updateProfile);
// router.post("/signup", createUser);
// router.post("/signin", login);

module.exports = router;
