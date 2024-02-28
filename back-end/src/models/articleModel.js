const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        picturePath: String, 
    },
    { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
export default Article;