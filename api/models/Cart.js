const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Cart = new mongoose.Schema({
    authorId: {
        type: mongoose.Types.ObjectId,
        default: null,
        ref: 'User'
    },


    cartItems: [{
        IDproduct: {
            type: Schema.Types.ObjectId,
            ref: 'product',
        },
        quantity: {
            type: Number,
            required: true,
            default: '0'
        },
        title: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: 0
        },
    }],
    total: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true,
})

module.exports = mongoose.model('cart', Cart)