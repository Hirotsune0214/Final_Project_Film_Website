const router = require("express").Router();

// registerを叩く際にregisterのエンドポイントの前にauthをつけないといけない
// .の意味は？？
router.use("/auth", require("./auth"));

module.exports = router;
