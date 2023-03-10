const router = require("express").Router();
const clothingItem = require("./clothingItems");
const users = require("./users");


router.use("/items", clothingItem);
router.use("/users", users);
router.use("/404", (req, res) => {
  res.status(404).send({message: "not found"});
} );
router.use((req, res) => {
  res.status(500).send({ message: "Requested resource not found" });
});

module.exports = router;
