const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  likes: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
