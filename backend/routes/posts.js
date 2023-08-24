const router = require("express").Router();
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
    const post = await Post.findById(req.params.id);
    await post.deleteOne();
    return res.status(200).json("Post is deleted successfully");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Backendのifの実装は時間があれば
// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     // 投稿した本人だけが削除できるようにする
//     if (`post.userId === req.params.id`) {
//       await post.deleteOne();
//       return res.status(200).json("Post is deleted successfully");
//     } else {
//       return res.status(403).json("You can delete only you posted");
//     }
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

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
      return res.status(204).json("You can update only you posted");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Likes button
router.put("/:id/like", async (req, res) => {
  try {
    // req.params.id = 投稿にあるid
    const post = await Post.findById(req.params.id);
    // まだ投稿にいいねを押していなかったら
    if (!post.likes.includes(post.userId)) {
      await post.updateOne({
        $push: {
          likes: post.userId,
        },
      });
      return res.status(200).json("You gave like");
      // if a user already pushed like
    } else {
      // Remove like from a user who gave like
      await post.updateOne({
        $pull: {
          likes: post.userId,
        },
      });
      return res.status(204).json("Remove like");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// router.get("/:id/like", async (req, res) => {
//   try {
//     const post = await Post.find(req.params.id);
//   }
// }

module.exports = router;
