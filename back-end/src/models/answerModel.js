const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        postId: { type: Schema.Types.ObjectId, ref: "Questions" },
        body: { type: String, required: true },
        from: { type: String, required: true },
        replies: [
          {
            rid: { type: mongoose.Schema.Types.ObjectId },
            userId: { type: Schema.Types.ObjectId, ref: "User" },
            from: { type: String },
            replyAt: { type: String },
            comment: { type: String },
            created_At: { type: Date, default: Date.now() },
            updated_At: { type: Date, default: Date.now() },
            likes: [{ type: String }],
          },
        ],
        upVotes: [{ type: String }],
        downVotes: [{ type: String }],
      },
      { timestamps: true }
);

const Answers = mongoose.model("Answers", answerSchema);
export default Answer;
