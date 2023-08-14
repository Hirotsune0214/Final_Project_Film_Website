const router = require("express").Router();

// registerを叩く際にregisterのエンドポイントの前にauthをつけないといけない
// .の意味は？？
router.use("/auth", require("./auth"));
router.use("/posts", require("./posts"));

module.exports = router;
