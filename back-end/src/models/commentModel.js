const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Article'
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    upvotes: {
        type: Number,
        default: 0
    },

    downvotes: {
        type: Number,
        default: 0
    },

    replies: [String]

});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;