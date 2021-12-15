const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Support = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 8,
        max: 200,
    },
    content: {
        type: String,
        required: true,
        default:''
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        default: null,
        ref: 'User'
    },
    postImage: {
        type: String,
        require: false,
        default: ""
    },
    lat: {
        type: Number,
        require: false,
        default: 21.127763
    },
    lng: {
        type: Number,
        require: false,
        default: 106.1
    },
    label: {
        type: String,
        require: false,
        default: '29 Le Phung Hieu'
    },
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
    },
    comment: {
        type: mongoose.Types.ObjectId,
        default: null,
        ref: 'User'
    },



}, {
    timestamps: true
});

module.exports = mongoose.model('Support', Support);