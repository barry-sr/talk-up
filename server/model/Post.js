const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    post: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema);