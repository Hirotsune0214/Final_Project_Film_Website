const router = require("express").Router();
const movieController = require("../controllers/movieReview");
const Post = require("../models/Post");

// Create post "review"
router.post("/", async (req, res) => {
  const newPost = new Post({
    userId: req.body.userId,
    desc: req.body.desc,
    movie: req.body.movie,
    user: req.body.user,
  });

  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// Get reviews
router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.find({ movie: postId });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Delete post "review"
router.delete("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.find({ userId: req.body.userId });
    // const post = await Post.findById(req.params.id);
    if (req.body.userId === post.userId) {
      await post.deleteOne({});
      return res.status(200).json("Post is deleted successfully");
    } else {
      return res.status(403).json("You can delete only you posted");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

/*
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === post.userId) {
      await post.deleteOne();
      return res.status(200).json("Post is deleted successfully");
    } else {
      return res.status(403).json("You can delete only you posted");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
*/

// Update post "review, comments"
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      return res.status(200).json("Post is updated successfully");
    } else {
      return res.status(403).json("You can update only you posted");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Likes button
router.put("/:id/:like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId,
        },
      });
      return res.status(200).json("You gave like");
      // if a user already pushed like
    } else {
      // Remove like from a user who gave like
      await post.updateOne({
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
