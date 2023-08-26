const router = require("express").Router();
const Post = require("../models/Post");

// Create post "review"
router.post("/", async (req, res) => {
  const newPost = new Post({
    userId: req.body.userId,
    desc: req.body.desc,
    movie: req.body.movie,
    drama: req.body.drama,
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
// router.get("dramas/:id", async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const post = await Post.find({ drama: postId });

//     return res.status(200).json(post);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const postCategory = req.query.category; // = drama
    console.log(postCategory);
    const postId = req.params.id;
    // const post = await Post.find({ drama: postId });

    const post = await Post.find(
      postCategory === "movie" ? { movie: postId } : { drama: postId }
    );

    // console.log(
    //   postCategory === "movie" ? { movie: postId } : { drama: postId }
    // );

    // );

    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
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
    if (!post.likes.includes(req.body.currentUser)) {
      await post.updateOne({
        $push: {
          likes: req.body.currentUser,
        },
      });
      return res.status(200).json("You gave like");
      // if a user already pushed like
    } else {
      // Remove like from a user who gave like
      await post.updateOne({
        $pull: {
          likes: req.body.currentUser,
        },
      });
      return res.status(204).json("Remove like");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;

// userId":"testUser2",

// {"_id":{"$oid":"64e831259f9de37a4338ee24"},"userId":"testUser","desc":"ssss","likes":[testUser, testUser2],"movie":{"$numberInt":"724209"},"drama":null,"person":null,"createdAt":{"$date":{"$numberLong":"1692938533182"}},"updatedAt":{"$date":{"$numberLong":"1692938635338"}},"__v":{"$numberInt":"0"}}
