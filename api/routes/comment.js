const express = require("express");
const Comment = require('../models/Comment');

const router = express.Router();


router.get('/:id' ,async(req,res)=>{
    try {
        
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error });
    }

    // sort({ createdAt: -1 })
})

router.post('/' ,async(req,res)=>{
    
    try {
        const newComment = req.body;
        const comment = new Comment(newComment);
        await comment.save();
        res.status(200).json({ data: comment });
    } catch (error) {
        res.status(500).json({ error: error });
    }
})
module.exports = router;