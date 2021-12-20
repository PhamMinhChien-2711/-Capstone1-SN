const express = require("express");
const PostHoiDap = require('../models/PostHoiDap');
const User = require('../models/User');



const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await PostHoiDap.find().sort({ createdAt: -1 })
        .then(res => {
          return Promise.all(
              res.map(async item => {
                if(!item.authorId) return item
                  return {
                      authorInfo: await User.findById(item.authorId),
                      authorId: item.authorId,
                      content: item.content ,
                      createdAt: item.createdAt ,
                      img: item.img ,
                      likeCount: item.likeCount ,
                      title: item.title ,
                      updatedAt: item.updatedAt ,
                      _id: item._id ,
                  }
              })
          )
      })
        
        res.status(200).json(posts);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error });
    }
});
router.post('/', async (req, res) => {
    try {
        const newPost = req.body;
        const post = new PostHoiDap({
            ...newPost,
            likeCount: [],
            
        });
        await post.save();
        res.status(200).json({ data: post });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router