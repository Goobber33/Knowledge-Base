const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
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
      updatedAt: {
        type: Date,
        default: Date.now
      },
    views: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }],
    tags: [String],
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId, // Assuming upvotes reference User documents
        ref: 'User'
    }],
    status: {
        type: String,
        enum: ['draft', 'published', 'archived', 'deleted'],
        default: 'draft'
      },
      deletedAt: Date
})

// Middleware to automatically update the updatedAt field on document updates
articleSchema.pre('save', function(next) {
    if (this.isModified()) {
      this.updatedAt = new Date();
    }
    next();
  });

  const ArticleModel = mongoose.model('Article', articleSchema);

  module.exports = ArticleModel;