const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    default: null,
  },
  dramaId: {
    type: Number,
    default: null,
  },
});

module.exports = mongoose.model("Favorite", FavoriteSchema);
