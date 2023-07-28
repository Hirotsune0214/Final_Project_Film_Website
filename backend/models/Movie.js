const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  likes: {
    // 誰がいいねを押したかを見るため、Array型である
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
