const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: [],
    },
    imagePass: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
    releaseAt: {
      type: Date,
    },
    thoughts: {
      type: String,
      required: true,
      maxlength: 300,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Book", bookSchema);
