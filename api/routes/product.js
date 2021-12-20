const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/Products');
const User = require('../models/User')


const cors = require('cors');
const {
    findById
} = require('../models/User');





const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        // cb(null, new Date().toISOString() + file.originalname);
        cb(null, Date.now() + file.originalname); //prevent "error": "ENOENT: no such file or directory
    }
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


//GET Products
router.get('/list_item', cors(), async (request, response) => {
    try {
        const findProducts = await Product.find({});
        const products = findProducts.map(value => {
            return {
                _id: value._id,
                title: value.title,
                desc: value.desc,
                productImage: process.env.API_URL + value.productImage,
                price: value.price,
                currency: value.currency,
                quantity: value.quantity,
            }
        })
        return response.json({
            success: true,
            products,
        })
    } catch (error) {
        return response.json({
            success: false,
            messages: 'Lỗi server'
        })

    }
})

router.get('/item/:id', async (req, res) => {
    try {
        const findPost = await Product.findOne({
            _id: req.params.id
        }).populate('authorId');
        return res.json({
            success: true,
            findPost: {
                _id: findPost._id,
                title: findPost.title,
                desc: findPost.desc,
                productImage: process.env.API_URL + findPost.productImage,
                price: findPost.price,
                currency: findPost.currency,
                quantity: findPost.quantity,
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


//Create Product
router.post('/addproduct', cors(), upload.array('productImage', 5), async (req, res, next) => {

    const {
        title,
        desc,
        productImage,
        price,
        currency,
        quantity,
        IDproduct
    } = req.body;

    //    console.log('hello1'+' '+ title)


    if (!title) {
        return res.json({
            success: false,
            message: 'Title is required',
        })
    }
    try {
        const account = User.findById({
            _id: User._id,
        }).select('_id')

        console.log('account', account)
        

        if (!account)
            return res.json({
                message: 'id User invalid',
                success: false
            })
        const product = await Product.findById(
            IDproduct
        )
        if (product) {
            console.log(product)
            return res.json({
                success: false,
                message: 'Product is already exist'
            })
        } else {
            const newProduct = new Product({
                title,
                desc,
                productImage: '/uploads/' + req.files[0]?.filename,
                price,
                currency,
                quantity,
                authorId: User._id,
            })
            const product = await newProduct.save();
            return res.json({
                success: true,
                message: 'successful',
                product: {
                    title: product.title,
                    desc: product.desc,
                    productImage: process.env.API_URL + product.productImage,
                    price: product.price,
                    currency: product.currency,
                    quantity: product.quantity,
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

//Update a Product Information
router.put('/:id', async (req, res, next) => {
    const {
        title,
        desc,
        productImage,
        price,
        currency,
        quantity,
        IDproduct
    } = req.body;
    console.log("Hello2", req.body)
    if (!title) {
        // console.log(desc);
        return res.json({
            success: false,
            message: 'Title is required',
        })
    }
    try {
        const producttData = {
            title,
            desc: desc || ' ',
            productImage: productImage || ' ',
            price,
            quantity,
            currency,
            // IDproduct: req.params.id
        }
        const productUpdateCondition = {
            _id: req.params.id,
            UserID: req.UserID
        }

        const updatedProduct = await Product.findByIdAndUpdate(productUpdateCondition, producttData, {
            new: true
        });
        if (!updatedProduct) {
            return res.json({
                success: false,
                message: 'product not found or user not authorised'
            })
        }
        return res.json({
            success: true,
            message: 'Completed',
            product: updatedProduct,
        })


    } catch (error) {
        return res.json({
            success: false,
            message: 'Internal server error'
        })
    }
})



router.delete('/:id', async (req, res, next) => {
    try {

        const productDelete = {
            _id: req.params.id,
            IDUser: req.UserID
        };
        // console.log('Hello')
        const deleteProduct = await Product.findByIdAndDelete(productDelete);
        console.log(productDelete);
        // console.log('Hello123');

        if (!deleteProduct) {
            return res.json({
                success: false,
                message: 'post not found authorised'
            })
        } else {
            return res.json({
                success: true,
                message: 'Completed',
                product: deleteProduct,
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            message: 'Internal server error'
        })
    }
})


module.exports = router