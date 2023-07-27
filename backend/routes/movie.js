// 映画にいいねを押下するapi

const router = require("express").Router();
const Movie = require("../models/Movie");

// Likes button
// 特定の映画にいいねを押す
router.put("/:id/:like", async (req, res) => {
  try {
    // req.params.idは、指定した映画のidになる
    const movie = await Movie.findById(req.params.id);
    // ユーザーidがなければ、いいねを押すことができる
    if (!movie.likes.includes(req.body.userId)) {
      await movie.updateOne({
        $push: {
          likes: req.body.userId,
        },
      });
      return res.status(200).json("You gave like");
      // if a user already pushed like
    } else {
      // Remove like from a user who gave like
      await movie.updateOne({
        // pullで、配列から取り除く
        $pull: {
          likes: req.body.userId,
        },
      });
      return res.status(403).json("Remove like");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
