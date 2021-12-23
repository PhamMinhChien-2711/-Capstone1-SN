const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Types = Schema.Types;
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: false,
      default: '',
    },
    desc: {
      type: String,
      max: 500,
    },
    img:{
      type: String,
    },
    // attachment: String,
    likeCount: {
      type: [Types.ObjectId],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('post', schema);