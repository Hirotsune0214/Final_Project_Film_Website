const router = require("express").Router();
const movieController = require("../controllers/movieReview");
const Post = require("../models/Post");
const Review = require("../models/Review"); // Import your Review model

// Create post "review, comments"
// ログインしているかどうかの判定をミドルウェアに導入して、コメントできるできないを導入しないといけない
router.post("/", async (req, res) => {
  const newPost = new Post({ userId: req.body.userId, desc: req.body.desc });

  console.log(req.body.userId);
  console.log(req.body.desc);

  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET reviews for a specific post by postId
router.get("/:postId/reviews", async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find all reviews associated with the provided postId
    const reviews = await Review.find({ postId });

    return res.status(200).json(reviews); // Return the reviews
  } catch (err) {
    return res.status(500).json(err);
  }
});

// :idは作品に対するid
// router.get("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     return res.status(200).json(post);
//   } catch (err) {
//     return res.status(403).json(err);
//   }
// });

// GET reviews for a specific post by postId
router.get("/:postId/reviews", async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find all reviews associated with the provided postId
    const reviews = await Review.find({ postId });

    return res.status(200).json(reviews); // Return the reviews
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Get post "review"
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json("Post is deleted successfully");
    } else {
      return res.status(403).json("You can delete only you posted");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

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

// Delete post "review, comments"
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.body.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json("Post is deleted successfully");
    } else {
      return res.status(403).json("You can delete only you posted");
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
