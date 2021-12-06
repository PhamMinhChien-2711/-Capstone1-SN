const express = require("express");
const PostModel = require('../models/Post');
console.log('PostModel: ', PostModel);

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        console.log('PostModel: ', PostModel);
        const posts = await PostModel.find();
        res.status(200).json(posts);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error });
    }
});

router.post('/', async (req, res) => {
    try {
        const newPost = req.body;
        const post = new PostModel({
            ...newPost,
            likeCount: [],
            // authorId: req.user.user_id,
        });
        await post.save();
        res.status(200).json({ data: post });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.put('/', async (req, res) => {
    try {
        const updatePost = req.body;
        const post = await PostModel.findOneAndUpdate({ _id: updatePost._id }, updatePost, { new: true });
        await post.save();
        res.status(200).json({ error: error });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/', async (req, res) => {
    try {
        const delPost = req.params;
        const post = await PostModel.findOneAndDelete({ _id: delPost._id }, delPost, { new: true });
        await post.delete();
        res.status(200).json({ error: error });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


module.exports = router