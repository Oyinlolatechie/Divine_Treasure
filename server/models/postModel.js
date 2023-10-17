const mongoose = require('mongoose');

const { Schema } = mongoose

const postSchema = new Schema({
    "headline": {
        type: String,
        required: [true, "Enter Headline"],
        trim: true
    },

    "description": {
        type: String
    },

    "body": {
        type: String
    },

    "tag": {
        type: String,
        enum: ['news', 'article'],
        default: 'news'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("post", postSchema)