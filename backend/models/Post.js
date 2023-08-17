// Review or comments schema

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 50,
    },
    likes: {
      type: Array,
      default: [],
    },
    movie: {
      type: Number,
      default: null,
    },
    tv: {
      type: Number,
      default: null,
    },
    person: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
