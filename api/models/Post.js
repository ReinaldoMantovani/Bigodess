const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String, 
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    username:{
      type: String,
      required: true,
    },
    categories: {
      type:String,
      required: false,
    },
    profilePic: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
