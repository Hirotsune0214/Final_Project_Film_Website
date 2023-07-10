const router = require("express").Router();
const Movie = require("../models/Movie");

// Likes button
router.put("/:id/:like", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
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
