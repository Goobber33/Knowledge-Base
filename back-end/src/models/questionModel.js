const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
    {
        userId: {
          type: String,
          required: true,
        },
        username: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        picturePath: String,
        answers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Answer', // Reference to the Answer model
        }],
    },
    { timestamps: true }
)

const Question = mongoose.model("Question", questionSchema);
export default Question;