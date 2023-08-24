const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/posts", require("./posts"));
router.use("/favorites", require("./favorites"));

module.exports = router;
