const mongoose = require("mongoose");

const CommentCuuTro = new mongoose.Schema(
  { 
    
    authorId: {
        type: String,
        required: true,
        default: '',
      },
    content: {
        type: String,
        required: true,
      },
    postId:{
        type: String,
        required: true,
        default: '',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CommentCuuTro", CommentCuuTro);
