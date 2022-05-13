const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    category: {
      type: [],
      // required: true,
    },
    introductory: {
      type: String,
      // required: true,
      maxlength: 150,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    imagePass: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Blog", blogSchema);
