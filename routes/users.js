const router = require("express").Router();

const { getUser, getUsers, createUser } = require("../controllers/users.js");

router.get("/:_id", getUser);

router.get("/", getUsers);

router.post("/", createUser);

module.exports = router;
