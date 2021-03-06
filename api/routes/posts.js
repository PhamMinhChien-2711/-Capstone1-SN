const express = require("express");
const Post = require('../models/Post');
const User = require('../models/User');


const router = express.Router();

router.get('/', async (req, res) => {
    try { 
        const posts = await Post.find().sort({ createdAt: -1 })
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
        const post = new Post({
            ...newPost,
            likeCount: [],
            
        });
        await post.save();
        res.status(200).json({ data: post });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// {router.put('/', async (req, res) => {
//     try {
//         const updatePost = req.body;
//         const post = await PostModel.findOneAndUpdate({ _id: updatePost._id }, updatePost, { new: true });
//         await post.save();
//         res.status(200).json({ error: error });
//     } catch (error) {
//         res.status(500).json({ error: error });
//     }
// });}

// update a post

router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.authorId === req.body.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("the post has been updated");
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

// {router.delete('/', async (req, res) => {
//     try {
//         const delPost = req.params;
//         const post = await PostModel.findOneAndDelete({ _id: delPost._id }, delPost, { new: true });
//         await post.delete();
//         res.status(200).json({ error: error });
//     } catch (error) {
//         res.status(500).json({ error: error });
//     }
// });}
router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.authorId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.delete('deleted/:id', async (req, res)=>{
  try {
    const postDeletedCondition={_id:req.params.id}
  const deletedPost = await Post.findOneAndDelete(postDeletedCondition)

  if(!deletedPost){
    return res.json({
      success:false,
      message:'Deleted Fail'
    })
  }
  else {
    return res.json({
        success: true,
        message: 'Completed',
        post: postDelete,
    })
}
  } catch (error) {
    return res.json({
      success: false,
      message: 'Internal server error'
  })
  }
})
  router.get("/timeline/:userId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get user's all posts
  
  router.get("/profile/:username", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//like / dislike a post
  router.put("/:id/like", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likeCount.includes(req.body.userId)) {
        await post.updateOne({ $push: { likeCount: req.body.userId } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likeCount: req.body.userId } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


module.exports = router