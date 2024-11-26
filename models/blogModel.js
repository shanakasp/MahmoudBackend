const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    blogImage: {
      type: String,
      required: false,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    facebookLink: {
      type: String,
      required: false,
    },
    linkedInLink: {
      type: String,
      required: false,
    },

    githubLink: {
      type: String,
      required: false,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
