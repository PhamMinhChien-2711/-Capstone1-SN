const express = require("express");
const Support = require('../models/Support');
const multer = require('multer');
const User = require('../models/User')

const router = express.Router();




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }


};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});




router.get('/listSupport', async (request, response) => {
    try {
        const findPost = await Support.find({}).sort({
            createdAt: -1
        }).populate('authorId')
        const supportPost = await findPost.map(value => {
            return {
                _id: value._id,
                title: value.title,
                postImage: process.env.API_URL + value.postImage,
                name: value.authorId?.username,
                createdAt: value.createdAt,
                content: value.content
            }

        })
        return response.json({
            success: true,
            supportPost,
        })
    } catch (error) {
        return response.json({
            success: false,
            messages: 'Lỗi server'
        })
    }
})

router.get('/listDetail/:id', async (req, res) => {
    try {
        const findPost = await Support.findOne({
            _id: req.params.id
        }).populate('authorId');
        return res.json({
            success: true,
            findPost: {
                _id: findPost._id,
                postImage: process.env.API_URL + findPost.postImage,
                lat: findPost.lat,
                lng: findPost.lng,
                title: findPost.title,
                content: findPost.content,
                createdAt: findPost.createdAt,
                name: findPost.authorId.username,
                label: findPost.label
            }
        })
    } catch (error) {
        console.log(error.toString())
        return res.json({
            success: false,
            messages: 'Lỗi server'
        })
    }
})




router.post('/newSupport', upload.array('postImage', 5), async (req, res) => {
    const {
        title,
        content,
        authorId,
        postImage,
        lat,
        lng,
    } = req.body

    if (!title) {
        return res.json({
            success: false,
            message: 'Title is required',
        })
    }
    try {
        
        const user = await User.findById({
            _id: '61777ee86cfa118e47591262',

        }).select('_id');
        if (!user) {
            return res.json({
                success: false,
                message: 'Id is Invalid'
            })
        } else {
            const newPost = new Support({
                title,
                content,
                postImage: '/images/' + req.files[0]?.filename,
                authorId: '61777ee86cfa118e47591262'

            })
            const post = await newPost.save();
            return res.json({
                success: true,
                message: 'successfully',
                post: {
                    title: post.title,
                    content: post.content,
                    postImage: process.env.API_URL + post.postImage,
                }
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            message: 'Internal server error'
        })
    }
})

router.put('/:id', async (req, res) => {
    const {
        title,
        content,
        authorId,
        postImage,
        lat,
        lng,
    } = req.body

    if (!title) {
        return res.json({
            success: false,
            message: 'Title is required',
        })
    }
    console.log('abc')
    try {
        const postData = {
            title,
            content: content || '',
            postImage: postImage || ' ',
            lat: lat || '',
            lng: lng || '',

        }
        console.log('abcd')
        const postUpdateCondition = {
            _id: req.params.id,
            authorId: '617505e86fae8a93bec34087'
        }
        console.log('abcde')
        const updatePost = await Support.findOneAndUpdate(postUpdateCondition, postData, {
            new: true
        })
        console.log('abcdef')
        if (!updatePost) {
            return res.json({
                success: false,
                message: 'post not found or user not authorised'
            })

        }
        return res.json({
            success: true,
            message: 'post has beeen updated',
            updatePost: {
                title: updatePost.title,
                content: updatePost.content,
                postImage: process.env.API_URL + updatePost.postImage,
                lat: updatePost.lat,
                lng: updatePost.lng,
            }
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: 'Internal server error',

        })
    }
})

router.delete('/deletedpost/:id', async (req, res) => {

    try {

        const DeletedPost = {
            _id: req.params.id,
            authorId: '617505e86fae8a93bec34087'
        }

        const postDelete = await Support.findOneAndDelete(DeletedPost);

        if (!postDelete) {
            return res.json({
                success: false,
                message: 'post not found authorization'
            })
        } else {
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


// router.post('like/:id', async (req, res) => {

//     try {
//         const post = await Support.findById(req.params.id);
//         const user = await User.findByID()

//         if (!post) {
//             return res.json({
//                 success: false,
//                 message: 'post does not exist',
//             })
//         } else {
//             if (post.likes.filter(like => like.user === req.user).length > 0) {
//                 const index = post.likes.map((values) => values.user).indexOf(req.user)
//                 post.likes.splice(index, 1)
//             } else {
//                 await post.likes.unshif({
//                     user: req.user,
//                     name: user.username
//                 })
//             }
//             await post.save();
//             return res.json({
//                 success: true,
//                 message: 'success',
//                 post
//             })
//         }
//     } catch (error) {
//         return res.json({
//             success: false,
//             message: 'Internal server error'
//         })
//     }


// })







module.exports = router