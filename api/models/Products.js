const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Product = new mongoose.Schema({
    IDproduct: {
        type: Object
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        default: null,
        ref: 'User'
    },
    title: {
        type: String,
        require: true,
        minlength:6

    },
    desc: {
        type: String,
        require: true
    },
    productImage: {
        type: String,
        require: true,
        default: ""
    },
    price: {
        type: Number,
        require: true
    },
    currency: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('product', Product)