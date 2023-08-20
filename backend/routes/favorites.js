const router = require("express").Router();
const Favorite = require("../models/Favorite");

// 特定の映画をfavoriteに格納する
router.put("/movies/:id", async (req, res) => {
  try {
    // req.params.idは、指定した映画のidになる
    const favorite = await Favorite.findOne({
      movieId: req.params.id,
      userId: req.body.userId,
    });
    console.log(favorite);

    // favoriteがnull -> DBにデータがない = お気に入りを押してない
    if (favorite === null) {
      await Favorite.create({
        movieId: req.params.id,
        userId: req.body.userId,
      });
      return res.status(200).json("You pushed the favorites button");
      // else以下は、既にfavoriteが押されていたら
    } else {
      // favoriteをしているユーザーIDを取り除く
      await favorite.deleteOne();
      return res.status(204).json("Remove favorite");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/dramas/:id", async (req, res) => {
  try {
    // req.params.idは、指定した映画のidになる
    const favorite = await Favorite.findOne({
      dramaId: req.params.id,
      userId: req.body.userId,
    });
    console.log(favorite);

    // favoriteがnull -> DBにデータがない = お気に入りを押してない
    if (favorite === null) {
      await Favorite.create({
        dramaId: req.params.id,
        userId: req.body.userId,
      });
      return res.status(200).json("You pushed the favorite button");
      // else以下は、既にfavoriteが押されていたら
    } else {
      // favoriteをしているユーザーIDを取り除く
      await favorite.deleteOne();
      return res.status(204).json("Remove favorite");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
module.exports = router;
