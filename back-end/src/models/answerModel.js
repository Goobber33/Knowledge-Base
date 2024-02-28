const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
    {
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Question',
        },
        userId: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        upvotes: {
            type: Number,
            default: 0, 
        },
        downvotes: {
            type: Number,
            default: 0, 
        },
    },
    { timestamps: true }
);

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;
