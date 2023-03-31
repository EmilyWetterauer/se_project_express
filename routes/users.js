const router = require("express").Router();

const {
  getCurrentUser,
  createUser,
  login,
  updateProfile,
} = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", updateProfile);
// router.patch("/me", updateProfile);
// router.patch("/me", updateProfile);
// router.patch("/me", updateProfile);
router.post("/signup", createUser);
router.post("/signin", login);

module.exports = router;
