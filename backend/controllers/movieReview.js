const Post = require("../models/Favorites");

exports.create = async (req, res) => {
  try {
    const postCount = await Post.find().count();
    // レビューの新規作成
    const post = await Post.create({
      user: req.user._id,
      // postCountがあれば、そのまま返す
      // 何も投稿がなければ、0を返す
      position: postCount > 0 ? postCount : 0,
    });
    res.status(201).json(post);
  } catch {
    res.status(500).json(err);
  }
};
