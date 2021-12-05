const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Types = Schema.Types;
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
    attachment: String,
    likeCount: {
      type: [Types.ObjectId],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('post', schema);