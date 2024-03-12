const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String },
        likes: [{ type: String }],
        answers: [{ type: Schema.Types.ObjectId, ref: "Answers" }],
      },
      { timestamps: true }
    );

const Questions = mongoose.model("Questions", questionSchema);
export default Questions;